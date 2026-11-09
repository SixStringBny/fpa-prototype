import { existsSync } from 'node:fs'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { createServer } from 'vite'
import gifenc from 'gifenc'
import pngjs from 'pngjs'

const { GIFEncoder, quantize, applyPalette } = gifenc
const { PNG } = pngjs

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'docs', 'showcase')
const SCREEN_DIR = path.join(OUT_DIR, 'screens')
const GIF_FILE = path.join(OUT_DIR, 'launchpad-showcase.gif')

const SEED_KEY = 'launchpad.demo.v1'
const FIXED_TIME = new Date('2026-11-09T09:00:00+02:00')
const DESKTOP = { width: 1440, height: 900 }
const MOBILE = { width: 390, height: 844 }
const GIF_VIEWPORT = { width: 1024, height: 640 }
const GIF_SIZE = { width: 960, height: 600 }
const GIF_FPS = 8

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function log(message) {
  console.log(`[showcase] ${message}`)
}

async function findChromium() {
  const explicit =
    process.env.CHROME_PATH ?? process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  if (explicit && existsSync(explicit)) return explicit

  const cacheRoot =
    process.env.PLAYWRIGHT_BROWSERS_PATH ??
    path.join(process.env.LOCALAPPDATA ?? process.env.HOME ?? '', 'ms-playwright')

  if (cacheRoot && existsSync(cacheRoot)) {
    const revisions = (await readdir(cacheRoot))
      .filter((entry) => /^chromium-\d+$/.test(entry))
      .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]))

    for (const revision of revisions) {
      const candidates = [
        path.join(cacheRoot, revision, 'chrome-win64', 'chrome.exe'),
        path.join(cacheRoot, revision, 'chrome-win', 'chrome.exe'),
        path.join(cacheRoot, revision, 'chrome-linux64', 'chrome'),
        path.join(cacheRoot, revision, 'chrome-linux', 'chrome'),
        path.join(
          cacheRoot,
          revision,
          'chrome-mac',
          'Chromium.app',
          'Contents',
          'MacOS',
          'Chromium',
        ),
      ]
      for (const candidate of candidates) {
        if (existsSync(candidate)) return candidate
      }
    }
  }

  const common = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ]
  for (const candidate of common) {
    if (existsSync(candidate)) return candidate
  }

  throw new Error(
    'No Chromium executable found. Set CHROME_PATH or run `npx playwright install chromium`.',
  )
}

async function startServer() {
  const server = await createServer({
    root: ROOT,
    logLevel: 'error',
    server: { port: 4173, strictPort: false },
  })
  await server.listen()
  const base =
    server.resolvedUrls?.local?.[0] ??
    `http://localhost:${server.config.server.port}/`
  return { server, base: base.endsWith('/') ? base : `${base}/` }
}

async function settle(page, milliseconds = 180) {
  await page.waitForLoadState('load', { timeout: 3000 }).catch(() => {})
  await page
    .evaluate(async () => {
      try {
        await document.fonts.ready
      } catch {
        // Font loading is best effort.
      }
      const images = Array.from(document.images)
      await Promise.all(
        images.map((image) =>
          image.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                image.addEventListener('load', resolve, { once: true })
                image.addEventListener('error', resolve, { once: true })
              }),
        ),
      )
    })
    .catch(() => {})
  await sleep(milliseconds)
}

async function openPage(browser, base, viewport) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce',
    locale: 'en-ZA',
    timezoneId: 'Africa/Johannesburg',
  })

  await context.addInitScript(
    ({ fixedTime }) => {
      const NativeDate = Date
      class ShowcaseDate extends NativeDate {
        constructor(...args) {
          if (args.length === 0) super(fixedTime)
          else super(...args)
        }
        static now() {
          return fixedTime
        }
      }
      Object.defineProperty(window, 'Date', {
        value: ShowcaseDate,
        configurable: true,
        writable: true,
      })

      const style = document.createElement('style')
      style.textContent =
        'html{scrollbar-width:none}html::-webkit-scrollbar{display:none}'
      const injectStyle = () => document.head?.appendChild(style)
      if (document.head) injectStyle()
      else document.addEventListener('DOMContentLoaded', injectStyle, { once: true })
    },
    { fixedTime: FIXED_TIME.getTime() },
  )

  const page = await context.newPage()
  await page.goto(base, { waitUntil: 'load' })
  await page.evaluate((key) => localStorage.removeItem(key), SEED_KEY)
  await page.reload({ waitUntil: 'load' })
  await settle(page, 250)

  return { context, page }
}

async function visit(page, route, waitFor) {
  await page.evaluate((nextRoute) => {
    if (window.location.hash !== `#${nextRoute}`) {
      window.location.hash = nextRoute
    }
    window.scrollTo(0, 0)
  }, route)
  if (waitFor) {
    await page
      .locator(waitFor)
      .first()
      .waitFor({ state: 'visible', timeout: 6000 })
      .catch(() => {})
  }
  await settle(page, 220)
  await page.evaluate(() => window.scrollTo(0, 0))
}

async function dismissToasts(page) {
  for (let index = 0; index < 5; index += 1) {
    const close = page.locator('.toast__close')
    if ((await close.count()) === 0) break
    await close.first().click({ timeout: 1500 }).catch(() => {})
    await sleep(60)
  }
}

async function capture(page, filename, options = {}) {
  if (options.scrollTo) {
    await page
      .locator(options.scrollTo)
      .first()
      .scrollIntoViewIfNeeded()
      .catch(() => {})
    await settle(page, 240)
  }
  await page.screenshot({
    path: path.join(SCREEN_DIR, filename),
    animations: 'disabled',
    caret: 'hide',
  })
  log(`captured ${filename}`)
}

async function signIn(page) {
  await visit(page, '/login', 'form')
  await page.getByRole('button', { name: 'Continue as test user' }).click()
  await page.waitForURL(/#\/app\/dashboard/, { timeout: 8000 })
  await settle(page, 260)
}

async function captureStills(browser, base) {
  const { context, page } = await openPage(browser, base, DESKTOP)

  await visit(page, '/', 'h1')
  await capture(page, '01-home.png')

  await visit(page, '/learn', 'h1')
  await capture(page, '02-learn-catalogue.png')

  await visit(page, '/learn/pricing-your-creative-work', 'h1')
  await capture(page, '03-module-detail.png')

  await visit(page, '/mentorship', 'h1')
  await capture(page, '04-mentorship.png')

  await visit(page, '/login', 'form')
  await capture(page, '05-sign-in.png')

  await signIn(page)
  await dismissToasts(page)
  await capture(page, '06-dashboard.png')

  await visit(page, '/app/learn', 'h1')
  await capture(page, '07-app-learn.png')

  await visit(page, '/app/learn/pricing-your-creative-work', 'h1')
  await capture(page, '08-pricing-module.png')

  await page.getByRole('link', { name: 'Start module' }).first().click()
  await page.waitForURL(/\/app\/learn\/pricing-your-creative-work\/why-pricing-feels-hard/, {
    timeout: 8000,
  })
  await settle(page, 260)
  await capture(page, '09-lesson.png')

  await page.getByRole('button', { name: 'Mark complete & continue' }).click()
  await page.waitForURL(/\/app\/learn\/pricing-your-creative-work\/three-pricing-models/, {
    timeout: 8000,
  })
  await settle(page, 220)
  await capture(page, '10-lesson-complete.png')

  await visit(page, '/app/learn/pricing-your-creative-work', 'h1')
  await dismissToasts(page)
  await capture(page, '11-module-progress.png')

  await visit(page, '/app/mentors', 'h1')
  await capture(page, '12-mentors.png')

  await page.getByRole('button', { name: 'Portfolio Review', exact: true }).click()
  await settle(page, 320)
  await capture(page, '13-mentors-filtered.png')

  await page.getByRole('link', { name: 'Lucas Meyer', exact: true }).click()
  await page.waitForURL(/\/app\/mentors\/lucas-meyer$/, { timeout: 8000 })
  await settle(page, 280)
  await capture(page, '14-mentor-profile.png')

  await page.getByRole('link', { name: 'Book a session' }).first().click()
  await page.waitForURL(/\/app\/mentors\/lucas-meyer\/book$/, { timeout: 8000 })
  await settle(page, 280)

  const slot = page.locator('.slot-button').first()
  await slot.scrollIntoViewIfNeeded()
  await slot.click()
  await settle(page, 300)
  await capture(page, '15-booking-slot.png')

  await page
    .locator('.booking-summary')
    .getByRole('button', { name: 'Confirm booking' })
    .click()
  await page.getByRole('heading', { name: 'You are booked in' }).waitFor({
    state: 'visible',
    timeout: 8000,
  })
  await settle(page, 300)
  await capture(page, '16-booking-confirmed.png')

  await page.getByRole('link', { name: 'View my sessions' }).click()
  await page.waitForURL(/\/app\/sessions$/, { timeout: 8000 })
  await settle(page, 300)
  await capture(page, '17-sessions.png')

  await visit(page, '/app/dashboard', 'h1')
  await dismissToasts(page)
  await capture(page, '18-dashboard-updated.png')

  await visit(page, '/app/saved', 'h1')
  await capture(page, '19-saved-mentors.png')

  await visit(page, '/app/profile', 'h1')
  await capture(page, '20-profile.png')

  await context.close()
}

async function captureMobile(browser, base) {
  const { context, page } = await openPage(browser, base, MOBILE)

  await signIn(page)
  await dismissToasts(page)
  await capture(page, '21-mobile-dashboard.png')

  await visit(page, '/app/mentors', 'h1')
  await page.getByRole('button', { name: 'Filters' }).click()
  await page.getByRole('dialog').waitFor({ state: 'visible', timeout: 6000 })
  await settle(page, 300)
  await capture(page, '22-mobile-mentors.png')

  await visit(page, '/app/learn/pricing-your-creative-work/why-pricing-feels-hard', 'h1')
  await capture(page, '23-mobile-lesson.png')

  await context.close()
}

const OVERLAY_CSS = `
#__showcase_caption {
  position: fixed;
  left: 272px;
  bottom: 22px;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 430px;
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(8, 20, 38, 0.93);
  color: #fff;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
  font-family: Inter, system-ui, sans-serif;
  pointer-events: none;
}
#__showcase_caption .__n {
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: #0f766e;
  font-size: 13px;
  font-weight: 700;
}
#__showcase_caption .__t {
  display: block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
#__showcase_caption .__s {
  display: block;
  margin-top: 2px;
  font-size: 11px;
  font-weight: 400;
  opacity: 0.72;
}
#__showcase_cursor {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2147483001;
  width: 18px;
  height: 18px;
  border: 2px solid #0f172a;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.32), 0 8px 18px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    left 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
    top 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
    width 0.12s ease,
    height 0.12s ease;
  opacity: 0;
}
#__showcase_cursor.__visible { opacity: 1; }
#__showcase_cursor.__clicking {
  width: 12px;
  height: 12px;
  border-color: #fff;
  background: #0f766e;
}
`

async function installOverlay(page) {
  await page.evaluate((css) => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)

    const caption = document.createElement('div')
    caption.id = '__showcase_caption'
    caption.innerHTML =
      '<span class="__n">1</span><span><span class="__t">Discover</span><span class="__s">Learn, match and book in one place</span></span>'
    document.body.appendChild(caption)

    const cursor = document.createElement('div')
    cursor.id = '__showcase_cursor'
    document.body.appendChild(cursor)
  }, OVERLAY_CSS)
}

async function setCaption(page, number, title, subtitle) {
  await page.evaluate(
    ({ number, title, subtitle }) => {
      const caption = document.getElementById('__showcase_caption')
      if (!caption) return
      caption.innerHTML = `<span class="__n">${number}</span><span><span class="__t">${title}</span><span class="__s">${subtitle}</span></span>`
    },
    { number, title, subtitle },
  )
}

async function moveCursor(page, locator) {
  const box = await locator.boundingBox()
  if (!box) return
  await page.evaluate(
    ({ x, y }) => {
      const cursor = document.getElementById('__showcase_cursor')
      if (!cursor) return
      cursor.classList.add('__visible')
      cursor.style.left = `${x}px`
      cursor.style.top = `${y}px`
    },
    { x: box.x + box.width / 2, y: box.y + box.height / 2 },
  )
  await sleep(220)
}

async function clickWithCursor(page, locator, after = 200) {
  await locator.scrollIntoViewIfNeeded().catch(() => {})
  await sleep(80)
  await moveCursor(page, locator)
  await page.evaluate(() =>
    document.getElementById('__showcase_cursor')?.classList.add('__clicking'),
  )
  await sleep(60)
  await locator.click()
  await sleep(100)
  await page.evaluate(() =>
    document.getElementById('__showcase_cursor')?.classList.remove('__clicking'),
  )
  await sleep(after)
}

async function scrollTo(page, y, duration = 760) {
  await page.evaluate(
    async ({ y, duration }) => {
      const start = window.scrollY
      const startedAt = performance.now()
      await new Promise((resolve) => {
        const tick = (now) => {
          const progress = Math.min(1, (now - startedAt) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          window.scrollTo(0, start + (y - start) * eased)
          if (progress < 1) requestAnimationFrame(tick)
          else resolve()
        }
        requestAnimationFrame(tick)
      })
    },
    { y, duration },
  )
}

async function startScreencast(page) {
  const session = await page.context().newCDPSession(page)
  const frames = []

  session.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
    frames.push({
      data,
      timestamp:
        typeof metadata?.timestamp === 'number'
          ? metadata.timestamp * 1000
          : Date.now(),
    })
    await session
      .send('Page.screencastFrameAck', { sessionId })
      .catch(() => {})
  })

  await session.send('Page.startScreencast', {
    format: 'png',
    maxWidth: GIF_VIEWPORT.width,
    maxHeight: GIF_VIEWPORT.height,
    everyNthFrame: 1,
  })

  return { session, frames }
}

function resizeRgba(source, sourceWidth, sourceHeight, width, height) {
  if (sourceWidth === width && sourceHeight === height) {
    return Buffer.from(source)
  }

  const target = Buffer.alloc(width * height * 4)
  const xRatio = sourceWidth / width
  const yRatio = sourceHeight / height

  for (let y = 0; y < height; y += 1) {
    const sourceY = (y + 0.5) * yRatio - 0.5
    const y0 = Math.max(0, Math.floor(sourceY))
    const y1 = Math.min(sourceHeight - 1, y0 + 1)
    const weightY = Math.max(0, Math.min(1, sourceY - y0))

    for (let x = 0; x < width; x += 1) {
      const sourceX = (x + 0.5) * xRatio - 0.5
      const x0 = Math.max(0, Math.floor(sourceX))
      const x1 = Math.min(sourceWidth - 1, x0 + 1)
      const weightX = Math.max(0, Math.min(1, sourceX - x0))

      const topLeft = (y0 * sourceWidth + x0) * 4
      const topRight = (y0 * sourceWidth + x1) * 4
      const bottomLeft = (y1 * sourceWidth + x0) * 4
      const bottomRight = (y1 * sourceWidth + x1) * 4
      const targetIndex = (y * width + x) * 4

      for (let channel = 0; channel < 4; channel += 1) {
        const top =
          source[topLeft + channel] +
          (source[topRight + channel] - source[topLeft + channel]) * weightX
        const bottom =
          source[bottomLeft + channel] +
          (source[bottomRight + channel] - source[bottomLeft + channel]) * weightX
        target[targetIndex + channel] = Math.round(
          top + (bottom - top) * weightY,
        )
      }
    }
  }

  return target
}

function decodeAndResize(frame) {
  const png = PNG.sync.read(Buffer.from(frame.data, 'base64'))
  return resizeRgba(
    png.data,
    png.width,
    png.height,
    GIF_SIZE.width,
    GIF_SIZE.height,
  )
}

function buildRenderPlan(frames) {
  const first = frames[0]?.timestamp ?? 0
  const last = frames[frames.length - 1]?.timestamp ?? first
  const duration = Math.max(last - first, 1000)
  const step = 1000 / GIF_FPS
  const plan = []
  let sourceIndex = 0

  for (let elapsed = 0; elapsed <= duration; elapsed += step) {
    while (
      sourceIndex + 1 < frames.length &&
      frames[sourceIndex + 1].timestamp - first <= elapsed
    ) {
      sourceIndex += 1
    }

    const previous = plan[plan.length - 1]
    if (previous && previous.sourceIndex === sourceIndex) {
      previous.delay += step
    } else {
      plan.push({ sourceIndex, delay: step })
    }
  }

  return plan
}

async function encodeGif(frames) {
  if (frames.length === 0) throw new Error('No screencast frames captured.')

  const plan = buildRenderPlan(frames)
  const duration = plan.reduce((total, step) => total + step.delay, 0) / 1000
  log(
    `encoding ${plan.length} GIF frames from ${frames.length} screencast frames (${duration.toFixed(1)}s)`,
  )

  const sampleCount = Math.min(10, frames.length)
  const samples = []
  for (let index = 0; index < sampleCount; index += 1) {
    const frameIndex = Math.floor(
      (index / Math.max(1, sampleCount - 1)) * (frames.length - 1),
    )
    samples.push(decodeAndResize(frames[frameIndex]))
  }
  const palette = quantize(Buffer.concat(samples), 192)

  const gif = GIFEncoder()
  let first = true
  for (const step of plan) {
    const rgba = decodeAndResize(frames[step.sourceIndex])
    const indexed = applyPalette(rgba, palette)
    gif.writeFrame(indexed, GIF_SIZE.width, GIF_SIZE.height, {
      palette: first ? palette : undefined,
      delay: Math.max(20, Math.round(step.delay)),
      repeat: first ? 0 : undefined,
    })
    first = false
  }
  gif.finish()
  await writeFile(GIF_FILE, gif.bytes())
  log(`wrote ${path.relative(ROOT, GIF_FILE)}`)
}

async function captureGif(browser, base) {
  const { context, page } = await openPage(browser, base, GIF_VIEWPORT)
  await installOverlay(page)

  const { session, frames } = await startScreencast(page)
  await sleep(300)

  await setCaption(
    page,
    1,
    'Discover',
    'Learn, match and book in one place',
  )
  await sleep(1000)
  await scrollTo(page, 660, 700)
  await sleep(300)

  await page.evaluate(() => {
    window.location.hash = '/learn'
    window.scrollTo(0, 0)
  })
  await sleep(400)
  await setCaption(page, 1, 'Explore six practical modules', 'Built around real freelance questions')
  await sleep(700)

  await clickWithCursor(
    page,
    page.getByRole('link', { name: /Pricing Your Creative Work/ }).first(),
  )
  await page
    .getByRole('heading', { name: 'Pricing Your Creative Work' })
    .first()
    .waitFor({ state: 'visible', timeout: 6000 })
    .catch(() => {})
  await sleep(300)
  await setCaption(
    page,
    2,
    'Sign in',
    'Continue as the test user — no real account',
  )
  await sleep(700)
  await clickWithCursor(
    page,
    page.locator('.marketing-header').getByRole('link', { name: 'Log in' }).first(),
  )
  await page.getByRole('button', { name: 'Continue as test user' }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await clickWithCursor(
    page,
    page.getByRole('button', { name: 'Continue as test user' }),
  )
  await page.waitForURL(/#\/app\/dashboard/, { timeout: 8000 })
  await settle(page, 150)
  await setCaption(
    page,
    3,
    'Your dashboard',
    'Progress, sessions and saved mentors',
  )
  await sleep(1000)

  await clickWithCursor(
    page,
    page.locator('.app-sidebar__nav').getByRole('link', { name: 'Learn' }),
  )
  await page.getByRole('heading', { name: 'Learn' }).first().waitFor({
    state: 'visible',
    timeout: 6000,
  }).catch(() => {})
  await sleep(300)
  await setCaption(page, 3, 'Learn', 'Pick up where you left off')
  await sleep(600)

  await clickWithCursor(
    page,
    page.getByRole('link', { name: /Pricing Your Creative Work/ }).first(),
  )
  await page.getByRole('link', { name: 'Start module' }).first().waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 3, 'Pricing Your Creative Work', 'Four practical lessons')
  await sleep(700)

  await clickWithCursor(page, page.getByRole('link', { name: 'Start module' }).first())
  await page.getByRole('heading', { name: 'Why pricing feels hard' }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 3, 'Read, reflect, mark complete', 'Progress saves in this browser')
  await sleep(700)
  await scrollTo(page, 560, 700)
  await sleep(200)

  await clickWithCursor(
    page,
    page.getByRole('button', { name: 'Mark complete & continue' }),
  )
  await page.getByRole('heading', { name: 'Three pricing models that work for freelancers' }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 3, 'Lesson complete', 'On to the next one')
  await sleep(800)

  await clickWithCursor(
    page,
    page.locator('.app-sidebar__nav').getByRole('link', { name: 'Mentors' }),
  )
  await page.getByRole('heading', { name: 'Find the right person to ask' }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 4, 'Match', 'Filter by the help you need')
  await sleep(600)

  await clickWithCursor(
    page,
    page.getByRole('button', { name: 'Portfolio Review', exact: true }),
  )
  await sleep(300)
  await setCaption(page, 4, 'Portfolio Review', 'Two mentors match')
  await sleep(650)

  await clickWithCursor(
    page,
    page.getByRole('link', { name: 'Lucas Meyer', exact: true }),
  )
  await page.getByRole('heading', { name: 'Lucas Meyer' }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 4, 'Lucas Meyer', 'Art director · Portfolio review')
  await sleep(750)

  await clickWithCursor(
    page,
    page.getByRole('link', { name: 'Book a session' }).first(),
  )
  await page.getByRole('heading', { name: /Book a session with Lucas Meyer/ }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 5, 'Book', 'Free intro or paid deep dive')
  await sleep(600)

  const slot = page.locator('.slot-button').first()
  await clickWithCursor(page, slot)
  await setCaption(page, 5, 'Choose a time', 'Your summary updates as you go')
  await sleep(650)

  await clickWithCursor(
    page,
    page.locator('.booking-summary').getByRole('button', { name: 'Confirm booking' }),
  )
  await page.getByRole('heading', { name: 'You are booked in' }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 5, 'You are booked in', 'No payment or calendar invite in the prototype')
  await sleep(900)

  await clickWithCursor(
    page,
    page.getByRole('link', { name: 'View my sessions' }),
  )
  await page.getByRole('heading', { name: 'Sessions', exact: true }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 6, 'Keep track', 'Every conversation in one place')
  await sleep(750)

  await clickWithCursor(
    page,
    page.locator('.app-sidebar__nav').getByRole('link', { name: 'Home' }),
  )
  await page.getByRole('heading', { name: /Welcome back/ }).waitFor({
    state: 'visible',
    timeout: 6000,
  })
  await sleep(300)
  await setCaption(page, 6, 'Learn. Match. Book.', 'Launchpad — start with confidence')
  await sleep(1200)

  await session.send('Page.stopScreencast').catch(() => {})
  await sleep(400)
  await context.close()

  await encodeGif(frames)
}

async function main() {
  await mkdir(SCREEN_DIR, { recursive: true })
  await rm(GIF_FILE, { force: true })

  const executablePath = await findChromium()
  log(`using Chromium at ${executablePath}`)

  const { server, base } = await startServer()
  log(`serving ${base}`)

  const browser = await chromium.launch({
    headless: true,
    executablePath,
  })

  try {
    log('capturing desktop stills')
    await captureStills(browser, base)
    log('capturing mobile stills')
    await captureMobile(browser, base)
    log('recording showcase GIF')
    await captureGif(browser, base)
  } finally {
    await browser.close()
    await server.close()
  }

  log('done')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

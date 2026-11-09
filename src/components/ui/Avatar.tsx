import { cn } from '../../lib/cn'
import { asset } from '../../lib/assets'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type AvatarProps = {
  src: string
  alt: string
  size?: AvatarSize
  ring?: boolean
  className?: string
}

export function Avatar({
  src,
  alt,
  size = 'md',
  ring = false,
  className,
}: AvatarProps) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      className={cn('avatar', `avatar--${size}`, ring && 'avatar--ring', className)}
      decoding="async"
    />
  )
}

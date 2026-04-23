import Image from 'next/image'

interface LogoProps {
  size?: number
}

const LOGO_ASSET = '/branding/futle-logo-transparent.png'
const LOGO_RATIO = 5.16

export default function Logo({ size = 40 }: LogoProps) {
  const height = size
  const width = Math.round(size * LOGO_RATIO)

  return (
    <Image
      src={LOGO_ASSET}
      alt="Futle"
      width={width}
      height={height}
      priority
      sizes={`${width}px`}
      style={{
        display: 'block',
        width,
        height,
        objectFit: 'contain',
        flexShrink: 0,
      }}
    />
  )
}

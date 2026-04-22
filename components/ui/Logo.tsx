import Image from 'next/image'

interface LogoProps {
  size?: number
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <Image
      src="/logo-icon.png"
      alt="Futle"
      width={size}
      height={size}
      priority
      style={{ objectFit: 'contain' }}
    />
  )
}

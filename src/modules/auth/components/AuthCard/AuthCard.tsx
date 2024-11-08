import { Text } from '@developerskyi/react-components'
import Image from 'next/image'

export type AuthCardProps = {
  logo: string
  title: string
  description: string
  imageBackground?: string
  children: React.ReactNode
}
export const AuthCard = ({
  logo,
  title,
  description,
  imageBackground,
  children,
}: AuthCardProps) => {
  return (
    <div className="flex flex-row-reverse gap-8">
      {imageBackground && (
        <div className="relative flex h-screen w-1/2 items-center justify-center">
          <Image src={imageBackground} fill alt="background" />
        </div>
      )}
      <div className="flex h-screen w-1/2 flex-col items-center justify-center gap-2 bg-neutral-dark text-neutral-white">
        <div className="flex flex-col gap-4">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="mb-4"
          />
          <Text variant="2xl/bold" className="max-w-80 text-left">
            {title}
          </Text>
          <Text className="max-w-80 text-left text-sm">{description}</Text>
          {children}
        </div>
      </div>
    </div>
  )
}

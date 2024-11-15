'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils'
import { Text } from '@developerskyi/react-components'

export type MenuItem = {
  title: string
  link: string
}

export type NavbarProps = {
  menuItems: MenuItem[]
  logo?: ReactNode
  actions?: ReactNode
}

const NavBarLink = ({ title, link }: MenuItem) => (
  <Link href={link}>{title}</Link>
)

type NavBarLogoProps = {
  src: string
  alt: string
  text?: string
}

export const NavBarLogo = ({ src, alt, text }: NavBarLogoProps) => (
  <div className="flex-wrap items-center">
    <Image src={src} alt={alt} width={80} height={20} />
    <Text variant="md/semibold" className="text-neutral-white">
      {text}
    </Text>
  </div>
)

export const NavBar = ({ menuItems, logo, actions }: NavbarProps) => {
  const pathname = usePathname()

  const isActive = (link: string) => pathname === link

  return (
    <nav className="flex w-full items-center justify-between gap-4 bg-neutral-dark px-4">
      <div className="flex w-full items-center gap-4">
        {logo}
        <ul className="flex w-full gap-6">
          {menuItems.map((item) => (
            <li
              key={item.link}
              className={cn(
                `hover:underline hover:translate-x-1 hover:duration-500 hover:ease-in-out
                -translate-x-1 duration-500 ease-in-out`,
                isActive(item.link)
                  ? 'text-primary-regular font-bold'
                  : 'text-neutral-light'
              )}
            >
              <NavBarLink {...item} />
            </li>
          ))}
        </ul>
      </div>
      {actions && <div className="flex gap-4">{actions}</div>}
    </nav>
  )
}

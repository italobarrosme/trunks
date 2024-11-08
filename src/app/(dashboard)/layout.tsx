import { NavBar, NavBarLogo } from '@/modules/navigation/components/Navbar'
import { ReactNode } from 'react'

const links = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Transações', link: '/transactions' },
  { title: 'Assinatura', link: '/subscriptions' },
]

type Props = {
  children?: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <NavBar
        menuItems={links}
        logo={<NavBarLogo src="/logo_white.png" alt="logo" />}
        actions={<button className="text-neutral-white">Sair</button>}
      ></NavBar>
      {children}
    </>
  )
}

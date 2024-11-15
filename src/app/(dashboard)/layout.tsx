import { NavBar, NavBarLogo } from '@/modules/navigation/components/Navbar'
import { userButtonAppearance } from '@/providers/ClerkProviderWrapper'
import { UserButton } from '@clerk/nextjs'
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
        actions={
          <div className="w-full">
            <UserButton showName appearance={userButtonAppearance} />
          </div>
        }
      ></NavBar>
      {children}
    </>
  )
}

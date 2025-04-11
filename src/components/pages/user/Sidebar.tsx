import { User } from '@/types/auth/user'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ArrowLeftIcon, Ellipsis, KeyIcon, LogOutIcon, User2Icon } from 'lucide-react'
import LogoutBtn from '@/components/custom/LogoutBtn'
import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { ModeToggle } from '@/components/mode-toggle'

type Props = {
  user: User | null
}

type MenuItem = {
  name: string
  icon: ReactNode
  asLink: boolean
  path: string
  callBack?: () => void
}

const menuItems: MenuItem[] = [
  {
    name: 'Go Back',
    path: '/',
    icon: <ArrowLeftIcon />,
    asLink: true,
  },
  {
    name: 'Profile',
    path: '/account/profile',
    icon: <User2Icon />,
    asLink: true,
  },
  {
    name: 'Change Password',
    path: '/account/change-password',
    icon: <Ellipsis />,
    asLink: true,
  },
  {
    name: 'Token',
    path: '/account/token',
    icon: <KeyIcon />,
    asLink: true,
  },
]

function AppSidebar({ user }: Props) {
  const location = useLocation()
  const isActive = (currentPath: string, itemPath: string) =>
    currentPath === itemPath || (currentPath.startsWith(itemPath) && itemPath !== '/')
  const activeClassName = 'font-bold underline'

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item, idx) => (
              <SidebarMenuItem key={idx}>
                {item.asLink ? (
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-2 ${isActive(location.pathname, item.path) ? activeClassName : ''}`}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem className="text-sm">
              <SidebarMenuButton asChild>
                <div className="flex items-center gap-2">
                  <LogOutIcon />
                  <LogoutBtn />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar

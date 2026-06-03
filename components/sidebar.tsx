'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import {
  Radar,
  LayoutDashboard,
  Globe,
  Tag,
  FileText,
} from 'lucide-react'

const navItems = [
  { href: '/', label: '概览', icon: LayoutDashboard, roles: ['sales', 'admin'] },
  { href: '/leads', label: '线索中心', icon: FileText, roles: ['sales', 'admin'] },
  { href: '/websites', label: '网站管理', icon: Globe, roles: ['admin'] },
  { href: '/keywords', label: '关键词管理', icon: Tag, roles: ['admin'] },
]

export function Sidebar() {
  const pathname = usePathname()
  const { role } = useAuth()

  const filteredNavItems = navItems.filter(item => item.roles.includes(role))

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Radar className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">商机雷达</h1>
            <p className="text-xs text-muted-foreground">招投标自动发现</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>


      </div>
    </aside>
  )
}

'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LoginDialog } from '@/components/login-dialog'
import { LogOut, User, ChevronDown, LogIn, Users, Shield } from 'lucide-react'

export function Header() {
  const { user, role, logout, setRole } = useAuth()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  return (
    <>
      <header className="fixed right-0 top-0 z-50 ml-64 flex h-16 w-[calc(100%-16rem)] items-center justify-end gap-3 border-b border-border bg-background px-8">
        {/* 角色切换按钮 */}
        <div className="flex items-center rounded-lg border border-border bg-muted/50 p-1">
          <button
            onClick={() => setRole('sales')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              role === 'sales'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users className="h-4 w-4" />
            销售
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              role === 'admin'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Shield className="h-4 w-4" />
            管理员
          </button>
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{user.name || '用户'}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-foreground">{user.name || '用户'}</p>
                <p className="text-xs text-muted-foreground">{user.email || ''}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => setLoginDialogOpen(true)} className="gap-2">
            <LogIn className="h-4 w-4" />
            登录
          </Button>
        )}
      </header>
      
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  )
}

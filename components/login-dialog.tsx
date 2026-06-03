'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/auth-context'
import { Radar, Mail, Smartphone, Loader2 } from 'lucide-react'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [feishuLoading, setFeishuLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('请填写邮箱和密码')
      return
    }
    
    // 验证企业邮箱格式
    if (!email.includes('@') || email.endsWith('@gmail.com') || email.endsWith('@qq.com') || email.endsWith('@163.com')) {
      setError('请使用企业邮箱登录')
      return
    }
    
    const success = await login('email', { email, password })
    if (success) {
      onOpenChange(false)
      setEmail('')
      setPassword('')
    } else {
      setError('登录失败，请检查邮箱和密码')
    }
  }

  const handleFeishuLogin = async () => {
    setFeishuLoading(true)
    setError('')
    
    // 模拟飞书扫码登录
    const success = await login('feishu')
    setFeishuLoading(false)
    if (success) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
            <Radar className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl text-center">登录商机雷达</DialogTitle>
          <DialogDescription className="text-center">
            选择登录方式以访问系统
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="feishu" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="feishu" className="data-[state=active]:bg-background">
              <Smartphone className="mr-2 h-4 w-4" />
              飞书登录
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-background">
              <Mail className="mr-2 h-4 w-4" />
              邮箱登录
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="feishu" className="mt-4">
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-3">
                <div className="flex h-40 w-40 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30">
                  {feishuLoading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">正在登录...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="grid h-16 w-16 place-items-center rounded-lg bg-primary/10">
                        <svg viewBox="0 0 24 24" className="h-10 w-10 text-primary" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="1" stroke="currentColor" fill="none"/>
                        </svg>
                      </div>
                      <p className="text-xs text-muted-foreground">扫码区域</p>
                    </div>
                  )}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  请使用飞书APP扫描二维码登录
                </p>
              </div>
              <Separator className="bg-border" />
              <Button 
                className="w-full" 
                onClick={handleFeishuLogin}
                disabled={feishuLoading}
              >
                {feishuLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    登录中...
                  </>
                ) : (
                  '模拟飞书登录'
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Demo演示：点击按钮模拟飞书扫码登录
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="mt-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">企业邮箱</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="yourname@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">密码</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    登录中...
                  </>
                ) : (
                  '登录'
                )}
              </Button>
              
              <p className="text-center text-xs text-muted-foreground">
                Demo演示：输入任意企业邮箱和密码即可登录
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

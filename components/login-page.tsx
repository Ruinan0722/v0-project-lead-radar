'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/auth-context'
import { Radar, Mail, Smartphone, Loader2 } from 'lucide-react'

export function LoginPage() {
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
    if (!success) {
      setError('登录失败，请检查邮箱和密码')
    }
  }

  const handleFeishuLogin = async () => {
    setFeishuLoading(true)
    setError('')
    
    // 模拟飞书扫码登录
    await login('feishu')
    setFeishuLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
            <Radar className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-foreground">招投标商机雷达</CardTitle>
          <CardDescription>自动发现与公司业务相关的招标项目</CardDescription>
        </CardHeader>
        <CardContent>
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
            
            <TabsContent value="feishu" className="mt-6">
              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30">
                    {feishuLoading ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">正在登录...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="grid h-20 w-20 place-items-center rounded-lg bg-primary/10">
                          <svg viewBox="0 0 24 24" className="h-12 w-12 text-primary" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="1" stroke="currentColor" fill="none"/>
                          </svg>
                        </div>
                        <p className="text-sm text-muted-foreground">扫码区域</p>
                      </div>
                    )}
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    请使用飞书APP扫描二维码登录
                  </p>
                </div>
                <Separator className="bg-border" />
                <Button 
                  className="w-full bg-primary text-primary-foreground" 
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
            
            <TabsContent value="email" className="mt-6">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">企业邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@company.com"
                    className="bg-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    className="bg-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground"
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
        </CardContent>
      </Card>
    </div>
  )
}

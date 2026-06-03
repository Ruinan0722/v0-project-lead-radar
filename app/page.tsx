'use client'

import { useAuth } from '@/lib/auth-context'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCards } from '@/components/stats-cards'
import { LeadsTable } from '@/components/leads-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Clock, AlertTriangle, Loader2 } from 'lucide-react'

export default function Dashboard() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Header />
      <main className="ml-64 mt-16 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">商机概览</h1>
          <p className="text-muted-foreground">实时监控招投标商机动态</p>
        </div>

        <StatsCards />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* 快捷操作 */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">今日摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-success/10 p-3">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-sm font-medium text-foreground">新增12条线索</p>
                    <p className="text-xs text-muted-foreground">较昨日增加3条</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-warning/10 p-3">
                  <Clock className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium text-foreground">5条即将截止</p>
                    <p className="text-xs text-muted-foreground">3天内截止的项目</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="text-sm font-medium text-foreground">2个高优先级未处理</p>
                    <p className="text-xs text-muted-foreground">需要立即关注</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">热门关键词</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    AI营销 <span className="ml-1 text-xs opacity-70">67</span>
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    大模型 <span className="ml-1 text-xs opacity-70">89</span>
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    AIGC <span className="ml-1 text-xs opacity-70">52</span>
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    GEO <span className="ml-1 text-xs opacity-70">45</span>
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    生成式AI <span className="ml-1 text-xs opacity-70">38</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 最新线索 */}
          <div className="lg:col-span-2">
            <LeadsTable limit={4} />
          </div>
        </div>
      </main>
    </div>
  )
}

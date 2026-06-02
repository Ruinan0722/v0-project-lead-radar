'use client'

import { mockStats } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, TrendingUp, AlertCircle, Clock, Globe, Tag } from 'lucide-react'

const stats = [
  {
    title: '总线索数',
    value: mockStats.totalLeads,
    icon: FileText,
    description: '已采集招标项目'
  },
  {
    title: '今日新增',
    value: mockStats.newToday,
    icon: TrendingUp,
    description: '较昨日增加3条',
    highlight: true
  },
  {
    title: '高优先级',
    value: mockStats.highPriority,
    icon: AlertCircle,
    description: '需要重点关注'
  },
  {
    title: '待跟进',
    value: mockStats.pendingFollowUp,
    icon: Clock,
    description: '等待销售处理'
  },
  {
    title: '监控网站',
    value: mockStats.websites,
    icon: Globe,
    description: '个数据源'
  },
  {
    title: '关键词',
    value: mockStats.keywords,
    icon: Tag,
    description: '个监控关键词'
  }
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.highlight ? 'text-accent' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.highlight ? 'text-accent' : 'text-foreground'}`}>
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

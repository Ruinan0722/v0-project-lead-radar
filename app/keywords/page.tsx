'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { KeywordsManager } from '@/components/keywords-manager'

export default function KeywordsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Header />
      <main className="ml-64 mt-16 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">关键词管理</h1>
          <p className="text-muted-foreground">配置业务关键词和排除词，系统据此筛选招标项目</p>
        </div>
        <KeywordsManager />
      </main>
    </div>
  )
}

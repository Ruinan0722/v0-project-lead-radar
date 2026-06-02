import { Sidebar } from '@/components/sidebar'
import { WebsitesManager } from '@/components/websites-manager'

export default function WebsitesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">网站管理</h1>
          <p className="text-muted-foreground">配置需要监控的招投标网站数据源</p>
        </div>
        <WebsitesManager />
      </main>
    </div>
  )
}

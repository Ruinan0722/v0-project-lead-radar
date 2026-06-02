import { Sidebar } from '@/components/sidebar'
import { LeadsTable } from '@/components/leads-table'

export default function LeadsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">线索中心</h1>
          <p className="text-muted-foreground">查看和管理所有招标商机线索</p>
        </div>
        <LeadsTable />
      </main>
    </div>
  )
}

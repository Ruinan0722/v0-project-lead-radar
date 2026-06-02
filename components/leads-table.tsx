'use client'

import { useState } from 'react'
import { mockLeads, type BidLead } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ExternalLink, Search, Eye } from 'lucide-react'
import { LeadDetailDialog } from './lead-detail-dialog'

const statusColors: Record<string, string> = {
  '未查看': 'bg-muted text-muted-foreground',
  '已查看': 'bg-primary/20 text-primary',
  '跟进中': 'bg-warning/20 text-warning',
  '已投标': 'bg-success/20 text-success',
  '已放弃': 'bg-destructive/20 text-destructive'
}

const levelColors: Record<string, string> = {
  '高': 'bg-destructive/20 text-destructive border-destructive/30',
  '中': 'bg-warning/20 text-warning border-warning/30',
  '低': 'bg-muted text-muted-foreground border-muted'
}

export function LeadsTable({ limit }: { limit?: number }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<BidLead | null>(null)

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.projectName.toLowerCase().includes(search.toLowerCase()) ||
      lead.bidder.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesLevel = levelFilter === 'all' || lead.leadLevel === levelFilter
    return matchesSearch && matchesStatus && matchesLevel
  })

  const displayLeads = limit ? filteredLeads.slice(0, limit) : filteredLeads

  const formatBudget = (budget: number | null) => {
    if (!budget) return '-'
    if (budget >= 10000) {
      return `${(budget / 10000).toFixed(0)}万`
    }
    return `${budget}元`
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-foreground">招标线索</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索项目名称或招标单位..."
                className="w-64 bg-input pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-input">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="未查看">未查看</SelectItem>
                <SelectItem value="已查看">已查看</SelectItem>
                <SelectItem value="跟进中">跟进中</SelectItem>
                <SelectItem value="已投标">已投标</SelectItem>
                <SelectItem value="已放弃">已放弃</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-32 bg-input">
                <SelectValue placeholder="等级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部等级</SelectItem>
                <SelectItem value="高">高优先级</SelectItem>
                <SelectItem value="中">中优先级</SelectItem>
                <SelectItem value="低">低优先级</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">项目名称</TableHead>
                <TableHead className="text-muted-foreground">招标单位</TableHead>
                <TableHead className="text-muted-foreground">地区</TableHead>
                <TableHead className="text-muted-foreground">预算</TableHead>
                <TableHead className="text-muted-foreground">截止时间</TableHead>
                <TableHead className="text-muted-foreground">关键词</TableHead>
                <TableHead className="text-muted-foreground">相关度</TableHead>
                <TableHead className="text-muted-foreground">等级</TableHead>
                <TableHead className="text-muted-foreground">状态</TableHead>
                <TableHead className="text-muted-foreground">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLeads.map((lead) => (
                <TableRow key={lead.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="max-w-xs">
                    <div className="truncate font-medium text-foreground" title={lead.projectName}>
                      {lead.projectName}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.bidder}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.region}</TableCell>
                  <TableCell className="text-foreground">{formatBudget(lead.budget)}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.deadline || '-'}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {lead.keywords.slice(0, 2).map((kw) => (
                        <Badge key={kw} variant="secondary" className="text-xs">
                          {kw}
                        </Badge>
                      ))}
                      {lead.keywords.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{lead.keywords.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${lead.relevanceScore >= 80 ? 'text-success' : lead.relevanceScore >= 60 ? 'text-warning' : 'text-muted-foreground'}`}>
                      {lead.relevanceScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={levelColors[lead.leadLevel]}>
                      {lead.leadLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a href={lead.sourceUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {displayLeads.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            暂无符合条件的线索
          </div>
        )}
      </CardContent>
      <LeadDetailDialog
        lead={selectedLead}
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
      />
    </Card>
  )
}

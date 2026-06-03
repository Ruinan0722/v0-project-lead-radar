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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { ExternalLink, Search, Eye, Download, CalendarIcon } from 'lucide-react'
import { format, subDays, isAfter, isBefore, parseISO, startOfDay } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { LeadDetailDialog } from './lead-detail-dialog'

const statusColors: Record<string, string> = {
  '未查看': 'bg-muted text-muted-foreground',
  '已查看': 'bg-primary/20 text-primary',
  '跟进中': 'bg-warning/20 text-warning',
  '已投标': 'bg-success/20 text-success',
  '已放弃': 'bg-destructive/20 text-destructive'
}

const bidTypeColors: Record<string, string> = {
  '招标公告': 'bg-primary/20 text-primary',
  '磋商公告': 'bg-warning/20 text-warning',
  '中标公告': 'bg-success/20 text-success',
  '询价公告': 'bg-muted text-muted-foreground',
  '竞争性谈判': 'bg-accent/20 text-accent'
}

export function LeadsTable({ limit }: { limit?: number }) {
  const [leads, setLeads] = useState<BidLead[]>(mockLeads)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [timeFilter, setTimeFilter] = useState<string>('all')
  const [customDateRange, setCustomDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedLead, setSelectedLead] = useState<BidLead | null>(null)

  const handleSaveLead = (id: string, status: string, notes: string) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? { ...lead, status: status as BidLead['status'], notes, lastFollowUp: new Date().toISOString().split('T')[0] }
          : lead
      )
    )
  }

  const getDateRange = () => {
    const today = startOfDay(new Date())
    switch (timeFilter) {
      case 'today':
        return { from: today, to: new Date() }
      case '7days':
        return { from: subDays(today, 7), to: new Date() }
      case '30days':
        return { from: subDays(today, 30), to: new Date() }
      case 'custom':
        return customDateRange
      default:
        return null
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.projectName.toLowerCase().includes(search.toLowerCase()) ||
      lead.bidder.toLowerCase().includes(search.toLowerCase()) ||
      lead.keywords.some((kw) => kw.toLowerCase().includes(search.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesType = typeFilter === 'all' || lead.bidType === typeFilter
    
    // 时间筛选
    const dateRange = getDateRange()
    let matchesTime = true
    if (dateRange?.from) {
      const publishDate = parseISO(lead.publishDate)
      matchesTime = isAfter(publishDate, dateRange.from) || publishDate.getTime() === dateRange.from.getTime()
      if (dateRange.to) {
        matchesTime = matchesTime && (isBefore(publishDate, dateRange.to) || publishDate.getTime() === dateRange.to.getTime())
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesTime
  })

  const displayLeads = limit ? filteredLeads.slice(0, limit) : filteredLeads

  const formatBudget = (budget: number | null) => {
    if (!budget) return '-'
    if (budget >= 10000) {
      return `${(budget / 10000).toFixed(0)}万`
    }
    return `${budget}元`
  }

  const exportToCSV = () => {
    const headers = [
      '项目名称', '招标单位', '招标编号', '所属行业', '所属地区',
      '发布时间', '截止时间', '预算金额', '招标类型', '联系人',
      '联系电话', '信息来源', '命中关键词', '相关度', '负责人', '跟进状态'
    ]
    
    const rows = filteredLeads.map((lead) => [
      lead.projectName,
      lead.bidder,
      lead.bidNumber || '',
      lead.industry || '',
      lead.region,
      lead.publishDate,
      lead.deadline || '',
      lead.budget ? String(lead.budget) : '',
      lead.bidType,
      lead.contact || '',
      lead.contactPhone || '',
      lead.source,
      lead.keywords.join('/'),
      `${lead.relevanceScore}%`,
      lead.assignee || '',
      lead.status
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `招标线索_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
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
                placeholder="搜索项目/单位/关键词..."
                className="w-56 bg-input pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-28 bg-input">
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-28 bg-input">
                <SelectValue placeholder="类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部类型</SelectItem>
                <SelectItem value="招标公告">招标公告</SelectItem>
                <SelectItem value="磋商公告">磋商公告</SelectItem>
                <SelectItem value="中标公告">中标公告</SelectItem>
                <SelectItem value="询价公告">询价公告</SelectItem>
                <SelectItem value="竞争性谈判">竞争性谈判</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32 bg-input">
                <SelectValue placeholder="发布时间" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部时间</SelectItem>
                <SelectItem value="today">今天</SelectItem>
                <SelectItem value="7days">近 7 天</SelectItem>
                <SelectItem value="30days">近 30 天</SelectItem>
                <SelectItem value="custom">自定义</SelectItem>
              </SelectContent>
            </Select>
            {timeFilter === 'custom' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 bg-input">
                    <CalendarIcon className="h-4 w-4" />
                    {customDateRange.from ? (
                      customDateRange.to ? (
                        <>
                          {format(customDateRange.from, 'MM/dd', { locale: zhCN })} - {format(customDateRange.to, 'MM/dd', { locale: zhCN })}
                        </>
                      ) : (
                        format(customDateRange.from, 'yyyy/MM/dd', { locale: zhCN })
                      )
                    ) : (
                      '选择日期'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card" align="start">
                  <Calendar
                    mode="range"
                    selected={{ from: customDateRange.from, to: customDateRange.to }}
                    onSelect={(range) => setCustomDateRange({ from: range?.from, to: range?.to })}
                    locale={zhCN}
                  />
                </PopoverContent>
              </Popover>
            )}
            {!limit && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={exportToCSV}
              >
                <Download className="h-4 w-4" />
                导出
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground min-w-[200px]">项目名称</TableHead>
                <TableHead className="text-muted-foreground">招标单位</TableHead>
                <TableHead className="text-muted-foreground">行业</TableHead>
                <TableHead className="text-muted-foreground">地区</TableHead>
                <TableHead className="text-muted-foreground">预算</TableHead>
                <TableHead className="text-muted-foreground">发布日期</TableHead>
                <TableHead className="text-muted-foreground">截止时间</TableHead>
                <TableHead className="text-muted-foreground">类型</TableHead>
                <TableHead className="text-muted-foreground">来源</TableHead>
                <TableHead className="text-muted-foreground">关键词</TableHead>
                <TableHead className="text-muted-foreground">相关度</TableHead>
                <TableHead className="text-muted-foreground">负责人</TableHead>
                <TableHead className="text-muted-foreground">状态</TableHead>
                <TableHead className="text-muted-foreground">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLeads.map((lead) => (
                <TableRow key={lead.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="max-w-[200px]">
                    <div className="truncate font-medium text-foreground" title={lead.projectName}>
                      {lead.projectName}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[120px]">
                    <div className="truncate" title={lead.bidder}>{lead.bidder}</div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.industry || '-'}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.region}</TableCell>
                  <TableCell className="text-foreground">{formatBudget(lead.budget)}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{lead.publishDate}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{lead.deadline || '-'}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${bidTypeColors[lead.bidType]}`}>
                      {lead.bidType.replace('公告', '')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{lead.source}</TableCell>
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
                      {lead.relevanceScore}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.assignee || '-'}</TableCell>
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
                        title="查看详情"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="打开原文"
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
        onSave={handleSaveLead}
      />
    </Card>
  )
}

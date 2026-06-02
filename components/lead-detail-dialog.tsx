'use client'

import { useState } from 'react'
import { type BidLead } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  ExternalLink,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Wallet,
  FileText,
  Sparkles,
  User,
  MessageSquare
} from 'lucide-react'

interface LeadDetailDialogProps {
  lead: BidLead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusOptions = ['未查看', '已查看', '跟进中', '已投标', '已放弃'] as const

export function LeadDetailDialog({ lead, open, onOpenChange }: LeadDetailDialogProps) {
  const [status, setStatus] = useState(lead?.status || '未查看')
  const [notes, setNotes] = useState(lead?.notes || '')

  if (!lead) return null

  const formatBudget = (budget: number | null) => {
    if (!budget) return '未公开'
    if (budget >= 10000) {
      return `${(budget / 10000).toFixed(0)}万元`
    }
    return `${budget}元`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">{lead.projectName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基础信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">招标单位：</span>
              <span className="text-foreground">{lead.bidder}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">地区：</span>
              <span className="text-foreground">{lead.region}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">发布时间：</span>
              <span className="text-foreground">{lead.publishDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">截止时间：</span>
              <span className="text-foreground">{lead.deadline || '未公开'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">预算金额：</span>
              <span className="font-medium text-foreground">{formatBudget(lead.budget)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">来源：</span>
              <span className="text-foreground">{lead.source}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">命中关键词：</span>
            {lead.keywords.map((kw) => (
              <Badge key={kw} variant="secondary">
                {kw}
              </Badge>
            ))}
          </div>

          <Separator className="bg-border" />

          {/* AI 分析 */}
          <div className="rounded-lg bg-secondary/50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">AI 智能分析</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${lead.relevanceScore >= 80 ? 'text-success' : lead.relevanceScore >= 60 ? 'text-warning' : 'text-muted-foreground'}`}>
                  {lead.relevanceScore}%
                </div>
                <div className="text-xs text-muted-foreground">相关度</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${lead.leadLevel === '高' ? 'text-destructive' : lead.leadLevel === '中' ? 'text-warning' : 'text-muted-foreground'}`}>
                  {lead.leadLevel}
                </div>
                <div className="text-xs text-muted-foreground">线索等级</div>
              </div>
              <div className="text-center">
                <Badge className={lead.status === '跟进中' ? 'bg-warning/20 text-warning' : lead.status === '已投标' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}>
                  {lead.status}
                </Badge>
                <div className="mt-1 text-xs text-muted-foreground">当前状态</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">项目摘要：</span>
                {lead.summary}
              </p>
              {lead.relevanceScore >= 80 && (
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">跟进建议：</span>
                  建议SDR当天联系采购单位，确认项目需求范围和投标条件。
                </p>
              )}
            </div>
          </div>

          <Separator className="bg-border" />

          {/* 招标正文 */}
          <div>
            <h4 className="mb-2 font-medium text-foreground">招标内容摘要</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{lead.content}</p>
            <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
              <a href={lead.sourceUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                查看原文
              </a>
            </Button>
          </div>

          <Separator className="bg-border" />

          {/* 跟进信息 */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">跟进信息</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">负责人</Label>
                <div className="mt-1 flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{lead.assignee || '未分配'}</span>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">跟进状态</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="mt-1 bg-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">
                <MessageSquare className="mr-1 inline h-3 w-3" />
                跟进备注
              </Label>
              <Textarea
                className="mt-1 bg-input"
                placeholder="添加跟进备注..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
            {lead.lastFollowUp && (
              <p className="text-xs text-muted-foreground">
                最近跟进：{lead.lastFollowUp}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              保存
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

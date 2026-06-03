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
  MessageSquare,
  Phone,
  Hash,
  Briefcase,
  Loader2
} from 'lucide-react'

interface LeadDetailDialogProps {
  lead: BidLead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (id: string, status: string, notes: string) => void
}

const statusOptions = ['未查看', '已查看', '跟进中', '已投标', '已放弃'] as const

const bidTypeColors: Record<string, string> = {
  '招标公告': 'bg-primary/20 text-primary',
  '磋商公告': 'bg-warning/20 text-warning',
  '中标公告': 'bg-success/20 text-success',
  '询价公告': 'bg-muted text-muted-foreground',
  '竞争性谈判': 'bg-accent/20 text-accent'
}

export function LeadDetailDialog({ lead, open, onOpenChange, onSave }: LeadDetailDialogProps) {
  const [status, setStatus] = useState(lead?.status || '未查看')
  const [notes, setNotes] = useState(lead?.notes || '')
  const [isSaving, setIsSaving] = useState(false)

  // 当lead变化时更新状态
  if (lead && (status !== lead.status || notes !== lead.notes)) {
    if (status === (lead?.status || '未查看') && notes === (lead?.notes || '')) {
      // 初始加载，不做任何事
    }
  }

  const handleSave = async () => {
    if (!lead || !onSave) return
    setIsSaving(true)
    // 模拟保存延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    onSave(lead.id, status, notes)
    setIsSaving(false)
    onOpenChange(false)
  }

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
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-xl text-foreground">{lead.projectName}</DialogTitle>
            <Badge className={bidTypeColors[lead.bidType]}>{lead.bidType}</Badge>
          </div>
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
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">招标编号：</span>
              <span className="text-foreground">{lead.bidNumber || '未公开'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">所属行业：</span>
              <span className="text-foreground">{lead.industry || '未分类'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">所属地区：</span>
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
              <span className={`${lead.deadline ? 'text-warning font-medium' : 'text-foreground'}`}>
                {lead.deadline || '未公开'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">预算金额：</span>
              <span className="font-medium text-foreground">{formatBudget(lead.budget)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">信息来源：</span>
              <span className="text-foreground">{lead.source}</span>
            </div>
          </div>

          {/* 联系方式 */}
          <div className="rounded-lg bg-secondary/30 p-3">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">联系人：</span>
                <span className="text-foreground">{lead.contact || '未公开'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">联系电话：</span>
                <span className="text-foreground font-medium">{lead.contactPhone || '未公开'}</span>
              </div>
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
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center rounded-lg bg-background/50 p-3">
                <div className={`text-2xl font-bold ${lead.relevanceScore >= 80 ? 'text-success' : lead.relevanceScore >= 60 ? 'text-warning' : 'text-muted-foreground'}`}>
                  {lead.relevanceScore}
                </div>
                <div className="text-xs text-muted-foreground">相关度评分（满分100）</div>
              </div>
              <div className="text-center rounded-lg bg-background/50 p-3">
                <Badge className={lead.status === '跟进中' ? 'bg-warning/20 text-warning' : lead.status === '已投标' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}>
                  {lead.status}
                </Badge>
                <div className="mt-1 text-xs text-muted-foreground">当前跟进状态</div>
              </div>
            </div>
            {lead.relevanceScore >= 80 && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-success">高度匹配：</span>
                建议SDR当天联系采购单位，确认项目需求范围和投标条件。
              </p>
            )}
            {lead.relevanceScore >= 60 && lead.relevanceScore < 80 && (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-warning">中度匹配：</span>
                建议进一步了解项目详情，评估是否符合公司业务方向。
              </p>
            )}
          </div>

          <Separator className="bg-border" />

          {/* 招标正文 */}
          <div>
            <h4 className="mb-2 font-medium text-foreground">招标内容</h4>
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
                备注
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
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                '保存'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

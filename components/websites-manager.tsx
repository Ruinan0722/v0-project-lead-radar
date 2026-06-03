'use client'

import { useState } from 'react'
import { mockWebsites, type WebsiteConfig } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, ExternalLink, CheckCircle, XCircle, Trash2 } from 'lucide-react'

export function WebsitesManager() {
  const [websites, setWebsites] = useState<WebsiteConfig[]>(mockWebsites)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    needsLogin: false,
    hasCaptcha: false
  })

  const resetForm = () => {
    setFormData({
      name: '',
      url: '',
      needsLogin: false,
      hasCaptcha: false
    })
  }

  const toggleStatus = (id: string) => {
    setWebsites((prev) =>
      prev.map((site) =>
        site.id === id
          ? { ...site, status: site.status === '启用' ? '停用' : '启用' }
          : site
      )
    )
  }

  const addWebsite = () => {
    if (!formData.name || !formData.url) return
    const newSite: WebsiteConfig = {
      id: String(Date.now()),
      name: formData.name,
      url: formData.url,
      needsLogin: formData.needsLogin,
      hasCaptcha: formData.hasCaptcha,
      frequency: '每天',
      status: '启用',
      lastCrawlTime: null,
      lastCrawlResult: null,
      failureReason: null
    }
    setWebsites((prev) => [...prev, newSite])
    resetForm()
    setAddDialogOpen(false)
  }

  const deleteWebsite = (id: string) => {
    setWebsites((prev) => prev.filter((site) => site.id !== id))
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">网站采集管理</CardTitle>
            <CardDescription>配置需要监控的招投标网站</CardDescription>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                添加网站
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle className="text-foreground">添加新网站</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>网站名称</Label>
                  <Input
                    className="bg-input"
                    placeholder="如：中国政府采购网"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>网站地址</Label>
                  <Input
                    className="bg-input"
                    placeholder="https://..."
                    value={formData.url}
                    onChange={(e) => setFormData((p) => ({ ...p, url: e.target.value }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>需要登录</Label>
                  <Switch
                    checked={formData.needsLogin}
                    onCheckedChange={(c) => setFormData((p) => ({ ...p, needsLogin: c }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>存在验证码</Label>
                  <Switch
                    checked={formData.hasCaptcha}
                    onCheckedChange={(c) => setFormData((p) => ({ ...p, hasCaptcha: c }))}
                  />
                </div>
                <Button className="w-full bg-primary text-primary-foreground" onClick={addWebsite}>
                  添加
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">网站名称</TableHead>
              <TableHead className="text-muted-foreground">网站地址</TableHead>
              <TableHead className="text-muted-foreground">需登录</TableHead>
              <TableHead className="text-muted-foreground">验证码</TableHead>
              <TableHead className="text-muted-foreground">最近采集</TableHead>
              <TableHead className="text-muted-foreground">启用</TableHead>
              <TableHead className="text-muted-foreground">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((site) => (
              <TableRow key={site.id} className="border-border hover:bg-secondary/50">
                <TableCell className="font-medium text-foreground">{site.name}</TableCell>
                <TableCell>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <span className="max-w-[200px] truncate">{site.url}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell>
                  {site.needsLogin ? (
                    <CheckCircle className="h-4 w-4 text-warning" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell>
                  {site.hasCaptcha ? (
                    <CheckCircle className="h-4 w-4 text-warning" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell>
                  {site.lastCrawlTime ? (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">{site.lastCrawlTime}</div>
                      <Badge
                        variant="secondary"
                        className={
                          site.lastCrawlResult === '成功'
                            ? 'bg-success/20 text-success'
                            : 'bg-destructive/20 text-destructive'
                        }
                      >
                        {site.lastCrawlResult}
                      </Badge>
                      {site.failureReason && (
                        <div className="text-xs text-destructive">{site.failureReason}</div>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={site.status === '启用'}
                    onCheckedChange={() => toggleStatus(site.id)}
                  />
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        title="删除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">确认删除</AlertDialogTitle>
                        <AlertDialogDescription>
                          确定要删除网站「{site.name}」吗？此操作无法撤销。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => deleteWebsite(site.id)}
                        >
                          删除
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

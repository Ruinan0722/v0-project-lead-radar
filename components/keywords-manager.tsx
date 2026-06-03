'use client'

import { useState } from 'react'
import { mockKeywords, type KeywordConfig } from '@/lib/mock-data'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'

export function KeywordsManager() {
  const [keywords, setKeywords] = useState<KeywordConfig[]>(mockKeywords)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newKeyword, setNewKeyword] = useState({
    keyword: '',
    category: ''
  })

  const addKeyword = () => {
    if (!newKeyword.keyword) return
    const newKw: KeywordConfig = {
      id: String(Date.now()),
      keyword: newKeyword.keyword,
      category: newKeyword.category || '未分类',
      hitCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setKeywords((prev) => [...prev, newKw])
    setNewKeyword({ keyword: '', category: '' })
    setDialogOpen(false)
  }

  const deleteKeyword = (id: string) => {
    setKeywords((prev) => prev.filter((kw) => kw.id !== id))
  }

  // 按分类分组
  const groupedKeywords = keywords.reduce((acc, kw) => {
    const cat = kw.category || '未分类'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(kw)
    return acc
  }, {} as Record<string, KeywordConfig[]>)

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">关键词管理</CardTitle>
            <CardDescription>配置用于筛选招标项目的包含关键词</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                添加关键词
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle className="text-foreground">添加关键词</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>关键词</Label>
                  <Input
                    className="bg-input"
                    placeholder="输入关键词"
                    value={newKeyword.keyword}
                    onChange={(e) => setNewKeyword((p) => ({ ...p, keyword: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>分类</Label>
                  <Input
                    className="bg-input"
                    placeholder="如：GEO相关、AI营销"
                    value={newKeyword.category}
                    onChange={(e) => setNewKeyword((p) => ({ ...p, category: e.target.value }))}
                  />
                </div>
                <Button className="w-full bg-primary text-primary-foreground" onClick={addKeyword}>
                  添加
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">当前关键词：</span>
          {keywords.map((kw) => (
            <Badge key={kw.id} variant="secondary" className="bg-primary/20 text-primary">
              {kw.keyword}
            </Badge>
          ))}
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">关键词</TableHead>
              <TableHead className="text-muted-foreground">分类</TableHead>
              <TableHead className="text-muted-foreground">命中次数</TableHead>
              <TableHead className="text-muted-foreground">添加时间</TableHead>
              <TableHead className="text-muted-foreground">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(groupedKeywords).map(([category, kws]) => (
              kws.map((kw, idx) => (
                <TableRow key={kw.id} className="border-border hover:bg-secondary/50">
                  <TableCell>
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {kw.keyword}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {idx === 0 ? category : ''}
                  </TableCell>
                  <TableCell className="text-foreground">{kw.hitCount}</TableCell>
                  <TableCell className="text-muted-foreground">{kw.createdAt}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteKeyword(kw.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ))}
            {keywords.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  暂无关键词，点击上方按钮添加
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

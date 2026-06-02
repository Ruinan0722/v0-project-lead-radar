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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'

export function KeywordsManager() {
  const [keywords, setKeywords] = useState<KeywordConfig[]>(mockKeywords)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newKeyword, setNewKeyword] = useState({
    keyword: '',
    type: '包含' as const,
    category: ''
  })

  const addKeyword = () => {
    if (!newKeyword.keyword) return
    const newKw: KeywordConfig = {
      id: String(keywords.length + 1),
      ...newKeyword,
      hitCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setKeywords((prev) => [...prev, newKw])
    setNewKeyword({ keyword: '', type: '包含', category: '' })
    setDialogOpen(false)
  }

  const deleteKeyword = (id: string) => {
    setKeywords((prev) => prev.filter((kw) => kw.id !== id))
  }

  const includeKeywords = keywords.filter((kw) => kw.type === '包含')
  const excludeKeywords = keywords.filter((kw) => kw.type === '排除')

  return (
    <div className="space-y-6">
      <Card className="bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">关键词管理</CardTitle>
              <CardDescription>配置招标项目筛选关键词</CardDescription>
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
                    <Label>类型</Label>
                    <Select
                      value={newKeyword.type}
                      onValueChange={(v) => setNewKeyword((p) => ({ ...p, type: v as typeof newKeyword.type }))}
                    >
                      <SelectTrigger className="bg-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="包含">包含（命中后保留）</SelectItem>
                        <SelectItem value="排除">排除（命中后过滤）</SelectItem>
                      </SelectContent>
                    </Select>
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
        <CardContent className="space-y-6">
          {/* 包含关键词 */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <Badge className="bg-success/20 text-success">包含</Badge>
              命中后保留项目
            </h3>
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
                {includeKeywords.map((kw) => (
                  <TableRow key={kw.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        {kw.keyword}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{kw.category}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 排除关键词 */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <Badge className="bg-destructive/20 text-destructive">排除</Badge>
              命中后过滤项目
            </h3>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">关键词</TableHead>
                  <TableHead className="text-muted-foreground">分类</TableHead>
                  <TableHead className="text-muted-foreground">过滤次数</TableHead>
                  <TableHead className="text-muted-foreground">添加时间</TableHead>
                  <TableHead className="text-muted-foreground">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {excludeKeywords.map((kw) => (
                  <TableRow key={kw.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <Badge variant="secondary" className="bg-destructive/20 text-destructive">
                        {kw.keyword}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{kw.category}</TableCell>
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
                ))}
                {excludeKeywords.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      暂无排除关键词
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

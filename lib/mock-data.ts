// 模拟招标线索数据
export interface BidLead {
  id: string
  projectName: string
  bidder: string
  region: string
  budget: number | null
  publishDate: string
  deadline: string | null
  keywords: string[]
  relevanceScore: number
  leadLevel: '高' | '中' | '低'
  status: '未查看' | '已查看' | '跟进中' | '已投标' | '已放弃'
  source: string
  sourceUrl: string
  summary: string
  content: string
  assignee: string | null
  lastFollowUp: string | null
  notes: string
}

export const mockLeads: BidLead[] = [
  {
    id: '1',
    projectName: '某银行生成式AI营销平台建设项目',
    bidder: '中国农业银行股份有限公司',
    region: '北京市',
    budget: 5800000,
    publishDate: '2026-06-01',
    deadline: '2026-06-15',
    keywords: ['AI营销', '生成式AI', 'AIGC'],
    relevanceScore: 95,
    leadLevel: '高',
    status: '未查看',
    source: '知了标讯',
    sourceUrl: 'https://www.zhiliaobiaoxun.com/bid/123',
    summary: '该银行拟建设基于生成式AI的营销平台，涉及智能内容生成、客户运营和营销自动化能力。',
    content: '招标内容：建设生成式AI营销平台，包括智能内容生成系统、客户画像分析、营销自动化引擎等模块...',
    assignee: null,
    lastFollowUp: null,
    notes: ''
  },
  {
    id: '2',
    projectName: 'GEO搜索优化系统采购项目',
    bidder: '深圳市前海科技有限公司',
    region: '广东省',
    budget: 2200000,
    publishDate: '2026-06-01',
    deadline: '2026-06-20',
    keywords: ['GEO', 'AI搜索优化'],
    relevanceScore: 88,
    leadLevel: '高',
    status: '已查看',
    source: '千里马',
    sourceUrl: 'https://www.qianlima.com/bid/456',
    summary: '采购GEO搜索优化系统，用于提升企业在AI搜索引擎中的可见性。',
    content: '项目需求：搭建GEO（生成引擎优化）系统，优化企业内容在ChatGPT、Claude等AI搜索中的表现...',
    assignee: '张三',
    lastFollowUp: '2026-06-02',
    notes: '已联系采购负责人，对方表示下周安排详细沟通'
  },
  {
    id: '3',
    projectName: '智能客服与内容生成平台项目',
    bidder: '杭州市政务服务中心',
    region: '浙江省',
    budget: 3500000,
    publishDate: '2026-05-30',
    deadline: '2026-06-18',
    keywords: ['生成引擎优化', 'AI客服'],
    relevanceScore: 75,
    leadLevel: '中',
    status: '跟进中',
    source: '中国采招网',
    sourceUrl: 'https://www.chinabidding.cn/bid/789',
    summary: '建设智能客服系统，集成内容生成能力，提升政务服务效率。',
    content: '采购内容：智能客服平台，支持多渠道接入，具备AI内容生成和知识库管理功能...',
    assignee: '李四',
    lastFollowUp: '2026-06-01',
    notes: '正在准备技术方案，预计6月5日提交'
  },
  {
    id: '4',
    projectName: '企业级AI搜索优化服务采购',
    bidder: '上海某互联网科技公司',
    region: '上海市',
    budget: 1500000,
    publishDate: '2026-05-29',
    deadline: '2026-06-12',
    keywords: ['AI搜索优化', 'GEO'],
    relevanceScore: 82,
    leadLevel: '高',
    status: '未查看',
    source: '知了标讯',
    sourceUrl: 'https://www.zhiliaobiaoxun.com/bid/321',
    summary: '采购AI搜索优化服务，提升品牌在新兴AI搜索渠道的曝光。',
    content: '服务需求：提供全面的AI搜索优化解决方案，包括内容策略、技术优化、效果监测...',
    assignee: null,
    lastFollowUp: null,
    notes: ''
  },
  {
    id: '5',
    projectName: '数字营销AI平台升级项目',
    bidder: '成都某电商集团',
    region: '四川省',
    budget: 4200000,
    publishDate: '2026-05-28',
    deadline: '2026-06-25',
    keywords: ['AI营销', 'AIGC', '内容生成'],
    relevanceScore: 70,
    leadLevel: '中',
    status: '已放弃',
    source: '立达标讯',
    sourceUrl: 'https://www.lidabiaoxun.com/bid/654',
    summary: '升级现有数字营销平台，引入AI内容生成能力。',
    content: '项目背景：企业现有营销平台需要升级，计划引入AIGC技术提升内容生产效率...',
    assignee: '王五',
    lastFollowUp: '2026-05-30',
    notes: '预算较低，且要求自研部署，不符合我司交付模式'
  },
  {
    id: '6',
    projectName: '政务大模型应用平台建设',
    bidder: '南京市大数据管理局',
    region: '江苏省',
    budget: null,
    publishDate: '2026-06-02',
    deadline: '2026-06-30',
    keywords: ['大模型', '政务AI'],
    relevanceScore: 60,
    leadLevel: '低',
    status: '未查看',
    source: '中国采招网',
    sourceUrl: 'https://www.chinabidding.cn/bid/987',
    summary: '建设政务大模型应用平台，支持多场景智能问答。',
    content: '招标范围：政务大模型平台建设，包括模型训练、部署、应用开发等...',
    assignee: null,
    lastFollowUp: null,
    notes: ''
  }
]

// 模拟网站配置数据
export interface WebsiteConfig {
  id: string
  name: string
  url: string
  needsLogin: boolean
  hasCaptcha: boolean
  frequency: '每小时' | '每天' | '每周'
  status: '启用' | '停用'
  lastCrawlTime: string | null
  lastCrawlResult: '成功' | '失败' | null
  failureReason: string | null
}

export const mockWebsites: WebsiteConfig[] = [
  {
    id: '1',
    name: '知了标讯',
    url: 'https://www.zhiliaobiaoxun.com',
    needsLogin: true,
    hasCaptcha: false,
    frequency: '每天',
    status: '启用',
    lastCrawlTime: '2026-06-02 08:00',
    lastCrawlResult: '成功',
    failureReason: null
  },
  {
    id: '2',
    name: '千里马',
    url: 'https://www.qianlima.com',
    needsLogin: true,
    hasCaptcha: true,
    frequency: '每天',
    status: '启用',
    lastCrawlTime: '2026-06-02 08:00',
    lastCrawlResult: '成功',
    failureReason: null
  },
  {
    id: '3',
    name: '中国采招网',
    url: 'https://www.chinabidding.cn',
    needsLogin: false,
    hasCaptcha: false,
    frequency: '每小时',
    status: '启用',
    lastCrawlTime: '2026-06-02 09:00',
    lastCrawlResult: '成功',
    failureReason: null
  },
  {
    id: '4',
    name: '立达标讯',
    url: 'https://www.lidabiaoxun.com',
    needsLogin: true,
    hasCaptcha: false,
    frequency: '每天',
    status: '停用',
    lastCrawlTime: '2026-06-01 08:00',
    lastCrawlResult: '失败',
    failureReason: '登录凭证过期'
  }
]

// 模拟关键词配置
export interface KeywordConfig {
  id: string
  keyword: string
  type: '包含' | '排除'
  category: string
  hitCount: number
  createdAt: string
}

export const mockKeywords: KeywordConfig[] = [
  { id: '1', keyword: 'GEO', type: '包含', category: 'GEO相关', hitCount: 45, createdAt: '2026-05-01' },
  { id: '2', keyword: '生成引擎优化', type: '包含', category: 'GEO相关', hitCount: 23, createdAt: '2026-05-01' },
  { id: '3', keyword: 'AI搜索优化', type: '包含', category: 'GEO相关', hitCount: 18, createdAt: '2026-05-01' },
  { id: '4', keyword: 'AI营销', type: '包含', category: 'AI营销', hitCount: 67, createdAt: '2026-05-05' },
  { id: '5', keyword: 'AIGC', type: '包含', category: 'AI营销', hitCount: 52, createdAt: '2026-05-05' },
  { id: '6', keyword: '生成式AI', type: '包含', category: 'AI营销', hitCount: 38, createdAt: '2026-05-10' },
  { id: '7', keyword: '地理信息', type: '排除', category: '排除词', hitCount: 0, createdAt: '2026-05-15' },
  { id: '8', keyword: '生物体温记录器', type: '排除', category: '排除词', hitCount: 0, createdAt: '2026-05-15' },
  { id: '9', keyword: '大模型', type: '包含', category: '大模型', hitCount: 89, createdAt: '2026-05-20' }
]

// 统计数据
export const mockStats = {
  totalLeads: 156,
  newToday: 12,
  highPriority: 28,
  pendingFollowUp: 45,
  websites: 4,
  keywords: 9
}

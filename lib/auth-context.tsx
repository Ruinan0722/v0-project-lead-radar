'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (method: 'feishu' | 'email', credentials?: { email: string; password: string }) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储的登录状态
    const savedUser = localStorage.getItem('radar_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (method: 'feishu' | 'email', credentials?: { email: string; password: string }) => {
    setIsLoading(true)
    
    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let mockUser: User
    
    if (method === 'feishu') {
      // 模拟飞书登录
      mockUser = {
        id: 'feishu_001',
        name: '张三',
        email: 'zhangsan@company.com',
        avatar: undefined
      }
    } else {
      // 模拟邮箱登录
      if (!credentials?.email || !credentials?.password) {
        setIsLoading(false)
        return false
      }
      // Demo验证：任意非空邮箱和密码即可登录
      mockUser = {
        id: 'email_001',
        name: credentials.email.split('@')[0],
        email: credentials.email,
        avatar: undefined
      }
    }
    
    setUser(mockUser)
    localStorage.setItem('radar_user', JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('radar_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingUser = await prisma.waitlistUser.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已在候补名单中' },
        { status: 409 }
      )
    }

    // 添加到 waitlist
    const newUser = await prisma.waitlistUser.create({
      data: { email }
    })

    return NextResponse.json(
      { 
        message: '成功加入候补名单！',
        user: { id: newUser.id, email: newUser.email }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    )
  }
} 
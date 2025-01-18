import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/db/prisma'
import { redirect } from 'next/navigation'

export async function GET() {
  const { userId } = await auth()
    if (!userId) {
      redirect('/')
    }
  const links = await prisma.link.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(links)
}

export async function POST(req: Request) {
  const { longUrl, shortId } = await req.json()

  const link = await prisma.link.create({
    data: {
      longUrl,
      shortId,
    }
  })

  return NextResponse.json(link)
}


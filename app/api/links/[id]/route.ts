import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/db/prisma'
import { redirect } from 'next/navigation'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { userId } = await auth()
    if (!userId) {
      redirect('/')
    }
  const link = await prisma.link.findUnique({
    where: { id: params.id }
  })

  if (!link) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return NextResponse.json(link)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { longUrl, shortId } = await req.json()

  const link = await prisma.link.update({
    where: { id: params.id },
    data: { longUrl, shortId }
  })

  return NextResponse.json(link)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.link.delete({
    where: { id: params.id }
  })

  return new NextResponse(null, { status: 204 })
}


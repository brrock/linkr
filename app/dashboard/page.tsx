import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import prisma from '@/db/prisma'
import { DashboardHeader } from '@/components/dashboard-header'
import { LinkList } from '@/components/link-list'
import { CreateLinkForm } from '@/components/create-link-form'
import { ClicksChart } from '@/components/clicks-chart'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/')
  }

  const links = await prisma.link.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto p-4">
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CreateLinkForm />
          <LinkList links={links} />
        </div>
        <div>
          <ClicksChart links={links} />
        </div>
      </div>
    </div>
  )
}


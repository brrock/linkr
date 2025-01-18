import { UserButton } from "@clerk/nextjs"

export function DashboardHeader() {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Short Link Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </header>
  )
}


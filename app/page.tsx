import { auth } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'
import AuthContent from './home'

export default async function Page() {
  const { userId } = await auth()
  if (userId) {
    redirect('/dashboard ')
  }  

  return <AuthContent />
}


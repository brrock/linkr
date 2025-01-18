'use client'

import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export default function AuthContent() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <SignedOut>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl">Oops! Wrong turn? <ModeToggle/> </CardTitle>
            <CardDescription>You seem to be in the wrong place.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="https://benjyross.xyz">Visit My Website</Link>
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground">Or sign in below:</div>
            <Button asChild className="w-full">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      </SignedOut>
      <SignedIn>
        <Card>
          <CardContent>
            <p>You&apos;re signed in. Redirecting...</p>
          </CardContent>
        </Card>
      </SignedIn>
    </div>
  )
}


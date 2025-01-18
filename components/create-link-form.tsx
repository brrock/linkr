"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

export function CreateLinkForm() {
  const [longUrl, setLongUrl] = useState('')
  const [shortId, setShortId] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl, shortId })
      })
      if (res.ok) {
        toast({ title: "Link created successfully" })
        setLongUrl('')
        setShortId('')
        router.refresh()
      } else {
        throw new Error('Failed to create link')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast({ title: "Error creating link", variant: "destructive" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Input
        type="url"
        placeholder="Long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Custom Short ID (optional)"
        value={shortId}
        onChange={(e) => setShortId(e.target.value)}
      />
      <Button type="submit">Create Short Link</Button>
    </form>
  )
}


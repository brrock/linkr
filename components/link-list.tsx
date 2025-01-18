/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

export function LinkList({ links }: { links: Link[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLongUrl, setEditLongUrl] = useState('')
  const [editShortId, setEditShortId] = useState('')
  const router = useRouter()

  const handleEdit = (link: Link) => {
    setEditingId(link.id)
    setEditLongUrl(link.longUrl)
    setEditShortId(link.shortId)
  }

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: editLongUrl, shortId: editShortId })
      })
      if (res.ok) {
        toast({ title: "Link updated successfully" })
        setEditingId(null)
        router.refresh()
      } else {
        throw new Error('Failed to update link')
      }
    } catch (error) {
      toast({ title: "Error updating link", variant: "destructive" })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/links/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: "Link deleted successfully" })
        router.refresh()
      } else {
        throw new Error('Failed to delete link')
      }
    } catch (error) {
      toast({ title: "Error deleting link", variant: "destructive" })
    }
  }

  return (
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link.id} className="border p-4 rounded">
          {editingId === link.id ? (
            <>
              <Input
                value={editLongUrl}
                onChange={(e) => setEditLongUrl(e.target.value)}
                className="mb-2"
              />
              <Input
                value={editShortId}
                onChange={(e) => setEditShortId(e.target.value)}
                className="mb-2"
              />
              <Button onClick={() => handleSave(link.id)}>Save</Button>
              <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
            </>
          ) : (
            <>
              <p>Long URL: {link.longUrl}</p>
              <p>Short URL: {`${process.env.NEXT_PUBLIC_APP_URL}/${link.shortId}`}</p>
              <p>Clicks: {link.clicks}</p> <div className="space-x-4">
              <Button onClick={() => handleEdit(link)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(link.id)}>Delete</Button> </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}


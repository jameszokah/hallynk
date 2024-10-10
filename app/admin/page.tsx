'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'

type Listing = {
  id: string
  title: string
  location: string
  price: number
}

export default function AdminPanel() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [listings, setListings] = useState<Listing[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user) {
      // TODO: Check if user is admin
      fetchListings()
    }
  }, [session, status, router])

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/admin/listings')
      if (response.ok) {
        const data = await response.json()
        setListings(data)
      } else {
        throw new Error('Failed to fetch listings')
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch listings',
        variant: 'destructive',
      })
    }
  }

  const deleteListing = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/listings/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setListings(listings.filter(listing => listing.id !== id))
        toast({
          title: 'Success',
          description: 'Listing deleted successfully',
        })
      } else {
        throw new Error('Failed to delete listing')
      }
    } catch (error) {
      console.error('Error deleting listing:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete listing',
        variant: 'destructive',
      })
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <Button asChild className="mb-4">
        <Link href="/admin/create-listing">Create New Listing</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map(listing => (
            <TableRow key={listing.id}>
              <TableCell>{listing.title}</TableCell>
              <TableCell>{listing.location}</TableCell>
              <TableCell>GHC {listing.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link href={`/admin/edit-listing/${listing.id}`}>Edit</Link>
                </Button>
                <Button variant="destructive" onClick={() => deleteListing(listing.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
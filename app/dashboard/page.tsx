'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Home, Heart } from 'lucide-react'

interface Booking {
  id: string
  startDate: string
  endDate: string
  status: string
  listing: {
    id: string
    title: string
  }
}

interface Favorite {
  id: string
  listing: {
    id: string
    
    title: string
    price: number
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user) {
      fetchBookings()
      fetchFavorites()
    }
  }, [session, status, router])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        throw new Error('Failed to fetch bookings')
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch bookings',
        variant: 'destructive',
      })
    }
  }

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites')
      if (response.ok) {
        const data = await response.json()
        setFavorites(data)
      } else {
        throw new Error('Failed to fetch favorites')
      }
    } catch (error) {
      console.error('Error fetching favorites:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch favorites',
        variant: 'destructive',
      })
    }
  }

  const cancelBooking = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setBookings(bookings.filter(booking => booking.id !== id))
        toast({
          title: 'Success',
          description: 'Booking cancelled successfully',
        })
      } else {
        throw new Error('Failed to cancel booking')
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
      toast({
        title: 'Error',
        description: 'Failed to cancel booking',
        variant: 'destructive',
      })
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">
            <Calendar className="w-4 h-4 mr-2" />
            Your Bookings
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Heart className="w-4 h-4 mr-2" />
            Your Favorites
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Your Bookings</CardTitle>
              <CardDescription>Manage your current and upcoming stays</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Listing</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map(booking => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <Link href={`/listings/${booking.listing.id}`} className="text-primary hover:underline">
                            {booking.listing.title}
                          </Link>
                        </TableCell>
                        <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>
                          {booking.status === 'PENDING' && (
                            <Button variant="destructive" onClick={() => cancelBooking(booking.id)}>Cancel</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Your Favorites</CardTitle>
              <CardDescription>Listings you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map(favorite => (
                  <Card key={favorite.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{favorite.listing.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">GHC {favorite.listing.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/listings/${favorite.listing.id}`}>View Listing</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
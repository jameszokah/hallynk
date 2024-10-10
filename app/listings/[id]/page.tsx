import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import BookingForm from '@/components/BookingForm'
import ReviewSystem from '@/components/ReviewSystem'

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: { reviews: true, user: true },
  })

  if (!listing) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
          <div className="mb-4">
            <Badge>{listing.roomSize}</Badge>
            <Badge variant="outline" className="ml-2">GHC {listing.price.toFixed(2)}</Badge>
          </div>
          <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden">
            <Image
              src={listing.images[0] || "/placeholder.svg"}
              alt={listing.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{listing.description}</p>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                {listing.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">✓</span> {amenity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Separator className="my-8" />
          <ReviewSystem listingId={listing.id} reviews={{review: listing.reviews, user: {image: listing.user?.image, name: listing.user?.name ?? 'Guest'}}} />
        </div>
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Book this accommodation</CardTitle>
              <CardDescription>Select your dates and book your stay</CardDescription>
            </CardHeader>
            <CardContent>
              <BookingForm listingId={listing.id} price={listing.price} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
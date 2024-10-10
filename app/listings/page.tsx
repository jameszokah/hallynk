import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Heart } from 'lucide-react'
import {prisma} from '@/lib/prisma'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import FilterSystem from '@/components/FilterSystem'
import Pagination from '@/components/Pagination'

const ITEMS_PER_PAGE = 9

export default async function Listings({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const {
    location,
    minPrice,
    maxPrice,
    roomSize,
    amenities,
    page = '1',
  } = searchParams

  const currentPage = parseInt(page as string, 10)

  const where = {
    // location: location ? { contains: location as string, mode: 'insensitive' } : undefined,
    price: {
      gte: minPrice ? parseFloat(minPrice as string) : undefined,
      lte: maxPrice ? parseFloat(maxPrice as string) : undefined,
    },
    roomSize: roomSize ? { equals: roomSize as string } : undefined,
    amenities: amenities ? { hasEvery: (amenities as string).split(',') } : undefined,
  }

  const totalListings = await prisma.listing.count({ where })
  const totalPages = Math.ceil(totalListings / ITEMS_PER_PAGE)

  const listings = await prisma.listing.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Student Accommodation</h1>
      
      <FilterSystem />
      
      <Separator className="my-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image 
                  src={listing.images[0] || "/placeholder.svg"} 
                  alt={listing.title} 
                  width={400} 
                  height={200} 
                  className="w-full h-48 object-cover"
                />
                <Button variant="secondary" size="icon" className="absolute top-2 right-2 rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{listing.title}</CardTitle>
              <p className="flex items-center text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {listing.location}
              </p>
              <p className="text-lg font-bold mb-2">GHC {listing.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">{listing.roomSize}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/listings/${listing.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  )
}
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Home, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Student Accommodation</h1>
          <p className="text-xl text-muted-foreground mb-8">Connect with the best housing options for your academic journey</p>
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              <Input type="text" placeholder="Search for accommodations..." className="pr-12" />
              <Button className="absolute right-0 top-0 bottom-0 rounded-l-none">Search</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Home className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Wide Range of Options</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Explore diverse accommodation choices tailored to your preferences and budget.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Connect with Roommates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Find compatible roommates and build lasting friendships during your stay.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BookOpen className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Seamless Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Easy and secure booking process to ensure a stress-free accommodation experience.</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/listings">Explore Listings</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
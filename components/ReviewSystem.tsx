'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Star, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Review as IReview } from '@prisma/client'

interface Review {
    review: IReview[]
    user: {
      name?: string
      image?: string | null
    }
}

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters long"),
})

export default function ReviewSystem({ listingId, reviews: initialReviews }: { listingId: string, reviews: Review }) {
  const [reviews, setReviews] = useState<Review>(initialReviews)
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to leave a review",
        variant: "destructive",
      })
      router.push('/login')
      return
    }

    try {
      const response = await fetch(`/api/listings/${listingId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to submit review')
      }

      const newReview = await response.json() as IReview
      setReviews({...reviews, review: [newReview, ...reviews.review]})
      form.reset()
      toast({
        title: "Success",
        description: "Your review has been submitted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
          <CardDescription>Share your experience with this accommodation</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant={star <= field.value ? "default" : "outline"}
                            size="sm"
                            className="p-0 w-10 h-10"
                            onClick={() => field.onChange(star)}
                          >
                            <Star className={star <= field.value ? "fill-primary" : "fill-muted"} />
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription>Select your rating from 1 to 5 stars</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts about this accommodation"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit Review</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Reviews</h3>
        {reviews.review?.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
        ) : (
          reviews.review.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={reviews.user?.image!} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{reviews.user?.name}</CardTitle>
                    <CardDescription>{new Date(review.createdAt).toLocaleDateString()}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={i < review.rating ? "fill-primary" : "fill-muted"} size={16} />
                  ))}
                </div>
                <p>{review.comment}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
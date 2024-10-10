'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  roomSize: z.string().min(1, { message: 'Room size is required' }),
  amenities: z.array(z.string()).min(1, { message: 'Select at least one amenity' }),
})

const amenitiesList = [
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'parking', label: 'Parking' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'tv', label: 'TV' },
  { id: 'airConditioning', label: 'Air Conditioning' },
]

export default function EditListing({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: 0,
      roomSize: '',
      amenities: [],
    },
  })

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/admin/listings/${params.id}`)
        if (response.ok) {
          const listing = await response.json()
          form.reset(listing)
        } else {
          throw new Error('Failed to fetch listing')
        }
      } catch (error) {
        console.error('Error fetching listing:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch listing details',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [params.id, form, toast])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/admin/listings/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Listing updated successfully',
        })
        router.push('/admin')
      } else {
        throw new Error('Failed to update listing')
      }
    } catch (error) {
      console.error('Error updating listing:', error)
      toast({
        title: 'Error',
        description: 'Failed to update listing',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Listing</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (GHC)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Size</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>e.g., "1 in a room", "2 in a room", etc.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Amenities</FormLabel>
                  <FormDescription>
                    Select the amenities available in this accommodation.
                  </FormDescription>
                </div>
                {amenitiesList.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update Listing</Button>
        </form>
      </Form>
    </div>
  )
}
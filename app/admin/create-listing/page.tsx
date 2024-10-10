'use client'

import { useState } from 'react'
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
import { CldUploadWidget } from 'next-cloudinary'

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  roomSize: z.string().min(1, { message: 'Room size is required' }),
  amenities: z.array(z.string()).min(1, { message: 'Select at least one amenity' }),
  images: z.array(z.string()).min(1, { message: 'At least one image is required' }),
})

const amenitiesList = [
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'parking', label: 'Parking' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'tv', label: 'TV' },
  { id: 'airConditioning', label: 'Air Conditioning' },
]

export default function CreateListing() {
  const router = useRouter()
  const { toast } = useToast()
  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: 0,
      roomSize: '',
      amenities: [],
      images: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/admin/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, images }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Listing created successfully',
        })
        router.push('/admin')
      } else {
        throw new Error('Failed to create listing')
      }
    } catch (error) {
      console.error('Error creating listing:', error)
      toast({
        title: 'Error',
        description: 'Failed to create listing',
        variant: 'destructive',
      })
    }
  }

  const handleImageUpload = (result: any) => {
    const newImage = result.info.secure_url
    setImages([...images, newImage])
    form.setValue('images', [...images, newImage])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Listing</h1>
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <CldUploadWidget
                      uploadPreset="hallynk_listings"
                      onUpload={handleImageUpload}
                    >
                      {({ open }) => (
                        <Button type="button" onClick={() => open()}>
                          Upload Image
                        </Button>
                      )}
                    </CldUploadWidget>
                    {images.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Uploaded image ${index + 1}`}
                            className="w-24 h-24 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Listing</Button>
        </form>
      </Form>
    </div>
  )
}
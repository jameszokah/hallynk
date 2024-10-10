'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  location: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  roomSize: z.string().optional(),
  amenities: z.array(z.string()).optional(),
})

const amenitiesList = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "parking", label: "Parking" },
  { id: "kitchen", label: "Kitchen" },
  { id: "tv", label: "TV" },
  { id: "airConditioning", label: "Air Conditioning" },
]

export default function FilterSystem() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 1000])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: searchParams.get('location') || '',
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      roomSize: searchParams.get('roomSize') || '',
      amenities: searchParams.get('amenities')?.split(',') || [],
    },
  })

  useEffect(() => {
    const minPrice = form.getValues('minPrice')
    const maxPrice = form.getValues('maxPrice')
    if (minPrice !== undefined && maxPrice !== undefined) {
      setPriceRange([minPrice, maxPrice])
    }
  }, [form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams()
    if (values.location) params.set('location', values.location)
    if (values.minPrice) params.set('minPrice', values.minPrice.toString())
    if (values.maxPrice) params.set('maxPrice', values.maxPrice.toString())
    if (values.roomSize) params.set('roomSize', values.roomSize)
    if (values.amenities && values.amenities.length > 0) params.set('amenities', values.amenities.join(','))
    
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormDescription>
                Enter a city, neighborhood, or address
              </FormDescription>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1 in a room">1 in a room</SelectItem>
                  <SelectItem value="2 in a room">2 in a room</SelectItem>
                  <SelectItem value="3 in a room">3 in a room</SelectItem>
                  <SelectItem value="4 in a room">4 in a room</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Price Range</FormLabel>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value)
              form.setValue('minPrice',   value[0])
              form.setValue('maxPrice', value[1])
            }}
            className="mt-2"
          />
          <div className="flex justify-between mt-2">
            <span>GHC {priceRange[0]}</span>
            <span>GHC {priceRange[1]}</span>
          </div>
        </FormItem>
        <FormField
          control={form.control}
          name="amenities"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Amenities</FormLabel>
                <FormDescription>
                  Select the amenities you need
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
                                ? field.onChange([...field.value || [], item.id])
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
        <Button type="submit">Apply Filters</Button>
      </form>
    </Form>
  )
}
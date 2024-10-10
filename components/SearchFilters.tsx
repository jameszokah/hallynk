'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [roomSize, setRoomSize] = useState(searchParams.get('roomSize') || '')
  const [amenities, setAmenities] = useState<string[]>(searchParams.get('amenities')?.split(',') || [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (roomSize) params.set('roomSize', roomSize)
    if (amenities.length > 0) params.set('amenities', amenities.join(','))
    
    router.push(`/listings?${params.toString()}`)
  }

  const handleAmenityChange = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <select
          value={roomSize}
          onChange={(e) => setRoomSize(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Any Room Size</option>
          <option value="1 in a room">1 in a room</option>
          <option value="2 in a room">2 in a room</option>
          <option value="3 in a room">3 in a room</option>
          <option value="4 in a room">4 in a room</option>
        </select>
      </div>
      <div className="mb-4">
        <p className="font-semibold mb-2">Amenities:</p>
        <div className="flex flex-wrap gap-2">
          {['Wi-Fi', 'Parking', 'Kitchen', 'TV', 'Air Conditioning'].map((amenity) => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="mr-2"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
      >
        Search
      </button>
    </form>
  )
}
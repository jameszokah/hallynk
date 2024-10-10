import prisma from '@/lib/prisma'
import { format } from 'date-fns'

export default async function Bookings() {
  // TODO: Get the actual user ID from the session
  const userId = 'temp-user-id'

  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { listing: true },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{booking.listing.title}</h2>
              <p className="text-gray-600 mb-2">{booking.listing.location}</p>
              <p className="mb-2">
                <span className="font-semibold">Check-in:</span> {format(booking.startDate, 'PPP')}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Check-out:</span> {format(booking.endDate, 'PPP')}
              </p>
              <p className="text-lg font-bold">
                Total: GHC {booking.listing.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
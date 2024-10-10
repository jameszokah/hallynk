import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { listingId, rating, comment } = await request.json()

    // TODO: Add user authentication and get the userId from the session
    const userId = 'temp-user-id'

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        listingId,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
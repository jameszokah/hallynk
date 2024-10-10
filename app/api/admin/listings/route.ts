import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'


export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // TODO: Check if user is admin

  try {
    const listings = await prisma.listing.findMany({
      select: {
        id: true,
        title: true,
        location: true,
        price: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error('Error fetching listings:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // TODO: Check if user is admin

  try {
    const data = await request.json()
    const listing = await prisma.listing.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error('Error creating listing:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
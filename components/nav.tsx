"use client"

import * as React from "react"
import Link from "next/link"

export function Nav() {
  return (
    <nav className="flex items-center text-white text-lg space-x-1">
        <Link href="/home" className=" px-2">
            Home
        </Link>
        <Link href="/about" className="border-x border-spacing-2 px-2">
            About Us
        </Link>
        <Link href="/listings" className="border-r px-2 ">
            Listings
        </Link>
        <Link href="/contact" className="pl-1">
            Contact Us
        </Link>
        
    </nav>  
  );

}

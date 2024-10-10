import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-muted py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">HALLYNK</h3>
            <p className="text-sm text-muted-foreground">Connecting students with their ideal accommodations.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:underline">Home</Link></li>
              <li><Link href="/listings" className="text-sm hover:underline">Listings</Link></li>
              <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">Email: info@hallynk.com</p>
            <p className="text-sm text-muted-foreground">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} HALLYNK. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
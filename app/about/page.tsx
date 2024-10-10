import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">About HALLYNK</CardTitle>
          <CardDescription>Connecting students with their ideal accommodations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            HALLYNK was founded with a simple mission: to make finding student accommodation as easy and stress-free as possible. We understand that finding the right place to live is a crucial part of the student experience, and we're here to help make that process smooth and enjoyable.
          </p>
          <p className="mb-4">
            Our platform connects students with a wide range of housing options, from shared apartments to private studios, ensuring that every student can find a place that feels like home. We work closely with property owners and managers to bring you the best selection of student-friendly accommodations.
          </p>
          <p>
            At HALLYNK, we're more than just a listing site. We're a community of students, property owners, and housing experts all working together to improve the student housing experience. Whether you're a first-year student or a postgraduate researcher, we're here to help you find your perfect home away from home.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Jane Doe", role: "Founder & CEO", avatar: "/placeholder.svg" },
          { name: "John Smith", role: "CTO", avatar: "/placeholder.svg" },
          { name: "Alice Johnson", role: "Head of Customer Relations", avatar: "/placeholder.svg" },
        ].map((member) => (
          <Card key={member.name}>
            <CardHeader>
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
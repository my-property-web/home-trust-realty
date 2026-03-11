import { useState } from "react"
import { useRoute } from "wouter"
import { MapPin, BedDouble, Bath, Square, CalendarDays, Car, CheckCircle2, ChevronRight } from "lucide-react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookViewingModal } from "@/components/modals"
import { formatPrice } from "@/lib/utils"
import { useGetProperty } from "@/hooks/use-api"

export default function PropertyDetails() {
  const [, params] = useRoute("/properties/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  
  const { data: property, isLoading } = useGetProperty(id, { query: { enabled: !!id } });
  const [viewingModalOpen, setViewingModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse flex flex-col gap-8">
            <div className="h-10 w-2/3 bg-muted rounded-xl" />
            <div className="h-[60vh] bg-muted rounded-3xl w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  // Fallback for demo when missing backend
  const p = property || {
    id: 1,
    title: "Magnificent Modern Villa in Beverly Hills",
    description: "An architectural masterpiece nestled in the prestigious hills. This incredible property features soaring ceilings, custom Italian finishes, and panoramic views of the entire city. The expansive outdoor area includes an infinity pool, fully equipped kitchen, and lush landscaping.",
    price: 8500000,
    priceLabel: "Guide Price",
    listingType: "buy",
    propertyType: "villa",
    bedrooms: 6,
    bathrooms: 8,
    area: 9500,
    areaUnit: "sqft",
    location: "Beverly Hills, CA",
    address: "1001 Summit Drive, Beverly Hills, CA 90210",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&fit=crop",
    ],
    features: ["Infinity Pool", "Smart Home System", "Wine Cellar", "Home Theater", "Guest House"],
    isVerified: true,
    isFeatured: true,
    yearBuilt: 2022,
    parking: true,
  };

  return (
    <Layout>
      <div className="pt-28 pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge variant="secondary" className="px-3 py-1 text-sm bg-accent/10 text-accent font-medium">
                  {p.listingType === 'buy' ? 'For Sale' : 'For Rent'}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-sm capitalize">
                  {p.propertyType}
                </Badge>
                {p.isVerified && (
                  <span className="flex items-center text-sm font-medium text-emerald-600 gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Verified Listing
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-3 leading-tight">
                {p.title}
              </h1>
              <div className="flex items-center text-muted-foreground text-lg gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                {p.address || p.location}
              </div>
            </div>
            <div className="lg:text-right">
              <div className="text-4xl font-display font-bold text-primary">
                {formatPrice(p.price)}
              </div>
              {p.priceLabel && <div className="text-muted-foreground">{p.priceLabel}</div>}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[50vh] md:h-[60vh]">
            <div className="md:col-span-3 rounded-3xl overflow-hidden relative">
              <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:flex flex-col gap-4">
              {p.images?.slice(1, 3).map((img, i) => (
                <div key={i} className="flex-1 rounded-3xl overflow-hidden relative group">
                  <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
              {p.images && p.images.length > 3 && (
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl font-medium text-sm border shadow-sm">
                  View All Photos
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card p-6 rounded-3xl border border-border shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1"><BedDouble className="w-5 h-5"/> Bedrooms</div>
                  <div className="font-display font-bold text-2xl text-primary">{p.bedrooms}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1"><Bath className="w-5 h-5"/> Bathrooms</div>
                  <div className="font-display font-bold text-2xl text-primary">{p.bathrooms}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1"><Square className="w-5 h-5"/> Area</div>
                  <div className="font-display font-bold text-2xl text-primary">{p.area} <span className="text-base font-normal text-muted-foreground">{p.areaUnit}</span></div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1"><CalendarDays className="w-5 h-5"/> Year</div>
                  <div className="font-display font-bold text-2xl text-primary">{p.yearBuilt || 'N/A'}</div>
                </div>
              </div>

              {/* Description */}
              <section>
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Description</h3>
                <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none">
                  {p.description}
                </div>
              </section>

              {/* Amenities */}
              <section>
                <h3 className="text-2xl font-display font-bold text-primary mb-6">Features & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.features?.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 bg-secondary/50 px-4 py-3 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      <span className="font-medium text-foreground">{feat}</span>
                    </div>
                  ))}
                  {p.parking && (
                    <div className="flex items-center gap-3 bg-secondary/50 px-4 py-3 rounded-xl">
                      <Car className="w-5 h-5 text-accent shrink-0" />
                      <span className="font-medium text-foreground">Dedicated Parking</span>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar Sticky */}
            <div className="relative">
              <div className="sticky top-32 bg-card rounded-3xl border border-border shadow-xl p-8 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-2xl text-primary mb-2">Interested?</h4>
                  <p className="text-muted-foreground">Contact us to arrange a viewing or to get more information about this property.</p>
                </div>
                
                <Button size="lg" className="w-full text-lg h-14" onClick={() => setViewingModalOpen(true)}>
                  Book a Viewing
                </Button>
                
                <Button size="lg" variant="outline" className="w-full h-14 border-2">
                  Contact Agent
                </Button>

                <hr className="border-border" />

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-border">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&fit=crop" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-foreground">Sarah Jenkins</h5>
                    <p className="text-sm text-accent font-medium mb-1">Senior Consultant</p>
                    <a href="tel:+15551234567" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <BookViewingModal 
        isOpen={viewingModalOpen} 
        onClose={() => setViewingModalOpen(false)} 
        propertyId={p.id}
        propertyTitle={p.title}
      />
    </Layout>
  )
}

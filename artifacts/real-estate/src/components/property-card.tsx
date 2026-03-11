import { Link } from "wouter"
import { BedDouble, Bath, Square, MapPin, CheckCircle2 } from "lucide-react"
import { Badge } from "./ui/badge"
import { formatPrice } from "@/lib/utils"
import type { Property } from "@workspace/api-client-react"

export function PropertyCard({ property }: { property: Property }) {
  // Use a fallback image if no URL is provided, but use Unsplash real estate image ideally
  const imageUrl = property.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&fit=crop";

  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        
        {/* Image Box */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary font-semibold shadow-sm border-none">
              {property.listingType === 'buy' ? 'For Sale' : 'For Rent'}
            </Badge>
            {property.isFeatured && (
              <Badge variant="accent" className="shadow-sm border-none">
                Featured
              </Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <div className="text-white font-display font-bold text-2xl drop-shadow-md">
                {formatPrice(property.price)}
                {property.priceLabel && <span className="text-sm font-sans font-normal opacity-80 ml-1">{property.priceLabel}</span>}
              </div>
            </div>
            {property.isVerified && (
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-medium border border-white/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </div>
            )}
          </div>
        </div>

        {/* Content Box */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{property.location}</span>
          </div>
          
          <h3 className="font-display font-semibold text-xl text-foreground mb-4 line-clamp-1 group-hover:text-accent transition-colors">
            {property.title}
          </h3>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-1.5 rounded-lg bg-secondary/50 text-primary">
                <BedDouble className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-1.5 rounded-lg bg-secondary/50 text-primary">
                <Bath className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="p-1.5 rounded-lg bg-secondary/50 text-primary">
                <Square className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{property.area} {property.areaUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

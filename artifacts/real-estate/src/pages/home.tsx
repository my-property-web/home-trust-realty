import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Building2, TrendingUp, ShieldCheck, Users, ArrowRight, Star } from "lucide-react"
import { useLocation } from "wouter"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { useListProperties, useListAgents, useListTestimonials } from "@/hooks/use-api"

export default function Home() {
  const [locationParam, setLocationParam] = useState("");
  const [typeParam, setTypeParam] = useState<"buy" | "rent" | "all">("all");
  const [, setLocation] = useLocation();

  // Fetch data
  const { data: properties = [], isLoading: propsLoading } = useListProperties({ featured: true });
  const { data: agents = [], isLoading: agentsLoading } = useListAgents();
  const { data: testimonials = [] } = useListTestimonials();

  // Mock properties for loading/empty states
  const mockProperties = Array(3).fill(null).map((_, i) => ({
    id: i, title: "Luxury Estate Placeholder", price: 1500000, listingType: "buy" as const, propertyType: "house" as const, bedrooms: 4, bathrooms: 3, area: 3500, areaUnit: "sqft", location: "Beverly Hills", isVerified: true, isFeatured: true, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&fit=crop"
  }));

  const displayProperties = propsLoading || properties.length === 0 ? mockProperties : properties.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (typeParam !== "all") params.append("type", typeParam);
    if (locationParam) params.append("location", locationParam);
    setLocation(`/properties?${params.toString()}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* luxury modern home facade */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop" 
            alt="Luxury home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
              Find Your Perfect <br/><span className="text-accent italic">Aura</span> of Living
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-xl font-light drop-shadow">
              Experience the highest standard of real estate. Verified listings, transparent processes, and expert guidance.
            </p>

            {/* Search Box */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl max-w-4xl">
              <div className="flex gap-2 mb-4 px-2">
                <button 
                  onClick={() => setTypeParam("all")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${typeParam === "all" ? "bg-white text-primary" : "text-white hover:bg-white/20"}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setTypeParam("buy")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${typeParam === "buy" ? "bg-white text-primary" : "text-white hover:bg-white/20"}`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setTypeParam("rent")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${typeParam === "rent" ? "bg-white text-primary" : "text-white hover:bg-white/20"}`}
                >
                  Rent
                </button>
              </div>
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Neighborhood, City, or Zip" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-0 focus:ring-4 focus:ring-accent/30 text-foreground font-medium outline-none"
                    value={locationParam}
                    onChange={(e) => setLocationParam(e.target.value)}
                  />
                </div>
                <Button size="lg" type="submit" variant="accent" className="py-4 h-auto text-lg w-full md:w-auto px-8">
                  <Search className="w-5 h-5 mr-2" /> Search Properties
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-16 bg-background relative -mt-10 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-card rounded-3xl p-8 shadow-xl border border-border">
            {[
              { label: "Verified Listings", value: "2,500+", icon: ShieldCheck },
              { label: "Years Experience", value: "15+", icon: TrendingUp },
              { label: "Happy Clients", value: "10k+", icon: Users },
              { label: "Properties Sold", value: "4,200+", icon: Building2 },
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={stat.label} 
                className="text-center space-y-3"
              >
                <div className="w-12 h-12 mx-auto bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-bold text-3xl text-primary">{stat.value}</div>
                  <div className="text-muted-foreground font-medium text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-accent font-semibold tracking-wider uppercase mb-2 text-sm">Exclusive Selection</h2>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-primary">Featured Properties</h3>
            </div>
            <Button variant="outline" size="lg" onClick={() => setLocation("/properties")} className="shrink-0 bg-transparent">
              View All Listings <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop as any} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
        <img 
          src={`${import.meta.env.BASE_URL}images/pattern-bg.png`} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-accent font-semibold tracking-wider uppercase mb-2 text-sm">Transparent Process</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold mb-6">How Aura Works</h3>
            <p className="text-primary-foreground/70 text-lg">We've simplified the real estate journey, providing data-driven advice and unwavering support at every step.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: "Discover & Filter", desc: "Browse our curated, verified listings to find properties that perfectly match your lifestyle.", step: "01" },
              { title: "Consult & View", desc: "Book viewings instantly or get free valuations with our experienced real estate consultants.", step: "02" },
              { title: "Close with Confidence", desc: "Navigate negotiations and paperwork seamlessly with our dedicated support team.", step: "03" }
            ].map((step, i) => (
              <div key={i} className="relative p-8 rounded-3xl border border-primary-foreground/10 bg-white/5 backdrop-blur-sm">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent text-accent-foreground font-display font-bold text-xl flex items-center justify-center border-4 border-primary">
                  {step.step}
                </div>
                <h4 className="font-display font-semibold text-2xl mt-4 mb-4">{step.title}</h4>
                <p className="text-primary-foreground/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-accent font-semibold tracking-wider uppercase mb-2 text-sm">Expert Consultants</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Meet Our Top Agents</h3>
            <p className="text-muted-foreground text-lg">Work with the industry's finest. Our agents bring decades of local market knowledge and negotiation expertise.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Fallback agent array if API has none */}
            {(agents.length > 0 ? agents.slice(0, 4) : Array(4).fill({ name: "Sarah Jenkins", title: "Senior Consultant", photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&fit=crop", dealsCount: 124, rating: 4.9 })).map((agent: any, i) => (
              <div key={i} className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img src={agent.photoUrl} alt={agent.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <Button variant="accent" className="w-full">View Profile</Button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-display font-bold text-xl text-primary">{agent.name}</h4>
                  <p className="text-accent font-medium text-sm mb-3">{agent.title}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span><strong>{agent.dealsCount}</strong> deals</span>
                    <span className="flex items-center text-amber-500 font-medium">
                      <Star className="w-4 h-4 mr-1 fill-current" /> {agent.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  )
}

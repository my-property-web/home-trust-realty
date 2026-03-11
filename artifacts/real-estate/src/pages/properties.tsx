import { useState, useEffect } from "react"
import { useLocation, useSearch } from "wouter"
import { Filter, SlidersHorizontal, Loader2 } from "lucide-react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { useListProperties } from "@/hooks/use-api"

export default function Properties() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialType = searchParams.get("type") as "buy" | "rent" | "all" || "all";
  
  const [filters, setFilters] = useState({
    type: initialType,
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    propertyType: ""
  });

  const { data: properties, isLoading } = useListProperties({
    type: filters.type !== "all" ? filters.type : undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    bedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
  });

  // Handle URL updates when filters change
  const [, setLocation] = useLocation();
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.type !== "all") params.set("type", filters.type);
    const newUrl = `/properties${params.toString() ? `?${params.toString()}` : ''}`;
    // prevent infinite loop by checking if different
    if (newUrl !== `/properties${searchString ? `?${searchString}` : ''}`) {
       setLocation(newUrl, { replace: true });
    }
  }, [filters.type, setLocation, searchString]);

  return (
    <Layout>
      <div className="pt-28 pb-12 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-primary mb-2">Find Your Property</h1>
            <p className="text-muted-foreground text-lg">Browse our comprehensive selection of verified listings.</p>
          </div>

          {/* Filter Bar */}
          <div className="bg-card p-4 md:p-6 rounded-3xl shadow-md border border-border flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px] space-y-2">
              <label className="text-sm font-medium ml-1">Listing Type</label>
              <div className="flex bg-muted p-1 rounded-xl">
                {["all", "buy", "rent"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilters(f => ({ ...f, type: t as any }))}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${filters.type === t ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 min-w-[150px] space-y-2">
              <label className="text-sm font-medium ml-1">Min Price</label>
              <input 
                type="number" 
                placeholder="e.g. 500000"
                value={filters.minPrice}
                onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none" 
              />
            </div>
            
            <div className="flex-1 min-w-[150px] space-y-2">
              <label className="text-sm font-medium ml-1">Max Price</label>
              <input 
                type="number" 
                placeholder="e.g. 2000000"
                value={filters.maxPrice}
                onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none" 
              />
            </div>

            <div className="flex-1 min-w-[120px] space-y-2">
              <label className="text-sm font-medium ml-1">Beds</label>
              <select 
                value={filters.bedrooms}
                onChange={e => setFilters(f => ({ ...f, bedrooms: e.target.value }))}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-accent outline-none appearance-none"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            <Button variant="accent" className="h-[50px] px-8 shrink-0">
              <Filter className="w-4 h-4 mr-2" /> Apply Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-medium text-foreground">
              {isLoading ? "Searching..." : `Found ${properties?.length || 0} properties`}
            </h2>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Sort By
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="animate-pulse bg-muted rounded-3xl h-[450px] w-full" />
              ))}
            </div>
          ) : properties?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-3xl border border-border">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-display font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setFilters({ type: "all", minPrice: "", maxPrice: "", bedrooms: "", propertyType: "" })}
              >
                Clear Filters
              </Button>
            </div>
          )}

        </div>
      </div>
    </Layout>
  )
}

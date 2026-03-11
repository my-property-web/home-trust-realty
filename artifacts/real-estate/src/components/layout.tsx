import { useState, useEffect } from "react"
import { Link, useLocation } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, MessageCircle, Menu, X, ArrowRight, Home, Search, Star } from "lucide-react"
import { Button } from "./ui/button"
import { ValuationModal } from "./modals"
import { cn } from "@/lib/utils"

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [valuationModalOpen, setValuationModalOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground relative overflow-x-hidden">
      {/* Navbar */}
      <header 
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b",
          isScrolled || mobileMenuOpen
            ? "bg-white/95 backdrop-blur-md border-border shadow-sm py-4" 
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className={cn(
              "p-2 rounded-xl transition-colors duration-300", 
              isScrolled ? "bg-primary text-primary-foreground" : "bg-white text-primary"
            )}>
              <Building2 className="w-6 h-6" />
            </div>
            <span className={cn(
              "font-display font-bold tracking-tight text-2xl transition-colors duration-300",
              isScrolled ? "text-primary" : "text-white"
            )}>
              AURA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Buy", href: "/properties?type=buy" },
              { label: "Rent", href: "/properties?type=rent" },
            ].map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className={cn(
                  "font-medium text-sm transition-colors hover:text-accent relative group",
                  isScrolled ? "text-foreground" : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant={isScrolled ? "outline" : "secondary"} 
              className={cn(!isScrolled && "bg-white/20 text-white border-white/30 hover:bg-white/30")}
              onClick={() => setValuationModalOpen(true)}
            >
              Free Valuation
            </Button>
            <Button variant="accent">
              Contact Us
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-24 bg-background/95 backdrop-blur-lg md:hidden flex flex-col px-6"
          >
            <nav className="flex flex-col gap-6 text-2xl font-display pt-8">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <Link href="/properties?type=buy" className="hover:text-accent transition-colors">Buy Properties</Link>
              <Link href="/properties?type=rent" className="hover:text-accent transition-colors">Rent Properties</Link>
            </nav>
            <div className="mt-auto pb-12 flex flex-col gap-4">
              <Button size="lg" variant="outline" className="w-full text-lg" onClick={() => { setValuationModalOpen(true); setMobileMenuOpen(false); }}>
                Free Property Valuation
              </Button>
              <Button size="lg" variant="accent" className="w-full text-lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-accent text-accent-foreground">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight">AURA</span>
              </div>
              <p className="text-primary-foreground/70 leading-relaxed max-w-xs">
                Premium real estate services delivering exceptional properties and unparalleled client experiences since 2010.
              </p>
            </div>
            
            <div>
              <h4 className="font-display font-semibold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4 text-primary-foreground/70">
                <li><Link href="/properties?type=buy" className="hover:text-accent transition-colors">Buy a Property</Link></li>
                <li><Link href="/properties?type=rent" className="hover:text-accent transition-colors">Rent a Property</Link></li>
                <li><button onClick={() => setValuationModalOpen(true)} className="hover:text-accent transition-colors">Free Valuation</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-primary-foreground/70">
                <li>123 Luxury Avenue, Suite 500</li>
                <li>New York, NY 10022</li>
                <li>contact@auraresidences.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-6 text-white">Newsletter</h4>
              <p className="text-primary-foreground/70 mb-4">Subscribe for exclusive market insights.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-4 py-2 w-full text-white placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent transition-colors"
                />
                <Button variant="accent" size="icon" className="shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© {new Date().getFullYear()} Aura Residences. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating FAB */}
      <a 
        href="https://wa.me/1234567890?text=Hello%2C%20I%20am%20interested%20in%20a%20property%20consultation"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgb(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_12px_40px_rgb(37,211,102,0.4)] active:scale-95 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-foreground text-sm font-medium px-4 py-2 rounded-xl shadow-lg opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap border border-border">
          Chat with us!
        </span>
      </a>

      <ValuationModal isOpen={valuationModalOpen} onClose={() => setValuationModalOpen(false)} />
    </div>
  );
}

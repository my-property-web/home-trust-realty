import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MapPin, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useBookViewingMutation, useRequestValuationMutation } from "@/hooks/use-api"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const viewingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
});

export function BookViewingModal({ isOpen, onClose, propertyId, propertyTitle }: ModalProps & { propertyId?: number, propertyTitle?: string }) {
  const { mutateWithToast, isPending } = useBookViewingMutation();
  const form = useForm<z.infer<typeof viewingSchema>>({
    resolver: zodResolver(viewingSchema),
    defaultValues: { name: "", email: "", phone: "", preferredDate: "", preferredTime: "", message: "" }
  });

  const onSubmit = async (values: z.infer<typeof viewingSchema>) => {
    if (!propertyId) return;
    await mutateWithToast({
      ...values,
      propertyId,
    }, {
      onSuccess: () => {
        form.reset();
        onClose();
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-border"
            >
              <div className="relative p-8">
                <button onClick={onClose} className="absolute right-6 top-6 p-2 rounded-full bg-secondary hover:bg-muted transition-colors">
                  <X className="w-5 h-5 text-foreground" />
                </button>
                
                <div className="mb-8">
                  <h2 className="text-3xl font-display text-primary">Book a Viewing</h2>
                  <p className="text-muted-foreground mt-2">
                    {propertyTitle ? `Schedule a tour for ${propertyTitle}` : "Fill out the form below to schedule a tour."}
                  </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Full Name</label>
                      <input {...form.register("name")} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="John Doe" />
                      {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Email</label>
                      <input {...form.register("email")} type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="john@example.com" />
                      {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone</label>
                    <input {...form.register("phone")} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="+1 (555) 000-0000" />
                    {form.formState.errors.phone && <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 relative">
                      <label className="text-sm font-medium">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                        <input {...form.register("preferredDate")} type="date" className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" />
                      </div>
                      {form.formState.errors.preferredDate && <p className="text-xs text-destructive">{form.formState.errors.preferredDate.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Time (Optional)</label>
                      <input {...form.register("preferredTime")} type="time" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Message (Optional)</label>
                    <textarea {...form.register("message")} rows={3} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all resize-none" placeholder="Any specific requirements?" />
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-4" disabled={isPending || !propertyId}>
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Booking"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

const valuationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  address: z.string().min(5, "Property address is required"),
  propertyType: z.string().min(1, "Property type is required"),
  bedrooms: z.coerce.number().optional(),
  message: z.string().optional(),
});

export function ValuationModal({ isOpen, onClose }: ModalProps) {
  const { mutateWithToast, isPending } = useRequestValuationMutation();
  const form = useForm<z.infer<typeof valuationSchema>>({
    resolver: zodResolver(valuationSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", propertyType: "", message: "" }
  });

  const onSubmit = async (values: z.infer<typeof valuationSchema>) => {
    await mutateWithToast(values, {
      onSuccess: () => {
        form.reset();
        onClose();
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-border max-h-[90vh] overflow-y-auto"
            >
              <div className="relative p-8">
                <button onClick={onClose} className="absolute right-6 top-6 p-2 rounded-full bg-secondary hover:bg-muted transition-colors">
                  <X className="w-5 h-5 text-foreground" />
                </button>
                
                <div className="mb-8">
                  <h2 className="text-3xl font-display text-primary">Free Property Valuation</h2>
                  <p className="text-muted-foreground mt-2">
                    Discover the true value of your property with our data-driven market analysis.
                  </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-1 relative">
                    <label className="text-sm font-medium">Property Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
                      <input {...form.register("address")} className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="123 Luxury Ave, NY" />
                    </div>
                    {form.formState.errors.address && <p className="text-xs text-destructive">{form.formState.errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Property Type</label>
                      <select {...form.register("propertyType")} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all appearance-none">
                        <option value="">Select type...</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="penthouse">Penthouse</option>
                      </select>
                      {form.formState.errors.propertyType && <p className="text-xs text-destructive">{form.formState.errors.propertyType.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Bedrooms</label>
                      <input {...form.register("bedrooms")} type="number" min="1" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="e.g. 3" />
                    </div>
                  </div>

                  <hr className="my-6 border-border" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Full Name</label>
                      <input {...form.register("name")} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="John Doe" />
                      {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Phone</label>
                      <input {...form.register("phone")} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="+1 (555) 000-0000" />
                      {form.formState.errors.phone && <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <input {...form.register("email")} type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="john@example.com" />
                    {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                  </div>

                  <Button type="submit" size="lg" variant="accent" className="w-full mt-6" disabled={isPending}>
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Free Valuation"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

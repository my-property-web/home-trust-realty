import { useToast } from "@/hooks/use-toast";
import {
  useListProperties,
  useGetProperty,
  useListAgents,
  useListTestimonials,
  useBookViewing,
  useRequestValuation,
} from "@workspace/api-client-react";

// Re-export standard query hooks for components
export {
  useListProperties,
  useGetProperty,
  useListAgents,
  useListTestimonials,
};

// Wrapper for mutations to add beautiful toast notifications
export function useBookViewingMutation() {
  const { toast } = useToast();
  const mutation = useBookViewing();

  const mutateWithToast = async (data: any, options?: any) => {
    try {
      await mutation.mutateAsync({ data });
      toast({
        title: "Viewing Booked!",
        description: "Our agent will contact you shortly to confirm the appointment.",
      });
      options?.onSuccess?.();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
      options?.onError?.(error);
    }
  };

  return { ...mutation, mutateWithToast };
}

export function useRequestValuationMutation() {
  const { toast } = useToast();
  const mutation = useRequestValuation();

  const mutateWithToast = async (data: any, options?: any) => {
    try {
      await mutation.mutateAsync({ data });
      toast({
        title: "Valuation Requested!",
        description: "We've received your details and will process your free valuation soon.",
      });
      options?.onSuccess?.();
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
      options?.onError?.(error);
    }
  };

  return { ...mutation, mutateWithToast };
}

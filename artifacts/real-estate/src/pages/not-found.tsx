import { Link } from "wouter"
import { Home } from "lucide-react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-display font-bold text-accent mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-primary mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

import { useState, useEffect } from "react"
import { Sprout } from "lucide-react"

import { MarketWidget } from "@/components/market-widget"
import { MapView } from "@/components/map-view"
import { PostProduct } from "@/components/post-product"

import { DUMMY_PRODUCTS } from "@/lib/dummy-data"
import type { Product } from "@/lib/types"

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8000/products")
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(DUMMY_PRODUCTS)
        }
      } catch (error) {
        console.error("Error fetching products, using dummy data:", error)
        setProducts(DUMMY_PRODUCTS)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Sticky Glassmorphic Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
            <Sprout className="h-6 w-6 fill-current" />
            <span>AgriLocal</span>
          </div>
          <nav className="ml-auto flex items-center gap-4 text-sm font-medium">
            <a href="#" className="transition-colors hover:text-primary">Buy</a>
            <a href="#" className="transition-colors hover:text-primary">Sell</a>
          </nav>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-8 space-y-8">

        {/* Hero / Intro Section */}
        <section className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-foreground">
            Fresh from the Backyard
          </h1>
          <p className="text-muted-foreground text-lg max-w-[600px]">
            The simplest way to buy and sell hyper-local produce in Kottayam.
            Connect directly with your neighbors.
          </p>
        </section>

        {/* Components Grid */}
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] items-start">
          <div className="space-y-6">
            <MapView products={products} />
            <PostProduct />
          </div>

          <div className="space-y-6">
            <MarketWidget />

            {/* Sanity Check Card - can remove later or style better */}
            {/* <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold leading-none tracking-tight">System Status</h3>
                  <p className="text-sm text-muted-foreground pt-1">UI v2.0 (Emerald theme) active.</p>
                </div>
                <Button onClick={() => setCount((c) => c + 1)} variant="outline" className="w-full">
                  Test Interaction ({count})
                </Button>
              </div>
            </div> */}
          </div>
        </div>

      </main>
    </div>
  )
}

export default App

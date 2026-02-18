import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { MarketWidget } from "@/components/market-widget"
import { MapView } from "@/components/map-view"
import { PostProduct } from "@/components/post-product"

import { DUMMY_PRODUCTS } from "@/lib/dummy-data"
import type { Product } from "@/lib/types"

function App() {
  const [count, setCount] = useState(0)
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
          // Fallback if empty array
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
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">AgriLocal</h1>
          <p className="text-sm text-muted-foreground">
            Kottayam hyper-local marketplace (setup complete).
          </p>
        </header>

        <MapView products={products} />

        <MarketWidget />

        <PostProduct />

        <div className="rounded-lg border bg-card p-6 text-card-foreground">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-sm font-medium">UI sanity check</div>
              <div className="text-sm text-muted-foreground">
                Tailwind + shadcn/ui utilities are wired up.
              </div>
            </div>
            <Button onClick={() => setCount((c) => c + 1)}>
              Clicked {count} times
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

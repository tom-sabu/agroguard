import { useEffect, useState } from "react"
import { ShoppingBasket } from "lucide-react"

import type { Product } from "@/lib/types"

export function MarketWidget() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) return []
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data)) setProducts(data.slice(0, 5)) // Show top 5
      })
      .catch((err) => console.error("Market widget fetch error:", err))
  }, [])

  if (products.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center text-muted-foreground shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <ShoppingBasket className="h-8 w-8 opacity-20" />
          <p className="text-sm">No new arrivals.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="border-b bg-muted/40 p-4">
        <h3 className="font-semibold flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
          <ShoppingBasket className="h-4 w-4 text-primary" />
          Fresh Arrivals
        </h3>
      </div>
      <div className="divide-y relative">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">IMG</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm leading-none truncate">{product.title}</p>
              <p className="text-xs text-muted-foreground capitalize mt-1.5">{product.category}</p>
            </div>
            <div className="font-bold text-primary text-sm whitespace-nowrap bg-primary/10 px-2 py-1 rounded">
              ₹{product.price_inr}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


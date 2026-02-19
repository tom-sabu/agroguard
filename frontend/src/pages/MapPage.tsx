import { MapView } from "@/components/map-view"
import { useEffect, useState } from "react"
import { DUMMY_PRODUCTS } from "@/lib/dummy-data"
import type { Product } from "@/lib/types"

export function MapPage() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("http://localhost:8000/products")
                if (!res.ok) throw new Error("Failed to fetch")
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) return setProducts(data)
                setProducts(DUMMY_PRODUCTS)
            } catch (error) {
                setProducts(DUMMY_PRODUCTS)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="container max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-64px)]">
            <h1 className="sr-only">Kottayam Live Map</h1>
            <MapView products={products} />
        </div>
    )
}

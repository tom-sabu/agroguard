import { useState, useEffect } from "react"
import { ShoppingCart, MapPin } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { DUMMY_PRODUCTS } from "@/lib/dummy-data"
import type { Product } from "@/lib/types"
import { API_BASE_URL } from "@/config"
import { useCart } from "@/context/CartContext"

import { MarketTrends } from "@/components/market-trends"

export function Home() {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchParams] = useSearchParams()
    const { addToCart } = useCart()

    const searchQuery = searchParams.get("q") || ""

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`${API_BASE_URL}/products`)
                if (!res.ok) throw new Error("Failed to fetch")
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) {
                    setProducts(data)
                } else {
                    setProducts(DUMMY_PRODUCTS)
                }
            } catch (error) {
                setProducts(DUMMY_PRODUCTS)
            }
        }
        fetchProducts()
    }, [])

    const categories = ["All", "Vegetable", "Fruit", "Spice", "Other"]

    const filteredProducts = products.filter((product) => {
        // 1. Filter by Category
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

        // 2. Filter by Search Query (if any)
        const query = searchQuery.toLowerCase()
        const matchesSearch = !query ||
            (product.title && product.title.toLowerCase().includes(query)) ||
            (product.category && product.category.toLowerCase().includes(query))

        return matchesCategory && matchesSearch
    })

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">

            {/* Market Trends Section */}
            <section>
                <MarketTrends />
            </section>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-10 bg-background/80 backdrop-blur-md p-2 -mx-2 rounded-lg">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight px-2">Marketplace</h1>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide px-2">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className="whitespace-nowrap rounded-full"
                            size="sm"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group block">
                        <div className="rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
                            <div className="aspect-[4/3] relative bg-muted">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-background/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium shadow-sm border">
                                    ₹{product.price_inr}
                                </div>
                                {product.quantity_available && (
                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white backdrop-blur px-2 py-0.5 rounded text-[10px] font-medium shadow-sm">
                                        {product.quantity_available} {product.quantity_unit}
                                    </div>
                                )}
                            </div>
                            <div className="p-3 sm:p-4 space-y-1 flex-1 flex flex-col">
                                <h3 className="font-semibold truncate group-hover:text-primary transition-colors text-sm sm:text-base">{product.title}</h3>
                                <div className="flex items-center text-xs text-muted-foreground gap-1 pb-2">
                                    <MapPin className="h-3 w-3" />
                                    <span>Kottayam</span>
                                </div>
                                <div className="mt-auto pt-2">
                                    <Button
                                        size="sm"
                                        className="w-full h-8 text-xs sm:text-sm"
                                        variant="secondary"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addToCart(product)
                                        }}
                                    >
                                        <ShoppingCart className="mr-1.5 h-3.5 w-3.5" /> Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

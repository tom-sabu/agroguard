import { useState, useEffect } from "react"
import { ShoppingCart, MapPin } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { DUMMY_PRODUCTS } from "@/lib/dummy-data"
import type { Product } from "@/lib/types"
import { useCart } from "@/context/CartContext"

export function Home() {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchParams] = useSearchParams()
    const { addToCart } = useCart()

    const searchQuery = searchParams.get("q") || ""

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
        <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className="whitespace-nowrap"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group block">
                        <div className="rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md">
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
                                <div className="absolute top-2 right-2 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-medium shadow-sm">
                                    ₹{product.price_inr}
                                </div>
                            </div>
                            <div className="p-4 space-y-1">
                                <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{product.title}</h3>
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>Kottayam</span>
                                </div>
                            </div>
                            <div className="px-4 pb-4">
                                <Button
                                    size="sm"
                                    className="w-full"
                                    variant="secondary"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        addToCart(product)
                                    }}
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

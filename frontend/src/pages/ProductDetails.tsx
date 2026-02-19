import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, MapPin, Navigation, ShoppingBag } from "lucide-react"
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import { Button } from "@/components/ui/button"
import { DUMMY_PRODUCTS } from "@/lib/dummy-data"
import type { Product } from "@/lib/types"

import { useCart } from "@/context/CartContext"

// Fix for Leaflet default icon
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

function MapController({ center }: { center: [number, number] }) {
    const map = useMap()
    useEffect(() => {
        map.setView(center, 13)
    }, [center, map])
    return null
}

export function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const { addToCart } = useCart()

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
    const [distance, setDistance] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return

        // Fetch from API first
        fetch(`http://localhost:8000/products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Not found")
                return res.json()
            })
            .then(data => {
                if (data.id) setProduct(data)
            })
            .catch(() => {
                // Only fallback if API fails
                const found = DUMMY_PRODUCTS.find(p => p.id === Number(id))
                if (found) setProduct(found)
            })

    }, [id])

    const handleShowRoute = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const userLat = pos.coords.latitude
                const userLon = pos.coords.longitude
                setUserLocation([userLat, userLon])

                if (product) {
                    // Calculate Haversine distance
                    const R = 6371 // km
                    const dLat = (product.lat - userLat) * Math.PI / 180
                    const dLon = (product.lon - userLon) * Math.PI / 180
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(userLat * Math.PI / 180) * Math.cos(product.lat * Math.PI / 180) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2)
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
                    const d = R * c
                    setDistance(d.toFixed(2))
                }
            }, () => {
                alert("Could not get your location.")
            })
        } else {
            alert("Geolocation not supported.")
        }
    }

    if (!product) return <div className="p-8 text-center">Loading product...</div>

    return (
        <div className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Marketplace
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                    {product.image_url ? (
                        <img src={product.image_url} alt={product.title} className="object-cover w-full h-full" />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">No Image</div>
                    )}
                </div>

                {/* Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{product.title}</h1>
                        <p className="text-xl text-muted-foreground capitalize mt-1">{product.category}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-primary">₹{product.price_inr}</div>
                        <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded font-medium">In Stock</div>
                    </div>

                    <p className="text-muted-foreground">
                        Freshly harvested from local farms in Kottayam. Direct farm-to-table quality guaranteed.
                    </p>

                    <div className="space-y-3 pt-4 border-t">
                        <div className="flex items-center gap-2 font-medium">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>Seller Location: {product.lat}, {product.lon}</span>
                        </div>

                        {distance && (
                            <div className="flex items-center gap-2 text-sm text-green-600 font-bold bg-green-50 p-2 rounded">
                                <Navigation className="h-4 w-4" />
                                <span>Distance: {distance} km (Direct Line)</span>
                            </div>
                        )}

                        <div className="h-[200px] w-full rounded-lg overflow-hidden border">
                            <MapContainer center={[product.lat, product.lon]} zoom={13} className="h-full w-full" scrollWheelZoom={false}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <MapController center={[product.lat, product.lon]} />
                                <Marker position={[product.lat, product.lon]}>
                                    <Popup>Seller Location</Popup>
                                </Marker>

                                {userLocation && (
                                    <>
                                        <Marker position={userLocation}>
                                            <Popup>You are here</Popup>
                                        </Marker>
                                        <Polyline positions={[userLocation, [product.lat, product.lon]]} color="blue" dashArray="10, 10" />
                                    </>
                                )}
                            </MapContainer>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button size="lg" className="flex-1 font-bold" onClick={handleShowRoute}>
                                <Navigation className="mr-2 h-4 w-4" />
                                {userLocation ? "Update Route" : "Show Route"}
                            </Button>
                            <Button size="lg" variant="outline" className="flex-1" onClick={() => product && addToCart(product)}>
                                <ShoppingBag className="mr-2 h-4 w-4" /> Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

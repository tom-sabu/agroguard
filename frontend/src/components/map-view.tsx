import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { MapPin } from "lucide-react"

import type { Product } from "@/lib/types"

// Fix for Leaflet default icon not showing
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

const KOTTAYAM_LAT = 9.5916
const KOTTAYAM_LON = 76.5222

interface MapViewProps {
  products?: Product[]
}

export function MapView({ products = [] }: MapViewProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="absolute inset-x-0 top-0 z-[1000] flex items-center justify-between gap-3 px-4 py-3 bg-white/90 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2 text-primary">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-semibold tracking-tight">Kottayam Live Map</span>
        </div>
        <div className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
          {products.length} Active Listings
        </div>
      </div>

      <MapContainer
        center={[KOTTAYAM_LAT, KOTTAYAM_LON]}
        zoom={13}
        className="h-[450px] w-full z-0"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {products.map((product) => (
          <Marker
            key={product.id}
            position={[product.lat, product.lon]}
          >
            <Popup className="custom-popup">
              <div className="flex flex-col gap-3 min-w-[200px]">
                {product.image_url ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-md bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    No Image
                  </div>
                )}

                <div className="space-y-1">
                  <h3 className="font-semibold leading-none">{product.title}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-bold text-lg text-primary">₹{product.price_inr}</span>
                  <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}


import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

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
    <div className="relative overflow-hidden rounded-xl border bg-card">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm">
        <div className="space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Map view
          </p>
          <p className="text-sm font-semibold leading-none">
            Kottayam (Lat {KOTTAYAM_LAT}, Lon {KOTTAYAM_LON})
          </p>
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          {products.length} products found
        </div>
      </div>

      <MapContainer
        center={[KOTTAYAM_LAT, KOTTAYAM_LON]}
        zoom={13}
        className="h-[380px] w-full z-0"
        scrollWheelZoom
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
            <Popup>
              <div className="flex flex-col gap-2">
                <div className="font-semibold">{product.title}</div>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="h-24 w-full object-cover rounded-sm"
                  />
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{product.category}</span>
                  <span className="font-bold">₹{product.price_inr}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}


import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer } from "react-leaflet"

const KOTTAYAM_LAT = 9.5916
const KOTTAYAM_LON = 76.5222

export function MapView() {
  return (
    <div className="relative overflow-hidden rounded-xl border bg-card">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-4 py-3">
        <div className="space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Map view
          </p>
          <p className="text-sm font-semibold leading-none">
            Kottayam (Lat {KOTTAYAM_LAT}, Lon {KOTTAYAM_LON})
          </p>
        </div>
      </div>

      <MapContainer
        center={[KOTTAYAM_LAT, KOTTAYAM_LON]}
        zoom={13}
        className="h-[380px] w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}


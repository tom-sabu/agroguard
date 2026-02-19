
import { useState, useRef } from "react"
import axios from "axios"
import { Loader2, Upload, MapPin, CheckCircle2, AlertCircle, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function PostProduct() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Vegetable")
  const [price, setPrice] = useState("")
  const [lat, setLat] = useState("9.5916")
  const [lon, setLon] = useState("76.5222")
  const [file, setFile] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    if (!file) {
      setError("Please select an image.")
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("category", category)
    formData.append("price_inr", price)
    formData.append("lat", lat)
    formData.append("lon", lon)
    formData.append("file", file)

    try {
      await axios.post("http://localhost:8000/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setSuccess(true)
      setTitle("")
      setPrice("")
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.detail || "Failed to post product.")
    } finally {
      setLoading(false)
    }
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude.toFixed(6))
          setLon(position.coords.longitude.toFixed(6))
        },
        (err) => {
          console.error(err)
          alert("Could not get location. Using default.")
        }
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  return (
    <Card className="w-full rounded-xl border-dashed border-2 shadow-sm hover:border-primary/50 transition-colors">
      <CardHeader className="bg-muted/40 pb-4">
        <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          List Your Harvest
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Product Title
            </label>
            <input
              type="text"
              placeholder="e.g. Fresh Tomatoes"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Category
              </label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
                <option value="Spice">Spice</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">₹</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Pickup Location</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={`${lat}, ${lon}`}
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input bg-muted pl-9 px-3 py-2 text-xs text-muted-foreground focus-visible:outline-none cursor-default font-mono"
                />
              </div>
              <Button type="button" variant="outline" size="icon" onClick={handleGetLocation} className="shrink-0" title="Use Current Location">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Product Image</label>
            <div
              className={`flex flex-col items-center justify-center w-full h-32 px-4 transition border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 ${file ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 bg-muted/5'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? (
                <div className="flex flex-col items-center gap-2 text-primary">
                  <CheckCircle2 className="w-8 h-8" />
                  <span className="font-medium text-sm truncate max-w-[200px]">{file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="w-8 h-8 opacity-50" />
                  <span className="font-medium text-sm">Click to upload photo</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 text-sm text-primary bg-primary/10 rounded-md">
              <CheckCircle2 className="h-4 w-4" />
              <span>Listing created successfully!</span>
            </div>
          )}

          <Button type="submit" className="w-full font-bold" disabled={loading} size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Listing...
              </>
            ) : (
              "Post listing"
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}


import { useState, useRef } from "react"
import axios from "axios"
import { Loader2, Upload, MapPin, CheckCircle2, AlertCircle } from "lucide-react"

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
    <Card className="w-full max-w-md mx-auto shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
          Sell Your Produce
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Product Title
            </label>
            <input
              type="text"
              placeholder="e.g. Fresh Tomatoes"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              <input
                type="number"
                placeholder="0.00"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Location</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={`${lat}, ${lon}`}
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input bg-muted pl-9 px-3 py-2 text-sm text-muted-foreground focus-visible:outline-none cursor-default"
                />
              </div>
              <Button type="button" variant="outline" size="icon" onClick={handleGetLocation} title="Use Current Location">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Upload Image</label>
            <div
              className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="flex flex-col items-center space-y-2">
                {file ? (
                  <span className="font-medium text-primary truncate max-w-[200px]">{file.name}</span>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground text-sm">Click update image</span>
                  </>
                )}
              </span>
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
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-50 rounded-md">
              <CheckCircle2 className="h-4 w-4" />
              <span>Product listed successfully!</span>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wait
              </>
            ) : (
              "List Product"
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}

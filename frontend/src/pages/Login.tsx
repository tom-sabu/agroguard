import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Sprout } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

export function Login() {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name.trim()) {
            login(name, location || "Kottayam")
            navigate(-1) // Go back to where they were
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-sm">
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="rounded-full bg-primary/10 p-3">
                        <Sprout className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Welcome to AgriLocal</h1>
                    <p className="text-sm text-muted-foreground">Sign in to start shopping fresh from neighbors.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="name">
                            Your Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="e.g. John Doe"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="location">
                            Location (Optional)
                        </label>
                        <input
                            id="location"
                            type="text"
                            placeholder="e.g. Kottayam"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    )
}

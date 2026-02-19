import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Sprout, ShoppingCart, Search, User, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

export function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const { totalItems } = useCart()
    const { user, logout } = useAuth()

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/?q=${encodeURIComponent(searchQuery)}`)
        } else {
            navigate("/")
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight mr-8">
                    <Sprout className="h-6 w-6 fill-current" />
                    <span>AgriLocal</span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm relative mr-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search fresh produce..."
                        className="w-full rounded-full border border-input bg-background pl-9 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                {/* Navigation Links */}
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link
                        to="/"
                        className={`transition-colors hover:text-primary ${location.pathname === "/" ? "text-primary font-bold" : "text-muted-foreground"}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/map"
                        className={`transition-colors hover:text-primary ${location.pathname === "/map" ? "text-primary font-bold" : "text-muted-foreground"}`}
                    >
                        Map
                    </Link>
                    <Link
                        to="/sell"
                        className={`transition-colors hover:text-primary ${location.pathname === "/sell" ? "text-primary font-bold" : "text-muted-foreground"}`}
                    >
                        Sell
                    </Link>
                </nav>

                {/* User Actions */}
                <div className="ml-auto flex items-center gap-2">
                    <Link to="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2 ml-2">
                            <span className="text-sm font-medium hidden md:inline-block">Hi, {user.name}</span>
                            <Button variant="ghost" size="icon" onClick={() => logout()} title="Logout">
                                <User className="h-5 w-5" />
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <LogIn className="h-4 w-4" />
                                <span className="hidden md:inline">Login</span>
                            </Button>
                        </Link>
                    )}

                    <Link to="/sell" className="hidden md:inline-flex">
                        <Button className="ml-2 font-semibold">Post Listing</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

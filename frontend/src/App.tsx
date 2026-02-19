import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "@/components/layout/navbar"
import { Home } from "@/pages/Home"
import { Sell } from "@/pages/Sell"
import { MapPage } from "@/pages/MapPage"
import { ProductDetails } from "@/pages/ProductDetails"
import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/AuthContext"
import { Cart } from "@/pages/Cart"
import { Login } from "@/pages/Login"

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-dvh bg-background text-foreground font-sans selection:bg-primary/20 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>

            {/* Simple Footer */}
            <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-muted/20">
              <p>&copy; 2026 AgriLocal (Agroguard). Fresh from Kottayam.</p>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "@/lib/types"

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    const addToCart = (product: Product) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id)
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...currentItems, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: number) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
    }

    const clearCart = () => setItems([])

    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = items.reduce((total, item) => total + ((item.price_inr || 0) * item.quantity), 0)

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

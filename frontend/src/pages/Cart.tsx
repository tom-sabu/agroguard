import { Plus, Trash2, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"

export function Cart() {
    const { items, addToCart, removeFromCart, totalItems, totalPrice } = useCart()
    const { user } = useAuth()

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
                <div className="rounded-full bg-muted p-6 mb-4">
                    <Trash2 className="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't added any fresh produce yet.</p>
                <Link to="/">
                    <Button>Start Shopping</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart ({totalItems})</h1>

            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm items-center">
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted border">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No Img</div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold truncate">{item.title}</h3>
                                <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                                <div className="font-bold text-primary mt-1">₹{item.price_inr}</div>
                            </div>

                            <div className="flex items-center gap-1">
                                {/* For now, just remove, implementing full update requires context update */}
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                                <div className="w-8 text-center font-medium">{item.quantity}</div>
                                {/* Re-add simply increments */}
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToCart(item)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4 sticky top-24">
                        <h3 className="font-semibold text-lg">Order Summary</h3>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Delivery (Est.)</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>

                        {user ? (
                            <div className="pt-2">
                                <div className="text-xs text-muted-foreground mb-2">
                                    Shipping to: <span className="font-medium text-foreground">{user.name}, {user.location}</span>
                                </div>
                                <Button className="w-full font-bold" size="lg">
                                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="secondary" className="w-full" size="lg">
                                    Login to Checkout
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

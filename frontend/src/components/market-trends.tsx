
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type MarketItem = {
    name: string
    price: number
    unit: string
    trend: "up" | "down" | "stable"
    change: string
}

const MARKET_DATA: MarketItem[] = [
    { name: "Tomato", price: 45, unit: "kg", trend: "up", change: "+12%" },
    { name: "Coconut", price: 28, unit: "nut", trend: "stable", change: "0%" },
    { name: "Banana (Nendran)", price: 55, unit: "kg", trend: "down", change: "-5%" },
    { name: "Pepper", price: 480, unit: "kg", trend: "up", change: "+2%" },
    { name: "Rubber", price: 180, unit: "kg", trend: "up", change: "+1.5%" },
    { name: "Ginger", price: 120, unit: "kg", trend: "down", change: "-8%" },
]

export function MarketTrends() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold tracking-tight">Today's Market Rates (Kottayam)</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {MARKET_DATA.map((item) => (
                    <Card key={item.name} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-background/50 backdrop-blur">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-sm text-muted-foreground truncate" title={item.name}>
                                    {item.name}
                                </span>
                                {item.trend === "up" && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                                {item.trend === "down" && <ArrowDownRight className="h-4 w-4 text-red-500" />}
                                {item.trend === "stable" && <Minus className="h-4 w-4 text-gray-400" />}
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold">₹{item.price}</span>
                                <span className="text-xs text-muted-foreground">/{item.unit}</span>
                            </div>
                            <div className={`text-xs mt-1 font-medium ${item.trend === "up" ? "text-green-600" :
                                    item.trend === "down" ? "text-red-600" : "text-gray-500"
                                }`}>
                                {item.change} since yesterday
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

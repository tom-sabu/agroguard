import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const KOTTAYAM_PRICES = [
  { item: "Rubber (RSS4)", price: 160, unit: "kg" },
  { item: "Coconut", price: 35, unit: "unit" },
  { item: "Black Pepper", price: 600, unit: "kg" },
]

export function MarketWidget() {
  return (
    <Card className="backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Today&apos;s Market Prices — Kottayam</CardTitle>
        <CardDescription>
          Demo prices from <span className="font-medium">Docs/Market_Data.md</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {KOTTAYAM_PRICES.map((row) => (
            <div
              key={row.item}
              className="flex items-center justify-between gap-4 py-2 text-sm"
            >
              <div className="space-y-0.5">
                <div className="font-medium">{row.item}</div>
                <div className="text-xs text-muted-foreground">Kottayam fallback rate</div>
              </div>
              <div className="text-right">
                <div className="font-semibold tracking-tight">
                  ₹{row.price.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-muted-foreground">per {row.unit}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


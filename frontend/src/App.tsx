import { useState } from "react"

import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">AgriLocal</h1>
          <p className="text-sm text-muted-foreground">
            Kottayam hyper-local marketplace (setup complete).
          </p>
        </header>

        <div className="rounded-lg border bg-card p-6 text-card-foreground">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-sm font-medium">UI sanity check</div>
              <div className="text-sm text-muted-foreground">
                Tailwind + shadcn/ui utilities are wired up.
              </div>
            </div>
            <Button onClick={() => setCount((c) => c + 1)}>
              Clicked {count} times
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

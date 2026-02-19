import { PostProduct } from "@/components/post-product"

export function Sell() {
    return (
        <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
            <div className="text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Sell Your Produce</h1>
                <p className="text-muted-foreground text-lg">
                    List your fresh fruits, vegetables, or spices for sale in your local community.
                </p>
            </div>

            <div className="flex justify-center md:justify-start">
                <PostProduct />
            </div>
        </div>
    )
}

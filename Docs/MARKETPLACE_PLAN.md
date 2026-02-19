
# Marketplace Feature Implementation Plan

## 1. Separate Sections (Pages)
- **Home**: Main product grid with categories.
- **Sell**: Detailed form for listing items.
- **Map**: Full-screen map view of all items.
- **Product Details**: Individual product view with route finding.

## 2. Categories & Filters
- Add Category Tabs (Vegetable, Fruit, Spice, etc.) on Home.
- Add Location Dropdown (for filtering by region).

## 3. Product Details with Map Routing
- When user clicks a product:
  - Open `/product/:id`.
  - Show larger image, price, seller info.
  - Show embedded map centered on seller.
  - Button: "Show Route".
  - Action: Get User Geolocation -> Draw Polyline to Seller -> Show Distance.

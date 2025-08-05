# Agent Instructions - Shopify Theme Development

## Build/Development Commands
- `shopify theme dev` - Start development server with hot reload
- `shopify theme push` - Deploy theme to Shopify store
- `shopify theme pull` - Sync theme from store to local
- `shopify theme check` - Validate Liquid code and theme structure

## Architecture & Structure
- **Theme Type**: Custom Shopify Liquid theme (Theme from scratch v1.0.0)
- **assets/**: CSS files (all.min.css, theme.css, base.css, collection.css)
- **layout/**: Main theme template (theme.liquid)
- **sections/**: Reusable theme sections (header.liquid, announcement-bar.liquid)
- **templates/**: Page templates (product.liquid, collection.liquid, cart.liquid, etc.)
- **config/**: Theme settings (settings_schema.json.liquid, settings_data.json)
- **.shopify/**: Shopify CLI config and metafields.json

## Code Style Guidelines
- **Liquid**: Use lowercase with dashes for file names, snake_case for variables
- **CSS**: Use BEM-like naming, system fonts preferred (-apple-system, BlinkMacSystemFont)
- **Colors**: Use semantic colors (#000 for buttons, #2e7d32 for prices, #333 for text)
- **Layout**: Flexbox preferred, max-width: 1200px containers, responsive design
- **Spacing**: Use rem units, consistent 1rem/2rem spacing patterns
- **Forms**: Use Shopify form helpers ({% form 'product', product %})
- **Images**: Use Shopify image filters (| image_url: width:, | img_url:)
- **Prices**: Always use money filters (| money_with_currency)

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `shopify theme dev` - Start development server with hot reload
- `shopify theme push` - Deploy theme to Shopify store
- `shopify theme pull` - Sync theme from store to local
- `shopify theme check` - Validate Liquid code and theme structure

## Architecture & Structure

This is a custom Shopify Liquid theme called "Theme from scratch" (v1.0.0) by Himanshu Yadav. The theme follows standard Shopify theme architecture:

- **layout/theme.liquid**: Main theme template that includes header/footer groups and dynamic content
- **sections/**: Reusable theme sections (header, footer, hero, featured-collection, announcement-bar)
- **templates/**: Page templates using JSON format that reference sections (index.json, product.json, collection.json, etc.)
- **assets/**: CSS files (all.min.css, theme.css, base.css, collection.css)
- **config/**: Theme settings schema and data (settings_schema.json, settings_data.json)
- **blocks/**: Reusable content blocks (button.liquid, text.liquid, image.liquid, group.liquid)
- **locales/**: Translation files (en.default.json, fr.json)

### Key Architecture Patterns

- **Section Groups**: Uses `{% sections 'header-group' %}` and `{% sections 'footer-group' %}` for modular layout
- **JSON Templates**: Templates are JSON files that reference sections rather than direct Liquid templates
- **Font Management**: Dynamic font loading with CSS custom properties for heading and body fonts
- **Responsive Design**: Max-width 1200px containers with flexbox layouts

## Code Style Guidelines

- **Liquid**: Use lowercase with dashes for file names, snake_case for variables
- **CSS**: Use BEM-like naming, system fonts preferred (-apple-system, BlinkMacSystemFont)
- **Colors**: Use semantic colors (#000 for buttons, #2e7d32 for prices, #333 for text)
- **Layout**: Flexbox preferred, max-width: 1200px containers, responsive design
- **Spacing**: Use rem units, consistent 1rem/2rem spacing patterns
- **Forms**: Use Shopify form helpers ({% form 'product', product %})
- **Images**: Use Shopify image filters (| image_url: width:, | img_url:)
- **Prices**: Always use money filters (| money_with_currency)

## Theme Configuration

- **Typography**: Configurable body and heading fonts via settings (default: assistant_n4)
- **Settings Schema**: Defined in config/settings_schema.json with Typography section
- **Font Loading**: Uses font_face filter with swap display for performance
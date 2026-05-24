# Angular EV Compare - Codebase Overview

## Project Description
This is an Angular application for comparing electric vehicles (scooters and motorcycles), focusing on Vietnamese brands. The app provides features to browse, search, view details, and compare electric vehicles.

## Technology Stack
- **Framework**: Angular 18+ (Standalone Components)
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide Angular
- **Language**: TypeScript
- **Build Tool**: Angular CLI

## Project Structure

### Root Files
- `main.ts`: Application bootstrap entry point
- `index.html`: Main HTML template
- `styles.css`: Global styles (imports Tailwind and theme.css)
- `theme.css`: Custom CSS variables for theming (light/dark mode support)

### App Module (`src/app/`)
- `app.ts`: Root component (standalone)
- `app.component.ts`: Alternative root component (not used in main.ts)
- `app.component.html`: Layout with navbar and router outlet
- `app.config.ts`: Application configuration (router setup)
- `app.routes.ts`: Route definitions for all features

### Core (`src/app/core/`)
#### Models (`models/`)
- `vehicle.model.ts`: Defines `Vehicle` and `Review` interfaces, plus `BRANDS` constant

#### Services (`services/`)
- `vehicle.service.ts`: Provides mock vehicle data and basic CRUD operations
- `language.service.ts`: Manages internationalization (English/Vietnamese translations)

### Components (`src/app/components/`)
#### Navbar (`navbar/`)
- `navbar.component.ts`: Navigation bar with language toggle
- `navbar.component.html`: Navigation links and language switcher
- `navbar.component.css`: Custom hover styles

#### Vehicle Card (`vehicle-card/`)
- `vehicle-card.component.ts`: Reusable card component for displaying vehicle info
- `vehicle-card.component.html`: Inline template for vehicle cards

### Features (`src/app/features/`)

#### Home (`home/`)
- `home.component.ts`: Landing page with hero section, brands, and featured vehicles
- `home.component.html`: Hero, brand links, featured grid, and footer
- `home.component.css`: Empty

#### Search (`search/`)
- `search.component.ts`: Search and filter functionality
- `search.component.html`: Search bar, filters panel, and results grid
- `search.component.css`: Empty

#### Detail (`detail/`)
- `detail.component.ts`: Individual vehicle detail view
- `detail.component.html`: Detailed specs, reviews, colors, and features
- `detail.component.css`: Empty

#### Compare (`compare/`)
- `compare.component.ts`: Side-by-side vehicle comparison
- `compare.component.html`: Selection form and comparison table
- `compare.component.css`: Empty

## Key Features

### 1. Multi-language Support
- English and Vietnamese translations
- Language toggle in navbar
- All UI text is translatable

### 2. Vehicle Management
- Mock data for 8 vehicles from brands: VinFast, Yadea, Dibao, Pega, DK Bike, Osakar
- Vehicle properties: brand, model, price, specs (range, speed, battery, etc.), features, reviews

### 3. Navigation & Routing
- Home: Landing page
- Search: Filterable vehicle search
- Detail: Individual vehicle pages (/detail/:id)
- Compare: Side-by-side comparison (up to 4 vehicles)

### 4. Responsive Design
- Mobile-first approach with Tailwind CSS
- Grid layouts that adapt to screen sizes

### 5. Theming
- Light/dark mode support (CSS variables)
- Custom color palette with primary, secondary, etc.

## Data Flow

1. **VehicleService**: Provides static vehicle data
2. **LanguageService**: Manages current language and translations
3. **Components**: Consume services and display data
4. **Routing**: Handles navigation between features

## Notable Implementation Details

- **Standalone Components**: All components are standalone, no NgModules
- **Signals**: Uses Angular signals for reactive state (language)
- **Dependency Injection**: Services injected using `inject()` function
- **Icons**: Lucide icons used throughout the app
- **Forms**: Template-driven forms for search and compare
- **Internationalization**: Key-based translation system

## Development Notes

- The app uses mock data; in production, VehicleService would connect to a real API
- Some CSS files are empty, indicating potential for additional styling
- The app is focused on Vietnamese market electric vehicles
- Responsive design prioritizes mobile experience

## File Counts
- TypeScript: 12 files
- HTML: 7 files  
- CSS: 7 files
- Total source files: 26

This codebase represents a well-structured Angular application with modern practices, ready for further development and deployment.

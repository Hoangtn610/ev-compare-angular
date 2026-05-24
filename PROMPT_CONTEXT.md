# EV Compare App - Project Context

This file provides context about the repository structure, tech stack, and conventions. You can share this file with AI coding assistants to give them an immediate understanding of the project.

## 🎯 Project Overview
An Angular web application (EV Compare) that allows users to search, view details, and compare Electric Vehicles. 

## 🏗️ Technology Stack
- **Framework:** Angular 19+ (uses v21.1.0 in package.json)
- **Component Style:** Standalone Components (`standalone: true` by default)
- **Styling:** TailwindCSS v4 with PostCSS.
- **Icons:** `lucide-angular`
- **State Management:** Angular Signals & Services (e.g., `inject()` function)

## 📁 Repository Structure
The project follows a modular architecture:
- `src/main.ts`: Application entry point. Bootstraps the app using `bootstrapApplication()`.
- `src/app/app.config.ts`: Global application configuration (Routing, Error Handling).
- `src/app/app.component.ts`: Root component containing the `Navbar` and `RouterOutlet`.
- `src/app/app.routes.ts`: Defines top-level routes (`/`, `/search`, `/compare`, `/detail/:id`).
- `src/app/features/`: Contains page-level components corresponding to routes (Home, Search, Details, Compare).
- `src/app/components/`: Reusable, dumb/presentational UI components (e.g., `NavbarComponent`, `VehicleCardComponent`).
- `src/app/core/`: Singleton services and data models.
  - `services/vehicle.service.ts`: Handles fetching and returning mock/API vehicle data.
  - `services/language.service.ts`: Handles i18n/language state.
  - `models/vehicle.model.ts`: TypeScript interfaces and types for vehicles and brands.

## 🔄 App Execution Flow & Lifecycle
1. **Bootstrap Phase:** `src/main.ts` initializes the app, loading `AppComponent` and configuration (`app.config.ts`).
2. **Routing Phase:** `AppComponent` renders the initial layout (`<app-navbar>`) and processes the current URL through `<router-outlet>`.
3. **Component Instantiation:** Based on the route, a feature component (e.g., `HomeComponent`) is loaded.
4. **Dependency Injection:** The component uses `inject(Service)` to request singletons like `VehicleService`.
5. **Rendering & Child Components:** The feature component passes data down to UI components via `@Input()` bindings (e.g., feeding vehicle data into `<app-vehicle-card>`).
6. **Destruction:** When the user navigates to a new route, the router destroys the current feature component (triggering `ngOnDestroy`) and initializes the newly matched route component.

## 📝 Coding Conventions (For AI Prompts)
When writing new code for this project, the AI should follow these rules:
- **No NgModules:** Strictly use Standalone Components (`@Component({ standalone: true, imports: [...] })`).
- **Modern DI:** Use the `inject()` function instead of constructor injection (e.g., `private vehicleService = inject(VehicleService)`).
- ** reactivity:** Prefer Angular Signals where appropriate for local/global state.
- **File Structure:** Maintain the 3-file structure for components (`.ts`, `.html`, `.css`). Do not use inline templates unless the component is extremely small.
- **Styling:** Rely on TailwindCSS utility classes. Only use the component `.css` file for highly specific overriding or custom animations.

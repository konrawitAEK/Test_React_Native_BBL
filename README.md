# Test React Native BBL

A mobile app (React Native + TypeScript + Expo) that fetches products from
[Fake Store API](https://fakestoreapi.com/products) and lets the user
manage a global list of favorites.

## Features

- **Product List** — `FlatList` of products (image, title, price) with
  pull-to-refresh, fetched from `https://fakestoreapi.com/products`.
- **Product Detail** — tap a product to view full details (image,
  category, price, description).
- **Favorites (Global State)** — a React Context (`FavoritesContext`)
  holds the favorites list app-wide, so status stays in sync across
  screens/tabs.
- **Favorites Tab** — a dedicated bottom tab listing all favorited
  products, with a badge showing the count.
- **Remove from Favorites** — from either the detail screen (toggle) or
  directly from the Favorites tab.
- **Persistence** — favorites are saved to `AsyncStorage` and reloaded on
  app start, so they survive an app restart.
- **Animation** — the favorite button "pops" (scale animation) when
  tapped.

## Tech Stack

- React Native (Expo, TypeScript template)
- TypeScript
- React Navigation (Bottom Tabs + Native Stack)
- React Context API for global state
- `@react-native-async-storage/async-storage` for persistence

## Project Structure

```
Test_React_Native_BBL/
├── App.tsx
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
└── src/
    ├── context/
    │   └── FavoritesContext.tsx   # Global favorites state + AsyncStorage
    ├── navigation/
    │   └── RootNavigator.tsx      # Bottom tabs + stack navigator
    ├── screens/
    │   ├── ProductListScreen.tsx
    │   ├── ProductDetailScreen.tsx
    │   └── FavoritesScreen.tsx
    └── types/
        └── product.ts             # Shared TS types
```

## Setup & Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Expo dev server:

   ```bash
   npm start
   ```

3. Run on a device/simulator:
   - Press `i` for iOS simulator (macOS only)
   - Press `a` for Android emulator
   - Or scan the QR code with the **Expo Go** app on your phone

   > Requires Node.js 18+ and either Xcode (iOS) or Android Studio
   > (Android) set up locally, or just the Expo Go app on a physical
   > device — no native build tools needed for this project.

## Notes on Implementation Choices

- **Expo** was used to keep setup to a single `npm install` + `npm start`,
  ideal for a timed technical test / quick review.
- **Context API** was chosen over Redux/Zustand for favorites since the
  app has a single, simple piece of shared state — Context keeps the
  code easy to read without extra boilerplate.
- **Native Stack Navigator** (`@react-navigation/native-stack`) is used
  for the Products flow for native transition performance, wrapped in a
  **Bottom Tab Navigator** for switching between Products and Favorites.

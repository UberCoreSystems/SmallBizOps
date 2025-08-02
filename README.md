# Small Biz Ops - AI-Powered Halal Food Truck Management

A modern, bilingual business management application built with Vite + React + Tailwind CSS for halal food truck operators.

## 🚀 Features

- **Bilingual Support**: Full English/Spanish localization
- **Food Inventory Management**: Track halal ingredients, prepared meals, and supplies
- **Financial Tracking**: Monitor food truck cash flow, expenses, and profitability
- **AI Business Manager**: Get intelligent recommendations for menu optimization
- **Mobile-First Design**: Perfect for on-the-go food truck operations
- **Offline Support**: Local storage for data persistence during events
- **Modern UI**: Clean, accessible interface with Tailwind CSS

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and context (JavaScript)
- **Vite** - Fast build tool with HMR
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Firebase** - Authentication and database (ready to configure)
- **LocalStorage** - Offline data persistence

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Usage

### Navigation
- **Home**: Dashboard with overview and AI recommendations
- **Inventory**: Manage finished goods and raw materials
- **Finance**: Track transactions and profitability
- **Settings**: Configure language and app preferences

### Language Switching
Click the globe icon in the navigation to switch between English and Spanish.

### Data Persistence
All data is automatically saved to localStorage for offline access.

## 🧩 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── HomePage.jsx    # Dashboard page
│   ├── InventoryPage.jsx
│   ├── FinancePage.jsx
│   ├── SettingsPage.jsx
│   ├── Navigation.jsx
│   └── AIBusinessManager.jsx
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utilities and configurations
├── data/               # Mock data
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

Built with ❤️ for halal food truck entrepreneurs worldwide.

import React, { useState } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Navigation } from '@/components/Navigation'
import { HomePage } from '@/components/HomePage'
import { InventoryPage } from '@/components/InventoryPage'
import { FinancePage } from '@/components/FinancePage'
import { SettingsPage } from '@/components/SettingsPage'
import { AIBusinessManager } from '@/components/AIBusinessManager'
import { mockInventory, mockRawMaterials, mockTransactions } from '@/data/mockData'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [inventory, setInventory] = useState(mockInventory)
  const [rawMaterials, setRawMaterials] = useState(mockRawMaterials)
  const [transactions, setTransactions] = useState(mockTransactions)

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div>
            <HomePage
              inventory={inventory}
              rawMaterials={rawMaterials}
              transactions={transactions}
              setCurrentView={setCurrentView}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <AIBusinessManager
                inventory={inventory}
                rawMaterials={rawMaterials}
                transactions={transactions}
              />
            </div>
          </div>
        )
      case 'inventory':
        return (
          <InventoryPage
            inventory={inventory}
            rawMaterials={rawMaterials}
            setInventory={setInventory}
            setRawMaterials={setRawMaterials}
          />
        )
      case 'finance':
        return (
          <FinancePage
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )
      case 'settings':
        return <SettingsPage />
      default:
        return (
          <HomePage
            inventory={inventory}
            rawMaterials={rawMaterials}
            transactions={transactions}
            setCurrentView={setCurrentView}
          />
        )
    }
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        <main className="pb-16 md:pb-0">
          {renderCurrentView()}
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App

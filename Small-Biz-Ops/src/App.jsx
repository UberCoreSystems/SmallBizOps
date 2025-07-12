import React, { useState, useContext, createContext } from 'react';
import './App.css';
import { AIBusinessManager } from './AIBusinessManager';

// Language Context for bilingual support
const LanguageContext = createContext();

// Mock data for demonstration
const mockInventory = [
  { id: 1, name: 'Hammer', name_es: 'Martillo', quantity: 15, price: 25.99, category: 'tools', type: 'finished', minStock: 10 },
  { id: 2, name: 'Paint Brush', name_es: 'Pincel', quantity: 30, price: 8.50, category: 'supplies', type: 'finished', minStock: 20 },
  { id: 3, name: 'Coffee Beans', name_es: 'Granos de Café', quantity: 50, price: 12.00, category: 'food', type: 'finished', minStock: 25 }
];

const mockRawMaterials = [
  { id: 4, name: 'Steel Bar', name_es: 'Barra de Acero', quantity: 5, price: 15.50, category: 'materials', type: 'raw', minStock: 10, supplier: 'Steel Corp', lastOrdered: '2024-01-10' },
  { id: 5, name: 'Wood Plank', name_es: 'Tabla de Madera', quantity: 8, price: 12.00, category: 'materials', type: 'raw', minStock: 15, supplier: 'Lumber Inc', lastOrdered: '2024-01-08' },
  { id: 6, name: 'Bristles', name_es: 'Cerdas', quantity: 3, price: 5.25, category: 'materials', type: 'raw', minStock: 20, supplier: 'Brush Materials Co', lastOrdered: '2024-01-05' },
  { id: 7, name: 'Paint Pigment', name_es: 'Pigmento de Pintura', quantity: 25, price: 8.75, category: 'materials', type: 'raw', minStock: 15, supplier: 'Color Solutions', lastOrdered: '2024-01-12' }
];

const mockTransactions = [
  { id: 1, type: 'sale', amount: 156.75, date: '2024-01-15', description: 'Tool sale', description_es: 'Venta de herramientas' },
  { id: 2, type: 'expense', amount: 45.20, date: '2024-01-14', description: 'Supply purchase', description_es: 'Compra de suministros' },
  { id: 3, type: 'sale', amount: 89.50, date: '2024-01-13', description: 'Service payment', description_es: 'Pago de servicio' }
];

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [language, setLanguage] = useState('en');
  const [inventory, setInventory] = useState(mockInventory);
  const [rawMaterials, setRawMaterials] = useState(mockRawMaterials);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [inventoryView, setInventoryView] = useState('finished'); // 'finished' or 'raw'

  const translations = {
    en: {
      appTitle: 'Small Biz Ops',
      home: 'Home',
      inventory: 'Inventory',
      finance: 'Finance',
      settings: 'Settings',
      welcome: 'Welcome to Your Business Hub',
      totalItems: 'Total Items',
      lowStockAlert: 'Low Stock Alert',
      todaySales: 'Today\'s Sales',
      monthlyProfit: 'Monthly Profit',
      addItem: 'Add Item',
      viewAll: 'View All',
      quickStats: 'Quick Stats',
      recentTransactions: 'Recent Transactions',
      itemName: 'Item Name',
      quantity: 'Quantity',
      price: 'Price',
      category: 'Category',
      tools: 'Tools',
      supplies: 'Supplies',
      food: 'Food',
      materials: 'Materials',
      sale: 'Sale',
      expense: 'Expense',
      language: 'Language',
      rawMaterials: 'Raw Materials',
      finishedGoods: 'Finished Goods',
      needsReorder: 'Needs Reorder',
      supplier: 'Supplier',
      lastOrdered: 'Last Ordered',
      reorderAlert: 'Reorder Alert',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      aiManager: 'AI Manager',
    },
    es: {
      appTitle: 'Ops Pequeño Negocio',
      home: 'Inicio',
      inventory: 'Inventario',
      finance: 'Finanzas',
      settings: 'Configuración',
      welcome: 'Bienvenido a Tu Centro de Negocios',
      totalItems: 'Total de Artículos',
      lowStockAlert: 'Alerta de Stock Bajo',
      todaySales: 'Ventas de Hoy',
      monthlyProfit: 'Ganancia Mensual',
      addItem: 'Agregar Artículo',
      viewAll: 'Ver Todo',
      quickStats: 'Estadísticas Rápidas',
      recentTransactions: 'Transacciones Recientes',
      itemName: 'Nombre del Artículo',
      quantity: 'Cantidad',
      price: 'Precio',
      category: 'Categoría',
      tools: 'Herramientas',
      supplies: 'Suministros',
      food: 'Comida',
      materials: 'Materiales',
      sale: 'Venta',
      expense: 'Gasto',
      language: 'Idioma',
      rawMaterials: 'Materias Primas',
      finishedGoods: 'Productos Terminados',
      needsReorder: 'Necesita Reorden',
      supplier: 'Proveedor',
      lastOrdered: 'Último Pedido',
      reorderAlert: 'Alerta de Reorden',
      inStock: 'En Stock',
      lowStock: 'Stock Bajo',
      aiManager: 'Gerente IA',
    }
  };

  const t = translations[language];

  // Header Component
  const Header = () => (
    <header className="header">
      <h1>{t.appTitle}</h1>
      <div className="language-selector">
        <button 
          className={language === 'en' ? 'active' : ''}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
        <button 
          className={language === 'es' ? 'active' : ''}
          onClick={() => setLanguage('es')}
        >
          ES
        </button>
      </div>
    </header>
  );

  // Navigation Component
  const Navigation = () => (
    <nav className="navigation">
      <button 
        className={currentView === 'home' ? 'active' : ''}
        onClick={() => setCurrentView('home')}
      >
        <span className="nav-icon">🏠</span>
        {t.home}
      </button>
      <button 
        className={currentView === 'inventory' ? 'active' : ''}
        onClick={() => setCurrentView('inventory')}
      >
        <span className="nav-icon">📦</span>
        {t.inventory}
      </button>
      <button 
        className={currentView === 'finance' ? 'active' : ''}
        onClick={() => setCurrentView('finance')}
      >
        <span className="nav-icon">💰</span>
        {t.finance}
      </button>
      <button 
        className={currentView === 'settings' ? 'active' : ''}
        onClick={() => setCurrentView('settings')}
      >
        <span className="nav-icon">⚙️</span>
        {t.settings}
      </button>
      {/* AI Business Manager Tab */}
      <button
        className={currentView === 'aiManager' ? 'active' : ''}
        onClick={() => setCurrentView('aiManager')}
      >
        <span className="nav-icon">🤖</span>
        {t.aiManager}
      </button>
    </nav>
  );

  // Home Screen Component
  const HomeScreen = () => {
    const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const totalRawMaterials = rawMaterials.reduce((sum, item) => sum + item.quantity, 0);
    const lowStockItems = inventory.filter(item => item.quantity < item.minStock).length;
    const reorderNeeded = rawMaterials.filter(item => item.quantity <= item.minStock).length;
    const todaySales = transactions
      .filter(t => t.type === 'sale' && t.date === '2024-01-15')
      .reduce((sum, t) => sum + t.amount, 0);

    return (
      <div className="screen">
        <h2>{t.welcome}</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{totalItems}</div>
            <div className="stat-label">{t.finishedGoods}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalRawMaterials}</div>
            <div className="stat-label">{t.rawMaterials}</div>
          </div>
          <div className="stat-card alert">
            <div className="stat-number">{lowStockItems}</div>
            <div className="stat-label">{t.lowStockAlert}</div>
          </div>
          <div className="stat-card critical">
            <div className="stat-number">{reorderNeeded}</div>
            <div className="stat-label">{t.needsReorder}</div>
          </div>
        </div>

        {reorderNeeded > 0 && (
          <div className="reorder-alerts">
            <h3>🚨 {t.reorderAlert}</h3>
            {rawMaterials
              .filter(item => item.quantity <= item.minStock)
              .map(item => (
                <div key={item.id} className="alert-item">
                  <div className="alert-info">
                    <strong>{language === 'es' ? item.name_es : item.name}</strong>
                    <div className="alert-details">
                      {t.quantity}: {item.quantity} | {t.supplier}: {item.supplier}
                    </div>
                  </div>
                  <button className="reorder-btn">
                    📞 Reorder
                  </button>
                </div>
              ))
            }
          </div>
        )}

        <div className="quick-actions">
          <button className="action-btn primary" onClick={() => setCurrentView('inventory')}>
            📦 {t.addItem}
          </button>
          <button className="action-btn" onClick={() => setCurrentView('finance')}>
            💰 {t.viewAll}
          </button>
        </div>

        <div className="recent-section">
          <h3>{t.recentTransactions}</h3>
          {transactions.slice(0, 3).map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <span className={`transaction-type ${transaction.type}`}>
                {transaction.type === 'sale' ? '↗️' : '↘️'}
              </span>
              <div className="transaction-details">
                <div className="transaction-desc">
                  {language === 'es' ? transaction.description_es : transaction.description}
                </div>
                <div className="transaction-date">{transaction.date}</div>
              </div>
              <div className={`transaction-amount ${transaction.type}`}>
                ${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Inventory Screen Component
  const InventoryScreen = () => {
    const currentItems = inventoryView === 'finished' ? inventory : rawMaterials;

    return (
      <div className="screen">
        <div className="screen-header">
          <h2>{t.inventory}</h2>
          <button className="add-btn">+ {t.addItem}</button>
        </div>

        <div className="inventory-tabs">
          <button 
            className={inventoryView === 'finished' ? 'tab active' : 'tab'}
            onClick={() => setInventoryView('finished')}
          >
            📦 {t.finishedGoods}
          </button>
          <button 
            className={inventoryView === 'raw' ? 'tab active' : 'tab'}
            onClick={() => setInventoryView('raw')}
          >
            🔧 {t.rawMaterials}
          </button>
        </div>

        <div className="inventory-grid">
          {currentItems.map(item => (
            <div key={item.id} className="inventory-card">
              <div className="item-header">
                <h3>{language === 'es' ? item.name_es : item.name}</h3>
                <span className={`quantity ${item.quantity <= item.minStock ? 'critical' : item.quantity < item.minStock * 1.5 ? 'low' : ''}`}>
                  {item.quantity}
                </span>
              </div>
              <div className="item-details">
                <div className="item-price">${item.price}</div>
                <div className="item-category">{t[item.category]}</div>
              </div>
              {inventoryView === 'raw' && (
                <div className="raw-material-info">
                  <div className="supplier-info">
                    <span className="label">{t.supplier}:</span> {item.supplier}
                  </div>
                  <div className="last-ordered">
                    <span className="label">{t.lastOrdered}:</span> {item.lastOrdered}
                  </div>
                  {item.quantity <= item.minStock && (
                    <div className="reorder-warning">
                      ⚠️ {t.needsReorder}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Finance Screen Component
  const FinanceScreen = () => {
    const totalSales = transactions
      .filter(t => t.type === 'sale')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return (
      <div className="screen">
        <h2>{t.finance}</h2>

        <div className="finance-summary">
          <div className="summary-card sales">
            <h3>Sales</h3>
            <div className="amount">${totalSales.toFixed(2)}</div>
          </div>
          <div className="summary-card expenses">
            <h3>Expenses</h3>
            <div className="amount">${totalExpenses.toFixed(2)}</div>
          </div>
          <div className="summary-card profit">
            <h3>Profit</h3>
            <div className="amount">${(totalSales - totalExpenses).toFixed(2)}</div>
          </div>
        </div>

        <div className="transactions-list">
          <h3>{t.recentTransactions}</h3>
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction-row">
              <div className="transaction-info">
                <div className="transaction-desc">
                  {language === 'es' ? transaction.description_es : transaction.description}
                </div>
                <div className="transaction-date">{transaction.date}</div>
              </div>
              <div className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'sale' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // AI Business Manager Screen Component
  const AIManagerScreen = () => {
    const handleRecommendation = (recommendation) => {
      console.log('Implementing recommendation:', recommendation);
      
      // Example implementation logic based on recommendation type
      switch (recommendation.type) {
        case 'reorderAlert':
          // Auto-update inventory quantities for critical items
          const criticalItems = rawMaterials.filter(item => item.quantity <= item.minStock);
          console.log('Auto-reordering critical items:', criticalItems.map(item => item.name));
          break;
          
        case 'financialAlert':
          // Could trigger financial analysis or reporting
          console.log('Triggering financial optimization procedures');
          break;
          
        case 'qualityAlert':
          // Could update quality control procedures
          console.log('Implementing quality control measures');
          break;
          
        case 'distributionAlert':
          // Could optimize distribution routes
          console.log('Optimizing distribution efficiency');
          break;
          
        default:
          console.log('General business improvement implemented');
      }
    };

    return (
      <div className="screen">
        <AIBusinessManager 
          inventory={inventory}
          rawMaterials={rawMaterials}
          transactions={transactions}
          language={language}
          onRecommendation={handleRecommendation}
        />
      </div>
    );
  };

  // Settings Screen Component
  const SettingsScreen = () => (
    <div className="screen">
      <h2>{t.settings}</h2>
      <div className="settings-list">
        <div className="setting-item">
          <span>{t.language}</span>
          <div className="language-buttons">
            <button 
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            <button 
              className={language === 'es' ? 'active' : ''}
              onClick={() => setLanguage('es')}
            >
              Español
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home': return <HomeScreen />;
      case 'inventory': return <InventoryScreen />;
      case 'finance': return <FinanceScreen />;
      case 'settings': return <SettingsScreen />;
      case 'aiManager': return <AIManagerScreen />; // Render AI Manager screen
      default: return <HomeScreen />;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="app">
        <Header />
        <main className="main-content">
          {renderCurrentView()}
        </main>
        <Navigation />
      </div>
    </LanguageContext.Provider>
  );
}
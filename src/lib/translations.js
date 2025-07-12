export const translations = {
  en: {
    // App navigation
    appTitle: 'Small Biz Ops',
    home: 'Home',
    inventory: 'Inventory',
    finance: 'Finance',
    settings: 'Settings',
    
    // Home page
    welcome: 'Welcome to Your Business Hub',
    totalItems: 'Total Items',
    lowStockAlert: 'Low Stock Alert',
    todaySales: "Today's Sales",
    monthlyProfit: 'Monthly Profit',
    addItem: 'Add Item',
    viewAll: 'View All',
    
    // Inventory
    finishedGoods: 'Finished Goods',
    rawMaterials: 'Raw Materials',
    itemName: 'Item Name',
    quantity: 'Quantity',
    price: 'Price',
    category: 'Category',
    minStock: 'Min Stock',
    supplier: 'Supplier',
    lastOrdered: 'Last Ordered',
    reorderNow: 'Reorder Now',
    editItem: 'Edit Item',
    deleteItem: 'Delete Item',
    
    // Finance
    cashFlow: 'Cash Flow',
    expenses: 'Expenses',
    sales: 'Sales',
    profit: 'Profit',
    addTransaction: 'Add Transaction',
    transactionType: 'Transaction Type',
    amount: 'Amount',
    description: 'Description',
    date: 'Date',
    
    // AI Manager
    aiManager: 'AI Business Manager',
    aiSubtitle: '30+ Years SMB Experience',
    analyzing: 'Analyzing your business...',
    recommendations: 'Business Recommendations',
    insights: 'Performance Insights',
    reorderAlert: 'Supply Chain Alert',
    financialAlert: 'Financial Advisory',
    qualityAlert: 'Quality Control',
    distributionAlert: 'Distribution Optimization',
    implementRec: 'Implement',
    viewDetails: 'View Details',
    riskLevel: 'Risk Level',
    priority: 'Priority',
    impact: 'Impact',
    roi: 'Expected ROI',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Categories
    tools: 'Tools',
    supplies: 'Supplies',
    food: 'Food',
    materials: 'Materials',
    
    // Status
    excellent: 'Excellent',
    good: 'Good',
    needsImprovement: 'Needs Improvement',
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  },
  es: {
    // App navigation
    appTitle: 'Small Biz Ops',
    home: 'Inicio',
    inventory: 'Inventario',
    finance: 'Finanzas',
    settings: 'Configuración',
    
    // Home page
    welcome: 'Bienvenido a tu Centro de Negocios',
    totalItems: 'Total de Artículos',
    lowStockAlert: 'Alerta de Stock Bajo',
    todaySales: 'Ventas de Hoy',
    monthlyProfit: 'Ganancia Mensual',
    addItem: 'Agregar Artículo',
    viewAll: 'Ver Todo',
    
    // Inventory
    finishedGoods: 'Productos Terminados',
    rawMaterials: 'Materias Primas',
    itemName: 'Nombre del Artículo',
    quantity: 'Cantidad',
    price: 'Precio',
    category: 'Categoría',
    minStock: 'Stock Mínimo',
    supplier: 'Proveedor',
    lastOrdered: 'Último Pedido',
    reorderNow: 'Reordenar Ahora',
    editItem: 'Editar Artículo',
    deleteItem: 'Eliminar Artículo',
    
    // Finance
    cashFlow: 'Flujo de Caja',
    expenses: 'Gastos',
    sales: 'Ventas',
    profit: 'Ganancia',
    addTransaction: 'Agregar Transacción',
    transactionType: 'Tipo de Transacción',
    amount: 'Cantidad',
    description: 'Descripción',
    date: 'Fecha',
    
    // AI Manager
    aiManager: 'Gerente de Negocios IA',
    aiSubtitle: '30+ Años de Experiencia PYME',
    analyzing: 'Analizando tu negocio...',
    recommendations: 'Recomendaciones de Negocio',
    insights: 'Perspectivas de Rendimiento',
    reorderAlert: 'Alerta de Cadena de Suministro',
    financialAlert: 'Asesoría Financiera',
    qualityAlert: 'Control de Calidad',
    distributionAlert: 'Optimización de Distribución',
    implementRec: 'Implementar',
    viewDetails: 'Ver Detalles',
    riskLevel: 'Nivel de Riesgo',
    priority: 'Prioridad',
    impact: 'Impacto',
    roi: 'ROI Esperado',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    add: 'Agregar',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    
    // Categories
    tools: 'Herramientas',
    supplies: 'Suministros',
    food: 'Comida',
    materials: 'Materiales',
    
    // Status
    excellent: 'Excelente',
    good: 'Bueno',
    needsImprovement: 'Necesita Mejora',
    critical: 'Crítico',
    high: 'Alto',
    medium: 'Medio',
    low: 'Bajo',
  }
}

export const useTranslation = (language) => {
  return translations[language] || translations.en
}

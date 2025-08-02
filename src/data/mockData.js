export const mockInventory = [
  { 
    id: 1, 
    name: 'Hammer', 
    name_es: 'Martillo', 
    quantity: 15, 
    price: 25.99, 
    category: 'tools', 
    type: 'finished', 
    minStock: 10 
  },
  { 
    id: 2, 
    name: 'Paint Brush', 
    name_es: 'Pincel', 
    quantity: 30, 
    price: 8.50, 
    category: 'supplies', 
    type: 'finished', 
    minStock: 20 
  },
  { 
    id: 3, 
    name: 'Coffee Beans', 
    name_es: 'Granos de Café', 
    quantity: 50, 
    price: 12.00, 
    category: 'food', 
    type: 'finished', 
    minStock: 25 
  }
]

export const mockRawMaterials = [
  { 
    id: 4, 
    name: 'Steel Bar', 
    name_es: 'Barra de Acero', 
    quantity: 5, 
    price: 15.50, 
    category: 'materials', 
    type: 'raw', 
    minStock: 10, 
    supplier: 'Steel Corp', 
    lastOrdered: '2024-01-10' 
  },
  { 
    id: 5, 
    name: 'Wood Plank', 
    name_es: 'Tabla de Madera', 
    quantity: 8, 
    price: 12.00, 
    category: 'materials', 
    type: 'raw', 
    minStock: 15, 
    supplier: 'Lumber Inc', 
    lastOrdered: '2024-01-08' 
  },
  { 
    id: 6, 
    name: 'Bristles', 
    name_es: 'Cerdas', 
    quantity: 3, 
    price: 5.25, 
    category: 'materials', 
    type: 'raw', 
    minStock: 20, 
    supplier: 'Brush Materials Co', 
    lastOrdered: '2024-01-05' 
  },
  { 
    id: 7, 
    name: 'Paint Pigment', 
    name_es: 'Pigmento de Pintura', 
    quantity: 25, 
    price: 8.75, 
    category: 'materials', 
    type: 'raw', 
    minStock: 15, 
    supplier: 'Color Solutions', 
    lastOrdered: '2024-01-12' 
  }
]

export const mockTransactions = [
  { 
    id: 1, 
    type: 'sale', 
    amount: 156.75, 
    date: '2024-01-15', 
    timestamp: new Date('2024-01-15T10:30:00'),
    description: 'Tool sale', 
    description_es: 'Venta de herramientas' 
  },
  { 
    id: 2, 
    type: 'expense', 
    amount: 45.20, 
    date: '2024-01-14', 
    timestamp: new Date('2024-01-14T14:20:00'),
    description: 'Supply purchase', 
    description_es: 'Compra de suministros' 
  },
  { 
    id: 3, 
    type: 'sale', 
    amount: 89.50, 
    date: '2024-01-13', 
    timestamp: new Date('2024-01-13T16:45:00'),
    description: 'Service payment', 
    description_es: 'Pago de servicio' 
  },
  // Recent transactions for Cash Flow Radar testing
  { 
    id: 4, 
    type: 'sale', 
    amount: 245.00, 
    date: new Date().toISOString().split('T')[0], 
    timestamp: new Date(),
    description: 'Coffee beans sale', 
    description_es: 'Venta de granos de café' 
  },
  { 
    id: 5, 
    type: 'expense', 
    amount: 85.30, 
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], 
    timestamp: new Date(Date.now() - 86400000),
    description: 'Rent payment', 
    description_es: 'Pago de alquiler' 
  },
  { 
    id: 6, 
    type: 'sale', 
    amount: 320.50, 
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], 
    timestamp: new Date(Date.now() - 172800000),
    description: 'Hardware sale', 
    description_es: 'Venta de herramientas' 
  },
  { 
    id: 7, 
    type: 'expense', 
    amount: 125.75, 
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0], 
    timestamp: new Date(Date.now() - 259200000),
    description: 'Supplies restocking', 
    description_es: 'Reabastecimiento de suministros' 
  },
  { 
    id: 8, 
    type: 'sale', 
    amount: 180.25, 
    date: new Date(Date.now() - 345600000).toISOString().split('T')[0], 
    timestamp: new Date(Date.now() - 345600000),
    description: 'Paint supplies sale', 
    description_es: 'Venta de suministros de pintura' 
  }
]

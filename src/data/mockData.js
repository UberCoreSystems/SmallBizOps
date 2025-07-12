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
    description: 'Tool sale', 
    description_es: 'Venta de herramientas' 
  },
  { 
    id: 2, 
    type: 'expense', 
    amount: 45.20, 
    date: '2024-01-14', 
    description: 'Supply purchase', 
    description_es: 'Compra de suministros' 
  },
  { 
    id: 3, 
    type: 'sale', 
    amount: 89.50, 
    date: '2024-01-13', 
    description: 'Service payment', 
    description_es: 'Pago de servicio' 
  }
]

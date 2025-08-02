export const mockInventory = [
  { 
    id: 1, 
    name: 'Chicken over Rice', 
    name_es: 'Pollo sobre Arroz', 
    quantity: 25, 
    price: 9.99, 
    category: 'entree', 
    type: 'finished', 
    minStock: 15 
  },
  { 
    id: 2, 
    name: 'Lamb over Rice', 
    name_es: 'Cordero sobre Arroz', 
    quantity: 20, 
    price: 10.99, 
    category: 'entree', 
    type: 'finished', 
    minStock: 12 
  },
  { 
    id: 3, 
    name: 'Gyro Wrap', 
    name_es: 'Envoltorio de Gyro', 
    quantity: 30, 
    price: 8.99, 
    category: 'entree', 
    type: 'finished', 
    minStock: 20 
  },
  { 
    id: 4, 
    name: 'Falafel over Rice', 
    name_es: 'Falafel sobre Arroz', 
    quantity: 18, 
    price: 8.49, 
    category: 'vegetarian', 
    type: 'finished', 
    minStock: 15 
  },
  { 
    id: 5, 
    name: 'Combo Platter', 
    name_es: 'Plato Combinado', 
    quantity: 15, 
    price: 11.49, 
    category: 'entree', 
    type: 'finished', 
    minStock: 10 
  },
  { 
    id: 6, 
    name: 'White Sauce Packets', 
    name_es: 'Paquetes de Salsa Blanca', 
    quantity: 200, 
    price: 0.25, 
    category: 'condiments', 
    type: 'finished', 
    minStock: 100 
  },
  { 
    id: 7, 
    name: 'Hot Sauce Packets', 
    name_es: 'Paquetes de Salsa Picante', 
    quantity: 180, 
    price: 0.25, 
    category: 'condiments', 
    type: 'finished', 
    minStock: 100 
  },
  { 
    id: 8, 
    name: 'Pita Bread', 
    name_es: 'Pan Pita', 
    quantity: 50, 
    price: 1.00, 
    category: 'sides', 
    type: 'finished', 
    minStock: 30 
  },
  { 
    id: 9, 
    name: 'French Fries', 
    name_es: 'Papas Fritas', 
    quantity: 40, 
    price: 2.99, 
    category: 'sides', 
    type: 'finished', 
    minStock: 25 
  },
  { 
    id: 10, 
    name: 'Canned Soda', 
    name_es: 'Refresco en Lata', 
    quantity: 60, 
    price: 1.50, 
    category: 'beverage', 
    type: 'finished', 
    minStock: 36 
  },
  { 
    id: 11, 
    name: 'Bottled Water', 
    name_es: 'Agua Embotellada', 
    quantity: 48, 
    price: 1.00, 
    category: 'beverage', 
    type: 'finished', 
    minStock: 24 
  }
]

export const mockRawMaterials = [
  { 
    id: 12, 
    name: 'Raw Chicken', 
    name_es: 'Pollo Crudo', 
    quantity: 15, 
    price: 4.50, 
    category: 'protein', 
    type: 'raw', 
    minStock: 20, 
    supplier: 'Halal Meat Co', 
    lastOrdered: '2025-07-30' 
  },
  { 
    id: 13, 
    name: 'Raw Lamb', 
    name_es: 'Cordero Crudo', 
    quantity: 8, 
    price: 8.75, 
    category: 'protein', 
    type: 'raw', 
    minStock: 12, 
    supplier: 'Halal Meat Co', 
    lastOrdered: '2025-07-28' 
  },
  { 
    id: 14, 
    name: 'Basmati Rice', 
    name_es: 'Arroz Basmati', 
    quantity: 25, 
    price: 2.25, 
    category: 'grains', 
    type: 'raw', 
    minStock: 30, 
    supplier: 'Middle East Foods Supply', 
    lastOrdered: '2025-07-25' 
  },
  { 
    id: 15, 
    name: 'Pita Bread (Frozen)', 
    name_es: 'Pan Pita (Congelado)', 
    quantity: 40, 
    price: 0.35, 
    category: 'bread', 
    type: 'raw', 
    minStock: 50, 
    supplier: 'Mediterranean Bakery', 
    lastOrdered: '2025-07-29' 
  },
  { 
    id: 16, 
    name: 'Tahini Sauce Mix', 
    name_es: 'Mezcla de Salsa Tahini', 
    quantity: 12, 
    price: 3.50, 
    category: 'sauces', 
    type: 'raw', 
    minStock: 15, 
    supplier: 'Middle East Foods Supply', 
    lastOrdered: '2025-07-26' 
  },
  { 
    id: 17, 
    name: 'Spice Mix', 
    name_es: 'Mezcla de Especias', 
    quantity: 8, 
    price: 5.75, 
    category: 'seasonings', 
    type: 'raw', 
    minStock: 10, 
    supplier: 'Spice World', 
    lastOrdered: '2025-07-27' 
  }
]

export const mockTransactions = [
  { 
    id: 1, 
    type: 'sale', 
    amount: 156.75, 
    date: '2025-07-15', 
    timestamp: new Date('2025-07-15T12:30:00'),
    description: 'Lunch rush sales', 
    description_es: 'Ventas de la hora del almuerzo' 
  },
  { 
    id: 2, 
    type: 'expense', 
    amount: 145.20, 
    date: '2025-07-14', 
    timestamp: new Date('2025-07-14T08:20:00'),
    description: 'Halal meat purchase', 
    description_es: 'Compra de carne halal' 
  },
  { 
    id: 3, 
    type: 'sale', 
    amount: 289.50, 
    date: '2025-07-13', 
    timestamp: new Date('2025-07-13T18:45:00'),
    description: 'Dinner service', 
    description_es: 'Servicio de cena' 
  },
  // Recent transactions for Cash Flow Radar testing
  { 
    id: 4, 
    type: 'sale', 
    amount: 345.00, 
    date: new Date().toISOString().split('T')[0], 
    timestamp: new Date(),
    description: 'Food truck sales', 
    description_es: 'Ventas del food truck' 
  },
  { 
    id: 5, 
    type: 'expense', 
    amount: 185.30, 
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], 
    timestamp: new Date(Date.now() - 86400000),
    description: 'Truck permit renewal', 
    description_es: 'Renovación de permiso del camión' 
  },
  { 
    id: 6, 
    type: 'sale', 
    amount: 420.50, 
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], 
    timestamp: new Date(Date.now() - 172800000),
    description: 'Catering order', 
    description_es: 'Pedido de catering' 
  },
  { 
    id: 7, 
    type: 'expense', 
    amount: 225.75, 
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0], 
    timestamp: new Date(Date.now() - 259200000),
    description: 'Food supplies restocking', 
    description_es: 'Reabastecimiento de suministros alimentarios' 
  },
  { 
    id: 8, 
    type: 'sale', 
    amount: 380.25, 
    date: new Date(Date.now() - 345600000).toISOString().split('T')[0], 
    timestamp: new Date(Date.now() - 345600000),
    description: 'Weekend festival sales', 
    description_es: 'Ventas del festival de fin de semana' 
  }
]

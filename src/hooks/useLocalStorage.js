import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// Hook for managing business data with localStorage persistence
export const useBusinessData = () => {
  const [inventory, setInventory] = useLocalStorage('smallbizops_inventory', [])
  const [rawMaterials, setRawMaterials] = useLocalStorage('smallbizops_raw_materials', [])
  const [transactions, setTransactions] = useLocalStorage('smallbizops_transactions', [])

  const addInventoryItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      type: 'finished'
    }
    setInventory(prev => [...prev, newItem])
  }

  const addRawMaterial = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      type: 'raw'
    }
    setRawMaterials(prev => [...prev, newItem])
  }

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    setTransactions(prev => [...prev, newTransaction])
  }

  const updateInventoryItem = (id, updates) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const updateRawMaterial = (id, updates) => {
    setRawMaterials(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const deleteInventoryItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id))
  }

  const deleteRawMaterial = (id) => {
    setRawMaterials(prev => prev.filter(item => item.id !== id))
  }

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id))
  }

  return {
    inventory,
    rawMaterials,
    transactions,
    setInventory,
    setRawMaterials,
    setTransactions,
    addInventoryItem,
    addRawMaterial,
    addTransaction,
    updateInventoryItem,
    updateRawMaterial,
    deleteInventoryItem,
    deleteRawMaterial,
    deleteTransaction
  }
}

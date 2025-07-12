import React, { useState } from 'react'
import { Package, AlertTriangle, Edit, Trash2, Plus } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/translations'
import { cn } from '@/lib/utils'

export const InventoryPage = ({ inventory, rawMaterials, setInventory, setRawMaterials }) => {
  const { language } = useLanguage()
  const t = useTranslation(language)
  const [inventoryView, setInventoryView] = useState('finished')
  const [searchTerm, setSearchTerm] = useState('')

  const currentItems = inventoryView === 'finished' ? inventory : rawMaterials
  const filteredItems = currentItems.filter(item => {
    const name = language === 'en' ? item.name : item.name_es
    return name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const getStockStatus = (item) => {
    if (item.quantity <= item.minStock * 0.5) return 'critical'
    if (item.quantity <= item.minStock) return 'low'
    return 'good'
  }

  const getStockColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50'
      case 'low': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-green-600 bg-green-50'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.inventory}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Manage your inventory and track stock levels'
              : 'Gestiona tu inventario y rastrea los niveles de stock'
            }
          </p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          {t.addItem}
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setInventoryView('finished')}
              className={cn(
                'py-2 px-1 border-b-2 font-medium text-sm',
                inventoryView === 'finished'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {t.finishedGoods} ({inventory.length})
            </button>
            <button
              onClick={() => setInventoryView('raw')}
              className={cn(
                'py-2 px-1 border-b-2 font-medium text-sm',
                inventoryView === 'raw'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {t.rawMaterials} ({rawMaterials.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder={`${t.search} ${inventoryView === 'finished' ? t.finishedGoods : t.rawMaterials}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const stockStatus = getStockStatus(item)
          const stockColor = getStockColor(stockStatus)
          const itemName = language === 'en' ? item.name : item.name_es

          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{itemName}</CardTitle>
                    <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Stock Level */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">{t.quantity}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{item.quantity}</span>
                      {stockStatus !== 'good' && (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">{t.price}</span>
                    <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                  </div>

                  {/* Min Stock */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">{t.minStock}</span>
                    <span className="text-sm">{item.minStock}</span>
                  </div>

                  {/* Stock Status */}
                  <div className={cn('px-2 py-1 rounded-full text-xs font-medium text-center', stockColor)}>
                    {stockStatus === 'critical' && (language === 'en' ? 'Critical Stock' : 'Stock Crítico')}
                    {stockStatus === 'low' && (language === 'en' ? 'Low Stock' : 'Stock Bajo')}
                    {stockStatus === 'good' && (language === 'en' ? 'Good Stock' : 'Stock Bueno')}
                  </div>

                  {/* Raw Material Extra Info */}
                  {inventoryView === 'raw' && item.supplier && (
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t.supplier}</span>
                        <span>{item.supplier}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-600">{t.lastOrdered}</span>
                        <span>{item.lastOrdered}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {stockStatus !== 'good' && (
                    <Button variant="danger" size="sm" className="w-full mt-3">
                      {t.reorderNow}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'en' ? 'No items found' : 'No se encontraron artículos'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Try adjusting your search or add new items to your inventory.'
              : 'Intenta ajustar tu búsqueda o agregar nuevos artículos a tu inventario.'
            }
          </p>
        </div>
      )}
    </div>
  )
}

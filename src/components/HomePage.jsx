import React from 'react'
import { Package, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/translations'

export const HomePage = ({ inventory, rawMaterials, transactions, setCurrentView }) => {
  const { language } = useLanguage()
  const t = useTranslation(language)

  // Calculate stats
  const totalItems = inventory.length + rawMaterials.length
  const lowStockItems = [...inventory, ...rawMaterials].filter(
    item => item.quantity <= item.minStock
  ).length
  
  const todaySales = transactions
    .filter(t => t.type === 'sale' && t.date === '2024-01-15')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const monthlyProfit = transactions
    .filter(t => t.type === 'sale')
    .reduce((sum, t) => sum + t.amount, 0) - 
    transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const stats = [
    {
      title: t.totalItems,
      value: totalItems,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: t.lowStockAlert,
      value: lowStockItems,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: t.todaySales,
      value: `$${todaySales.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: t.monthlyProfit,
      value: `$${monthlyProfit.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.welcome}
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Manage your business operations with AI-powered insights'
            : 'Gestiona las operaciones de tu negocio con insights impulsados por IA'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Low Stock Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              {t.lowStockAlert}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockItems > 0 ? (
              <div className="space-y-3">
                {[...inventory, ...rawMaterials]
                  .filter(item => item.quantity <= item.minStock)
                  .slice(0, 3)
                  .map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {language === 'en' ? item.name : item.name_es}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} / {item.minStock} {language === 'en' ? 'min' : 'mín'}
                        </p>
                      </div>
                      <Button size="sm" variant="danger">
                        {t.reorderNow}
                      </Button>
                    </div>
                  ))}
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setCurrentView('inventory')}
                >
                  {t.viewAll}
                </Button>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">
                {language === 'en' 
                  ? 'All items are well stocked!' 
                  : '¡Todos los artículos están bien abastecidos!'
                }
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="secondary"
                onClick={() => setCurrentView('inventory')}
              >
                <Package className="h-4 w-4 mr-2" />
                {t.addItem}
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="secondary"
                onClick={() => setCurrentView('finance')}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                {t.addTransaction}
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="secondary"
                onClick={() => setCurrentView('inventory')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {language === 'en' ? 'View AI Insights' : 'Ver Insights de IA'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

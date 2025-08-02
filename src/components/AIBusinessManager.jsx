import React, { useState, useEffect } from 'react'
import { Brain, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/translations'
import { cn } from '@/lib/utils'

export const AIBusinessManager = ({ inventory, rawMaterials, transactions }) => {
  const { language } = useLanguage()
  const t = useTranslation(language)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [insights, setInsights] = useState(null)

  useEffect(() => {
    // Auto-analyze when component mounts or data changes
    analyzeBusinessPerformance()
  }, [inventory, rawMaterials, transactions])

  const analyzeBusinessPerformance = () => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      const analysis = generateBusinessInsights()
      const newRecommendations = generateRecommendations(analysis)
      
      setInsights(analysis)
      setRecommendations(newRecommendations)
      setIsAnalyzing(false)
    }, 2000)
  }

  const generateBusinessInsights = () => {
    const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const totalRawMaterialValue = rawMaterials.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const totalSales = transactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    
    const criticalStockItems = [...inventory, ...rawMaterials].filter(item => item.quantity <= item.minStock)
    const inventoryTurnover = totalSales / totalInventoryValue
    const profitMargin = ((totalSales - totalExpenses) / totalSales) * 100

    return {
      totalInventoryValue,
      totalRawMaterialValue,
      totalSales,
      totalExpenses,
      criticalStockItems,
      inventoryTurnover,
      profitMargin,
      riskScore: (criticalStockItems.length / (inventory.length + rawMaterials.length)) * 100
    }
  }

  const generateRecommendations = (analysis) => {
    const recs = []

    // Stock recommendations
    if (analysis.criticalStockItems.length > 0) {
      recs.push({
        id: 1,
        type: 'reorder',
        priority: 'high',
        title: language === 'en' ? 'Urgent Food Supply Reorder Required' : 'Reorden Urgente de Suministros Alimentarios Requerida',
        description: language === 'en' 
          ? `${analysis.criticalStockItems.length} ingredients/supplies are critically low. Immediate reordering recommended to avoid menu shortages.`
          : `${analysis.criticalStockItems.length} ingredientes/suministros están críticamente bajos. Se recomienda reordenar inmediatamente para evitar falta de menú.`,
        impact: 'high',
        roi: '15-25%',
        icon: AlertCircle,
        color: 'red'
      })
    }

    // Financial recommendations
    if (analysis.profitMargin < 20) {
      recs.push({
        id: 2,
        type: 'financial',
        priority: 'medium',
        title: language === 'en' ? 'Optimize Food Truck Profit Margins' : 'Optimizar Márgenes de Ganancia del Food Truck',
        description: language === 'en'
          ? 'Current profit margin is below food truck industry average. Consider ingredient cost optimization or menu pricing adjustments.'
          : 'El margen de ganancia actual está por debajo del promedio de la industria de food trucks. Considera optimización de costos de ingredientes o ajustes de precios del menú.',
        impact: 'medium',
        roi: '10-20%',
        icon: TrendingUp,
        color: 'yellow'
      })
    }

    // Inventory turnover
    if (analysis.inventoryTurnover < 2) {
      recs.push({
        id: 3,
        type: 'inventory',
        priority: 'medium',
        title: language === 'en' ? 'Improve Menu Item Turnover' : 'Mejorar Rotación de Artículos del Menú',
        description: language === 'en'
          ? 'Some menu items are moving slowly. Consider promoting popular dishes, adjusting portion sizes, or updating the menu for seasonal appeal.'
          : 'Algunos artículos del menú se mueven lentamente. Considera promover platos populares, ajustar tamaños de porciones, o actualizar el menú para atractivo estacional.',
        impact: 'medium',
        roi: '8-15%',
        icon: Clock,
        color: 'blue'
      })
    }

    return recs
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (isAnalyzing) {
    return (
      <Card className="mb-6">
        <CardContent className="p-8 text-center">
          <Brain className="h-12 w-12 text-primary-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t.analyzing}</h3>
          <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto">
            <div className="h-2 bg-primary-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* AI Manager Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <CardTitle className="text-xl">{t.aiManager}</CardTitle>
              <p className="text-gray-600">{t.aiSubtitle}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Business Insights */}
      {insights && (
        <Card>
          <CardHeader>
            <CardTitle>{t.insights}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {insights.inventoryTurnover.toFixed(1)}x
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Inventory Turnover' : 'Rotación de Inventario'}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {insights.profitMargin.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Profit Margin' : 'Margen de Ganancia'}
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {insights.riskScore.toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Risk Score' : 'Puntuación de Riesgo'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>{t.recommendations}</CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map(rec => {
                const Icon = rec.icon
                const priorityColor = getPriorityColor(rec.priority)
                
                return (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-6 w-6 text-${rec.color}-600`} />
                        <div>
                          <h4 className="font-medium text-gray-900">{rec.title}</h4>
                          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', priorityColor)}>
                            {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} {t.priority}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="primary">
                        {t.implementRec}
                      </Button>
                    </div>
                    <p className="text-gray-700 mb-3">{rec.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>
                        <strong>{t.impact}:</strong> {rec.impact}
                      </span>
                      <span>
                        <strong>{t.roi}:</strong> {rec.roi}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'Everything looks great!' : '¡Todo se ve genial!'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Your business is running smoothly. Keep up the good work!'
                  : '¡Tu negocio está funcionando sin problemas. ¡Sigue así!'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

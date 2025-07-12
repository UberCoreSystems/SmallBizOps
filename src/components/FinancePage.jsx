import React, { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Plus, Calendar } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/translations'
import { cn } from '@/lib/utils'

export const FinancePage = ({ transactions, setTransactions }) => {
  const { language } = useLanguage()
  const t = useTranslation(language)
  const [filter, setFilter] = useState('all')

  // Calculate financial metrics
  const totalSales = transactions
    .filter(t => t.type === 'sale')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const profit = totalSales - totalExpenses

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true
    return transaction.type === filter
  })

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`

  const getTransactionIcon = (type) => {
    return type === 'sale' ? TrendingUp : TrendingDown
  }

  const getTransactionColor = (type) => {
    return type === 'sale' 
      ? 'text-green-600 bg-green-50' 
      : 'text-red-600 bg-red-50'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.finance}
          </h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Track your cash flow, expenses, and profitability'
              : 'Rastrea tu flujo de caja, gastos y rentabilidad'
            }
          </p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          {t.addTransaction}
        </Button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.sales}</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-red-50 p-3 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.expenses}</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={cn('p-3 rounded-lg', profit >= 0 ? 'bg-blue-50' : 'bg-red-50')}>
                <DollarSign className={cn('h-6 w-6', profit >= 0 ? 'text-blue-600' : 'text-red-600')} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.profit}</p>
                <p className={cn('text-2xl font-bold', profit >= 0 ? 'text-gray-900' : 'text-red-600')}>
                  {formatCurrency(profit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Recent Transactions' : 'Transacciones Recientes'}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                {language === 'en' ? 'All' : 'Todas'}
              </Button>
              <Button
                variant={filter === 'sale' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('sale')}
              >
                {t.sales}
              </Button>
              <Button
                variant={filter === 'expense' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter('expense')}
              >
                {t.expenses}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map(transaction => {
              const Icon = getTransactionIcon(transaction.type)
              const colorClasses = getTransactionColor(transaction.type)
              const description = language === 'en' 
                ? transaction.description 
                : transaction.description_es

              return (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={cn('p-2 rounded-lg', colorClasses)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {transaction.type === 'sale' ? t.sales : t.expenses}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      'text-lg font-bold',
                      transaction.type === 'sale' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {transaction.type === 'sale' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'en' ? 'No transactions found' : 'No se encontraron transacciones'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Start by adding your first transaction.'
                  : 'Comienza agregando tu primera transacción.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import React from 'react'
import { Home, Package, DollarSign, Settings, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/translations'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export const Navigation = ({ currentView, setCurrentView }) => {
  const { language, toggleLanguage } = useLanguage()
  const t = useTranslation(language)

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'inventory', label: t.inventory, icon: Package },
    { id: 'finance', label: t.finance, icon: DollarSign },
    { id: 'settings', label: t.settings, icon: Settings },
  ]

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Package className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              {t.appTitle}
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'primary' : 'ghost'}
                  onClick={() => setCurrentView(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">
                {language === 'en' ? 'ES' : 'EN'}
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    'flex flex-col items-center p-2 text-xs',
                    currentView === item.id
                      ? 'text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

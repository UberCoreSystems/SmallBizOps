import React from 'react'
import { Settings as SettingsIcon, Globe, Bell, Shield, Download, Upload } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/translations'

export const SettingsPage = () => {
  const { language, toggleLanguage } = useLanguage()
  const t = useTranslation(language)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t.settings}
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Manage your app preferences and data settings'
            : 'Gestiona las preferencias de tu app y configuraciones de datos'
          }
        </p>
      </div>

      <div className="space-y-6">
        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Language & Region' : 'Idioma y Región'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {language === 'en' ? 'App Language' : 'Idioma de la App'}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'Choose your preferred language' : 'Elige tu idioma preferido'}
                </p>
              </div>
              <Button variant="secondary" onClick={toggleLanguage}>
                {language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Current language: English' : 'Idioma actual: Español'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Notifications' : 'Notificaciones'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'en' ? 'Low Stock Alerts' : 'Alertas de Stock Bajo'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Get notified when items are running low'
                      : 'Recibe notificaciones cuando los artículos se agoten'
                    }
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  {language === 'en' ? 'Enabled' : 'Habilitado'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'en' ? 'Daily Reports' : 'Reportes Diarios'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Receive daily business summaries'
                      : 'Recibe resúmenes diarios del negocio'
                    }
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  {language === 'en' ? 'Disabled' : 'Deshabilitado'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Data Management' : 'Gestión de Datos'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="secondary" className="flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  {t.export} {language === 'en' ? 'Data' : 'Datos'}
                </Button>
                <Button variant="secondary" className="flex items-center justify-center">
                  <Upload className="h-4 w-4 mr-2" />
                  {t.import} {language === 'en' ? 'Data' : 'Datos'}
                </Button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  {language === 'en' 
                    ? 'Your data is stored locally on your device for privacy and offline access.'
                    : 'Tus datos se almacenan localmente en tu dispositivo para privacidad y acceso sin conexión.'
                  }
                </p>
                <Button variant="danger" size="sm">
                  {language === 'en' ? 'Clear All Data' : 'Borrar Todos los Datos'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" />
              {language === 'en' ? 'About Small Biz Ops' : 'Acerca de Small Biz Ops'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'en' ? 'Version' : 'Versión'}</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'en' ? 'Last Updated' : 'Última Actualización'}</span>
                <span className="font-medium">July 12, 2025</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'AI-powered business management for small entrepreneurs. Built with React, Vite, and Tailwind CSS.'
                    : 'Gestión de negocios impulsada por IA para pequeños empresarios. Construido con React, Vite y Tailwind CSS.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

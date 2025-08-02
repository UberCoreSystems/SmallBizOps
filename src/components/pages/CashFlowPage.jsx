import React from 'react';
import CashFlowRadar from '../CashFlowRadar';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../lib/translations';

const CashFlowPage = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t.cashFlow || 'Cash Flow Analysis'}
          </h1>
          <p className="mt-2 text-gray-600">
            {t.cashFlowDescription || 'Monitor your business financial performance with detailed income and expense tracking.'}
          </p>
        </div>
        
        <CashFlowRadar />
      </div>
    </div>
  );
};

export default CashFlowPage;



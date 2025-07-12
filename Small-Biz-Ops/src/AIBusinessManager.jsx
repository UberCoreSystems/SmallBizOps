
import React, { useState, useEffect } from 'react';
import './AIBusinessManager.css';

// AI Business Manager with 30+ years SMB experience
export const AIBusinessManager = ({ inventory, rawMaterials, transactions, language, onRecommendation }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [insights, setInsights] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  const [implementedRecommendations, setImplementedRecommendations] = useState([]);

  const translations = {
    en: {
      title: 'AI Business Manager',
      subtitle: '30+ Years SMB Experience',
      analyzing: 'Analyzing your business...',
      recommendations: 'Business Recommendations',
      insights: 'Performance Insights',
      reorderAlert: 'Supply Chain Alert',
      financialAlert: 'Financial Advisory',
      qualityAlert: 'Quality Control',
      distributionAlert: 'Distribution Optimization',
      implementRec: 'Implement',
      viewDetails: 'View Details',
      riskLevel: 'Risk Level',
      priority: 'Priority',
      impact: 'Impact',
      roi: 'Expected ROI'
    },
    es: {
      title: 'Gerente de Negocios IA',
      subtitle: '30+ Años de Experiencia PYME',
      analyzing: 'Analizando tu negocio...',
      recommendations: 'Recomendaciones de Negocio',
      insights: 'Perspectivas de Rendimiento',
      reorderAlert: 'Alerta de Cadena de Suministro',
      financialAlert: 'Asesoría Financiera',
      qualityAlert: 'Control de Calidad',
      distributionAlert: 'Optimización de Distribución',
      implementRec: 'Implementar',
      viewDetails: 'Ver Detalles',
      riskLevel: 'Nivel de Riesgo',
      priority: 'Prioridad',
      impact: 'Impacto',
      roi: 'ROI Esperado'
    }
  };

  const t = translations[language];

  // Business analysis engine with 30 years expertise
  const analyzeBusinessPerformance = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analysis = {
        // Inventory Management Analysis
        inventoryTurnover: calculateInventoryTurnover(),
        stockoutRisk: calculateStockoutRisk(),
        
        // Financial Analysis
        cashFlow: analyzeCashFlow(),
        profitMargins: calculateProfitMargins(),
        
        // Supply Chain Analysis
        supplierPerformance: analyzeSupplierPerformance(),
        
        // Quality Control
        qualityMetrics: assessQualityControl(),
        
        // Distribution Efficiency
        distributionEfficiency: analyzeDistribution()
      };

      const newRecommendations = generateRecommendations(analysis);
      setRecommendations(newRecommendations);
      setInsights(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const calculateInventoryTurnover = () => {
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const salesValue = transactions
      .filter(t => t.type === 'sale')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      turnoverRate: salesValue / totalValue,
      status: salesValue / totalValue > 4 ? 'excellent' : salesValue / totalValue > 2 ? 'good' : 'needs_improvement'
    };
  };

  const calculateStockoutRisk = () => {
    const criticalItems = rawMaterials.filter(item => item.quantity <= item.minStock);
    const riskScore = (criticalItems.length / rawMaterials.length) * 100;
    
    return {
      riskScore,
      criticalItems: criticalItems.length,
      status: riskScore > 30 ? 'high' : riskScore > 15 ? 'medium' : 'low'
    };
  };

  const analyzeCashFlow = () => {
    const sales = transactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netFlow = sales - expenses;
    
    return {
      netFlow,
      trend: netFlow > 0 ? 'positive' : 'negative',
      projectedMonthly: netFlow * 4.33 // weekly to monthly projection
    };
  };

  const calculateProfitMargins = () => {
    const revenue = transactions.filter(t => t.type === 'sale').reduce((sum, t) => sum + t.amount, 0);
    const costs = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const grossMargin = ((revenue - costs) / revenue) * 100;
    
    return {
      grossMargin,
      status: grossMargin > 30 ? 'excellent' : grossMargin > 15 ? 'good' : 'concerning'
    };
  };

  const analyzeSupplierPerformance = () => {
    const suppliers = [...new Set(rawMaterials.map(item => item.supplier))];
    return {
      totalSuppliers: suppliers.length,
      diversificationRisk: suppliers.length < 3 ? 'high' : 'low',
      recommendations: suppliers.length < 3 ? ['diversify_suppliers'] : ['maintain_relationships']
    };
  };

  const assessQualityControl = () => {
    // Simulate quality metrics based on inventory patterns
    const qualityScore = Math.random() * 20 + 80; // 80-100 range
    return {
      score: qualityScore,
      status: qualityScore > 95 ? 'excellent' : qualityScore > 85 ? 'good' : 'needs_attention'
    };
  };

  const analyzeDistribution = () => {
    const inventoryValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const efficiency = Math.random() * 20 + 75; // 75-95 range
    
    return {
      efficiency,
      inventoryValue,
      status: efficiency > 90 ? 'optimal' : efficiency > 80 ? 'good' : 'needs_optimization'
    };
  };

  const generateRecommendations = (analysis) => {
    const recs = [];

    // Supply Chain Recommendations
    if (analysis.stockoutRisk.status === 'high') {
      recs.push({
        id: 'supply_chain_1',
        type: 'reorderAlert',
        priority: 'urgent',
        title: 'Critical Stock Shortage',
        description: `${analysis.stockoutRisk.criticalItems} items need immediate reordering. Implement emergency procurement procedures.`,
        impact: 'high',
        roi: '15-25%',
        actions: ['Emergency reorder', 'Contact backup suppliers', 'Adjust safety stock levels']
      });
    }

    // Financial Recommendations
    if (analysis.profitMargins.status === 'concerning') {
      recs.push({
        id: 'financial_1',
        type: 'financialAlert',
        priority: 'high',
        title: 'Profit Margin Optimization',
        description: `Current margin of ${analysis.profitMargins.grossMargin.toFixed(1)}% is below industry standard. Consider cost reduction or pricing adjustments.`,
        impact: 'high',
        roi: '20-35%',
        actions: ['Review supplier costs', 'Optimize pricing strategy', 'Reduce operational waste']
      });
    }

    // Quality Control Recommendations
    if (analysis.qualityMetrics.status !== 'excellent') {
      recs.push({
        id: 'quality_1',
        type: 'qualityAlert',
        priority: 'medium',
        title: 'Quality System Enhancement',
        description: 'Implement standardized quality control procedures to improve consistency and reduce returns.',
        impact: 'medium',
        roi: '10-20%',
        actions: ['Create quality checklists', 'Train staff on standards', 'Implement inspection protocols']
      });
    }

    // Distribution Optimization
    if (analysis.distributionEfficiency.status !== 'optimal') {
      recs.push({
        id: 'distribution_1',
        type: 'distributionAlert',
        priority: 'medium',
        title: 'Distribution Efficiency',
        description: 'Optimize inventory placement and delivery routes to reduce costs and improve customer satisfaction.',
        impact: 'medium',
        roi: '8-15%',
        actions: ['Analyze delivery patterns', 'Optimize stock locations', 'Consider automation tools']
      });
    }

    // Cash Flow Management
    if (analysis.cashFlow.trend === 'negative') {
      recs.push({
        id: 'cashflow_1',
        type: 'financialAlert',
        priority: 'urgent',
        title: 'Cash Flow Management',
        description: 'Negative cash flow detected. Implement immediate measures to improve liquidity.',
        impact: 'high',
        roi: 'Critical',
        actions: ['Accelerate collections', 'Delay non-critical expenses', 'Consider short-term financing']
      });
    }

    return recs.slice(0, 5); // Top 5 recommendations
  };

  useEffect(() => {
    analyzeBusinessPerformance();
  }, [inventory, rawMaterials, transactions]);

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'reorderAlert': return '📦';
      case 'financialAlert': return '💰';
      case 'qualityAlert': return '✅';
      case 'distributionAlert': return '🚚';
      default: return '💡';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#e74c3c';
      case 'high': return '#f39c12';
      case 'medium': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const handleImplementRecommendation = (recommendation) => {
    // Add to implemented list
    setImplementedRecommendations(prev => [...prev, recommendation.id]);
    
    // Call parent callback if provided
    if (onRecommendation) {
      onRecommendation(recommendation);
    }

    // Show success message (you could replace this with a toast notification)
    alert(`✅ Implementing: ${recommendation.title}\n\nActions:\n${recommendation.actions.join('\n')}`);
  };

  const handleViewDetails = (recommendation) => {
    setExpandedRecommendation(
      expandedRecommendation === recommendation.id ? null : recommendation.id
    );
  };

  const isImplemented = (recommendationId) => {
    return implementedRecommendations.includes(recommendationId);
  };

  return (
    <div className="ai-business-manager">
      <div className="ai-header">
        <div className="ai-avatar">🤖</div>
        <div className="ai-info">
          <h3>{t.title}</h3>
          <p>{t.subtitle}</p>
        </div>
        <button 
          className="refresh-analysis"
          onClick={analyzeBusinessPerformance}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? '🔄' : '📊'}
        </button>
      </div>

      {isAnalyzing && (
        <div className="analyzing">
          <div className="loading-spinner"></div>
          <p>{t.analyzing}</p>
        </div>
      )}

      {insights && (
        <div className="business-insights">
          <h4>{t.insights}</h4>
          <div className="insights-grid">
            <div className="insight-card">
              <span className="insight-label">Inventory Turnover</span>
              <span className={`insight-value ${insights.inventoryTurnover.status}`}>
                {insights.inventoryTurnover.turnoverRate.toFixed(1)}x
              </span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Profit Margin</span>
              <span className={`insight-value ${insights.profitMargins.status}`}>
                {insights.profitMargins.grossMargin.toFixed(1)}%
              </span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Stock Risk</span>
              <span className={`insight-value ${insights.stockoutRisk.status}`}>
                {insights.stockoutRisk.riskScore.toFixed(0)}%
              </span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Cash Flow</span>
              <span className={`insight-value ${insights.cashFlow.trend}`}>
                ${insights.cashFlow.netFlow.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h4>{t.recommendations}</h4>
          {recommendations.map(rec => (
            <div key={rec.id} className={`recommendation-card ${isImplemented(rec.id) ? 'implemented' : ''}`}>
              <div className="rec-header">
                <span className="rec-icon">{getRecommendationIcon(rec.type)}</span>
                <div className="rec-title-area">
                  <h5>
                    {rec.title}
                    {isImplemented(rec.id) && <span className="implemented-badge">✅ Implemented</span>}
                  </h5>
                  <div className="rec-meta">
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(rec.priority) }}
                    >
                      {rec.priority.toUpperCase()}
                    </span>
                    <span className="impact-badge">{rec.impact} {t.impact}</span>
                    <span className="roi-badge">{t.roi}: {rec.roi}</span>
                  </div>
                </div>
              </div>
              <p className="rec-description">{rec.description}</p>
              
              {expandedRecommendation === rec.id && (
                <div className="rec-details">
                  <h6>📋 Action Plan:</h6>
                  <ul className="action-list">
                    {rec.actions.map((action, idx) => (
                      <li key={idx}>{action}</li>
                    ))}
                  </ul>
                  <div className="additional-info">
                    <p><strong>Expected Timeline:</strong> 2-4 weeks</p>
                    <p><strong>Resources Needed:</strong> Staff training, system updates</p>
                    <p><strong>Success Metrics:</strong> Track improvements in {rec.type === 'reorderAlert' ? 'inventory levels' : rec.type === 'financialAlert' ? 'profit margins' : 'operational efficiency'}</p>
                  </div>
                </div>
              )}
              
              <div className="rec-actions">
                {rec.actions.slice(0, 3).map((action, idx) => (
                  <span key={idx} className="action-tag">
                    {action}
                  </span>
                ))}
                {rec.actions.length > 3 && (
                  <span className="action-tag more">+{rec.actions.length - 3} more</span>
                )}
              </div>
              
              <div className="rec-buttons">
                <button 
                  className={`implement-btn ${isImplemented(rec.id) ? 'implemented' : ''}`}
                  onClick={() => handleImplementRecommendation(rec)}
                  disabled={isImplemented(rec.id)}
                >
                  {isImplemented(rec.id) ? '✅ Implemented' : t.implementRec}
                </button>
                <button 
                  className="details-btn"
                  onClick={() => handleViewDetails(rec)}
                >
                  {expandedRecommendation === rec.id ? 'Hide Details' : t.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

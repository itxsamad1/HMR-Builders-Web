'use client'

import React from 'react';
import { useAuth } from './AuthProvider';
import { AlertTriangle, X } from 'lucide-react';

export default function DemoModeIndicator() {
  const { isDemoMode, demoMessage } = useAuth();

  if (!isDemoMode) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-yellow-500/90 backdrop-blur-sm border border-yellow-400 rounded-lg px-4 py-2 text-sm font-medium text-yellow-900 shadow-lg">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4" />
        <span>{demoMessage}</span>
      </div>
    </div>
  );
}

'use client'
import React from 'react'

const Card = ({ name, icon: Icon, value }) => {
  return (
    <div className="rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 w-full group overflow-hidden relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex items-center justify-between gap-2 relative z-10">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {name}
          </p>
          <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white">
            {value || 'N/A'}
          </p>
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
            <Icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

export default Card
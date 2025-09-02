'use client'
import Card from '@/components/Card'
import ProductCard from '@/components/ProductCard'
import { DollarSign, ShoppingCart, Users, CreditCard, TrendingUp } from 'lucide-react'
import React from 'react'

const OverviewPage = () => {
  const cardData = [
    { name: "total sales", icon: DollarSign, value: "182.78$" },
    { name: "orders", icon: ShoppingCart, value: "324" },
    { name: "customers", icon: Users, value: "1,234" },
    { name: "revenue", icon: CreditCard, value: "12,345$" },
    { name: "growth", icon: TrendingUp, value: "+12.5%" },
  ]

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='py-2 px-2 sm:px-6 lg:px-8'>
        {/* Small Cards */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-2'>
          {cardData.map((card, index) => (
            <Card 
              key={index}
              name={card.name}
              icon={card.icon}
              value={card.value}
            />
          ))}
        </div>
        
        {/* ProductCard */}
        <div className='w-full'>
          <ProductCard />
        </div>
      </main>
    </div>
  )
}

export default OverviewPage
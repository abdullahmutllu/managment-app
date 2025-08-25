'use client'

import {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../public/logo.png'

const ICONS = {
  house: House,
  dollarSign: DollarSign,
  settings: Settings,
  shoppingBag: ShoppingBag,
  shoppingCart: ShoppingCart,
  mail: Mail,
  users: Users,
  bell: Bell,
  info: Info,
}

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = useState([])
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Responsive kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((data) => setSidebarItems(data.sidebarItems))
      .catch((error) => console.error('Error loading sidebar items:', error))
  }, [])

  return (
    <div
      className={`relative z-10 flex-shrink-0 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } transition-all duration-500 ease-in-out`}
    >
      <div className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
        {/* Logo & Toggle */}
        <div
          className={`flex ${
            isSidebarOpen
              ? 'items-center justify-between'
              : 'flex-col items-center'
          } mb-6 gap-2`}
        >
          <div
            className={`flex ${
              isSidebarOpen ? 'items-center' : 'flex-col items-center'
            }`}
          >
            <Image
              src={Logo}
              alt="Company Logo"
              width={32}
              height={32}
              className="rounded-md transition-transform duration-500"
            />
            {isSidebarOpen && (
              <span className="ml-3 font-semibold text-lg dark:text-white transition-opacity duration-500">
                MasterPos
              </span>
            )}
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer ${
              !isSidebarOpen && 'mt-2'
            }`}
          >
            <Menu
              size={24}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
            />
          </button>
        </div>

        {/* Arama Kutusu */}
        <div
          className={`mb-4 transition-all duration-900 ${
            isSidebarOpen ? 'opacity-100 delay-600' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors duration-300"
            />
            <input
              type="text"
              placeholder="Ara..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-500 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Menü Öğeleri */}
        <nav className="flex-grow space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon]
            const isActive = pathname === item.href

            return (
              <Link key={item.name} href={item.href} passHref>
                <div
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 group cursor-pointer ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <div
                    className={`p-2 rounded-md flex items-center justify-center transition-colors duration-300 ${
                      isActive
                        ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
                    }`}
                  >
                    {IconComponent && <IconComponent size={18} />}
                  </div>

                  {isSidebarOpen && (
                    <span className="ml-3 whitespace-nowrap text-sm font-medium transition-opacity duration-500">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
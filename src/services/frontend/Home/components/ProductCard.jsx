'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, deleteProduct } from '../store/productsSlice'
import { FiPlus, FiSearch, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { DeleteProductModal } from './modals/DeleteProductModal'
import { ProductFormModal } from './modals/ProductFormModal'

const ProductCard = () => {
  const dispatch = useDispatch()
  const { items: products, loading, error, pagination } = useSelector((state) => state.products)
  const [searchTerm, setSearchTerm] = useState('')
  const [modalState, setModalState] = useState({
    showAddModal: false,
    showDeleteModal: false,
    currentProduct: null,
    productToDelete: null
  })

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  )

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      dispatch(fetchProducts(newPage))
    }
  }

  const getStatusBadge = (status) => {
    const statusText = typeof status === 'boolean' 
      ? (status ? 'Aktif' : 'Pasif') 
      : (status || 'Bilinmiyor')
    
    const colorClass = status === true || status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs ${colorClass}`}>
        {statusText}
      </span>
    )
  }

  useEffect(() => {
    dispatch(fetchProducts(1))
  }, [dispatch])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      {/* Header and Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Ürün Listesi</h2>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {loading ? '...' : `${pagination.totalItems.toLocaleString()} ürün`}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
            <input
              type="text"
              placeholder="Ürün ara..."
              className="pl-8 pr-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setModalState({
              ...modalState,
              showAddModal: true,
              currentProduct: null
            })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md flex items-center justify-center gap-1 whitespace-nowrap text-sm"
          >
            <FiPlus size={14} /> Ürün Ekle
          </button>
        </div>
      </div>


      <div className="overflow-x-auto overflow-y-auto max-h-[350px] mb-4 rounded-md border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">

          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Ürün</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Barkod</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fiyat</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Stok</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Durum</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">İşlemler</th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Yükleniyor...</p>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-xs text-red-500 dark:text-red-400">
                  Hata: {error}
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
                  <div className="text-gray-400 dark:text-gray-500 text-2xl mb-1">📦</div>
                  <p>{searchTerm ? 'Aramanızla eşleşen ürün bulunamadı' : 'Henüz ürün bulunmuyor'}</p>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {/* Product Cells */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        className="h-8 w-8 rounded-full object-cover flex-shrink-0" 
                        src={product.imageUrl || '/placeholder-product.png'} 
                        alt={product.name}
                        onError={(e) => { e.target.src = '/placeholder-product.png' }}
                      />
                      <div className="ml-3">
                        <div className="text-xs font-medium text-gray-900 dark:text-white">{product.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                    {product.barcode}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                    {product.stock || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setModalState({
                          ...modalState,
                          showAddModal: true,
                          currentProduct: product
                        })}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-0.5"
                        title="Düzenle"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => setModalState({
                          ...modalState,
                          showDeleteModal: true,
                          productToDelete: product
                        })}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-0.5"
                        title="Sil"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Sayfa {pagination.currentPage} / {pagination.totalPages} • 
            Toplam {pagination.totalItems.toLocaleString()} ürün
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-1.5 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiChevronLeft size={14} className="text-gray-700 dark:text-gray-300" />
            </button>
            
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum
              if (pagination.totalPages <= 5) {
                pageNum = i + 1
              } else if (pagination.currentPage <= 3) {
                pageNum = i + 1
              } else if (pagination.currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i
              } else {
                pageNum = pagination.currentPage - 2 + i
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-md text-xs font-medium transition-colors ${
                    pagination.currentPage === pageNum 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-1.5 rounded-md border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiChevronRight size={14} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
      <DeleteProductModal
        isOpen={modalState.showDeleteModal}
        onClose={() => setModalState({...modalState, showDeleteModal: false})}
        product={modalState.productToDelete}
        onConfirm={() => {
          dispatch(deleteProduct(modalState.productToDelete.id))
          setModalState({...modalState, showDeleteModal: false})
        }}
      />
      <ProductFormModal
        isOpen={modalState.showAddModal}
        onClose={() => setModalState({...modalState, showAddModal: false})}
        product={modalState.currentProduct}
        onSubmit={(formData) => {
          console.log('Form submitted:', formData)
        }}
      />
    </div>
  )
}

export default ProductCard
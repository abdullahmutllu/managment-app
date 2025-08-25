'use client'
import { FiTrash2 } from 'react-icons/fi'

export const DeleteProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  onConfirm 
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4">
          <div className="flex items-center justify-center w-10 h-10 mx-auto bg-red-100 dark:bg-red-900 rounded-full mb-3">
            <FiTrash2 className="w-5 h-5 text-red-600 dark:text-red-300" />
          </div>
          
          <h3 className="text-md font-semibold text-gray-900 dark:text-white text-center mb-1">
            Ürünü Sil
          </h3>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
            "<strong className="text-gray-900 dark:text-white">{product?.name}</strong>" ürünü silmek istediğinize emin misiniz? 
            Bu işlem geri alınamaz.
          </p>
          
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
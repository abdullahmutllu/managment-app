using ProductApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductApp.Application.Interfaces.Repository
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        // Product-specific methods
        Task<List<Product>> GetProductsByUserIdAsync(Guid userId);
        Task<List<Product>> GetProductsByPriceRangeAsync(decimal minPrice, decimal maxPrice);
    }
}

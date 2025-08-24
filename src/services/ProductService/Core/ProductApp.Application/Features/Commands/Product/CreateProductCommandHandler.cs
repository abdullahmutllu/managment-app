using managment_app.Shared;
using MediatR;
using ProductApp.Application.DTOs;
using ProductApp.Application.Interfaces.Repository;
using ProductEntity = ProductApp.Domain.Entities.Product;

namespace ProductApp.Application.Features.Commands.Product
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand,ServiceResult<ProductDto>>
    {
        private readonly IProductRepository _productRepository;

        public CreateProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ServiceResult<ProductDto>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = new ProductEntity
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                UserId = request.UserId,
                CreatedDate = DateTime.UtcNow
            };

            await _productRepository.AddAsync(product);

            
            return ServiceResult<ProductDto>.SuccessAsCreated(new ProductDto
            {

                Name = product.Name,
                Description = product.Description,
                Price = product.Price,

            },"test");
        }
    }
}

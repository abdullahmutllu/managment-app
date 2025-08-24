using managment_app.Shared;
using MediatR;
using ProductApp.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductApp.Application.Features.Commands.Product
{
    public class CreateProductCommand : IRequestByServiceResult<ProductDto>
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public decimal Price { get; set; }
        public Guid UserId { get; set; }
    }
}

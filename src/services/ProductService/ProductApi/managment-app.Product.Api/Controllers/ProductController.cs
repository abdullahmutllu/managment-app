using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApp.Application.Features.Commands.Product;
using ProductApp.Domain.Entities;
using ProductApp.Persistence.Context;

namespace managment_app.Product.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly AppDbContext _context;

        public ProductController(IMediator mediator, AppDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateProductCommand command)
        {
            var result = await _mediator.Send(command);

            // Fail durumunda ProblemDetails dönelim
            if (result.IsFail)
                return StatusCode((int)result.Status, result.Fail);

            // Success durumunda generic ServiceResult dön
            return StatusCode((int)result.Status, result);
        }
    }
}

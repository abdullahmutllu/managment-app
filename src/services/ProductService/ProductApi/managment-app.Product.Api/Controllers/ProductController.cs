using managment_app.Shared.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductApp.Application.Features.Commands.Product;
using ProductApp.Persistence.Context;

namespace managment_app.Product.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Password")]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly AppDbContext _context;
        private readonly IIdentityService identityService;
        private readonly IHttpContextAccessor httpContextAccessor;

        public ProductController(IMediator mediator, AppDbContext context,IIdentityService identityService,IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _context = context;
            this.identityService = identityService;
            this.httpContextAccessor = httpContextAccessor;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateProductCommand command)
        {
            var claims = httpContextAccessor.HttpContext.User.Claims;
            var result = await _mediator.Send(command);
            
            // Fail durumunda ProblemDetails dönelim
            if (result.IsFail)
                return StatusCode((int)result.Status, result.Fail);

            // Success durumunda generic ServiceResult dön
            return StatusCode((int)result.Status, result);
        }
    }
}

using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace managment_app.Shared.Services
{
    public class IdentityService(IHttpContextAccessor httpContextAccessor) : IIdentityService
    {
        public Guid UserId
        {
            get
            {

                if (!httpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated)
                {

                    throw new UnauthorizedAccessException("User is not authenticated.");
                }

                return Guid.Parse(
                    httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(c =>
                        c.Type == ClaimTypes.NameIdentifier)!.Value!);
            }
        }

        public string UserName
        {
            get
            {

                if (!httpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated)
                {

                    throw new UnauthorizedAccessException("User is not authenticated.");
                }

                return httpContextAccessor.HttpContext!.User.Identity!.Name!;



            }
        }

        public List<string> Roles
        {
            get
            {
                if (!httpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated)
                {

                    throw new UnauthorizedAccessException("User is not authenticated.");
                }


                return httpContextAccessor.HttpContext!.User.Claims.Where(x => x.Type == ClaimTypes.Role)
                    .Select(x => x.Value!)
                    .ToList();

            }
        }
    }
}

using managment_app.Shared.Extensions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ProductApp.Application
{
   public static class ServiceRegistration
    {
        public static void AddApplicationService(this IServiceCollection services)
        {

         
          services.AddCommonService(typeof(ApplicationAssembly));


        }
    }
}

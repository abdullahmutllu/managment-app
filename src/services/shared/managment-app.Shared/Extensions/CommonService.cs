using managment_app.Shared.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace managment_app.Shared.Extensions
{
    public static class CommonService
    {
        public static IServiceCollection AddCommonService(this IServiceCollection services,Type assembly)
        {
            services.AddHttpContextAccessor();
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining(assembly));
            return services;
        }
    }
}

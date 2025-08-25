using managment_app.Shared.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection; 
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace managment_app.Shared.Extensions
{
    //sign , aud,ıssuer ,Token lifetime
    public static class AuthenticationExtensions
    {
        public static IServiceCollection AddAuthenticationAndAuthorizationService(this IServiceCollection services,IConfiguration configuration)
        {
          var keyloackOption =   configuration.GetSection(nameof(KeyloackOption)).Get<KeyloackOption>();
            services.AddAuthentication().AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,options =>
            {
                options.Authority = keyloackOption.Address;
                options.Audience = keyloackOption.Audience;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidateIssuer = true,
                    RoleClaimType = "roles",
                    NameClaimType = "preferred_username"
                };
            }).AddJwtBearer("ClientCredentialSchema", options =>
            {
                options.Authority = keyloackOption.Address;
                options.Audience = keyloackOption.Audience;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidateIssuer = true,
                };
            }); ;
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ClientCredential", policy =>
                {
                    policy.AuthenticationSchemes.Add("ClientCredentialSchema");
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("client_id");
                });
                options.AddPolicy("Password", policy =>
                {
                    policy.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim(ClaimTypes.Email); // normalde email olmalı ama .net claim typeından kaynaklı
                });
            });
            return services;
        }
    }
}

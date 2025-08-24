using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProductApp.Application.Interfaces.Repository;
using ProductApp.Domain.MongoOptions;
using ProductApp.Persistence.Context;
using ProductApp.Persistence.Repositories;


namespace ProductApp.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceService(this IServiceCollection services)
        {
           services.AddSingleton<IMongoClient, MongoClient>(sp =>
            {
                var options = sp.GetRequiredService<IOptions<MongoOption>>().Value;
                return new MongoClient(options.ConnectionString);
            });
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped(sp =>
            {
                var mongoClient = sp.GetRequiredService<IMongoClient>();
                var options = sp.GetRequiredService<IOptions<MongoOption>>().Value;
                var database = mongoClient.GetDatabase(options.DatabaseName);
                return AppDbContext.Create(database);
            });
            services.AddOptions<MongoOption>().BindConfiguration(nameof(MongoOption)).ValidateDataAnnotations().ValidateOnStart();
            
        }
    }
}

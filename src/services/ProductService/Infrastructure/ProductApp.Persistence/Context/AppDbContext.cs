using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using ProductApp.Domain.Entities;
using System.Reflection;

namespace ProductApp.Persistence.Context
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }


        public static AppDbContext Create(IMongoDatabase mongoDatabase)
        {
            var dbContextOptionsBuilder =
                new DbContextOptionsBuilder<AppDbContext>()
                .UseMongoDB(mongoDatabase.Client, mongoDatabase.DatabaseNamespace.DatabaseName);
            return new AppDbContext(dbContextOptionsBuilder.Options);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}

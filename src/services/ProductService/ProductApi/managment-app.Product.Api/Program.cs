using managment_app.Shared.Extensions;
using ProductApp.Application;
using ProductApp.Persistence;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddApplicationService();
builder.Services.AddPersistenceService();
builder.Services.AddAuthenticationAndAuthorizationService(builder.Configuration);
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers(); // veya .RequireAuthorization();

app.Run();

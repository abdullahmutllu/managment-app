using managment_app.Shared.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddReverseProxy().LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));
builder.Services.AddAuthenticationAndAuthorizationService(builder.Configuration);
var app = builder.Build();
app.MapReverseProxy();
app.MapGet("/", () => "Hello World!");
app.UseAuthentication();
app.UseAuthorization();
app.Run();

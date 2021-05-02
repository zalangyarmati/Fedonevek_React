using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(Fedonevek_React.Areas.Identity.IdentityHostingStartup))]
namespace Fedonevek_React.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) =>
            {
            });
        }
    }
}
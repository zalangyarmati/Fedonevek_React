using Fedonevek_React.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fedonevek_React.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {

        public DbSet<DbCard> Cards { get; set; }
        public DbSet<DbPlayer> Players { get; set; }
        public DbSet<DbRoom> Rooms { get; set; }
        public DbSet<DbWord> Words { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
    }
}

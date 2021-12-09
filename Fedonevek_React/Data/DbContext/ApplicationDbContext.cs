using Fedonevek_React.Data.DbContext;
using Fedonevek_React.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Fedonevek_React.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {

        public DbSet<DbCard> Cards { get; set; }
        public DbSet<DbPlayer> Players { get; set; }
        public DbSet<DbRoom> Rooms { get; set; }
        public DbSet<DbWord> Words { get; set; }
        public DbSet<DbFriend> Friends { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<DbWord>().HasData(JsonLoader.LoadJson<DbWord>("./Data/Seed/DbWord"));
        }
    }
}

using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Data
{
    public class SportContext : DbContext
    {
        public DbSet<SportEvent> SportEvents { get; set; }

        public SportContext(DbContextOptions<SportContext> options)
            : base(options)
        {
           
        }   

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }

    }
}

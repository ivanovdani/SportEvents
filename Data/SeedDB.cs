using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Data
{
    public static class SeedDB
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new SportContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<SportContext>>()))
            {
                context.Database.EnsureCreated();
                // Look for any movies.
                if (context.SportEvents.Any())
                {
                    return;   // DB has been seeded
                }

                context.SportEvents.AddRange(
                    new SportEvent
                    {
                        Name = "Liverpool - Juventus",
                        OddsForFirstTeam = 1.95m,
                        OddsForDraw = 3.15m,
                        OddsForSecondTeam = 2.20m,
                        EventStartDate = new DateTime(2022, 12, 25, 22, 00, 00).ToUniversalTime()
                    },
                    new SportEvent
                    {
                        Name = "Grigor Dimitrov - Rafael Nadal",
                        OddsForFirstTeam = 2m,
                        OddsForDraw = 3.05m,
                        OddsForSecondTeam = 2.70m,
                        EventStartDate = new DateTime(2022, 6, 6, 19, 00, 00).ToUniversalTime()
                    },
                    new SportEvent
                    {
                        Name = "Barcelona - Ludogorets",
                        OddsForFirstTeam = 1.01m,
                        OddsForDraw = 4.20m,
                        OddsForSecondTeam = 15.20m,
                        EventStartDate = new DateTime(1055, 12, 31, 18, 30, 00).ToUniversalTime()
                    }
                ); 
                context.SaveChanges();
            }
        }
    }
}

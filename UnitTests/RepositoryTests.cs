using Data;
using Data.Models;
using Data.Repos;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;

namespace UnitTests
{
    [TestClass]
    public class RepositoryTests
    {
        private DbContextOptions<SportContext> options;

        public RepositoryTests()
        {
            var builder = new DbContextOptionsBuilder<SportContext>();
            builder.UseInMemoryDatabase("TestDB");
            options = builder.Options;
        }

        [TestMethod]
        public void CanAddEntity()
        {
            var testEntity = new SportEvent
            {
                Name = "Liverpool - Juventus",
                OddsForFirstTeam = 1.95m,
                OddsForDraw = 3.15m,
                OddsForSecondTeam = 2.20m,
                EventStartDate = new DateTime(2022, 12, 25, 22, 00, 00).ToUniversalTime()
            };

            var rep = new SportEventRepository(new SportContext(options));
            SportEvent entityIn = rep.Add(testEntity).Result;
            

            SportEvent foundEntity;
            using (var context = new SportContext(options))
            {
                foundEntity = context.SportEvents.FirstOrDefault(x => x.Id == entityIn.Id);
            }

            Assert.IsNotNull(foundEntity);
            Assert.AreEqual(entityIn.Name, foundEntity.Name);
        }
    }
}

using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Models
{
    public class SportEvent : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public decimal OddsForFirstTeam { get; set; }

        public decimal OddsForDraw { get; set; }

        public decimal OddsForSecondTeam { get; set; }

        public DateTime EventStartDate { get; set; }
    }
}

using Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Repos
{
    public class SportEventRepository : EFRepository<SportEvent, SportContext>
    {
        public SportEventRepository(SportContext context) : base(context)
        {

        }
        // We can add new methods specific to the movie repository here in the future
    }
}

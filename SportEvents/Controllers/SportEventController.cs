using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;
using Data.Repos;
using Microsoft.AspNetCore.Mvc;

namespace SportEvents.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportEventController:BaseAPIController<SportEvent, SportEventRepository>
    {
        public SportEventController(SportEventRepository repository) : base(repository)
        {

        }
    }
}
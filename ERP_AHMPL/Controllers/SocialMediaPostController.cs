using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class SocialMediaPostController : Controller
    {
        // GET: SocialMediaPost
       
        public ActionResult SocialMediaPostCreation()
        {
            return View();
        }
    }
}
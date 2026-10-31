using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult PageNotFound()
        {
            Response.StatusCode = 404;
            return View();
        }
        public ActionResult ErrorFound()
        {
            Response.StatusCode = 500;
            return View();
        }
        
    }
}
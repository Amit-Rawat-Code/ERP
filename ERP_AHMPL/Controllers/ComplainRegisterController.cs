using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class ComplainRegisterController : Controller
    {
        // GET: CommunicationWeb
        public ActionResult ComplainRegister()
        {
            return View();
        }
        public ActionResult GuardianComplainRegister()
        {
            return View();
        }
        public ActionResult AllComplainList()
        {
            return View();
        }
    }
}
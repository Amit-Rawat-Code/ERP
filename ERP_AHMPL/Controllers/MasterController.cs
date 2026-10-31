using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class MasterController : Controller
    {
        public ActionResult GroupMaster()
        {
            return View();
        }
        public ActionResult SocietyMaster()
        {
            return View();
        }
        public ActionResult SchoolMaster()
        {
            return View();
        }
        public ActionResult BranchMaster()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AttendanceMasterController : Controller
    {
        // GET: AttendanceMaster
        public ActionResult LeaveTypeMaster()
        {
            return View();
        }

        public ActionResult MasterAbbreviation()
        {
            return View();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace SEF.Controllers
{
    public class HRReportsController : Controller
    {
        // GET: HRReports

        public ActionResult EmployeeLeaveStatusReport()
        {
            return View();
        }
    }
}
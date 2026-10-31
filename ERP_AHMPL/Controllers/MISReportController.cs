using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class MISReportController : Controller
    {
        // GET: MISReport
        public ActionResult EnqVsRegVsAdm()
        {
            return View();
        }
        public ActionResult StaffAttendanceSummary()
        {
            return View();
        }
        public ActionResult MonthlySchoolReport()
        {
            return View();
        }
    }
}
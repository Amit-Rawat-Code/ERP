using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class StudentAttendanceReportController : Controller
    {
        // GET: StudentAttendanceDateWiseReport
        public ActionResult StudentAttendanceDateWiseReport()
        {
            return View();
        }
        public ActionResult StudentAttendanceSubjectWiseReport()
        {
            return View();
        }
        public ActionResult StudentAttendanceMonthlyReport()
        {
            return View();
        }
    }
}
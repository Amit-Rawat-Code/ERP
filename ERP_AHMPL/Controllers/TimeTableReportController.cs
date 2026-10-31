using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class TimeTableReportController : Controller
    {
        public ActionResult ClassWiseTimeTable()
        {
            return View();
        }
        public ActionResult TeacherWiseTimeTable()
        {
            return View();
        }

        public ActionResult TeacherWorkLoadReport()
        {
            return View();
        }
    }
}
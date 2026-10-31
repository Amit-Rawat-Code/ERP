using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class StudentAttendanceController : Controller
    {
        // GET: StudentAttendance
        public ActionResult Index()
        {
            return View();
        }

        #region StudentAttendance
        public ActionResult StudentAttendanceDateWise()
        {
            return View();
        }

        public ActionResult StudentAttendanceSubjectWise()
        {
            return View();
        }
        #endregion

    }
}
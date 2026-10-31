using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class CollegeAttendanceController : Controller
    {
        // GET: StudentAttendance
        #region StudentAttendance
        public ActionResult CollegeStudentAttendanceDateWise()
        {
            return View();
        }

        public ActionResult CollegeStudentAttendanceSubjectWise()
        {
            return View();
        }
        #endregion

    }
}
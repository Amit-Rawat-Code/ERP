using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class CollegeTimeTableTransactionController : Controller
    {
        public ActionResult CollegeGenTimeTableManual()
        {
            return View();
        }
        public ActionResult CollegeReplaceTeacher()
        {
            return View();
        }
        public ActionResult CollegeTeacherSubstitutionSuggestions()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class TimeTableTransactionController : Controller
    {
        public ActionResult GenTimeTableManual()
        {
            return View();
        }
        public ActionResult ReplaceTeacher()
        {
            return View();
        }
        public ActionResult TeacherSubstitutionSuggestions()
        {
            return View();
        }
    }
}
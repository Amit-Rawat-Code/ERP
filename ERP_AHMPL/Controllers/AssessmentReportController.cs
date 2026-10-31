using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AssessmentReportController : Controller
    {
        // GET: AssessmentReport
        public ActionResult DeviationClassWiseSubjectWiseReport()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class RegistrationReportController : Controller
    {
        // GET: RegistrationReport
        public ActionResult RegistrationFormReceiveReport()
        {
            return View();
        }

        public ActionResult RegistrationFormSaleReport()
        {
            return View();
        }

        public ActionResult RegistrationVsAdmissionReport()
        {
            return View();
        }
    }
}

//Datewise Registration Form Sale
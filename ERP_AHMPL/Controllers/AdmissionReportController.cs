using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;


namespace SEF.Controllers
{
    public class AdmissionReportController : Controller
    {
        // GET: AdmissionReport

        public ActionResult DateWiseAdmissionReport()
        {
            return View();
        }
        public ActionResult ClassWiseAdmissionReport()
        {
            return View();
        }
        public ActionResult SessionWiseAdmissionReport()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class FeeReportController : Controller
    {
        public ActionResult DailyFeesCollectionReport()
        {
            return View();
        }

        public ActionResult PendingFeeRegister()
        {
            return View();
        }
        public ActionResult FeeConcessionChartReport()
        {
            return View();
        }
        public ActionResult FeeBillPrint()
        {
            return View();
        }
        public ActionResult InstallmentFeeHeadMappingMonthReport()
        {
            return View();
        }
    }
}
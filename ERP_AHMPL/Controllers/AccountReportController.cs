using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AccountReportController : Controller
    {
        // GET: Account
        public ActionResult GeneralTrial()
        {
            return View();
        }
        public ActionResult GroupTrial()
        {
            return View();
        }
        public ActionResult DetailTrial()
        {
            return View();
        }
        public ActionResult LedgerReport()
        {
            return View();
        }
        public ActionResult MultipleLedgerReport()
        {
            return View();
        }
        public ActionResult BankLedgerReport()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AccountMasterController : Controller
    {
        // GET: Account
        public ActionResult GeneralLedger()
        {
            return View();
        }

        public ActionResult LedgerGroupMaster()
        {
            return View();
        }

        public ActionResult TDSSectionMaster()
        {
            return View();
        }

        public ActionResult TDSDeducteeMaster()
        {
            return View();
        }

        public ActionResult TDSNatureMaster()
        {
            return View();
        }

        public ActionResult VoucherNarrationMaster()
        {
            return View();
        }

        public ActionResult HOSOLedgerMapping()
        {
            return View();
        }
        public ActionResult GeneralLedger_Temp()
        {
            return View();
        }
        public ActionResult GeneralLedgerGlobal()
        {
            return View();
        }
    }
}
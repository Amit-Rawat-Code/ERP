using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class InventoryTransactionController : Controller
    {
        // GET: InventoryTransaction
        public ActionResult ItemWiseRateDetails()
        {
            return View();
        }
        public ActionResult MaterialInwardEntry()
        {
            return View();
        }

        public ActionResult MaterialApproval()
        {
            return View();
        }
    }
}
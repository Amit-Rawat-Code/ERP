using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF
{
    public class AccountDashBoardController : Controller
    {
        // GET: DashBoard
        public ActionResult LedgerRequestDashBoard()
        {
            return View();
        }
    }
}
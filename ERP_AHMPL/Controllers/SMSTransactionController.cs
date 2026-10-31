using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class SMSTransactionController : Controller
    {
        // GET: TicketMaster
        public ActionResult ComposeSMS()
        {
            return View();
        }
        public ActionResult SendCredentials()
        {
            return View();
        }
    }
}
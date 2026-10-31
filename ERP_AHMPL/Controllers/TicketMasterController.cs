using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class TicketMasterController : Controller
    {
        // GET: TicketMaster
        public ActionResult TicketTypeMaster()
        {
            return View();
        }
        public ActionResult TicketStatusMaster()
        {
            return View();
        }
    }
}
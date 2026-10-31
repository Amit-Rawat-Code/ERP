using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class TicketDashBoardController : Controller
    {
        // GET: TicketDashboard
        public ActionResult TicketDashBoardLevel1()
        {
            return View();
        }
        public ActionResult TicketDashBoardLevel2()
        {
            return View();
        }
    }
}
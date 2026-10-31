using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class TransportTransactionController : Controller
    {
        // GET: TransportTransaction
        public ActionResult VehicleRouteStudentMapping()
        {
            return View();
        }
        public ActionResult VehicleRouteMappingMaster()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class TransportMasterController : Controller
    {
        // GET: TransportMaster
        public ActionResult VehicleTypeMaster()
        {
            return View();
        }
        public ActionResult VehicleOwnershipMaster()
        {
            return View();
        }
        public ActionResult VehicleMaster()
        {
            return View();
        }
        public ActionResult StoppageMaster()
        {
            return View();
        }
        public ActionResult RouteMaster()
        {
            return View();
        }
        public ActionResult DriverDetailMaster()
        {
            return View();
        }
        public ActionResult FareParameterMaster()
        {
            return View();
        }
    }
}
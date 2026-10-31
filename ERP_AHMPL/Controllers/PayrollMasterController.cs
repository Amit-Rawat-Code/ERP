using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class PayrollMasterController : Controller
    {
        // GET: Payroll
        public ActionResult MinimumeWagesMaster()
        {
            return View();
        }
    }
}
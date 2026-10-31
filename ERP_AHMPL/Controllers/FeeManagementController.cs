using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class FeeManagementController : Controller
    {
        // GET: FeeManagement
        //public ActionResult InstallmentCreation()
        //{
        //    return View();
        //}
        //public ActionResult InstallmentFeeHeadMappingMonth()
        //{
        //    return View();
        //}

        public ActionResult FeesCollectionReport()
        {
            return View();
        }

        public ActionResult PendingFeeRegister()
        {
            return View();
        }
    }
}
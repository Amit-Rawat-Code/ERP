using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class RegistrationMasterController : Controller
    {
        // GET: RegistrationMaster
        public ActionResult RegistrationFormFeeHeadMaster()
        {
            return View();
        }
        public ActionResult RegistrationFormsReceiveMaster()
        {
            return View();
        }

    }
}
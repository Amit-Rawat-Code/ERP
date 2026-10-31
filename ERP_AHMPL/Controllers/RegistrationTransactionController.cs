using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class RegistrationTransactionController : Controller
    {
        // GET: RegistrationTransaction
        public ActionResult RegistrationFormSaleEntry()
        {
            return View();
        }
        public ActionResult RegistrationFormSaleEntryOnline()
        {
            return View();
        }
        public ActionResult RegistrationFormSubmission()
        {
            return View();
        }
        public ActionResult RegistrationFeePosting()
        {
            return View();
        }
        
    }
}
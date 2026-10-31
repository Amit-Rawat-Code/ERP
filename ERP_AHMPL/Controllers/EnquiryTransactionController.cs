using BAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class EnquiryTransactionController : Controller
    {
        public ActionResult EnquiryForm()
        {
            return View();
        }

        [HttpGet]
        [Route("Enquiry/GetEnquiry/")]
        public ActionResult EnquiryFormForSocialMediaWebsite()
        {
            return View();
        }

        public ActionResult EnquiryFollowUpForm()
        {
            return View();
        }
        

    }
}
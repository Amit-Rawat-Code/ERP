using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class CollegeEnquiryTransactionController : Controller
    {
        // GET: CollegeEnquiryTransaction
        public ActionResult CollegeEnquiryForm()
        {
            return View();
        }
        public ActionResult CollegeEnquiryFollowUpForm()
        {
            return View();
        }
        [HttpGet]
        [Route("Enquiry/GetEnquiry/")]
        public ActionResult CollegeEnquiryFormForSocialMediaWebsite()
        {
            return View();
        }
    }
}
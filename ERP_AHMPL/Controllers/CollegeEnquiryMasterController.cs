using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class CollegeEnquiryMasterController : Controller
    {
        public ActionResult CollegeEnquirySourceMaster()
        {
            return View();
        }
        public ActionResult CollegeCityAreaMaster()
        {
            return View();
        }
        public ActionResult CollegeEnquiryTypeMaster()
        {
            return View();
        }
    }
}
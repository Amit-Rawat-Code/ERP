using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using System.Threading;
//using BAL;

namespace SEF
{
    public class EnquiryMasterController : Controller
    {
       
        public ActionResult EnquirySourceMaster()
        {
            return View();
        }
        public ActionResult CityAreaMaster()
        {
            return View();
        }
        public ActionResult EnquiryTypeMaster()
        {
            return View();
        }

    }
}
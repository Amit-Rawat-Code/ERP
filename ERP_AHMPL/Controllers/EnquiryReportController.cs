using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class EnquiryReportController : Controller
    {
        #region EnquiryReport
        public ActionResult EnquiryRegisterReport()
        {
            return View();
        }
        #endregion

        #region Monthly Enquiry Statistics Report   
        public ActionResult MonthlyEnquiryStatisticsReport()
        {
            return View();
        }
        #endregion

        #region Social Media Post Report
        public ActionResult SocialMediaPostReport()
        {
            return View();
        }

        #endregion
    }
}
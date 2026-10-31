using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class CollegeEnquiryReportController : Controller
    {
        #region College Enquiry Report
        public ActionResult CollegeEnquiryRegisterReport()
        {
            return View();
        }
        #endregion

        #region College Monthly Enquiry Statistics Report   
        public ActionResult CollegeMonthlyEnquiryStatisticsReport()
        {
            return View();
        }
        #endregion

        #region College Social Media Post Report
        public ActionResult CollegeSocialMediaPostReport()
        {
            return View();
        }

        #endregion
    }
}
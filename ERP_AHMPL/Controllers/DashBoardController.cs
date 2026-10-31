using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF
{
    public class NoCacheAttribute : ActionFilterAttribute
    {
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            var response = filterContext.HttpContext.Response;
            response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
            response.Cache.SetValidUntilExpires(false);
            response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
            response.Cache.SetCacheability(HttpCacheability.NoCache);
            response.Cache.SetNoStore();
        }
    }
    
    public class DashBoardController : Controller
    {
        // GET: DashBoard
        [NoCache]
        public ActionResult QuickLinksDashBoard()
        {
            return View();
        }

        public ActionResult AdminDashBoard()
        {
            return View();
        }

        public ActionResult EnquiryDashBoradLevel1()
        {
            return View();
        }
        public ActionResult EnquiryDashBoradLevel2()
        {
            return View();
        }
        public ActionResult EnquiryDashBoradLevel3()
        {
            return View();
        }        
        public ActionResult AdminQuickLinksDashBoard()
        {
            return View();
        }
        public ActionResult GuardianDashBoard()
        {
            return View();
        }
        
    }
}
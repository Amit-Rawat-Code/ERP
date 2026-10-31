using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class NotificationController : Controller
    {
        // GET: Notification
        public ActionResult ApprovedNotifications()
        {
            return View();
        }
    }
}
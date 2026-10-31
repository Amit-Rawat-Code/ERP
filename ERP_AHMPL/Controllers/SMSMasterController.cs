using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class SMSMasterController : Controller
    {
        // GET: TicketMaster
        public ActionResult SMSSubjectMaster()
        {
            return View();
        }
        public ActionResult SMSTemplateMaster()
        {
            return View();
        }
    }
}
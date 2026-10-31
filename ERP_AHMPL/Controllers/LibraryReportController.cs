using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class LibraryReportController : Controller
    {
        // GET: LibraryReport
        public ActionResult BookSearch()
        {
            return View();
        }
        public ActionResult BookIssueRegister()
        {
            return View();
        }
        public ActionResult BookReturnRegister()
        {
            return View();
        }

        #region Print Bar Code
        public ActionResult PrintBarCode()
        {
            return View();
        }
        #endregion
    }
}
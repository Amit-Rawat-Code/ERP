using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class HrManagementController : Controller
    {
        // GET: HrManagement
        public ActionResult DepartmentMaster()
        {
            return View();
        }
        public ActionResult DesignationMaster()
        {
            return View();
        }
        public ActionResult GradeMaster()
        {
            return View();
        }
        public ActionResult LeaveMaster()
        {
            return View();
        }
        public ActionResult ObservationCriteria()
        {
            return View();
        }
        public ActionResult InterviewRoundMaster()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class GblMasterController : Controller
    {
        // GET: GlobalMaster

        //
        public ActionResult CourseMaster()
        {
            return View();
        }
        public ActionResult ClassMaster()
        {
            return View();
        }
        public ActionResult SectionMaster()
        {
            return View();
        }
        public ActionResult ClassBranchMaster()
        {
            return View();
        }
        public ActionResult StreamMaster()
        {
            return View();
        }
        public ActionResult SubjectMaster()
        {
            return View();
        }
        public ActionResult SubjectGroupMaster()
        {
            return View();
        
        }

        public ActionResult CollegeCourseMaster()
        {
            return View();
        }
        public ActionResult CollegeBranchMaster()
        {
            return View();
        }
        public ActionResult CollegeSemesterMaster()
        {
            return View();
        }

        public ActionResult SessionMaster()
        {
            return View();
        }
        public ActionResult FinancialYearMaster()
        {
            return View();
        }
    }
}
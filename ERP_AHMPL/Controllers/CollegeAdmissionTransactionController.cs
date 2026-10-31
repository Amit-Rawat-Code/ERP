using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class CollegeAdmissionTransactionController : Controller
    {
        // GET: CollegeAdmissionTransaction
        public ActionResult CollegeStudentAdmissionFormDetails()
        {
            return View();
        }

        public ActionResult DocumentDetails()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AdmissionMasterController : Controller
    {
        // GET: AdmissionMaster
        public ActionResult CreateBatch()
        {
            return View();
        }
        public ActionResult CreateBatchTimeSlot()
        {
            return View();
        }

        public ActionResult ChangeStudentBatch()
        {
            return View();
        }
        public ActionResult ApplicationFormGeneralDetails()
        {
            return View();
        }
        public ActionResult ApplicationFormOtherDetails()
        {
            return View();
        }

        public ActionResult ApplicationFormQualificationDetails()
        {
            return View();
        }

        public ActionResult DetailsOfDocuments()
        {
            return View();
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class MasterTransferController : Controller
    {
        // GET: DataTransfer      
        public ActionResult MasterTransferWithAcademic()
        {
            return View();
        }
        public ActionResult MasterTransferWithoutRelationshipId()
        {
            return View();
        }
    }
}
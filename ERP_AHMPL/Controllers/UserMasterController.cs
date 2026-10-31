using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class UserMasterController : Controller
    {
        // GET: UserMaster
        public ActionResult UserMaster()
        {
            return View();
        }
        public ActionResult RoleMaster()
        {
            return View();
        }
        
    }
}
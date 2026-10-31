using BAL;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class UserMobileMasterController : Controller
    {
        // GET: UserMobileMaster

        public ActionResult UserMobileRole()
        {
            return View();
        }
        public ActionResult UserMobileRoleAssignment()
        {
            return View();
        }
        public ActionResult UserMobilePermission()
        {
            return View();
        }
        
    }
}
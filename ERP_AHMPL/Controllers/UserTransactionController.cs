using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class UserTransactionController : Controller
    {
        // GET: UserTransaction
        public ActionResult RoleOptions()
        {
            return View();
        }
        public ActionResult UserRoleAssignments()
        {
            return View();
        }
        public ActionResult UserPermission()
        {
            return View();
        }
        public ActionResult SchoolWisePermission()
        {
            return View();
        }
        public ActionResult AccountPermission()
        {
            return View();
        }
        public ActionResult BackDateEntryPermission()
        {
            return View();
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class InventoryMasterController : Controller
    {
        // GET: InventoryMaster
        public ActionResult UnitMaster()
        {
            return View();
        }
       
        public ActionResult ItemGroupMaster()
        {
            return View();
        }
        public ActionResult ItemCategoryMaster()
        {
            return View();
        }
        public ActionResult ItemMaster()
        {
            return View();
        }
        public ActionResult CommodityMaster()
        {
            return View();
        }
        public ActionResult ExpenseTaxesHeadMaster()
        {
            return View();
        }
        public ActionResult HSNCodeMaster()
        {
            return View();
        }

        public ActionResult ModelMaster()
        {
            return View();
        }
    }
}
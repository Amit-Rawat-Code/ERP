using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class FeeTransactionController : Controller
    {
        // GET: FeeStructureGroupMaster
        public ActionResult AdmissionFeeDeposit()
        {
            return View();
        }
        public ActionResult FeeDeposit()
        {
            return View();
        }
        public ActionResult FeeDueVoucher()
        {
            return View();
        }
        public ActionResult FeesReceiptCancellation()
        {
            return View();
        }
        public ActionResult AdmissionFeeDeposit1()
        {
            return View();
        }
        public ActionResult FeeDueVoucherCancellation()
        {
            return View();
        }
        public ActionResult TransportFeeDueVoucher()
        {
            return View();
        }
    }
}
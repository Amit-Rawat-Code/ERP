using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AccountTransactionController : Controller
    {
        // GET: Account
        public ActionResult BankPaymentVoucher()
        {
            return View();
        }
        public ActionResult CashPaymentVoucher()
        {
            return View();
        }
        public ActionResult BankReceiveVoucher()
        {
            return View();
        }
        public ActionResult CashReceiveVoucher()
        {
            return View();
        }
        public ActionResult JournalVoucher()
        {
            return View();
        }
        public ActionResult ContraVoucher()
        {
            return View();
        }
        public ActionResult BankReconciliation()
        {
            return View();
        }
        public ActionResult AdminBankReconciliation()
        {
            return View();
        }
        public ActionResult UpdateLedgerOpening()
        {
            return View();
        }
        public ActionResult CashDepositInBank()
        {
            return View();
        }
        public ActionResult AdmissionJournalVoucher()
        {
            return View();
        }
    }
}
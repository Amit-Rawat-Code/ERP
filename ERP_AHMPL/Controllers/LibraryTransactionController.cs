using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class LibraryTransactionController : Controller
    {
        // GET: LibraryTransaction
        #region Book Entry
        public ActionResult BookEntry()
        {
            return View();
        }
        #endregion
        #region Book Stock
        public ActionResult BookStock()
        {
            return View();
        }
        #endregion

        #region Book Issue Entry
        public ActionResult BookIssueEntry()
        {
            return View();
        }
        #endregion

        #region Book Return Entry
        public ActionResult BookReturnEntry()
        {
            return View();
        }
        #endregion

        #region Binding Issue Entry
        public ActionResult BindingIssueEntry()
        {
            return View();
        }
        #endregion

        #region Binding Return Entry
        public ActionResult BindingReturnEntry()
        {
            return View();
        }
        #endregion

        #region Write OFF Entry
        public ActionResult WriteOffEntry()
        {
            return View();
        }
        #endregion   

        #region Book Stock Opening
        public ActionResult BookStockOpening()
        {
            return View();
        }
        #endregion   
    }
}
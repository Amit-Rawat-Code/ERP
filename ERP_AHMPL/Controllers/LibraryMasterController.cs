using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class LibraryMasterController : Controller
    {
        // GET: LibraryMater
        #region Almera Master
        public ActionResult AlmeraMaster()
        {
            return View();
        }
        #endregion
        #region Rack Master
        public ActionResult RackMaster()
        {
            return View();
        }
        #endregion
        #region Bin Master
        public ActionResult BinMaster()
        {
            return View();
        }
        #endregion
        #region Author Master
        public ActionResult AuthorMaster()
        {
            return View();
        }
        #endregion
        #region Binding Type Master
        public ActionResult BindingTypeMaster()
        {
            return View();
        }
        #endregion
        #region Book Accessories Master
        public ActionResult BookAccessMaster()
        {
            return View();
        }
        #endregion
        #region Publisher Master
        public ActionResult PublisherMaster()
        {
            return View();
        }
        #endregion
        #region Book Master
        public ActionResult BookMaster()
        {
            return View();
        }
        #endregion
        #region Subject Group Master
        public ActionResult SubjectGrpMaster()
        {
            return View();
        }
        #endregion
        #region Subject Master
        public ActionResult SubjectMaster()
        {
            return View();
        }
        #endregion
        #region Late Fine Master
        public ActionResult LateFineMaster()
        {
            return View();
        }
        #endregion

        #region Library Accession Setting Page
        public ActionResult AccessionSetting()
        {
            return View();
        }
        #endregion
    }
}
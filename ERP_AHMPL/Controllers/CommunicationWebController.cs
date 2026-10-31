using System.Web.Mvc;

namespace SEF.Controllers
{
    public class CommunicationWebController : Controller
    {
        // GET: CommunicationWeb
        public ActionResult DigitalNoticeCreationMaster()
        {
            return View();
        }
        public ActionResult DigitalDiaryCreation()
        {
            return View();
        }
        public ActionResult EventCalendar()
        {
            return View();
        }
        public ActionResult EventCalendarForMaster()
        {
            return View();
        }
    }
}
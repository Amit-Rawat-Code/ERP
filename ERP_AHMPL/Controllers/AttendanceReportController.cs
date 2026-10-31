using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AttendanceReportController : Controller
    {
        // GET: EmployeeAttendanceReport
        public ActionResult EmployeeAttendanceDateWiseReport()
        {
            return View();
        }
        public ActionResult EmployeeAttendanceMonthWiseReport()
        {
            return View();
        }
        public ActionResult EmployeeAttendanceMonthlyReport()
        {
            return View();
        }
        public ActionResult EmployeeAttendanceMonthlyInAndOutReport()
        {
            return View();
        }
        public ActionResult EmployeeAttendancePunchLogInAndOutReport()
        {
            return View();
        }
    }
}
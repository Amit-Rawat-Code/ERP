using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class NotificationApiController : ApiController
    {
        // GET: NotificationApi
        #region Out Duty Notification
        [HttpPost]
        public async Task<string> InsertUpdateDeleteNotifications(Notifications obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteNotification(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetNotificationsList(Notifications obj)
        {
            DataTable dt = await DLL.dal.GetAllNotifications(obj);
            return dt;
        }
        #endregion

        [HttpPost]
        public async Task<DataTable> GetAllTimeTableNotifications(TimeTableNotification obj)
        {
            DataTable ds = await DLL.dal.SendTimeTableNotification(obj);
            return ds;
        }
    }
}
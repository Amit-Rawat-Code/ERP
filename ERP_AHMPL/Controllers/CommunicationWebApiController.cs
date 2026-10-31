using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class CommunicationWebApiController : ApiController
    {
        // GET: CommunicationWebApi
        #region Event Caldendar
        [HttpPost]
        public async Task<string> InsertUpdateDeleteEventCalendar(Communication obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEventCalendar(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetEventCalendar(Communication obj)
        {
            DataTable dt = await DLL.dal.GetEventCalendarDetails(obj);
            return dt;
        }
        #endregion
        #region Event Caldendar
        [HttpPost]
        public async Task<string> InsertUpdateDeleteEventCalendarForMaster(Communication obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEventCalendarForMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetEventCalendarForMaster(Communication obj)
        {
            DataTable dt = await DLL.dal.GetEventCalendarDetailsMaster(obj);
            return dt;
        }
        #endregion
    }
}
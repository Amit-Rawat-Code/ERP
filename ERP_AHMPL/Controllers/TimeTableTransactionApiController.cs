using BAL;
using DAL;
using Newtonsoft.Json;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
namespace SEF.Controllers
{
    public class TimeTableTransactionApiController : ApiController
    {
        [HttpPost]
        public async Task<string> InsertUpdateDeleteGenTimeTableManual(RearrangeTimeTablePeriod obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteGenTimeTableManual(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetTimeTableManualList(RearrangeTimeTablePeriod obj)
        {
            DataSet ds = await DLL.dal.GetTimeTableManualList(obj);
            return ds;
        }
        #region Teacher Substitution
        [HttpPost]
        public async Task<DataSet> GetEmployeeOnLeaveList(BALReplaceTeacher obj)
        {
            DataSet ds = await DLL.dal.GetEmployeeOnLeaveList(obj);
            return ds;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteReplaceTeacherMaster(BALReplaceTeacher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteReplaceTeacherMaster(obj);
            string[] res = result.Split('_');
            if (res.Length>0 && (res[0] == "1" || res[0] == "2"))
            {
                TimeTableNotification ttn = new TimeTableNotification
                {
                    Action = 2,
                    TransID = res.Length > 1 ? res[1] : ""
                };

                DataTable dt = await DLL.dal.SendTimeTableNotification(ttn);
                if (dt.Rows.Count > 0)
                {
                    for (int I = 0; I < dt.Rows.Count; I++)
                    {
                        string StatusCode = await obj.SendNotificationtToMobile(dt.Rows[I]["GSMId"].ToString(), dt.Rows[I]["NotificationBody"].ToString(), dt.Rows[I]["Title"].ToString(), dt.Rows[I]["tstamp"].ToString(), null, "AAAA8oPhQxQ:APA91bGsnKKg5c7gCaPQDgrNtGwrr6xUO_vCT2U48HWbf-vLXriZwlhEIW-wFbhyon6_u9VjDqjUFzH8yn3sDYaTz4qeabXGQKckcZScWLsk9izWc3Jh8fVdOha4PzyNml7dR67y5ge6", "1041594663700");
                        string NotificationIds = dt.Rows[I]["Id"].ToString();

                        if (NotificationIds != string.Empty && StatusCode == "OK")
                        {
                            ttn = new TimeTableNotification
                            {
                                Action = 1,
                                Id = NotificationIds
                            };
                            await DLL.dal.UpdateTimeTableNotification(ttn);
                        }
                    }
                }

            }


            return res.Length > 0 ? res[0] : result;
        }

        #endregion

        #region Replace Teacher
        [HttpPost]
        public async Task<DataTable> GetAllotNewTeacherMaster(BALAllotNewTeacher obj)
        {
            DataTable dt = await DLL.dal.GetAllotNewTeacer(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteAllotNewTeacherMaster(BALAllotNewTeacher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteAllotNewTeacher(obj);
            return result;
        }
        #endregion

        #region OnLine class Link
        [HttpPost]
        public async Task<string> InsertUpdateDeleteOnlinePeriodLink(BalOnlinePeriodLink obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteOnlinePeriodLink(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetOnlinePeriodLinkToStudent(BalOnlinePeriodLink obj)
        {
            DataTable ds = await DLL.dal.GetOnlinePeriodLinkToStudent(obj);
            return ds;
        }
        #endregion
        #region Online Student join
        [HttpPost]
        public async Task<string> InsertUpdateDeleteOnlineStudentJoined(BalOnlinePeriodLink obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteOnlineStudentJoined(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetOnlineStudentJoined(BalOnlinePeriodLink obj)
        {
            DataTable ds = await DLL.dal.GetOnlineStudentJoined(obj);
            return ds;
        }

        #endregion
    }
}

//GetOnlinePeriodLink
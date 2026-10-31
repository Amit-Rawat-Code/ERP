using BAL;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        #region Out Duty Notification
        public async Task<DataTable> GetAllNotifications(Notifications obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@VType",obj.VType),
              new SqlParameter("@EmployeeCode",obj.EmployeeCode),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@Result",""),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[STP_Notification]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteNotification(Notifications obj)
        {
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action",obj.Action),
                 new SqlParameter("@VType",obj.VType),
                 new SqlParameter("@Remarks",obj.EmployeeRemarks),
                 new SqlParameter("@TransID",obj.TransID),
                 new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                 new SqlParameter("@CreatedBy",obj.CreatedBy),
                 new SqlParameter("@RelationshipId",obj.RelationshipId),
                 new SqlParameter("@SessionId",obj.SessionId),
                 new SqlParameter("@FYId",obj.FYId),
                 new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                 new SqlParameter("@IsApproved",obj.IsApproved),
                 new SqlParameter("@AttendanceDate",obj.VDate),                
                 new SqlParameter("@AllEmployeeApprovalList",obj.AllEmployeeApprovalList),
                 new SqlParameter("@AttendanceTransId",obj.AttendanceTransId),
                 new SqlParameter("@RemarkType",obj.Type),
                 new SqlParameter("@Result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[STP_Notification]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        public async Task<string> UpdateTimeTableNotification(TimeTableNotification obj)
        {
            var param = new List<SqlParameter>
            {
               new SqlParameter("@Action",obj.Action),
               new SqlParameter("@Id",obj.Id),
               new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_TimeTableNotification]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> SendTimeTableNotification(TimeTableNotification obj)
        {
            var param = new List<SqlParameter>
            {
               new SqlParameter("@Action",obj.Action),
               new SqlParameter("@RelationshipId",obj.RelationshipId),
               new SqlParameter("@SessionId",obj.SessionId),
               new SqlParameter("@UserId",obj.UserId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_TimeTableNotification]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> GetNotificationCheck(TimeTableNotification obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@UserId", obj.UserId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",  obj.RelationshipId),
                new SqlParameter("@SessionId",  obj.SessionId),
                new SqlParameter("@fyId", obj.FYId),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_TimeTableNotification]", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}

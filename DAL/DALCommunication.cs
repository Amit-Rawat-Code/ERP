using BAL;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        #region Event Calendar
        public async Task<string> InsertUpdateDeleteEventCalendar(Communication obj)
        {
            var param = new List<SqlParameter>
                {
                   new SqlParameter("@Code",obj.Code),
                   new SqlParameter("@Action",obj.Action),
                   new SqlParameter("@CalendarFor",obj.CalendarFor),
                   new SqlParameter("@RelationshipId",obj.RelationshipId),
                   new SqlParameter("@SessionId",obj.SessionId),
                   new SqlParameter("@FYId",obj.FYId),
                   new SqlParameter("@ActivityType",obj.ActivityType),
                   new SqlParameter("@ActivityName",obj.ActivityName),
                   new SqlParameter("@EventName",obj.Eventname),
                   new SqlParameter("@StartDate",obj.EventStartDate),
                   new SqlParameter("@EndDate",obj.EventEndDate),
                   new SqlParameter("@IsActive",obj.IsActive),
                   new SqlParameter("@CreatedBy",obj.CreatedBy),
                   new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                   new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InsertUpdateDeleteEventCalendar]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEventCalendarDetails(Communication obj)
        {
            var param = new List<SqlParameter>
            {
                   new SqlParameter("@Code",obj.Code),
                   new SqlParameter("@Action",obj.Action),
                   new SqlParameter("@Month",obj.Month),
                   new SqlParameter("@Year",obj.Year),
                   new SqlParameter("@UserTypeID",obj.UserTypeID),
                   new SqlParameter("@RelationshipId",obj.RelationshipId),
                   new SqlParameter("@SessionId",obj.SessionId),
                   new SqlParameter("@FYId",obj.FYId),
                   new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[GetEventCalendarDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Event Calendar For Master
        public async Task<string> InsertUpdateDeleteEventCalendarForMaster(Communication obj)
        {
            var param = new List<SqlParameter>
                {
                   new SqlParameter("@Code",obj.Code),
                   new SqlParameter("@Action",obj.Action),                   
                   new SqlParameter("@RelationshipId",obj.RelationshipId),
                   new SqlParameter("@SessionId",obj.SessionId),
                   new SqlParameter("@FYId",obj.FYId),
                   new SqlParameter("@CalendarFor",obj.CalendarFor),
                   new SqlParameter("@EmployeeType",obj.EmployeeType),
                   new SqlParameter("@StudentType",obj.StudentType),
                   new SqlParameter("@CreatedBy",obj.CreatedBy),
                   new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                   new SqlParameter("@Result","")
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InsertUpdateDeleteEventCalendarForMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEventCalendarDetailsMaster(Communication obj)
        {
            var param = new List<SqlParameter>
            {
                   new SqlParameter("@Code",obj.Code),
                   new SqlParameter("@Action",obj.Action),
                   new SqlParameter("@RelationshipId",obj.RelationshipId),
                   new SqlParameter("@SessionId",obj.SessionId),
                   new SqlParameter("@FYId",obj.FYId),
                   new SqlParameter("@Result","")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[GetEventCalendarDetailsForMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}

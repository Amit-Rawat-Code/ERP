using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Data.SqlTypes;
using BAL;

namespace DAL
{
    public partial class DLL
    {
        #region MIS Report
        public async Task<DataTable> GetMISReport(BALMIS obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RIDs",obj.RIDs),
             new SqlParameter("@FromDate",obj.FromDate),
             new SqlParameter("@ToDate",obj.ToDate),
              new SqlParameter("@Year",obj.Year),
             new SqlParameter("@Month",obj.Month),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_MISReport]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetMISReports(BALMIS obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RIDs",obj.RIDs),
             new SqlParameter("@FromDate",obj.FromDate),
             new SqlParameter("@ToDate",obj.ToDate),
              new SqlParameter("@Year",obj.Year),
             new SqlParameter("@Month",obj.Month),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand_UsingdataSet("[rpt].[USP_MISReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Staff Attendance Summary Report
        public async Task<DataTable> GetStaffAttendanceSummary(BALMIS obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RIDs",obj.RIDs),
             new SqlParameter("@FromDate",obj.FromDate),
             new SqlParameter("@ToDate",obj.ToDate),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_MISStaffAttendanceSummaryReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Voucher Report
        public async Task<DataTable> ModulesControlReport(BALMIS obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_ModulesControlReport", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}

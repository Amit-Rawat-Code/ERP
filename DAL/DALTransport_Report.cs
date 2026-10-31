using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public class DALTransport_Report:IDALTransport_Report
    {
        #region Vehicle Report
        public async Task<DataTable> GetVehicleReport(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@VehicleCode",obj.VehicleCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Category",obj.Category),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_VehicleReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Vehicle Report Count
        public async Task<DataTable> GetVehicleReportCount(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@VehicleCode",obj.VehicleCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@Category",obj.Category),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_VehicleReportCount]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}

using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public class DALTicket_Dash:IDALTicket_Dash
    {
        #region Dashboard Level1
        public async Task<DataTable> DashBoardLevel1(BALTicket obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Status",obj.Status),
                //new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                //new SqlParameter("@CreatedBy",obj.CreatedBy),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_TicketDashboard]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Dashboard Level2
        public async Task<DataTable> DashBoardLevel2(BALTicket obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@FileName",obj.FileName),
                new SqlParameter("@Status",obj.Status),
                
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_TicketDashboard]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion        
    }
}


using BAL;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        #region Student Transfer
        public async Task<string> InsertStudentTransfer(StudentTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),              
              new SqlParameter("@PromoteStudentLists", obj.PromoteStudentLists),              
              new SqlParameter("@ToSessionId",obj.ToSessionId),
              new SqlParameter("@ToFYId",obj.ToFYId),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@UpdatedBy",obj.UpdatedBy),
              new SqlParameter("@Result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[Mast].[USP_ImportStudentPromotion]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentListForPromotion(StudentTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),             
             new SqlParameter("@FromClassCode",obj.FromClassCode),
             new SqlParameter("@FromSectionCode",obj.FromSectionCode),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@SessionId",obj.SessionId),
             new SqlParameter("@Result",""),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetStudentListForPromotion]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

    }
}

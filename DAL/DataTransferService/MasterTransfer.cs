using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Text;
using BAL.DataTransfer;

namespace DAL.DataTransferService
{
    public class MasterTransfer: IDALMaster_Transfer
    {       
        #region Financial Year Master Transfer With AcademicSession
        public async Task<string> InsertMasterTransferWithAcademic(BAL.DataTransfer.MasterTransferRequest obj)
        {
            StringBuilder MasterList = new StringBuilder();
            if (obj.Action == 1 && obj.MasterList.Count == 0) return "0";

            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TableNames", obj.MasterList[0].TableName.ToString()),
                //new SqlParameter("@SchoolCode",obj.SchoolCode),
                //new SqlParameter("@BranchCode",obj.BranchCode),
              
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@FromFYId",obj.FromFYId),

                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FromSessionId",obj.FromSessionId),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_FinancialYearMasterTransferWithAcademicSession]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetMasterTableListForAcademic(BAL.DataTransfer.MasterTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TableRefId",obj.TableRefId),
             new SqlParameter("@TableSchema",obj.TableSchema),
             new SqlParameter("@DisplayName",obj.DisplayName),
             new SqlParameter("@SchoolCode",obj.SchoolCode),
             new SqlParameter("@BranchCode",obj.BranchCode)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FinancialYearMasterTransferWithAcademicSession]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion
        #region Financial Year Master Transfer Without RelationshipId
        public async Task<string> InsertMasterTransferWithoutRelationhipId(BAL.DataTransfer.MasterTransferRequest obj)
        {
            StringBuilder MasterList = new StringBuilder();
            if (obj.Action == 1 && obj.MasterList.Count == 0) return "0";

            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TableNames", obj.MasterList[0].TableName.ToString()),
                //new SqlParameter("@SchoolCode",obj.SchoolCode),
                //new SqlParameter("@BranchCode",obj.BranchCode),
              
                new SqlParameter("@ToFYId",obj.FYId),
                new SqlParameter("@FromFYId",obj.FromFYId),

                new SqlParameter("@ToSessionId",obj.SessionId),
                new SqlParameter("@FromSessionId",obj.FromSessionId),

                //new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_FinancialYearMasterTransferWithoutRelationshipId]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetMasterTableListForwithoutRelationshipId(BAL.DataTransfer.MasterTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TableRefId",obj.TableRefId),
             new SqlParameter("@TableSchema",obj.TableSchema),
             new SqlParameter("@DisplayName",obj.DisplayName),
             new SqlParameter("@SchoolCode",obj.SchoolCode),
             new SqlParameter("@BranchCode",obj.BranchCode)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_FinancialYearMasterTransferWithoutRelationshipId]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion
    }
}

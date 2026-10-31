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
    public class AssessmentTransfer: IDALAssessment_Transfer
    {
        #region Assessment Transfer
        public async Task<string> InsertSyllabusTransferForAssessment(BAL.DataTransfer.AssessmentTransferRequest obj)
        {
            StringBuilder MasterList = new StringBuilder();
            if (obj.Action == 1 && obj.MasterList.Count == 0) return "0";

            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransferMType",obj.TransferMType),
                new SqlParameter("@TableNames", obj.MasterList[0].TableName.ToString()),                
              
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),                

                new SqlParameter("@FromRelationshipId",obj.FromRelationshipId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

                new SqlParameter("@FromClassCode",obj.FromClassCode),
                new SqlParameter("@FromSubjectCode",obj.FromSubjectCode),

                new SqlParameter("@ToClassCode",obj.ToClassCode),
                new SqlParameter("@ToSubjectCode",obj.ToSubjectCode),

                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_MasterTableForAssessmentTransfer]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetMasterTableListForAssessment(BAL.DataTransfer.AssessmentTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@TransferMType",obj.TransferMType),
             new SqlParameter("@TableRefId",obj.TableRefId),
             new SqlParameter("@TableSchema",obj.TableSchema),
             new SqlParameter("@DisplayName",obj.DisplayName),
             new SqlParameter("@SchoolCode",obj.SchoolCode),
             new SqlParameter("@BranchCode",obj.BranchCode)
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_MasterTableForAssessmentTransfer]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }      
        #endregion
    }
}

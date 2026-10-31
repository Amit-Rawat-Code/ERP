using BAL.DataTransfer;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL.DataTransferService
{
    public class LedgerTransfer : ILedger_Transfer
    {
        #region Ledger Transfer
        public async Task<string> TransferSubGroupWithoutOpening(LedgerTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@TransferLedgerList", obj.TransferLedgerList),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@ToFYId",obj.ToFYId),
              new SqlParameter("@ToSessionId",obj.ToSessionId),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@Result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[Mast].[USP_TransferSubGroupWithoutOpening]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetLedgerListForImport(LedgerTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@ToFYId",obj.ToFYId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetLedgerListForImport]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertOpeningRelationshipwise(LedgerTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action",obj.Action),
              new SqlParameter("@TransferLedgerList", obj.TransferLedgerList),
              new SqlParameter("@ToSessionId",obj.ToSessionId),
              new SqlParameter("@ToFYId",obj.ToFYId),
              new SqlParameter("@FYId",obj.FYId),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@CreatedBy",obj.CreatedBy),
              new SqlParameter("@Result",""),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[Mast].[USP_InsertOpeningRelationshipwise]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetRelationshipwiseLedgerListForOpening(LedgerTransferRequest obj)
        {
            var param = new List<SqlParameter>
            {
             new SqlParameter("@Action",obj.Action),
             new SqlParameter("@RelationshipId",obj.RelationshipId),
             new SqlParameter("@FYId",obj.FYId),
             new SqlParameter("@ToFYId",obj.ToFYId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetRelationshipwiseLedgerListForOpening]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

    }
}

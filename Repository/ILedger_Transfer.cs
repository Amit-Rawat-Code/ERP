using BAL;
using BAL.DataTransfer;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
    public interface ILedger_Transfer
    {
        #region Ledger Transfer With AcademicSession
        Task<string> TransferSubGroupWithoutOpening(LedgerTransferRequest obj);
        Task<DataTable> GetLedgerListForImport(LedgerTransferRequest obj);
        Task<string> InsertOpeningRelationshipwise(LedgerTransferRequest obj);
        Task<DataTable> GetRelationshipwiseLedgerListForOpening(LedgerTransferRequest obj);
        #endregion
    }
}

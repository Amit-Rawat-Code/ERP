using BAL;
using BAL.DataTransfer;
using DAL;
using Repository;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
namespace SEF.Controllers
{
    public class LedgerTransferApiController : ApiController
    {
        ILedger_Transfer _iLedgerTransfer;
        public LedgerTransferApiController(ILedger_Transfer iLedgerTransfer)
        {
            _iLedgerTransfer = iLedgerTransfer;
        }
        #region Ledger Transfer without opening
        [HttpPost]
        public async Task<string> InsertUpdateDeleteLedgerTransfer(LedgerTransferRequest obj)
        {
            string result = await _iLedgerTransfer.TransferSubGroupWithoutOpening(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetLedgerListForTransfer(LedgerTransferRequest obj)
        {
            DataTable dt = await _iLedgerTransfer.GetLedgerListForImport(obj);
            return dt;
        }
        #endregion
        #region Ledger Transfer with opening Relationshipwise
        [HttpPost]
        public async Task<string> InsertOpeningRelationshipwise(LedgerTransferRequest obj)
        {
            string result = await _iLedgerTransfer.InsertOpeningRelationshipwise(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetRelationshipwiseLedgerListForOpening(LedgerTransferRequest obj)
        {
            DataTable dt = await _iLedgerTransfer.GetRelationshipwiseLedgerListForOpening(obj);
            return dt;
        }
        #endregion

        [HttpPost]
        public async Task<DataTable> GetFinancialYear(BALUserMaster obj)
        {
            DataTable dt = await DLL.dal.GetAllotedFinancialYear(obj);
            return dt;
        }
    }
}
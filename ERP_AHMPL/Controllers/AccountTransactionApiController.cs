using BAL;
using DAL;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class AccountTransactionApiController : ApiController
    {
        #region Account Ledger
        [HttpPost]
        public async Task<List<string>> InsertUpdateDeleteVoucherLedger(BALAccount obj)
        {
            List<string> result = await DLL.dal.InsertUpdateDeleteVoucherLedger(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetLedgerVoucher(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedgerVoucher(obj);
            return dt;
        }
        #endregion
        #region Bank Reconciliation
        [HttpPost]
        public async Task<string> InsertUpdateDeleteBankReconciliation(BALAccount obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBankReconciliation(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetBankReconciliation(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetBankReconciliation(obj);
            return dt;
        }
        #endregion

        #region Account Laser Opening
        [HttpPost]
        public async Task<string> UpdateLedgerOpening(BALAccount obj)
        {
            string result = await DLL.dal.UpdateLedgerOpening(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetLedgerOpening(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedgerOpening(obj);
            return dt;
        }
        #endregion
        #region Cash Deposit In Bank
        [HttpPost]
        public async Task<string> UpdateCashDepositInBank(BALAccount obj)
        {
            string result = await DLL.dal.UpdateCashDepositInBank(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetCashDepositInBankLedgerEntry(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetCashDepositInBankLedgerEntry(obj);
            return dt;
        }
        #endregion
        #region Open Ledger Wise Details
        [HttpPost]
        public async Task<DataTable> GetLedgerWiseDetails(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedgerWiseDetails(obj);
            return dt;
        }
        #endregion

        [HttpPost]
        public async Task<List<string>> InsertUpdateDeleteAdmissionVoucherLedger(BALAccount obj)
        {
            List<string> result = await DLL.dal.InsertUpdateDeleteAdmissionVoucherLedger(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetAdmissionLedgerVoucher(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetAdmissionLedgerVoucher(obj);
            return dt;
        }
    }
}
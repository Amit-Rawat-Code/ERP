using BAL;
using Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SEF.Controllers
{
    public class InventoryTransactionApiController : ApiController
    {
        // GET: InventoryTransactionApi
        readonly IDALInventory_Trans _IDALInventory_Trans;

        public InventoryTransactionApiController(IDALInventory_Trans DALInventory_Trans)
        {
            this._IDALInventory_Trans = DALInventory_Trans;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteItemWiseRateDetails(ItemWiseRateDetails obj)
        {
            string result = await _IDALInventory_Trans.InsertUpdateDeleteItemWiseRateDetails(obj).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetItemWiseRateDetails(ItemWiseRateDetails obj)
        {
            DataTable dt = await _IDALInventory_Trans.GetItemWiseRateDetails(obj).ConfigureAwait(false);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> VoucherMasterList(BALAccount obj)
        {
            DataTable dt = await _IDALInventory_Trans.VoucherMasterList(obj).ConfigureAwait(false);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetLedgerData(BALAccount obj)
       {
            DataTable dt = await _IDALInventory_Trans.GetLedgerData(obj).ConfigureAwait(false);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteMaterialInwardEntry(BMaterial obj)
        {
            string result = await _IDALInventory_Trans.InsertUpdateDeleteMaterialInwardEntry(obj).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetMaterialInwardEntry(BMaterial obj)
        {
            DataSet dt = await _IDALInventory_Trans.GetMaterialInwardEntry(obj).ConfigureAwait(false);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteIndentEntry(Indent obj)
        {
            string result = await _IDALInventory_Trans.InsertUpdateDeleteIndentEntry(obj).ConfigureAwait(false);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetIndentEntryData(Indent obj)
        {
            DataTable dt = await _IDALInventory_Trans.GetIndentEntryData(obj).ConfigureAwait(false);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteIndentApproval(IndentApproval obj)
        {
            string result = await _IDALInventory_Trans.InsertUpdateDeleteIndentApproval(obj).ConfigureAwait(false);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetIndentEntryDetailforApproval(Indent obj)
        {
            DataTable dt = await _IDALInventory_Trans.GetIndentEntryDetailforApproval(obj).ConfigureAwait(false);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetIndentVoucher(Indent obj)
        {
            DataTable dt = await _IDALInventory_Trans.GetIndentVoucher(obj).ConfigureAwait(false);
            return dt;
        }
    }
}

//GetIndentVoucher
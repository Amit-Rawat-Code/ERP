using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IDALInventory_Trans
    {
        #region Item Wise Rate Details
        Task<string> InsertUpdateDeleteItemWiseRateDetails(ItemWiseRateDetails obj);
        Task<DataTable> GetItemWiseRateDetails(ItemWiseRateDetails obj);
        #endregion
        #region Material Inward Entry
        Task<DataTable> VoucherMasterList(BALAccount obj);
        Task<DataTable> GetLedgerData(BALAccount obj);
        Task<string> InsertUpdateDeleteMaterialInwardEntry(BMaterial obj);
        Task<DataSet> GetMaterialInwardEntry(BMaterial obj);
        #endregion
        #region Indent Entry
        Task<string> InsertUpdateDeleteIndentEntry(Indent obj);
        Task<DataTable> GetIndentEntryData(Indent obj);
        Task<DataTable> GetEmployeewiseDepartments(Indent obj);
        Task<DataTable> GetStockDetialByItemCode(Indent obj);
        #endregion
        #region Indent Approval
        Task<string> InsertUpdateDeleteIndentApproval(IndentApproval obj);
        Task<DataTable> GetIndentEntryDetailforApproval(Indent obj);
        Task<DataTable> GetIndentVoucher(Indent obj);
        #endregion
    }

}

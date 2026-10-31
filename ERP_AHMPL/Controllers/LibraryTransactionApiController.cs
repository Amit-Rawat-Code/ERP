using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;

namespace SEF.Controllers
{
    public class LibraryTransactionApiController : ApiController
    {
        #region Book Entry
        [HttpPost]
        public async Task<DataTable> GetVoucherTypeLib(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetVoucherTypeLib(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetVoucherNoLibList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetVoucherNoLibList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetVenderLib(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetVenderLib(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetBookDetailLib(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetBookDetailLib(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetBookEntryList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetBookEntryList(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteBookEntry(BALLibrary obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBookEntry(obj);
            return result;
        }

        #endregion
        #region Book Stock
        [HttpPost]
        public async Task<DataSet> GetBookStockList(BALLibrary obj)
        {
            DataSet ds = await DLL.dal.GetBookStockList(obj);
            return ds;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteBookStock(BookStock obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBookStock(obj);
            return result;
        }
        public async Task<DataTable> GetBinLibList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetBinLibList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetBillDetailLib(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetBillDetailLib(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetBillNoList(BALLibrary obj)
        {
            DataTable dt = await DLL.dal.GetBillNoList(obj);
            return dt;
        }
        #endregion

        #region Book Issue Entry
        [HttpPost]
        public async Task<string> InsertUpdateDeleteBookIssueEntry(BookIssueEntry obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBookIssueEntry(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetBookIssueEntryList(BookIssueEntry obj)
        {
            DataTable dt = await DLL.dal.GetBookIssueEntryList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetAccessionIDLib(BookIssueEntry obj)
        {
            DataTable dt = await DLL.dal.GetAccessionIDLib(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetStudentListLib(BookIssueEntry obj)
        {
            DataTable dt = await DLL.dal.GetStudentListLib(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> SearchEmployees(EmployeeDetails obj)
        {
            DataTable dt = await DLL.dal.SearchEmployees(obj);
            return dt;
        }

        #endregion

        #region Book Return Entry
        [HttpPost]
        public async Task<string> InsertUpdateDeleteBookReturnEntry(BookReturnEntry obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBookReturnEntry(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetBookReturnEntryList(BookReturnEntry obj)
        {
            DataTable dt = await DLL.dal.GetBookReturnEntryList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetAccessionIDIssueList(BookReturnEntry obj)
        {
            DataTable dt = await DLL.dal.GetAccessionIDIssueList(obj);
            return dt;
        }

        #endregion

        #region Binding Issue Entry
        [HttpPost]
        public async Task<string> InsertUpdateDeleteBindingIssueEntry(BindingIssueEntry obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBindingIssueEntry(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetBindingIssueEntryList(BindingIssueEntry obj)
        {
            DataSet ds = await DLL.dal.GetBindingIssueEntryList(obj);
            return ds;
        }
        [HttpPost]
        public async Task<DataTable> GetBinderList(BindingIssueEntry obj)
        {
            DataTable dt = await DLL.dal.GetBinderList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetAccessionIDList(BindingIssueEntry obj)
        {
            DataTable dt = await DLL.dal.GetAccessionIDList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetBindingTypeList(BindingIssueEntry obj)
        {
            DataTable dt = await DLL.dal.GetBindingTypeList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetEditAccessionIDList(BindingIssueEntry obj)
        {
            DataTable dt = await DLL.dal.GetEditAccessionIDList(obj);
            return dt;
        }
        #endregion

        #region Binding Return Entry
        [HttpPost]
        public async Task<string> InsertUpdateDeleteBindingReturnEntry(BindingIssueEntry obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBindingReturnEntry(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetBindingReturnEntryList(BindingIssueEntry obj)
        {
            DataSet ds = await DLL.dal.GetBindingReturnEntryList(obj);
            return ds;
        }
        [HttpPost]

        public async Task<DataTable> GetIssueNoList(BindingIssueEntry obj)
        {
            DataTable dt = await DLL.dal.GetIssueNoList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataSet> GetIssueNoDetails(BindingIssueEntry obj)
        {
            DataSet ds = await DLL.dal.GetIssueNoDetails(obj);
            return ds;
        }
        #endregion

        #region Write OFF Entry
        [HttpPost]
        public async Task<string> InsertUpdateDeleteWriteOffEntry(WriteOffEntry obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteWriteOffEntry(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetWriteOffEntryList(WriteOffEntry obj)
        {
            DataTable dt = await DLL.dal.GetWriteOffEntryList(obj);
            return dt;
        }
        [HttpPost]

        public async Task<DataTable> GetAccessionID(WriteOffEntry obj)
        {
            DataTable dt = await DLL.dal.GetAccessionID(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetWriteOffType(WriteOffEntry obj)
        {
            DataTable dt = await DLL.dal.GetWriteOffType(obj);
            return dt;
        }
        #endregion

        #region Book Stock
        [HttpPost]
        public async Task<DataSet> GetBookStockListOpening(BALLibrary obj)
        {
            DataSet ds = await DLL.dal.GetBookStockListOpening(obj);
            return ds;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteBookStockOpening(BookStock obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBookStockOpening(obj);
            return result;
        }
        #endregion
    }
}

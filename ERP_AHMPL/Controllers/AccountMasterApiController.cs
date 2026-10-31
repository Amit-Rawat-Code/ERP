using BAL;
using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class AccountMasterApiController : ApiController
    {
        
            
        [HttpPost]
        public async Task<DataTable> GetMainGroup(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetMainGroup(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetNature(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetNature(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetLedgerCode(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedger(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetTDSLedgers(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedger(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetTDSNature(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedger(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteLedgerGroup(BALAccount obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteLedgerGroup(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetLedgerGroup(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedgerGroup(obj);
            return dt;
        }
        //[HttpPost]
        //public async Task<string> InsertUpdateDeleteLedger(BALAccount obj)
        //{
        //    obj.IsGlobalLedger = "false";
        //    string result = await DLL.dal.InsertUpdateDeleteLedger(obj);
        //    return result;
        //}
        //[HttpPost]
        //public async Task<string> InsertUpdateDeleteLedgerGlobal(BALAccount obj)
        //{
        //    obj.IsGlobalLedger = "true";
        //    string result = await DLL.dal.InsertUpdateDeleteLedger(obj);
        //    return result;
        //}
        //[HttpPost]
        //public async Task<DataTable> GetLedgerRelationshipwise(BALAccount obj)
        //{
        //    obj.Action = 4;
        //    obj.IsGlobalLedger = "false";
        //    DataTable dt = await DLL.dal.GetLedger(obj);
        //    return dt;
        //}
        [HttpPost]
        public async Task<DataTable> GetLedger(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetLedger(obj);
            return dt;
        }
        //[HttpPost]
        //public async Task<DataTable> GetLedgerGlobal(BALAccount obj)
        //{
        //    obj.Action = 6;
        //    obj.IsGlobalLedger = "true";
        //    DataTable dt = await DLL.dal.GetLedger(obj);
        //    return dt;
        //}
        //[HttpPost]
        //public async Task<DataTable> GetGlobalLedgerSchools(BALAccount obj)
        //{
        //    obj.Action = 23;
        //    DataTable dt = await DLL.dal.GetGlobalLedgerSchools(obj);
        //    return dt;
        //}
        [HttpPost]
        public async Task<string> InsertUpdateDeleteTDSSection(BALAccount obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTDSSection(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetTDSSection(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetTDSSections(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteTDSDeductee(BALAccount obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTDSDeductee(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetTDSDeductee(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetTDSDeductees(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteTDSCategory(BALAccount obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTDSCategory(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetTDSCategory(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetTDSCategorys(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteVoucherNarration(BALAccount obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteVoucherNarration(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetVoucherNarration(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetVoucherNarrations(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteHOSOLedgerMapping(BALAccount obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteHOSOLedgerMapping(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetHOSOLedger(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetHOSOLedger(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> VoucherMasterList(BALAccount obj)
        {
            DataTable dt = await DLL.dal.VoucherMasterList(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetVoucherNarrations(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetVoucherNarrations(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetVoucherKeys(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetVoucherKeys(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetRuningBalance(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetRuningBalance(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetAccountName(BALAccount obj)
        {
            DataTable dt = await DLL.dal.GetAccountName(obj);
            return dt;
        }

        //[HttpPost]
        //public async Task<string> InsertUpdateDeleteLedger_Temp(BALAccount obj)
        //{
        //    string result = await DLL.dal.InsertUpdateDeleteLedger_Temp(obj);
        //    return result;
        //}

        //[HttpPost]
        //public async Task<DataTable> GetLedger_Temp(BALAccount obj)
        //{
        //    DataTable dt = await DLL.dal.GetLedger_Temp(obj);
        //    return dt;
        //}
        [HttpPost]
        public async Task<DataTable> Get_GlobalLedgerinTempLedgerMaster(BALAccount obj)
        {
            DataTable dt = await DLL.dal.Get_GlobalLedgerinTempLedgerMaster(obj);
            return dt;
        }
    }
}
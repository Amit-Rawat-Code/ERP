using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using BAL;
using DAL;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SEF.Controllers
{
    public class FeeTransactionApiController : ApiController
    {
        #region Adm FeeDeposit
        [HttpPost]
        public async Task<string> InsertUpdateDeleteAdmFeeDeposit(BALFeeDeposit obj)
        {
            if(obj.Action ==1 || obj.Action == 9 || obj.Action == 2 || obj.Action == 10)
            {
                if(string.IsNullOrEmpty(obj.TransID))
                {
                    if (obj.EntryMode == "School" && obj.PayMode == "Cash")
                        obj.Action = 1;
                    else
                        obj.Action = 9;
                }
                else
                {
                    if(!string.IsNullOrEmpty(obj.ClngDate))
                    {
                        obj.Action = 2;
                       
                    }
                    else
                    {
                        if (obj.EntryMode == "School" && obj.PayMode == "Cash")
                            obj.Action = 2;
                        else
                            obj.Action = 10;
                    }
                    
                }

            }

            string result = await DLL.dal.InsertUpdateDeleteAdmFeeDeposit(obj);
            return result;
        }       
        [HttpPost]
        public async Task<DataTable> GetNewAdmissionStudents(BALFeeDeposit obj)
        {
            DataTable dt = await DLL.dal.GetNewAdmissionStudents(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetClassWiseFeeStructure(BALFeeDeposit obj)
        {
            DataTable dt = await DLL.dal.GetClassWiseFeeStructure(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataSet> GetAdmFeeDeposit(BALFeeDeposit obj)
        {
            DataSet ds = await DLL.dal.GetAdmFeeDeposit(obj);

            return ds;
        }

        #endregion

        #region FeeDeposit
        [HttpPost]
        public async Task<string> InsertUpdateDeleteFeeDeposit(BALFeeDeposit obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteFeeDeposit(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetStudentWiseFeeStructure(BALFeeDeposit obj)
        {
            DataSet ds = await DLL.dal.GetStudentWiseFeeStructure(obj);          
            return ds;
        }

        [HttpPost]
        public async Task<StudentFeeDetails> MGetStudentWiseFeeStructure(BALFeeDeposit obj)
        {
            StudentFeeDetails ReturnObj = new StudentFeeDetails();
            DataSet ds = await DLL.dal.GetStudentWiseFeeStructure(obj);
            if (ds.Tables.Count > 1)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    List<FeeInstallment> FeeInstallment = new List<FeeInstallment>();
                    FeeInstallment = (from DataRow dr in ds.Tables[0].Rows
                                         select new FeeInstallment()
                                         {   Chk = dr["chk"] != null && Convert.ToBoolean(dr["chk"]),
                                             SrNo = dr["rno"]?.ToString(),
                                             StudentCode = dr["StudentCode"]?.ToString(),
                                             InstallmentCode = dr["InstallmentCode"]?.ToString(),
                                             InstallmentName = dr["InstallmentName"]?.ToString(),
                                             FeeHeadDetails = JsonConvert.DeserializeObject<List<FeeHeadDetails>>(dr["FeeHeadDetails"].ToString()),
                                             DueStatus = dr["DueStatus"]?.ToString(),
                                             DueDate = dr["DueDate"]?.ToString(),
                                             PayableAmt = dr["PayableAmt"]?.ToString(),
                                             Paid = dr["Paid"]?.ToString(),
                                             NetPayable = dr["NetPayable"]?.ToString()
                                         }).ToList();
                    ReturnObj.FeeInstallment = FeeInstallment;
                    ReturnObj.FeeStructure = ds.Tables[1];
                    ReturnObj.FeeDues = ds.Tables[2];
                    ReturnObj.FeeDepositHistory = ds.Tables[3];
                }
            }
            return ReturnObj;
        }
        [HttpPost]
        public async Task<DataSet> GetFeeDeposit(BALFeeDeposit obj)
        {
            DataSet ds = await DLL.dal.GetFeeDeposit(obj);

            return ds;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteFeeDueVoucher(BALFeeDueVoucher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteFeeDueVoucher(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetFeeDueVoucher(BALFeeDueVoucher obj)
        {
            DataTable dt = await DLL.dal.GetFeeDueVoucher(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetDueInstallment(BALFeeDeposit obj)
        {
            DataTable dt = await DLL.dal.GetDueInstallment(obj);

            return dt;
        }

        #endregion
        [HttpPost]
        public async Task<DataTable> GetFeeReceipt(BALFeeDeposit obj)
        {
            DataTable dt = await DLL.dal.GetFeeReceipt(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetFeeReceiptDetails(BALFeeDeposit obj)
        {
            DataTable dt = await DLL.dal.GetFeeReceiptDetails(obj);

            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteFeesReceiptCancellation(FeesReceiptCancellation obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteFeesReceiptCancellation(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetFeesReceiptCancellation(FeesReceiptCancellation obj)
        {
            DataTable dt = await DLL.dal.GetFeesReceiptCancellation(obj);

            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteStudentFeeAdjustment(BALFeeDeposit obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteStudentFeeAdjustment(obj);
            return result;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteTransportFeeDueVoucher(BALFeeDueVoucher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTransportFeeDueVoucher(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetTransportFeeDueVoucher(BALFeeDueVoucher obj)
        {
            DataTable dt = await DLL.dal.GetTransportFeeDueVoucher(obj);

            return dt;
        }
    }
}
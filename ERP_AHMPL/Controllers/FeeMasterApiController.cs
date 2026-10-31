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

namespace SEF.Controllers
{
    public class FeeMasterApiController : ApiController
    {
        #region FeeStructure Group Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteFeeStructureGroupMaster(BALFeeStructureGroup obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteFeeStructureGroupMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetFeeStructureGroupMaster(BALFeeStructureGroup obj)
        {
            DataTable dt = await DLL.dal.GetFeeStructureGroupMaster(obj);

            return dt;
        }

        #endregion

        #region Fee Head Master

        [HttpPost]
        public async Task<string> InsertUpdateDeleteFeeHeadMaster(BALFeeHead obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteFeeHeadMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetFeeHeadMaster(BALFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetFeeHeadMaster(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetMonths(BALFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetMonths(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetFrequency(BALFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetFrequency(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetUnacruedLedgerAc(BALFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetUnacruedLedgerAc(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetCorpusLedgerAc(BALFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetCorpusLedgerAc(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetDepositAc(BALFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetDepositAc(obj);

            return dt;
        }
        #endregion

        #region Class Fee Structure Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteClassFeeStructureMaster(BALClassFeeStructure obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassFeeStructureMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetClassFeeStructureMaster(BALClassFeeStructure obj)
        {
            DataSet ds = await DLL.dal.GetClassFeeStructureMaster(obj);

            return ds;
        }
        [HttpPost]
        public async Task<DataTable> GetFeeStructureGroupDetail(BALClassFeeStructure obj)
        {
            DataTable dt = await DLL.dal.GetFeeStructureGroupDetail(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetFeeHeadDetail(BALClassFeeStructure obj)
        {
            DataTable dt = await DLL.dal.GetFeeHeadDetail(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetDueMonthList(BALClassFeeStructure obj)
        {
            DataTable dt = await DLL.dal.GetDueMonthList(obj);
            return dt;
        }


        #endregion

        #region Concession Head Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteConcessionHeadMaster(BALConcession obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteConcessionHeadMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetConcessionHeadMaster(BALConcession obj)
        {
            DataTable dt = await DLL.dal.GetConcessionHeadMaster(obj);

            return dt;
        }
        #endregion

        #region Concession Fee Head Mapping Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteConcessionFeeHeadMapMaster(BALConcessionFeeHeadMap obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteConcessionFeeHeadMapMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetConcessionFeeHeadMapMaster(BALConcessionFeeHeadMap obj)
        {
            DataTable ds = await DLL.dal.GetConcessionFeeHeadMapMaster(obj);

            return ds;
        }
        [HttpPost]
        public async Task<DataTable> GetConcessionHead(BALConcessionFeeHeadMap obj)
        {
            DataTable dt = await DLL.dal.GetConcessionHead(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataSet> GetExistsConcessionHead(BALConcessionFeeHeadMap obj)
        {
            DataSet ds = await DLL.dal.GetExistsConcessionHead(obj);
            return ds;
        }
        #endregion

        #region Installment Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteInstallmentMaster(BALInstallmentMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteInstallmentMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetInstallmentMaster(BALInstallmentMaster obj)
        {
            DataTable dt = await DLL.dal.GetInstallmentMaster(obj);

            return dt;
        }

        #endregion
        #region Installment Mapping Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteInstallmentMappingMaster(BALInstallmentMappingMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteInstallmentMappingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetInstallmentMappingMaster(BALInstallmentMappingMaster obj)
        {
            DataTable dt = await DLL.dal.GetInstallmentMappingMaster(obj);

            return dt;
        }
        [HttpPost]
        public async Task<DataSet> GetFeeStructureOnInstallmentMapping(BALInstallmentMappingMaster obj)
        {
            DataSet ds = await DLL.dal.GetFeeStructureOnInstallmentMapping(obj);

            return ds;
        }

        #endregion

        #region Concession On Fee Structure
        [HttpPost]
        public async Task<string> InsertUpdateDeleteConcessionOnFeeStructure(BALConcessionOnFeeStructure obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteConcessionOnFeeStructure(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetConcessionOnFeeStructureMaster(BALConcessionOnFeeStructure obj)
        {
            DataTable dt = await DLL.dal.GetConcessionOnFeeStructureMaster(obj);

            return dt;
        }

        #endregion
        [HttpPost]
        public async Task<string> InsertUpdateDeleteStudentConcessionDetails(BALFeeDeposit obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteStudentConcessionDetails(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetStudentConcessionDetails(BALFeeDeposit obj)
        {
            DataSet ds = await DLL.dal.GetStudentConcessionDetails(obj);

            return ds;
        }

        [HttpPost]
        public async Task<DataSet> GetStudentForFeeAdjustment(BALFeeDeposit obj)
        {
            DataSet dt = await DLL.dal.GetStudentForFeeAdjustment(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertImages() /*BALFeeDeposit obj*/
        {
            try
            {
                FeesDetails obj1 = new FeesDetails();

                string UploadPath = "~/Uploads/Site/Student/";
                string rootpath = System.Web.Hosting.HostingEnvironment.MapPath(UploadPath);

                System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
                var provider = new MultipartFormDataStreamProvider(rootpath);
                var data = await Request.Content.ReadAsMultipartAsync(provider);
                var model = data.FormData["model"];
                obj1 = JsonConvert.DeserializeObject<FeesDetails>(model);

                List<FeesAttachments> listobj = new List<FeesAttachments>();
                listobj = JsonConvert.DeserializeObject<List<FeesAttachments>>(obj1.FileJson);
                FeesAttachments feeobj;

                for (int i = 0; i <= hfc.Count - 1; i++)
                {
                    feeobj = new FeesAttachments();
                    System.Web.HttpPostedFile hpf = hfc[i];
                    if (hpf.ContentLength > 0)
                    {
                        string fname = System.IO.Path.GetFileName(hpf.FileName);
                        var File_Extenstion = System.IO.Path.GetExtension(hpf.FileName);
                        string NewFileName = "";
                        NewFileName += DateTime.Now.Year.ToString();
                        NewFileName += DateTime.Now.Month.ToString();
                        NewFileName += DateTime.Now.Day.ToString();
                        NewFileName += DateTime.Now.Hour.ToString();
                        NewFileName += DateTime.Now.Minute.ToString();
                        NewFileName += DateTime.Now.Second.ToString();
                        NewFileName += DateTime.Now.Millisecond.ToString();

                        string abc = UploadPath + obj1.StudentCode + '_' + NewFileName + File_Extenstion;
                        var ServerSavepath = System.IO.Path.Combine(System.Web.HttpContext.Current.Server.MapPath(abc));
                        hpf.SaveAs(ServerSavepath);
                        feeobj.FilePath = abc;
                        feeobj.FileName = obj1.StudentCode + '_' + NewFileName + File_Extenstion;
                        listobj.Add(feeobj);
                    }
                }
                obj1.FileJson = JsonConvert.SerializeObject(listobj);

                string result1 = await DLL.dal.InsertImages(obj1);
                return result1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        public async Task<DataTable> GetConcessionDocs(BALFeeDeposit obj)
        {
            DataTable dt = await DLL.dal.GetConcessionDocs(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetFeeDepositDetailsFromStudentFeeStructureForm(BALFeeDeposit obj)
        {
            DataTable dt = await DLL.dal.GetFeeDepositDetailsFromStudentFeeStructureForm(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> DeleteRecordAfterSAdminConfirm(BALAddmission obj)
        {
            obj.Action = 5;
            string result = await DLL.dal.InsertUpdateDeleteStudentFeeStructureDetails(obj);
            return result;
        }
    }
}
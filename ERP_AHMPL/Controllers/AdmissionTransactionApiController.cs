using DAL;
using BAL;
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
    public class AdmissionTransactionApiController : ApiController
    {
        #region Send SMS & Email
        [HttpPost]
        public async Task<DataTable> GetBranch(BALSendSMSEmailSchedule obj)
        {
            DataTable dt = await DLL.dal.GetBranch(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetStudentRecord(BALSendSMSEmailSchedule obj)
        {
            DataTable dt = await DLL.dal.GetStudentRecord(obj);
            return dt;
        }  
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSendSMSEmailDetail(BALSendSMSEmailSchedule obj)
        {
            
            DataTable dt = await DLL.dal.InsertUpdateDeleteSendSMSEmailDetail(obj);
            string response= DLL.dal.SendMail(dt);
            return response;
        }
        #endregion

        [HttpPost]
        public async Task<string> InsertUpdateDeleteClassMeritListPrePrimary(BALBatchTransaction obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassMeritListPrePrimary(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataSet> GetClassMeritListPrePrimary(BALBatchTransaction obj)
        {
            DataSet ds = await DLL.dal.GetClassMeritListPrePrimary(obj);
            return ds;
        }

        #region Entrance Marks Entry - Primary/Junior

        [HttpPost]
        public async Task<string> InsertUpdateDeleteEntranceMarksEntryPrimaryJunior(BALEntryMarksEntryTransaction obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteEntranceMarksEntryPrimaryJunior(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataSet> GetEntranceMarksEntryPrimaryJunior(BALEntryMarksEntryTransaction obj)
        {
            DataSet dt = await DLL.dal.GetEntranceMarksEntryPrimaryJunior(obj);
            return dt;
        }
        #endregion

        #region Admission Form- School 

        [HttpPost]
        public async Task<DataTable> GetStudentDetails(BALSchoolAddmission obj)
        {
            DataTable result = await DLL.dal.GetStudentDetails(obj);
            return result;
        }
        [HttpPost]
        //public async Task<string> InsertUpdateDeleteAdmissionFormDetails(BALSchoolAddmission obj)
        //{
        //    string result = await DLL.dal.InsertUpdateDeleteAdmissionFormDetails(obj);
        //    return result;
        //}

        //[HttpPost]
        //public async Task<DataTable> GetAdmissionFormDetails(BALSchoolAddmission obj)
        //{
        //    DataTable result = await DLL.dal.GetAdmissionFormDetails(obj);
        //    return result;
        //}

        #endregion

        #region Entrance Marks Entry - Primary/Junior
        public async Task<string> InsertUpdateDeleteClassMeritListPrimaryJr(BALBatchTransaction obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassMeritListPrimaryJr(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetClassMeritListPrePrimaryJr(BALBatchTransaction obj)
        {
            DataTable dt = await DLL.dal.GetClassMeritListPrePrimaryJr(obj);
            return dt;
        }
        #endregion

        #region Send SMS & Email For PrePrimary Merit List
        
        [HttpPost]
        public async Task<DataTable> GetStudentRecordForMeritList(BALSendSMSEmailSchedule obj)
        {
            DataTable dt = await DLL.dal.GetStudentRecordForMeritList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSendSMSEmailForMeritListDetail(BALSendSMSEmailSchedule obj)
        {

            DataTable dt = await DLL.dal.InsertUpdateDeleteSendSMSEmailForMeritListDetail(obj);
            string response = DLL.dal.SendMail(dt);
            return response;
        }
        #endregion

        #region Send SMS & Email For Junior Merit List

        [HttpPost]
        public async Task<DataTable> GetStudentRecordEntranceMeritList(BALSendSMSEmailSchedule obj)
        {
            DataTable dt = await DLL.dal.GetStudentRecordEntranceMeritList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSendSMSEmailForEntranceMeritList(BALSendSMSEmailSchedule obj)
        {

            DataTable dt = await DLL.dal.InsertUpdateDeleteSendSMSEmailForEntranceMeritList(obj);
            string response = DLL.dal.SendMail(dt);
            return response;
        }
        #endregion

        [HttpPost]
        public async Task<string> InsertUpdateDeleteStudentFeeStructureDetails(BALAddmission obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteStudentFeeStructureDetails(obj);
            return result;
        }
         #region Transfer Certificate

        [HttpPost]
        public async Task<string> InsertUpdateDeleteTransferCertificateDetails(BALSchoolAddmission obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTransferCertificateDetails(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetStudentDetailsForTransfer(BALSchoolAddmission obj)
        {
            DataTable result = await DLL.dal.GetStudentDetailsForTransfer(obj);
            return result;
        }
        #endregion

 	    #region Report Card printing
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetStudentDetailsForReportCard(BALSchoolAddmission obj)
        {
            DataTable result = await DLL.dal.GetStudentDetailsForReportCard(obj);
            return result;
        }
        #endregion
        #region  Get Student Admission No By Class Section
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetStudentAdmissionNoByClassSection(BALSchoolAddmission obj)
        {
            DataTable result = await DLL.dal.GetStudentAdmissionNoByClassSection(obj);
            return result;
        }
        [HttpPost]
        public async Task<string> UpdateStudentAdmissionNo(BALSchoolAddmission obj)
        {
            string result = await DLL.dal.UpdateStudentAdmissionNo(obj);
            return result;
        }
        #endregion
   #region Student Details Updation
        [System.Web.Http.HttpPost]
        public async Task<string> UpdateStudentDetails(BALSchoolAddmission obj)
        {
            string result = await DLL.dal.UpdateStudentDetails(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetStudentDetailsForUpdation(BALSchoolAddmission obj)
        {
            DataTable result = await DLL.dal.GetStudentDetailsForUpdation(obj);
            return result;
        }
        #endregion
    }
}
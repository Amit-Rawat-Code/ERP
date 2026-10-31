using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class GblMasterApiController : ApiController
    {
        #region Course Master
        // Perform DML Operation 

        [HttpPost]
        public async Task<string> InsertUpdateDeleteCourseMaster(BALGlobalMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCourseMaster(obj);
            return result;

        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetCourseMaster(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetCourseMaster(obj);
            return dt;
        
        }

        #endregion

        [HttpPost]
        public async Task<string> InsertUpdateDeleteClassMaster(BALGlobalMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassMaster(obj);
            return result;

        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetClasses(BALGblClassMaster obj)
        {
            DataTable dt = await DLL.dal.GetClasses(obj);
            return dt;

        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteStreamMaster(BALGlobalMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteStreamMaster(obj);
            return result;

        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetStreamMaster(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetStreamMaster(obj);
            return dt;

        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteSectionMaster(BALGlobalMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSectionMaster(obj);
            return result;

        }
        [HttpPost]
        public async Task<DataTable> GetSections(BALGblSectionMaster obj)
        {
            DataTable dt = await DLL.dal.GetSections(obj);
            return dt;

        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeCourseMaster(BALGlobalMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeCourseMaster(obj);
            return result;

        }
        [HttpPost]
        public async Task<DataTable> GetCollegeCourseMaster(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetCollegeCourseMaster(obj);
            return dt;

        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeBranchMaster(BALGlobalMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeBranchMaster(obj);
            return result;

        }
        [HttpPost]
        public async Task<DataTable> GetCollegeBranchMaster(BALGblCollegeBranchMaster obj)
        {
            DataTable dt = await DLL.dal.GetCollegeBranch(obj);
            return dt;

        }
      
        [HttpPost]
        public async Task<DataTable> GetSubjectGroupMaster(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectGroupMaster(obj);
            return dt;

        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeSemesterMaster(BALGlobalMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeSemesterMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetSemesterMaster(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetSemesterMaster(obj);
            return dt;

        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSessionMaster(BALSessionMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSessionMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetSessionMaster(BALSessionMaster obj)
        {
            DataTable dt = await DLL.dal.GetAllYears(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteFinancialYearMaster(BALFinancialYearMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteFinancialYearMaster(obj);
            return result;
        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetFinancialYearMaster(BALFinancialYearMaster obj)
        {
            DataTable dt = await DLL.dal.GetFinancialYearMaster(obj);
            return dt;
        }

        [HttpPost]
        public async Task<string> InsertUpdateDeleteBranchMaster(BALGlobalMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBranchMaster(obj);
            return result;

        }
        // Perform Select Operation 
        [HttpPost]
        public async Task<DataTable> GetBranchMaster(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetBranchMaster(obj);
            return dt;

        }
        #region Get Dynamic Report Header
        [HttpPost]
        public async Task<DataTable> GetReportHeader(ReportHeader obj)
        {
            DataTable dt = await DLL.dal.GetReportHeader(obj);
            return dt;
        }
        #endregion

        [HttpPost]
        public async Task<DataTable> GetAllYear(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetAllYear(obj);
            return dt;
        }
    }
}

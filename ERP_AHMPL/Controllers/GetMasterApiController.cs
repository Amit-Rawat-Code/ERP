using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class GetMasterApiController : ApiController
    {
        // POST api/<controller>
        [HttpPost]
        public async Task<DataTable> GetCountry(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetCountry(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetState(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetState(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetCity(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetCity(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetCityArea(BALEnquiryModule obj)
        {
            DataTable dt = await DLL.dal.GetCityAreaMaster(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetEnquiryType(BALEnquiryModule obj)
        {
            DataTable dt = await DLL.dal.GetEnquiryTypeMaster(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetEnquirySource(BALEnquiryModule obj)
        {
            DataTable dt = await DLL.dal.GetEnquirySourceMaster(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetClass(BALGblClassMaster obj)
        {
            DataTable dt = await DLL.dal.GetClasses(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetPeriods(BALGblClassMaster obj)
        {
            DataTable dt = await DLL.dal.GetClasses(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetClassWisePeriods(BALGblClassMaster obj)
        {
            DataTable dt = await DLL.dal.GetClassWisePeriods(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetSection(BALGblSectionMaster obj)
        {
            DataTable dt = await DLL.dal.GetSections(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetBranch(BALGblBranchMaster obj)
        {
            DataTable dt = await DLL.dal.GetBranches(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetStream(BALGblStreamMaster obj)
        {
            DataTable dt = await DLL.dal.GetStreams(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetSessionMinMaxDate(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetSessionMinMaxDate(obj);
            return dt;

        }
        [HttpPost]
        public async Task<DataTable> GetSessionMonths(BALSessionMaster obj)
        {
            DataTable dt = await DLL.dal.GetSession(obj);
            return dt;
           
        }
        [HttpPost]
        public async Task<DataTable> GetCollegeCourse(BALGblCollegeCourseMaster obj)
        {
            DataTable dt = await DLL.dal.GetCollegeCourse(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetCollegeBranch(BALGblCollegeBranchMaster obj)
        {
            DataTable dt = await DLL.dal.GetCollegeBranch(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetEnquiryCategory(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetEnquiryCategory(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetGroup(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetGroup(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetSociety(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetSociety(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetSchool(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetSchool(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetBranchSides(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetBranchMaster(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetSession(BALSessionMaster obj)
        {  
            DataTable dt = await DLL.dal.GetSession(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetRegistrationFeeHead(BALRegistrationFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetRegistrationFeeHead(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetCategory(BALRegistrationFeeHead obj)
        {
            DataTable dt = await DLL.dal.GetCategories(obj);
            return dt;
        }

        

        [HttpPost]
        public async Task<DataTable> GetBoards(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetBoards(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetPayModes(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetPayModes(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetUserSchoolBranch(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetUserSchoolBranch(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetNationality(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetNationality(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetMotherTongue(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetMotherTongue(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetDocuments(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetDocuments(obj);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetMerites(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetMerites(obj);
            return dt;
        }
             
       
        [HttpPost]
        public async Task<DataTable> GetDDLs(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetDDLs(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetDesignationType(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetDesignationType(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetDepartments(Department obj)
        {
            DataTable dt = await DLL.dal.GetDepartmentMaster(obj);
            return dt;

        }
        [HttpPost]
        public async Task<DataTable> GetDesignations(Designation obj)
        {
            DataTable dt = await DLL.dal.GetDesignationMaster(obj);
            return dt;

        }
        [HttpPost]
        public async Task<DataTable> GetGrades(Grade obj)
        {
            DataTable dt = await DLL.dal.GetGradeMaster(obj);
            return dt;

        }
        [HttpPost]
        public async Task<DataTable> GetSubjectListUsingLoginId(BALGlobalMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectListUsingLoginId(obj);
            return dt;

        }
        [HttpPost]
        //public async Task<DataSet> GetFinalStudents(BALSchoolAddmission obj)
        //{
        //    DataSet ds = await DLL.dal.GetFinalStudents(obj);
        //    return ds;

        //}
        #region Get All Class With Their Sections
        public async Task<DataTable> GetAllClassWithSection(BALMaster obj)
        {
            DataTable dt = await DLL.dal.GetAllClassWithSection(obj);
            return dt;
        }

        #endregion
    }
}

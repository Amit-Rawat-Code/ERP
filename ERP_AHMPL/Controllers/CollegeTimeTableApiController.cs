using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
namespace SEF.Controllers
{
    public class CollegeTimeTableApiController : ApiController
    {
        #region Subject Group Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSubjectGroupMaster(BALCollegeSubjectGroupMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSubjectGroupMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetSubjectGroupMaster(BALCollegeSubjectGroupMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectGroupMaster(obj);
            return dt;
        }

        #endregion 

        #region Subject Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSubjectMaster(BALCollegeSubjectMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSubjectMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetSubjectMaster(BALCollegeSubjectMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectMaster(obj);
            return dt;
        }
        #endregion

        #region Course Wise Subject Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCourseWiseSubjectMaster(BALCollegeCourseWiseSubjectMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCourseWiseSubjectMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetClassWiseSubjectMaster(BALCollegeCourseWiseSubjectMaster obj)
        {
            DataSet ds = await DLL.dal.GetCourseWiseSubjectMaster(obj);
            return ds;
        }

        [HttpPost]
        public async Task<DataTable> GetSubjectGroup(BALCollegeCourseWiseSubjectMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectGroup(obj);
            return dt;
        }
        
        #endregion

        #region Techer Setting 
        [HttpPost]
        public async Task<DataTable> GetEmployeeList(BALCollegeTeacherSetting obj)
        {
            DataTable dt = await DLL.dal.GetEmployeeList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteTeacherSettingMaster(BALCollegeTeacherSetting obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTeacherSettingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetTeacherSettingMaster(BALCollegeTeacherSetting obj)
        {
            DataTable dt = await DLL.dal.GetTeacherSettingMaster(obj);
            return dt;
        }
        #endregion

        #region Course Setting 
        [HttpPost]
        public async Task<DataTable> GetSemesterList(BALCollegeCourseSetting obj)
        {
            DataTable dt = await DLL.dal.GetSemesterList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCollegeCourseSettingMaster(BALCollegeCourseSetting obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCollegeCourseSettingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetCollegeCourseSettingMaster(BALCollegeCourseSetting obj)
        {
            DataTable dt = await DLL.dal.GetCollegeCourseSettingMaster(obj);
            return dt;
        }
        #endregion

        #region Shift Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteShiftMaster(BALCollegeShiftMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteShiftMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetShiftMaster(BALCollegeShiftMaster obj)
        {
            DataTable dt = await DLL.dal.GetShiftMaster(obj);
            return dt;
        }

        #endregion

        #region Shift Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteShiftCourseMappingMaster(BALCollegeShiftCourseMapping obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteShiftCourseMappingMaster(obj);
            return result;
        }
        
       [HttpPost]
        public async Task<DataTable> GetShiftCourseMapping(BALCollegeShiftCourseMapping obj)
        {
            DataTable dt = await DLL.dal.GetShiftCourseMapping(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetShift(BALCollegeShiftCourseMapping obj)
        {
            DataTable dt = await DLL.dal.GetShift(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetCourseWiseTotalStudent(BALCollegeShiftCourseMapping obj)
        {
            DataTable dt = await DLL.dal.GetCourseWiseTotalStudent(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetUnMappedStudent(BALCollegeShiftCourseMapping obj)
        {
            DataTable dt = await DLL.dal.GetUnMappedStudent(obj);
            return dt;
        }

        #endregion

        #region Shift And Periods Mapping Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteShiftPeriodMappingMaster(BALCollegeShiftPeriodMapping obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteShiftPeriodMappingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetShiftPeriodMappingMaster(BALCollegeShiftPeriodMapping obj)
        {
            DataSet ds = await DLL.dal.GetShiftPeriodMappingMaster(obj);
            return ds;
        }
        #endregion

        #region Define Course Teacher Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteDefineCourseTeacherMaster(BALCollegeDefineCourseTeacher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteDefineCourseTeacherMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetDefineCourseTeacherMaster(BALCollegeDefineCourseTeacher obj)
        {
            DataTable dt = await DLL.dal.GetDefineCourseTeacherMaster(obj);
            return dt;
        }
        #endregion

        #region Class Subject Mapping With Teacher Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCourseSubjectTeacherMaster(BALCollegeCourseSubjectWithTeacher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCourseSubjectTeacherMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetCourseSubjectTeacher(BALCollegeCourseSubjectWithTeacher obj)
        {
            DataTable dt = await DLL.dal.GetCourseSubjectTeacher(obj);
            return dt;
        }
        #endregion

        #region ClassWise Subject Priority Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteCourseWiseSubjectPriorityMaster(BALCollegeCourseWiseSubjectPriority obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCourseWiseSubjectPriorityMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetCourseWiseSubjectPriority(BALCollegeCourseWiseSubjectPriority obj)
        {
            DataTable dt = await DLL.dal.GetCourseWiseSubjectPriority(obj);
            return dt;
        }
        #endregion

        //#region Consecutive Subject Period Master    
        //[HttpPost]
        //public async Task<string> InsertUpdateDeleteConsecutiveSubjectPeriodMaster(BALConsecutiveSubjectPeriod obj)
        //{
        //    string result = await DLL.dal.InsertUpdateDeleteConsecutiveSubjectPeriodMaster(obj);
        //    return result;
        //}
        //[HttpPost]
        //public async Task<DataTable> GetConsecutiveSubjectPeriodMaster(BALConsecutiveSubjectPeriod obj)
        //{
        //    DataTable dt = await DLL.dal.GetConsecutiveSubjectPeriodMaster(obj);
        //    return dt;
        //}
        //#endregion
        #region Teacher Break Master   
        [HttpPost]
        public async Task<string> InsertUpdateDeleteTeacherBreakMaster(BALCollegeTeacherBreak obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTeacherBreakMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetSelectTeacherBreakMaster(BALCollegeTeacherBreak obj)
        {
            DataTable dt = await DLL.dal.GetSelectTeacherBreakMaster(obj);
            return dt;
        }
        #endregion

        #region Relative Optional Subject Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteRelativeOptionalSubjectMaster(BALCollegeRelativeOptionalSubject obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteRelativeOptionalSubjectMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetRelativeOptionalSubjectMaster(BALCollegeRelativeOptionalSubject obj)
        {
            DataTable dt = await DLL.dal.GetRelativeOptionalSubjectMaster(obj);
            return dt;
        }
        #endregion

        #region Subject Day Master  
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSubjectDaysMaster(BALCollegeSubjectDaysMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSubjectDaysMaster(obj);
            return result;            
        }
        [HttpPost]
        public async Task<DataTable> SelectSubjectDaysMaster(BALCollegeSubjectDaysMaster obj)
        {
            DataTable dt = await DLL.dal.SelectSubjectDaysMaster(obj);
            return dt;
        }
        #endregion
        #region Shift Wise Class Wise Periods Mapping    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteShiftWiseClassWisePeriodMappingMaster(BALCollegeShiftPeriodMapping obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteShiftWiseCourseWisePeriodMappingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetShiftWiseClassWisePeriodMappingMaster(BALCollegeShiftPeriodMapping obj)
        {
            DataTable dt = await DLL.dal.GetShiftWiseCourseWisePeriodMappingMaster(obj);
            return dt;
        }
        #endregion

        #region Resource Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteResourceMaster(BalCollegeResourceType obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteResourceMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetResourceMaster(BalCollegeResourceType obj)
        {
            DataTable dt = await DLL.dal.GetResourceMaster(obj);
            return dt;
        }
        #endregion
    }
}
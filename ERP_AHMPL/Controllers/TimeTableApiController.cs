using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
namespace SEF.Controllers
{
    public class TimeTableApiController : ApiController
    {
        #region Subject Group Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSubjectGroupMaster(BALSubjectGroupMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSubjectGroupMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetSubjectGroupMaster(BALSubjectGroupMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectGroupMaster(obj);
            return dt;
        }

        #endregion 

        #region Subject Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSubjectMaster(BALSubjectMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSubjectMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetSubjectMaster(BALSubjectMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectMaster(obj);
            return dt;
        }
        #endregion

        #region Class Wise Subject Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteClassWiseSubjectMaster(BALClassWiseSubjectMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassWiseSubjectMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetClassWiseSubjectMaster(BALClassWiseSubjectMaster obj)
        {
            DataSet ds = await DLL.dal.GetClassWiseSubjectMaster(obj);
            return ds;
        }

        [HttpPost]
        public async Task<DataTable> GetSubjectGroup(BALClassWiseSubjectMaster obj)
        {
            DataTable dt = await DLL.dal.GetSubjectGroup(obj);
            return dt;
        }
        
        #endregion

        #region Techer Setting 
        [HttpPost]
        public async Task<DataTable> GetEmployeeList(BALTeacherSetting obj)
        {
            DataTable dt = await DLL.dal.GetEmployeeList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteTeacherSettingMaster(BALTeacherSetting obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTeacherSettingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetTeacherSettingMaster(BALTeacherSetting obj)
        {
            DataTable dt = await DLL.dal.GetTeacherSettingMaster(obj);
            return dt;
        }
        #endregion

        #region Class Setting 
        [HttpPost]
        public async Task<DataTable> GetSectionList(BALClassSetting obj)
        {
            DataTable dt = await DLL.dal.GetSectionList(obj);
            return dt;
        }
        [HttpPost]
        public async Task<string> InsertUpdateDeleteClassSettingMaster(BALClassSetting obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassSettingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetClassSettingMaster(BALClassSetting obj)
        {
            DataTable dt = await DLL.dal.GetClassSettingMaster(obj);
            return dt;
        }
        #endregion

        #region Shift Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteShiftMaster(BALShiftMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteShiftMaster(obj);
            return result;
        }

        [HttpPost]
        public async Task<DataTable> GetShiftMaster(BALShiftMaster obj)
        {
            DataTable dt = await DLL.dal.GetShiftMaster(obj);
            return dt;
        }

        #endregion

        #region Shift Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteShiftClassMappingMaster(BALShiftClassMapping obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteShiftClassMappingMaster(obj);
            return result;
        }
        
       [HttpPost]
        public async Task<DataTable> GetShiftClassMapping(BALShiftClassMapping obj)
        {
            DataTable dt = await DLL.dal.GetShiftClassMapping(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetShift(BALShiftClassMapping obj)
        {
            DataTable dt = await DLL.dal.GetShift(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetClassWiseTotalStudent(BALShiftClassMapping obj)
        {
            DataTable dt = await DLL.dal.GetClassWiseTotalStudent(obj);
            return dt;
        }
        [HttpPost]
        public async Task<DataTable> GetUnMappedStudent(BALShiftClassMapping obj)
        {
            DataTable dt = await DLL.dal.GetUnMappedStudent(obj);
            return dt;
        }

        #endregion

        #region Shift And Periods Mapping Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteShiftPeriodMappingMaster(BALShiftPeriodMapping obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteShiftPeriodMappingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataSet> GetShiftPeriodMappingMaster(BALShiftPeriodMapping obj)
        {
            DataSet ds = await DLL.dal.GetShiftPeriodMappingMaster(obj);
            return ds;
        }
        #endregion

        #region Define Class Teacher Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteDefineClassTeacherMaster(BALDefineClassTeacher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteDefineClassTeacherMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetDefineClassTeacherMaster(BALDefineClassTeacher obj)
        {
            DataTable dt = await DLL.dal.GetDefineClassTeacherMaster(obj);
            return dt;
        }
        #endregion

        #region Class Subject Mapping With Teacher Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteClassSubjectTeacherMaster(BALClassSubjectWithTeacher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassSubjectTeacherMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetClassSubjectTeacher(BALClassSubjectWithTeacher obj)
        {
            DataTable dt = await DLL.dal.GetClassSubjectTeacher(obj);
            return dt;
        }
        #endregion

        #region ClassWise Subject Priority Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteClassWiseSubjectPriorityMaster(BALClassWiseSubjectPriority obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassWiseSubjectPriorityMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetClassWiseSubjectPriority(BALClassWiseSubjectPriority obj)
        {
            DataTable dt = await DLL.dal.GetClassWiseSubjectPriority(obj);
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
        public async Task<string> InsertUpdateDeleteTeacherBreakMaster(BALTeacherBreak obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTeacherBreakMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetSelectTeacherBreakMaster(BALTeacherBreak obj)
        {
            DataTable dt = await DLL.dal.GetSelectTeacherBreakMaster(obj);
            return dt;
        }
        #endregion

        #region Relative Optional Subject Master    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteRelativeOptionalSubjectMaster(BALRelativeOptionalSubject obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteRelativeOptionalSubjectMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetRelativeOptionalSubjectMaster(BALRelativeOptionalSubject obj)
        {
            DataTable dt = await DLL.dal.GetRelativeOptionalSubjectMaster(obj);
            return dt;
        }
        #endregion

        #region Subject Day Master  
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSubjectDaysMaster(BALSubjectDaysMaster obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSubjectDaysMaster(obj);
            return result;            
        }
        [HttpPost]
        public async Task<DataTable> SelectSubjectDaysMaster(BALSubjectDaysMaster obj)
        {
            DataTable dt = await DLL.dal.SelectSubjectDaysMaster(obj);
            return dt;
        }
        #endregion
        #region Shift Wise Class Wise Periods Mapping    
        [HttpPost]
        public async Task<string> InsertUpdateDeleteShiftWiseClassWisePeriodMappingMaster(BALShiftPeriodMapping obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteShiftWiseClassWisePeriodMappingMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetShiftWiseClassWisePeriodMappingMaster(BALShiftPeriodMapping obj)
        {
            DataTable dt = await DLL.dal.GetShiftWiseClassWisePeriodMappingMaster(obj);
            return dt;
        }
        #endregion

        #region Resource Master
        [HttpPost]
        public async Task<string> InsertUpdateDeleteResourceMaster(BalResourceType obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteResourceMaster(obj);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetResourceMaster(BalResourceType obj)
        {
            DataTable dt = await DLL.dal.GetResourceMaster(obj);
            return dt;
        }
        #endregion
    }
}
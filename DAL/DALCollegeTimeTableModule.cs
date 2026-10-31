using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using BAL;

namespace DAL
{
    public partial class DLL
    {
        #region Subject Group Master
        public async Task<string> InsertUpdateDeleteSubjectGroupMaster(BALCollegeSubjectGroupMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SubjectGroupName",obj.SubjectGroupName),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_CollegeSubjectGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectGroupMaster(BALCollegeSubjectGroupMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_CollegeSubjectGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Subject Master
        public async Task<DataTable> GetSubjectGroup(BALCollegeCourseWiseSubjectMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
                
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_CollegeSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteSubjectMaster(BALCollegeSubjectMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SubjectName",obj.SubjectName),
                new SqlParameter("@SubjectGroupCode",obj.SubjectGroupCode),
                new SqlParameter("@ColorCode",obj.ColorCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@Abbreviation",obj.Abbreviation),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@IsPractical",obj.IsPractical),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_CollegeSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectMaster(BALCollegeSubjectMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_CollegeSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Course Wise Subject Master

        public async Task<string> InsertUpdateDeleteCourseWiseSubjectMaster(BALCollegeCourseWiseSubjectMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SubjectGroupData",obj.SubjectGroupData),
                new SqlParameter("@SemesterData",obj.SemesterData),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeCourseWiseSubjectMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetCourseWiseSubjectMaster(BALCollegeCourseWiseSubjectMaster obj)
        {
            var param = new List<SqlParameter>
             {

                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SubjectGroupData",obj.SubjectGroupData),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@SemesterData",obj.SemesterData),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("mast.USP_CollegeCourseWiseSubjectMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetSubjectGroup(BALCollegeShiftCourseMapping obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeCourseWiseSubjectMaster", CommandType.StoredProcedure, param.ToArray()));

        }
        #endregion

        #region Teacher Setting Master

        public async Task<string> InsertUpdateDeleteTeacherSettingMaster(BALCollegeTeacherSetting obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@TeacherJsonData",obj.TeacherData),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_CollegeTeacherSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEmployeeList(BALCollegeTeacherSetting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CollegeTeacherSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTeacherSettingMaster(BALCollegeTeacherSetting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CollegeTeacherSetting]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Course Setting Master

        public async Task<string> InsertUpdateDeleteCollegeCourseSettingMaster(BALCollegeCourseSetting obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassJsonData",obj.CourseData),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_CollegeCourseSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSemesterList(BALCollegeCourseSetting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CollegeCourseSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCollegeCourseSettingMaster(BALCollegeCourseSetting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CollegeCourseSetting]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Shift Master
        public async Task<string> InsertUpdateDeleteShiftMaster(BALCollegeShiftMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ShiftName",obj.Shift),
                new SqlParameter("@ShiftFromTime",obj.FromTime),
                new SqlParameter("@ShiftToTime",obj.ToTime),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeShiftMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetShiftMaster(BALCollegeShiftMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeShiftMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Shift Course Mapping Master
        public async Task<string> InsertUpdateDeleteShiftCourseMappingMaster(BALCollegeShiftCourseMapping obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@CourseData",obj.CourseData),
                new SqlParameter("@ShiftWiseStudentData",obj.StudentData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ColegeShiftCourseMapping", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetShiftCourseMapping(BALCollegeShiftCourseMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ColegeShiftCourseMapping", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetShift(BALCollegeCourseWiseSubjectMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ColegeShiftCourseMapping", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCourseWiseTotalStudent(BALCollegeShiftCourseMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ShiftWiseStudentData",obj.StudentData),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ColegeShiftCourseMapping", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetUnMappedStudent(BALCollegeShiftCourseMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ColegeShiftCourseMapping", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Shift and Period Mapping Master
        public async Task<string> InsertUpdateDeleteShiftPeriodMappingMaster(BALCollegeShiftPeriodMapping obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@ShiftPeriodData",obj.PeriodData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeShiftPeriodMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetShiftPeriodMappingMaster(BALCollegeShiftPeriodMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("mast.USP_CollegeShiftPeriodMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Define Course Teacher Master    
        public async Task<string> InsertUpdateDeleteDefineCourseTeacherMaster(BALCollegeDefineCourseTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseTeacherData",obj.CourseTeacherData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeDefineCourseTeacherMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDefineCourseTeacherMaster(BALCollegeDefineCourseTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter ("@CourseCode",obj.CourseCode),
                new SqlParameter ("@BranchCode",obj.BranchCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeDefineCourseTeacherMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Course Subject Mapping With Teacher Master    
        public async Task<string> InsertUpdateDeleteCourseSubjectTeacherMaster(BALCollegeCourseSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ClassSubjectTeacherData",obj.CourseSubjectTeacherData),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeSubjectCourseGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCourseSubjectTeacher(BALCollegeCourseSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
             {                
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@WeekDayName",obj.WeekDayName),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeSubjectCourseGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region  CourseWise Subject Priority Master  
        public async Task<string> InsertUpdateDeleteCourseWiseSubjectPriorityMaster(BALCollegeCourseWiseSubjectPriority obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@SubjectPrioritesList",obj.SubjectPriorityData),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeCourseWiseSubjectPriority", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCourseWiseSubjectPriority(BALCollegeCourseWiseSubjectPriority obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeCourseWiseSubjectPriority", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        //#region Consecutive Subject Period Master  
        //public async Task<string> InsertUpdateDeleteConsecutiveSubjectPeriodMaster(BALConsecutiveSubjectPeriod obj)
        //{
        //    var param = new List<SqlParameter>
        //    {
        //        new SqlParameter("@CourseCode",obj.CourseCode),
        //        new SqlParameter("@SemesterCode",obj.SemesterCode),
        //        new SqlParameter("@BranchCode",obj.BranchCode),
        //        new SqlParameter("@StreamCode",obj.StreamCode),
        //        new SqlParameter("@ConsecutiveSubjectData",obj.ConsecutiveSubjectData),
        //        new SqlParameter("@IsActive",obj.IsActive),
        //        new SqlParameter("@Action", obj.Action),
        //        new SqlParameter("@RelationshipId",obj.RelationshipId),
        //        new SqlParameter("@SessionId",obj.SessionId),
        //        new SqlParameter("@FYId",obj.FYId),
        //        new SqlParameter("@CreatedBy",obj.CreatedBy),
        //        new SqlParameter("@UpdatedBy",obj.UpdatedBy),
        //        new SqlParameter("@Result", "")
        //    };

        //    return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_SubjectConsecutivePeriod", CommandType.StoredProcedure, param.ToArray()));
        //}
        //public async Task<DataTable> GetConsecutiveSubjectPeriodMaster(BALConsecutiveSubjectPeriod obj)
        //{
        //    var param = new List<SqlParameter>
        //     {
        //        new SqlParameter("@CourseCode",obj.CourseCode),
        //        new SqlParameter("@SemesterCode",obj.SemesterCode),
        //        new SqlParameter("@BranchCode",obj.BranchCode),
        //        new SqlParameter("@StreamCode",obj.StreamCode),
        //        new SqlParameter("@Action",obj.Action),
        //        new SqlParameter("@RelationshipId",obj.RelationshipId),
        //        new SqlParameter("@SessionId",obj.SessionId),
        //     };
        //    return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_SubjectConsecutivePeriod", CommandType.StoredProcedure, param.ToArray()));
        //}
        //#endregion

        #region Teacher Break Master 
        public async Task<string> InsertUpdateDeleteTeacherBreakMaster(BALCollegeTeacherBreak obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TeacherBreakData",obj.TeacherBreakData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeTeacherBreakMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSelectTeacherBreakMaster(BALCollegeTeacherBreak obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SearchText",obj.SearchText),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeTeacherBreakMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Relative Optional Subject Master
        public async Task<string> InsertUpdateDeleteRelativeOptionalSubjectMaster(BALCollegeRelativeOptionalSubject obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@RelativeSubjectData",obj.RelativeSubjectData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeRelativeOptionalSubject", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetRelativeOptionalSubjectMaster(BALCollegeRelativeOptionalSubject obj)
        {
            var param = new List<SqlParameter>
             {
               new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@ExceptSubjectId",obj.RelativeSubjectCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeRelativeOptionalSubject", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Subject Day Master
        public async Task<string> InsertUpdateDeleteSubjectDaysMaster(BALCollegeSubjectDaysMaster obj)
        {          
            var param = new List<SqlParameter>
            {
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@SubjectDayDetails",obj.SubjectDaysList),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_SubjectDaysMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> SelectSubjectDaysMaster(BALCollegeSubjectDaysMaster obj)
        {
            if (obj.Action == 4 || obj.Action == 5 || obj.Action == 6)
            {
                var param = new List<SqlParameter>
            {
                new SqlParameter("@Id",obj.Id),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action)
            };
                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_SubjectDaysMaster", CommandType.StoredProcedure, param.ToArray()));
            }
            else return null;
        }
        #endregion

        #region Gen TimeTable Manual
        public async Task<string> InsertUpdateDeleteGenTimeTableManual(RearrangeCollegeTimeTablePeriod obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
           // if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@TransId",obj.TransID),
                    new SqlParameter("@TitleName",obj.TitleName),
                    new SqlParameter("@CourseCode",obj.CourseCode),
                    new SqlParameter("@SemesterCode",obj.SemesterCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@CellData",obj.CellData),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@Result","")
                };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_CollegeGenTimeTableManual", CommandType.StoredProcedure, param.ToArray()));

        }        
        public async Task<DataSet> GetTimeTableManualList(RearrangeCollegeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                    {
                        new SqlParameter("@Action",obj.Action),
                        new SqlParameter("@TransID",obj.TransID),
                        new SqlParameter("@RelationshipId",obj.RelationshipId),
                        new SqlParameter("@SessionId",obj.SessionId),
                        new SqlParameter("@CourseCode",obj.CourseCode),
                        new SqlParameter("@SemesterCode",obj.SemesterCode),
                        new SqlParameter("@BranchCode",obj.BranchCode),
                    };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("trans.USP_CollegeGenTimeTableManual", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> PeriodList(CollegePeriodMaster objPM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objPM.Action),
                new SqlParameter("@RelationshipId",objPM.RelationshipId),
                new SqlParameter("@SessionId",objPM.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_PeriodMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        public async Task<DataTable> GetCourseWiseTimeTable(RearrangeCollegeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@CourseCode",obj.CourseCode),
                    new SqlParameter("@SemesterCode",obj.SemesterCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@StudentCode",obj.StudentCode),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_CourseWiseTimeTable]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTeacherWiseTimeTable(RearrangeCollegeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_TeacherWiseTimeTable", CommandType.StoredProcedure, param.ToArray()));
        }
        #region Replace Teacher
        public async Task<DataSet> GetEmployeeOnLeaveList(BALCollegeReplaceTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@WeekDayName",obj.VDate),
                new SqlParameter("@SubtitutionDateRange",obj.SubtitutionDateRange),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@SWithSameSubject",obj.SWithSameSubject),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@ReplaceFromEmployeeCode",obj.ReplaceFromEmployeeCode)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_CollegeTeacherOnLeave]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteReplaceTeacherMaster(BALCollegeReplaceTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@SWithSameSubject",obj.SWithSameSubject),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SubtitutionDateRange",obj.SubtitutionDateRange),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@ReplaceFromEmployeeCode",obj.ReplaceFromEmployeeCode),
                //new SqlParameter("@ReplaceToEmployeeCode",obj.ReplaceToEmployeeCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@ReplaceTeacherData",obj.ReplaceTeacherData),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeTeacherOnLeave]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Allot New Teacher
        public async Task<DataTable> GetAllotNewTeacer(BALCollegeAllotNewTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@AllotNewTeacherData",obj.AllotNewTeacherData),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@OldEmployeeCode",obj.OldEmployeeCode),
                new SqlParameter("@ShiftCode",obj.ShiftCode)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_CollegeAllotNewTeacher]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteAllotNewTeacher(BALCollegeAllotNewTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@OldEmployeeCode",obj.OldEmployeeCode),
                new SqlParameter("@NewEmployeeCode",obj.NewEmployeeCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@AllotNewTeacherData",obj.AllotNewTeacherData),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeAllotNewTeacher]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Shift Wise Course Wise Period Mapping Master
        public async Task<string> InsertUpdateDeleteShiftWiseCourseWisePeriodMappingMaster(BALCollegeShiftPeriodMapping obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@PeriodData",obj.PeriodData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[STP_InsertUpdateDeleteShiftWiseCourseWisePeriodMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetShiftWiseCourseWisePeriodMappingMaster(BALCollegeShiftPeriodMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[STP_InsertUpdateDeleteShiftWiseCourseWisePeriodMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        public async Task<CollegeDayWiseTimeTable> GETCourseTimeTableDayWise(RearrangeCollegeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@CourseCode",obj.CourseCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@SemesterCode",obj.SemesterCode),
                    new SqlParameter("@StreamCode",obj.StreamCode),
                    new SqlParameter("@StudentCode",obj.StudentCode),
                    new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                };
            DataTable dt = new DataTable();
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_CourseWiseTimeTable", CommandType.StoredProcedure, param.ToArray()));

            CollegeDayWiseTimeTable DayWiseTimeTableobj = new CollegeDayWiseTimeTable();

            List<CollegeMonDay> MonDayList = new List<CollegeMonDay>();
            List<CollegeTuesDay> TuesDayList = new List<CollegeTuesDay>();
            List<CollegeWednesDay> WednesDayList = new List<CollegeWednesDay>();
            List<CollegeThursDay> ThursDayList = new List<CollegeThursDay>();
            List<CollegeFriDay> FriDayList = new List<CollegeFriDay>();
            List<CollegeSaturDay> SaturDayList = new List<CollegeSaturDay>();
            List<CollegeSunDay> SunDayList = new List<CollegeSunDay>();


            string[] PeriodNameAndTime;
            string periodName = "";
            string fromTime = "";
            string toTime = "";

            string[] EmployeeAndSubject;
            string employeeName = "";
            string subject = "";
            string classname = "";
            string periodType = "";


            int count = 0;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                PeriodNameAndTime = dt.Rows[i]["PeriodName"].ToString().Split('$');
                periodType = dt.Rows[i]["PeriodType"].ToString();
                count = count + (periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : 1);

                if (PeriodNameAndTime.Length > 0)
                {
                    periodName = PeriodNameAndTime[0];
                    fromTime = PeriodNameAndTime.Length > 1 ? PeriodNameAndTime[1] : "";
                    toTime = PeriodNameAndTime.Length > 2 ? PeriodNameAndTime[2] : "";
                }
                EmployeeAndSubject = dt.Rows[i]["Monday"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";
                    CollegeMonDay MonDay = new CollegeMonDay();

                    MonDay.EmployeeName = employeeName;
                    MonDay.SubjectName = subject;
                    MonDay.Course = classname;
                    MonDay.FromTime = fromTime;
                    MonDay.ToTime = toTime;
                    MonDay.PeriodName = periodName;
                    MonDay.PeriodType = periodType;
                    MonDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    MonDayList.Add(MonDay);
                }
                EmployeeAndSubject = dt.Rows[i]["TuesDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";

                    CollegeTuesDay TuesDay = new CollegeTuesDay();

                    TuesDay.EmployeeName = employeeName;
                    TuesDay.SubjectName = subject;
                    TuesDay.Course = classname;
                    TuesDay.FromTime = fromTime;
                    TuesDay.ToTime = toTime;
                    TuesDay.PeriodName = periodName;
                    TuesDay.PeriodType = periodType;
                    TuesDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    TuesDayList.Add(TuesDay);
                }
                EmployeeAndSubject = dt.Rows[i]["WednesDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";

                    CollegeWednesDay WednesDay = new CollegeWednesDay();

                    WednesDay.EmployeeName = employeeName;
                    WednesDay.SubjectName = subject;
                    WednesDay.Course = classname;
                    WednesDay.FromTime = fromTime;
                    WednesDay.ToTime = toTime;
                    WednesDay.PeriodName = periodName;
                    WednesDay.PeriodType = periodType;
                    WednesDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    WednesDayList.Add(WednesDay);
                }
                EmployeeAndSubject = dt.Rows[i]["ThursDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";

                    CollegeThursDay ThursDay = new CollegeThursDay();

                    ThursDay.EmployeeName = employeeName;
                    ThursDay.SubjectName = subject;
                    ThursDay.Course = classname;
                    ThursDay.FromTime = fromTime;
                    ThursDay.ToTime = toTime;
                    ThursDay.PeriodName = periodName;
                    ThursDay.PeriodType = periodType;
                    ThursDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    ThursDayList.Add(ThursDay);
                }
                EmployeeAndSubject = dt.Rows[i]["FriDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";

                    CollegeFriDay FriDay = new CollegeFriDay();

                    FriDay.EmployeeName = employeeName;
                    FriDay.SubjectName = subject;
                    FriDay.Course = classname;
                    FriDay.FromTime = fromTime;
                    FriDay.ToTime = toTime;
                    FriDay.PeriodName = periodName;
                    FriDay.PeriodType = periodType;
                    FriDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    FriDayList.Add(FriDay);
                }
                EmployeeAndSubject = dt.Rows[i]["SaturDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";

                    CollegeSaturDay SaturDay = new CollegeSaturDay();

                    SaturDay.EmployeeName = employeeName;
                    SaturDay.SubjectName = subject;
                    SaturDay.Course = classname;
                    SaturDay.FromTime = fromTime;
                    SaturDay.ToTime = toTime;
                    SaturDay.PeriodName = periodName;
                    SaturDay.PeriodType = periodType;
                    SaturDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    SaturDayList.Add(SaturDay);
                }
                EmployeeAndSubject = dt.Rows[i]["SunDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";

                    CollegeSunDay SunDay = new CollegeSunDay();

                    SunDay.EmployeeName = employeeName;
                    SunDay.SubjectName = subject;
                    SunDay.Course = classname;
                    SunDay.FromTime = fromTime;
                    SunDay.ToTime = toTime;
                    SunDay.PeriodName = periodName;
                    SunDay.PeriodType = periodType;
                    SunDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    SunDayList.Add(SunDay);
                }
            }

            DayWiseTimeTableobj.Monday = MonDayList;
            DayWiseTimeTableobj.Tuesday = TuesDayList;
            DayWiseTimeTableobj.Wednesday = WednesDayList;
            DayWiseTimeTableobj.Thursday = ThursDayList;
            DayWiseTimeTableobj.Friday = FriDayList;
            DayWiseTimeTableobj.Saturday = SaturDayList;
            DayWiseTimeTableobj.Sunday = SunDayList;

            return DayWiseTimeTableobj;
        }
        public async Task<CollegeDayWiseTimeTable> GETMobileCourseTimeTableDayWise(RearrangeCollegeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@CourseCode",obj.CourseCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@SemesterCode",obj.SemesterCode),
                    new SqlParameter("@StreamCode",obj.StreamCode),
                    new SqlParameter("@StudentCode",obj.StudentCode),
                    new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                };
            DataTable dt = new DataTable();
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_MobileCourseWiseTimeTable", CommandType.StoredProcedure, param.ToArray()));

            CollegeDayWiseTimeTable DayWiseTimeTableobj = new CollegeDayWiseTimeTable();

            List<CollegeMonDay> MonDayList = new List<CollegeMonDay>();
            List<CollegeTuesDay> TuesDayList = new List<CollegeTuesDay>();
            List<CollegeWednesDay> WednesDayList = new List<CollegeWednesDay>();
            List<CollegeThursDay> ThursDayList = new List<CollegeThursDay>();
            List<CollegeFriDay> FriDayList = new List<CollegeFriDay>();
            List<CollegeSaturDay> SaturDayList = new List<CollegeSaturDay>();
            List<CollegeSunDay> SunDayList = new List<CollegeSunDay>();


            string[] PeriodNameAndTime;
            string periodName = "";
            string fromTime = "";
            string toTime = "";

            string[] EmployeeAndSubject;
            string employeeName = "";
            string employeeCode = "";
            string subject = "";
            string subjectcode = "";
            string periodcode = "";
            string classname = "";
            string CourseCode = "";
            string SemesterCode = "";
            string periodType = "";


            int count = 0;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                PeriodNameAndTime = dt.Rows[i]["PeriodName"].ToString().Split('$');
                periodType = dt.Rows[i]["PeriodType"].ToString();
                periodcode = dt.Rows[i]["PeriodCode"].ToString();
                count = count + (periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : 1);

                if (PeriodNameAndTime.Length > 0)
                {
                    periodName = PeriodNameAndTime[0];
                    fromTime = PeriodNameAndTime.Length > 1 ? PeriodNameAndTime[1] : "";
                    toTime = PeriodNameAndTime.Length > 2 ? PeriodNameAndTime[2] : "";
                }
                EmployeeAndSubject = dt.Rows[i]["Monday"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";
                    subjectcode = EmployeeAndSubject.Length > 3 ? EmployeeAndSubject[3] : "";
                    CourseCode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    SemesterCode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    CollegeMonDay MonDay = new CollegeMonDay();

                    MonDay.EmployeeName = employeeName;
                    MonDay.EmployeeCode = employeeCode;
                    MonDay.SubjectName = subject;
                    MonDay.SubjectCode = subjectcode;
                    MonDay.Course = classname;
                    MonDay.CourseCode = CourseCode;
                    MonDay.SemesterCode = SemesterCode;
                    MonDay.FromTime = fromTime;
                    MonDay.ToTime = toTime;
                    MonDay.PeriodName = periodName;
                    MonDay.PeriodType = periodType;
                    MonDay.PeriodCode = periodcode;
                    MonDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    MonDayList.Add(MonDay);
                }
                EmployeeAndSubject = dt.Rows[i]["TuesDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";
                    subjectcode = EmployeeAndSubject.Length > 3 ? EmployeeAndSubject[3] : "";
                    CourseCode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    SemesterCode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    CollegeTuesDay TuesDay = new CollegeTuesDay();

                    TuesDay.EmployeeName = employeeName;
                    TuesDay.EmployeeCode = employeeCode;
                    TuesDay.SubjectName = subject;
                    TuesDay.SubjectCode = subjectcode;
                    TuesDay.Course = classname;
                    TuesDay.CourseCode = CourseCode;
                    TuesDay.SemesterCode = SemesterCode;
                    TuesDay.FromTime = fromTime;
                    TuesDay.ToTime = toTime;
                    TuesDay.PeriodName = periodName;
                    TuesDay.PeriodType = periodType;
                    TuesDay.PeriodCode = periodcode;
                    TuesDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    TuesDayList.Add(TuesDay);
                }
                EmployeeAndSubject = dt.Rows[i]["WednesDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";
                    subjectcode = EmployeeAndSubject.Length > 3 ? EmployeeAndSubject[3] : "";
                    CourseCode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    SemesterCode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    CollegeWednesDay WednesDay = new CollegeWednesDay();

                    WednesDay.EmployeeName = employeeName;
                    WednesDay.EmployeeCode = employeeCode;
                    WednesDay.SubjectName = subject;
                    WednesDay.SubjectCode = subjectcode;
                    WednesDay.Course = classname;
                    WednesDay.CourseCode = CourseCode;
                    WednesDay.SemesterCode = SemesterCode;
                    WednesDay.FromTime = fromTime;
                    WednesDay.ToTime = toTime;
                    WednesDay.PeriodName = periodName;
                    WednesDay.PeriodType = periodType;
                    WednesDay.PeriodCode = periodcode;
                    WednesDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    WednesDayList.Add(WednesDay);
                }
                EmployeeAndSubject = dt.Rows[i]["ThursDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";
                    subjectcode = EmployeeAndSubject.Length > 3 ? EmployeeAndSubject[3] : "";
                    CourseCode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    SemesterCode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    CollegeThursDay ThursDay = new CollegeThursDay();

                    ThursDay.EmployeeName = employeeName;
                    ThursDay.EmployeeCode = employeeCode;
                    ThursDay.SubjectName = subject;
                    ThursDay.SubjectCode = subjectcode;
                    ThursDay.Course = classname;
                    ThursDay.CourseCode = CourseCode;
                    ThursDay.SemesterCode = SemesterCode;
                    ThursDay.FromTime = fromTime;
                    ThursDay.ToTime = toTime;
                    ThursDay.PeriodName = periodName;
                    ThursDay.PeriodType = periodType;
                    ThursDay.PeriodCode = periodcode;
                    ThursDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    ThursDayList.Add(ThursDay);
                }
                EmployeeAndSubject = dt.Rows[i]["FriDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";
                    subjectcode = EmployeeAndSubject.Length > 3 ? EmployeeAndSubject[3] : "";
                    CourseCode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    SemesterCode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    CollegeFriDay FriDay = new CollegeFriDay();

                    FriDay.EmployeeName = employeeName;
                    FriDay.EmployeeCode = employeeCode;
                    FriDay.SubjectName = subject;
                    FriDay.SubjectCode = subjectcode;
                    FriDay.Course = classname;
                    FriDay.CourseCode = CourseCode;
                    FriDay.SemesterCode = SemesterCode;
                    FriDay.FromTime = fromTime;
                    FriDay.ToTime = toTime;
                    FriDay.PeriodName = periodName;
                    FriDay.PeriodType = periodType;
                    FriDay.PeriodCode = periodcode;
                    FriDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    FriDayList.Add(FriDay);
                }
                EmployeeAndSubject = dt.Rows[i]["SaturDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2 ? EmployeeAndSubject[2] : "";
                    subjectcode = EmployeeAndSubject.Length > 3 ? EmployeeAndSubject[3] : "";
                    CourseCode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    SemesterCode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    CollegeSaturDay SaturDay = new CollegeSaturDay();

                    SaturDay.EmployeeName = employeeName;
                    SaturDay.EmployeeCode = employeeCode;
                    SaturDay.SubjectName = subject;
                    SaturDay.SubjectCode = subjectcode;
                    SaturDay.Course = classname;
                    SaturDay.CourseCode = CourseCode;
                    SaturDay.SemesterCode = SemesterCode;
                    SaturDay.FromTime = fromTime;
                    SaturDay.ToTime = toTime;
                    SaturDay.PeriodName = periodName;
                    SaturDay.PeriodType = periodType;
                    SaturDay.PeriodCode = periodcode;
                    SaturDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    SaturDayList.Add(SaturDay);
                }
                EmployeeAndSubject = dt.Rows[i]["SunDay"].ToString().Split('$');
                if (EmployeeAndSubject.Length > 0)
                {
                    employeeName = EmployeeAndSubject[0];
                    subject = EmployeeAndSubject.Length > 1 ? EmployeeAndSubject[1] : "";
                    classname = EmployeeAndSubject.Length > 2? EmployeeAndSubject[2] : "";
                    subjectcode = EmployeeAndSubject.Length > 3 ? EmployeeAndSubject[3] : "";
                    CourseCode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    SemesterCode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    CollegeSunDay SunDay = new CollegeSunDay();

                    SunDay.EmployeeName = employeeName;
                    SunDay.EmployeeCode = employeeCode;
                    SunDay.SubjectName = subject;
                    SunDay.SubjectCode = subjectcode;
                    SunDay.Course = classname;
                    SunDay.CourseCode = CourseCode;
                    SunDay.SemesterCode = SemesterCode;
                    SunDay.FromTime = fromTime;
                    SunDay.ToTime = toTime;
                    SunDay.PeriodName = periodName;
                    SunDay.PeriodType = periodType;
                    SunDay.PeriodCode = periodcode;
                    SunDay.PeriodCount = periodType.ToUpper() == "LUNCHPERIOD" || periodType.ToUpper() == "ATTENDENCEPERIOD" ? 0 : count;

                    SunDayList.Add(SunDay);
                }
            }

            DayWiseTimeTableobj.Monday = MonDayList;
            DayWiseTimeTableobj.Tuesday = TuesDayList;
            DayWiseTimeTableobj.Wednesday = WednesDayList;
            DayWiseTimeTableobj.Thursday = ThursDayList;
            DayWiseTimeTableobj.Friday = FriDayList;
            DayWiseTimeTableobj.Saturday = SaturDayList;
            DayWiseTimeTableobj.Sunday = SunDayList;

            return DayWiseTimeTableobj;
        }

        public async Task<DataTable> TeacherSubstitutionSuggestions(RearrangeCollegeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_TeacherWiseTimeTable", CommandType.StoredProcedure, param.ToArray()));
        }
        #region Exam Subject Teacher Mapping   
        public async Task<string> InsertUpdateDeleteExamSubjectTeacherMappingMaster(BALCollegeCourseSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ClassSubjectTeacherData",obj.CourseSubjectTeacherData),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ExamSubjectCourseGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetExamSubjectTeacherMapping(BALCollegeCourseSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ExamSubjectCourseGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Create Question   
        public async Task<string> InsertUpdateDeleteCreateQuestion(BALCollegeCourseSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ClassSubjectTeacherData",obj.CourseSubjectTeacherData),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ExamSubjectCourseGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCreateQuestions(BALCollegeCourseSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ExamSubjectCourseGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Resource Master
        public async Task<string> InsertUpdateDeleteResourceMaster(BalCollegeResourceType obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ResourceType",obj.ResourceType),
                new SqlParameter("@ResourceName",obj.ResourceName),
                new SqlParameter("@ResourceShortName",obj.ResourceShortName),
                new SqlParameter("@IsTeacherRequired",obj.IsTeacherRequired),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@DayPeriod",obj.DayPeriod),
                new SqlParameter("@WeekDays",obj.WeekDays),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ResourceMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetResourceMaster(BalCollegeResourceType obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ResourceType",obj.ResourceType),
                new SqlParameter("@ResourceName",obj.ResourceName),
                new SqlParameter("@ResourceShortName",obj.ResourceShortName),
                new SqlParameter("@IsTeacherRequired",obj.IsTeacherRequired),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@DayPeriod",obj.DayPeriod),
                new SqlParameter("@WeekDays",obj.WeekDays),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ResourceMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        public async Task<DataSet> GetTeacherWorkLoad(RearrangeCollegeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                    {
                        new SqlParameter("@Action",obj.Action),
                        new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                        new SqlParameter("@RelationshipId",obj.RelationshipId),
                        new SqlParameter("@SessionId",obj.SessionId)
                    };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("rpt.USP_TeacherWorkLoad", CommandType.StoredProcedure, param.ToArray()));
        }

        #region period Link for Student
        public async Task<string> InsertUpdateDeleteOnlinePeriodLink(BalCollegeOnlinePeriodLink obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId",obj.TransId),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ClassDate",obj.CourseDate),
                new SqlParameter("@ClassTiming",obj.CourseTime),
                new SqlParameter("@WeekDayName",obj.DayName),
                new SqlParameter("@UrlLink",obj.UrlLink),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@IsRecurring",obj.IsRecurring),
                //new SqlParameter("@IsOpenLink",obj.IsOpenlink),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUupdateDeleteOnlinePeriodLink]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetOnlinePeriodLinkToStudent(BalCollegeOnlinePeriodLink obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@IsRecurring",obj.IsRecurring),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InsertUupdateDeleteOnlinePeriodLink]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Online Student joined
        public async Task<string> InsertUpdateDeleteOnlineStudentJoined(BalCollegeOnlinePeriodLink obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId",obj.TransId),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ClassDate",obj.CourseDate),
                new SqlParameter("@ClassTiming",obj.CourseTime),
                new SqlParameter("@OlClassTransId",obj.OLClassTransId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeleteOnlineCourseJoined]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetOnlineStudentJoined(BalCollegeOnlinePeriodLink obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@OLClassTransId",obj.OLClassTransId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SemesterCode",obj.SemesterCode),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InsertUpdateDeleteOnlineCourseJoined]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region TimeTable Substitution Report
        public async Task<DataTable> TimeTableSubstitutionReport(BALCollegeReplaceTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@ReplaceDate",obj.FromDate)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[TimeTableSubstitutionReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}
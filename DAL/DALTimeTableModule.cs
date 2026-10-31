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
        public async Task<string> InsertUpdateDeleteSubjectGroupMaster(BALSubjectGroupMaster obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_SubjectGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectGroupMaster(BALSubjectGroupMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_SubjectGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Subject Master
        public async Task<DataTable> GetSubjectGroup(BALSubjectGroupMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
                
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_SubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteSubjectMaster(BALSubjectMaster obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_SubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectMaster(BALSubjectMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_SubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Class Wise Subject Master

        public async Task<string> InsertUpdateDeleteClassWiseSubjectMaster(BALClassWiseSubjectMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SubjectGroupData",obj.SubjectGroupData),
                new SqlParameter("@SectionData",obj.SectionData),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ClassWiseSubjectMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetClassWiseSubjectMaster(BALClassWiseSubjectMaster obj)
        {
            var param = new List<SqlParameter>
             {

                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SubjectGroupData",obj.SubjectGroupData),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("mast.USP_ClassWiseSubjectMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetSubjectGroup(BALClassWiseSubjectMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ClassWiseSubjectMaster", CommandType.StoredProcedure, param.ToArray()));

        }
        #endregion

        #region Teacher Setting Master

        public async Task<string> InsertUpdateDeleteTeacherSettingMaster(BALTeacherSetting obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_TeacherSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEmployeeList(BALTeacherSetting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_TeacherSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTeacherSettingMaster(BALTeacherSetting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_TeacherSetting]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Class Setting Master

        public async Task<string> InsertUpdateDeleteClassSettingMaster(BALClassSetting obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassJsonData",obj.ClassData),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ClassSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSectionList(BALClassSetting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ClassSetting]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetClassSettingMaster(BALClassSetting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ClassSetting]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Shift Master
        public async Task<string> InsertUpdateDeleteShiftMaster(BALShiftMaster obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ShiftMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetShiftMaster(BALShiftMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ShiftMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Shift Class Mapping Master
        public async Task<string> InsertUpdateDeleteShiftClassMappingMaster(BALShiftClassMapping obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@ClassData",obj.ClassData),
                new SqlParameter("@ShiftWiseStudentData",obj.StudentData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ShiftClassMapping", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetShiftClassMapping(BALShiftClassMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ShiftClassMapping", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetShift(BALShiftClassMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ShiftClassMapping", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetClassWiseTotalStudent(BALShiftClassMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ShiftWiseStudentData",obj.StudentData),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ShiftClassMapping", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetUnMappedStudent(BALShiftClassMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ShiftClassMapping", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Shift and Period Mapping Master
        public async Task<string> InsertUpdateDeleteShiftPeriodMappingMaster(BALShiftPeriodMapping obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ShiftPeriodMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetShiftPeriodMappingMaster(BALShiftPeriodMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("mast.USP_ShiftPeriodMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Define Class Teacher Master    
        public async Task<string> InsertUpdateDeleteDefineClassTeacherMaster(BALDefineClassTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassTeacherData",obj.ClassTeacherData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_DefineClassTeacherMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDefineClassTeacherMaster(BALDefineClassTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter ("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_DefineClassTeacherMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Class Subject Mapping With Teacher Master    
        public async Task<string> InsertUpdateDeleteClassSubjectTeacherMaster(BALClassSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ClassSubjectTeacherData",obj.ClassSubjectTeacherData),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_SubjectClassGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetClassSubjectTeacher(BALClassSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
             {                
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@WeekDayName",obj.WeekDayName),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_SubjectClassGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region  ClassWise Subject Priority Master  
        public async Task<string> InsertUpdateDeleteClassWiseSubjectPriorityMaster(BALClassWiseSubjectPriority obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ClassWiseSubjectPriority", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetClassWiseSubjectPriority(BALClassWiseSubjectPriority obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ClassWiseSubjectPriority", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        //#region Consecutive Subject Period Master  
        //public async Task<string> InsertUpdateDeleteConsecutiveSubjectPeriodMaster(BALConsecutiveSubjectPeriod obj)
        //{
        //    var param = new List<SqlParameter>
        //    {
        //        new SqlParameter("@ClassCode",obj.ClassCode),
        //        new SqlParameter("@SectionCode",obj.SectionCode),
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
        //        new SqlParameter("@ClassCode",obj.ClassCode),
        //        new SqlParameter("@SectionCode",obj.SectionCode),
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
        public async Task<string> InsertUpdateDeleteTeacherBreakMaster(BALTeacherBreak obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_TeacherBreakMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSelectTeacherBreakMaster(BALTeacherBreak obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SearchText",obj.SearchText),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_TeacherBreakMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Relative Optional Subject Master
        public async Task<string> InsertUpdateDeleteRelativeOptionalSubjectMaster(BALRelativeOptionalSubject obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@RelativeSubjectData",obj.RelativeSubjectData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_RelativeOptionalSubject", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetRelativeOptionalSubjectMaster(BALRelativeOptionalSubject obj)
        {
            var param = new List<SqlParameter>
             {
               new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ExceptSubjectId",obj.RelativeSubjectCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_RelativeOptionalSubject", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Subject Day Master
        public async Task<string> InsertUpdateDeleteSubjectDaysMaster(BALSubjectDaysMaster obj)
        {          
            var param = new List<SqlParameter>
            {
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
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
        public async Task<DataTable> SelectSubjectDaysMaster(BALSubjectDaysMaster obj)
        {
            if (obj.Action == 4 || obj.Action == 5 || obj.Action == 6)
            {
                var param = new List<SqlParameter>
            {
                new SqlParameter("@Id",obj.Id),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
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
        public async Task<string> InsertUpdateDeleteGenTimeTableManual(RearrangeTimeTablePeriod obj)
        {
            if (obj.Action != 1 && obj.Action != 2 && obj.Action != 3) return "0";
           // if (string.IsNullOrEmpty(obj.Code) && (obj.Action == 3)) return "Please Select Record";
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@TransId",obj.TransID),
                    new SqlParameter("@TitleName",obj.TitleName),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@StreamCode",obj.StreamCode),
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_GenTimeTableManual", CommandType.StoredProcedure, param.ToArray()));

        }        
        public async Task<DataSet> GetTimeTableManualList(RearrangeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                    {
                        new SqlParameter("@Action",obj.Action),
                        new SqlParameter("@TransID",obj.TransID),
                        new SqlParameter("@RelationshipId",obj.RelationshipId),
                        new SqlParameter("@SessionId",obj.SessionId),
                        new SqlParameter("@ClassCode",obj.ClassCode),
                        new SqlParameter("@SectionCode",obj.SectionCode),
                        new SqlParameter("@BranchCode",obj.BranchCode),
                        new SqlParameter("@StreamCode",obj.StreamCode)
                    };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("trans.USP_GenTimeTableManual", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> PeriodList(PeriodMaster objPM)
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

        public async Task<DataTable> GetClassWiseTimeTable(RearrangeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@StudentCode",obj.StudentCode),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_ClassWiseTimeTable]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTeacherWiseTimeTable(RearrangeTimeTablePeriod obj)
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
        public async Task<DataSet> GetEmployeeOnLeaveList(BALReplaceTeacher obj)
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
                new SqlParameter("@ReplaceFromEmployeeCode",obj.ReplaceFromEmployeeCode),
                new SqlParameter("@Type",obj.Type)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_GetTeacherOnLeave]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteReplaceTeacherMaster(BALReplaceTeacher obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_GetTeacherOnLeave]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Allot New Teacher
        public async Task<DataTable> GetAllotNewTeacer(BALAllotNewTeacher obj)
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
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_AllotNewTeacher]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteAllotNewTeacher(BALAllotNewTeacher obj)
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

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_AllotNewTeacher]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Shift Wise Class Wise Period Mapping Master
        public async Task<string> InsertUpdateDeleteShiftWiseClassWisePeriodMappingMaster(BALShiftPeriodMapping obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@PeriodData",obj.PeriodData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[STP_InsertUpdateDeleteShiftWiseClassWisePeriodMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetShiftWiseClassWisePeriodMappingMaster(BALShiftPeriodMapping obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[STP_InsertUpdateDeleteShiftWiseClassWisePeriodMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        public async Task<DayWiseTimeTable> GETClassTimeTableDayWise(RearrangeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@StreamCode",obj.StreamCode),
                    new SqlParameter("@StudentCode",obj.StudentCode),
                    new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                };
            DataTable dt = new DataTable();
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_ClassWiseTimeTable", CommandType.StoredProcedure, param.ToArray()));

            DayWiseTimeTable DayWiseTimeTableobj = new DayWiseTimeTable();

            List<MonDay> MonDayList = new List<MonDay>();
            List<TuesDay> TuesDayList = new List<TuesDay>();
            List<WednesDay> WednesDayList = new List<WednesDay>();
            List<ThursDay> ThursDayList = new List<ThursDay>();
            List<FriDay> FriDayList = new List<FriDay>();
            List<SaturDay> SaturDayList = new List<SaturDay>();
            List<SunDay> SunDayList = new List<SunDay>();


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
                    MonDay MonDay = new MonDay();

                    MonDay.EmployeeName = employeeName;
                    MonDay.SubjectName = subject;
                    MonDay.Class = classname;
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

                    TuesDay TuesDay = new TuesDay();

                    TuesDay.EmployeeName = employeeName;
                    TuesDay.SubjectName = subject;
                    TuesDay.Class = classname;
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

                    WednesDay WednesDay = new WednesDay();

                    WednesDay.EmployeeName = employeeName;
                    WednesDay.SubjectName = subject;
                    WednesDay.Class = classname;
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

                    ThursDay ThursDay = new ThursDay();

                    ThursDay.EmployeeName = employeeName;
                    ThursDay.SubjectName = subject;
                    ThursDay.Class = classname;
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

                    FriDay FriDay = new FriDay();

                    FriDay.EmployeeName = employeeName;
                    FriDay.SubjectName = subject;
                    FriDay.Class = classname;
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

                    SaturDay SaturDay = new SaturDay();

                    SaturDay.EmployeeName = employeeName;
                    SaturDay.SubjectName = subject;
                    SaturDay.Class = classname;
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

                    SunDay SunDay = new SunDay();

                    SunDay.EmployeeName = employeeName;
                    SunDay.SubjectName = subject;
                    SunDay.Class = classname;
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
        public async Task<DayWiseTimeTable> GETMobileClassTimeTableDayWise(RearrangeTimeTablePeriod obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@ShiftCode",obj.ShiftCode),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@BranchCode",obj.BranchCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@StreamCode",obj.StreamCode),
                    new SqlParameter("@StudentCode",obj.StudentCode),
                    new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                };
            DataTable dt = new DataTable();
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("rpt.USP_MobileClassWiseTimeTable", CommandType.StoredProcedure, param.ToArray()));

            DayWiseTimeTable DayWiseTimeTableobj = new DayWiseTimeTable();

            List<MonDay> MonDayList = new List<MonDay>();
            List<TuesDay> TuesDayList = new List<TuesDay>();
            List<WednesDay> WednesDayList = new List<WednesDay>();
            List<ThursDay> ThursDayList = new List<ThursDay>();
            List<FriDay> FriDayList = new List<FriDay>();
            List<SaturDay> SaturDayList = new List<SaturDay>();
            List<SunDay> SunDayList = new List<SunDay>();


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
            string classcode = "";
            string sectioncode = "";
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
                    classcode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    sectioncode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    MonDay MonDay = new MonDay();

                    MonDay.EmployeeName = employeeName;
                    MonDay.EmployeeCode = employeeCode;
                    MonDay.SubjectName = subject;
                    MonDay.SubjectCode = subjectcode;
                    MonDay.Class = classname;
                    MonDay.ClassCode = classcode;
                    MonDay.SectionCode = sectioncode;
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
                    classcode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    sectioncode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    TuesDay TuesDay = new TuesDay();

                    TuesDay.EmployeeName = employeeName;
                    TuesDay.EmployeeCode = employeeCode;
                    TuesDay.SubjectName = subject;
                    TuesDay.SubjectCode = subjectcode;
                    TuesDay.Class = classname;
                    TuesDay.ClassCode = classcode;
                    TuesDay.SectionCode = sectioncode;
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
                    classcode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    sectioncode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    WednesDay WednesDay = new WednesDay();

                    WednesDay.EmployeeName = employeeName;
                    WednesDay.EmployeeCode = employeeCode;
                    WednesDay.SubjectName = subject;
                    WednesDay.SubjectCode = subjectcode;
                    WednesDay.Class = classname;
                    WednesDay.ClassCode = classcode;
                    WednesDay.SectionCode = sectioncode;
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
                    classcode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    sectioncode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    ThursDay ThursDay = new ThursDay();

                    ThursDay.EmployeeName = employeeName;
                    ThursDay.EmployeeCode = employeeCode;
                    ThursDay.SubjectName = subject;
                    ThursDay.SubjectCode = subjectcode;
                    ThursDay.Class = classname;
                    ThursDay.ClassCode = classcode;
                    ThursDay.SectionCode = sectioncode;
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
                    classcode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    sectioncode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    FriDay FriDay = new FriDay();

                    FriDay.EmployeeName = employeeName;
                    FriDay.EmployeeCode = employeeCode;
                    FriDay.SubjectName = subject;
                    FriDay.SubjectCode = subjectcode;
                    FriDay.Class = classname;
                    FriDay.ClassCode = classcode;
                    FriDay.SectionCode = sectioncode;
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
                    classcode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    sectioncode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    SaturDay SaturDay = new SaturDay();

                    SaturDay.EmployeeName = employeeName;
                    SaturDay.EmployeeCode = employeeCode;
                    SaturDay.SubjectName = subject;
                    SaturDay.SubjectCode = subjectcode;
                    SaturDay.Class = classname;
                    SaturDay.ClassCode = classcode;
                    SaturDay.SectionCode = sectioncode;
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
                    classcode = EmployeeAndSubject.Length > 4 ? EmployeeAndSubject[4] : "";
                    sectioncode = EmployeeAndSubject.Length > 5 ? EmployeeAndSubject[5] : "";
                    employeeCode = EmployeeAndSubject.Length > 6 ? EmployeeAndSubject[6] : "";
                    SunDay SunDay = new SunDay();

                    SunDay.EmployeeName = employeeName;
                    SunDay.EmployeeCode = employeeCode;
                    SunDay.SubjectName = subject;
                    SunDay.SubjectCode = subjectcode;
                    SunDay.Class = classname;
                    SunDay.ClassCode = classcode;
                    SunDay.SectionCode = sectioncode;
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

        public async Task<DataTable> TeacherSubstitutionSuggestions(RearrangeTimeTablePeriod obj)
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
        public async Task<string> InsertUpdateDeleteExamSubjectTeacherMappingMaster(BALClassSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ClassSubjectTeacherData",obj.ClassSubjectTeacherData),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ExamSubjectClassGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetExamSubjectTeacherMapping(BALClassSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ExamSubjectClassGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Create Question   
        public async Task<string> InsertUpdateDeleteCreateQuestion(BALClassSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ClassSubjectTeacherData",obj.ClassSubjectTeacherData),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_ExamSubjectClassGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCreateQuestions(BALClassSubjectWithTeacher obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@ShiftCode",obj.ShiftCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ExamSubjectClassGroupMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Resource Master
        public async Task<string> InsertUpdateDeleteResourceMaster(BalResourceType obj)
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

        public async Task<DataTable> GetResourceMaster(BalResourceType obj)
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

        public async Task<DataSet> GetTeacherWorkLoad(RearrangeTimeTablePeriod obj)
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
        public async Task<string> InsertUpdateDeleteOnlinePeriodLink(BalOnlinePeriodLink obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId",obj.TransId),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ClassDate",obj.ClassDate),
                new SqlParameter("@ClassTiming",obj.ClassTime),
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
        public async Task<DataTable> GetOnlinePeriodLinkToStudent(BalOnlinePeriodLink obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@IsRecurring",obj.IsRecurring),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InsertUupdateDeleteOnlinePeriodLink]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Online Student joined
        public async Task<string> InsertUpdateDeleteOnlineStudentJoined(BalOnlinePeriodLink obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId",obj.TransId),
                new SqlParameter("@PeriodCode",obj.PeriodCode),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ClassDate",obj.ClassDate),
                new SqlParameter("@ClassTiming",obj.ClassTime),
                new SqlParameter("@OlClassTransId",obj.OLClassTransId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeleteOnlineClassJoined]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetOnlineStudentJoined(BalOnlinePeriodLink obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@OLClassTransId",obj.OLClassTransId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InsertUpdateDeleteOnlineClassJoined]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region TimeTable Substitution Report
        public async Task<DataTable> TimeTableSubstitutionReport(BALReplaceTeacher obj)
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
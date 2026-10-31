using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        public async Task<DataTable> GetClasses(BALGblClassMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_ClassMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSections(BALGblSectionMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId) ,
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_SectionMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBranches(BALGblBranchMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
           
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_BranchMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStreams(BALGblStreamMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_StreamMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCollegeCourse(BALGblCollegeCourseMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_CollegeCourseMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCollegeBranch(BALGblCollegeBranchMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@CollegeCourseCode",obj.CollegeCourseCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_CollegeBranchMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSessionMinMaxDate(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@SocietyCode",obj.SocietyCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@URL",obj.URL),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SessionMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSession(BALSessionMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@SocietyCode",obj.SocietyCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SessionMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteCourseMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseName",obj.CourseName),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_CourseMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCourseMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_CourseMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteClassMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@ClassName",obj.ClassName),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_ClassMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStreamMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_StreamMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteStreamMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@StreamName",obj.StreamName),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_StreamMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteSectionMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionName",obj.SectionName),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_SectionMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteCollegeCourseMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseName",obj.CourseName),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_CollegeCourseMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetCollegeCourseMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_CollegeCourseMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteCollegeBranchMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CollegeCourseCode",obj.CourseCode),
                new SqlParameter("@BranchName",obj.CourseBranchName),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_CollegeBranchMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectGroupMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_SubjectGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteSubjectGroupMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SubjectGroupName",obj.SubjectGroupName),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@DisplayOrder",obj.DisplayCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_SubjectGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_GetSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteSubjectMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SubjectGroupCode",obj.SubjectGroupCode),
                new SqlParameter("@SubjectName",obj.SubjectName),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@Abbreviation",obj.Abbreviation),
                new SqlParameter("@ColorCode",obj.ColorCode),
                new SqlParameter("@DisplayOrder",obj.DisplayCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")



             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_GetSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<string> InsertUpdateDeleteCollegeSemesterMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@Semester",obj.Semester),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_CollegeSemesterMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetSemesterMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@CourseCode",obj.CourseCode),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_CollegeSemesterMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #region SessionMaster
        public async Task<string> InsertUpdateDeleteSessionMaster(BALSessionMaster obj)
        {
            if (string.IsNullOrEmpty(obj.SessionText)) return "0";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@SessionId",obj._SessionId),
                new SqlParameter("@SessionName",obj.SessionText),
                new SqlParameter("@FromDate",obj.SessionStartDate),
                new SqlParameter("@ToDate",obj.SessionEndDate),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@AdmActiveSession",obj.IsAdmActiveSession),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("dbo.USP_SessionMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetSessionMaster(BALSessionMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SessionMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region FinancialYearMaster
        public async Task<string> InsertUpdateDeleteFinancialYearMaster(BALFinancialYearMaster obj)
        {
            if (string.IsNullOrEmpty(obj.FinancialYearName)) return "0";
            var param = new List<SqlParameter>
            {
                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@FinancialYearId",obj.FinancialYearId),
                new SqlParameter("@FinancialYearName",obj.FinancialYearName),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("dbo.USP_FinancialYearMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetFinancialYearMaster(BALFinancialYearMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FinancialYearId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_FinancialYearMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        public async Task<DataTable> GetBranchMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[gblmaster].[USP_BranchMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteBranchMaster(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@BranchName",obj.BranchName),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[gblmaster].[USP_BranchMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSubjectListUsingLoginId(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SubjectClassGroupMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetReportHeader(ReportHeader obj)
        {
            DataTable dt;
            if (obj.Action == 5 && (obj.ReportCategoryName == null || obj.ReportCategoryName == "")) return null;
            if (obj.Action == 4 || obj.Action == 5)
            {
                var param = new List<SqlParameter>
            {
                new SqlParameter("@ReportCategoryName", obj.ReportCategoryName),
                new SqlParameter("@RelationshipId", obj.RelationshipId),               
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@Action", obj.Action),
            };
                dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ReportHeader", CommandType.StoredProcedure, param.ToArray()));
                return dt;
            }
            else
            {
                return null;
            }
        }
        public async Task<DataTable> GetAllYear(BALGlobalMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_GetYear]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAllYears(BALSessionMaster obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_SessionMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetUrlAccessPermission(UrlAccessPermission obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@LoginId", obj.LoginId),
                new SqlParameter("@Url", obj.URL),
                new SqlParameter("@RelationshipId", obj.RelationshipId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@Action", 4)
            };
            DataTable dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_UrlAccessPermission", CommandType.StoredProcedure, param.ToArray()));

            return dt;
        }
        public async Task<DataTable> GetClassWisePeriods(BALGblClassMaster obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_GetClassWisePeriods", CommandType.StoredProcedure, param.ToArray()));
        }
    }
}

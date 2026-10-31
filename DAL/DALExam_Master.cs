using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
   public class DALExam_Master: IDALExam_Master
    {
        #region Exam Group Master
        public async Task<string> InsertUpdateDeleteExamGroupMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ExamGroupName",obj.ExamGroupName),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ExamGroupMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetExamGroupMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ExamGroupMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Exam Group To Exam
        public async Task<string> InsertUpdateDeleteExamGroupToExamMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@ExamData",obj.ExamData),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),
                new SqlParameter("@PrintDate",obj.PrintDate),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ExamGroupToExamMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetExamGroupToExamMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ExamGroupToExamMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Exam Structure Head
        public async Task<string> InsertUpdateDeleteExamStructureHead(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ExamStructureHead",obj.ExamStructureHead),
                new SqlParameter("@DisplayName",obj.DisplayName),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ExamStructureHeadMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetExamStructureHead(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ExamStructureHeadMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Report Card Component Master
        public async Task<string> InsertUpdateDeleteReportCardComponentMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),               
                new SqlParameter("@ComponentName",obj.ComponentName),
                new SqlParameter("@TypeChar",obj.TypeChar),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ReportCardComponentMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetReportCardComponentMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ReportCardComponentMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Skill Type Master
        public async Task<string> InsertUpdateDeleteSkillTypeMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SkillTypeName",obj.SkillTypeName),
                new SqlParameter("@TypeChar",obj.TypeChar),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SkillTypeMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetSkillTypeMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SkillTypeMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Skill Group Master
        public async Task<string> InsertUpdateDeleteSkillGroupMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SkillGroupName",obj.SkillGroupName),
                new SqlParameter("@SkillTypeCode",obj.SkillTypeCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SkillGroupMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetSkillGroupMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SkillGroupMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Skill Name Master
        public async Task<string> InsertUpdateDeleteSkillNameMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SkillName",obj.SkillName),
                new SqlParameter("@SkillTypeCode",obj.SkillTypeCode),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SkillNameMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetSkillNameMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SkillNameMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Skill Grade Master
        public async Task<string> InsertUpdateDeleteSkillGradeMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SkillTypeCode",obj.SkillTypeCode),
                new SqlParameter("@GradeFor",obj.GradeFor),
                new SqlParameter("@GradeType",obj.GradeType),
                new SqlParameter("@GradeName",obj.GradeName),
                new SqlParameter("@GradeDescription",obj.GradeDescription),
                new SqlParameter("@LowerLimit",obj.LowerLimit),
                new SqlParameter("@UpperLimit",obj.UpperLimit),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SkillGradeMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetSkillGradeMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SkillGradeMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Scholastic Group Skill Mapping
        public async Task<string> InsertUpdateDeleteSGroupSkillMapping(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),               
                new SqlParameter("@ComponentCode",obj.ComponentCode),
                new SqlParameter("@SubjectSkillData",obj.SubjectSkillData),               

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ScholasticGroupSkillMapping]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetSGroupSkillMapping(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ScholasticGroupSkillMapping]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  CoScholastic Group Skill Mapping
        public async Task<string> InsertUpdateDeleteCoSGroupSkillMapping(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),               
                new SqlParameter("@ComponentCode",obj.ComponentCode),
                new SqlParameter("@CoSkillData",obj.CoSkillData),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_CoScholasticGroupSkillMapping]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetCoSGroupSkillMapping(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CoScholasticGroupSkillMapping]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Teacher Assign Marks Entry For Skills 
        public async Task<string> InsertUpdateDeleteTeacherAssignMarksEntrySKills(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@BranchCode", obj.BranchCode),
                new SqlParameter("@SubjectCode", obj.SubjectCode),
                new SqlParameter("@SkillGroupCode", obj.SkillGroupCode),
                new SqlParameter("@SkillCode", obj.SkillCode),
                
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InsertUpdateDeleteTeacherAssignMarksEntryForSkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetTeacherAssignMarksEntrySKills(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SubjectCode", obj.SubjectCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                new SqlParameter("@UserId",obj.UserId),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetTeacherAssignMarksEntrySKills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Teacher Assign Marks Entry For CoSkills 
        public async Task<string> InsertUpdateDeleteTeacherAssignMarksEntryCoSKills(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@ComponentCode",obj.ComponentCode),
                //new SqlParameter("@CoSkillData",obj.CoSkillData),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InsertUpdateDeleteTeacherAssignMarksEntryForSkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetTeacherAssignMarksEntryCoSKills(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetTeacherAssignMarksEntryForSkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Report Card Printing        
        public async Task<DataTable> GetReportCard(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),
                new SqlParameter("@StudentList",obj.StudentList),
                
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[Usp_ReportCard]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Define Remark
        public async Task<string> InsertUpdateDeleteDefineRemark(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@RemarkPoints",obj.RemarkPoints),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_DefineRemarkMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetDefineRemark(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_DefineRemarkMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Define Keyword
        public async Task<string> InsertUpdateDeleteDefineKeyword(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Keyword",obj.Keyword),
                new SqlParameter("@KeywordDescription",obj.KeywordDescription),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_DefineKeywordMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetDefineKeyword(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_DefineKeywordMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Upload Principal Signature
        public async Task<string> InsertUpdateDeleteUploadPrincipalSignature(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SignatureImagePath",obj.SignatureImagePath),
                new SqlParameter("@Caption",obj.Caption),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_UploadPrincipalSignatureMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetPrincipalSignature(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_UploadPrincipalSignatureMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Upload Class Teacher Signature
        public async Task<DataTable> GetEmployeeCodeUsingClassScetion(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_UploadClassTeacherSignatureMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }

        public async Task<string> InsertUpdateDeleteUploadClassTeacherSignature(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@SignatureImagePath",obj.SignatureImagePath),
                new SqlParameter("@Caption",obj.Caption),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_UploadClassTeacherSignatureMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetClassTeacherSignature(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_UploadClassTeacherSignatureMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Define Exam Subject Wise
        public async Task<DataTable> GetSubjectCodeUsingClassSection(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SectionCode",obj.SectionCode),
                
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_DefineExamSubjectWise]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }

        public async Task<DataTable> GetExamByExamGroup(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_DefineExamSubjectWise]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<string> InsertUpdateDeleteDefineExamSubjectWise(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SubjectList",obj.SubjectList),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@EntryType",obj.EntryType),
                new SqlParameter("@SubHeadCodeList",obj.SubHeadCodeList),
                new SqlParameter("@TotalMarks",obj.TotalMarks),
                new SqlParameter("@MaxMarks",obj.MaxMarks),
                new SqlParameter("@PassingMarks",obj.PassingMarks),
                new SqlParameter("@ReportCardMark",obj.ReportCardMark),
                new SqlParameter("@DisplayTypeCode",obj.DisplayTypeCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_DefineExamSubjectWise]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetDefineExamSubjectWise(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@ExamCode",obj.ExamCode),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_DefineExamSubjectWise]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  All Subject Teacher Class Branch Stream
        public async Task<DataTable> GetAllSubjectTeacherClassBranchStreamList(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetAllSubject_According_TeacherClassBranchStream]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Assign Teacher For Co-Scholastic Skills Entry 
        public async Task<DataTable> GetEmployeeList(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AssignTeacherForCoscholasticEntrySkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<string> InsertUpdateDeleteAssignTeacherForCoScholasticSkillEntry(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                new SqlParameter("@SkillCode",obj.SkillCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),               

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InsertUpdateDeleteAssignTeacherForCoScholasticEntrySkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }

        public async Task<DataTable> GetAssignTeacherForCoscholasticSkillEntryList(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SectionCode",obj.SectionCode),
              
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetAssignTeacherForCoscholasticEntrySkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Report Card Format Mapping        

        public async Task<string> InsertUpdateDeleteReportCardFormatMapping(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@ReportFormat",obj.ReportFormat),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[Usp_ReportCardFormatMapping]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }

        public async Task<DataTable> GetReportCardFormatMapping(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[Usp_ReportCardFormatMapping]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Upload HM Signature
        public async Task<string> InsertUpdateDeleteUploadHMSignature(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SignatureImagePath",obj.SignatureImagePath),
                new SqlParameter("@Caption",obj.Caption),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_UploadHMSignatureMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetHMSignature(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_UploadHMSignatureMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Exam Sub Head Master
        public async Task<string> InsertUpdateDeleteExamSubHeadMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ExamSubHeadName",obj.ExamSubHeadName),
                new SqlParameter("@Description",obj.Description),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@IsWritten",obj.IsWritten),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ExamSubHeadMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetExamSubHeadMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ExamSubHeadMaster]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Class Exam Sub-Head Mapping
        public async Task<string> InsertUpdateDeleteClassExamSubHeadMapping(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@SubHeadCodeList",obj.SubHeadCodeList),
                new SqlParameter("@ExamWeigthageList",obj.ExamWeigthageList),
                new SqlParameter("@AnnualWeigthage",obj.AnnualWeigthage),
                new SqlParameter("@TotalMarks",obj.TotalMarks),                

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ClassExamSubHeadMapping]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetClassExamSubHeadMapping(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),                
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ClassExamSubHeadMapping]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion
        #region Report Header Settings
        public async Task<DataTable> GetReportCardHeaderSettings(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_GetReportHeaderCategory]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<string> InsertUpdateDeleteReportCardHeaderCategory(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@HeaderId",obj.HeaderId),
                new SqlParameter("@ReportCategoryId",obj.ReportCategoryId),
                new SqlParameter("@ReportCategoryDetails",obj.ReportCategoryHeaderDetails),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InsertUpdateDeleteReportCardHeader]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion 
    }
}

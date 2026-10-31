using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BAL;
using System.Data;
using System.Data.SqlClient;
using Repository;

namespace DAL
{
    public class DALExam_Trans : IDALExam_Trans
    {
        #region Scholastic Skill Grade Entry
        public async Task<string> InsertUpdateDeleteScholasticSkillGradeEntry(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@GroupTermCode",obj.GroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                new SqlParameter("@SkillCode",obj.SkillCode),
                new SqlParameter("@StudentLists",obj.StudentLists),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),

                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeleteScholasticSkillGradeEntry]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetScholasticSkillGradeEntry(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),

                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                new SqlParameter("@SkillCode",obj.SkillCode),
                new SqlParameter("@CreatedBy",obj.CreatedBy),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetScholasticSkillGradeEntry]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion
       
        #region CoScholastic Skill Grade Entry
        public async Task<DataTable> GetSkillNameMaster(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)

            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetCoScholasticEntrySkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetStudentList(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                new SqlParameter("@SkillCode",obj.SkillCode),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),

            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetCoScholasticEntrySkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetGradeList(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),

            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetCoScholasticEntrySkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetAllExamsGroup(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetCoScholasticEntrySkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<string> InsertUpdateDeleteCoScholasticSkillEntry(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                new SqlParameter("@SkillCode",obj.SkillCode),
                new SqlParameter("@StudentCode",obj.StudentCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeleteCoScholasticSkillEntry]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public async Task<DataTable> GetCoScholasticSkillEntry(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SkillGroupCode",obj.SkillGroupCode),
                new SqlParameter("@CreatedBy",obj.CreatedBy),                

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetCoScholasticEntrySkills]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region Marks Entry Subject Wise Student
        public async Task<DataTable> GetMarksEntrySubjectWiseStudentList(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@StreameCode",obj.StreamCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_GetStudentMarksEntrySubjectWise]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        public Task<string> InsertUpdateDeleteMarksEntrySubjectWise(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@GroupTermCode",obj.GroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@StudentLists",obj.StudentLists),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_InsertUpdateDeleteMarksEntry", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion      

        #region Student Remark Entry
        public async Task<string> InsertUpdateDeleteStudentRemarkEntry(BALExam obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@VType",obj.VType),
                
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@RemarkType",obj.RemarkType),
                new SqlParameter("@StudentList",obj.StudentList),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),                
               
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_StudentRemarkEntry]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }

        public async Task<DataTable> GetStudentRemarkEntry(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),
                new SqlParameter("@ExamCode",obj.ExamCode),
                new SqlParameter("@UserId",obj.UserId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),               
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_StudentRemarkEntry]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion
    }
}

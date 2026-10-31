using BAL;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        #region Concept Master

        public async Task<string> InsertUpdateDeleteConceptMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ConceptData",obj.ConceptData),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ConceptMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetConceptMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ConceptMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Syllabus Book Master

        public async Task<string> InsertUpdateDeleteSyllabusBookMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@EntryDate",obj.EntryDate),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@Publication",obj.Publication),
                new SqlParameter("@Year1",obj.Year1),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SyllabusBookMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSyllabusBookMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SyllabusBookMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Book Chapter Master
        public async Task<string> InsertUpdateDeleteBookChapterMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@EntryDate",obj.EntryDate),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@Publication",obj.Publication),
                new SqlParameter("@ChapterData",obj.ChapterData),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_BookChapterMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetBookChapterMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_BookChapterMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Class Wise Subject Wise Book
        public async Task<string> InsertUpdateDeleteClassWiseSubjectWiseBook(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@BookList",obj.BookList),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ClassWiseSubjectWiseBook]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetClassWiseSubjectWiseBook(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ClassWiseSubjectWiseBook]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Concept Chapter Mapping
        public async Task<string> InsertUpdateDeleteConceptChapterMapping(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@ConceptChapterMappingData",obj.ConceptChapterMappingData),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ConceptChapterMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetConceptChapterMapping(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@BookName",obj.BookName),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ConceptChapterMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Chapter Topic Mapping
        public async Task<string> InsertUpdateDeleteChapterTpoicMapping(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@ChapterTopicMappingData",obj.ChapterTopicMappingData),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ChapterTopicMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetChapterTopicMapping(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@ExamCode",obj.ExamCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ChapterTopicMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Topic SubTopic Mapping
        public async Task<string> InsertUpdateDeleteTpoicSubTopicMapping(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@ChapterCode",obj.ID),
                new SqlParameter("@TopicSubTopicMappingData",obj.TopicSubTopicMappingData),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_TopicSubTopicMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTopicSubTopicMapping(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@ChapterCode",obj.ID),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_TopicSubTopicMapping]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Exam Master
        public async Task<string> InsertUpdateDeleteExamMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@ExamName",obj.ExamName),
                new SqlParameter("@ExamDescription",obj.ExamDescription),
                new SqlParameter("@ClassList",obj.ClassList),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ExamMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetExamMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                //new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                //new SqlParameter("@ExamName",obj.ExamName),         

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ExamMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Marking Scheme Master
        public async Task<string> InsertUpdateDeleteMarkingSchemeMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@MarkingSchemeMasterData",obj.MarkingSchemeMasterData),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_MarkingSchemeMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetMarkingSchemeMaster(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),

                new SqlParameter("@AcademicSessionID",obj.AcademicSessionID),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@BookName",obj.BookName),
                new SqlParameter("@ChapterCode",obj.ID),
                new SqlParameter("@Examcode",obj.ExamCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_MarkingSchemeMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region APIs For Mobile App Or Assessment Transaction
        public async Task<string> InsertUpdateDeleteChapterStatus(BALAssessment obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",obj.Action),

                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@ChapterCode",obj.ChapterCode),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@StatusDate",obj.StatusDate),
                new SqlParameter("@Status",obj.Status),
                new SqlParameter("@Remark",obj.Remark),

                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_ChapterStatus]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetChapterStatus(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Status",obj.Status),
                new SqlParameter("@ChapterCode",obj.ChapterCode),

                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_ChapterStatus]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Assessment Report
        public async Task<DataTable> GetChapterStatusForReport(BALAssessment obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),

                new SqlParameter("@SessionId",obj.SessionId),
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_DeviationClassWiseSubjectWiseReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}
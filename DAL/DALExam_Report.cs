using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
   public class DALExam_Report:IDALExam_Report
    {
        #region  Report Card Format1        
        public async Task<DataTable> GetReportCardFormat1(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),

                new SqlParameter("@StudentCode",obj.StudentCode),                
                new SqlParameter("@StudentList",obj.StudentList),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[Usp_ReportCardFormat1]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

        #region  Marks Consolidate   
        public async Task<DataTable> GetMarksConsolidateData(BALExam obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),

                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@ExamGroupCode",obj.ExamGroupCode),

                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@StudentList",obj.StudentList),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_MarksConsolidateReport]", CommandType.StoredProcedure, param.ToArray())).ConfigureAwait(false);
        }
        #endregion

    }
}

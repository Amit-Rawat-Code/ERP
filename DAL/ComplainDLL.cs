using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Data.SqlTypes;
using BAL;

namespace DAL
{
    public partial class DLL
    {
        #region Complain Register
        public async Task<DataTable> ComplainRegisters(Complain objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@Code",objBM.Code),
                new SqlParameter("@ClassCode",objBM.ClassCode),
                new SqlParameter("@SectionCode",objBM.SectionCode),
                new SqlParameter("@RelationshipId",objBM.RelationshipId),
                new SqlParameter("@CreatedBy",objBM.CreatedBy),
                new SqlParameter("@ComplainAgainest",objBM.ComplainAgainest),
                new SqlParameter("@Sessionid",objBM.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_ComplainRegister]", CommandType.StoredProcedure, param.ToArray()));
        }
 
        
        public async Task<string> InsertDeleteComplainRegister(Complain objBM)
        {
            var param = new List<SqlParameter> 
         {
            new SqlParameter("@Action",objBM.Action),
            new SqlParameter("@Code",objBM.Code),
            new SqlParameter("@ComplainAgainest",objBM.ComplainAgainest),
            new SqlParameter("@Complain",objBM.ComplainText),
            new SqlParameter("@ClassCode",objBM.ClassCode),
            new SqlParameter("@SectionCode",objBM.SectionCode),
            new SqlParameter("@StudentList",objBM.StudentList),
            new SqlParameter("@ComplainBy",objBM.ComplainBy),
            new SqlParameter("@IsActive",objBM.IsActive),
            new SqlParameter("@RelationshipId",objBM.RelationshipId),
            new SqlParameter("@FYId",objBM.FYId),
            new SqlParameter("@SessionId",objBM.SessionId),
            new SqlParameter("@CreatedBy",objBM.CreatedBy),
            new SqlParameter("@UpdatedBy",objBM.UpdatedBy),
            new SqlParameter("@Result","")
           };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("dbo.USP_ComplainRegister", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> SearchStudent(Complain objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",8), 
                new SqlParameter("@StudentName",objBM.StudentName),
                new SqlParameter("@ClassCode",objBM.ClassCode),
                new SqlParameter("@SectionCode",objBM.SectionCode),
                new SqlParameter("@SchoolCode",objBM.SchoolCode),
                new SqlParameter("@BranchCode",objBM.BranchCode),
                new SqlParameter("@Sessionid",objBM.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_ComplainRegister]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetTeacherList(Complain objBM)
        {
            var param = new List<SqlParameter>
            {
            new SqlParameter("@Action",objBM.Action), 
            new SqlParameter("@RelationshipId",objBM.RelationshipId), 
            new SqlParameter("@ClassCode",objBM.ClassCode),
            new SqlParameter("@SectionCode",objBM.SectionCode),
            new SqlParameter("@Sessionid",objBM.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_DefineClassTeacherMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAllList(Complain objBM)
        {
            var param = new List<SqlParameter>
            {
            new SqlParameter("@Action",12),
            new SqlParameter("@Code",objBM.Code),
            new SqlParameter("@ComplainBy",objBM.ComplainBy),
            new SqlParameter("@SchoolCode",objBM.SchoolCode),
            new SqlParameter("@BranchCode",objBM.BranchCode),
            new SqlParameter("@Sessionid",objBM.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_ComplainRegister]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion


        #region Conversation Register
        public async Task<DataTable> ConversationRegisters(Complain objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@StudentId",objBM.StudentCode),
                new SqlParameter("@TeacherId",objBM.TeacherId),
                new SqlParameter("@CMode",objBM.Code),
                new SqlParameter("@SchoolCode",objBM.SchoolCode),
                new SqlParameter("@BranchCode",objBM.BranchCode),
                new SqlParameter("@Sessionid",objBM.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_ConversationRegister]", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<string> InsertDeleteConversationRegister(Complain objBM)
        {
            var param = new List<SqlParameter>
    {       new SqlParameter("@Action",objBM.Action),
            new SqlParameter("@StudentId",objBM.StudentCode),
            new SqlParameter("@TeacherId",objBM.TeacherId),
            new SqlParameter("@CMode",objBM.Code),
            new SqlParameter("@IsActive",objBM.IsActive),
            new SqlParameter("@SchoolCode",objBM.SchoolCode),
            new SqlParameter("@BranchCode",objBM.BranchCode),
            new SqlParameter("@SessionId",objBM.SessionId),
            new SqlParameter("@ConversationId",objBM.ConversationId),
            new SqlParameter("@Conversation",objBM.Conversation),
            new SqlParameter("@Result","")
    };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[dbo].[USP_ConversationRegister]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetConversationTeacherList(Common obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",5),
                new SqlParameter("@ClassId",obj.ClassCode),
                new SqlParameter("@SectionId",obj.SectionCode),
                new SqlParameter("@SchoolCode",obj.SchoolCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@Sessionid",obj.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_ConversationRegister]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> TopConversationRegisters(Complain objBM)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",objBM.Action),
                new SqlParameter("@ConversationId",objBM.ConversationId), 
                new SqlParameter("@SchoolCode",objBM.SchoolCode),
                new SqlParameter("@BranchCode",objBM.BranchCode),
                new SqlParameter("@Sessionid",objBM.SessionId),
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_ConversationRegister]", CommandType.StoredProcedure, param.ToArray()));
        } 
        public async Task<string> InsertConversationDetails(Complain objBM)
        { 
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", objBM.Action),
                new SqlParameter("@ConversationId", objBM.ConversationId),
                new SqlParameter("@Conversation", objBM.Conversation),
                new SqlParameter("@CMode",objBM.Code),
                new SqlParameter("@IsActive", objBM.IsActive),
                new SqlParameter("@SchoolCode", objBM.SchoolCode),
                new SqlParameter("@BranchCode", objBM.BranchCode),
                new SqlParameter("@SessionId", objBM.SessionId), 
                new SqlParameter("@CreatedBy", objBM.CreatedBy), 
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[dbo].[USP_ConversationRegister]", CommandType.StoredProcedure, param.ToArray()));
        }
        //--------------------------------------------------Teacher Conversation
        public async Task<DataTable> GetStudentList(Common obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",9),
                new SqlParameter("@TeacherId",obj.Code), 
                new SqlParameter("@SchoolCode",obj.SchoolCode),
                new SqlParameter("@BranchCode",obj.BranchCode), 
                new SqlParameter("@ClassId",obj.ClassCode),
                new SqlParameter("@SectionId",obj.SectionCode), 
                new SqlParameter("@Sessionid",obj.SessionId),
            }; 
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_ConversationRegister]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}

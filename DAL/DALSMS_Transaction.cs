using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public class DALSMS_Transaction : IDALSMS_Transaction
    {
        #region ComposeSms
        public async Task<DataTable> InsertUpdateDeleteComposeSms(BALComposeSms compose_sms)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",compose_sms.Action),
                new SqlParameter("@SmsSubjectCode",compose_sms.SmsSubjectCode),
                new SqlParameter("@SmsTemplateCode",compose_sms.SmsTemplateCode),
                new SqlParameter("@Language",compose_sms.Language),
                new SqlParameter("@TextMsg",compose_sms.TextMsg),
                new SqlParameter("@CopytoSenderListofEmployee",compose_sms.CopytoSenderListofEmployee),
                new SqlParameter("@UserType",compose_sms.UserType),
                new SqlParameter("@ListofSelectedClass",compose_sms.ListofSelectedClass),
                new SqlParameter("@ListofSelectedStudents",compose_sms.ListofSelectedStudents),
                new SqlParameter("@RoleId",compose_sms.RoleId),
                new SqlParameter("@ListofSelectedEmployee",compose_sms.ListofSelectedEmployee),
                new SqlParameter("@FYId",compose_sms.FYId),
                new SqlParameter("@IsActive",compose_sms.IsActive),
                new SqlParameter("@RelationshipId",compose_sms.RelationshipId),
                new SqlParameter("@SessionId",compose_sms.SessionId),
                new SqlParameter("@CreatedBy",compose_sms.CreatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_GEN_ComposeSms", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetComposeSms(BALComposeSms compose_sms)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",compose_sms.Action),
                new SqlParameter("@SessionId",compose_sms.SessionId),
                new SqlParameter("@RelationshipId",compose_sms.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_GEN_ComposeSms", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> CheckBalanceSMS(int? relationshipid)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",1),
                new SqlParameter("@Mode","Balance API"),
                new SqlParameter("@RelationshipId",relationshipid),
                new SqlParameter("@Result"," ")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnScalar("[mast].[USP_SendMessage]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Send Credentials
        public async Task<DataTable> GetSendCredentials(BALComposeSms compose_sms)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",compose_sms.Action),
                new SqlParameter("@UserType",compose_sms.UserType),
                new SqlParameter("@RelationshipId",compose_sms.RelationshipId),
                new SqlParameter("@ListofSelectedClass",compose_sms.ListofSelectedClass),
                new SqlParameter("@SessionId",compose_sms.SessionId),
                new SqlParameter("@SmsSubjectCode",compose_sms.SmsSubjectCode),
                new SqlParameter("@FeesDueOnTillDate",compose_sms.FeesDueOnTillDate),
                new SqlParameter("@SmsTemplateCode",compose_sms.SmsTemplateCode),
                new SqlParameter("@FYId",compose_sms.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("Trans.USP_GetSendCredentials", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> InsertSendSMSCredentials(BALComposeSms compose_sms)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",compose_sms.Action),
                new SqlParameter("@TransID",compose_sms.TransID),
                new SqlParameter("@PVNo",compose_sms.PVNo),
                new SqlParameter("@UserType",compose_sms.UserType),
                new SqlParameter("@SmsSubjectCode",compose_sms.SmsSubjectCode),                
                new SqlParameter("@SmsTemplateCode",compose_sms.SmsTemplateCode),
                new SqlParameter("@ListofSelectedClass",compose_sms.ListofSelectedClass),
                new SqlParameter("@ListofSelectedStudentsOrStaff",compose_sms.ListofSelectedStudentsOrStaff),
                new SqlParameter("@SessionId",compose_sms.SessionId),
                new SqlParameter("@FYId",compose_sms.FYId),                
                new SqlParameter("@RelationshipId",compose_sms.RelationshipId),
                new SqlParameter("@CreatedBy",compose_sms.CreatedBy),
                new SqlParameter("@Result"," ")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_SendSMSCredentials", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Send Fees Reminder        
        public async Task<DataTable> InsertSendFeesReminder(BALComposeSms compose_sms)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",compose_sms.Action),
                new SqlParameter("@TransID",compose_sms.TransID),
                new SqlParameter("@PVNo",compose_sms.PVNo),
                new SqlParameter("@UserType",compose_sms.UserType),
                new SqlParameter("@SmsSubjectCode",compose_sms.SmsSubjectCode),
                new SqlParameter("@SmsTemplateCode",compose_sms.SmsTemplateCode),
                new SqlParameter("@ListofSelectedClass",compose_sms.ListofSelectedClass),
                new SqlParameter("@ListofSelectedStudentsOrStaff",compose_sms.ListofSelectedStudentsOrStaff),
                new SqlParameter("@SessionId",compose_sms.SessionId),
                new SqlParameter("@FYId",compose_sms.FYId),
                new SqlParameter("@RelationshipId",compose_sms.RelationshipId),
                new SqlParameter("@CreatedBy",compose_sms.CreatedBy),
                new SqlParameter("@Result"," ")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_SendFeesReminderSMS", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}


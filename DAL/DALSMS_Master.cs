using BAL;
using Repository;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public class DALSMS_Master : IDALSMS_Master
    {
        #region SMSSubjectMaster
        public async Task<string> InsertUpdateDeleteSMSSubjectMaster(BALSMSSubject sms_subject)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",sms_subject.Action),
                new SqlParameter("@Code",sms_subject.Code),
                new SqlParameter("@SmsSubjectName",sms_subject.SmsSubjectName),
                new SqlParameter("@FYId",sms_subject.FYId),
                new SqlParameter("@IsActive",sms_subject.IsActive),
                new SqlParameter("@RelationshipId",sms_subject.RelationshipId),
                new SqlParameter("@SessionId",sms_subject.SessionId),
                new SqlParameter("@CreatedBy",sms_subject.CreatedBy),
                new SqlParameter("@UpdatedBy",sms_subject.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SmsSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSMSSubjectMaster(BALSMSSubject sms_subject)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",sms_subject.Action),
                new SqlParameter("@SessionId",sms_subject.SessionId),
                new SqlParameter("@RelationshipId",sms_subject.RelationshipId),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SmsSubjectMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region SMSTemplateMaster
        public async Task<string> InsertUpdateDeleteSMSTemplateMaster(BALSMSTemplate sms_template)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",sms_template.Action),
                new SqlParameter("@Code",sms_template.Code),
                new SqlParameter("@SmsSubjectCode",sms_template.SmsSubjectCode),
                new SqlParameter("@SmsTemplateName",sms_template.SmsTemplateName),
                new SqlParameter("@SmsTemplateID",sms_template.SmsTemplateID),
                new SqlParameter("@SmsTemplateDetail",sms_template.SmsTemplateDetail),
                new SqlParameter("@UserType",sms_template.UserType),
                new SqlParameter("@FYId",sms_template.FYId),
                new SqlParameter("@IsActive",sms_template.IsActive),
                new SqlParameter("@RelationshipId",sms_template.RelationshipId),
                new SqlParameter("@SessionId",sms_template.SessionId),
                new SqlParameter("@CreatedBy",sms_template.CreatedBy),
                new SqlParameter("@UpdatedBy",sms_template.UpdatedBy),
                new SqlParameter("@Result"," ")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_SMSTemplateMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetSMSTemplateMaster(BALSMSTemplate sms_template)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",sms_template.Action),
                new SqlParameter("@SessionId",sms_template.SessionId),
                new SqlParameter("@RelationshipId",sms_template.RelationshipId),
                new SqlParameter("@SmsSubjectCode",sms_template.SmsSubjectCode),
                new SqlParameter("@UserType",sms_template.UserType)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SMSTemplateMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}


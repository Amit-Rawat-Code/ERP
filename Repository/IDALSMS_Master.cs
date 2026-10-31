using BAL;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
   public interface IDALSMS_Master
    {
        #region SMSSubjectMaster
        Task<string> InsertUpdateDeleteSMSSubjectMaster(BALSMSSubject sms_subject);
        Task<DataTable> GetSMSSubjectMaster(BALSMSSubject sms_subject);
        #endregion

        #region SMSTemplateMaster
        Task<string> InsertUpdateDeleteSMSTemplateMaster(BALSMSTemplate sms_template);
        Task<DataTable> GetSMSTemplateMaster(BALSMSTemplate sms_template);
        #endregion
    }
}

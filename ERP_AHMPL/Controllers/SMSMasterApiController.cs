using BAL;
using DAL;
using Repository;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    
    public class SMSMasterApiController : ApiController
    {
        readonly IDALSMS_Master _IDALSMS_Master;

        public SMSMasterApiController(IDALSMS_Master IDALSMS_Master)
        {
            this._IDALSMS_Master = IDALSMS_Master;
        }

        #region SMSSubjectMaster
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSMSSubjectMaster(BALSMSSubject sms_subject)
        {
            string result = await _IDALSMS_Master.InsertUpdateDeleteSMSSubjectMaster(sms_subject).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetSMSSubjectMaster(BALSMSSubject sms_subject)
        {
            DataTable dt = await _IDALSMS_Master.GetSMSSubjectMaster(sms_subject).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region SMSTemplateMaster
        [HttpPost]
        public async Task<string> InsertUpdateDeleteSMSTemplateMaster(BALSMSTemplate sms_template)
        {
            string result = await _IDALSMS_Master.InsertUpdateDeleteSMSTemplateMaster(sms_template).ConfigureAwait(false);
            return result;
        }
        [HttpPost]
        public async Task<DataTable> GetSMSTemplateMaster(BALSMSTemplate sms_template)
        {
            DataTable dt = await _IDALSMS_Master.GetSMSTemplateMaster(sms_template).ConfigureAwait(false);
            return dt;
        }
        #endregion
    }
}

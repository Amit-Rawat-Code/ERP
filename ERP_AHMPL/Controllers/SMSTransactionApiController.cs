using BAL;
using DAL;
using Repository;
using System;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    
    public class SMSTransactionApiController : ApiController
    {
        readonly IDALSMS_Transaction _IDALSMS_Transaction;

        public SMSTransactionApiController(IDALSMS_Transaction IDALSMS_Transaction)
        {
            this._IDALSMS_Transaction = IDALSMS_Transaction;
        }

        #region ComposeSms
        [HttpPost]
        public async Task<object> InsertUpdateDeleteComposeSms(BALComposeSms compose_sms)
        {
            string result = "";
            string sms_result = "";
            string smsapi = "";
            string balanceapi = await _IDALSMS_Transaction.CheckBalanceSMS(compose_sms.RelationshipId).ConfigureAwait(false);
            if(!string.IsNullOrEmpty(balanceapi))
            {
                string sms_balance_str = await compose_sms.CheckSMSBalance(balanceapi).ConfigureAwait(false);
                string sms_balance = sms_balance_str;
                if (int.TryParse(sms_balance, out _))
                {
                    if (Convert.ToInt32(sms_balance) > 0)
                    {
                        DataTable dt = await _IDALSMS_Transaction.InsertUpdateDeleteComposeSms(compose_sms).ConfigureAwait(false);
                        if (dt.Rows.Count > 0)
                        {
                            result = dt.Rows[0]["Result"].ToString();
                            smsapi = dt.Rows[0]["GENSMSApi"].ToString();
                        }
                        if (result == "1")
                        {
                            sms_result = await compose_sms.SendSMS(smsapi).ConfigureAwait(false);
                            if (sms_result.Length == 24)
                            {
                                sms_result = "1";
                            }
                        }
                    }
                    else
                    {
                        sms_result = "No SMS Balance.";
                    }
                }
                else
                {
                    sms_result = sms_balance;
                }
            }
         
            return new { Result = result, Sms_Result = sms_result };
        }
        [HttpPost]
        public async Task<DataTable> GetComposeSms(BALComposeSms compose_sms)
        {
            DataTable dt = await _IDALSMS_Transaction.GetComposeSms(compose_sms).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Send Credentials
        [HttpPost]
        public async Task<DataTable> GetSendCredentials(BALComposeSms compose_sms)
        {
            DataTable dt = await _IDALSMS_Transaction.GetSendCredentials(compose_sms).ConfigureAwait(false);
            return dt;
        }
        [HttpPost]
        public async Task<object> InsertSendSMSCredentials(BALComposeSms compose_sms)
        {
            string result = "";
            string sms_result = "";
            string smsapi = "";
            string balanceapi = await _IDALSMS_Transaction.CheckBalanceSMS(compose_sms.RelationshipId).ConfigureAwait(false);
            if (!string.IsNullOrEmpty(balanceapi))
            {
                string sms_balance_str = await compose_sms.CheckSMSBalance(balanceapi).ConfigureAwait(false);
                string sms_balance = sms_balance_str;
                if (int.TryParse(sms_balance, out _))
                {
                    if (Convert.ToInt32(sms_balance) > 0)
                    {
                        DataTable dt = await _IDALSMS_Transaction.InsertSendSMSCredentials(compose_sms).ConfigureAwait(false);
                        if (dt.Rows.Count > 0)
                        {
                            foreach (DataRow row in dt.Rows)
                            {
                                result = row["Result"].ToString();
                                smsapi = row["GENSMSApi"].ToString();
                                if (result == "1")
                                {
                                    sms_result = await compose_sms.SendSMS(smsapi).ConfigureAwait(false);
                                    if (sms_result.Length == 24)
                                    {
                                        sms_result = "1";
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        sms_result = "No SMS Balance.";
                    }
                }
                else
                {
                    sms_result = sms_balance;
                }
            }

            return new { Result = result, Sms_Result = sms_result };
        }
        #endregion
    }
}

using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BAL.PaymentGateway.HDFC;
using System.Configuration;
using System.IO;
using System.Reflection;
using System.Web;
using CCA.Util;
//using Newtonsoft.Json;
using System.Collections.Specialized;
using System.Data;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Text;
using BAL.PaymentGateway;
using Newtonsoft.Json.Linq;

namespace DAL.PaymentService.HDFC
{
    public class HDFCPaymentGateWay: IHDFCPaymentGateWay
    {
        //private IWebHelper _webHelper = null;
        //private readonly string baseRequestUrl = null;
        //private readonly string accessCode = null;
        //private readonly string encryptionKey = null;
        //public HDFCPaymentGateWay()
        //{
        //    encryptionKey = ConfigurationManager.AppSettings["HDFCEncryptionKey"];
        //    accessCode = ConfigurationManager.AppSettings["HDFCAccessCode"];
        //    _webHelper = new WebHelper();
        //}

        //public async Task<string> CreatePaymentRequestAsync(PaymentRequest paymentRequest)
        //{
        //    var requestUrl = Path.Combine(baseRequestUrl, "/transaction/transaction.do?command=initiateTransaction");
        //    var requestBody = GetRequestBodyForPayment(paymentRequest, encryptionKey);
        //    var requestForPost = JsonConvert.SerializeObject(new
        //    {
        //        encRequest = requestBody,
        //        access_code = accessCode
        //    });

        //    var paymentResponse = await _webHelper.ProcessRequestAsync(requestUrl, requestForPost).ConfigureAwait(false);
        //    return paymentResponse;
        //}
        //private string GetRequestBodyForPayment(PaymentRequest paymentRequest, string encKey)
        //{
        //    Dictionary<string, object> requestProperties = new Dictionary<string, object>();
        //    Type type = typeof(PaymentRequest);
        //    foreach (PropertyInfo prop in type.GetProperties())
        //        requestProperties.Add(prop.Name, prop.GetValue(paymentRequest));
        //    var rawRequest = HttpUtility.UrlEncode(string.Join("&", requestProperties.Select(kvp =>
        //                                      string.Format("{0}={1}", kvp.Key, kvp.Value))));

        //    var ccaCrypto = new CCACrypto();
        //    return ccaCrypto.Encrypt(rawRequest, encKey);

        //}

        public NameValueCollection CreatePaymentRequestAsync(HDFCPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials)
        {
            var requestBody = GetRequestBodyForPayment(paymentRequest, gatewayCredentials);
            NameValueCollection nameValueCollection = new NameValueCollection
            {
                { "encRequest", requestBody },
                { "access_code", gatewayCredentials.AccessCode }
            };
            return nameValueCollection;
        }
        private string GetPlainRequestBodyForPayment(HDFCPaymentRequest paymentRequest)
        {
            var rawRequest = "merchant_id=" + paymentRequest.merchant_id
            + "&" + "order_id=" + paymentRequest.order_id
            + "&" + "amount=" + paymentRequest.amount
            + "&" + "currency=" + paymentRequest.currency
            + "&" + "redirect_url=" + paymentRequest.redirect_url
            + "&" + "cancel_url=" + paymentRequest.cancel_url
            + "&" + "billing_name=" + paymentRequest.billing_name
            + "&" + "billing_address=" + paymentRequest.billing_address
            + "&" + "billing_city=" + paymentRequest.billing_city
            + "&" + "billing_state=" + paymentRequest.billing_state
            + "&" + "billing_zip=" + paymentRequest.billing_zip
            + "&" + "billing_country=" + paymentRequest.billing_country
            + "&" + "billing_tel=" + paymentRequest.billing_tel
            + "&" + "billing_email=" + paymentRequest.billing_email
            + "&" + "delivery_name=" + paymentRequest.delivery_name
            + "&" + "delivery_address=" + paymentRequest.delivery_address
            + "&" + "delivery_city=" + paymentRequest.delivery_city
            + "&" + "delivery_state=" + paymentRequest.delivery_state
            + "&" + "delivery_zip=" + paymentRequest.delivery_zip
            + "&" + "delivery_country=" + paymentRequest.delivery_country
            + "&" + "delivery_tel=" + paymentRequest.delivery_tel
            + "&" + "merchant_param1=" + paymentRequest.merchant_param1
            + "&" + "merchant_param2=" + paymentRequest.merchant_param2
            + "&" + "merchant_param3=" + paymentRequest.merchant_param3
            + "&" + "merchant_param4=" + paymentRequest.merchant_param4
            + "&" + "merchant_param5=" + paymentRequest.merchant_param5
            + "&" + "promo_code=" + paymentRequest.promo_code
            + "&" + "customer_identifier=" + paymentRequest.customer_identifier;

            return rawRequest;
        }

        private string GetRequestBodyForPayment(HDFCPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials)
        {


            //Dictionary<string, object> requestProperties = new Dictionary<string, object>();
            //Type type = typeof(HDFCPaymentRequest);
            //foreach (PropertyInfo prop in type.GetProperties())
            //    requestProperties.Add(prop.Name, prop.GetValue(paymentRequest));
            //var rawRequest = string.Join("&", requestProperties.Select(kvp =>
            //                                  string.Format("{0}={1}", kvp.Key, kvp.Value)));

            var rawRequest = GetPlainRequestBodyForPayment(paymentRequest);
            var ccaCrypto = new CCACrypto();
            return ccaCrypto.Encrypt(rawRequest, gatewayCredentials.EncryptionKey);

        }

        public JObject CreatePaymentRequest(HDFCPaymentRequest payment, GatewayCredentials gatewayCredentials)
        {
            JObject result;
            try {
                payment.merchant_id = gatewayCredentials.MerchantId;
                payment.redirect_url = gatewayCredentials.RedirectUrl;
                payment.cancel_url = gatewayCredentials.CancelUrl;

                NameValueCollection nameValueCollection_for_request = CreatePaymentRequestAsync(payment, gatewayCredentials);
                //NameValueCollection nameValueCollection_for_request = new NameValueCollection
                //{
                //    { "encRequest", nameValueCollection["encRequest"] },
                //    { "access_code", nameValueCollection["access_code"] }
                //};
                result = new JObject
                {
                    { "StatusCode", "1" },
                    { "ErrorMsg", "" },
                    { "PlainText", GetPlainRequestBodyForPayment(payment) },
                    { "EncryptedText", nameValueCollection_for_request["encRequest"] },
                    { "Form", PreparePOSTForm(gatewayCredentials.RequestUrl, nameValueCollection_for_request) }
                };
                //var result = new JObject
                //{
                //    { "Form", PreparePOSTForm(gatewayCredentials.RequestUrl, nameValueCollection_for_request) }
                //};
            }
            catch(Exception ex)
            {
                result = new JObject
                {
                    { "StatusCode", "0" },
                    { "ErrorMsg", ex.Message },
                    { "PlainText", "" },
                    { "EncryptedText", "" },
                    { "Form", "" }
                };
            }
            
            return result;
        }

        private string PreparePOSTForm(string url, NameValueCollection data)
        {
            try
            {
                //Set a name for the form

                string formID = "PostForm";

                //Build the form using the specified data to be posted.
                StringBuilder strForm = new StringBuilder();
                strForm.Append("<form id=\"" + formID + "\" name=\"" + formID + "\" action=\"" + url + "\" method=\"POST\">");
                foreach (string key in data)
                {
                    strForm.Append("<input type=\"hidden\" name=\"" + key + "\" value=\"" + data[key] + "\">");
                }
                strForm.Append("</form>");

                //Build the JavaScript which will do the Posting operation.
                StringBuilder strScript = new StringBuilder();
                strScript.Append("<script language='javascript'>");
                strScript.Append("var v" + formID + " = document." + formID + ";");
                strScript.Append("v" + formID + ".submit();");
                strScript.Append("</script>");

                //Return the form and the script concatenated. (The order is important, Form then JavaScript)
                //strForm.ToString() + strScript.ToString();
                return strForm.ToString() + strScript.ToString();

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

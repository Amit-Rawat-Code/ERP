using BAL.PaymentGateway;
using BAL.PaymentGateway.HDFC;
using CCA.Util;
using Newtonsoft.Json;
using Repository;
using System;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace DAL.PaymentService.HDFC
{
    public class HDFCPaymentStatus : IHDFCPaymentStatus
    {
        //private readonly string statusRequestUrl = null;
        //private readonly string accessCode = null;
        //private readonly string encryptionKey = null;
        //public HDFCPaymentStatus()
        //{
        //    statusRequestUrl = ConfigurationManager.AppSettings["HDFCStatusRequestUrl"];
        //    encryptionKey = ConfigurationManager.AppSettings["HDFCEncryptionKey"];
        //    accessCode = ConfigurationManager.AppSettings["HDFCAccessCode"];
        //}

        public async Task<string> CreatePaymentStatusRequestAsync(HDFCPaymentVarification hdfcPaymentVarification, GatewayCredentials paymentGatewayCredentials)
        {
            var paymentStatusResponse =await GetRequestBodyForPaymentStatusAsync(hdfcPaymentVarification, paymentGatewayCredentials);
            return paymentStatusResponse;
        }

        private async Task<string> GetRequestBodyForPaymentStatusAsync(HDFCPaymentVarification hdfcPaymentVarification, GatewayCredentials paymentGatewayCredentials)
        {
            try
            {

                string encJson = "";

                CCACrypto ccaCrypto = new CCACrypto();
                var jsonString = JsonConvert.SerializeObject(new { order_no = hdfcPaymentVarification.OrderId });
                encJson = ccaCrypto.Encrypt(jsonString, paymentGatewayCredentials.EncryptionKey);

                // make query for the status of the order to ccAvenues change the command param as per your need
                string authQueryUrlParam = "enc_request=" + encJson + "&access_code=" + paymentGatewayCredentials.AccessCode + "&request_type=JSON&response_type=JSON&command=orderStatusTracker&version=1.2";

                // Url Connection
                string message =await PostPaymentRequestToGatewayAsync(paymentGatewayCredentials.StatusRequestUrl, authQueryUrlParam);
                
                if(!message.Contains("Exception occured while connection"))
                {
                    NameValueCollection param = getResponseMap(message);
                    string status = "";
                    string encResJson = "";
                    if (param != null && param.Count == 2)
                    {
                        for (int i = 0; i < param.Count; i++)
                        {
                            if ("status".Equals(param.Keys[i]))
                            {
                                status = param[i];
                            }
                            if ("enc_response".Equals(param.Keys[i]))
                            {
                                encResJson = param[i];
                                //Response.Write(encResXML);
                            }
                        }
                        if (!"".Equals(status) && status.Equals("0"))
                        {
                            string ResJson = ccaCrypto.Decrypt(encResJson, paymentGatewayCredentials.EncryptionKey);
                            return ResJson;
                        }
                        else if (!"".Equals(status) && status.Equals("1"))
                        {
                            return "failure response from ccAvenues: " + encResJson;
                        }

                    }
                    return "";
                }
                else
                {
                    return message;
                }
          
            }
            catch (Exception exp)
            {
                return "Exception " + exp;

            }
        }

        private async Task<string> PostPaymentRequestToGatewayAsync(string queryUrl, string urlParam)
        {

            string message = "";
            try
            {
                StreamWriter myWriter = null;// it will open a http connection with provided url
                WebRequest objRequest = WebRequest.Create(queryUrl);//send data using objxmlhttp object
                objRequest.Method = "POST";
                //objRequest.ContentLength = TranRequest.Length;
                objRequest.ContentType = "application/x-www-form-urlencoded";//to set content type
                myWriter = new System.IO.StreamWriter(objRequest.GetRequestStream());
                myWriter.Write(urlParam);//send data
                myWriter.Close();//closed the myWriter object
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls| SecurityProtocolType.Ssl3;
                // Getting Response
                System.Net.HttpWebResponse objResponse = (System.Net.HttpWebResponse)await objRequest.GetResponseAsync().ConfigureAwait(false);//receive the responce from objxmlhttp object 
                using (System.IO.StreamReader sr = new System.IO.StreamReader(objResponse.GetResponseStream()))
                {
                    message = sr.ReadToEnd();
                    //Response.Write(message);
                }
            }
            catch (Exception exception)
            {
                message="Exception occured while connection." + exception;
            }
            return message;

        }

        private NameValueCollection getResponseMap(string message)
        {
            NameValueCollection Params = new NameValueCollection();
            if (message != null || !"".Equals(message))
            {
                string[] segments = message.Split('&');
                foreach (string seg in segments)
                {
                    string[] parts = seg.Split('=');
                    if (parts.Length > 0)
                    {
                        string Key = parts[0].Trim();
                        string Value = parts[1].Trim();
                        Params.Add(Key, Value);
                    }
                }
            }
            return Params;
        }
    }
}

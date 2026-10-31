using BAL.PaymentGateway;
using BAL.PaymentGateway.AXIS;
using Newtonsoft.Json;
using Repository;
using System;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DAL.PaymentService.AXIS
{
    public class AXISPaymentStatus : IAxisPaymentStatus
    { 
        public async Task<string> CreatePaymentStatusRequestAsync(AXISPaymentVarification axisPaymentVarification, GatewayCredentials paymentGatewayCredentials)
        {
            var requestBody =GetRequestBodyForPaymentStatusAsync(axisPaymentVarification, paymentGatewayCredentials);
            var plainBody = GetPlainTextRequestBodyForPayment(axisPaymentVarification, paymentGatewayCredentials);
            NameValueCollection nameValueCollection = new NameValueCollection
            {
                { "i", requestBody }
                //{ "j", plainBody }
            };
            var res = await GetWebServiceResponse(nameValueCollection, paymentGatewayCredentials.StatusRequestUrl, "", 1050, "POST", "", "application/x-www-form-urlencoded");
            //var res = JsonConvert.SerializeObject(nameValueCollection);
            return res;
        }
        private string GetRequestBodyForPaymentStatusAsync(AXISPaymentVarification paymentRequest, GatewayCredentials gatewayCredentials)
        {
            paymentRequest.CID = gatewayCredentials.CID;
            paymentRequest.TYP = gatewayCredentials.TYP;
            paymentRequest.CKS = gatewayCredentials.CKS;

            string StrCheckSumString = paymentRequest.CID + paymentRequest.OrderId + paymentRequest.OrderId + paymentRequest.CKS;
            string Checksum = Sha256_hash(StrCheckSumString);
            //Sample values has been passed in each parameter. Please update with your values.
            string PlainText = "CID=" + paymentRequest.CID + "&RID=" + paymentRequest.OrderId +"&BRN=" + paymentRequest.BankRefId + "&VER=1.0&TYP=" + paymentRequest.TYP + "&CRN=" + paymentRequest.OrderId + "&CKS=" + Checksum;
            return Encrypt(PlainText, gatewayCredentials.EncryptionKey);
        }

        private string GetPlainTextRequestBodyForPayment(AXISPaymentVarification paymentRequest, GatewayCredentials gatewayCredentials)
        {
            paymentRequest.CID = gatewayCredentials.CID;
            paymentRequest.TYP = gatewayCredentials.TYP;
            paymentRequest.CKS = gatewayCredentials.CKS;

            string StrCheckSumString = paymentRequest.CID + paymentRequest.OrderId + paymentRequest.OrderId + paymentRequest.CKS;
            string Checksum = Sha256_hash(StrCheckSumString);
            //Sample values has been passed in each parameter. Please update with your values.
            string PlainText = "CID=" + paymentRequest.CID + "&RID=" + paymentRequest.OrderId + "&BRN=" + paymentRequest.BankRefId + "&VER=1.0&TYP=" + paymentRequest.TYP + "&CRN=" + paymentRequest.OrderId + "&CKS=" + Checksum;
            return PlainText;
        }
        public static String Sha256_hash(String value)
        {
            StringBuilder Sb = new StringBuilder();
            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));
                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }
            return Sb.ToString();
        }
        public string Encrypt(string input, string key)
        {
            byte[] keyArray = UTF8Encoding.UTF8.GetBytes(key);
            byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(input);
            Aes kgen = Aes.Create("AES");
            kgen.Mode = CipherMode.ECB;
            //kgen.Padding = PaddingMode.None;
            kgen.Key = keyArray;
            ICryptoTransform cTransform = kgen.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }
        public Boolean AcceptAllCertifications(Object sender, System.Security.Cryptography.X509Certificates.X509Certificate certification, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }
        public async Task<string> GetWebServiceResponse(NameValueCollection reqdata, string Url, string Proxy, int Port, string Method, string SOAPAction, string ContentType)
        {
            string Response = string.Empty;
            try
            {
                using (WebClient client = new WebClient())
                {
                    //"https://www.payism.biz/FundLoad/AxisService.asmx/ValidateRequest"
                    ServicePointManager.ServerCertificateValidationCallback = AcceptAllCertifications;
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    ////Proxy and port use as per your company policy
                    if (Proxy != "")
                    {
                        WebProxy wp = new WebProxy(Proxy, Port);
                        client.Proxy = wp;
                    }

                    byte[] responsebytes =await client.UploadValuesTaskAsync(Url, "POST", reqdata);
                    Response = Encoding.UTF8.GetString(responsebytes);

                }
            }
            catch (WebException webex)
            {
                WebResponse errResp = webex.Response;
                using (Stream respStream = errResp.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(respStream);
                    Response = reader.ReadToEnd();

                    //  Response = string.Empty;
                }
            }
            return Response;
        }
    }
}

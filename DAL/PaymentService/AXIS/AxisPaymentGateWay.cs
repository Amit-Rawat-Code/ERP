using Repository;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Text;
using System.Security.Cryptography;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using BAL.PaymentRequest.AXIS;
using System.Threading.Tasks;
using BAL.PaymentGateway;

namespace DAL.PaymentService.AXIS
{
    public class AxisPaymentGateWay : IAxisPaymentGateWay
    {
        public NameValueCollection CreatePaymentRequestAsync(AxisPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials)
        {
            var requestBody =GetRequestBodyForPayment(paymentRequest, gatewayCredentials);
            var plainBody =GetPlainTextRequestBodyForPayment(paymentRequest, gatewayCredentials);
            NameValueCollection nameValueCollection = new NameValueCollection
            {
                { "i", requestBody },
                { "j", plainBody }
            };
            return nameValueCollection;
        }
        private string GetRequestBodyForPayment(AxisPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials)
        {
            paymentRequest.CID = gatewayCredentials.CID;
            paymentRequest.TYP = gatewayCredentials.TYP;
            paymentRequest.RTU = gatewayCredentials.RedirectUrl;
            paymentRequest.CKS = gatewayCredentials.CKS;

            string ppiParameter = CreatePPIString(paymentRequest);

            string StrCheckSumString = paymentRequest.CID + paymentRequest.RID + paymentRequest.CRN + paymentRequest.AMT + paymentRequest.CKS;
            string Checksum = Sha256_hash(StrCheckSumString);
            //Sample values has been passed in each parameter. Please update with your values.
            string PlainText = "CID=" + paymentRequest.CID + "&RID=" + paymentRequest.RID + "&CRN=" + paymentRequest.CRN + "&AMT=" + paymentRequest.AMT + "&VER=1.0&TYP="+ paymentRequest.TYP + "&CNY=INR&RTU="+ paymentRequest.RTU + "&PPI="+ ppiParameter + "&RE1=MN&RE2=&RE3=&RE4=&RE5=&CKS=" + Checksum;
            return Encrypt(PlainText, gatewayCredentials.EncryptionKey);

        }
        private string CreatePPIString(AxisPaymentRequest paymentRequest)
        {
            switch (paymentRequest.RelationshipId)
            {
                case 5:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.ClassSection + "|" + paymentRequest.StudentName + "|" + paymentRequest.AMT;
                case 15:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.Remark + "|" + paymentRequest.EmailId + "|" + paymentRequest.MobileNo + "|" + paymentRequest.AMT;
                case 25:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.Remark + "|" + paymentRequest.EmailId + "|" + paymentRequest.MobileNo + "|" + paymentRequest.AMT;
                case 7:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.Remark + "|" + paymentRequest.EmailId + "|" + paymentRequest.MobileNo + "|" + paymentRequest.AMT;
                case 21:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.MobileNo + "|" + paymentRequest.EmailId + "|" + paymentRequest.Remark + "|" + paymentRequest.AMT;
                case 18:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.MobileNo + "|" + paymentRequest.EmailId + "|" + paymentRequest.Remark + "|" + paymentRequest.AMT;
                case 9:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.Remark + "|" + paymentRequest.EmailId + "|" + paymentRequest.MobileNo + "|" + paymentRequest.AMT;
                case 14:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.Remark + "|" + paymentRequest.EmailId + "|" + paymentRequest.MobileNo + "|" + paymentRequest.AMT;
                case 12:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.MobileNo + "|" + paymentRequest.EmailId + "|" + paymentRequest.Remark + "|" + paymentRequest.AMT;
                case 24:
                    return paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.Remark + "|" + paymentRequest.EmailId + "|" + paymentRequest.MobileNo + "|" + paymentRequest.AMT;
                default:
                    return "";
            }
        }
        private string GetPlainTextRequestBodyForPayment(AxisPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials)
        {
            paymentRequest.CID = gatewayCredentials.CID;
            paymentRequest.TYP = gatewayCredentials.TYP;
            paymentRequest.RTU = gatewayCredentials.RedirectUrl;
            paymentRequest.CKS = gatewayCredentials.CKS;
            string ppiParameter = CreatePPIString(paymentRequest);

            string StrCheckSumString = paymentRequest.CID + paymentRequest.RID + paymentRequest.CRN + paymentRequest.AMT + paymentRequest.CKS;
            string Checksum = Sha256_hash(StrCheckSumString);
            //Sample values has been passed in each parameter. Please update with your values.
            string PlainText = "CID=" + paymentRequest.CID + "&RID=" + paymentRequest.RID + "&CRN=" + paymentRequest.CRN + "&AMT=" + paymentRequest.AMT + "&VER=1.0&TYP=" + paymentRequest.TYP + "&CNY=INR&RTU=" + paymentRequest.RTU + "&PPI=" + ppiParameter + "&RE1=MN&RE2=&RE3=&RE4=&RE5=&CKS=" + Checksum;
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
        public JObject CreatePaymentRequest(AxisPaymentRequest payment, GatewayCredentials gatewayCredentials)
        {
            JObject result;
            try
            {
                payment.CRN = payment.RID;
                NameValueCollection nameValueCollection = CreatePaymentRequestAsync(payment, gatewayCredentials);
                NameValueCollection nameValueCollection_for_request = new NameValueCollection
                {
                    { "i", nameValueCollection["i"] }
                };

                result = new JObject
                {
                    { "StatusCode", "1" },
                    { "ErrorMsg", "" },
                    { "PlainText", nameValueCollection["j"] },
                    { "EncryptedText", nameValueCollection["i"] },
                    { "Form", PreparePOSTForm(gatewayCredentials.RequestUrl, nameValueCollection_for_request) }
                };
            }
            catch (Exception ex)
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

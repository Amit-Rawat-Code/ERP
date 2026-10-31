using Repository;
using System;
using System.Collections.Specialized;
using System.Text;
using System.Security.Cryptography;
using Newtonsoft.Json.Linq;
using BAL.PaymentRequest.ICICI;
using BAL.PaymentGateway;

namespace DAL.PaymentService.ICICI
{
    public class ICICIPaymentGateWay : IICICIPaymentGateWay
    {
        public NameValueCollection CreatePaymentRequestAsync(ICICIPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials)
        {
            var encBody = GetRequestBodyForPayment(paymentRequest, gatewayCredentials);
            var plainBody = GetPlainTextRequestBodyForPayment(paymentRequest, gatewayCredentials);
            NameValueCollection nameValueCollection = new NameValueCollection
            {
                { "i", encBody },
                { "j", plainBody }
            };
            return nameValueCollection;
        }
        private string GetRequestBodyForPayment(ICICIPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials)
        {
            paymentRequest.MerchantId = gatewayCredentials.MerchantId;
            paymentRequest.RedirectUrl = gatewayCredentials.RedirectUrl;
            paymentRequest.Paymode = gatewayCredentials.Paymode;

            string marchectid = paymentRequest.MerchantId;
            string referenceNo = encryptFile(paymentRequest.ReferenceNo, gatewayCredentials.EncryptionKey);
            string submerchantId = encryptFile(paymentRequest.SubmerchantId, gatewayCredentials.EncryptionKey);
            string pgAmount = encryptFile(paymentRequest.PGAmount.ToString(), gatewayCredentials.EncryptionKey);
            string mandatory_Fields = encryptFile(paymentRequest.ReferenceNo + "|" + paymentRequest.SubmerchantId + "|" + paymentRequest.PGAmount + "|" + paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.InstallmentName, gatewayCredentials.EncryptionKey);

            string optional_Fields = "";
            string return_url =
                encryptFile(paymentRequest.RedirectUrl, gatewayCredentials.EncryptionKey);

            string paymode =
               encryptFile(paymentRequest.Paymode, gatewayCredentials.EncryptionKey);

            string paymentUrl = "merchantid=" + marchectid + "&mandatory fields=" + mandatory_Fields + "&optional fields=" + optional_Fields + "&returnurl=" + return_url + "&Reference No=" + referenceNo + "&submerchantid=" + submerchantId + "&transaction amount=" + pgAmount + "&paymode=" + paymode + "";
            return paymentUrl;

        }
        private string GetPlainTextRequestBodyForPayment(ICICIPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials)
        {
            paymentRequest.MerchantId = gatewayCredentials.MerchantId;
            paymentRequest.RedirectUrl = gatewayCredentials.RedirectUrl;
            paymentRequest.Paymode = gatewayCredentials.Paymode;

            string marchectid = paymentRequest.MerchantId;
            string referenceNo = paymentRequest.ReferenceNo;
            string submerchantId = paymentRequest.SubmerchantId;
            string pgAmount = paymentRequest.PGAmount;
            string mandatory_Fields = paymentRequest.ReferenceNo + "|" + paymentRequest.SubmerchantId + "|" + paymentRequest.PGAmount + "|" + paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.InstallmentName;

            string optional_Fields = "";
            string return_url = paymentRequest.RedirectUrl;

            string paymode = paymentRequest.Paymode;

            string paymentUrl = "merchantid=" + marchectid + "&mandatory fields=" + mandatory_Fields + "&optional fields=" + optional_Fields + "&returnurl=" + return_url + "&Reference No=" + referenceNo + "&submerchantid=" + submerchantId + "&transaction amount=" + pgAmount + "&paymode=" + paymode + "";
            return paymentUrl;

        }
        public static string encryptFile(string textToEncrypt, string key)
        {
            RijndaelManaged rijndaelCipher = new RijndaelManaged();
            //Page 36 of 46
            //Payment Gateway Merchant Integration v4.2
            rijndaelCipher.Mode = CipherMode.ECB;
            rijndaelCipher.Padding = PaddingMode.PKCS7;
            rijndaelCipher.KeySize = 0x80;
            rijndaelCipher.BlockSize = 0x80;
            byte[] pwdBytes = Encoding.UTF8.GetBytes(key);
            byte[] keyBytes = new byte[0x10];
            int len = pwdBytes.Length;
            if (len > keyBytes.Length)
            {
                len = keyBytes.Length;
            }
            Array.Copy(pwdBytes, keyBytes, len);
            rijndaelCipher.Key = keyBytes;
            rijndaelCipher.IV = keyBytes;
            ICryptoTransform transform = rijndaelCipher.CreateEncryptor();
            byte[] plainText = Encoding.UTF8.GetBytes(textToEncrypt);
            return Convert.ToBase64String(transform.TransformFinalBlock(plainText, 0, plainText.Length));
        }
        public JObject CreatePaymentRequest(ICICIPaymentRequest payment, GatewayCredentials gatewayCredentials)
        {
            JObject result;
            try
            {
                NameValueCollection nameValueCollection = CreatePaymentRequestAsync(payment, gatewayCredentials);
                result = new JObject
                {
                    { "StatusCode", "1" },
                    { "ErrorMsg", "" },
                    { "PlainText", nameValueCollection["j"] },
                    { "EncryptedText", nameValueCollection["i"] },
                    { "Form", PreparePOSTForm(gatewayCredentials.RequestUrl+"?"+nameValueCollection["i"],new NameValueCollection()) }
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

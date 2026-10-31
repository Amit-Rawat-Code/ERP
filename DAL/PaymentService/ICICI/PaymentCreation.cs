using System;
using BAL.PaymentGateway.ICICI;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace DAL.PaymentService.ICICI
{
    public class ICICI_PaymentCreation
    {
        private readonly string encryptionKey = null;
        public ICICI_PaymentCreation()
        {
            encryptionKey = ConfigurationManager.AppSettings["ICICIEncryptionKey"];
        }
        public string CreatePaymentRequestAsync(ICICIPaymentRequest paymentRequest)
        {
            var requestBody = GetRequestBodyForPayment(paymentRequest, encryptionKey);
            return requestBody;
        }
        public string CreatePlainPaymentRequestAsync(ICICIPaymentRequest paymentRequest)
        {
            var requestBody = GetPlainRequestBodyForPayment(paymentRequest);
            return requestBody;
        }
        private string GetRequestBodyForPayment(ICICIPaymentRequest paymentRequest, string encKey)
        {
            string marchectid = paymentRequest.MerchantId;
            string referenceNo= encryptFile(paymentRequest.ReferenceNo, encKey);
            string submerchantId = encryptFile(paymentRequest.SubmerchantId, encKey);
            string pgAmount = encryptFile(paymentRequest.PGAmount.ToString(), encKey);
            string mandatory_Fields = encryptFile(paymentRequest.ReferenceNo + "|" + paymentRequest.SubmerchantId + "|" + paymentRequest.PGAmount + "|" + paymentRequest.AdmissionNo + "|" + paymentRequest.StudentName + "|" + paymentRequest.ClassSection + "|" + paymentRequest.InstallmentName, encKey);
              //encryptFile(, encKey) + "|" +
              //  encryptFile(, encKey) + "|" +
              //  encryptFile(, encKey) + "|" +
              //  encryptFile(, encKey);

            string optional_Fields = "";
                //encryptFile(paymentRequest.MobileNo, encKey) + "|" +
                //encryptFile(paymentRequest.Remark, encKey);

            string return_url =
                encryptFile(paymentRequest.RedirectUrl, encKey);

            string paymode =
               encryptFile(paymentRequest.Paymode, encKey);

            string paymentUrl = "merchantid=" + marchectid + "&mandatory fields=" + mandatory_Fields + "&optional fields=" + optional_Fields + "&returnurl=" + return_url + "&Reference No=" + referenceNo + "&submerchantid=" + submerchantId + "&transaction amount=" + pgAmount + "&paymode=" + paymode + "";
            return paymentUrl;
        }
        private string GetPlainRequestBodyForPayment(ICICIPaymentRequest paymentRequest)
        {
            string marchectid = paymentRequest.MerchantId;
            string referenceNo = paymentRequest.ReferenceNo;
            string submerchantId = paymentRequest.SubmerchantId;
            string pgAmount = paymentRequest.PGAmount.ToString();
            string mandatory_Fields = referenceNo + "|" + submerchantId + "|" + pgAmount + "|" +
                paymentRequest.AdmissionNo + "|" +
                paymentRequest.StudentName + "|" +
                paymentRequest.ClassSection + "|" +
                paymentRequest.InstallmentName;

            string optional_Fields = "";
                //paymentRequest.MobileNo + "|" +
                //paymentRequest.Remark;

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
    }
}



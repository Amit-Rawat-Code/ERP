using BAL.PaymentGateway.ICICI;
using DAL.PaymentService.ICICI;
using CCA.Util;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;
using System.Web.Mvc;
using System.Threading.Tasks;
using Repository;
using BAL.PaymentGateway.HDFC;
using System.Linq;
using BAL;
using DAL;
using System.Data;
using BAL.PaymentRequest.AXIS;
using BAL.PaymentGateway.AXIS;
using BAL.PaymentGateway;

namespace WebSite.Controllers
{
    public class PaymentGatewayController : Controller
    {
        readonly IHDFCPaymentGatewayResponse _hdfcPaymentGatewayResponse;
        readonly IAxisPaymentGatewayResponse _axisPaymentGatewayResponse;
        readonly IPaymentGatewayCredential _paymentGatewayCredential;

        public PaymentGatewayController(IPaymentGatewayCredential paymentGatewayCredential, IHDFCPaymentGatewayResponse hdfcPaymentGatewayResponse, IAxisPaymentGatewayResponse axisPaymentGatewayResponse)
        {
            _paymentGatewayCredential = paymentGatewayCredential;
            _axisPaymentGatewayResponse = axisPaymentGatewayResponse;
            _hdfcPaymentGatewayResponse = hdfcPaymentGatewayResponse;
        }
        public ActionResult PrintAcknowledgement()
        {
            return View();
        }
        public ActionResult OnlineFeeDeposit()
        {
            return View();
        }
        public ActionResult AXISPaymentform()
        {
            return View();
        }
        public ActionResult HDFCPaymentform()
        {
            return View();
        }
        public ActionResult ICICIPaymentform()
        {
            return View();
        }
        public ActionResult GatewayResponse()
        {
            //string result = "";
            string rs = Request.Form["RS"];
            string rsv = Request.Form["RSV"];
            string id = Request.Form["ID"];
            //string responseCode = string.IsNullOrEmpty(Request.Form["Response Code"]) ? "" : "|" + Request.Form["Response Code"];
            //string uniqueRefNumber = string.IsNullOrEmpty(Request.Form["Unique Ref Number"]) ? "" : "|" + Request.Form["Unique Ref Number"];
            //string serviceTaxAmount = string.IsNullOrEmpty(Request.Form["Service Tax Amount"]) ? "" : "|" + Request.Form["Service Tax Amount"];  
            //string processingFeeAmount = string.IsNullOrEmpty(Request.Form["Processing Fee Amount"]) ? "" : "|" + Request.Form["Processing Fee Amount"]; 
            //string totalAmount = string.IsNullOrEmpty(Request.Form["Total Amount"]) ? "" : "|" + Request.Form["Total Amount"]; 
            //string transactionAmount = string.IsNullOrEmpty(Request.Form["Transaction Amount"]) ? "" : "|" + Request.Form["Transaction Amount"]; 
            //string transactionDate = string.IsNullOrEmpty(Request.Form["Transaction Date"]) ? "" : "|" + Request.Form["Transaction Date"]; 
            //string interchangeValue = string.IsNullOrEmpty(Request.Form["Interchange Value"]) ? "" : "|" + Request.Form["Interchange Value"]; 
            //string tdr = string.IsNullOrEmpty(Request.Form["TDR"]) ? "" : "|" + Request.Form["TDR"]; 
            //string paymentMode = string.IsNullOrEmpty(Request.Form["Payment Mode"]) ? "" : "|" + Request.Form["Payment Mode"]; 
            //string subMerchantId = string.IsNullOrEmpty(Request.Form["SubMerchantId"]) ? "" : "|" + Request.Form["SubMerchantId"]; 
            //string referenceNo = string.IsNullOrEmpty(Request.Form["ReferenceNo"]) ? "" : "|" + Request.Form["ReferenceNo"]; 
            //string tps = string.IsNullOrEmpty(Request.Form["TPS"]) ? "" : "|" + Request.Form["TPS"];
            
            string responseCode = Request.Form["Response Code"];
            string uniqueRefNumber = Request.Form["Unique Ref Number"];
            string serviceTaxAmount = Request.Form["Service Tax Amount"];
            string processingFeeAmount = Request.Form["Processing Fee Amount"];
            string totalAmount = Request.Form["Total Amount"];
            string transactionAmount = Request.Form["Transaction Amount"];
            string transactionDate = Request.Form["Transaction Date"];
            string interchangeValue = Request.Form["Interchange Value"];
            string tdr = Request.Form["TDR"];
            string paymentMode = Request.Form["Payment Mode"];
            string subMerchantId = Request.Form["SubMerchantId"];
            string referenceNo = Request.Form["ReferenceNo"];
            string tps = Request.Form["TPS"];
            

            string inputString = id + "|" + responseCode + "|" + uniqueRefNumber + "|" + serviceTaxAmount + "|" + processingFeeAmount + "|" + totalAmount + "|" + transactionAmount + "|" + transactionDate + "|" + interchangeValue + "|" + tdr + "|" + paymentMode + "|" + subMerchantId + "|" + referenceNo + "|" + tps;
            //string inputString = id + responseCode + uniqueRefNumber + serviceTaxAmount + processingFeeAmount + totalAmount + transactionAmount + transactionDate + interchangeValue + tdr + paymentMode + subMerchantId + referenceNo + tps;
            string shaValue = ICICI_PaymentCreation.GenerateSHA512String(inputString);
            string Status = "0";
            if (shaValue.Equals(rs))
            {
                Status = "1";
            }
            var result = new
            {
                ID = id,
                ResponseCode = responseCode,
                UniqueRefNumber = uniqueRefNumber,
                ServiceTaxAmount = serviceTaxAmount,
                ProcessingFeeAmount = processingFeeAmount,
                TotalAmount = totalAmount,
                TransactionAmount = transactionAmount,
                TransactionDate = transactionDate,
                InterchangeValue = interchangeValue,
                TDR = tdr,
                PaymentMode = paymentMode,
                SubMerchantId = subMerchantId,
                ReferenceNo = referenceNo,
                TPS = tps,
                Status = Status
            };
            Session.Add("Result", JsonConvert.SerializeObject(result));
            return View();
        }

        [HttpGet]
        public string GetICICIGatewayResponse()
        {
            return Session["Result"].ToString();
        }
        public async Task<ActionResult> AXISGatewayResponse()
        {
            BALConnectionConnector obj = new BALConnectionConnector
            {
                BranchUrl = Request.Url.Authority
            };
            DataTable dt = await DLL.dal.GetConnectionConnector(obj).ConfigureAwait(true);
            PaymentGateway paymentGateway = new PaymentGateway
            {
                RelationshipId = dt.Rows[0]["RelationshipId"].ToString(),
                Type = "W",
                APIType="Payment"
            };
            List<GatewayCredentials> paymentGateways = _paymentGatewayCredential.GetPaymentGateWay(paymentGateway);
            string key = paymentGateways[0].EncryptionKey; //Kindly change the same with the production  keys which has been shared.
            string result = "";
            
            if (Request.QueryString["i"] != null)
            {
                string i = Request.QueryString["i"].ToString();
                try
                {
                    if (!string.IsNullOrWhiteSpace(i))
                    {
                        byte[] keyArray = UTF8Encoding.UTF8.GetBytes(key);

                        // byte[] toEncryptArray = Convert.FromBase64String(i);
                        byte[] toEncryptArray = Convert.FromBase64String(i.Replace(" ", "+"));
                        RijndaelManaged rDel = new RijndaelManaged();
                        rDel.Key = keyArray;
                        rDel.Mode = CipherMode.ECB;
                        // rDel.Padding = PaddingMode.Zeros;
                        ICryptoTransform cTransform = rDel.CreateDecryptor();
                        byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
                        //Response.Write(UTF8Encoding.UTF8.GetString(resultArray).ToString());
                        result = UTF8Encoding.UTF8.GetString(resultArray);

                        var dict = result.Split('&')
                                    .Select(x => x.Split('='))
                                    .ToDictionary(x => x[0], x => x[1]);
                        AxisPaymentRequest jObj = JsonConvert.DeserializeObject<AxisPaymentRequest>(JsonConvert.SerializeObject(dict));

                        var response = new
                        {
                            order_status = jObj.RMK,
                            order_date = jObj.TET,
                            order_id = jObj.RID,
                            bank_ref_no = jObj.BRN,
                            amount = jObj.AMT
                        };

                        Session.Add("AxisResult", JsonConvert.SerializeObject(jObj));
                        Session.Add("DisplayAxisResult", JsonConvert.SerializeObject(response));
                    }
                }
                catch (Exception ex)
                {
                    Session.Add("AxisResult", ex.Message);
                    throw ex;
                }
            }
            return View();
        }
        [HttpPost]
        public async Task<string> GetAXISGatewayResponse(AxisPaymentResponseDetail paymentResponse)
        {
            AxisPaymentRequest jObj = JsonConvert.DeserializeObject<AxisPaymentRequest>(Session["AxisResult"].ToString());
            string orderstatus = (jObj.RMK.ToUpper() == "SHIPPED" || jObj.RMK.ToUpper() == "SUCCESS") ? "Success" : "Failure";
            var paymentResponseDetail = new AxisPaymentResponseDetail
            {
                OrderId = jObj.RID,
                BankRefId = jObj.BRN,
                ResponseDateTime = jObj.TET,
                Amount = jObj.AMT,
                OrderStatus = orderstatus,
                GatewayOrderStatus = jObj.RMK,
                RelationshipId= paymentResponse.RelationshipId,
                SessionId = paymentResponse.SessionId,
                CreatedBy = paymentResponse.CreatedBy,
                FYId = paymentResponse.FYId,
                PaymentGatewayId = "1",
                Action = 1
            };
            await _axisPaymentGatewayResponse.InsertAxisPaymentGatewayResponseAsync(paymentResponseDetail);

            return Session["DisplayAxisResult"].ToString();
        }
        public async Task<ActionResult> HDFCGatewayResponse()
        {
            BALConnectionConnector obj = new BALConnectionConnector
            {
                BranchUrl = Request.Url.Authority
            };
            DataTable dt = await DLL.dal.GetConnectionConnector(obj).ConfigureAwait(true);
            PaymentGateway paymentGateway = new PaymentGateway
            {
                RelationshipId = dt.Rows[0]["RelationshipId"].ToString(),
                Type = "W",
                APIType = "Payment"
            };
            List<GatewayCredentials> paymentGateways = _paymentGatewayCredential.GetPaymentGateWay(paymentGateway);
            //string result = "";
            string workingKey = paymentGateways[0].EncryptionKey;//put in the 32bit alpha numeric key in the quotes provided here
            try
            {
                CCACrypto ccaCrypto = new CCACrypto();
                string encResponse = ccaCrypto.Decrypt(Request.Form["encResp"], workingKey);
                var dict = encResponse.Split('&')
                                       .Select(x => x.Split('='))
                                       .ToDictionary(x => x[0], x => x[1]);
                HDFCPaymentBankResponseDetail jObj = JsonConvert.DeserializeObject<HDFCPaymentBankResponseDetail>(JsonConvert.SerializeObject(dict));

                var date = jObj.trans_date.Split(' ');
                string year = date[0].Split('/')[2];
                string month = date[0].Split('/')[1];
                string day = date[0].Split('/')[0];
                string time = date[1];
                var newDate = year + "-" + month + "-" + day + " " + time;
                var response = new
                {
                    order_status = jObj.order_status,
                    order_date = newDate,
                    order_id = jObj.order_id,
                    bank_ref_no = jObj.bank_ref_no,
                    amount = jObj.amount
                };
                Session.Add("HDFCResult", JsonConvert.SerializeObject(jObj));
                Session.Add("DisplayHDFCResult", JsonConvert.SerializeObject(response));
            }
            catch (Exception ex)
            {
                Session.Add("HDFCResult", ex.Message);
                throw ex;
            }
            return View();
        }
        [HttpPost]
        public async Task<string> GetHDFCGatewayResponse(HDFCPaymentResponseDetail paymentResponse)
        {
            HDFCPaymentBankResponseDetail jObj = JsonConvert.DeserializeObject<HDFCPaymentBankResponseDetail>(Session["HDFCResult"].ToString());
            var date = jObj.trans_date.Split(' ');
            string year = date[0].Split('/')[2];
            string month = date[0].Split('/')[1];
            string day = date[0].Split('/')[0];
            string time = date[1];
            var newDate = year + "-" + month + "-" + day + " " + time;
            string orderstatus = (jObj.order_status.ToUpper() == "SHIPPED" || jObj.order_status.ToUpper() == "SUCCESS") ? "Success" : "Failure";
            var paymentResponseDetail = new HDFCPaymentResponseDetail
            {
                OrderId = jObj.order_id,
                BankRefId = jObj.bank_ref_no,
                ResponseDateTime = newDate,
                Amount = jObj.amount,
                OrderStatus = orderstatus,
                GatewayOrderStatus = jObj.order_status,
                RelationshipId = paymentResponse.RelationshipId,
                SessionId = paymentResponse.SessionId,
                CreatedBy = paymentResponse.CreatedBy,
                FYId = paymentResponse.FYId,
                PaymentGatewayId = "2",
                Action = 1
            };

            await _hdfcPaymentGatewayResponse.InsertHDFCPaymentGatewayResponseAsync(paymentResponseDetail);

            return Session["DisplayHDFCResult"].ToString();
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
        public Boolean AcceptAllCertifications(Object sender, System.Security.Cryptography.X509Certificates.X509Certificate certification, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }
        [HttpPost]
        public string ICICIPaymentRequest(ICICIPaymentRequest payment)
        {
            payment.ReferenceNo = payment.SubmerchantId + DateTime.Now.ToString("ddMMyyyyhhmmss");
            payment.MerchantId = ConfigurationManager.AppSettings["ICICIMerchantId"];
            payment.RedirectUrl = ConfigurationManager.AppSettings["ICICIRedirectUrl"];
            payment.Paymode = ConfigurationManager.AppSettings["ICICIPaymode"];
            var baseRequestUrl = ConfigurationManager.AppSettings["ICICIBaseRequestUrl"];
            var paymentService = new ICICI_PaymentCreation();
            var plainTextUrl = baseRequestUrl + "?" + paymentService.CreatePlainPaymentRequestAsync(payment);
            var requestUrl = baseRequestUrl + "?" + paymentService.CreatePaymentRequestAsync(payment);
            //requestUrl = "https://eazypayuat.icicibank.com/EazyPG?merchantid=130228&mandatory fields=XS8+7NxncwPuJ/OWkghwNmB1epHhPlk/lY0BFT+DmzC1olwK8Eh6OU1ug3eVBAYMJXSXnAuXwF65MOLDD6/Z3Q==&optional fields=&returnurl=sxAfdcVFWiN/P4QxlE9e6nIMLLcQUmHTaDVbv7fOp0Mj7GcfPEIW0HguHxAjcvbyMX3byU7ts1Qs0j+ACu2xeg==&Reference No=Txddn/HVWrtIDZ5v7U1n/g==&submerchantid=L65n4YE12K9kjNmIXZNoQA==&transaction amount=6oWKz4+irb+t3owNjtSwPA==&paymode=A1C5ob4l9576S0uQHMjWmA==";
            return PreparePOSTForm(requestUrl, new NameValueCollection());
        }
        //[HttpPost]
        //public async Task<string> HDFCPaymentRequest(HDFCPaymentRequest payment, string studentFeeDetails)
        //{
        //    BAL.PaymentGateway.HDFC.PaymentRequest payment = JsonConvert.DeserializeObject(obj[0]);
        //    payment.tid = payment.customer_identifier + DateTime.Now.ToString("ddMMyyyyhhmmss");
        //    payment.order_id = payment.tid;
        //    payment.merchant_id = ConfigurationManager.AppSettings["HDFCMerchantId"];
        //    payment.redirect_url = ConfigurationManager.AppSettings["HDFCRedirectUrl"];
        //    payment.cancel_url = ConfigurationManager.AppSettings["HDFCancelUrl"];
        //    payment.promo_code = "";
        //    var paymentRequestDetail = new BAL.PaymentGateway.HDFC.PaymentRequestDetail
        //    {
        //        StudentCode = payment.customer_identifier,
        //        OrderId = payment.order_id,
        //        StudentFeeDetails = studentFeeDetails.ToString(),
        //        PaymentGatewayId = "2",
        //        Action = 1
        //    };
        //    string requestRequest = await _onlineFeePaymentRquest.InsertPaymentRequestAsync(paymentRequestDetail);
        //    string formString = "";
        //    if (requestRequest == "1")
        //    {
        //        var baseRequestUrl = ConfigurationManager.AppSettings["HDFCBaseRequestUrl"];
        //        var requestUrl = baseRequestUrl + "/transaction/transaction.do?command=initiateTransaction";
        //        var paymentService = new DAL.PaymentService.HDFC.HDFCPaymentGateWay();
        //        formString = PreparePOSTForm(requestUrl, paymentService.CreatePaymentRequestAsync(payment));
        //    }

        //    return formString;
        //}
        public string GenrateOrderId()
        {
            StringBuilder builder = new StringBuilder();
            Enumerable
               .Range(65, 26)
                .Select(e => ((char)e).ToString())
                .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
                .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
                .OrderBy(e => Guid.NewGuid())
                .Take(20)
                .ToList().ForEach(e => builder.Append(e));
            string id = builder.ToString();
            return id;
        }
    }
}


using BAL.PaymentGateway;
using BAL.PaymentGateway.AXIS;
using BAL.PaymentGateway.HDFC;
using BAL.PaymentRequest.AXIS;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Repository;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class PaymentGatewayApiController : ApiController
    {
        readonly IPaymentGatewayCredential _paymentGatewayCredential;
        readonly IOnlinePayment _onlinePayment;

        readonly IAxisPaymentGateWay _axisPaymentGateWay;
        readonly IAxisPaymentGatewayRquest _axisPaymentGatewayRquest;
        readonly IAxisPaymentGatewayResponse _axisPaymentGatewayResponse;

        readonly IHDFCPaymentGateWay _hdfcPaymentGateWay;
        readonly IHDFCPaymentGatewayRquest _hdfcPaymentGatewayRequest;
        readonly IHDFCPaymentGatewayResponse _hdfcPaymentGatewayResponse;

        readonly IHDFCPaymentStatus _hdfcPaymentStatus;
        readonly IAxisPaymentStatus _axisPaymentStatus;
        
        public PaymentGatewayApiController(IPaymentGatewayCredential paymentGatewayCredential, IAxisPaymentGateWay axisPaymentGateWay, IAxisPaymentGatewayRquest axisPaymentGatewayRquest, 
            IAxisPaymentGatewayResponse axisPaymentGatewayResponse, IHDFCPaymentGateWay hdfcPaymentGateWay, IHDFCPaymentGatewayRquest hdfcPaymentGatewayRequest,
            IHDFCPaymentGatewayResponse hdfcPaymentGatewayResponse, IHDFCPaymentStatus hdfcPaymentStatus, IAxisPaymentStatus axisPaymentStatus, IOnlinePayment onlinePayment)
        {
            _paymentGatewayCredential = paymentGatewayCredential;
            _onlinePayment = onlinePayment;

            _axisPaymentGateWay = axisPaymentGateWay;
            _axisPaymentGatewayRquest = axisPaymentGatewayRquest;
            _axisPaymentGatewayResponse = axisPaymentGatewayResponse;

            _hdfcPaymentGateWay = hdfcPaymentGateWay;
            _hdfcPaymentGatewayRequest = hdfcPaymentGatewayRequest;
            _hdfcPaymentGatewayResponse = hdfcPaymentGatewayResponse;

            _hdfcPaymentStatus = hdfcPaymentStatus;
            _axisPaymentStatus = axisPaymentStatus;
        }
        public string GenrateOrderId(string StudentCode)
        {
            //StringBuilder builder = new StringBuilder();
            //Enumerable
            //   .Range(65, 26)
            //    .Select(e => ((char)e).ToString())
            //    .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
            //    .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
            //    .OrderBy(e => Guid.NewGuid())
            //    .Take(20)
            //    .ToList().ForEach(e => builder.Append(e));
            string id = StudentCode + DateTime.Now.ToString("ddMMyhhmm");
            //string id = builder.ToString();
            return id;
        }
        [HttpPost]
        public async Task<JObject> PaymentRequest([FromBody] JObject data)
        {
            string relationshipId = data["relationshipId"].ToString();
            PaymentGateway paymentGateway = new PaymentGateway
            {
                RelationshipId = relationshipId,
                Type = "W",
                APIType = "Payment"
            };
            string studentFeeDetails = data["studentFeeDetails"].ToString();

            var result = new JObject();

            GatewayCredentials gatewayCredentials = GetPaymentGateWay(paymentGateway);
            if (gatewayCredentials.Type.ToUpper() == "PAYMENT" && gatewayCredentials.GatewayProvider.ToUpper() == "AXIS")
            {
                result = await AXISPaymentRequest(data["paymentDetails"], studentFeeDetails, gatewayCredentials);
            }
            else if (gatewayCredentials.Type.ToUpper() == "PAYMENT" && gatewayCredentials.GatewayProvider.ToUpper() == "HDFC")
            {
                result = await HDFCPaymentRequest(data["paymentDetails"], studentFeeDetails, gatewayCredentials);
            }
            return result;
        }

        [HttpPost]
        public GatewayCredentials GetPaymentGateWay(PaymentGateway paymentGateway)
        {
            GatewayCredentials gatewayCredentials = new GatewayCredentials();
            List<GatewayCredentials> paymentGateways = _paymentGatewayCredential.GetPaymentGateWay(paymentGateway);
            if (paymentGateways.Count > 0)
                gatewayCredentials = paymentGateways[0];
            return gatewayCredentials;
        }

        #region Axis Payment Request/Response
        public async Task<JObject> AXISPaymentRequest(JToken paymentDetails, string studentFeeDetails, GatewayCredentials gatewayCredentials)
        {
            AxisPaymentRequest payment = paymentDetails.ToObject<AxisPaymentRequest>();
            payment.RID = GenrateOrderId(payment.StudentCode);
            var paymentRequestDetail = new AxisPaymentRequestDetail
            {
                StudentCode = payment.StudentCode,
                OrderId = payment.RID,
                StudentFeeDetails = studentFeeDetails,
                PaymentGatewayId = "1",
                RelationshipId = payment.RelationshipId,
                FYId= payment.FYId,
                SessionId = payment.SessionId,
                CreatedBy = payment.CreatedBy,
                Type="W",
                Action = 1
            };
            string requestRequest = await _axisPaymentGatewayRquest.InsertAxisPaymentGatewayRequestAsync(paymentRequestDetail);
            JObject formString;
            if (requestRequest == "1")
            {
                formString = _axisPaymentGateWay.CreatePaymentRequest(payment, gatewayCredentials);
            }
            else
            {

                formString = new JObject
                {
                    { "StatusCode", "0" },
                    { "ErrorMsg", requestRequest },
                    { "PlainText", "" },
                    { "EncryptedText", "" },
                    { "Form", "" }
                };
            }
            return formString;
        }
        [HttpPost]
        public async Task<string> InsertAxisPaymentGatewayResponseAsync(AxisPaymentResponseDetail paymentResponseDetail)
        {
            string result = await _axisPaymentGatewayResponse.InsertAxisPaymentGatewayResponseAsync(paymentResponseDetail);
            return result;
        }
        #endregion

        #region HDFC Payment Request/Response
        public async Task<JObject> HDFCPaymentRequest(JToken paymentDetails, string studentFeeDetails, GatewayCredentials gatewayCredentials)
        {
            HDFCPaymentRequest payment = paymentDetails.ToObject<HDFCPaymentRequest>();
            payment.tid = GenrateOrderId(payment.customer_identifier);
            payment.order_id = payment.tid;
            payment.promo_code = "";
            var paymentRequestDetail = new HDFCPaymentRequestDetail
            {
                StudentCode = payment.customer_identifier,
                OrderId = payment.order_id,
                StudentFeeDetails = studentFeeDetails,
                PaymentGatewayId = "2",
                RelationshipId = payment.RelationshipId,
                FYId = payment.FYId,
                SessionId = payment.SessionId,
                CreatedBy = payment.CreatedBy,
                Type = "W",
                Action = 1
            };
            //string requestRequest = await _hdfcPaymentGatewayRequest.InsertHDFCPaymentGatewayRequestAsync(paymentRequestDetail);
            //var formString = new JObject();
            //if (requestRequest == "1")
            //{
            //    formString = _hdfcPaymentGateWay.CreatePaymentRequest(payment, gatewayCredentials);
            //}
            string requestRequest = await _hdfcPaymentGatewayRequest.InsertHDFCPaymentGatewayRequestAsync(paymentRequestDetail);
            JObject formString;
            if (requestRequest == "1")
            {
                formString = _hdfcPaymentGateWay.CreatePaymentRequest(payment, gatewayCredentials);
            }
            else
            {

                formString = new JObject
                {
                    { "StatusCode", "0" },
                    { "ErrorMsg", requestRequest },
                    { "PlainText", "" },
                    { "EncryptedText", "" },
                    { "Form", "" }
                };
            }
            return formString;
        }
        [HttpPost]
        public async Task<string> InsertHDFCPaymentGatewayResponseAsync(HDFCPaymentResponseDetail paymentResponseDetail)
        {
            string result = await _hdfcPaymentGatewayResponse.InsertHDFCPaymentGatewayResponseAsync(paymentResponseDetail);
            return result;
        }
        #endregion


        [HttpPost]
        public async Task<string> PaymentVarify([FromBody] JObject data)
        {
            string relationshipId = data["RelationshipId"].ToString();
            string sessionId = data["SessionId"].ToString();
            string createdBy = data["CreatedBy"].ToString();
            string fyId = data["FYId"].ToString();
            string orderstatus = "";
            PaymentGateway paymentGateway = new PaymentGateway
            {
                RelationshipId = relationshipId,
                Type = "W",
                APIType="Status"
            };
            string result = "";

            List<GatewayCredentials> paymentGateways = _paymentGatewayCredential.GetPaymentGateWay(paymentGateway);
            if (paymentGateways[0].Type.ToUpper() == "STATUS" && paymentGateways[0].GatewayProvider.ToUpper() == "AXIS")
            {
                var serializeObject = JsonConvert.SerializeObject(data["PaymentDetails"]);
                AXISPaymentVarification axisPaymentVarification = JsonConvert.DeserializeObject<AXISPaymentVarification>(serializeObject);
                var nameValueCollection = await _axisPaymentStatus.CreatePaymentStatusRequestAsync(axisPaymentVarification, paymentGateways[0]);
                //AxisPaymentBankResponseDetail res = JsonConvert.DeserializeObject<AXISPaymentBankResponseDetail>(result);
                orderstatus = JsonConvert.SerializeObject(new {i= nameValueCollection });
                //orderstatus = res.order_status == "Shipped" ? "Success" : "Failure";
                //var paymentResponseDetail = new AXISPaymentResponseDetail
                //{
                //    OrderId = res.order_no,
                //    BankRefId = res.order_bank_ref_no,
                //    ResponseDateTime = res.order_date_time,
                //    Amount = res.order_amt,
                //    OrderStatus = orderstatus,
                //    GatewayOrderStatus = res.order_status,
                //    RelationshipId = Convert.ToInt32(relationshipId),
                //    SessionId = Convert.ToInt32(sessionId),
                //    CreatedBy = createdBy,
                //    FYId = Convert.ToInt32(fyId),
                //    PaymentGatewayId = "2",
                //    Action = 1
                //};

                //await InsertAXISPaymentGatewayResponseAsync(paymentResponseDetail);
            }
            else
            if (paymentGateways[0].Type.ToUpper() == "STATUS" && paymentGateways[0].GatewayProvider.ToUpper() == "HDFC")
            {
                var serializeObject = JsonConvert.SerializeObject(data["PaymentDetails"]);
                HDFCPaymentVarification hdfcPaymentVarification = JsonConvert.DeserializeObject<HDFCPaymentVarification>(serializeObject);
                result = await _hdfcPaymentStatus.CreatePaymentStatusRequestAsync(hdfcPaymentVarification, paymentGateways[0]);
                HDFCPaymentBankResponseDetail res = JsonConvert.DeserializeObject<HDFCPaymentBankResponseDetail>(result);

                orderstatus = res.order_status == "Shipped" ? "Success" : "Failure";
                var paymentResponseDetail = new HDFCPaymentResponseDetail
                {
                    OrderId = res.order_no,
                    BankRefId = res.order_bank_ref_no,
                    ResponseDateTime = res.order_date_time,
                    Amount = res.order_amt,
                    OrderStatus = orderstatus,
                    GatewayOrderStatus = res.order_status,
                    RelationshipId = Convert.ToInt32(relationshipId),
                    SessionId = Convert.ToInt32(sessionId),
                    CreatedBy = createdBy,
                    FYId = Convert.ToInt32(fyId),
                    PaymentGatewayId = "2",
                    Action = 1
                };

                await InsertHDFCPaymentGatewayResponseAsync(paymentResponseDetail);
            }
            return orderstatus;
        }

        [HttpPost]
        public async Task<string> InsertAxisPaymentGatewayRequestAsync(AxisPaymentRequestDetail paymentRequestDetail)
        {
            string requestRequest = await _axisPaymentGatewayRquest.InsertAxisPaymentGatewayRequestAsync(paymentRequestDetail);
            return requestRequest;
        }

        [HttpPost]
        public async Task<DataTable> GetPaymentHistory(PaymentDetails paymentDetail)
        {
            DataTable dt = await _onlinePayment.GetPaymentHistory(paymentDetail);
            return dt;
        }
    }
}


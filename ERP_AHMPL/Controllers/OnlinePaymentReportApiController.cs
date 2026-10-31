using BAL.PaymentGateway;
using BAL.PaymentGateway.AXIS;
using BAL.PaymentGateway.HDFC;
using BAL.PaymentRequest.AXIS;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;

namespace SEF.Controllers
{
    public class OnlinePaymentReportApiController : ApiController
    {
        readonly IOnlinePayment _onlinePayment;
        public OnlinePaymentReportApiController(IOnlinePayment onlinePayment)
        {
            _onlinePayment = onlinePayment;
        }
        [HttpPost]
        public async Task<DataTable> GetPaymentHistory(PaymentDetails paymentDetail)
        {
            DataTable dt = await _onlinePayment.GetPaymentHistory(paymentDetail);
            return dt;
        }

        [HttpPost]
        public async Task<DataTable> GetPaymentReport(PaymentDetails paymentDetail)
        {
            DataTable dt = await _onlinePayment.GetPaymentReport(paymentDetail);
            return dt;
        }
    }
}


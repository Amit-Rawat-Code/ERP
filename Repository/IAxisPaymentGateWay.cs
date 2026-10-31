using BAL.PaymentGateway;
using BAL.PaymentRequest.AXIS;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace Repository
{
   public interface IAxisPaymentGateWay
    {
        JObject CreatePaymentRequest(AxisPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials);
    }
}

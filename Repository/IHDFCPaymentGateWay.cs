using BAL.PaymentGateway;
using BAL.PaymentGateway.HDFC;
using Newtonsoft.Json.Linq;

namespace Repository
{
   public interface IHDFCPaymentGateWay
    {
        JObject CreatePaymentRequest(HDFCPaymentRequest paymentRequest, GatewayCredentials gatewayCredentials);
    }
}

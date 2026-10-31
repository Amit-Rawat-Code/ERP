using BAL.PaymentGateway;
using System.Collections.Generic;

namespace Repository
{
   public interface IPaymentGatewayCredential
    {
        List<GatewayCredentials> GetPaymentGateWay(PaymentGateway paymentGateway);
    }
}

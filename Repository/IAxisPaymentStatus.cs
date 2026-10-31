using BAL.PaymentGateway;
using BAL.PaymentGateway.AXIS;
using System.Collections.Specialized;
using System.Threading.Tasks;

namespace Repository
{
   public interface IAxisPaymentStatus
    {
        Task<string> CreatePaymentStatusRequestAsync(AXISPaymentVarification axisPaymentVarification, GatewayCredentials paymentGatewayCredentials);
    }
}

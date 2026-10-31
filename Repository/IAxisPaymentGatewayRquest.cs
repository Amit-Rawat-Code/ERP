using BAL.PaymentGateway.AXIS;
using System.Threading.Tasks;

namespace Repository
{
   public interface IAxisPaymentGatewayRquest
    {
        Task<string> InsertAxisPaymentGatewayRequestAsync(AxisPaymentRequestDetail paymentRequestDetail);
    }
}

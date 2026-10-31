using BAL.PaymentGateway.AXIS;
using System.Data;
using System.Threading.Tasks;

namespace Repository
{
   public interface IAxisPaymentGatewayResponse
    {
        Task<string> InsertAxisPaymentGatewayResponseAsync(AxisPaymentResponseDetail paymentResponseDetail);        
    }
}

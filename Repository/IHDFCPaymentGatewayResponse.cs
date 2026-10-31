using BAL.PaymentGateway.HDFC;
using System.Threading.Tasks;

namespace Repository
{
   public interface IHDFCPaymentGatewayResponse
    {
        Task<string> InsertHDFCPaymentGatewayResponseAsync(HDFCPaymentResponseDetail paymentResponseDetail);
    }
}

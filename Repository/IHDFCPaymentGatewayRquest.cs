using BAL.PaymentGateway.HDFC;
using System.Threading.Tasks;

namespace Repository
{
   public interface IHDFCPaymentGatewayRquest
    {
        Task<string> InsertHDFCPaymentGatewayRequestAsync(HDFCPaymentRequestDetail paymentRequestDetail);
    }
}

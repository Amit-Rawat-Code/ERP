using BAL.PaymentGateway;
using BAL.PaymentGateway.HDFC;
using System.Threading.Tasks;

namespace Repository
{
   public interface IHDFCPaymentVarification
    {
        Task<string> CreatePaymentStatusRequestAsync(HDFCPaymentRequestDetail paymentStatusRequest, GatewayCredentials paymentGatewayCredentials);
    }
}

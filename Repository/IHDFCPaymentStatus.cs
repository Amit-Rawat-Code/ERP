using BAL.PaymentGateway;
using BAL.PaymentGateway.HDFC;
using System.Threading.Tasks;

namespace Repository
{
   public interface IHDFCPaymentStatus
    {
        Task<string> CreatePaymentStatusRequestAsync(HDFCPaymentVarification hdfcPaymentVarification, GatewayCredentials paymentGatewayCredentials);
    }
}

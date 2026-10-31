using System.Data;
using System.Threading.Tasks;

namespace BAL.PaymentGateway
{
    public interface IOnlinePayment
    {
        Task<DataTable> GetPaymentHistory(PaymentDetails paymentDetail); 
        Task<DataTable> GetPaymentReport(PaymentDetails paymentDetail);
        
    }
}
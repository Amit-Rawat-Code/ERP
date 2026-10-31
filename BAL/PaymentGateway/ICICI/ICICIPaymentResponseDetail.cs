using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.Text;

namespace BAL.PaymentGateway.ICICI
{
    public class ICICIPaymentResponseDetail : Common
    {
        [DataMember]
        public string OrderId { get; set; }
        [DataMember]
        public string BankRefId { get; set; }
        [DataMember]
        public string ResponseDateTime { get; set; }
        [DataMember]
        public string Amount { get; set; }
        [DataMember]
        public string OrderStatus { get; set; }
        [DataMember]
        public string PaymentGatewayId { get; set; }
        [DataMember]
        public string GatewayOrderStatus { get; set; }
    }
}

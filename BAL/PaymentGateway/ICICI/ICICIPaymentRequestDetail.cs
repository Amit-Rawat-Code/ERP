using System.Runtime.Serialization;

namespace BAL.PaymentGateway.ICICI
{
    public class ICICIPaymentRequestDetail : Common
    {
        [DataMember]
        public string OrderId { get; set; }
        [DataMember]
        public string StudentFeeDetails { get; set; }
        [DataMember]
        public string PaymentGatewayId { get; set; }
        [DataMember]
        public string Type { get; set; }
    }
}

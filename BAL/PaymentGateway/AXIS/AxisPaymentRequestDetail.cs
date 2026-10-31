using System.Runtime.Serialization;

namespace BAL.PaymentGateway.AXIS
{
    public class AxisPaymentRequestDetail : Common
    {
        [DataMember]
        public string OrderId { get; set; }
        [DataMember]
        public string StudentFeeDetails { get; set; }
        [DataMember]
        public string PaymentGatewayId { get; set; }
        [DataMember]
        public string Type { get; set; }
        [DataMember]
        public decimal Amount { get; set; }
    }
}

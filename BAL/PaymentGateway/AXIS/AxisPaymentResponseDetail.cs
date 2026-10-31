using System.Runtime.Serialization;

namespace BAL.PaymentGateway.AXIS
{
    public class AxisPaymentResponseDetail : Common
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

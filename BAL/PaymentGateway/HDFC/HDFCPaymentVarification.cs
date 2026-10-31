using System.Runtime.Serialization;

namespace BAL.PaymentGateway.HDFC
{
    public class HDFCPaymentVarification : Common
    {
        [DataMember]
        public string OrderId { get; set; }
    }
}

using System.Runtime.Serialization;

namespace BAL.PaymentGateway.AXIS
{
    public class AXISPaymentVarification : Common
    {
        [DataMember]
        public string BankRefId { get; set; }
        [DataMember]
        public string CID { get; set; }
        [DataMember]
        public string OrderId { get; set; }
        [DataMember]
        public string CRN { get; set; }
        [DataMember]
        public string VER { get; set; }
        [DataMember]
        public string TYP { get; set; }
        [DataMember]
        public string CKS { get; set; }
    }
}

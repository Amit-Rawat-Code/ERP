using System.Runtime.Serialization;

namespace BAL.PaymentGateway.ICICI
{
    public class ICICIPaymentVarification : Common
    {
        [DataMember]
        public string OrderId { get; set; }
    }

    public class ICICIPaymentVarificationResponse : Common
    {
        [DataMember]
        public string status { get; set; }
        [DataMember]
        public string ezpaytranid { get; set; }
        [DataMember]
        public string amount { get; set; }
        [DataMember]
        public string trandate { get; set; }
        [DataMember]
        public string pgreferenceno { get; set; }
        [DataMember]
        public string sdt { get; set; }
        [DataMember]
        public string BA { get; set; }
        [DataMember]
        public string PF { get; set; }
        [DataMember]
        public string TAX { get; set; }
        [DataMember]
        public string PaymentMode { get; set; }
    }
}

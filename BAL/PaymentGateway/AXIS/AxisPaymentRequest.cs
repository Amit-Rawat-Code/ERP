using System.Runtime.Serialization;

namespace BAL.PaymentRequest.AXIS
{
    public class AxisPaymentRequest: AxisPPI
    {
        [DataMember]
        public string RMK { get; set; }
        [DataMember]
        public string TET { get; set; }
        [DataMember]
        public string BRN { get; set; }
        [DataMember]
        public string CID { get; set; }
        [DataMember]
        public string RID { get; set; }
        [DataMember]
        public string CRN { get; set; }
        [DataMember]
        public string AMT { get; set; }
        [DataMember]
        public string VER { get; set; }
        [DataMember]
        public string TYP { get; set; }
        [DataMember]
        public string CNY { get; set; }
        [DataMember]
        public string RTU { get; set; }
        [DataMember]
        public string CKS { get; set; }
        [DataMember]
        public string amount { get; set; }
    }

    public class AxisPPI:Common
    {
        [DataMember]
        public string AdmissionNo { get; set; }
        [DataMember]
        public string ClassSection { get; set; }
        [DataMember]
        public string StudentName { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string EmailId { get; set; }
        [DataMember]
        public string MobileNo { get; set; }
    }

    public class AXISPaymentBankResponseDetail:Common
    {
        [DataMember]
        public string order_no { get; set; }
        [DataMember]
        public string bank_ref_no { get; set; }
        [DataMember]
        public string order_bank_ref_no { get; set; }
        [DataMember]
        public string order_date_time { get; set; }
        [DataMember]
        public string order_amt { get; set; }
        [DataMember]
        public string trans_date { get; set; }
        [DataMember]
        public string order_status { get; set; }
    }
}

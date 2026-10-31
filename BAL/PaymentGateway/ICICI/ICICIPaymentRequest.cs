using System.Runtime.Serialization;

namespace BAL.PaymentRequest.ICICI
{
    public class ICICIPaymentRequest: ICICIPPI
    {
        [DataMember]
        public string MerchantId { get; set; }
        [DataMember]
        public string MobileNo { get; set; }
        [DataMember]
        public string RedirectUrl { get; set; }
        [DataMember]
        public string Paymode { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string BankRefNo { get; set; }
        [DataMember]
        public string TransactionDateTime { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public string GatewayStatus { get; set; }
        [DataMember]
        public string amount { get; set; }
    }

    public class ICICIPPI:Common
    {
        [DataMember]
        public string AdmissionNo { get; set; }
        [DataMember]
        public string ClassSection { get; set; }
        [DataMember]
        public string StudentName { get; set; }
        [DataMember]
        public string EmailId { get; set; }
        [DataMember]
        public string InstallmentName { get; set; }
        [DataMember]
        public string PGAmount { get; set; }
        [DataMember]
        public string SubmerchantId { get; set; }
        [DataMember]
        public string ReferenceNo { get; set; }
    }

    public class ICICIPaymentBankResponseDetail:Common
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

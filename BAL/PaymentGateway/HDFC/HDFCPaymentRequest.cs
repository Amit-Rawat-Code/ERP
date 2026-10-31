using System.Runtime.Serialization;

namespace BAL.PaymentGateway.HDFC
{
    public class HDFCPaymentRequest:Common
    {
        [DataMember]
        public string tid { get; set; }
        [DataMember]
        public string merchant_id { get; set; }
        [DataMember]
        public string order_id { get; set; }
        [DataMember]
        public string amount { get; set; }
        [DataMember]
        public string currency { get; set; }
        [DataMember]
        public string redirect_url { get; set; }
        [DataMember]
        public string cancel_url { get; set; }
        [DataMember]
        public string billing_name { get; set; }
        [DataMember]
        public string billing_address { get; set; }
        [DataMember]
        public string billing_city { get; set; }
        [DataMember]
        public string billing_state { get; set; }
        [DataMember]
        public string billing_zip { get; set; }
        [DataMember]
        public string billing_country { get; set; }
        [DataMember]
        public string billing_tel { get; set; }
        [DataMember]
        public string billing_email { get; set; }
        [DataMember]
        public string delivery_name { get; set; }
        [DataMember]
        public string delivery_address { get; set; }
        [DataMember]
        public string delivery_city { get; set; }
        [DataMember]
        public string delivery_state { get; set; }
        [DataMember]
        public string delivery_zip { get; set; }
        [DataMember]
        public string delivery_country { get; set; }
        [DataMember]
        public string delivery_tel { get; set; }
        [DataMember]
        public string merchant_param1 { get; set; }
        [DataMember]
        public string merchant_param2 { get; set; }
        [DataMember]
        public string merchant_param3 { get; set; }
        [DataMember]
        public string merchant_param4 { get; set; }
        [DataMember]
        public string merchant_param5 { get; set; }
        [DataMember]
        public string promo_code { get; set; }
        [DataMember]
        public string customer_identifier { get; set; }
        [DataMember]
        public string Type { get; set; }
        [DataMember]
        public string Contact { get; set; }
    }

    public class HDFCPaymentBankResponseDetail : HDFCPaymentRequest
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

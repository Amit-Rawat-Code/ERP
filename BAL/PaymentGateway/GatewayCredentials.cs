namespace BAL.PaymentGateway
{
    public class GatewayCredentials
    {
        //Common
        public string RequestUrl { get; set; }
        public string StatusRequestUrl { get; set; }
        public string RedirectUrl { get; set; }
        public string EncryptionKey { get; set; }

        //AXIS
        public string Type { get; set; }
        public string GatewayProvider { get; set; }
        public string CID { get; set; }
        public string TYP { get; set; }
        public string CKS { get; set; }
        //HDFC
        public string AccessCode { get; set; }
        public string MerchantId { get; set; }
        public string CancelUrl { get; set; }
        public string Paymode { get; set; }
    }

    public class PaymentGateway
    {
        public string RelationshipId { get; set; }
        public string Type { get; set; }
        public string APIType { get; set; }
    }
}

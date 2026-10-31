using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL.PaymentGateway.ICICI
{
    public class ICICIPaymentRequest:Common
    {
        public string MerchantId { get; set; }
        public string BankRefNo { get; set; }
        public string ReferenceNo { get; set; }
        public string SubmerchantId { get; set; }
        public string PGAmount { get; set; }
        public string AdmissionNo { get; set; }
        public string StudentName { get; set; }
        public string ClassSection { get; set; }
        public string InstallmentName { get; set; }
        public string MobileNo { get; set; }
        public string RedirectUrl { get; set; }
        public string Paymode { get; set; }
        public string Remark { get; set; }
        public string Status { get; set; }
        public string TransactionDateTime { get; set; }
    }
}

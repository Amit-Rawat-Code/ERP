using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
namespace BAL.PaymentGateway
{
    public class PaymentDetails:Common
    {
        [DataMember]
        public string OrderId { get; set; }
    }
}

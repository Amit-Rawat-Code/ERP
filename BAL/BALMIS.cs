using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace BAL
{
    public class BALMIS : Common
    {
        [DataMember]
        public string RIDs { get; set; }
    }
}

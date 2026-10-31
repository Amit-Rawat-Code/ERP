using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace BAL
{
    [DataContract]
    public class Complain : Common
    {
       

        [DataMember]
        public string ComplainText { get; set; }

      
        [DataMember]
        public string Codes { get; set; }

        [DataMember]
        public string ComplainAgainest { get; set; }

        [DataMember]
        public string ComplainBy { get; set; }

        [DataMember]
        public string TeacherId { get; set; }

        [DataMember]
        public string ConversationId { get; set; }

        [DataMember]
        public string Conversation { get; set; }


        [DataMember]
        public string StudentName { get; set; }

    }
}

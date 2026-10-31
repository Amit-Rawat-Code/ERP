using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace BAL
{
    [DataContract]
    public abstract class Common
    {
        [DataMember]
        public string FileJson { get; set; }
        [DataMember]
        public string Code { get; set; }
        [DataMember]
        public string SrNo { get; set; }
        
        [DataMember]
        public string TransID { get; set; }
        [DataMember]
        public string VType { get; set; }
        [DataMember]
        public string PVNo { get; set; }
        [DataMember]
        public string VDate { get; set; }
        [DataMember]
        public string DisplayCode { get; set; }
        [DataMember] 
        public string GroupCode { get; set; }
        [DataMember]
        public string SocietyCode { get; set; }
        [DataMember]
        public string SchoolCode { get; set; }
        [DataMember]
        public string BranchCode { get; set; }
        [DataMember]
        public int? RelationshipId { get; set; }
        [DataMember]
        public int? UserId { get; set; }
        [DataMember]
        public string Subject { get; set; }
        [DataMember]
        public string DateOfBirth { get; set; }
        [DataMember]
        public string RegNo { get; set; }


        [DataMember]
        public int? FYId { get; set; }
        [DataMember]
        public int? SessionId { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public string UpdatedBy { get; set; }
        [DataMember]
        public int ApprovedBy { get; set; }
        [DataMember]
        public string FromDate { get; set; }
        [DataMember]
        public string FormatedFromDate { get; set; }
        [DataMember]
        public string ToDate { get; set; }
        [DataMember]
        public string FormatedToDate { get; set; }
        [DataMember]
        public string Year { get; set; }
        [DataMember]
        public string Month { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
        [DataMember]
        public string ActiveParital { get; set; }
        [DataMember]
        public bool IsRecurring { get; set; }
        [DataMember]
        public bool IsLock { get; set; }
        [DataMember]
        public bool IsDelete { get; set; }
        [DataMember]
        public string StudentCode { get; set; }
        [DataMember]
        public string StudentId { get; set; }
        [DataMember]
        public int Action { get; set; }        

        [DataMember]
        public string DisplayOrder { get; set; }

        [DataMember]
        public int? DocumentId { get; set; }

        [DataMember]
        public string AcademicSessionId { get; set; }
        //Class 

        [DataMember]
        public string ClassCode { get; set; }
        [DataMember]
        public string SectionList { get; set; }

        [DataMember]
        public string SectionCode { get; set; }

        [DataMember]
        public string BatchCode { get; set; }
        [DataMember]
        public string StreamCode { get; set; }        
        [DataMember]
        public string StudentList { get; set; }
        [DataMember]
        public string ExcelDataTransID { get; set; }
        [DataMember]
        public string SchoolList { get; set; }
        [DataMember]
        public string IsFinalStudent { get; set; }
        
        [DataMember]
        public string PreviousSessionId { get; set; }
        public string ConvertDataTableToXml(DataTable dt)
        {
            MemoryStream str = new MemoryStream();
            dt.TableName = "XMLData";
            dt.WriteXml(str, true);
            str.Seek(0, SeekOrigin.Begin);
            StreamReader sr = new StreamReader(str);
            return sr.ReadToEnd();
        }
        public string ConverttoSHA1(string text)
        {
            var sh = SHA1.Create();
            var hash = new StringBuilder();
            byte[] bytes = Encoding.UTF8.GetBytes(text);
            byte[] b = sh.ComputeHash(bytes);
            foreach (byte a in b)
            {
                var h = a.ToString("x2");
                hash.Append(h);
            }
            return hash.ToString();
        }

        public string ReadXMLValue(string res, string key)
        {
            string val = "";
            XmlDocument xml = new XmlDocument();
            xml.LoadXml(res);
            XmlNode xn = xml.SelectSingleNode("/response/" + key);
            val = xn.InnerText;
            return val;
        }

        public XmlNodeList ReadXMLNodes(string res, string key)
        {
            XmlDocument xml = new XmlDocument();
            xml.LoadXml(res);
            XmlNodeList xnl = xml.SelectNodes("/response/" + key);
            return xnl;
        }
        public DataTable getXMLNodes(string res)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(new StringReader(res));
            DataTable dt = new DataTable();
            XmlNode nodes1 = doc.SelectNodes("/response/attendees/attendee")[0];
            XmlNodeList nodes = doc.SelectNodes("/response/attendees/attendee");
            // Data table structure
            if (nodes1 != null)
            {
                if (nodes1.ChildNodes.Count > 0)
                {
                    foreach (XmlNode col in nodes1)
                    {
                        dt.Columns.Add(col.Name, typeof(string));
                    }
                    // Data table Data
                    //XmlNode childnodes = doc.FirstChild;

                    foreach (XmlNode col in nodes)
                    {
                        DataRow dr = dt.NewRow();
                        foreach (XmlNode col1 in col.ChildNodes)
                        {
                            //values.Add(col1.InnerText);
                            dr[col1.Name] = col1.InnerText;
                            //dt.Rows.Add(values.ToArray());
                        }
                        dt.Rows.Add(dr);
                    }
                }
            }
            return dt;
        }

        public DataTable LINQResultToDataTable<T>(IEnumerable<T> Linqlist)
        {
            DataTable dt = new DataTable();


            PropertyInfo[] columns = null;

            if (Linqlist == null) return dt;

            foreach (T Record in Linqlist)
            {

                if (columns == null)
                {
                    columns = ((Type)Record.GetType()).GetProperties();
                    foreach (PropertyInfo GetProperty in columns)
                    {
                        Type IcolType = GetProperty.PropertyType;

                        if ((IcolType.IsGenericType) && (IcolType.GetGenericTypeDefinition()
                        == typeof(Nullable<>)))
                        {
                            IcolType = IcolType.GetGenericArguments()[0];
                        }

                        dt.Columns.Add(new DataColumn(GetProperty.Name, IcolType));
                    }
                }

                DataRow dr = dt.NewRow();

                foreach (PropertyInfo p in columns)
                {
                    dr[p.Name] = p.GetValue(Record, null) == null ? DBNull.Value : p.GetValue
                    (Record, null);
                }

                dt.Rows.Add(dr);
            }
            return dt;
        }
        public DateTime ConvertTimestampToDateTime(string datetime)
        {
            return new DateTime(1970, 1, 1, 0, 0, 0, 0).AddSeconds(Math.Round(Convert.ToInt64(datetime) / 1000d)).ToLocalTime();
        }
        [DataMember]
        public int Offset { get; set; }
        [DataMember]
        public int Offset2 { get; set; }
        [DataMember]
        public string PanelRefresh { get; set; }

        [DataMember]
        public string CountryCode { get; set; }
        [DataMember]
        public string StateCode { get; set; }
        [DataMember]
        public string CityCode { get; set; }
        [DataMember]
        public string SearchBox { get; set; }
        [DataMember]
        public string AnyOther { get; set; }
        [DataMember] public string Religion { get; set; }
        [DataMember] public string Nationality { get; set; }
        [DataMember] public string Category { get; set; }
        [DataMember] public string Caste { get; set; }
        [DataMember] public string MotherTongue { get; set; }
        [DataMember] public bool Flag { get; set; }
        [DataMember] public string EmployeeCode { get; set; }

        public async Task<string> SendNotificationtToMobile(string deviceId, string message, string title, string timestamp, string picpath, string serverkey, string senderid)
        {
            string statusCode;
            try
            {
                string SERVER_API_KEY = serverkey; var SENDER_ID = senderid;
                var value = message;
                WebRequest tRequest;
                tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
                tRequest.Method = "post";
                tRequest.ContentType = "application/json";

                tRequest.Headers.Add(string.Format("Authorization: key={0}", SERVER_API_KEY));

                tRequest.Headers.Add(string.Format("Sender: id={0}", SENDER_ID));
                string postData =
                "{ \"to\": \"" + deviceId + "\", " +
                "\"notification\": {\"title\":\"" + title + "\", " +
                "\"body\":\"" + message + "\", " +
                "\"image\":\"" + picpath + "\", " +
                "\"is_background\":\"false\"," +
                "\"timestamp\":\"" + timestamp + "\", " +
                "\"message\": \"" + message + "\"}}";

                //Console.WriteLine(postData);
                Byte[] byteArray = Encoding.UTF8.GetBytes(postData);
                tRequest.ContentLength = byteArray.Length;

                Stream dataStream = tRequest.GetRequestStream();
                dataStream.Write(byteArray, 0, byteArray.Length);
                dataStream.Close();

                WebResponse tResponse =await tRequest.GetResponseAsync();

                dataStream = tResponse.GetResponseStream();

                StreamReader tReader = new StreamReader(dataStream);

                String sResponseFromServer = tReader.ReadToEnd();
                HttpWebResponse httpResponse = (HttpWebResponse)tResponse;
                statusCode = httpResponse.StatusCode.ToString();

                tReader.Close();
                dataStream.Close();
                tResponse.Close();
            }
            catch (Exception ex)
            {
                _ = ex.Message;
                throw ex;
            }
            return statusCode;
        }

        public async Task<string> CheckSMSBalance(string balance_sms_api)
        {
            string result = "";
            try
            {
                using (WebClient balance_sms = new WebClient())
                {
                    ServicePointManager.Expect100Continue = true;
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    result = await balance_sms.DownloadStringTaskAsync(balance_sms_api);    
                }
            }
            catch (Exception ex)
            {
                result=ex.ToString();
            }
            return result;
        }

        public async Task<string> SendSMS(string send_sms_api)
        {
            string result = "";
            try
            {
                using (WebClient send_sms = new WebClient())
                {
                    ServicePointManager.Expect100Continue = true;
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    result = await send_sms.DownloadStringTaskAsync(send_sms_api);
                }
            }
            catch (Exception ex)
            {
                result = ex.ToString();
            }
            return result;
        }
    }
    
    public class WeekDayName
    {
        [DataMember]
        public bool Monday { get; set; }
        [DataMember]
        public bool Tuesday { get; set; }
        [DataMember]
        public bool Wednesday { get; set; }
        [DataMember]
        public bool Thursday { get; set; }
        [DataMember]
        public bool Friday { get; set; }
        [DataMember]
        public bool Saturday { get; set; }
        [DataMember]
        public bool Sunday { get; set; }
    }
    //[DataContract]
    //public class BranchAuthorization
    //{
    //    [DataMember]
    //    public string SchoolCode { get; set; }
    //    [DataMember]
    //    public string BranchCode { get; set; }
    //    [DataMember]
    //    public int SessionId { get; set; }
    //    [DataMember]
    //    public int FYId { get; set; }
    //    [DataMember]
    //    public int Action { get; set; }

    //    [DataMember]
    //    public string Code { get; set; }

    //    [DataMember]
    //    public string notificationids { get; set; }

    //}
}

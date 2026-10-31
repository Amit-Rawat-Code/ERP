using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace BAL
{
    [DataContract]
    public class BALLibrary : Common
    {
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string TransId { get; set; }
        [DataMember]
        public string AlmeraCode { get; set; }
        [DataMember]
        public string RackCode { get; set; }
        [DataMember]
        public string isebook { get; set; }
        [DataMember]
        public string BinStart { get; set; }
        [DataMember]
        public string BinEnd { get; set; }
        [DataMember]
        public string Prefix { get; set; }
        [DataMember]
        public string Rate { get; set; }
        [DataMember]
        public string Counter { get; set; }
        [DataMember]
        public string V_Type { get; set; }
        [DataMember]
        public string V_Date { get; set; }
        [DataMember]
        public string VendorCode { get; set; }
        [DataMember]
        public string BillNo { get; set; }
        [DataMember]
        public string BillDate { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string Address { get; set; }
        [DataMember]
        public string PhoneNo { get; set; }
        [DataMember]
        public string MobileNo { get; set; }
        [DataMember]
        public string Pincode { get; set; }
        [DataMember]
        public string CoverPhotoPath { get; set; }
        [DataMember]
        public string BookPDFPath { get; set; }
        [DataMember]
        public string BooKName { get; set; }
        [DataMember]
        public string SubjectGrpCode { get; set; }
        [DataMember]
        public string Paper { get; set; }
        [DataMember]
        public string PrintSeq { get; set; }
        [DataMember]
        public string ShortName { get; set; }        
        [DataMember]
        public string AccessionID { get; set; }
        [DataMember]
        public List<BinMaster> binmasterlist { get; set; }
        [DataMember]
        public string BookEntryList { get; set; }
        [DataMember]
        public List<BookStock> bookstock { get; set; }
        [DataMember]
        public string SubjectCode { get; set; }
        [DataMember]
        public string BookCode { get; set; }

        [DataMember]
        public string StartNumber { get; set; }
        [DataMember] 
        public int SubAction { get; set; }
        [DataMember]
        public string BookMasterExcelData { get; set; }
        [DataMember]
        public string BookStockExcelData { get; set; }
    }
    public struct BinMaster
    {
        [DataMember]
        public string SrNo { get; set; }
        [DataMember]
        public string AlmeraCode { get; set; }
        [DataMember]
        public string RackCode { get; set; }
        [DataMember]
        public string Bin { get; set; }
        [DataMember]
        public bool IsActive { get; set; }
    }
    public class BookEntry : BALLibrary
    {
        [DataMember]
        public string PublisherCode { get; set; }
        [DataMember]
        public string AuthorCode { get; set; }
        [DataMember]
        public string BookAccCode { get; set; }
        [DataMember]
        public string Edition { get; set; }
        [DataMember]
        public string PublisherYear { get; set; }
        [DataMember]
        public string Price { get; set; }
        [DataMember]
        public string NoOfPages { get; set; }
        [DataMember]
        public string NoOfCopy { get; set; }
    }
    public class BookStock : BALLibrary
    {
        [DataMember]
        public string BinCode { get; set; }
        [DataMember]
        public string ISBN { get; set; }
        [DataMember]
        public string DDC { get; set; }
        [DataMember]
        public string BARID { get; set; }
        [DataMember]
        public string AuthorCode { get; set; }
        [DataMember]
        public string PublisherCode { get; set; }
        [DataMember]
        public string Edition { get; set; }
        [DataMember]
        public string PublisherYear { get; set; }
        [DataMember]
        public string Price { get; set; }
        [DataMember]
        public string NoOfPages { get; set; }
        [DataMember]
        public string NoOfCopy { get; set; }
        [DataMember]
        public string BookAcceCode { get; set; }
        [DataMember]
        public string DataInToJson { get; set; }        
    }

    public class BookMaster : BALLibrary
    {
        [DataMember]
        public string Edition { get; set; }
        [DataMember]
        public string EditionType { get; set; }
        [DataMember]
        public string PublisherYear { get; set; }
        [DataMember]
        public string Cost { get; set; }
        [DataMember]
        public string NoOfPages { get; set; }
        [DataMember]
        public string NoOfCopies { get; set; }
        [DataMember]
        public string BookAcceCode { get; set; }
        [DataMember]
        public string PublisherCode { get; set; }
        [DataMember]
        public string AuthorCode { get; set; }
        [DataMember]
        public string Topic { get; set; }
        [DataMember]
        public string CategoryCode { get; set; }
        [DataMember]
        public string Series { get; set; }        

    }
    public class BookIssueEntry : BALLibrary
    {
        [DataMember]
        public string MemberType { get; set; }
        [DataMember]
        public string AccessionNo { get; set; }
        [DataMember]
        public string BARID { get; set; }
        [DataMember]
        public string Remark { get; set; }
        [DataMember]
        public string Type { get; set; }
        [DataMember]
        public string ScholarNo { get; set; }
        [DataMember]
        public string ReturnDate { get; set; }
        [DataMember]
        public string BookIssueDays { get; set; }
    }
    public class BookReturnEntry : BookIssueEntry
    {
        [DataMember]
        public string IssueTransId { get; set; }
        [DataMember]
        public string BookList { get; set; }
    }

    public class BindingType
    {
        [DataMember]
        public string BookCode { get; set; }
        [DataMember]
        public string AccessionNo { get; set; }
        [DataMember]
        public string BindingTypeCode { get; set; }
        [DataMember]
        public string Rate { get; set; }
        [DataMember]
        public string ReturnStatus { get; set; }
        [DataMember]
        public string TotalQty { get; set; }
        [DataMember]
        public string TotalAmt { get; set; }
    }
    public class BindingIssueEntry : BALLibrary
    {
        [DataMember]
        public string BinderCode { get; set; }
        public List<BindingType> bindingtype { get; set; }
        public List<BindingType> BD { get; set; }
        [DataMember]
        public string BindingIssueEntryInJson { get; set; }
        [DataMember]
        public string BindingIssueDetailInJson { get; set; }

        [DataMember]
        public string IssueNo { get; set; }
    }
    public class WriteOffEntry : BookMaster
    {
        [DataMember]
        public string WriteOffDate { get; set; }
        [DataMember]
        public string WriteType { get; set; }
        [DataMember]
        public string Resaon { get; set; }
        [DataMember]
        public string BARID { get; set; }
        [DataMember]
        public string Type { get; set; }
    }
    public class BookSearch : BALLibrary
    {
        [DataMember]
        public string BOBookName { get; set; }
        [DataMember]
        public string BSEdition { get; set; }
        [DataMember]
        public string BSPublisherYear { get; set; }
        [DataMember]
        public string BAName { get; set; }
        [DataMember]
        public string AUName { get; set; }
        [DataMember]
        public string PMName { get; set; }
        [DataMember]
        public string AMName { get; set; }
        [DataMember]
        public string RMName { get; set; }
        [DataMember]
        public string BMBin { get; set; }
        [DataMember]
        public string BSISBN { get; set; }
        [DataMember]
        public string BSDDC { get; set; }
        [DataMember]
        public string IssueNo { get; set; }
        [DataMember]
        public string BSAccessionID { get; set; }
        [DataMember]
        public string PrintCounter { get; set; }
        [DataMember]
        public string FromAccession { get; set; }
        [DataMember]
        public string ToAccession { get; set; }        
    }
    public class LateFine : BALLibrary
    {
        [DataMember]
        public string GracePeriod { get; set; }
        [DataMember]
        public string FineDay { get; set; }
        [DataMember]
        public string FineAmt { get; set; }
        [DataMember]
        public string MaximumIssueDays { get; set; }
        
    }
}

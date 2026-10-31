using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace BAL
{

    public class BALRegistration : Common
    {
        [DataMember]
        public string RegistrationFeeHeadCode { get; set; }
    }
    public class BALRegistrationFeeHead : BALRegistration
    {
        [DataMember]
        public string SubmissionType { get; set; }
        [DataMember]
        public string RegistrationFeeHead { get; set; }
        [DataMember]
        public string RegistrationAmount { get; set; }
        [DataMember]
        public int? AcademicYear { get; set; }

    }

    public class BALRegistrationReceive : BALRegistration
    {
        [DataMember]
        public string ReceivedOnDate { get; set; }
        [DataMember]
        public string FormNoStart { get; set; }
        [DataMember]
        public string FormNoEnd { get; set; }
        [DataMember]
        public string ProspectusPrefix { get; set; }
        [DataMember]
        public int? ProspectusNoStart { get; set; }
        [DataMember]
        public int? ProspectusNoEnd { get; set; }
        [DataMember]
        public string ProspectusSufix { get; set; }

        [DataMember]
        public string ProspectusData { get; set; }
    }

    public class BALRegistrationFormSaleEntry : BALRegistration
    {
        
        [DataMember]
        public string EnquiryTransID { get; set; }
        [DataMember]
        public string RegNoSerial { get; set; }
        [DataMember]
        public string FormSaleType    {get; set;}
        [DataMember]
        public string IsAgainstEnquiry {get; set;}
        [DataMember]
        public string FormNoEnd        {get; set;}
        //[DataMember]
        //public string StreamCode       {get;set;}
        [DataMember]
        public string BoardCode        {get;set;}   
        [DataMember]
        public string StudentFirstName {get;set;}  
        [DataMember]
        public string StudentMiddleName{get;set;}  
        [DataMember]
        public string StudentLastName  {get;set;}   
        [DataMember]
        public string Gender           {get;set;}  
        [DataMember]
        public string MotherName       {get;set;}  
        [DataMember]
        public string FatherName       {get;set;}   
        [DataMember]
        public string GuardianName     {get;set;}    
        [DataMember]
        public string StudentEmail     {get;set;}   
        [DataMember]
        public string ParentEmail      {get;set;}
        [DataMember]
        public string GuardianEmail { get; set; }
        [DataMember] 
        public string StudentContact   {get;set;}   
        [DataMember]
        public string FatherContact    {get;set;}  
        [DataMember]
        public string MotherContact    {get;set;}  
        [DataMember]
        public string GuardianContact  {get;set;}   
        [DataMember]
        public string PrimaryNo        {get;set;}  
        [DataMember]
        public string WhatsAppNo       {get;set;}  
        [DataMember]
        public string Address          {get;set;}  
        [DataMember]
        public string CityAreaCode     {get;set;}   
        [DataMember]
        public string SubArea          {get;set;}   
        [DataMember]
        public string PinCode          {get;set;}   
        [DataMember]
        public string CurrentPreviousSchool{get;set;}   
        [DataMember]
        public string Occupation  {get;set;}   
        [DataMember]
        public string Reference   {get;set;}   
        [DataMember]
        public string Remark      {get;set;}   
        [DataMember]
        public string Amount      {get;set;}   
        [DataMember]
        public string Discount    {get;set;}   
        [DataMember]
        public string  SaleRemark {get;set;}   
        [DataMember]
        public string  NetAmount  {get;set;}   
        [DataMember]
        public string   IsPayMode {get;set;}   
        [DataMember]
        public string PaymentType {get;set;}   
        [DataMember]
        public string IsDeleted   {get;set;}   
        [DataMember]
        public string CreaetdBy   {get;set; }
        [DataMember]
        public string PaymentRefrenceNo { get; set; }
        
    }

    public class BALRegistrationFormSubmission : Common
    {
        [DataMember]
        public string RegistrationFormSaleTransId { get; set; }
        [DataMember]
        public string StudentLastName { get; set; }
        [DataMember]
        public string StudentFirstName { get; set; }
        [DataMember]
        public string StudentMiddleName { get; set; }
        [DataMember]
        public string Days { get; set; }
        [DataMember]
        public string DateOfBirthInWords { get; set; }
        [DataMember]
        public string AgeAsOnYear { get; set; }
        [DataMember]
        public string AgeAsOnMonth { get; set; }
        [DataMember]
        public string CurrentlyStudyingSchool { get; set; }
        [DataMember]
        public string BoardCode { get; set; }
        [DataMember]
        public string MediumOfInstruction { get; set; }
        [DataMember]
        public string FatherName { get; set; }
        [DataMember]
        public string MotherName { get; set; }
        [DataMember]
        public string FatherContact { get; set; }
        [DataMember]
        public string MotherContact { get; set; }
        [DataMember]
        public string PrimaryNo { get; set; }
        [DataMember]
        public string WhatsAppNo { get; set; }
        [DataMember]
        public string FatherEmail { get; set; }
        [DataMember]
        public string MotherEmail { get; set; }
        [DataMember]
        public string FatherAcademicQualification { get; set; }
        [DataMember]
        public string MotherAcademicQualification { get; set; }
        [DataMember]
        public string FatherOccupation { get; set; }
        [DataMember]
        public string MotherOccupation { get; set; }
        [DataMember]
        public string FatherNatureOfJob { get; set; }
        [DataMember]
        public string MotherNatureOfJob { get; set; }
        [DataMember]
        public string ResidentialAddress { get; set; }
        [DataMember]
        public string ModeOfCommunication { get; set; }
        [DataMember]
        public string SubjectList { get; set; }
        [DataMember]
        public string StudentPhoto { get; set; }
        [DataMember]
        public string OverallPercentage { get; set; }
        
    }

    public class BALRegistrationFeePosting: Common
    {
        [DataMember]
        public string SubCode { get; set; }

        [DataMember]
        public string Status { get; set; }
        
    }
}

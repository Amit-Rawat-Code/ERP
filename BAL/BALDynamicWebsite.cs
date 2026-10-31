using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Reflection;

namespace BAL
{
    public  class BALDynamicWebsite
    {
        public string CountryCode { get; set; }
        public string StateCode { get; set; }
        public string CityCode { get; set; }
        public string TopHeaderFirstLineColour { get; set; }
        public string TopHeaderFirstLineTextColour { get; set; }
        public string TopHeaderFirstLineIconColour { get; set; }
        public string TopHeaderSecondLineColour { get; set; }
        public string TopHeaderSecondLineTextColour { get; set; }
        public string TopHeaderSecondLineIconColour { get; set; }
        public string BannerBottomLineTextColour { get; set; }
        public string WhyChooseHeadingTextColour { get; set; }
        public string OurProgramsHeadingTextColour { get; set; }
        public string OurProgramsSliderHeadingTextColour { get; set; }
        public string ClassesHeadingTextColour { get; set; }
        public string ClassesImageHeadingTextColour { get; set; }
        public string EventsHeadingTextColour { get; set; }
        public string EventsSliderHeadingTextColour { get; set; }
        public string WinningLaurelsHeadingTextColour { get; set; }
        public string BulletinHeadingTextColour { get; set; }
        public string OurHappyParentsHeadingTextColour { get; set; }
        public string OurGroupInstitutionsHeadingTextColour { get; set; }
        public string FacebookfeedssHeadingTextColour { get; set; }
        public string YouTubeHeadingTextColour { get; set; }
        public string ContactUsHeadingTextColour { get; set; }
        public string SkypeAddress { get; set; }
        public string ImageBorder { get; set; }
        public string ImageBorderRadius { get; set; }
        public string ImageWidth { get; set; }
        public string ImageObjectFit { get; set; }
        public string HeadingImageHeight { get; set; }
        public string ImageHeight { get; set; }
        public string PageBannerCategoryCode { get; set; }
        public string BodyContentMobileNoText { get; set; }
        public string BodyContentEmailText { get; set; }
        public string BodyContentTimingText { get; set; }
        public string BodyContentAddressText { get; set; }
        public string fileInput { get; set; }
        public string fileInput1 { get; set; }
        public string TransId { get; set; }
        public string BannerDescription1 { get; set; }
        public string BannerDescription2 { get; set; }
        public string BodyContentHeadingImgPath { get; set; }
        public string BodyContentHeadingText { get; set; }
        public string BodyContentImagePath { get; set; }
        public int FYId { get; set; }       
        public int SessionId { get; set; }
        public int RelationshipId { get; set; }
        public string TabAlignment { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string Description { get; set; }
        public string PhotoGalleryType { get; set; }
        public string ShownOn { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string AlbumName { get; set; }
        public string ImageName { get; set; }
        public string PhotoId { get; set; }
        public string AlbumIcon { get; set; }
        public string LayoutDemoImage { get; set; }
        public string TabImage { get; set; }
        public DateTime EventDate { get; set; }
        public string HindiPostTitle { get; set; }
        public string HindiEventName { get; set; }
        public string FacultyId { get; set; }
        public string Language { get; set; }
        public string Action { get; set; }
        public string UnitTypeCode { get; set; }
        public string UnitType { get; set; }
        public string UnitCode { get; set; }
        public string UnitId { get; set; }
        public string PGTransId { get; set; }
        public string RefUnitId { get; set; }
        public string UnitName { get; set; }
        public string UnitTitle { get; set; }
        public string Title { get; set; }
        public string logopath { get; set; }
        public string IsApproved { get; set; }
        public string IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string ImgPath { get; set; }
        public string ImgAlign { get; set; }
        public string PageName { get; set; }
        public string SeqNo { get; set; }
        public string TabId { get; set; }
        public string TabName { get; set; }
        public string MailCredID { get; set; }
        public string ModuleId { get; set; }
        public string MenuId { get; set; }
        public string MenuName { get; set; }
        public string SubMenuId { get; set; }
        public string SubMenuName { get; set; }
        public string UserTypeId { get; set; }
        public string UserType { get; set; }
        public string Id { get; set; }
        public int UserId { get; set; }
        public string Paswd { get; set; }
        public string DisplayName { get; set; }
        public string DisplayCode { get; set; }
        public string Contact { get; set; }
        public string Class { get; set; }
        public string Email { get; set; }
        public string Employeeid { get; set; }
        public string ImageId { get; set; }
        public string ImageIds { get; set; }
        public string BannerTitle { get; set; }
        public string BannerType { get; set; }
        public string BannerImageName { get; set; }
        public string ImageGUID { get; set; }
        public string BannerImageExt { get; set; }
        public string BannerImagePath { get; set; }
        public string BannerAltText { get; set; }
        public string Slogan { get; set; }
        public string SloganImagePath { get; set; }
        public List<string> PhotoIdList { get; set; }
        public string LayoutCode { get; set; }
        public string LayoutName { get; set; }       
        public string LayoutPageName { get; set; }
        public string LayoutPartId { get; set; }
        public string LayoutPartAbbreviationName { get; set; }
        public string LayoutPart { get; set; }        
        public string Link { get; set; }
        public string BodyContentId { get; set; }
        public string BodyContentIds { get; set; }
        public string BodyContent { get; set; }       
        public string URLType { get; set; }
        public string TargetUnitId { get; set; }
        public string TargetLayoutCode { get; set; }
        public string URL { get; set; }
        public string Attachment { get; set; }
        public string QuickLinksId { get; set; }
        public string QuickLinksHeaderId { get; set; }
        public string QuickLinksHeaderTextEng { get; set; }
        public string QuickLinksHeaderTextHin { get; set; }
        public string QuickLinksIds { get; set; }
        public string QuickLinksTextEng { get; set; }
        public string QuickLinksTextHin { get; set; }
        public string unittypeids { get; set; }
        public string unitids { get; set; }
        public string CategoryId { get; set; }
        public string CategoryNameEng { get; set; }
        public string CategoryNameHin { get; set; }
        public string CategoryPostId { get; set; }
        public string PostTitle { get; set; }
        public string PostContentEng { get; set; }
        public string PostContentHin { get; set; }
        public string GazetteId { get; set; }
        public string GazetteTitle { get; set; }
        public string GazetteContentEng { get; set; }
        public string GazetteContentHin { get; set; }
        public string Priority { get; set; }
        public string ViewCounter { get; set; }
        public List<string> VideoIdList { get; set; }
        public string VideoId { get; set; }
        public string VideoUrl { get; set; }
        public string thumbImgInput { get; set; }
        public string MediafileUrl { get; set; }
        public string MediaId { get; set; }
        public string AlbumIcon1 { get; set; }
        public string AlbumIcon2 { get; set; }
        public string Skills { get; set; }
        public string Alignment { get; set; }
        public string CaptionName { get; set; }
        public string CaptionIcon { get; set; }
        public string CaptionLink { get; set; }


        #region Event
        public string AcademicEventsId { get; set; }
        public string AcademicEventsIds { get; set; }
        public string EventFromDate { get; set; }
        public string EventToDate { get; set; }
        public string EventStartTime { get; set; }
        public string EventEndTime { get; set; }
        public string EventFeaturedImage { get; set; }

        public string EventType { get; set; }
        public string EventName { get; set; }
        public string AcademicEventsDetailsEng { get; set; }
        public string AcademicEventsDetailsHin { get; set; }
        public string Organizer { get; set; }
        public string OpenTo { get; set; }
        public string Location { get; set; }
        public string Remarks { get; set; }

        #endregion

        #region Notice
        public string NoticeId { get; set; }
        public string NoticeIds { get; set; }
        public string NoticeDate { get; set; }
        public string Headline { get; set; }
        public string HindiHeadline { get; set; }
        public string NoticeDetails { get; set; }
        public string NoticeHindiDetails { get; set; }

        public string ShowDate { get; set; }
        public string ShowTime { get; set; }
        public string HideDate { get; set; }
        public string HideTime { get; set; }
        #endregion

        #region Footer
        public string FooterId { get; set; }
        public string FooterIds { get; set; }
        public string FooterTextEng { get; set; }
        public string FooterTextHin { get; set; }
        public string FooterHeaderId { get; set; }
        public string FooterHeaderText { get; set; }        
        public string ContentEng { get; set; }
        public string ContentHin { get; set; }
        #endregion

        #region AlumniReg
        public string AlumniRegiId { get; set; }
        public string AlumniRegiIds { get; set; }
        public string FullName { get; set; }
        public string Photo { get; set; }
        public string honorific { get; set; }
        public string Gender { get; set; }
        public string Password { get; set; }
        public string LastProgStd { get; set; }
        public string ExamRollNo { get; set; }
        public string Discipline { get; set; }
        public string About { get; set; }
        public string Position { get; set; }
        public string PassedYr { get; set; }
        public string MobileNo { get; set; }
        public string WebSite { get; set; }
        public string PresentLocation { get; set; }
        public string Proffession { get; set; }
        public string BloodGroup { get; set; }
        public string FacebookLink { get; set; }
        public string TwitterLink { get; set; }
        public string LinkedInLink { get; set; }
        public string InstaLink { get; set; }
        public string HomeVideoLink { get; set; }
        public string YoutubeLink { get; set; }
        public string FacebookFeed { get; set; }
        public string YoutubeFeed { get; set; }
        public string SiteLocation { get; set; }
        public string MaintainedBy { get; set; }
        public string AlmaMater { get; set; }
        #endregion
        public bool SettoMainPage { get; set; }
        public string Programme { get; set; }
        public string Course { get; set; }
        public string DOB { get; set; }
        public string EnrollmentNo { get; set; }
        public string YOJ { get; set; }
        public string YOL { get; set; }
        public string Hostel { get; set; }
        public string PresentStatus { get; set; }
        public string University { get; set; }
        public string HCourse { get; set; }
        public string Specialization { get; set; }
        public string HCountry { get; set; }
        public string HState { get; set; }
        public string HCity { get; set; }
        public string PresentEmployer { get; set; }
        public string Designation { get; set; }
        public string PCountry { get; set; }
        public string PState { get; set; }
        public string PCity { get; set; }
        public string TempVacancyId { get; set; }
        public string PostName { get; set; }
        public string FromDate { get; set; }
        public string LastDate { get; set; }
        public string ExamDate { get; set; }
        public string InterviewDate { get; set; }
        public string Experience { get; set; }
        public string AgeLimit { get; set; }
        public string Eligibility { get; set; }
        public string Salary { get; set; }
        public string JobDescription { get; set; }
        public string TenderId { get; set; }
        public string TenderTitle { get; set; }
        public string ReferenceNo { get; set; }
        public string NITAttachment { get; set; }
        public string BidDocument { get; set; }
        public string PublishedSummary { get; set; }
        public string BOQ { get; set; }
        public string TenderDescription { get; set; }
        public string Status { get; set; }
        public string PublishBy { get; set; }
        public string FileExtension { get; set; }
        public string FileExtension2 { get; set; }
        public string FileExtension3 { get; set; }
        public string FileExtension4 { get; set; }
        public List<GazettePriority> GazettePriority1 { get; set; }
        public string AnnouncementId { get; set; }
        public string AnnouncementDescriptionEng { get; set; }
        public string AnnouncementDescriptionHin { get; set; }
        public int IsPasswordHandOver { get; set; }
        public List<FacultyPriority> FacultyPriority1 { get; set; }
        public string ContentImageDataDefaultSize { get; set; }
        public string HeadingImageDataDefaultSize { get; set; }
        public string BranchUrl { get; set; }
        public string OrderBy { get; set; }
        public string AccordianName { get; set; }
        public string AccordianContentHeading { get; set; }
        public string AccordianContent { get; set; }
        public string PageLinkList { get; set; }
        public string IsBanner { get; set; }
        public string IsSlider { get; set; }

        public int VisitorCount { get; set; }

        public string AccordianCode { get; set; }
        public string ImgSequence { get; set; }
        #region Apply Job
        public string JobPostingTransID { get; set; }
        public string CandidateName { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string AadharNo { get; set; }
        public string DateOfBirth { get; set; }
        public string CurrentCTC { get; set; }
        public string ExpectedCTC { get; set; }
        public string NoticePeriod { get; set; }
        public string CurrentOrganization { get; set; }
        public string PermanentAddress { get; set; }
        public string TotalExperience { get; set; }
        public string PanCardNo { get; set; }
        public string ResidentialAddress { get; set; }
        public string ResidentialStateCode { get; set; }
        public string ResidentialCityCode { get; set; }
        public string EmailId { get; set; }
        public string AcademicDetails { get; set; }

        public string CVPath { get; set; }
        #endregion


        public DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Defining type of data column gives proper data table 
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

        public string ConvertDataTableToXml(DataTable dt)
        {
            MemoryStream str = new MemoryStream();
            dt.TableName = "XMLData";
            dt.WriteXml(str, true);
            str.Seek(0, SeekOrigin.Begin);
            StreamReader sr = new StreamReader(str);
            return sr.ReadToEnd();
        }
        public class GazettePriority
        {
            public string GazetteId { get; set; }
            public string Priority { get; set; }
        }
        public class FacultyPriority
        {
            public string FacultyId { get; set; }
            public string Priority { get; set; }
        }
    }
}

using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        #region City Area Master
        public async Task<string> InsertUpdateDeleteCollegeCityAreaMaster(BALCollegeEnquiryModule obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CountryCode",obj.CountryCode),
                new SqlParameter("@StateCode",obj.StateCode),
                new SqlParameter("@CityCode",obj.CityCode),
                new SqlParameter("@CityAreaName",obj.CityAreaName),
                new SqlParameter("@AreaCode",obj.AreaCode),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeCityAreaMaster", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> GetCollegeCityAreaMaster(BALCollegeEnquiryModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CityCode",obj.CityCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeCityAreaMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion


        #region Enquiry Source Master
        public async Task<string> InsertUpdateDeleteCollegeEnquirySourceMaster(BALCollegeEnquiryModule obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@EnquirySource",obj.EnquirySource),
                new SqlParameter("@Recurring",obj.IsRecurring),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeEnquirySourceMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetCollegeEnquirySourceMaster(BALCollegeEnquiryModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.EnquirySource),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeEnquirySourceMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Enquiry Type Master
        public async Task<string> InsertUpdateDeleteCollegeEnquiryTypeMaster(BALCollegeEnquiryModule obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@EnquiryType",obj.EnquiryType),
                new SqlParameter("@ModeOfEnquiry",obj.ModeofEnquiry),
                new SqlParameter("@EnquiryCategory",obj.EnquiryCategory),
                new SqlParameter("@DisplayOrder",obj.DisplayOrder),
                new SqlParameter("@Recurring",obj.IsRecurring),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_CollegeEnquiryTypeMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetCollegeEnquiryTypeMaster(BALCollegeEnquiryModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ModeofEnquiry",obj.ModeofEnquiry),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_CollegeEnquiryTypeMaster", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region College Enquiry Form For Social Media & Website

        public async Task<string> InsertUpdateDeleteCollegeEnquiryFormForSocialMediaWebsite(BALCollegeEnquiryForm obj)
        {

            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@EnquiryFor",obj.EnquiryFor),
                new SqlParameter("@EnquiryForSessionCode",obj.AcademicSessionId),
                new SqlParameter("@SocialMediaTransId",obj.SocialMediaTransId),
                new SqlParameter("@IAm",obj.Iam),
                new SqlParameter("@StudentFirstName",obj.StudentFirstName),
                new SqlParameter("@StudentMiddleName",obj.StudentMiddleName),
                new SqlParameter("@StudentLastName",obj.StudentLastName),
                new SqlParameter("@StudentdEmail",obj.StudentdEmail),
                new SqlParameter("@ParentEmail",obj.ParentEmail),
                new SqlParameter("@StudentContact",obj.StudentContact),
                new SqlParameter("@FatherContact",obj.FatherContact),
                new SqlParameter("@VisitorContact",obj.VisitorContact),
                new SqlParameter("@StateCode",obj.StateCode),
                new SqlParameter("@CityCode",obj.CityCode),
                new SqlParameter("@CityAreaCode",obj.CityAreaCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@CollegeCourseCode",obj.CollegeCourseCode),
                new SqlParameter("@CollegeBranchCode",obj.CollegeBranchCode),
                new SqlParameter("@EnquiryTypeCode",obj.EnquiryTypeCode),
                new SqlParameter("@EnquirySourceCode",obj.EnquirySourceCode),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_CollegeEnquiryFromSocialMediaWebsite", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetCollegeEnquiryFormForSocialMediaWebsite(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_CollegeEnquiryFromSocialMediaWebsite", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region College Enquiry Form Offline
        public async Task<string> InsertUpdateDeleteCollegeEnquiryFormOffline(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@EnquiryFor",obj.EnquiryFor),
                new SqlParameter("@EnquiryForSessionCode",obj.AcademicSessionId),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@EnquiryTypeCode",obj.EnquiryTypeCode),
                new SqlParameter("@EnquirySourceCode",obj.EnquirySourceCode),
                new SqlParameter("@Iam",obj.Iam),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@Stream",obj.StreamCode),
                new SqlParameter("@CollegeCourseCode",obj.CollegeCourseCode),
                new SqlParameter("@CollegeBranchCode",obj.CollegeBranchCode),
                new SqlParameter("@VisitorName",obj.VisitorName),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@MotherName",obj.MotherName),
                new SqlParameter("@StudentFirstName",obj.StudentFirstName),
                new SqlParameter("@StudentMiddleName",obj.StudentMiddleName),
                new SqlParameter("@StudentLastName",obj.StudentLastName),
                new SqlParameter("@DateOfBirth",obj.DateOfBirth),
                new SqlParameter("@Gender",obj.Gender),
                new SqlParameter("@CategoryCode",obj.CategoryCode),
                new SqlParameter("@StudentdEmail",obj.StudentdEmail),
                new SqlParameter("@ParentEmail",obj.ParentEmail),
                new SqlParameter("@StudentContact",obj.StudentContact),
                new SqlParameter("@FatherContact",obj.FatherContact),
                new SqlParameter("@MotherContact",obj.MotherContact),
                new SqlParameter("@VisitorContact",obj.VisitorContact),
                new SqlParameter("@PrimaryNo",obj.PrimaryNo),
                new SqlParameter("@WhatsAppNo",obj.WhatsAppNo),
                new SqlParameter("@StateCode",obj.StateCode),
                new SqlParameter("@CityCode",obj.CityCode),
                new SqlParameter("@Address",obj.Address),
                new SqlParameter("@CityAreaCode",obj.CityAreaCode),
                new SqlParameter("@SubArea",obj.SubArea),
                new SqlParameter("@PinCode",obj.PinCode),
                new SqlParameter("@CurrentPreviousSchool",obj.CurrentPreviousSchool),
                new SqlParameter("@Occupation",obj.Occupation),
                new SqlParameter("@Reference",obj.Reference),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@HostalRequired",obj.HostalRequired),
                new SqlParameter("@NameofExam",obj.NameofExam),
                new SqlParameter("@Rank",obj.Rank),
                new SqlParameter("@NextFollowupDate",obj.NextFollowupDate),
                new SqlParameter("@FollowupCategory",obj.FollowupCategory),
                new SqlParameter("@FollowUpRemark",obj.FollowUpRemark),
                new SqlParameter("@LastQualifiedExaminationList",obj.LastQualifiedExaminationList),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@StatusCode",obj.StatusCode),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeEnquiryFromOffline]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetEnquiryCollegeFormOffline(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_CollegeEnquiryFromOffline]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region College Enquiry Followup Form
        public async Task<string> InsertUpdateDeleteCollegeEnquiryFollowupFormOffline(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@EnquiryFor",obj.EnquiryFor),
                new SqlParameter("@EnquiryForSessionCode",obj.AcademicSessionId),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@EnquiryTypeCode",obj.EnquiryTypeCode),
                new SqlParameter("@EnquirySourceCode",obj.EnquirySourceCode),
                new SqlParameter("@Iam",obj.Iam),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@Stream",obj.StreamCode),
                new SqlParameter("@CollegeCourseCode",obj.CollegeCourseCode),
                new SqlParameter("@CollegeBranchCode",obj.CollegeBranchCode),
                new SqlParameter("@VisitorName",obj.VisitorName),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@MotherName",obj.MotherName),
                new SqlParameter("@StudentFirstName",obj.StudentFirstName),
                new SqlParameter("@StudentMiddleName",obj.StudentMiddleName),
                new SqlParameter("@StudentLastName",obj.StudentLastName),
                new SqlParameter("@DateOfBirth",obj.DateOfBirth),
                new SqlParameter("@Gender",obj.Gender),
                new SqlParameter("@CategoryCode",obj.CategoryCode),
                new SqlParameter("@StudentdEmail",obj.StudentdEmail),
                new SqlParameter("@ParentEmail",obj.ParentEmail),
                new SqlParameter("@StudentContact",obj.StudentContact),
                new SqlParameter("@FatherContact",obj.FatherContact),
                new SqlParameter("@MotherContact",obj.MotherContact),
                new SqlParameter("@VisitorContact",obj.VisitorContact),
                new SqlParameter("@PrimaryNo",obj.PrimaryNo),
                new SqlParameter("@WhatsAppNo",obj.WhatsAppNo),
                new SqlParameter("@StateCode",obj.StateCode),
                new SqlParameter("@CityCode",obj.CityCode),
                new SqlParameter("@Address",obj.Address),
                new SqlParameter("@CityAreaCode",obj.CityAreaCode),
                new SqlParameter("@SubArea",obj.SubArea),
                new SqlParameter("@PinCode",obj.PinCode),
                new SqlParameter("@CurrentPreviousSchool",obj.CurrentPreviousSchool),
                new SqlParameter("@Occupation",obj.Occupation),
                new SqlParameter("@Reference",obj.Reference),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@HostalRequired",obj.HostalRequired),
                new SqlParameter("@NameofExam",obj.NameofExam),
                new SqlParameter("@Rank",obj.Rank),
                new SqlParameter("@LastQualifiedExaminationList",obj.LastQualifiedExaminationList),
                new SqlParameter("@NextFollowupDate",obj.NextFollowupDate),
                new SqlParameter("@FollowupCategory",obj.FollowupCategory),
                new SqlParameter("@FollowUpRemark",obj.FollowUpRemark),
                new SqlParameter("@TransferEnquiryTransID",obj.TransferEnquiryTransID),
                new SqlParameter("@TransferEnquiryTo",obj.TransferEnquiryTo),
                new SqlParameter("@TransferEnquiryDate",obj.TransferEnquiryDate),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@StatusCode",obj.StatusCode),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeEnquiryFollowUpFromOffline]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetCollegeEnquiryFollowupFormOffline(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_CollegeEnquiryFromOffline]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region College DashBoard Enquiry Forms List

        public async Task<DataSet> GetDashBoardLevel1(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@SessionIdForEnquiry",obj.SessionIdForEnquiry),
                new SqlParameter("@SessionIdForFollowup",obj.SessionIdForFollowup),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@EnquiryTypeCode1",obj.EnquiryTypeCode),
                new SqlParameter("@EnquiryTypeCode2",obj.EnquiryTypeCode2),
                new SqlParameter("@EnquirySourceCode",obj.EnquirySourceCode),
                new SqlParameter("@FollowUpCategory",obj.FollowupCategory),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand_UsingdataSet("dbo.USP_CollegeEnquiryDashboard", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetLavelWiseUser(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Level",obj.Level),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),               
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("dbo.USP_CollegeEnquiryDashboard", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> UpdateUserIdOfEnquiry(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@AssignUserList",obj.AssignedUserData),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[dbo].[USP_CollegeEnquiryDashboard]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region College Enquiry Report 


        #region Enquiry Register Report   

        public async Task<DataSet> GetCollegeEnquiryRegisterReport(BALCollegeEnquiryReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("rpt.USP_CollegeEnquiryRegisterReport", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region College Monthly Enquiry Statistics Report   

        public async Task<DataTable> GetCollegeMonthlyEnquiryStatisticsReport(BALCollegeEnquiryReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Month",obj.Month),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_CollegeMonthlyEnquiryStatistics]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataSet> GetDatewiseRegistrationFormReceiveReport(BALCollegeEnquiryReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[rpt].[DateWise_Report]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetDatewiseRegistrationFormSubmissionReport(BALCollegeEnquiryReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[DateWise_Report]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetDatewiseRegistrationFormSaleReport(BALCollegeEnquiryReport obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[rpt].[DateWise_Report]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #endregion

        #region College Social Media Post
        public async Task<string> InsertUpdateDeletePostingForSocialMedia(BALCollegePostingForSocialMedia obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@NameofEvent",obj.NameofEvent),
                new SqlParameter("@PublishDate",obj.PublishDate),
                new SqlParameter("@Description",obj.Description),
                new SqlParameter("@ImageAttachment",obj.ImageAttachment),
                new SqlParameter("@LinkGenerateFor",obj.LinkGenerateFor),
                new SqlParameter("@GeneratedLink",obj.GeneratedLink),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_PostingForSocialMedia", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetCollegeSocialMediaPostReport(BALCollegePostingForSocialMedia ob)
        {
            var param = new List<SqlParameter>
            {
               
                //new SqlParameter("@NameofEvent",ob.NameofEvent),
                new SqlParameter("@FromDate",ob.FromDate),
                new SqlParameter("@ToDate",ob.ToDate),
                new SqlParameter("@RelationshipId", ob.RelationshipId),
                new SqlParameter("@SessionId",ob.SessionId),
                new SqlParameter("@Action", ob.Action),
                //new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_CollegeSocialMediaPostReport]", CommandType.StoredProcedure, param.ToArray()));
        }


        #endregion



        #region College Enquiry FollowUp Send To Another  School
        public async Task<string> SendEnquiryToAnotherCollege(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@TransferEnquiryTransID",obj.TransferEnquiryTransID),
                new SqlParameter("@TransferSchoolId",obj.TransferSchoolId),
                new SqlParameter("@TransferEnquiryDate",obj.TransferEnquiryDate),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result"," "),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_EnquiryFollowUpFromOffline]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAllCollegeBranch(BALCollegeEnquiryForm obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_EnquiryFollowUpFromOffline]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
    }

}

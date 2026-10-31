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
        #region Observation Criteria
        public async Task<string> InsertUpdateDeleteObservationCriteria(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@CriteriaName",obj.CriteriaName),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ObservationCriteriaMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetObservationCriteria(BalTransportModule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ObservationCriteriaMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Interview Round
        public async Task<string> InsertUpdateDeleteInterviewRound(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RoundName",obj.RoundName),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_InterviewRoundMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetInterviewRound(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@CandidateOfferLetterEntryTransId",obj.CandidateOfferLetterEntryTransId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_InterviewRoundMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Dashboard Level1
        public async Task<DataSet> GetVacancyDashBoardData(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@RIDs",obj.RIDs),
                new SqlParameter("@FromDate",obj.FromDate),
                new SqlParameter("@ToDate",obj.ToDate),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[dbo].[USP_VacancyStatusDashboard]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        #region Dashboard Level2
        public async Task<DataTable> GetVacancyDetailData(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@VacancyTransId",obj.VacancyTransId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_VacancyDetailsForDashboard]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        #region School Collage Dashboard
        public async Task<DataTable> GetSchoolCollageDashboardData(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@VacancyTransId",obj.VacancyTransId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_VacancyStatusDashboard]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        #region Interview Invite List
        public async Task<DataTable> GetInterviewInviteListData(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@VacancyTransId",obj.VacancyTransId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[dbo].[USP_InterviewInviteDashboard]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        #region Interview Invite List
        public async Task<DataTable> GetAppliedCandidateDetail(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.TransId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InsertUpdateDeleteCandidateAppliedJob]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        #region Interview Schedule Candidates Lists
        public async Task<DataTable> GetInterViewScheduleCandidatesList(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_InterViewScheduleCandidatesList]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Short Listed Candiate Details
        public async Task<string> InsertShortListedCandidate(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@AppliedCandidateTransId",obj.AppliedCandidateTransId),
                new SqlParameter("@TransId",obj.TransId),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RecommendedProfileId",obj.RecommendedProfileId),
                new SqlParameter("@TotalExperienceInYears",obj.TotalExperienceInYears),
                new SqlParameter("@ActionOnCandidate",obj.ActionOnCandidate),
                new SqlParameter("@Remarks",obj.Remarks),
                new SqlParameter("@IsShortListed",obj.IsShortListed),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@ShortListedCandidateLists",obj.ShortListedCandidateLists),
                new SqlParameter("@IsForwarded",obj.IsForwarded),
                new SqlParameter("@InterviewDateTime",obj.InterviewDateTime),
                new SqlParameter("@IsWrittenTest",obj.WrittenTest),
                new SqlParameter("@IsInterview",obj.Interview),
                new SqlParameter("@IsDemo",obj.Demo),
                new SqlParameter("@ShortListedTransId",obj.ShortListedTransId),
                new SqlParameter("@InterviewScheduleCandidateTransId",obj.InterviewScheduleCandidateTransId),
                new SqlParameter("@SkillStatus",obj.SkillStatus),
                new SqlParameter("@CTETStatus",obj.CTETStatus),
                new SqlParameter("@ExpStatus",obj.ExpStatus),
                new SqlParameter("@DemoStatus",obj.DemoStatus),
                new SqlParameter("@WrittenStatus",obj.WrittenStatus),
                new SqlParameter("@MaxMarks",obj.MaxMarks),
                new SqlParameter("@ObtainedMarks",obj.ObtainedMarks),
                new SqlParameter("@SelectionStatus",obj.SelectionStatus),
                new SqlParameter("@JoiningDate",obj.JoiningDate),
                new SqlParameter("@DocumentationDate",obj.DocumentationDate),
                new SqlParameter("@JoiningCTC",obj.JoiningCTC),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_ShortListedCandidateDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Selected Candidates Lists
        public async Task<DataSet> GetSelectedCandidatesLists(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@CandidateOfferLetterEntryTransId",obj.CandidateOfferLetterEntryTransId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_GetSelectedCandidatesLists]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Offer Letter Generated Candidates Lists
        public async Task<DataSet> GetOfferLetterGeneratedCandidatesLists(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_GetOfferLetterGeneratedCandiatesList]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Insert Update Delete Selected Candidate Document
        public async Task<string> InsertUpdateDeleteSelectedCandidateOfferLetterDocument(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@SelectedCandidateTransId",obj.SelectedCandidateTransId),
                new SqlParameter("@CandidateOfferLetterEntryTransId",obj.CandidateOfferLetterEntryTransId),
                new SqlParameter("@DocumentCodeList",obj.DocumentCodeList),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeleteSelectedCandidateDocument]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Insert Update Delete Appointment Letter Document
        public async Task<string> InsertUpdateDeleteAppointmentLetter(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@CandidateOfferLetterEntryTransId",obj.CandidateOfferLetterEntryTransId),
                new SqlParameter("@FileJson",obj.FileJson),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeleteAppointmentLetterDocument]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Appointment Letter Generated Candidates Lists
        public async Task<DataSet> GetAppointmentLetterGeneratedCandidatesLists(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@EmployeeKramasterTransId",obj.EmployeeKramasterTransId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[trans].[USP_GetAppointmentLetterGeneratedCandiatesList]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Insert Update Delete Employee Wise KRA Details
        public async Task<string> InsertUpdateDeleteEmployeeWiseKRADetails(BALHRManagement obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@CandidateAppointmentLetterTransId",obj.CandidateAppointmentLetterEntryTransId),
                new SqlParameter("@KRAMasterCodeLists",obj.KRAMasterCodeLists),
                new SqlParameter("@KRADetailsList",obj.KRADetailsList),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@AppointmentLetterTemplatesDetails",obj.AppointmentLetterTemplateDetail),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_InsertUpdateDeleteEmployeeWiseKRA]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}

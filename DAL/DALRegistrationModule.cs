using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DLL
    {
        #region RegistrationFeeHeadMaster
        public async Task<string> InsertUpdateDeleteRegistrationFeeHeadMaster(BALRegistrationFeeHead obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Type",obj.SubmissionType),
                new SqlParameter("@RegistrationFeeHead",obj.RegistrationFeeHead),
                //new SqlParameter("@Amount",obj.RegistrationAmount),
                new SqlParameter("@AcademicYear",obj.AcademicYear),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_RegistrationFormFeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetRegistrationFeeHead(BALRegistrationFeeHead obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@RegistrationFeeHead",obj.RegistrationFeeHead),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_RegistrationFormFeeHeadMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Registration Form Sale Entry
        public async Task<string> InsertUpdateDeleteRegistrationFormSaleEntry(BALRegistrationFormSaleEntry obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID ",obj.TransID),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@PVNo ",obj.PVNo),
                new SqlParameter("@FormSaleType",obj.FormSaleType),
                new SqlParameter("@EnquiryTransID",obj.EnquiryTransID),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@IsAgainstEnquiry",obj.IsAgainstEnquiry),
                new SqlParameter("@ClassCode ",obj.ClassCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@BoardCode ",obj.BoardCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@StudentFirstName ",obj.StudentFirstName),
                new SqlParameter("@StudentMiddleName",obj.StudentMiddleName),
                new SqlParameter("@StudentLastName  ",obj.StudentLastName),
                new SqlParameter("@DateOfBirth",obj.DateOfBirth),
                new SqlParameter("@Gender",obj.Gender),
                new SqlParameter("@MotherName",obj.MotherName),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@GuardianName",obj.GuardianName),
                new SqlParameter("@Category",obj.Category),
                new SqlParameter("@StudentEmail",obj.StudentEmail),
                new SqlParameter("@ParentEmail ",obj.ParentEmail),
                new SqlParameter("@GuardianEmail ",obj.GuardianEmail),
                new SqlParameter("@StudentContact ",obj.StudentContact),
                new SqlParameter("@FatherContact ",obj.FatherContact),
                new SqlParameter("@MotherContact ",obj.MotherContact),
                new SqlParameter("@GuardianContact",obj.GuardianContact),
                new SqlParameter("@PrimaryNo ",obj.PrimaryNo),
                new SqlParameter("@WhatsAppNo",obj.WhatsAppNo),
                new SqlParameter("@StateCode ",obj.StateCode),
                new SqlParameter("@CityCode  ",obj.CityCode),
                new SqlParameter("@Address   ",obj.Address),
                new SqlParameter("@CityAreaCode",obj.CityAreaCode),
                new SqlParameter("@SubArea ",obj.SubArea),
                new SqlParameter("@PinCode ",obj.PinCode),
                new SqlParameter("@CurrentPreviousSchool",obj.CurrentPreviousSchool),
                new SqlParameter("@Occupation",obj.Occupation),
                new SqlParameter("@Reference ",obj.Reference),
                new SqlParameter("@Remark  ",obj.Remark),
                new SqlParameter("@Amount ",obj.Amount),
                new SqlParameter("@Discount  ",obj.Discount),
                new SqlParameter("@SaleRemark",obj.SaleRemark),
                new SqlParameter("@NetAmount ",obj.NetAmount),
                new SqlParameter("@IsPayMode ",obj.IsPayMode),
                new SqlParameter("@PaymentType",obj.PaymentType),
                new SqlParameter("@PaymentRefrenceNo",obj.PaymentRefrenceNo),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId ",obj.SessionId),
                new SqlParameter("@FYId  ",obj.FYId),
                new SqlParameter("@IsActive ",obj.IsActive),
                new SqlParameter("@CreaetdBy",obj.CreaetdBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action ",obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_RegistrationFormSaleEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        //public Task<DataTable> GetStudentDetails(BALSchoolAddmission obj)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<DataTable> GetRegistrationFormSaleEntry(BALRegistrationFormSaleEntry obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RegNoSerial",obj.RegNoSerial),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@Result", "")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_RegistrationFormSaleEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetStudentDetails(BALRegistrationFormSaleEntry obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SearchBox",obj.SearchBox),
                new SqlParameter("@RegNoSerial",obj.RegNoSerial),
                new SqlParameter("@FormSaleType",obj.FormSaleType),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@Result", "")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand_UsingdataSet("[trans].[USP_RegistrationFormSaleEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetAmountByClass(BALRegistrationFormSaleEntry obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@Result", "")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_RegistrationFormSaleEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region RegistrationReceiveMaster
        public async Task<string> InsertUpdateDeleteRegistrationReceiveMaster(BALRegistrationReceive obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RegistrationFeeHeadCode",obj.RegistrationFeeHeadCode),
                new SqlParameter("@ReceivedOnDate",obj.ReceivedOnDate),
                new SqlParameter("@ProspectusPrefix",obj.ProspectusPrefix),
                new SqlParameter("@ProspectusNoStart",obj.ProspectusNoStart),
                new SqlParameter("@ProspectusNoEnd",obj.ProspectusNoEnd),
                new SqlParameter("@ProspectusSufix",obj.ProspectusSufix),
                new SqlParameter("@ProspectusData",obj.ProspectusData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_RegistrationFormsReceiveMaster]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetRegistrationReceive(BALRegistrationReceive obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@ProspectusPrefix",obj.ProspectusPrefix),
                new SqlParameter("@ProspectusNoStart",obj.ProspectusNoStart),
                new SqlParameter("@ProspectusNoEnd",obj.ProspectusNoEnd),
                new SqlParameter("@ProspectusSufix",obj.ProspectusSufix),

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_RegistrationFormsReceiveMaster]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Registration Form Submission
        public async Task<string> InsertUpdateDeleteRegistrationFormSubmission(BALRegistrationFormSubmission obj)
        {
            var param = new List<SqlParameter>
            {   
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@RegistrationFormSaleTransId",obj.RegistrationFormSaleTransId),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@StudentLastName",obj.StudentLastName),
                new SqlParameter("@StudentFirstName",obj.StudentFirstName),
                new SqlParameter("@StudentMiddleName",obj.StudentMiddleName),
                new SqlParameter("@DateOfBirth",obj.DateOfBirth),
                new SqlParameter("@DateOfBirthinFiguresDay",obj.Days),
                new SqlParameter("@DateOfBirthinFiguresMonth",obj.Month),
                new SqlParameter("@DateOfBirthinFiguresYear",obj.Year),
                new SqlParameter("@DateOfBirthInWords",obj.DateOfBirthInWords),
                new SqlParameter("@AgeAsOnYear",obj.AgeAsOnYear),
                new SqlParameter("@AgeAsOnMonth",obj.AgeAsOnMonth),
                new SqlParameter("@CurrentlyStudyingSchool",obj.CurrentlyStudyingSchool),
                new SqlParameter("@BoardCode",obj.BoardCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectList",obj.SubjectList),
                new SqlParameter("@MediumOfInstruction",obj.MediumOfInstruction),
                new SqlParameter("@Nationality",obj.Nationality),
                new SqlParameter("@MotherTongue",obj.MotherTongue),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@MotherName",obj.MotherName),
                new SqlParameter("@FatherMobileNo",obj.FatherContact),
                new SqlParameter("@MotherMobileNo",obj.MotherContact),
                new SqlParameter("@PrimaryNo",obj.PrimaryNo),
                new SqlParameter("@WhatsAppNo",obj.WhatsAppNo),
                new SqlParameter("@FatherEmailId",obj.FatherEmail),
                new SqlParameter("@MotherEmailId",obj.MotherEmail),
                new SqlParameter("@FatherAcademicQualification",obj.FatherAcademicQualification),
                new SqlParameter("@MotherAcademicQualification",obj.MotherAcademicQualification),
                new SqlParameter("@FatherOccupation",obj.FatherOccupation),
                new SqlParameter("@MotherOccupation",obj.MotherOccupation),
                new SqlParameter("@FatherNatureOfJob",obj.FatherNatureOfJob),
                new SqlParameter("@MotherNatureOfJob",obj.MotherNatureOfJob),
                new SqlParameter("@ResidentialAddress",obj.ResidentialAddress),
                new SqlParameter("@ModeOfCommunication",obj.ModeOfCommunication),
                new SqlParameter("@Studentphoto",obj.StudentPhoto),
                new SqlParameter("@OverallPercentage",obj.OverallPercentage),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive ",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_RegistrationFormSubmission]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetRegistrationFormSubmission(BALRegistrationFormSubmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@Result", "")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_RegistrationFormSubmission]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetStudentDetailsFromRegistrationSale(BALRegistrationFormSubmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@DateOfBirth",obj.DateOfBirth),
                new SqlParameter("@SearchBox",obj.SearchBox),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@Result", "")

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand_UsingdataSet("[trans].[USP_RegistrationFormSubmission]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Registration Fee Posting
        public async Task<string> InsertUpdateDeleteRegistrationFeePosting(BALRegistrationFeePosting obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@SubCode",obj.SubCode),
                new SqlParameter("@StudentList",obj.StudentList),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId ",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_RegistrationFeePosting]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetRegistrationFormSaleTransactions(BALRegistrationFeePosting obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Status",obj.Status),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@FYId",obj.FYId)

             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_RegistrationFeePosting]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Registration Form Submission Online
        public async Task<string> InsertUpdateDeleteRegistrationFormSubmissionOnline(BALRegistrationFormSubmission obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@RegistrationFormSaleTransId",obj.RegistrationFormSaleTransId),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@StudentLastName",obj.StudentLastName),
                new SqlParameter("@StudentFirstName",obj.StudentFirstName),
                new SqlParameter("@StudentMiddleName",obj.StudentMiddleName),
                new SqlParameter("@DateOfBirth",obj.DateOfBirth),
                new SqlParameter("@DateOfBirthinFiguresDay",obj.Days),
                new SqlParameter("@DateOfBirthinFiguresMonth",obj.Month),
                new SqlParameter("@DateOfBirthinFiguresYear",obj.Year),
                new SqlParameter("@DateOfBirthInWords",obj.DateOfBirthInWords),
                new SqlParameter("@AgeAsOnYear",obj.AgeAsOnYear),
                new SqlParameter("@AgeAsOnMonth",obj.AgeAsOnMonth),
                new SqlParameter("@CurrentlyStudyingSchool",obj.CurrentlyStudyingSchool),
                new SqlParameter("@BoardCode",obj.BoardCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SubjectList",obj.SubjectList),
                new SqlParameter("@MediumOfInstruction",obj.MediumOfInstruction),
                new SqlParameter("@Nationality",obj.Nationality),
                new SqlParameter("@MotherTongue",obj.MotherTongue),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@MotherName",obj.MotherName),
                new SqlParameter("@FatherMobileNo",obj.FatherContact),
                new SqlParameter("@MotherMobileNo",obj.MotherContact),
                new SqlParameter("@PrimaryNo",obj.PrimaryNo),
                new SqlParameter("@WhatsAppNo",obj.WhatsAppNo),
                new SqlParameter("@FatherEmailId",obj.FatherEmail),
                new SqlParameter("@MotherEmailId",obj.MotherEmail),
                new SqlParameter("@FatherAcademicQualification",obj.FatherAcademicQualification),
                new SqlParameter("@MotherAcademicQualification",obj.MotherAcademicQualification),
                new SqlParameter("@FatherOccupation",obj.FatherOccupation),
                new SqlParameter("@MotherOccupation",obj.MotherOccupation),
                new SqlParameter("@FatherNatureOfJob",obj.FatherNatureOfJob),
                new SqlParameter("@MotherNatureOfJob",obj.MotherNatureOfJob),
                new SqlParameter("@ResidentialAddress",obj.ResidentialAddress),
                new SqlParameter("@ModeOfCommunication",obj.ModeOfCommunication),
                new SqlParameter("@Studentphoto",obj.StudentPhoto),
                new SqlParameter("@OverallPercentage",obj.OverallPercentage),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@IsActive ",obj.IsActive),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_RegistrationFormSubmission_Online]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> VerifyStudentRegistrationDetails(BALRegistrationFormSaleEntry obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RegNo",obj.RegNoSerial),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@StudentFirstName",obj.StudentFirstName),
                new SqlParameter("@StudentMiddleName",obj.StudentMiddleName),
                new SqlParameter("@StudentLastName",obj.StudentLastName),
                new SqlParameter("@ParentEmail",obj.ParentEmail),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@FatherContact",obj.FatherContact),
                new SqlParameter("@StateCode",obj.StateCode),
                new SqlParameter("@CityCode",obj.CityCode),
                new SqlParameter("@Address",obj.Address),
                new SqlParameter("@PinCode",obj.PinCode),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_VerifyStudentRegistrationDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
    }
}

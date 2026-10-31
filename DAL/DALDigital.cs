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
        // public static readonly DLL dal = new DLL();

        #region Digital Notice Board
        //-----Return TransactionId and Status of DML Query For MultiPart Api
        public async Task<DataTable> InsertUpdateDeleteDigitalNoticeBoard(BALDigital obj)
            {
                
                var param = new List<SqlParameter>
                {
                      new SqlParameter("@SendBy",obj.SendBy),
                      new SqlParameter("@CreateNoticeFor",obj.CreateNoticeFor),
                      new SqlParameter("@NoticeFor",obj.NoticeFor),
                      new SqlParameter("@StudentList",obj.StudentList),
                      new SqlParameter("@ClassCode",obj.ClassSectionList),
                      new SqlParameter("@TransID",obj.TransID),
                      new SqlParameter("@NoticeHeadline",obj.NoticeHeadline),
                      new SqlParameter("@AttachmentPath",obj.AttachmentPath),
                      new SqlParameter("@AttachmentType",obj.AttachmentType),
                      new SqlParameter("@Description",obj.Description),
                      new SqlParameter("@ShowDate", obj.ShowDate),
                      new SqlParameter("@EndDate",obj.EndDate),
                      new SqlParameter("@RelationshipId",obj.RelationshipId),
                      new SqlParameter("@SessionId",obj.SessionId),
                      new SqlParameter("@FYId",obj.FYId),
                      new SqlParameter("@CreaetdBy",obj.CreatedBy),
                      new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                      new SqlParameter("@IsApproved",obj.IsApproved),
                      new SqlParameter("@IsApprovedBy",obj.IsApprovedBy),
                      new SqlParameter("@ApprovalDate",obj.ApprovalDate),
                      new SqlParameter("@Action",obj.Action),
                      new SqlParameter("@Result", "")
                 };

                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalNoticeBoard", CommandType.StoredProcedure, param.ToArray()));
            }

            //-----Only Text Notice
            public async Task<string> InsertUpdateDeleteDigitalNoticeBoardApi(BALDigital obj)
            {

                var param = new List<SqlParameter>
                    {
                      new SqlParameter("@SendBy",obj.SendBy),
                      new SqlParameter("@CreateNoticeFor",obj.CreateNoticeFor),
                      new SqlParameter("@NoticeFor",obj.NoticeFor),
                      new SqlParameter("@StudentList",obj.StudentList),
                      new SqlParameter("@ClassCode",obj.ClassCode),
                      new SqlParameter("@TransID",obj.TransID),
                      new SqlParameter("@NoticeHeadline",obj.NoticeHeadline),
                      new SqlParameter("@AttachmentPath",obj.AttachmentPath),
                      new SqlParameter("@AttachmentType",obj.AttachmentType),
                      new SqlParameter("@Description",obj.Description),
                      new SqlParameter("@ShowDate", obj.ShowDate),
                      new SqlParameter("@EndDate",obj.EndDate),
                      new SqlParameter("@RelationshipId",obj.RelationshipId),
                      new SqlParameter("@SessionId",obj.SessionId),
                      new SqlParameter("@FYId",obj.FYId),
                      new SqlParameter("@CreaetdBy",obj.CreatedBy),
                      new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                      new SqlParameter("@IsApproved",obj.IsApproved),
                      new SqlParameter("@IsApprovedBy",obj.IsApprovedBy),
                      new SqlParameter("@ApprovalDate",obj.ApprovalDate),
                      new SqlParameter("@Action",obj.Action),
                      new SqlParameter("@Result", "")
                     };

                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("trans.USP_DigitalNoticeBoard", CommandType.StoredProcedure, param.ToArray()));
            }

        public async Task<DataTable> InsertUpdateDeleteDigitalNoticeBoardFiles(BALDigital obj)
            {

                var param = new List<SqlParameter>
                {
                  new SqlParameter("@Action","13"),
                  new SqlParameter("@TransID",obj.TransID),
                  new SqlParameter("@AttachmentType",obj.AttachmentType),
                  new SqlParameter("@AttachmentPath",obj.AttachmentPath), 
                  new SqlParameter("@RelationshipId",obj.RelationshipId),
                  new SqlParameter("@SessionId",obj.SessionId),
                  new SqlParameter("@Result ", "")
                 };

                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalNoticeBoard", CommandType.StoredProcedure, param.ToArray()));
            }

  

            public async Task<DataTable> GetDigitalNoticeBoard(BALDigital obj)
            {
                var param = new List<SqlParameter>
                 {
                    new SqlParameter("@Action",obj.Action),
                     new SqlParameter("@RelationshipId",obj.RelationshipId),
                     new SqlParameter("@IsApproved",obj.IsApproved),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@UserType",obj.UserType),
                    new SqlParameter("@StudentCode",obj.StudentCode),
                    new SqlParameter("@UserId",obj.UserId),
                 };
                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalNoticeBoard", CommandType.StoredProcedure, param.ToArray()));
            }



            //This function has created for fetch ClassList or TeachersList or StudentsList according to NoticeFor Parameter. 19-March-2021
            public async Task<DataTable> GetSearchingList(BALDigital obj)
            {
                var param = new List<SqlParameter>
                 {
                  new SqlParameter("@CreateNoticeFor",obj.CreateNoticeFor),
                  new SqlParameter("@NoticeFor",obj.NoticeFor),
                  new SqlParameter("@RelationshipId",obj.RelationshipId),
                  new SqlParameter("@GroupCode",obj.GroupCode),
                  new SqlParameter("@SocietyCode",obj.SocietyCode),
                  new SqlParameter("@SchoolCode",obj.SchoolCode),
                  new SqlParameter("@BranchCode",obj.BranchCode),
                  new SqlParameter("@SessionId",obj.SessionId),
                  new SqlParameter("@FYId",obj.FYId),
                  new SqlParameter("@Action",obj.Action)

                 };
                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetListNoticeForWise", CommandType.StoredProcedure, param.ToArray()));
            }
        public async Task<DataTable> GetSearchingListByRole(BALDigital obj)
        {
            var param = new List<SqlParameter>
                 {
                  new SqlParameter("@RoleId",obj.RoleId),
                  new SqlParameter("@Action",obj.Action)

                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_DigitalComplain]", CommandType.StoredProcedure, param.ToArray()));
        }
       #endregion



        #region Digital Diary

        public async Task<DataTable> InsertUpdateDeleteDigitalDiary(BALDigital obj)
        {
            var param = new List<SqlParameter>
            {   new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@PVNo",obj.PVNo),
                new SqlParameter("@StudentsList",obj.StudentList),
                new SqlParameter("@MessageFor",obj.MessageFor),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@WantToRevertMessage",obj.WantToRevertMessage),
                new SqlParameter("@AttachmentPath",obj.AttachmentPath),
                new SqlParameter("@AttachmentType",obj.AttachmentType),
                new SqlParameter("@MessageTitle",obj.MessageTitle),
                new SqlParameter("@Message",obj.Message),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreaetdBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result"," ")

             };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalDiary", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> InsertUpdateDeleteDigitalDiaryFiles(BALDigital obj)
        {

            var param = new List<SqlParameter>
            {
              new SqlParameter("@Action","13"),
              new SqlParameter("@TransID",obj.TransID),
              new SqlParameter("@AttachmentType",obj.AttachmentType),
              new SqlParameter("@AttachmentPath",obj.AttachmentPath),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@SessionId",obj.SessionId),
              new SqlParameter("@Result ", "")
             };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalDiary", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> GetDigitalDiary(BALDigital obj)
        {
            var param = new List<SqlParameter>
            {   
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action),

             };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalDiary", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetClassList(BALDigital obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@FYId ",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_ClassMaster", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> GetSectionList(BALDigital obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@GroupCode",obj.GroupCode),
                new SqlParameter("@SocietyCode",obj.SocietyCode),
                new SqlParameter("@SchoolCode",obj.SchoolCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("gblmaster.USP_SectionMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetStudentsList(BALDigital obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@RelationshipId ",obj.RelationshipId),
                new SqlParameter("@FYId ",obj.FYId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@Action",obj.Action)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AdmissionFormDetails]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion



        #region Digital Notice Board At Student Panel
        public async Task<DataTable> DigitalNoticeBoardAtStudentPanel(BALDigital obj)
        {
            var param = new List<SqlParameter>
            { new SqlParameter("@StudentCode",obj.StudentCode),
              new SqlParameter("@ClassCode",obj.ClassCode),
              new SqlParameter("@RelationshipId",obj.RelationshipId),
              new SqlParameter("@Action",obj.Action),//5
              new SqlParameter("@Result", "")
             };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalNoticeBoard", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Digital Diary At Student Panel

        public async Task<DataTable> InsertUpdateDeleteDigitalDiaryAtStudentPanel(BALDigital obj)
        {
            var param = new List<SqlParameter>
            {   new SqlParameter("@DigitalDiary",obj.DigitalDiaryList),
                new SqlParameter("@TransID",obj.TransID),
                new SqlParameter("@VDate",obj.VDate),
                new SqlParameter("@VType",obj.VType),
                new SqlParameter("@DigitalDiaryTransID",obj.DigitalDiaryTransID),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@RevertMessageReply",obj.RevertMessageReply),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreaetdBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Result","")

             };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalDiaryAtStudentPanel", CommandType.StoredProcedure, param.ToArray()));
        }





        #endregion




        #region Digital Circular Board
        public async Task<DataTable> InsertUpdateDeleteDigitalCircular(BALDigital obj)
        {

            var param = new List<SqlParameter>
                {
                  new SqlParameter("@SendBy",obj.SendBy),
                  new SqlParameter("@CreateCircularFor",obj.CreateCircularFor),
                  new SqlParameter("@CircularFor",obj.CircularFor),
                  new SqlParameter("@StudentList",obj.StudentList),
                  new SqlParameter("@ClassCode",obj.ClassCode),
                  new SqlParameter("@CircularHeadline",obj.CircularHeadline),
                  new SqlParameter("@Description",obj.Description),
                  new SqlParameter("@ShowDate", obj.ShowDate),
                  new SqlParameter("@EndDate",obj.EndDate),
                  new SqlParameter("@RelationshipId",obj.RelationshipId),
                  new SqlParameter("@SessionId",obj.SessionId),
                  new SqlParameter("@FYId",obj.FYId),
                  new SqlParameter("@CreaetdBy",obj.CreatedBy),
                  new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                  new SqlParameter("@Action",obj.Action),
                  new SqlParameter("@Result ", "")
                 };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalCircular", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> InsertUpdateDeleteDigitalCircularFiles(BALDigital obj)
        {

            var param = new List<SqlParameter>
                {
                  new SqlParameter("@Action","13"),
                  new SqlParameter("@TransID",obj.TransID),
                  new SqlParameter("@AttachmentType",obj.AttachmentType),
                  new SqlParameter("@AttachmentPath",obj.AttachmentPath),
                  new SqlParameter("@RelationshipId",obj.RelationshipId),
                  new SqlParameter("@SessionId",obj.SessionId),
                  new SqlParameter("@Result ", "")
                 };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalCircular", CommandType.StoredProcedure, param.ToArray()));
        }



        public async Task<DataTable> GetDigitalCircular(BALDigital obj)
        {
            var param = new List<SqlParameter>
                 {
                    new SqlParameter("@Action",obj.Action),
                     new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId)
                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalCircular", CommandType.StoredProcedure, param.ToArray()));
        }




        public async Task<DataTable> GetCircularSearchingList(BALDigital obj)
        {
            var param = new List<SqlParameter>
                 {
                  new SqlParameter("@CreateCircularFor",obj.CreateCircularFor),
                  new SqlParameter("@CircularFor",obj.CircularFor),
                  new SqlParameter("@RelationshipId",obj.RelationshipId),
                  new SqlParameter("@GroupCode",obj.GroupCode),
                  new SqlParameter("@SocietyCode",obj.SocietyCode),
                  new SqlParameter("@SchoolCode",obj.SchoolCode),
                  new SqlParameter("@BranchCode",obj.BranchCode),
                  new SqlParameter("@SessionId",obj.SessionId),
                  new SqlParameter("@FYId",obj.FYId),
                  new SqlParameter("@Action",obj.Action)

                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("USP_GetListCircularForWise", CommandType.StoredProcedure, param.ToArray()));
        }


        #endregion



        #region Digital Complain
        public async Task<DataTable> InsertUpdateDeleteDigitalComplain(BALDigital obj)
        {
            var param = new List<SqlParameter>
                { new SqlParameter("@TransId",obj.TransID),
                  new SqlParameter("@Status",obj.Status),
                  new SqlParameter("@ComplainTo",obj.ComplainTo),
                  new SqlParameter("@ReceivedBy",obj.ReceivedBy),
                  new SqlParameter("@Subject",obj.Subject),
                  new SqlParameter("@Description",obj.Description),
                  new SqlParameter("@RelationshipId",obj.RelationshipId),
                  new SqlParameter("@SessionId",obj.SessionId),
                  new SqlParameter("@FYId",obj.FYId),
                  new SqlParameter("@CreaetdBy",obj.CreatedBy),
                  new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                  new SqlParameter("@Action",obj.Action),
                  new SqlParameter("@Result ", "")
                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalComplain", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> InsertUpdateDeleteDigitalComplainFiles(BALDigital obj)
        {

            var param = new List<SqlParameter>
                {
                  new SqlParameter("@Action","13"),
                  new SqlParameter("@TransID",obj.TransID),
                  new SqlParameter("@AttachmentType",obj.AttachmentType),
                  new SqlParameter("@AttachmentPath",obj.AttachmentPath),
                  new SqlParameter("@RelationshipId",obj.RelationshipId),
                  new SqlParameter("@SessionId",obj.SessionId),
                  new SqlParameter("@Result ", "")
                 };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalComplain", CommandType.StoredProcedure, param.ToArray()));
        }



        public async Task<DataTable> GetDigitalComplain(BALDigital obj)
        {
            var param = new List<SqlParameter>
                 {
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@CreaetdBy",obj.CreatedBy),
                    new SqlParameter("@ReceivedBy",obj.ReceivedBy),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId)
                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalComplain", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Digital Complain - Chat Box
        public async Task<DataTable> InsertUpdateDeleteDigitalComplainChatBox(BALDigital obj)
        {

            var param = new List<SqlParameter>
                {
                  new SqlParameter("@SenderID",obj.SenderId),
                  new SqlParameter("@ReceiverID",obj.ReceiverId),
                  new SqlParameter("@ComplainTransId",obj.TransID),
                  new SqlParameter("@Message",obj.Message),
                  new SqlParameter("@RelationshipId",obj.RelationshipId),
                  new SqlParameter("@SessionId",obj.SessionId),
                  new SqlParameter("@FYId",obj.FYId),
                  new SqlParameter("@CreaetdBy",obj.CreatedBy),
                  new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                  new SqlParameter("@Action",obj.Action),
                  new SqlParameter("@Result ", "")
                
                 };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalComplain_Details", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> GetDigitalComplainChatBox(BALDigital obj)
        {
            var param = new List<SqlParameter>
                 {
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@CreaetdBy",obj.CreatedBy),
                    new SqlParameter("@ReceiverID",obj.ReceivedBy),
                    new SqlParameter("@ComplainTransId",obj.TransID),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId)
                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalComplain_Details", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> ChangeComplainStatus(BALDigital obj)
        {
            var param = new List<SqlParameter>
                 {
                   new SqlParameter("@TransId",obj.TransID),
                   new SqlParameter("@Message",obj.Message),
                   new SqlParameter("@RelationshipId",obj.RelationshipId),
                   new SqlParameter("@SessionId",obj.SessionId),
                   new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                   new SqlParameter("@Action",obj.Action),
                   new SqlParameter("@Result ", "")
                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("trans.USP_DigitalComplain_Details", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
    }

}

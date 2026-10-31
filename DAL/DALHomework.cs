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

        #region Homework
        public async Task<string> InsertUpdateDeleteHomework(HomeWork obj)
        {
            try { 
                  
            
                var param = new List<SqlParameter>
                {
                    new SqlParameter("@StudentsList",obj.StudentCodeList),
                    new SqlParameter("@TransId",obj.TransID),
                    new SqlParameter("@PVNo",obj.PVNo),
                    new SqlParameter("@VType",obj.VType),
                    new SqlParameter("@VDate",obj.VDate),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@SubjectCode",obj.SubjectCode),
                    new SqlParameter("@IsAllSubject",obj.IsAllSubject),
                    new SqlParameter("@HomeWorkDate",obj.HomeWorkDate),
                    new SqlParameter("@ShowDate",obj.ShowDate),
                    new SqlParameter("@EndDate",obj.EndDate),
                    new SqlParameter("@Attachment", obj.Attachment),
                    new SqlParameter("@Attachment2", obj.Attachment2),
                    new SqlParameter("@Attachment3", obj.Attachment3),
                    new SqlParameter("@Attachment4", obj.Attachment4),
                    new SqlParameter("@Attachment5", obj.Attachment5),
                    new SqlParameter("@Attachment6", obj.Attachment6),
                    new SqlParameter("@Attachment7", obj.Attachment7),
                    new SqlParameter("@Attachment8", obj.Attachment8),
                    new SqlParameter("@Attachment9", obj.Attachment9),
                    new SqlParameter("@Attachment10", obj.Attachment10),
                    new SqlParameter("@VideoPath",obj.VideoPath),
                    new SqlParameter("@VideoEndDate",obj.VideoEndDate),
                    new SqlParameter("@Title",obj.Title),
                    new SqlParameter("@Description ",obj.Description),
                    new SqlParameter("@SubmissionRequired",obj.SubmissionRequired),
                    //new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@Result","")
                 };


                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
            }
            catch (Exception ex)
            {
                return string.Empty;

            }
        }

        public async Task<DataTable> GetHomework(BALDigital obj)
        {
            var param = new List<SqlParameter>
                 {
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@TransID",obj.TransID),

                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetHomeworkReport(HomeWork obj)
        {
            var param = new List<SqlParameter>
                     {
                        new SqlParameter("@Action",obj.Action),
                        new SqlParameter("@RelationshipId",obj.ToDate),
                        new SqlParameter("@RelationshipId",obj.FromDate),
                        new SqlParameter("@RelationshipId",obj.ClassCode),
                        new SqlParameter("@RelationshipId",obj.SectionCode),
                        new SqlParameter("@RelationshipId",obj.Subject),
                        new SqlParameter("@RelationshipId",obj.HomeworkTopic),
                        new SqlParameter("@RelationshipId",obj.RelationshipId),
                        new SqlParameter("@SessionId",obj.SessionId),
                        new SqlParameter("@CreaetdBy",obj.CreatedBy),
                        new SqlParameter("@FYId",obj.FYId),
                     };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }
    
        public async Task<DataTable> GetEmployeeClass(HomeWork obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                 new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",  obj.RelationshipId),
                new SqlParameter("@SessionId",  obj.SessionId),
                new SqlParameter("@EmployeeCode",  obj.EmployeeCode)
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }

        public async Task<DataTable> GetEmployeeSection(HomeWork obj)
        {
            DataTable dt;
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",  obj.RelationshipId),
                new SqlParameter("@SessionId",  obj.SessionId),
                new SqlParameter("@ClassCode",  obj.ClassCode),
                new SqlParameter("@EmployeeCode",  obj.EmployeeCode),
            };
            dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }


        public async Task<DataTable> GetHomeworkTopic(BALDigital obj)
        {
            var param = new List<SqlParameter>
                 {
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@ShowDate",obj.FromDate),
                    new SqlParameter("@EndDate",obj.ToDate)
                 };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        public async Task<DataTable> getAllStudent(HomeWork obj)
        {
            var param = new List<SqlParameter>
                {
                    new SqlParameter("@Action", obj.Action),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@SubjectCode",obj.SubjectCode),
                    new SqlParameter("@RelationshipId",  obj.RelationshipId),
                    new SqlParameter("@SessionId",  obj.SessionId),
                    new SqlParameter("@fyId", obj.FYId)
                };
            DataTable dt = await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
            return dt;
        }
        public async Task<DataTable> GetHomeworkfor(HomeWork obj)
        {
            var param = new List<SqlParameter>

            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@SectionCode", obj.SectionCode),
                new SqlParameter("@ClassCode", obj.ClassCode),
                new SqlParameter("@Title", obj.TopicName),
                new SqlParameter("@EmployeeCode", obj.EmployeeCode),
                new SqlParameter("@RelationshipId",  obj.RelationshipId),
                new SqlParameter("@SessionId",  obj.SessionId),
                new SqlParameter("@fyId", obj.FYId),
            };
            
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> HomeworkTopic(HomeWork obj)
        {
            var param = new List<SqlParameter>
                 {
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@CreatedBy",obj.EmployeeCode),
                    new SqlParameter("@ClassCode",obj.ClassCode),
                    new SqlParameter("@SectionCode",obj.SectionCode),
                    new SqlParameter("@ShowDate",obj.FromDate),
                    new SqlParameter("@EndDate",obj.ToDate)
                 };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetClassWiseSubject(HomeWork obj)
        {
            var param = new List<SqlParameter>
             {

                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.EmployeeCode),
                //new SqlParameter("@SubjectGroupData",obj.SubjectGroupData),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_ClassWiseSubjectMaster", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetAllHomeWorkExecptTransId(HomeWork obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@TransId",obj.TransID),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@SessionId",  obj.SessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@fyId", obj.FYId)


            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetAllHomeWork(HomeWork obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action",8),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@fyId", obj.FYId),
                new SqlParameter("@SessionId", obj.SessionId),
                new SqlParameter("@EmployeeCode", obj.EmployeeId)
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> HomeWorkSubmittedbyStudent(HomeWork obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@TransId",obj.TransID),

                new SqlParameter("@Attachment", obj.Attachment),
                new SqlParameter("@Attachment2", obj.Attachment2),
                new SqlParameter("@Attachment3", obj.Attachment3),
                new SqlParameter("@Attachment4", obj.Attachment4),
                new SqlParameter("@Attachment5", obj.Attachment5),
                new SqlParameter("@Attachment6", obj.Attachment6),
                new SqlParameter("@Attachment7", obj.Attachment7),
                new SqlParameter("@Attachment8", obj.Attachment8),
                new SqlParameter("@Attachment9", obj.Attachment9),
                new SqlParameter("@Attachment10", obj.Attachment10),

                new SqlParameter("@RelationshipId",  obj.RelationshipId),
                new SqlParameter("@SessionId",  obj.SessionId),
              
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@Result", "")

        };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> HomeworkInsert(HomeWork obj)
        {

            var param = new List<SqlParameter>
            {
                new SqlParameter("@ClassId", obj.ClassCode),
                 new SqlParameter("@SectionId", obj.SectionCode),
                new SqlParameter("@SubjectId", obj.SubjectCode),
                new SqlParameter("@ShowTime", obj.ShowTime),
                new SqlParameter("@HideTime", obj.HideTime),
                new SqlParameter("@ShowDate", obj.ShowDate),
                new SqlParameter("@HideDate", obj.HideDate),
                new SqlParameter("@HomeworkFor", obj.HomeworkFor),
                new SqlParameter("@EmployeeCode",obj.EmployeeCode),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@StudentList",  obj.StudentsCode),
                new SqlParameter("@SubmissionDate", obj.HomeWorkDate),
                new SqlParameter("@TopicName", obj.TopicName),
                new SqlParameter("@Attachment", obj.Attachment),
                new SqlParameter("@Attachment2", obj.Attachment2),
                new SqlParameter("@Attachment3", obj.Attachment3),
                new SqlParameter("@Attachment4", obj.Attachment4),
                new SqlParameter("@Attachment5", obj.Attachment5),
                new SqlParameter("@Attachment6", obj.Attachment6),
                new SqlParameter("@Attachment7", obj.Attachment7),
                new SqlParameter("@Attachment8", obj.Attachment8),
                new SqlParameter("@Attachment9", obj.Attachment9),
                new SqlParameter("@Attachment10", obj.Attachment10),
                new SqlParameter("@VedioPath", obj.VedioPath),
                new SqlParameter("@RelationshipId",  obj.RelationshipId),
                new SqlParameter("@SessionId",  obj.SessionId),
               
                new SqlParameter("@FYId", obj.FYId),
                new SqlParameter("@HomeworkDetails", obj.HomeworkDetails),
                new SqlParameter("@IsSubmissionRequired", obj.IsSubmissionRequired),
                new SqlParameter("@Active", obj.IsActive),
                };
            if (obj.TransID != "0")
            {
                param.Add(new SqlParameter("@TransId", obj.TransID));
                param.Add(new SqlParameter("@VoucherNo", obj.VoucherNo));
                param.Add(new SqlParameter("@Action", 2));
                param.Add(new SqlParameter("@Result", ""));
            }
            else
            {
                param.Add(new SqlParameter("@Action", 1));
                param.Add(new SqlParameter("@Result", ""));
            }
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> SubmittedHomework(HomeWork obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@PVNo", obj.PVNo),
                new SqlParameter("@TransId", obj.TransID),
                new SqlParameter("@IsSubmitted",obj.IsSubmitted),
                new SqlParameter("@Title", obj.TopicName),
                new SqlParameter("@EmployeeCode", obj.EmployeeCode),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@RelationshipId",  obj.RelationshipId),
                new SqlParameter("@SessionId",  obj.SessionId),
                new SqlParameter("@Remark", obj.Remark),
                new SqlParameter("@fyId", obj.FYId)
             };

            if (obj.IscheckedbyTeacher == "1" && obj.IsSubmitted == "1")
            {
                param.Add(new SqlParameter("@IscheckedbyTeacher", obj.IscheckedbyTeacher));
                param.Add(new SqlParameter("@Action", "22"));
                param.Add(new SqlParameter("@Result", ""));
                return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
            }
            else
            {
                param.Add(new SqlParameter("@Action", "11"));
                param.Add(new SqlParameter("@Result", ""));
            }

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> HomeworkNotification(HomeWork obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@EmployeeCode", obj.EmployeeCode),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@StudentCode", obj.StudentCode),
                new SqlParameter("@RelationshipId",  obj.RelationshipId),
                new SqlParameter("@SessionId",  obj.SessionId),
                new SqlParameter("@fyId", obj.FYId),
                new SqlParameter("@Result", "")
        };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_Homework]", CommandType.StoredProcedure, param.ToArray()));
        }
    }
   

}
//GetHomeworkReport

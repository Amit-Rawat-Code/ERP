using BAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;


namespace DAL
{
    public partial class DLL
    {
        #region CreateBatch
        public async Task<string> InsertUpdateDeleteCreateBatch(BALCreateBatch obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@NoOfRegdStudent",obj.NoOfRegdStudent),
                new SqlParameter("@NoOfStudentPerBatch",obj.NoOfStudentPerBatch),
                new SqlParameter("@TotalBatches",obj.TotalBatches),
                new SqlParameter("@StudentList",obj.StudentList),
                new SqlParameter("@OrderBy",obj.OrderBy),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_CreateBatch]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetBatchMaster(BALCreateBatch obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CreateBatch]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetCollectStudent(BALCreateBatch obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CreateBatch]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetOrderByStudent(BALCreateBatch obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@OrderBy",obj.OrderBy),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CreateBatch]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Batch Slot
        public async Task<DataTable> GetClassesWithRespectOfCreatedBatches(BALBatchSlotTime obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CreateBatchTimeSlot]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<string> InsertUpdateDeleteBatchTimeSlot(BALBatchSlotTime obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@SlotDate",Convert.ToDateTime(obj.SlotDate).ToString("yyyy-MM-dd")),
                new SqlParameter("@SlotTime",Convert.ToDateTime(obj.SlotTime).ToString("HH:mm tt")),
                new SqlParameter("@BatchDuration",obj.BatchDuration),
                new SqlParameter("@BatchInterval",obj.BatchInterval),
                new SqlParameter("@IsWrittenExam",obj.IsWrittenExam),
                new SqlParameter("@Remark",obj.Remark),
                new SqlParameter("@BatchesData",obj.BatchesData),
                new SqlParameter("@DocumentsData",obj.DocumentsData),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_CreateBatchTimeSlot]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetBatchTimeSlot(BALBatchSlotTime obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@BatchesData",obj.BatchesData),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_CreateBatchTimeSlot]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetBatchTimeSlotDetail(BALBatchSlotTime obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[mast].[USP_CreateBatchTimeSlot]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region ChangeBatch
        public async Task<string> InsertUpdateDeleteChangeBatch(BALCreateBatch obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@BatchCode",obj.BatchCode),

                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_ChangeStudentBatch]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetChangeBatch(BALCreateBatch obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_ChangeStudentBatch]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Admission Transaction
        #region Send Email & SMS
        public async Task<DataTable> GetBranch(BALSendSMSEmailSchedule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SendEmailSMSSchedule_Detail]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentRecord(BALSendSMSEmailSchedule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@BatchesData",obj.BatchesData),
                new SqlParameter("@CommunicationVia",obj.CommunicationVia),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SendEmailSMSSchedule_Detail]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> InsertUpdateDeleteSendSMSEmailDetail(BALSendSMSEmailSchedule obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Date",obj.ToDate),
                new SqlParameter("@CommunicationVia",obj.CommunicationVia),
                new SqlParameter("@StudentData",obj.StudentData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SendEmailSMSSchedule_Detail]", CommandType.StoredProcedure, param.ToArray()));
        }
        public DataTable GetPrintMailMessage(string RelationshipId, string SessionId)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",7),
                new SqlParameter("@RelationshipId",RelationshipId),
                new SqlParameter("@SessionId",SessionId),
             };
            return SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SendEmailSMSSchedule_Detail]", CommandType.StoredProcedure, param.ToArray());
        }
        public string SendMail(DataTable DT)
        {
            string Response = "0";
            //string returnmsg = "0";
            if (DT.Rows.Count > 0)
            {
                if (DT.Rows[0]["CommunicationVia"].ToString() == "E")
                {

                    DataTable result = DLL.dal.GetPrintMailMessage(DT.Rows[0]["RelationshipId"].ToString(), DT.Rows[0]["SessionId"].ToString());

                    foreach (DataRow row in DT.Rows)
                    {
                        if (row["Email"].ToString() != "")
                        {
                            try
                            {
                                string email = row["Email"].ToString();
                                string subject = row["Subject"].ToString();
                                string content = row["EmailMsg"].ToString();
                                string SendEmail = result.Rows[0]["UserName"].ToString();
                                String Password = result.Rows[0]["Password"].ToString();
                                MailMessage mail = new MailMessage();
                                SmtpClient SmtpServer = new SmtpClient(result.Rows[0]["SMTPServer"].ToString());
                                mail.From = new MailAddress(result.Rows[0]["UserName"].ToString());
                                mail.To.Add(email);
                                mail.Subject = subject;
                                mail.IsBodyHtml = true;
                                string formatmail = "";
                                formatmail += content;
                                mail.Body = formatmail;
                                SmtpServer.Port = Convert.ToInt32(result.Rows[0]["Port"].ToString());
                                SmtpServer.Credentials = new System.Net.NetworkCredential(SendEmail, Password);
                                SmtpServer.EnableSsl = true;
                                SmtpServer.Send(mail);
                                Response = "1";
                            }
                            catch (Exception ex)
                            {
                                Response = "0";
                            }
                        }
                    }
                }
                else if (DT.Rows[0]["CommunicationVia"].ToString()== "S")
                {
                    foreach (DataRow row1 in DT.Rows)
                    {
                        var param = new List<SqlParameter>
                            {

                                 new SqlParameter("@RelationshipId",DT.Rows[0]["RelationshipId"].ToString()),
                                 new SqlParameter("@SessionId",DT.Rows[0]["SessionId"].ToString()),
                                 new SqlParameter("@Mobile",row1["MobileNo"].ToString()),
                                 new SqlParameter("@Message",  row1["MobileMsg"].ToString()),
                                 new SqlParameter("@Action", 1),
                                 new SqlParameter("@Mode", "Send API"),
                                 new SqlParameter("@Result", ""),
                             };
                        string Getvalue = SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnScalar("mast.USP_SendMessage", CommandType.StoredProcedure, param.ToArray());
                        if (Getvalue != "")
                        {
                            WebRequest request = WebRequest.Create(Getvalue);
                            request.Method = "POST";
                            string postData = row1["MobileMsg"].ToString();
                            byte[] byteArray = Encoding.UTF8.GetBytes(postData);
                            request.ContentType = "application/x-www-form-urlencoded";
                            // request.ContentType = "text/xml"
                            request.ContentLength = byteArray.Length;
                            Stream dataStream = request.GetRequestStream();
                            dataStream.Write(byteArray, 0, byteArray.Length);
                            dataStream.Close();
                            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                            Console.WriteLine(response.StatusDescription);
                            dataStream = response.GetResponseStream();
                            StreamReader reader = new StreamReader(dataStream);
                            string responseFromServer = reader.ReadToEnd();
                            Console.WriteLine(responseFromServer);
                            reader.Close();
                            dataStream.Close();
                            response.Close();
                            Response = "1";
                        }
                    }
                }


            }
           
            return Response;
        }
        #endregion

        #region Send Email & SMS For Merit List
        public async Task<DataTable> GetStudentRecordForMeritList(BALSendSMSEmailSchedule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CommunicationVia",obj.CommunicationVia),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SendEmailSMSMeritList_Detail]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> InsertUpdateDeleteSendSMSEmailForMeritListDetail(BALSendSMSEmailSchedule obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Date",obj.ToDate),
                new SqlParameter("@CommunicationVia",obj.CommunicationVia),
                new SqlParameter("@StudentData",obj.StudentData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SendEmailSMSMeritList_Detail]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Send Email & SMS For Entrance Merit List
        public async Task<DataTable> GetStudentRecordEntranceMeritList(BALSendSMSEmailSchedule obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@CommunicationVia",obj.CommunicationVia),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SendEmailSMSEntranceMeritList_Detail]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> InsertUpdateDeleteSendSMSEmailForEntranceMeritList(BALSendSMSEmailSchedule obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Date",obj.ToDate),
                new SqlParameter("@CommunicationVia",obj.CommunicationVia),
                new SqlParameter("@StudentData",obj.StudentData),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_SendEmailSMSEntranceMeritList_Detail]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        #endregion

        #region Class Merit List Pre Primary
        public async Task<string> InsertUpdateDeleteClassMeritListPrePrimary(BALBatchTransaction obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@MeritCode",obj.MeritCode),
                new SqlParameter("@StudentData",obj.StudentData),

                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_PrePrimaryClassMeritList]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetClassMeritListPrePrimary(BALBatchTransaction obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[mast].[USP_PrePrimaryClassMeritList]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Entrance Marks Entry - Primary/Junior



        public async Task<DataTable> GetBatchesForMarksEntry(BALBatchTransaction obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@BatchCode",obj.BatchCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_EntranceMarksEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteEntranceMarksEntryPrimaryJunior(BALEntryMarksEntryTransaction obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@BatchCode",obj.BatchCode),
                new SqlParameter("@TotalMarks",obj.TotalMarks),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@SubjectMarksEntry",obj.SubjectMarksEntry),
                new SqlParameter("@MarkData",obj.EntranceMarksList),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_EntranceMarksEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetEntranceMarksEntryPrimaryJunior(BALEntryMarksEntryTransaction obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@BatchCode",obj.BatchCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[mast].[USP_EntranceMarksEntry]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetEntranceSubjects(BALBatchTransaction obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@RegNo",obj.RegNo),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_EntranceMarksEntry]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Class Merit List Primary Jr
        public async Task<string> InsertUpdateDeleteClassMeritListPrimaryJr(BALBatchTransaction obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@MeritCode",obj.MeritCode),
                new SqlParameter("@StudentData",obj.StudentData),
                new SqlParameter("@CutOffFrom",obj.CutOffFrom),
                new SqlParameter("@CutOffTo",obj.CutOffTo),

                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_PrimaryJuniorClassMeritList]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetClassMeritListPrePrimaryJr(BALBatchTransaction obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@CutOffFrom",obj.CutOffFrom),
                new SqlParameter("@CutOffTo",obj.CutOffTo),
                new SqlParameter("@IWMS",obj.IsActive),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_PrimaryJuniorClassMeritList]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Admission Form Details
        public async Task<DataTable> GetStudentDetails(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@AdmissionSourceType",obj.AdmissionSourceType),
                new SqlParameter("@SearchBox",obj.SearchBox),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@FatherName",obj.FatherName),
                new SqlParameter("@MotherName",obj.MotherName),
                new SqlParameter("@FatherMobile",obj.FatherMobile),
                new SqlParameter("@AddOther",obj.AnyOther),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AdmissionFormDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> InsertUpdateDeleteAdmissionFormDetails(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>

            {
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@StudentID", obj.StudentID),
                new SqlParameter("@RegNo", obj.RegNo),
                new SqlParameter("@RegNoTransId", obj.TransID),
                new SqlParameter("@ClassCode", obj.ClassCode),
                new SqlParameter("@SectionCode", obj.SectionCode),
                new SqlParameter("@AdmissionNo", obj.AdmissionNo),
                new SqlParameter("@AdmissionSourceType", obj.AdmissionSourceType),
                new SqlParameter("@AcademicSessionId", obj.AcademicSessionId),
                new SqlParameter("@BoardCode", obj.BoardCode),
                new SqlParameter("@FirstName", obj.FirstName),
                new SqlParameter("@MiddleName", obj.MiddleName),
                new SqlParameter("@LastName", obj.LastName),
                new SqlParameter("@DOB", obj.DOB),
                new SqlParameter("@PlaceOfBirth", obj.PlaceOfBirth),
                new SqlParameter("@AgeOnDate", obj.AgeOnDate),
                new SqlParameter("@Gender", obj.Gender),
                new SqlParameter("@StudentEmail", obj.StudentEmail),
                new SqlParameter("@StudentContact", obj.StudentContact),
                new SqlParameter("@AadharCardNo", obj.AadharCardNo),
                new SqlParameter("@BloodGroup", obj.BloodGroup),
                new SqlParameter("@DateOfJoining", obj.DateOfJoining),
                new SqlParameter("@DateOfAdmission", obj.DateOfAdmission),
                new SqlParameter("@Nationality", obj.Nationality),
                new SqlParameter("@Religion", obj.Religion),
                new SqlParameter("@Category", obj.Category),
                new SqlParameter("@Caste", obj.Caste),
                new SqlParameter("@IsEws", obj.IsEws),
                new SqlParameter("@IsSibling", obj.IsSibling),
                new SqlParameter("@SiblingStudentList", obj.SiblingStudentList),
                new SqlParameter("@IsTC", obj.IsTC),
                new SqlParameter("@IsTransport", obj.IsTransport),
                new SqlParameter("@IsHostel", obj.IsHostel),
                new SqlParameter("@IsActive", obj.ActiveParital),

                new SqlParameter("@StreamCode", obj.StreamCode),
                new SqlParameter("@BranchCode", obj.BranchCode),
                new SqlParameter("@Medium", obj.Medium),
                new SqlParameter("@SubjectList", obj.SubjectList),
                new SqlParameter("@MedicalHistory", obj.MedicalHistory),
                new SqlParameter("@Allergies", obj.Allergies),
                new SqlParameter("@OtherMedicalInfo", obj.OtherMedicalInfo),
                new SqlParameter("@FamilyDoctorPhone", obj.FamilyDoctorPhone),
                new SqlParameter("@FamilyDoctorAddress", obj.FamilyDoctorAddress),
                new SqlParameter("@DistanceFromHome", obj.DistanceFromHome),
                new SqlParameter("@IsOnlyChild", obj.IsOnlyChild),
                new SqlParameter("@GeneralDescription", obj.GeneralDescription),
                new SqlParameter("@DesignationCode", obj.DesignationCode),
                new SqlParameter("@StaffWardCode", obj.EmployeeCode),

                new SqlParameter("@SchoolName", obj.SchoolName),
                new SqlParameter("@PreviousCityCode", obj.PreviousCity),
                new SqlParameter("@PreviousClass", obj.PreviousClass),
                new SqlParameter("@PreviousYear", obj.PreviousYear),
                new SqlParameter("@PreviousBoardCode", obj.PreviousBoard),
                new SqlParameter("@Percentage", obj.Percentage),

                new SqlParameter("@GuardianName", obj.GuardianName),
                new SqlParameter("@GuardianOccupationCode", obj.GuardianOccupationCode),
                new SqlParameter("@GuardianDesignationCode", obj.GuardianDesignationCode),
                new SqlParameter("@GuardianResidenceAddress", obj.GuardianResidenceAddress),
                new SqlParameter("@GuardianOfficeAddress", obj.GuardianOfficeAddress),
                new SqlParameter("@GuardianEmail", obj.GuardianEmail),
                new SqlParameter("@GuardianAlternateEmail", obj.GuardianAlternateEmail),
                new SqlParameter("@GuardianDOB", obj.GuardianDOB),
                new SqlParameter("@GuardianMobile", obj.GuardianMobile),
                new SqlParameter("@GuardianPhone", obj.GuardianPhone),
                new SqlParameter("@GuardianCompanyName", obj.GuardianCompanyName),
                new SqlParameter("@GuardianBusinessDetails", obj.GuardianBusinessDetails),
                new SqlParameter("@GuardianQualification", obj.GuardianQualification),
                new SqlParameter("@GuardianServiceIn", obj.GuardianServiceIn),
                new SqlParameter("@GuardianOfficephone", obj.GuardianOfficephone),
                new SqlParameter("@GuardianOfficeMobile", obj.GuardianOfficeMobile),
                new SqlParameter("@GuardianOfficeExtension", obj.GuardianOfficeExtension),
                new SqlParameter("@GuardianOfficeEmail", obj.GuardianOfficeEmail),
                new SqlParameter("@GuardianOfficeWebsite", obj.GuardianOfficeWebsite),
                new SqlParameter("@GuardianIncome", obj.GuardianIncome),
                new SqlParameter("@GuardianIsSingleParent", obj.GuardianIsSingleParent),

                new SqlParameter("@FatherName", obj.FatherName),
                new SqlParameter("@FatherOccupationCode", obj.FatherOccupationCode),
                new SqlParameter("@FatherDesignationCode", obj.FatherDesignationCode),
                new SqlParameter("@FatherResidenceAddress", obj.FatherResidenceAddress),
                new SqlParameter("@FStateCode",obj.FStateCode),
                new SqlParameter("@FCityCode",obj.FCityCode),
                new SqlParameter("@FCityAreaCode",obj.FCityAreaCode),
                new SqlParameter("@FSubArea",obj.FSubArea),
                new SqlParameter("@FPinCode",obj.FPinCode),
                new SqlParameter("@FatherOfficePhone", obj.FatherOfficePhone),
                new SqlParameter("@FatherOfficeAddress", obj.FatherOfficeAddress),
                new SqlParameter("@FatherEmail", obj.FatherEmail),
                new SqlParameter("@FatherDOB", obj.FatherDOB),
                new SqlParameter("@FatherMobile", obj.FatherMobile),
                new SqlParameter("@FatherPhone", obj.FatherPhone),
                new SqlParameter("@FatherAnnualIncome", obj.FatherAnnualIncome),
                new SqlParameter("@FatherCompanyName", obj.FatherCompanyName),
                new SqlParameter("@FatherBusinessDetails", obj.FatherBusinessDetails),
                new SqlParameter("@FatherQualification", obj.FatherQualification),
                new SqlParameter("@FatherServiceIn", obj.FatherServiceIn),

                new SqlParameter("@MotherName", obj.MotherName),
                new SqlParameter("@MotherOccupationCode",obj.MotherOccupationCode),
                new SqlParameter("@MotherDesignationCode",obj.MotherDesignationCode),
                new SqlParameter("@MotherResidenceAddress", obj.MotherResidenceAddress),
                new SqlParameter("@MStateCode",obj.MStateCode),
                new SqlParameter("@MCityCode",obj.MCityCode),
                new SqlParameter("@MCityAreaCode",obj.MCityAreaCode),
                new SqlParameter("@MSubArea",obj.MSubArea),
                new SqlParameter("@MPinCode",obj.MPinCode),


                new SqlParameter("@MotherPhone", obj.MotherPhone),
                new SqlParameter("@MotherOfficeAddress", obj.MotherOfficeAddress),
                new SqlParameter("@MotherEmail", obj.MotherEmail),
                new SqlParameter("@AnniversaryDate", obj.AnniversaryDate),
                new SqlParameter("@MotherDOB", obj.MotherDOB),
                new SqlParameter("@MotherMobile", obj.MotherMobile),
                new SqlParameter("@MotherAnnualIncome", obj.MotherAnnualIncome),
                new SqlParameter("@MotherCompanyName", obj.MotherCompanyName),
                new SqlParameter("@MotherOfficePhone", obj.MotherOfficePhone),
                new SqlParameter("@MotherBusinessDetails", obj.MotherBusinessDetails),
                new SqlParameter("@MotherQualification", obj.MotherQualification),
                new SqlParameter("@MotherServiceIn", obj.MotherServiceIn),

                new SqlParameter("@CommAddress",obj.CommAddress),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")

                };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[USP_AdmissionFormDetails]", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<DataTable> GetAdmissionFormDetails(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[USP_AdmissionFormDetails]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataSet> GetFinalStudents(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@AdmissionNo",obj.AdmissionNo),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@BranchCode",obj.BranchCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@IsActive",obj.ActiveParital),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@IsFinalStudent",obj.IsFinalStudent)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[mast].[USP_AdmissionFormDetails]", CommandType.StoredProcedure, param.ToArray()));
        }


        #endregion

        #region College Admission Form Details
        public async Task<DataTable> GetCollegeStudentDetails(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SearchBox",obj.SearchBox),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_CollegeStudentAdmissionDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        //public async Task<string> InsertUpdateDeleteCollegeAdmissionFormDetails(BALCollegeAddmission obj)
        //{
        //    var param = new List<SqlParameter>

        //       {    new SqlParameter("@Code",obj.Code),
        //            new SqlParameter("@StudentID",obj.StudentID),

        //            new SqlParameter("@EnquiryTypeCode",obj.EnquiryTypeCode),
        //            new SqlParameter("@EnquirySearch",obj.EnquirySearch),
        //            new SqlParameter("@EnquiryTransId",obj.EnquiryTransId),

        //            new SqlParameter("@RegistrationFormNo",obj.RegNo),
        //            new SqlParameter("@AdmissionFormNo",obj.AdmissionFormNo),
        //            new SqlParameter("@DateOfAdmission",Convert.ToDateTime(obj.DateOfAdmission).ToString("yyyy-MM-dd")),
        //            new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
        //            new SqlParameter("@CourseCode",obj.CourseCode),
        //            new SqlParameter("@SemesterCode",obj.SemesterCode),
        //            new SqlParameter("@AdmissionMode",obj.AdmissionMode),
        //            new SqlParameter("@LaternalEntry",obj.LaternalEntry),
        //            new SqlParameter("@AdmissionThrough",obj.AdmissionThrough),
        //            new SqlParameter("@EnquirySourceCode",obj.EnquirySourceCode),
        //            new SqlParameter("@ReferenceOf",obj.ReferenceOf),
        //            new SqlParameter("@BranchPreference1",obj.BranchPreference1),
        //            new SqlParameter("@BranchPreference2",obj.BranchPreference2),
        //            new SqlParameter("@BranchPreference3",obj.BranchPreference3),
        //            new SqlParameter("@BranchPreference4",obj.BranchPreference4),
        //            new SqlParameter("@BranchPreference5",obj.BranchPreference5),
        //            new SqlParameter("@BranchPreference6",obj.BranchPreference6),
        //            new SqlParameter("@Initials",obj.Initials),
        //            new SqlParameter("@Gender",obj.Gender),
        //            new SqlParameter("@IsPhyDisable",obj.IsPhyDisable),
        //            new SqlParameter("@DisabilityDetails",obj.DisabilityDetails),
        //            new SqlParameter("@BloodGroup",obj.BloodGroup),

        //            new SqlParameter("@StudentFirstName",obj.FirstName),
        //            new SqlParameter("@StudentMiddleName",obj.MiddleName),
        //            new SqlParameter("@StudentLastName",obj.LastName),
        //            new SqlParameter("@StudentMobileNo",obj.StudentMobileNo),
        //            new SqlParameter("@StudentEmailid",obj.StudentEmail),
        //            new SqlParameter("@Hostel",obj.Hostel),
        //            new SqlParameter("@Transport",obj.Transport),
        //            new SqlParameter("@EducationLoan",obj.EducationLoan),
        //            new SqlParameter("@EducationLoanLocation",obj.EducationLoanLocation),
        //            new SqlParameter("@StudentPhoto",obj.StudentPhoto),
        //            new SqlParameter("@StudentSign",obj.StudentSign),
        //            new SqlParameter("@Curr_Address1",obj.Curr_Address1),
        //            new SqlParameter("@Curr_Address2",obj.Curr_Address2),
        //            new SqlParameter("@Curr_Address3",obj.Curr_Address3),
        //            new SqlParameter("@Curr_CountryCode",obj.Curr_CountryCode),
        //            new SqlParameter("@Curr_StateCode",obj.Curr_StateCode),
        //            new SqlParameter("@Curr_CityCode",obj.Curr_CityCode),
        //            new SqlParameter("@Curr_PinCode",obj.Curr_PinCode),
        //            new SqlParameter("@IsAddressSame",obj.IsAddressSame),
        //            new SqlParameter("@Per_Address1",obj.Per_Address1),
        //            new SqlParameter("@Per_Address2",obj.Per_Address2),
        //            new SqlParameter("@Per_Address3",obj.Per_Address3),
        //            new SqlParameter("@Per_CountryCode",obj.Per_CountryCode),
        //            new SqlParameter("@Per_StateCode",obj.Per_StateCode),
        //            new SqlParameter("@Per_CityCode",obj.Per_CityCode),
        //            new SqlParameter("@Per_PinCode",obj.Per_PinCode),
        //            new SqlParameter("@Religion",obj.Religion),
        //            new SqlParameter("@DOB",Convert.ToDateTime(obj.DOB).ToString("yyyy-MM-dd")),
        //            new SqlParameter("@StudentAlternativeMobileNo",obj.StudentAlternativeMobileNo),
        //            new SqlParameter("@StudentAlternativeEmailid",obj.StudentAlternativeEmailid),

        //            new SqlParameter("@IsVerified",obj.IsVerified),

        //            new SqlParameter("@FatherName",obj.FatherName),
        //            new SqlParameter("@FatherMobileNo",obj.FatherMobile),
        //            new SqlParameter("@FatherOccupation",obj.FatherOccupation),
        //            new SqlParameter("@FatherPhoto",obj.FatherPhoto),
        //            new SqlParameter("@FatherSign",obj.FatherSign),

        //            new SqlParameter("@MotherMobileNo",obj.MotherMobile),
        //            new SqlParameter("@MotherName",obj.MotherName),
        //            new SqlParameter("@MotherPhoto",obj.MotherPhoto),
        //            new SqlParameter("@MotherSign",obj.MotherSign),

        //            new SqlParameter("@GrandFatherName",obj.GrandFatherName),
                  
        //            new SqlParameter("@LocalGuardianName",obj.GuardianName),
        //            new SqlParameter("@LocalGuardianMobileNo",obj.GuardianMobile),
        //            new SqlParameter("@LocalGuardianPhoto",obj.LocalGuardianPhoto),
        //            new SqlParameter("@LocalGuardianSign",obj.LocalGuardianSign),
                    
        //            new SqlParameter("@RelationshipId",obj.RelationshipId),
        //            new SqlParameter("@SessionId",obj.SessionId),
        //            new SqlParameter("@FYId",obj.FYId),
        //            new SqlParameter("@IsActive",obj.IsActive),
        //            new SqlParameter("@CreatedBy",obj.CreatedBy),
        //            new SqlParameter("@UpdatedBy",obj.UpdatedBy),
        //            new SqlParameter("@Action",obj.Action),
        //            new SqlParameter("@Result",""),


        //        };

        //    return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeStudentAdmissionDetails]", CommandType.StoredProcedure, param.ToArray()));
        //}

        public async Task<DataTable> GetCollegeAdmissionFormDetails(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@StudentID",obj.StudentCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_CollegeStudentAdmissionDetails]", CommandType.StoredProcedure, param.ToArray()));
        }


        public async Task<string> InsertUpdateDeleteCollegeAdmissionFormOtherDetails(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>

               {    new SqlParameter("@Code",obj.Code),
                    new SqlParameter("@AdmissionCode",obj.AdmissionCode),

                    new SqlParameter("@CasteCategory",obj.CasteCategory),
                    new SqlParameter("@SubCasteCategory",obj.SubCasteCategory),
                    new SqlParameter("@CasteCertificateNo",obj.CasteCertificateNo),
                    new SqlParameter("@CasteDateOfIssue",Convert.ToDateTime(obj.CasteDateOfIssue).ToString("yyyy-MM-dd")),

                    new SqlParameter("@DomicileCertificateNo",obj.DomicileCertificateNo),
                    new SqlParameter("@DomicileDateOfIssue",Convert.ToDateTime(obj.DomicileDateOfIssue).ToString("yyyy-MM-dd")),
                    new SqlParameter("@IncomeCertificateNo",obj.IncomeCertificateNo),
                    new SqlParameter("@IncomeDateOfIssue",Convert.ToDateTime(obj.IncomeDateOfIssue).ToString("yyyy-MM-dd")),

                    new SqlParameter("@TransferCertificateNo",obj.TransferCertificateNo),
                    new SqlParameter("@TransferDateOfIssue",Convert.ToDateTime(obj.TransferDateOfIssue).ToString("yyyy-MM-dd")),
                    new SqlParameter("@AADHAARNo",obj.AADHAARNo),
                    new SqlParameter("@AnnualIncome",obj.AnnualIncome),

                    new SqlParameter("@BankName",obj.BankName),
                    new SqlParameter("@BranchName",obj.BranchName),
                    new SqlParameter("@AccountNo",obj.AccountNo),
                    new SqlParameter("@IFSCCode",obj.IFSCCode),
                    new SqlParameter("@InstructionMedium",obj.InstructionMedium),
                    new SqlParameter("@EducationalQualification",obj.EducationalQualification),

                 

                    new SqlParameter("@RelationshipId",obj.RelationshipId),
                    new SqlParameter("@SessionId",obj.SessionId),
                    new SqlParameter("@FYId",obj.FYId),
                    new SqlParameter("@IsActive",obj.IsActive),
                    new SqlParameter("@CreatedBy",obj.CreatedBy),
                    new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                    new SqlParameter("@Action",obj.Action),
                    new SqlParameter("@Result",""),


                };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[USP_CollegeStudentAdmissionOtherDetails]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetCollegeAdmissionFormOtherDetails(BALCollegeAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Code",obj.Code),
                new SqlParameter("@AdmissionCode",obj.AdmissionCode),
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[USP_CollegeStudentAdmissionOtherDetails]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        public async Task<string> InsertUpdateDeleteStudentFeeStructureDetails(BALAddmission obj)
        {          
              var param = new List<SqlParameter>
            {
           
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@StreamCode",obj.StreamCode),
                new SqlParameter("@FeeStructureGroupCode",obj.FeeStructureGroupCode),
                new SqlParameter("@IsFeeStructureNotApplicable",obj.Flag),
                new SqlParameter("@StudentList",obj.StudentList),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@IsDelete", obj.IsDelete),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[mast].[StudentFeeStructure]", CommandType.StoredProcedure, param.ToArray()));
        }
        
        #region Student Admission Report
        public async Task<DataTable> GetDateWiseAdmissionReport(BALAddmission ob)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",ob.Action),
                new SqlParameter("@RelationshipId",ob.RelationshipId),
                new SqlParameter("@SessionId",ob.SessionId),
                new SqlParameter("@FromDate", ob.FromDate),
                new SqlParameter("@ToDate", ob.ToDate),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_StudentDateWiseAdmissionReport]", CommandType.StoredProcedure, param.ToArray()));
          
        }

        public async Task<DataTable> GetClassWiseAdmissionReport(BALAddmission ob)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",ob.Action),
                new SqlParameter("@RelationshipId",ob.RelationshipId),
                new SqlParameter("@SessionId",ob.SessionId),
                new SqlParameter("@FromDate", ob.FromDate),
                new SqlParameter("@ToDate", ob.ToDate),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_StudentClassWiseAdmissionReport]", CommandType.StoredProcedure, param.ToArray()));
        }

        public async Task<DataTable> GetSessionWiseAdmissionReport(BALAddmission ob)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",ob.Action),
                new SqlParameter("@RelationshipId",ob.RelationshipId),
                new SqlParameter("@SessionId",ob.SessionId),
                new SqlParameter("@ClassCode", ob.ClassCode),
                //new SqlParameter("@ToDate", ob.ToDate),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[rpt].[USP_SessionWiseAdmissionReport]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion

        #region Transfer Certificate 
        public async Task<string> InsertUpdateDeleteTransferCertificateDetails(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
            {

                new SqlParameter("@TransID", obj.TransID),
                new SqlParameter("@RegNo", obj.RegNo),
                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@AdmissionNo", obj.AdmissionNo),

                new SqlParameter("@AnyDues", obj.AnyDues),
                new SqlParameter("@AnyOtherActivity", obj.AnyOtherActivity),

                new SqlParameter("@LastPresentDate", obj.LastPresentDate),
                new SqlParameter("@NoOfDays", obj.NoOfDays),
                new SqlParameter("@NoOfDaysPresent", obj.NoOfDaysPresent),
                new SqlParameter("@CertificateIssusDate", obj.CertificateIssusDate),
                new SqlParameter("@ReasonOfLeaving", obj.ReasonOfLeaving),
                new SqlParameter("@GeneralConduct", obj.GeneralConduct),
                new SqlParameter("@Remark", obj.Remark),
                new SqlParameter("@StudentResult", obj.StudentResult),
                new SqlParameter("@AdmissionClassCode", obj.AdmissionClassCode),
                new SqlParameter("@PreviousClass_YN",obj.PreviousClass_YN),
                new SqlParameter("@LastStudyClass",obj.LastStudyClass),
                new SqlParameter("@SubjectName",obj.SubjectName),

                new SqlParameter("@AcademicSessionId",obj.AcademicSessionID),
                new SqlParameter("@PreviousSchoolDetail",obj.PreviousSchoolDetail),

                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
                };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_TransferCertificate]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentDetailsForTransfer(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@Code", obj.Code),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@AcademicSessionId",obj.AcademicSessionId),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_TransferCertificate]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Report Card Printing
        public async Task<DataTable> GetStudentDetailsForReportCard(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@SearchBox",obj.SearchBox),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[mast].[Usp_ReportCard]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Student Admission No By Class Section 
        public async Task<DataTable> GetStudentAdmissionNoByClassSection(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                //new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@ClassCode",obj.ClassCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId)
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("mast.USP_GetStudentAdmissionNoByClassSection", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<string> UpdateStudentAdmissionNo(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@StudentAdmissionNoLists",obj.StudentAdmissionNoLists),
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
            };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("mast.USP_UpdateStudentAdmissionNo", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Student Master Details Updation

        public async Task<string> UpdateStudentDetails(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@StudentList",obj.StudentList),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
                };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_StudentDetailsUpdation]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetStudentDetailsForUpdation(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),               
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_StudentDetailsUpdation]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion

        #region Student Photograph Updation
        public async Task<string> UploadStudentPhotograph(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@StudentList",obj.StudentList),

                new SqlParameter("@StudentCode",obj.StudentCode),
                new SqlParameter("@previewimage",obj.previewimage),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
                };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_StudentDetailsUpdation]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
        #region Student ID Card Printing
        public async Task<DataTable> GetStudentDetailsForIDCard(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_StudentIDCard]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Class Wise Student Report
        public async Task<DataSet> GetClassWiseStudentReport(BALAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@ClassCodeLists", obj.ClassCode),
                new SqlParameter("@SectionCodeLists", obj.SectionCode),
                new SqlParameter("@Result", "")
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommandds("[rpt].[USP_GetClassWiseStudentReport]", CommandType.StoredProcedure, param.ToArray()));
        }
        #endregion
        #region Update Optional Subject
        public async Task<string> UpdateOptionalSubject(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
            {
                new SqlParameter("@Action", obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),
                new SqlParameter("@SubjectCode",obj.SubjectCode),
                new SqlParameter("@StudentList",obj.StudentList),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
                new SqlParameter("@FYId",obj.FYId),
                new SqlParameter("@CreatedBy",obj.CreatedBy),
                new SqlParameter("@UpdatedBy",obj.UpdatedBy),
                new SqlParameter("@Result", "")
                };

            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteNonQueryReturnString("[trans].[Usp_StudentDetailsUpdation]", CommandType.StoredProcedure, param.ToArray()));
        }
        public async Task<DataTable> GetOptionalSubject(BALSchoolAddmission obj)
        {
            var param = new List<SqlParameter>
             {
                new SqlParameter("@Action",obj.Action),
                new SqlParameter("@ClassCode",obj.ClassCode),
                new SqlParameter("@SectionCode",obj.SectionCode),

                new SqlParameter("@RelationshipId",obj.RelationshipId),
                new SqlParameter("@SessionId",obj.SessionId),
             };
            return await Task.Factory.StartNew(() => SqlDBHelper.sqlDBHelper.ExecuteParamerizedSelectCommand("[trans].[Usp_StudentDetailsUpdation]", CommandType.StoredProcedure, param.ToArray()));
        }

        #endregion
    }
}
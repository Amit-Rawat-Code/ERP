using BAL;
using DAL;
using Repository;
using System;
using System.Data;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class ExamMasterApiController : ApiController
    {
        readonly IDALExam_Master _DALExam_Master;

        public ExamMasterApiController(IDALExam_Master DALExam_Master)
        {
            this._DALExam_Master = DALExam_Master;
        }
            
        #region Exam Group Master

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteExamGroupMaster(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteExamGroupMaster(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetExamGroupMaster(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetExamGroupMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Exam Group To Exam Master

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteExamGroupToExamMaster(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteExamGroupToExamMaster(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetExamGroupToExamMaster(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetExamGroupToExamMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Exam Structure Head

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteExamStructureHead(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteExamStructureHead(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetExamStructureHead(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetExamStructureHead(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Report Card Component Master

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteReportCardComponentMaster(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteReportCardComponentMaster(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetReportCardComponentMaster(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetReportCardComponentMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Skill Type Master

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteSkillTypeMaster(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteSkillTypeMaster(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetSkillTypeMaster(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetSkillTypeMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Skill Group Master

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteSkillGroupMaster(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteSkillGroupMaster(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetSkillGroupMaster(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetSkillGroupMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Skill Name Master

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteSkillNameMaster(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteSkillNameMaster(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetSkillNameMaster(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetSkillNameMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Skill Grade Master

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteSkillGradeMaster(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteSkillGradeMaster(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetSkillGradeMaster(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetSkillGradeMaster(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region  Scholastic Group Skill Mapping

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteSGroupSkillMapping(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteSGroupSkillMapping(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetSGroupSkillMapping(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetSGroupSkillMapping(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion
        
        #region  CoScholastic Group Skill Mapping

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteCoSGroupSkillMapping(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteCoSGroupSkillMapping(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetCoSGroupSkillMapping(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetCoSGroupSkillMapping(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion
        
        #region  Teacher Assign Marks Entry For Skills

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteTeacherAssignMarksEntrySKills(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteTeacherAssignMarksEntrySKills(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetTeacherAssignMarksEntrySKills(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetTeacherAssignMarksEntrySKills(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion
       
        #region  Teacher Assign Marks Entry For CoSkills

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteTeacherAssignMarksEntryCoSKills(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteTeacherAssignMarksEntryCoSKills(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetTeacherAssignMarksEntryCoSKills(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetTeacherAssignMarksEntryCoSKills(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region  Report Card Printing
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetReportCard(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetReportCard(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Define Remarks

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteDefineRemark(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteDefineRemark(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetDefineRemark(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetDefineRemark(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Define Keyword

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteDefineKeyword(BALExam obj)
        {
            string result = await _DALExam_Master.InsertUpdateDeleteDefineKeyword(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetDefineKeyword(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetDefineKeyword(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Upload Principal Signature

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteUploadPrincipalSignature(BALExam obj)
        {

            byte[] bytes = null;
            string filePath = "";
           
            string result = "";
            try
            {
                if (!string.IsNullOrEmpty(obj.ImagefileUrl))
                {
                    if (obj.ImagefileUrl.Contains("data:image/"))
                    {
                        StringBuilder uplo = new StringBuilder();
                        obj.AlbumIcon = obj.ImagefileUrl;
                        //string convert = obj.AlbumIcon.Replace(@"^data:image\/[a-zA-Z]+;base64,, String.Empty);
                        bytes = Convert.FromBase64String(Regex.Replace(obj.AlbumIcon, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                        string extention = ".jpg";
                        var imageStream = new MemoryStream(bytes, false);


                        string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);
                        string NewFileName = "";
                        NewFileName += strUnique;
                        NewFileName += DateTime.Now.Year.ToString();
                        NewFileName += DateTime.Now.Month.ToString();
                        NewFileName += DateTime.Now.Day.ToString();
                        NewFileName += DateTime.Now.Hour.ToString();
                        NewFileName += DateTime.Now.Minute.ToString();
                        NewFileName += DateTime.Now.Second.ToString();
                        NewFileName += DateTime.Now.Millisecond.ToString();
                        string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/PrincipalSignature/Image/";
                        string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/PrincipalSignature/Image/" + NewFileName + extention;
                        filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath);
                        bool exists = System.IO.Directory.Exists(filePath);
                        if (!exists)
                        {
                            System.IO.Directory.CreateDirectory(filePath);
                        }
                        FileStream file = new FileStream(filePath + NewFileName + extention, FileMode.Create, FileAccess.Write);
                        imageStream.WriteTo(file);
                        file.Close();
                        imageStream.Close();
                        //uplo.Append(seprator);
                        uplo.Append(uploadpaths);
                        //seprator = ",";
                        obj.SignatureImagePath = uplo.ToString().Trim();

                        result = await _DALExam_Master.InsertUpdateDeleteUploadPrincipalSignature(obj).ConfigureAwait(false);
                        return result;
                    }
                    else
                    {
                        obj.ImagefileUrl = obj.ImagefileUrl.Replace("..", "");
                    }

                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            result = await _DALExam_Master.InsertUpdateDeleteUploadPrincipalSignature(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetPrincipalSignature(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetPrincipalSignature(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Upload Class Teacher Signature

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetEmployeeCodeUsingClassScetion(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetEmployeeCodeUsingClassScetion(obj).ConfigureAwait(false);
            return dt;
        }

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteUploadClassTeacherSignature(BALExam obj)
        {

            byte[] bytes = null;
            string filePath = "";

            string result = "";
            try
            {
                if (!string.IsNullOrEmpty(obj.ImagefileUrl))
                {
                    if (obj.ImagefileUrl.Contains("data:image/"))
                    {
                        StringBuilder uplo = new StringBuilder();
                        obj.AlbumIcon = obj.ImagefileUrl;
                        //string convert = obj.AlbumIcon.Replace(@"^data:image\/[a-zA-Z]+;base64,, String.Empty);
                        bytes = Convert.FromBase64String(Regex.Replace(obj.AlbumIcon, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
                        string extention = ".jpg";
                        var imageStream = new MemoryStream(bytes, false);


                        string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);
                        string NewFileName = "";
                        NewFileName += strUnique;
                        NewFileName += DateTime.Now.Year.ToString();
                        NewFileName += DateTime.Now.Month.ToString();
                        NewFileName += DateTime.Now.Day.ToString();
                        NewFileName += DateTime.Now.Hour.ToString();
                        NewFileName += DateTime.Now.Minute.ToString();
                        NewFileName += DateTime.Now.Second.ToString();
                        NewFileName += DateTime.Now.Millisecond.ToString();
                        string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/PrincipalSignature/Image/";
                        string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/PrincipalSignature/Image/" + NewFileName + extention;
                        filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath);
                        bool exists = System.IO.Directory.Exists(filePath);
                        if (!exists)
                        {
                            System.IO.Directory.CreateDirectory(filePath);
                        }
                        FileStream file = new FileStream(filePath + NewFileName + extention, FileMode.Create, FileAccess.Write);
                        imageStream.WriteTo(file);
                        file.Close();
                        imageStream.Close();
                        //uplo.Append(seprator);
                        uplo.Append(uploadpaths);
                        //seprator = ",";
                        obj.SignatureImagePath = uplo.ToString().Trim();

                        result = await _DALExam_Master.InsertUpdateDeleteUploadClassTeacherSignature(obj).ConfigureAwait(false);
                        return result;
                    }
                    else
                    {
                        obj.ImagefileUrl = obj.ImagefileUrl.Replace("..", "");
                    }

                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            result = await _DALExam_Master.InsertUpdateDeleteUploadClassTeacherSignature(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetClassTeacherSignature(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetClassTeacherSignature(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion

        #region Define Exam Subject Wise

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetSubjectCodeUsingClassSection(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetSubjectCodeUsingClassSection(obj).ConfigureAwait(false);
            return dt;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetExamByExamGroup(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetExamByExamGroup(obj).ConfigureAwait(false);
            return dt;
        }

        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteDefineExamSubjectWise(BALExam obj)
        {

            //byte[] bytes = null;
            //string filePath = "";

            //string result = "";
            //try
            //{
            //    if (!string.IsNullOrEmpty(obj.ImagefileUrl))
            //    {
            //        if (obj.ImagefileUrl.Contains("data:image/"))
            //        {
            //            StringBuilder uplo = new StringBuilder();
            //            obj.AlbumIcon = obj.ImagefileUrl;
            //            //string convert = obj.AlbumIcon.Replace(@"^data:image\/[a-zA-Z]+;base64,, String.Empty);
            //            bytes = Convert.FromBase64String(Regex.Replace(obj.AlbumIcon, @"^data:image\/[a-zA-Z]+;base64,", string.Empty));
            //            string extention = ".jpg";
            //            var imageStream = new MemoryStream(bytes, false);


            //            string strUnique = Guid.NewGuid().ToString("N").Substring(0, 4);
            //            string NewFileName = "";
            //            NewFileName += strUnique;
            //            NewFileName += DateTime.Now.Year.ToString();
            //            NewFileName += DateTime.Now.Month.ToString();
            //            NewFileName += DateTime.Now.Day.ToString();
            //            NewFileName += DateTime.Now.Hour.ToString();
            //            NewFileName += DateTime.Now.Minute.ToString();
            //            NewFileName += DateTime.Now.Second.ToString();
            //            NewFileName += DateTime.Now.Millisecond.ToString();
            //            string uploadpath = "~/Uploads/Site/" + obj.DisplayCode + "/PrincipalSignature/Image/";
            //            string uploadpaths = "/Uploads/Site/" + obj.DisplayCode + "/PrincipalSignature/Image/" + NewFileName + extention;
            //            filePath = System.Web.HttpContext.Current.Server.MapPath(uploadpath);
            //            bool exists = System.IO.Directory.Exists(filePath);
            //            if (!exists)
            //            {
            //                System.IO.Directory.CreateDirectory(filePath);
            //            }
            //            FileStream file = new FileStream(filePath + NewFileName + extention, FileMode.Create, FileAccess.Write);
            //            imageStream.WriteTo(file);
            //            file.Close();
            //            imageStream.Close();
            //            //uplo.Append(seprator);
            //            uplo.Append(uploadpaths);
            //            //seprator = ",";
            //            obj.SignatureImagePath = uplo.ToString().Trim();

            //            result = await _DALExam_Master.InsertUpdateDeleteUploadClassTeacherSignature(obj).ConfigureAwait(false);
            //            return result;
            //        }
            //        else
            //        {
            //            obj.ImagefileUrl = obj.ImagefileUrl.Replace("..", "");
            //        }

            //    }
            //}
            //catch (Exception ex)
            //{
            //    return ex.Message;
            //}
            string result = await _DALExam_Master.InsertUpdateDeleteDefineExamSubjectWise(obj).ConfigureAwait(false);
            return result;
        }

        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetDefineExamSubjectWise(BALExam obj)
        {
            DataTable dt = await _DALExam_Master.GetDefineExamSubjectWise(obj).ConfigureAwait(false);
            return dt;
        }
        #endregion
    }
}

using BAL;
using DAL;
using System.Data;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AssessmentApiController : ApiController
    {
        // GET: AssessmentApi
        #region Concept Master
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteConceptMaster(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteConceptMaster(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetConceptMaster(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetConceptMaster(obj);
            return dt;
        }
        #endregion

        #region Syllabus Book Master
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteSyllabusBookMaster(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteSyllabusBookMaster(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetSyllabusBookMaster(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetSyllabusBookMaster(obj);
            return dt;
        }
        #endregion

        #region Book Chapter Master
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteBookChapterMaster(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteBookChapterMaster(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetBookChapterMaster(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetBookChapterMaster(obj);
            return dt;
        }
        #endregion

        #region Class Wise Subject Wise Book
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteClassWiseSubjectWiseBook(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteClassWiseSubjectWiseBook(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetClassWiseSubjectWiseBook(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetClassWiseSubjectWiseBook(obj);
            return dt;
        }
        #endregion

        #region Concept Chapter Mapping
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteConceptChapterMapping(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteConceptChapterMapping(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetConceptChapterMapping(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetConceptChapterMapping(obj);
            return dt;
        }
        #endregion

        #region Chapter Topic mapping
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteChapterTpoicMapping(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteChapterTpoicMapping(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetChapterTopicMapping(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetChapterTopicMapping(obj);
            return dt;
        }
        #endregion

        #region Topic Sub-Topic Mapping
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteTpoicSubTopicMapping(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteTpoicSubTopicMapping(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetTopicSubTopicMapping(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetTopicSubTopicMapping(obj);
            return dt;
        }
        #endregion

        #region Exam Master
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteExamMaster(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteExamMaster(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetExamMaster(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetExamMaster(obj);
            return dt;
        }
        #endregion

        #region Marking Scheme Master
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteMarkingSchemeMaster(BALAssessment obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteMarkingSchemeMaster(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetMarkingSchemeMaster(BALAssessment obj)
        {
            DataTable dt = await DLL.dal.GetMarkingSchemeMaster(obj);
            return dt;
        }
        #endregion

        #region Exam Subject Teacher Mapping    
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteExamSubjectTeacherMappingMaster(BALClassSubjectWithTeacher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteExamSubjectTeacherMappingMaster(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetExamSubjectTeacherMapping(BALClassSubjectWithTeacher obj)
        {
            DataTable dt = await DLL.dal.GetExamSubjectTeacherMapping(obj);
            return dt;
        }
        #endregion

        #region Create Question   
        [System.Web.Http.HttpPost]
        public async Task<string> InsertUpdateDeleteCreateQuestion(BALClassSubjectWithTeacher obj)
        {
            string result = await DLL.dal.InsertUpdateDeleteCreateQuestion(obj);
            return result;
        }
        [System.Web.Http.HttpPost]
        public async Task<DataTable> GetCreateQuestions(BALClassSubjectWithTeacher obj)
        {
            DataTable dt = await DLL.dal.GetCreateQuestions(obj);
            return dt;
        }
        #endregion
      
    }
}
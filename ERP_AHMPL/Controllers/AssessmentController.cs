using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SEF.Controllers
{
    public class AssessmentController : Controller
    {
        // GET: Assessment
        #region Concept Master
        public ActionResult ConceptMaster()
        {
            return View();
        }
        #endregion
       
        #region Syllabus Book Master
        public ActionResult BookMaster()
        {
            return View();
        }
        #endregion
        
        #region Book Chapter Master
        public ActionResult BookChapterMaster()
        {
            return View();
        }
        #endregion
                
        #region Class Wise Subject Wise Book
        public ActionResult ClassWiseSubjectWiseBook()
        {
            return View();
        }
        #endregion
        
        #region Concept Chapter Mapping
        public ActionResult ConceptChapterMapping()
        {
            return View();
        }
        #endregion

        #region Chapter Topic Mapping
        public ActionResult ChapterCoverageMaster()
        {
            return View();
        }
        #endregion

        #region Topic Sub-Topic Mapping
        public ActionResult TopicSubTopicMapping()
        {
            return View();
        }
        #endregion

        #region Examination Master
        public ActionResult ExamMaster()
        {
            return View();
        }
        #endregion

        #region Marking Scheme Master
        public ActionResult MarkingSchemeMaster()
        {
            return View();
        }
        #endregion

        #region Exam Subject Teacher Mapping 
        public ActionResult ExamSubjectTeacherMapping()
        {
            return View();
        }
        #endregion
        
        #region Create Questions 
        public ActionResult CreateQuestions()
        {
            return View();
        }
        #endregion
    }
}
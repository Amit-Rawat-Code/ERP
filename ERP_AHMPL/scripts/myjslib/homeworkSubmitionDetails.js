app.homeworkSubmitionDetailsController = function ($scope, $element,$filter, myService)
{ 
    $('#ddlSection').change(function () {
        $('#ddlHomeworkTopic').html('');
        $scope.HomeworkTopic()
  
    });
    $('#ddlClass').change(function () { 
        $scope.BindEmpSection()
  
    }); 
    $('#ddlHomeworkTopic').change(function () { 
        $scope.Homeworkfor();
    });

    $scope.Homeworkfor = function () {
        debugger;
        var collectionobj = {};
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.TopicName = $('#ddlHomeworkTopic').val(); 
        collectionobj.SectionId = $scope.BindSection; 
        collectionobj.EmployeeCode = $scope.Code;
        collectionobj.ClassId = $scope.BindClass;
        collectionobj.Action = 28;
        var getData = myService.methode('POST', "../Homework/GetHomeworkfor", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) { 
            $.each(response.data, function (i, val)
            {
                $scope.tblhideHomeworkDetails = false;
                    $scope.AllHomeWork = response.data;
             }); 
           
        });
    }
 $scope.HomeworkTopic = function ()
 {
     debugger;
     var collectionobj = {};
   
        collectionobj.schoolCode = schoolCode;
        collectionobj.branchCode = branchCode;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId; 
        collectionobj.SectionId = $('#ddlSection').val();;
        collectionobj.EmployeeCode = $scope.Code;
        collectionobj.ClassId = $('#ddlClass').val();
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        var getData = myService.methode('POST', "../Homework/HomeworkTopic", '{obj:' + JSON.stringify(collectionobj) + '}');
        getData.then(function (response) {
            $('#ddlHomeworkTopic').append('<option value="0" >Select Homeworks</option>')
            $.each(response.data, function (i, val) {
                $('#ddlHomeworkTopic').append('<option >' + val.TopicName + '</option>')
            });

        });
 }


 $scope.SubmittedHomework = function ()
 {  
     $scope.showLoader();
     var collectionobj = {};
     collectionobj.schoolCode = schoolCode;
     collectionobj.schoolCode = schoolCode;
     collectionobj.branchCode = branchCode;
     collectionobj.sessionId = sessionId;
     collectionobj.fyId = fyId;
     collectionobj.StudentCode = sessionStorage.getItem('StudentCode');;
     collectionobj.TransId = sessionStorage.getItem('TransId');
     var IsSubmitted=sessionStorage.getItem('IsSubmitted')
     if (IsSubmitted == 'Not Submitted Yet')
     {
         IsSubmitted=1
     }
     else { IsSubmitted = 0 } 
     collectionobj.IsSubmitted = IsSubmitted;
     collectionobj.VoucherNo = sessionStorage.getItem('VoucherNo');
     collectionobj.TopicName = $('#ddlHomeworkTopic').val(); 
     collectionobj.EmployeeCode = $scope.Code;
     collectionobj.Remark = $scope.Remark;
     var getData = myService.methode('POST', "../Homework/SubmittedHomework", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) {
         if(JSON.stringify(response.data==2))
         {
             showMsgBox('999', 'Success', 'Changes has been done', 'success', 'btn-success')
             $scope.isShow = false;
             $scope.Homeworkfor();
         }
     }); 
 }

 $scope.Redirect = function (TransId, VoucherNo, IsSubmitted, StudentCode, Remark, StdName, HDate) {
     $scope.imagesrc = "";
     $scope.pdfsrc = "";
     $scope.videosrc = "";
     $scope.audiosrc = "";
     $scope.Remark = Remark;
     $scope.StdName = StdName;
     $scope.HDate = HDate;
     sessionStorage.setItem('StudentCode', StudentCode);
     sessionStorage.setItem('IsSubmitted', IsSubmitted);
     sessionStorage.setItem('VoucherNo', VoucherNo);
     sessionStorage.setItem('TransId', TransId);
     $scope.isShow = IsSubmitted == 'Submitted' ? false : true;
     $scope.BindSelectedHomeWork(TransId, VoucherNo, IsSubmitted, StudentCode);

 }


 $scope.BindEmpClass = function () {
     $scope.tblhideHomeworkDetails = true;
     var collectionobj = {};
     collectionobj.SessionId = sessionId;
     collectionobj.FYId = fyId;
     collectionobj.SchoolCode = schoolCode;
     collectionobj.BranchCode = branchCode;
     collectionobj.EmployeeCode = $scope.Code;
     var getData = myService.methode('POST', "../Homework/GetEmployeeClass", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) { 
         $scope.classRec = response.data;
     });
 } 
 $scope.BindEmpSection = function ()
 {
     debugger;
     var collectionobj = {};
     collectionobj.SessionId = sessionId;
     collectionobj.FYId = fyId;
     collectionobj.SchoolCode = schoolCode;
     collectionobj.BranchCode = branchCode;
     collectionobj.ClassId = $('#ddlClass').val();
     collectionobj.EmployeeCode = $scope.Code;
     var getData = myService.methode('POST', "../Homework/GetEmployeeSection", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) {
         $scope.SecRec = response.data;
     });
 }

 $scope.BindDetails = function ()
 {
     debugger;
     var getData = myService.methode('POST', '../DashBoard/GetUserDetails', '{userid:' + JSON.stringify(userid) + ',schoolcode:' + JSON.stringify(schoolCode) + ',branchcode:' + JSON.stringify(branchCode) + '}');
     getData.then(function (response) {
         debugger;  
         $scope.Code = response.data[0].Code; 
         sessionStorage.setItem("code", $scope.Code);
         $scope.BindEmpClass();
     });
 }

 $scope.imagesrc = "";
 $scope.pdfsrc = "";
 $scope.videosrc = "";
 $scope.audiosrc = "";

 $scope.AttachmentList = "";

 $scope.ShowContent = function (src) {
     var checkExtention = src.split('.')[1];
     if (checkExtention == 'mp4') {
         $scope.imagesrc = "";
         $scope.pdfsrc = "";
         $scope.videosrc = src;
         $scope.audiosrc = "";
     }
     else if (checkExtention == 'mp3') {
         $scope.imagesrc = "";
         $scope.pdfsrc = "";
         $scope.videosrc = "";
         $scope.audiosrc = src;
     }
     else if (checkExtention == 'pdf') {
         $scope.imagesrc = "";
         $scope.pdfsrc = src;
         $scope.videosrc = "";
         $scope.audiosrc = "";
     }
     else {
         $scope.imagesrc = src;
         $scope.pdfsrc = "";
         $scope.videosrc = "";
         $scope.audiosrc = "";
     }
 }

 $scope.BindSelectedHomeWork = function (TransId, VoucherNo, IsSubmitted, StudentCode) {
     $scope.showLoader();
     var collectionobj = {};
     collectionobj.schoolCode = schoolCode;
     collectionobj.branchCode = branchCode;
     collectionobj.SessionId = sessionId;
     collectionobj.StudentCode = StudentCode
     collectionobj.fyId = fyId;
     collectionobj.TransId = TransId
     collectionobj.Action = 30

     var getData = myService.methode('POST', "../GuardianDashBoard/GetSelectedHomeWork", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) {
         // Get the modal
         var modal = document.getElementById("myModal");
         modal.style.display = "block";

         // Get the <span> element that closes the modal
         var span = document.getElementsByClassName("close2")[0];

         // When the user clicks on <span> (x), close the modal
         span.onclick = function () {
             modal.style.display = "none";
         }

         // When the user clicks anywhere outside of the modal, close it
         window.onclick = function (event) {
             if (event.target == modal) {
                 modal.style.display = "block";
             }
         }
         $scope.AttachmentList = response.data;
       
         $scope.hideLoader();
         setTimeout(function () {
             var lg = $('#ImageGalleryBox');
             if (lg.data('lightGallery'))
                 lg.data('lightGallery').destroy(true);
             //masonryPortfolio();
             lg.lightGallery();
         }, 500);
         
     });
 };

 $scope.CheckFileType = function (src,filetype) {
     for (var i = 0; i < $scope.AttachmentList.length; i++) {
         var checkExtention = src.split('.')[1];
         if (checkExtention == 'mp4')
             $scope.AttachmentList[i][filetype] = 'fa-file-video-o';
         else if (checkExtention == 'mp3')
             $scope.AttachmentList[i][filetype] = 'fa-headphones';
         else if (checkExtention == 'pdf')
             $scope.AttachmentList[i][filetype] = 'fa-file-pdf-o';
         else {
             $scope.AttachmentList[i][filetype] = 'fa-picture-o';
         }
     }
 }

 $scope.ReSubmitRecord = function () {
     $scope.showLoader();
     var collectionobj = {};
     collectionobj.schoolCode = schoolCode;
     collectionobj.schoolCode = schoolCode;
     collectionobj.branchCode = branchCode;
     collectionobj.sessionId = sessionId;
     collectionobj.fyId = fyId;
     collectionobj.StudentCode = sessionStorage.getItem('StudentCode');;
     collectionobj.TransId = sessionStorage.getItem('TransId');
     var IsSubmitted = sessionStorage.getItem('IsSubmitted')
     
     collectionobj.IsSubmitted = 3;
     collectionobj.VoucherNo = sessionStorage.getItem('VoucherNo');
     collectionobj.TopicName = $('#ddlHomeworkTopic').val();
     collectionobj.EmployeeCode = $scope.Code;
     collectionobj.Remark = $scope.Remark;
     var getData = myService.methode('POST', "../Homework/SubmittedHomework", '{obj:' + JSON.stringify(collectionobj) + '}');
     getData.then(function (response) {
         if (JSON.stringify(response.data == 2)) {
             showMsgBox('999', 'Success', 'Homework ReSubmission Permission granted.', 'success', 'btn-success')
            
         }
     });
 }
 $scope.SaveRecord = function () {
     $scope.SubmittedHomework();
 }
 $scope.RecreateGallery = function (url) {
    
     var lg = $('#ImageGalleryBox');
    
     //masonryPortfolio();
     lg.lightGallery();
 }
 
}

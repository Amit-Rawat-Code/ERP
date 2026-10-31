app.HomeworkSubmitionDetailsController = function ($scope, $element, $filter, myService)
{ 
    $('#ddlSection').change(function () {
       // $('#ddlHomeworkTopic').html('');
        $scope.HomeworkTopic()
  
    });
    //$('#ddlClass').change(function () { 
    //    $scope.BindEmpSection()
  
    //}); 
    $('#ddlHomeworkTopic').change(function () { 
        $scope.Homeworkfor();
    });

    $scope.BindEmpClass = function () {
     
        var collectionobj = {};
        collectionobj.Action = "19";
        collectionobj.FYId = fyId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.SessionId = sessionId;
        collectionobj.EmployeeCode = userid;
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetEmployeeClass", collectionobj);
        getData.then(function (response) {
           
            $scope.classRec = response.data;
        });
    } 
    $scope.BindEmpSection = function () {
      
        var collectionobj = {};
        collectionobj.Action = "20";
        collectionobj.SessionId = sessionId;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.ClassCode = $scope.BindClass;
        collectionobj.EmployeeCode = userid;
        var getData = myService.methode('POST', "../Api/HomeworkApi/GetEmployeeSection", collectionobj);
        getData.then(function (response) {
         
            $scope.SecRec = response.data;
        });
    }

    $scope.HomeworkTopic = function () {
        
        var collectionobj = {};
        collectionobj.Action = "10";
        collectionobj.RelationshipId = relationshipId;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.ToDate = moment($scope.ToDate).format('YYYY-MMM-DD');
        collectionobj.FromDate = moment($scope.FromDate).format('YYYY-MMM-DD');
        collectionobj.SectionCode = $('#ddlSection').val();
        collectionobj.ClassCode = $scope.BindClass;
        collectionobj.EmployeeCode = userid;

        var getData = myService.methode('POST', '../Api/HomeworkApi/GetHomeWorkTopic', collectionobj);
        getData.then(function (response) {
           
            $scope.HWTopic = response.data;

        });
    }

    $scope.Homeworkfor = function () {
      
        var collectionobj = {};
        collectionobj.Action = 28;
        collectionobj.RelationshipId = relationshipId;
        collectionobj.sessionId = sessionId;
        collectionobj.fyId = fyId;
        collectionobj.TopicName = $('#ddlHomeworkTopic').val(); 
        collectionobj.SectionCode = $scope.BindSection;
        collectionobj.EmployeeCode = userid;
        collectionobj.ClassCode = $scope.BindClass;

           var getData = myService.methode('POST', "../Api/HomeworkApi/GetHomeworkfor", collectionobj);
        getData.then(function (response) {
          
            $.each(response.data, function (i, val)
            {
           
                $scope.tblhideHomeworkDetails = false;
                    $scope.AllHomeWork = response.data;
             }); 

        });
    }
    $scope.Redirect = function (TransId, VoucherNo, VerificationStatus, IsSubmitted,StudentCode, Remark, StdName, HDate) {
    
     $scope.imagesrc = "";
     $scope.pdfsrc = "";
     $scope.videosrc = "";
     $scope.audiosrc = "";
     $scope.Remark = Remark;
     $scope.StdName = StdName;
     $scope.HDate = HDate;
     sessionStorage.setItem('StudentCode', StudentCode);
     sessionStorage.setItem('VerificationStatus', VerificationStatus);
     //sessionStorage.setItem('SubmissionStatus', SubmissionStatus);
     sessionStorage.setItem('VoucherNo', VoucherNo);
     sessionStorage.setItem('TransId', TransId);
     $scope.isShow = IsSubmitted == 'Submitted' ? false : true;
     $scope.BindSelectedHomeWork(TransId, VoucherNo, IsSubmitted, StudentCode);

    }

       $scope.BindSelectedHomeWork = function (TransId, VoucherNo, IsSubmitted, StudentCode) {

     $scope.showLoader();
     var collectionobj = {};
     collectionobj.RelationshipId = relationshipId;
     collectionobj.sessionId = sessionId;
     collectionobj.FYId = fyId;
     collectionobj.StudentCode = StudentCode
     collectionobj.TransID = TransId
     collectionobj.Action = 30

     var getData = myService.methode('POST', "../Api/HomeworkApi/GetAllHomeWorkExecptTransId", collectionobj);
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
    $scope.ReSubmitRecord = function () {
        debugger
        $scope.showLoader();
        var collectionobj = {};
        collectionobj.RelationshipId = relationshipId;
        collectionobj.sessionId = sessionId;
        collectionobj.FYId = fyId;
        collectionobj.StudentCode = sessionStorage.getItem('StudentCode');;
        collectionobj.TransID = sessionStorage.getItem('TransId');
        var IsSubmitted = sessionStorage.getItem('IsSubmitted')
        var IsSubmitted = sessionStorage.getItem('IsSubmitted')

        collectionobj.IsSubmitted = 3;
        collectionobj.VoucherNo = sessionStorage.getItem('VoucherNo');
        collectionobj.TopicName = $('#ddlHomeworkTopic').val();
        collectionobj.EmployeeCode = userid;
        collectionobj.Remark = $scope.Remark;
        var getData = myService.methode('POST', "../Api/HomeworkApi/SubmittedHomework", collectionobj);
        getData.then(function (response) {
            if (JSON.stringify(response.data == 2)) {
                showMsgBox('999', 'Success', 'Homework ReSubmission Permission granted.', 'success', 'btn-success')
                $applyAsync();
            }
        });
        $scope.Remark = '';
    }
    $scope.SaveRecord = function () {
        $scope.SubmittedHomework();
    }
    $scope.RecreateGallery = function (url) {

        var lg = $('#ImageGalleryBox');

        //masonryPortfolio();
        lg.lightGallery();
    }

    $scope.SubmittedHomework = function () {
        debugger
        $scope.showLoader();
        if (isValidate()) {
            var collectionobj = {};
            collectionobj.RelationshipId = relationshipId;
            collectionobj.sessionId = sessionId;
            collectionobj.FYId = fyId;
            collectionobj.StudentCode = sessionStorage.getItem('StudentCode');;
            collectionobj.TransID = sessionStorage.getItem('TransId');
            var VerificationStatus = sessionStorage.getItem('VerificationStatus')
            if (VerificationStatus === 'Verification Pending') {

                IsSubmitted = 1;
                IsCheckedByTeacher = 1;
            }
            else {
                IsSubmitted = 0;
                IsCheckedByTeacher = 0;

            }
            collectionobj.IsSubmitted = IsSubmitted;
            collectionobj.IsCheckedByTeacher = IsCheckedByTeacher;
            collectionobj.PVNo = sessionStorage.getItem('VoucherNo');
            collectionobj.TopicName = $('#ddlHomeworkTopic').val();
            collectionobj.EmployeeCode = userid;
            collectionobj.Remark = $scope.Remark;
            var getData = myService.methode('POST', "../Api/HomeworkApi/SubmittedHomework", collectionobj);
            getData.then(function (response) {
                if (JSON.stringify(response.data == 2)) {
                    showMsgBox('999', 'Success', 'Changes has been done', 'success', 'btn-success')
                    $scope.isShow = false;
                    $applyAsync();
                    $scope.Homeworkfor();
                }
            });
            $scope.Remark = '';
        }
        else {
            showMsgBox('2', '', 'Please fill Remark', 'success', 'btn-success')
        }
       
    }
   

}

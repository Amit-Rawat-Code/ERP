
app.directive('loadBanner', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('ModernSlider');
            });
        }
    };
});
app.directive('principalImg', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('principalImgFun');
            });
        }
    };
});
app.directive('galleryLoad', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('galleryLoadFun');
            });
        }
    };
});
app.directive('achievementSlider', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('achSlider');
            });
        }
    };
});
app.directive('kidSlider', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('KidsCornerSlider');
            });
        }
    };
});
app.directive('imgSlider', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('AutoImgSlider');
            });
        }
    };
});
app.directive('groupSchool', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('GroupSlider');
            });
        }
    };
});
app.directive('eventSlider', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('EventFunc');
            });
        }
    };
});
app.directive('loadTestimonial', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('TestSlider');
            });
        }
    };
});
app.directive('loadEventSlider', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('eventslider');
            });
        }
    };
});

app.directive('allNotice', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('allNoticeFun');
            });
        }
    };
});

app.directive('unveil', function () {
    return {
        link: function (scope, element, attrs) {
            element.ready(function () {
                var src = $(element).attr('abc');
                $(element).attr('data-src', src);
            })

        }
    };
});

app.directive('testimonialRepeatDone', function ($timeout)
{
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('testim-init');               
                
            });
        }
    };
});

app.directive('ngEventCarouselOne', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('owlCarousel1');
            });
        }
    };
});
app.directive('ngGalleryLight', function ($timeout)
{
    return function (scope)
    {
        if (scope.$last)
        {
            $timeout(function ()
            {
                scope.$emit('lightgallery');
            });
        }
    };
});
app.directive('ngTopRightSliderGallery', function ($timeout)
{
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('toprightgallery');
            });
        }
    };
});

app.directive('menurepeatDone', function ($timeout) {
    return function (scope) {
        if (scope.$last) {
            $timeout(function () {
                scope.$emit('navmenu');
            });
        }
    };
});

app.controller('myController', function ($scope, $element, $sce, $timeout, $interval, $filter, $http, $compile, $window, myService) {

    $scope.$on('testim-init', function () {
        'use strict'
        var testim = document.getElementById("testim"),
            testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
            testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
            testimLeftArrow = document.getElementById("left-arrow"),
            testimRightArrow = document.getElementById("right-arrow"),
            testimSpeed = 4500,
            currentSlide = 0,
            currentActive = 0,
            testimTimer,
            touchStartPos,
            touchEndPos,
            touchPosDiff,
            ignoreTouch = 30;

        // Testim Script
        function playSlide(slide) {
            for (var k = 0; k < testimDots.length; k++) {
                testimContent[k].classList.remove("active");
                testimContent[k].classList.remove("inactive");
                testimDots[k].classList.remove("active");
            }

            if (slide < 0) {
                slide = currentSlide = testimContent.length - 1;
            }

            if (slide > testimContent.length - 1) {
                slide = currentSlide = 0;
            }

            if (currentActive != currentSlide) {
                testimContent[currentActive].classList.add("inactive");
            }
            testimContent[slide].classList.add("active");
            testimDots[slide].classList.add("active");

            currentActive = currentSlide;

            clearTimeout(testimTimer);
            testimTimer = setTimeout(function () {
                playSlide(currentSlide += 1);
            }, testimSpeed)
        }

        testimLeftArrow.addEventListener("click", function () {
            playSlide(currentSlide -= 1);
        })

        testimRightArrow.addEventListener("click", function () {
            playSlide(currentSlide += 1);
        })

        for (var l = 0; l < testimDots.length; l++) {
            testimDots[l].addEventListener("click", function () {
                playSlide(currentSlide = testimDots.indexOf(this));
            })
        }

        playSlide(currentSlide);

        // keyboard shortcuts
        document.addEventListener("keyup", function (e) {
            switch (e.keyCode) {
                case 37:
                    testimLeftArrow.click();
                    break;

                case 39:
                    testimRightArrow.click();
                    break;

                case 39:
                    testimRightArrow.click();
                    break;

                default:
                    break;
            }
        })

        testim.addEventListener("touchstart", function (e) {
            touchStartPos = e.changedTouches[0].clientX;
        })

        testim.addEventListener("touchend", function (e) {
            touchEndPos = e.changedTouches[0].clientX;

            touchPosDiff = touchStartPos - touchEndPos;

            console.log(touchPosDiff);
            console.log(touchStartPos);
            console.log(touchEndPos);


            if (touchPosDiff > 0 + ignoreTouch) {
                testimLeftArrow.click();
            } else if (touchPosDiff < 0 - ignoreTouch) {
                testimRightArrow.click();
            } else {
                return;
            }
        })
    });

    $scope.$on('navmenu', function () {
        $('.dropdown-submenu > a').on('click', function (e) {
            var submenu;
            submenu = $(this);
            $('.dropdown-submenu .dropdown-menu').removeClass('show');
            submenu.next('.dropdown-menu').addClass('show');
            e.stopPropagation();
        });
        $('li.dropdown>a').on('click', function (e) {
            $('.dropdown-submenu .dropdown-menu').removeClass('show');
        });
    });

    $scope.$on('lightgallery', function () {
        pager: true;
    });
    $scope.$on('owlCarousel1', function () {
        $("#event-carousel-1").owlCarousel({
            items: 5,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 2],
            itemsMobile: [600, 1],
            navigation: true,
            navigationText: ["", ""],
            pagination: true,
            autoPlay: true
        });
    });
    $scope.$on('toprightgallery', function ()
    {
        $("#sports-and-performing-carousel-1").owlCarousel({
            items: 1,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 2],
            itemsMobile: [600, 1],
            navigation: true,
            navigationText: ["", ""],
            pagination: true,
            autoPlay: true
        });
        $("#sports-and-performing-carousel-2").owlCarousel({
            items: 5,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 2],
            itemsMobile: [600, 1],
            navigation: true,
            navigationText: ["", ""],
            pagination: true,
            autoPlay: true
        });
    });

    if (IsFunctionDefined('app.LayoutController')) {
        app.LayoutController($scope, $sce, $filter, myService);
    }

});

function IsFunctionDefined(functionName) {
    if (eval("typeof(" + functionName + ") == typeof(Function)")) {
        return true;
    }
}
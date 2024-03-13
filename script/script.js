$(document).ready(function () {
     /* ========== 헤더 ========== */
    // 헤더 토글 메뉴 클릭 이벤트 처리
    $('.toggle-menu').click(function()
    {
        // 태블릿, 모바일에서만 작동
        if ($(window).width() <= 1280)
        {
            $('.header-bottom').toggle();
            $('.gnb-bg').toggle();
        }
    });

    // pc버전이면 숨기기
    if ($(window).width() > 1280)
    {
        $('.header-bottom-left .gnb-menu.tablet').css('display', 'none');
        $('.header-bottom-left .header-util.tablet').css('display', 'none');
        $('.header-bottom .header-search.mobile').css('display', 'none');
    }



    /* ========== 슬라이드 ========== */
    let nowWidth = $(window).width();
    let slideCount = $('.slider-inner li').length;
    let slideIndex = 0; // 현재 슬라이드의 인덱스를 저장함
    let slidePosition = 0;
    let slideInterval = setInterval(mainSlide, 3000);

    function mainSlide()
    {
        slideIndex++; // 슬라이드 인덱스 1증가
        mainSlideBtn(slideIndex);
        slidePosition -= nowWidth; // 현재 브라우저의 크기만큼 이동시킴
        $('.slider-inner').stop().animate({ left: slidePosition + 'px' }, 300);

        // 마지막 슬라이드이면 다시 기본값으로 초기화
        if (slideIndex == slideCount)
        {
            slideIndex = 0;
            slidePosition = 0;
            mainSlideBtn(0);
            $('.slider-inner').stop().animate({ left: 0 }, 0);
        }
    }

    // 슬라이드 번호에 맞게 클래스를 부여하는 함수
    function mainSlideBtn(index)
    {
        $('.slider-btn li').removeClass('active');
        $('.slider-btn li').eq(index).addClass('active');
    }

    // 슬라이드 버튼 클릭시 해당 슬라이드로 이동
    $('.slider-btn li').click(function ()
    {
        // 클릭한 버튼의 인덱스값을 이용하여, 표시할 슬라이드와 포지션값을 계산함
        let btnIndex = $(this).index();
        slideIndex = btnIndex;
        slidePosition = -btnIndex * nowWidth;

        mainSlideBtn(btnIndex);
        clearInterval(slideInterval); // setInterval 초기화
        slideInterval = setInterval(mainSlide, 3000); // 새로운 setInterval 시작
        $('.slider-inner').stop().animate({ left: slidePosition + 'px' }, 300);
    });


    let touchStartX = 0;// 터치 시작 좌표를 저장하는 변수
    let touchEndX = 0;// 터치 끝 좌표를 저장하는 변수
    let touchDiff = 0;// 터치 이동 거리를 저장하는 변수

     // 터치 시작 이벤트 처리
    $('.slider-inner li').on('touchstart', function(event)
    {
        touchStartX = event.touches[0].clientX;
    });

    // 터치 이동 이벤트 처리
    $('.slider-inner li').on('touchmove', function(event)
    {
        touchEndX = event.touches[0].clientX;
        touchDiff = touchStartX - touchEndX;
    });

    // 터치 끝 이벤트 처리
    $('.slider-inner li').on('touchend', function(event)
    {
        if (touchDiff > 50)
        {
            // 오른쪽으로 터치하면 다음 슬라이드를 보여줌
            slideIndex++;
            if (slideIndex >= slideCount)
            {
                slideIndex = 0;
            }
        }
        else if (touchDiff < -50)
        {
            // 왼쪽으로 터치하면 이전 슬라이드를 보여줌
            slideIndex--;
            if (slideIndex < 0)
            {
                slideIndex = slideCount - 1;
            }
        }
    
        // 터치로 인한 슬라이드 변경 후 처리
        clearInterval(slideInterval);
        slideInterval = setInterval(mainSlide, 3000);
        slidePosition = -slideIndex * nowWidth;
        mainSlideBtn(slideIndex);
        $('.slider-inner').stop().animate({ left: slidePosition + 'px' }, 300);
    
        // 초기화
        touchStartX = 0;
        touchEndX = 0;
        touchDiff = 0;
    });


    /* ========== 클룩 여행 플랜 ========== */
    $('.tab-menu li').click(function ()
    {
        let liIndex = $(this).index();
        $('.tab-menu li').removeClass('active');
        $('.tab-menu li').eq(liIndex).addClass('active');
        $('#plan .card-box').removeClass('active');
        $('#plan .card-box').eq(liIndex).addClass('active');
    });



    /* ========== 프로모션 ========== */
    let promotionInterval = setInterval(function (){ promotionSlide('right');}, 3000); // 프로모션 인터벌 변수
    let promotionIndex = 0; // 현재 프로모션 슬라이드의 인덱스를 저장함

    // 프로모션 슬라이드 함수
    function promotionSlide(direction)
    {
        let browserWidth = $(window).width(); //현재 브라우저의 크기를 저장
        let promotionWidth;
        let promotionCount;

        // 버전에 따른 프로모션 슬라이드의 너비와 슬라이드 갯수를 설정해줌
        if (browserWidth >= 1280)
        { 
            //PC버전
            promotionCount = $('#promotion .content-area.pc .card-box').length;
            promotionWidth = parseInt($('#promotion .content-area').css('width')) + 20;
        }
        else if (browserWidth >= 768)
        {
            //Tablet버전
            promotionCount = $('#promotion .content-area.tablet .card-box').length;
            promotionWidth = parseInt($('#promotion .content-area').css('width'));
        }
        else
        {   
            //모바일버전
            promotionCount = $('#promotion .content-area.mobile .card-item').length;
            promotionWidth = parseInt($('#promotion .content-area').css('width'));
        } 

        // 방향에 따라 현재 인덱스 설정
        if (direction == 'left')
        {
            if (promotionIndex == 0)
            {
                //첫번째 인덱스이면, 마지막 슬라이드를 보여줌
                promotionIndex = promotionCount - 1;
            }
            else
            {
                promotionIndex = promotionIndex - 1;
            }
        }
        else
        {
            if (promotionIndex == promotionCount - 1)
            {
                //마지막 인덱스이면, 첫번째 슬라이드를 보여줌
                promotionIndex = 0;
            }
            else
            {
                promotionIndex = promotionIndex + 1;
            }
        }

        // PC 및 태블릿 버전에선 슬라이드 애니메이션 적용
        let promotionPosition = -promotionIndex * promotionWidth;
        $('#promotion .content-inner').stop().animate({ left: promotionPosition + 'px' }, 300);
    }

    // 터치 시작 이벤트 처리
    $('#promotion .content-inner').on('touchstart', function(event)
    {
        touchStartX = event.touches[0].clientX;
    });

    // 터치 이동 이벤트 처리
    $('#promotion .content-inner').on('touchmove', function(event)
    {
        touchEndX = event.touches[0].clientX;
        touchDiff = touchStartX - touchEndX;
    });

    // 터치 끝 이벤트 처리
    $('#promotion .content-inner').on('touchend', function(event)
    {
        if (touchDiff > 50)
        {
            // 오른쪽으로 터치하면 다음 슬라이드를 보여줌
            promotionSlide('right');
            resetInterval();
        }
        else if (touchDiff < -50)
        {
            // 왼쪽으로 터치하면 이전 슬라이드를 보여줌
            promotionSlide('left');
            resetInterval();
        }

        // 초기화
        touchStartX = 0;
        touchEndX = 0;
        touchDiff = 0;
    });


    // 이전 버튼 클릭시 이전 슬라이드가 나옴
    $('#promotion .promotion-btn .left').click(function ()
    {
        promotionSlide('left');
        resetInterval();
    });

    // 다음 버튼 클릭시 다음 슬라이드가 나옴
    $('#promotion .promotion-btn .right').click(function ()
    {
        promotionSlide('right');
        resetInterval();
    });

    // 프로모션 슬라이드 초기화 & 실행
    function resetInterval()
    {
        clearInterval(promotionInterval);
        promotionInterval = setInterval(function (){ promotionSlide('right');}, 3000);
    }



    /* ========== 나만의 테마 여행 ========== */
    $('.view-more').click(function ()
    {
    let divElement = $('#ownTrip .card-box');
    let eCount = divElement.length;
    for (let i = 0; i < eCount; i++)
    {
        let checkClass = divElement.eq(i).hasClass('active');
        if (!checkClass)
        {
            divElement.eq(i).addClass('active');
            if (i == eCount - 1)
            {
                //마지막 콘텐츠이면 버튼 내용 변경하기
                document.querySelector('.view-more').innerText = '접기';
                $(this).addClass('close-more').removeClass('view-more')
            }
            return;
        }
    }

    //접기 상태에서 한번 더 누르면 초기화
    divElement.removeClass('active');
    divElement.eq(0).addClass('active');
    document.querySelector('.close-more').innerText = '더보기';
    $(this).addClass('view-more').removeClass('close-more');
    });



/* ========== 여행지 둘러보기 ========== */
let browserWidth = $(window).width(); //현재 브라우저의 크기를 저장
let moreIndex = 0;
let moreInterval = setInterval(moreSlide, 3000);

function moreSlide()
{
    if ( browserWidth < 768)
    {
        let moreCount = $('#more .card-item').length;
        
        if( moreIndex < moreCount)
        {
            $('#more .card-item').hide();
            $('#more .card-item').eq(moreIndex).show();
            moreIndex++
        }
        else {
            moreIndex = 0;
        }
    }
}

// 마우스를 올렸을 때 setInterval 멈추기
$('#more .card-item').mouseenter(function()
{
    clearInterval(moreInterval);
});


$('#more .card-item').mouseleave(function()
{
    moreInterval = setInterval(moreSlide, 3000);
});

/* ========== 브라우저 리사이즈 ========== */
let lastWidth = window.innerWidth;
$(window).resize(function()
{
    if(window.innerWidth != lastWidth)
    {
        location.reload();
        promotionSlide('right'); // 프로모션 슬라이드 함수 호출하여 초기화
        resetInterval();
    }
    lastWidth = window.innerWidth;

});

});

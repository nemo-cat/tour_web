$(document).ready(function(){
    /* ========== 슬라이더 ========== */
    let mainSlideCount = $('.slide-list li').length;
    let mainSlideIndex = 0;
    let mainSlidePosition = 0;
    let mainSlideInterval;
    let slideWidth = parseInt($('.slide-list li').css('width'));

    function mainSlide()
    {
        mainSlideIndex++;
        mainSlideBtn(mainSlideIndex);
        mainSlidePosition -= slideWidth;//화면 너비만큼 이동
        $('.slide-list').animate({ left: mainSlidePosition + 'px' }, 300);

        if (mainSlideIndex == mainSlideCount)
        {
            //슬라이드 첫번쨰 요소를 복사해서 자연스럽게 연결
            $('.slide-list li').eq(0).clone().appendTo('.slide-list');
            mainSlideIndex = 0;
            mainSlidePosition = 0; // 첫 번째 슬라이드로 이동 후 위치 초기화
            mainSlideBtn(0);
            $('.slide-list').animate({ left: 0 }, 0);
        }
    }

    // 슬라이드 버튼에 클래스를 주는 함수
    function mainSlideBtn(index) {
        $('.slide-btn li').removeClass('active');
        $('.slide-btn li').eq(index).addClass('active');
    }

    // 슬라이드 버튼 클릭시 해당 슬라이드로 이동
    $('.slide-btn li').click(function()
    {
        let btnIndex = $(this).index(); // 클릭한 li의 인덱스 가져오기
        mainSlideIndex = btnIndex; // 현재 슬라이드 index를 저장
        mainSlidePosition = -btnIndex * slideWidth; // 슬라이드 위치 업데이트
        mainSlideBtn(btnIndex); // 슬라이드 버튼 업데이트
        clearInterval(mainSlideInterval); // setInterval 초기화
        mainSlideInterval = setInterval(mainSlide, 3000); // 새로운 setInterval 시작
        $('.slide-list').stop().animate({ left: mainSlidePosition + 'px' }, 300);
    });

    // 초기 슬라이드 인터벌 시작
    mainSlideInterval = setInterval(mainSlide, 3000);
   

    /* ========== 클룩여행플랜 ========== */
    $('.tab-menu li').click(function()
    {
        let clickIdx = $(this).index();

        $('.tab-menu li').removeClass('active');
        $('.tab-menu li').eq(clickIdx).addClass('active');

        $('.klookPlan-content > div').removeClass('active');
        $('.klookPlan-content > div').eq(clickIdx).addClass('active');
    });

    /* ========== 프로모션 ========== */
    let promotionItem = $('#promotion .card-item').length;
    let promotionSlideWidth = promotionItem * 413;
    let promotionSlidepadding = (promotionItem - 1) * 20;
    let movePosition = promotionSlideWidth + promotionSlidepadding;
    $('#promotion .card-wrap').css("width", movePosition);
    
    let count = promotionItem / 3;
    let index = 0;
    let slidePosition = 0;
    let promotionInterval;
    let move = 1300;
    
    //슬라이드 이동 함수
    function movePromotionSlide(direction, move)
    {
        if(direction == "right")//오른쪽으로 이동
        {
            if(index < count - 1)
            {
                slidePosition += move;
                index++;
            }
            else//마지막 슬라이드면, 첫번째로 돌아오기
            {
                slidePosition = 0;
                index = 0;
            }
        }
        else//왼쪽으로 이동
        {
            if(index > 0)
            {
                slidePosition -= move;
                index--;
            }
            else//첫번째 슬라이드에서 왼쪽버튼을 누르면, 마지막 슬라이드가 나옴
            {
                slidePosition = (count - 1) * move;
                index = count - 1;
            }
        }
        $('#promotion .card-wrap').css("right", slidePosition);
    }

     // 다음 슬라이드로 이동
     $('.promotion-slide-btn .btn-right').click(function()
     {
         movePromotionSlide('right', move);
     });
     
     // 이전 슬라이드로 이동
     $('.promotion-slide-btn .btn-left').click(function()
     {
         movePromotionSlide('left', move);
         
     });

     // 자동으로 슬라이드 되도록 설정
     function intervalSlide(move) {
         promotionInterval = setInterval(function(){
             movePromotionSlide('right', move);
         }, 3000);
     }
     intervalSlide(move);

   
    /* ========== 나만의 테마여행 ========== */
    $('.view-more').click(function()
    {
        let wrapLength = $('.ownTrip-content .card-wrap').length;
        let checkClass = false;
    
        // view-more 클릭 시 동작
        for (let i = 0; i < wrapLength; i++)
        {
            checkClass = $('.ownTrip-content .card-wrap').eq(i).hasClass('active');
            if (!checkClass)
            {
                $('.ownTrip-content .card-wrap').eq(i).addClass('active');
                if (i == wrapLength - 1) 
                {
                    //마지막 card-wrap이면 버튼 내용이 접기로 바뀜
                    document.querySelector('.view-more').innerText = '접기';
                }
                return;
            }
        }
    
        // 접기 버튼을 누르면 첫번째 card-wrap만 남기고 숨겨짐
        $('.ownTrip-content .card-wrap').removeClass('active');
        $('.ownTrip-content .card-wrap').eq(0).addClass('active');
        document.querySelector('.view-more').innerText = '더보기';
    });

    window.addEventListener(`resize`, function()
    {
        console.log("리사이즈!");
        if (matchMedia("screen and (min-width: 1280px)").matches)
        {
            console.log("pc!");
            clearInterval(promotionInterval);
            index = 0;
            slidePosition = 0;
            $('#promotion .card-wrap').css("right", 0);
            // 1280px 이상에서 사용할 JavaScript
            /* ========== 프로모션 ========== */
            promotionItem = $('#promotion .card-item').length;
            promotionSlideWidth = promotionItem * 413;
            promotionSlidepadding = (promotionItem - 1) * 20;
            movePosition = promotionSlideWidth + promotionSlidepadding;
            $('#promotion .card-wrap').css("width", movePosition);

            move = 788;

            // 다음 슬라이드로 이동
            $('.promotion-slide-btn .btn-right').click(function()
            {
                movePromotionSlide('right', move);
            });
            
            // 이전 슬라이드로 이동
            $('.promotion-slide-btn .btn-left').click(function()
            {
                movePromotionSlide('left', move);
                
            });

            // 자동으로 슬라이드 되도록 설정
            intervalSlide(move);
            

        }
        else if (matchMedia("screen and (min-width: 768px)").matches)
        {
            // 768px 미만에서 사용할 JavaScript
            console.log("태블릿!");
            clearInterval(promotionInterval);
            index = 0;
            slidePosition = 0;
            $('#promotion .card-wrap').css("right", 0);
            promotionItem = $('#promotion .card-item').length;
            promotionSlideWidth = promotionItem * 354;
            promotionSlidepadding = (promotionItem - 1) * 20;
            movePosition = promotionSlideWidth + promotionSlidepadding;
            $('#promotion .card-wrap').css("width", movePosition);

            move = 748;

            // 다음 슬라이드로 이동
            $('.promotion-slide-btn .btn-right').click(function()
            {
                movePromotionSlide('right', move);
            });
            
            // 이전 슬라이드로 이동
            $('.promotion-slide-btn .btn-left').click(function()
            {
                movePromotionSlide('left', move);
                
            });

            // 자동으로 슬라이드 되도록 설정
            intervalSlide(move);
        }
        else if (matchMedia("screen and (min-width: 320px)").matches)
        {
            console.log("모바일");
            clearInterval(promotionInterval);
            index = 0;
            slidePosition = 0;
            $('#promotion .card-wrap').css("right", 0);
            promotionItem = $('#promotion .card-item').length;
            promotionSlideWidth = promotionItem * 300;
            promotionSlidepadding = (promotionItem - 1) * 20;
            movePosition = promotionSlideWidth + promotionSlidepadding;
            $('#promotion .card-wrap').css("width", movePosition);

            move = 320;

            // 다음 슬라이드로 이동
            $('.promotion-slide-btn .btn-right').click(function()
            {
                movePromotionSlide('right', move);
            });
            
            // 이전 슬라이드로 이동
            $('.promotion-slide-btn .btn-left').click(function()
            {
                movePromotionSlide('left', move);
                
            });

            // 자동으로 슬라이드 되도록 설정
            intervalSlide(move);

        }

  
    });
    

});
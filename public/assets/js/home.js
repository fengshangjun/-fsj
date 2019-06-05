//获取轮播图 展示在页面
$.ajax({
  type:'get',//get或post
  url:'/slides',//请求的地址
  success:function(data){//成功的回调函数
    console.log(data)
    var html = template('homeTpl',{data:data}); 
    $('#homeBox').html(html);
       //
       var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 3000,
        transitionEnd: function (index) {
          // index++;
  
          $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
        }
      });
  
      // 上/下一张
      $('.swipe .arrow').on('click', function () {
        var _this = $(this);
  
        if(_this.is('.prev')) {
          swiper.prev();
        } else if(_this.is('.next')) {
          swiper.next();
        }
      })
  }
})
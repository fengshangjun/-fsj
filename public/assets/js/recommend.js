//热门推荐 模块
$.ajax({
  type:'get',//get或post
  url:'/posts/recommend',//请求的地址
  success:function(result){//成功的回调函数
    console.log(result)
  }
})
//显示左侧登录用户信息
$.ajax({
  type:'get',//get或post
  url:'/users/'+ userId,//请求的地址
  success:function(result){//成功的回调函数
    var asideTpl = `
      <img class="avatar" src="{{avatar}}">
      <h3 class="name">{{nickName}}</h3>
    
    `;
    var html = template.render(asideTpl,result);
    console.log(html);
    
    $('.profile').html(html);
    
  }
})
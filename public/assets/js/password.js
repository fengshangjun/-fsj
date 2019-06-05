$('#modifyBox').on('submit',function(){
var formData = $(this).serialize();
if(confirm('确定更改密码吗？')){
  $.ajax({
    type:'put',//get或post
    url:'/users/password',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(){//成功的回调函数
      location.reload();
    }
  })
}else{
 alert("修改失败");
}
return false;
})
// function getUrlParams(name){
// var paramsAry = location.search.substr(1).split('&');
// for(var i = 0;i < paramsAry.length;i++){
//   var tmp = paramsAry[i].split('=');
//   if(tmp[0]==name){
//     return tmp[1];
//   }
//  }
// }


//查询分类列表
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
   var html =  template('optionTpl',{result:result});
   $('#category').html(html);
   
  }
});
//图片上传功能
$('#feature').on('change',function(){
  // 获取到管理员选择到的文件 不管用户上传多少个文件，这个文件的信息都存储在files中
  var flie = this.files[0];
  //创建formdata对象实现二进制文件上传
  var formData = new FormData();
  //将管理元上传的头像上传到formdata中
  formData.append('cover',flie);
  //实现文章上传
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    contentType:false,
    processData:false,
    success:function(result){//成功的回调函数
      $('#thumbnail').val(result[0].cover);
    }
  })
})
//文章添加
$('#addForm').on('submit',function(){
var formData = $(this).serialize();
$.ajax({
  type:'post',//get或post
  url:'/posts',//请求的地址
  data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    location.href = '/admin/posts.html'
  }
})
  return false;
})

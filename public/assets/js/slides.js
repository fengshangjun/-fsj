//上传图片
$("#upLoad").on('change',function(){
  var files = this.files[0];
var formData = new FormData();
  formData.append('image',files);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    contentType:false,//text,json,xml,jsonp
    processData: false,
    success:function(result){//成功的回调函数
     $('#image').val(result[0].image);
    }
  })
});
//轮播图添加
$('#sliderForm').on('submit',function(){
  var formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    type:'post',//get或post
    url:'/slides',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(){//成功的回调函数
      location.reload();
    }
  })
  return false;
});
//实现轮播图页面展示功能
$.ajax({
  type:'get',//get或post
  url:'/slides',//请求的地址
  success:function(data){//成功的回调函数
   var html = template('sliderTpl',{data:data});

   $('#listBox').html(html);

  }
})
//实现轮播图删除功能
$('#listBox').on('click','.delete',function(){
if(confirm('确定要删除吗？')){
  var id = $(this).attr('data-id');
  $.ajax({
    type:'delete',//get或post
    url:'/slides/'+id,//请求的地址
    success:function(){//成功的回调函数
     location.reload();
    }
  })}
})
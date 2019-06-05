//网站配置 上传logo
$('#settingFile').on('change',function(){
  var file = this.files[0];
  var formData = new FormData();
  formData.append('logo',file);
  $.ajax({
    type:'post',//get或post
    url:'/upload',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    contentType:false,//text,json,xml,jsonp
    processData:false,
    success:function(result){//成功的回调函数
    
      
      $('#logo').attr('src',result[0].logo);
      $('#logoHidden').val(result[0].logo);
    }
  })
});
//保存设置
$('#settingForm').on('submit',function(){

  var formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    type:'post',//get或post
    url:'/settings',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(){//成功的回调函数
     location.reload();
    }
  })
  return false;
});
$.ajax({
  type:'get',//get或post
  url:'/settings',//请求的地址
  success:function(result){//成功的回调函数
    if(result){
      console.log(result);
      
      
     var html =  template('showTpl',result);
     $('#settingForm').html(html);
     
     
    }
  }
})
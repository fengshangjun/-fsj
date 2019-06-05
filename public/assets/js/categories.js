//添加分类
$('#addCategories').on('submit',function(){
  var formData = $(this).serialize();
  $.ajax({
    type:'post',//get或post
    url:'/categories',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(){//成功的回调函数
      location.reload();
    }
  });
  return false;
});
//分类列表的功能展示
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
  var html =  template('categoriesTpl',{result:result});
  $('#categoriesBox').html(html);
  }
});

//根据id修改分类 渲染左边
$('#categoriesBox').on('click','.ctaegories',function(){
  var id = $(this).attr('data-id'); 
 $.ajax({
   type:'put',//get或post
   url:'/categories/' +id,//请求的地址
   success:function(result){//成功的回调函数
 var html = template('categoriesRenderTpl',result);
 $('#formBox').html(html);
   }
 })
});
//根据id修改分类
$('#formBox').on('submit','#editCategories',function(){
  var id = $(this).attr('data-id');
  var formData = $(this).serialize();
  $.ajax({
    type:'put',//get或post
    url:'/categories/'+id,//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
  //阻止默认提交
    return false;
});
//根据id删除 分类
$('#categoriesBox').on('click','.delete',function(){
  
  var id = $(this).attr('data-id');
  if(confirm('确定要删除吗？')){
    $.ajax({
      type:'delete',//get或post
      url:'/categories/'+id,//请求的地址
      success:function(result){//成功的回调函数
        location.reload();
      }
    })
  }

  
});
//批量删除按钮
// var selectAll = $('#selectAll');
// var selects = $('#selects');
// selectAll.on('change',function(){
//   //判断全选复选框状态
//   var status = $(this).prop('checked');
//   selects.find('input').prop('checked',status);
  
  
// })
 

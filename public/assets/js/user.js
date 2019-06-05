//添加用户
$('#userForm').on('submit',function(){
  var formData = $(this).serialize();
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(){//成功的回调函数
      location.reload();
    },
    error:function(){
      alert('添加失败');
    }
  })
  return false;
});

//上传图片
$('#avatar').on('change',function(){
  var formData = new FormData();
  formData.append('avatar',this.files[0]);
  console.log(this.files[0]);
 $.ajax({
   type:'post',//get或post
   url:'/upload',//请求的地址
   data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
   processData: false,
   // 告诉$.ajax方法不要设置请求参数的类型
   contentType: false,
   success:function(result){//成功的回调函数
     console.log(result);
     $('#preview').attr('src',result[0].avatar);
     $('#hiddenAvater').val(result[0].avatar);
   }
 })
});
//用户列表展示
$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  success:function(result){//成功的回调函数
    var html = template('userTpl',{data:result});
    $('#userBox').html(html);
  }
});
//用户信息渲染到左侧
$('#userBox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    
    $.ajax({
      type:'get',//get或post
      url:'/users/'+ id,//请求的地址
      success:function(response){//成功的回调函数
   
       var html = template('modifyTpl',response);
       $('#modifyBox').html(html);
      }
    })
});
// 修改信息
$('#modifyBox').on('submit','#modifyForm',function(){
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
    type:'put',//get或post
    url:'/users/'+id,//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(data){//成功的回调函数
      location.reload();
     
    }
  })
  return false;
});
//删除信息
$('#userBox').on('click','.edits',function(){
  if( confirm('确定删除吗')){
    var id = $(this).attr('data-id');
    
    $.ajax({
      type:'DELETE',//get或post
      url:'/users/'+id,//请求的地址
      success:function(result){//成功的回调函数
        location.reload();
      }
    })
  }
 
});
//批量删除用户
var selectAll = $('#selectAll');
var deleteMany =  $('#deleteMany');
selectAll.on('change',function(){
  //当全选按钮发生改变时 
  var status = $(this).prop('checked');
  if(status == true){
      //显示隐藏按钮
      deleteMany.show();
  }else{
    //隐藏按钮
    deleteMany.hide();
  }
  //当全选按钮发生改变时  单选按钮也跟着改变
  $('#userBox').find('input').prop('checked',status);
  }
);

//当用户前面的复选框发生变化时
$('#userBox').on('change','.userStatus',function(){
  //查找所有input的数量
 var inputs =  $('#userBox').find('input');
//  假如所有的input数量等于过滤后的input个数  
 if(inputs.length == inputs.filter(':checked').length){
  //则全部被选中  
  selectAll.prop('checked',true);
 }else{
   //有一些没有被选中
  selectAll.prop('checked',false);
 }
//  如果选中的复选框大于零 
 if(inputs.filter(':checked').length > 0){
   //显示批量删除按钮
  deleteMany.show();

 }else{
   //隐藏批量删除按钮
  deleteMany.hide();
 }
  //批量删除按钮注册点击事件
  deleteMany.on('click',function(){
   var ibs = [];
   // 找到所有选中的复选框
   var userChecked = $('#userBox').find('input').filter(':checked');
   //循环复选框 获取data-id 属性
   userChecked.each(function(index,element){
           ibs.push($(element).attr('data-id'));      
   })
   $.ajax({
     type:'delete',//get或post
     url:'/users/' + ibs.join('-'),//请求的地址
     success:function(){//成功的回调函数
       location.reload();
     }
   })
 });
})


 

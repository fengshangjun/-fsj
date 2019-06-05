//拉取数据 渲染列表
$.ajax({
  type:'get',//get或post
  url:'/posts',//请求的地址
  success:function(result){//成功的回调函数
    var html = template('listTpl',{result:result});
    $('#tbodyBox').html(html);
  }
});

//根据id修改文章  
$('#tbodyBox').on('click','.edit',function(){
  var id = $(this).attr('data-id');
  $.ajax({
    type:'put',//get或post
    url:'/posts/'+id,//请求的地址
    success:function(result){//成功的回调函数
      console.log(result)
    }
  })
})


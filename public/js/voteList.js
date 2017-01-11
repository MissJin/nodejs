$(function(){
	$('.voteOne').click(function(e){
		var target = $(e.target);
		var voted_id = target.data('id');
		var user_id = target.data('user_id');
		if(!user_id){
			alert("请您先登入后，投票！");
			return;
		}
		//var tr = $('.item-id-'+id);
		// 获取上一个div
		var prevDiv = target.prev();
		var currentNumber = prevDiv.text().trim();
		var number = parseInt(currentNumber,0);
		$.ajax({
			type:'post',
			url:'/admin/voteList/save?voted_id='+voted_id+'&'+'user_id='+user_id,
			complete:function(results){
				number = number+1;
				console.log(number);
				prevDiv.text(number);
			}
		})
/*		.done(function(results){
			console.log(results);
			var currentNumber = $('.voteOne').prev().text().trim();
			var number = parseInt(currentNumber,0);
			console.log(number);
			$('.voteOne').prev().html(number);
		});*/
	});
})
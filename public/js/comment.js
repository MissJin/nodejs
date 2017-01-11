$(function(){
	$('.comment').click(function(e){
		var target = $(this);
		var toId = target.data('toid');
		var commentId = target.data('cid');
		//判断 是否已经插入过隐藏域
		if($('#toId').length > 0){
			$('#toId').val(toId);
		}else{
			//动态的插入隐藏域
			$('<input>').attr({
				type:'hidden',
				id:'toId',
				name:'comment[tid]',
				value:toId
			}).appendTo('#commentForm');
		}

		if($('#commentId').length > 0){
			$('#commentId').val(commentId);
		}else{
			$('<input>').attr({
				type:'hidden',
				id:'commentId',
				name:'comment[cid]',
				value:commentId
			}).appendTo('#commentForm');
		}


	});
})
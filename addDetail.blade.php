@extends('layouts.workflow')

@section('content')
<div class="new">
    <div class="txtarea-out">
        <textarea type="text" class="content" id="content" placeholder="请输入详细内容(必填)"></textarea>
        <span class="error" id="error2">请输入详细内容(必填)</span>
    </div>
    <div class="uploading">
        <form id="img_list" action="{{URL::Route('uploadImage')}}" method="post" enctype="multipart/form-data">
            <div class="upImg-out clearfix">
                <div id="dvPreview"></div>
                <img src="/images/workflow/img_icon.png" alt="" class="iconUp" />
                <input type="file" class="input-file" id="browsefile" onchange="filepath.value=this.value" multiple="multiple">
                <input class="input-file" id="fileupload" type="button" onclick="browsefile.click()" >
                <input type="textfield" style="display: none;"  id="filepath">
            </div>
        </form>
    </div>
    <div class="btnAdd">
        <a href="#" class="finish-btn submit-btn" id="all_finish">全部完成</a>
        <a href="#" class="next-btn" id="add_progress">下次继续</a>
    </div>
</div>

@stop

@section('js')
    @include('component.uploadImg')
<script>

    $(function(){
        var a = IMGUP.init('img_list', 'add_progress,all_finish', 'dvPreview');
        function ajax_commit(type) {
            var worker_id = {{ $worker_id  }};
            var work_flow_id = {{ $work_flow_id }};
            var comment = $('#content').val();
            var md5 = '';
            var file_md5_list = a.get_md5_list();
            if (file_md5_list) {
                for (var index in file_md5_list) {
                    if (typeof(file_md5_list[index]) != undefined) {
                        md5 += file_md5_list[index] + '|';
                    }
                }
                if (md5) {
                    md5 = md5.substr(0, md5.length-1);
                }
            }
            $.ajax({
                url: "{{ URL::route('ajaxWorkflowTaskApprove') }}",
                type: 'POST',
                dataType: 'json',
                data: {
                    'worker_id': worker_id,
                    'work_flow_id': work_flow_id,
                    'type': type,
                    'comment': comment,
                    'images': md5,
                    '_token': "{{ csrf_token() }}"
                }
            }).done(function (result) {
                if (result.status == 'ok') {
                    $('#msg').html('操作成功');
                    $('#msg').fadeIn(1000);
                    setTimeout(function() {$('#msg').fadeOut(1000);}, 2000);
                    window.location.href = "{{Url::Route('workflowDetail', ['work_flow_id' => $work_flow_id])}}";
                } else {
                    $('#msg').html(result.msg);
                    $('#msg').fadeIn(1000);
                    setTimeout(function() {$('#msg').fadeOut(1000);}, 2000);
                }
            });
        };
        var ajax_commit_add_progress = function() {
            ajax_commit({{WorkflowController::TYPE_TASK_APPROVE_ADD_PROGRESS}});
        }
        var ajax_commit_task_finish = function() {
            ajax_commit({{WorkflowController::TYPE_TASK_APPROVE_FINISH}});
        }
        $('#add_progress').click(function() {
            a.ajax_commit = ajax_commit_add_progress;
            if (!a.get_upload_count()) {
                ajax_commit_add_progress();
            }
        });
        $('#all_finish').click(function() {
            a.ajax_commit = ajax_commit_task_finish;
            if (!a.get_upload_count()) {
                ajax_commit_task_finish();
            }
        });



    });

</script>
@stop
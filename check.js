$(function(){
    /*非空验证*/
    $('.error').hide();
    $('.submit-btn').click(function(){
        if($("input.title").val()==""){
            $('#error1').show();
            $('input.title').focus(function(){
                $('#error1').hide();
            });
        }
        if($("textarea.content").val()==""){
            $('#error2').show();
            $('textarea.content').focus(function(){
                $('#error2').hide();
            });
        }
    });

    /*personSelect人员选择弹窗*/
    /*
    $('.announcer').click(function(){
        $('.personSelect').show();
    });
    $('.next-btn').click(function(){
        $('.personSelect').show();
    });
    $('.depart .personNam').click(function(){
        $(this).addClass('perChecked').siblings().removeClass('perChecked');
    });
    $('.btn-sure').click(function(){
        $('.personSelect').hide();
    });
    $('.sel').click(function(){
        $('.personSelect').show();

    //图片上传
    $("#fileupload").change(function () {
        var fileCount = 0;//上传文件数
        if (typeof (FileReader) != "undefined") {
            var dvPreview = $("#dvPreview");
            //dvPreview.html("");
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
            $($(this)[0].files).each(function () {
                var file = $(this);
                if (regex.test(file[0].name.toLowerCase())) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var html ='<a href="'+ e.target.result +'" class="uploadImg">';
                            html+='<div class="imgOut"><img id="img" src="'+ e.target.result +'"/></div>';
                            html+='<span name="img" class="delImg">';
                            html+='</span>';
                            html+='</a>';
                        dvPreview.append(html);
                        var listL = $('#dvPreview').find('a').size();
                        //删除图片
                        $('.delImg').click(function(){
                            $(this).parent('a').remove();
                            listL--;
                            console.log(listL);
                            countImg();
                            return false;
                        });
                        $('.upImg-out a').height(imgHeight);
                        $('.imgOut').height(imgHeight);
                        //alert(listL);
                        countImg();
                        $('#dvPreview a').children('img').click(function(){
                            $(this).fsgallery();
                        });

                    }
                    reader.readAsDataURL(file[0]);
                } else {
                    alert(file[0].name + " is not a valid image file.");
                    dvPreview.html("");
                    return false;
                }
            });
        } else {
            alert("This browser does not support HTML5 FileReader.");
        }
    });    });
    */
});

//图片上传
function countImg(){
    var imgHeight = $('a.uploadImg').width();
    var listL = $('#dvPreview').find('a').size();
    var topH = imgHeight + 26;
    if(listL< 4){
        var listN = listL * 26;
        //alert(listN);
        $('.input-file').css('left','+'+ listN +'%');
        $('.input-file').css('top','15px');
    }else if(listL == 4){
        $('.input-file').css('left','2.5%');
        $('.input-file').css('top','+'+ topH +'px')
    }else if(listL > 4){
        var marginL = (listL - 4) * 23 + (listL - 4) * 4;
        $('.input-file').css('left','+'+ marginL +'%');
        $('.input-file').css('top','+'+ topH +'px')
    }else if(listL == 8){
        $('.iconUp').hide();
    }
}

function show_alert(msg)
{
    $('#msg').html(msg);
    $('#msg').fadeIn(1000);
    setTimeout(function() {$('#msg').fadeOut(1000);}, 2000);
}

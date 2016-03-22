/**
 * @overview
 *
 * @author 
 * @version 2016/03/18
 */



var imgHeight = $('.uploading .upImg-out img').width();
$('.input-file').height(imgHeight);
$('.input-file').width(imgHeight);
$('.upImg-out a').height(imgHeight);

var IMGUP = {
    file_opt_count: 0,
    file_upload_count: 0,
    file_error_count: 0,
    file_error_list: [],
    file_md5_list: [],
    init: function(element, btn_element, preview_element) {
        var _this = this;
        if (element != '') {
            $('#' + element).fileupload({
                global: false,
                add: function (e, data) {
                    if (typeof (FileReader) != "undefined") {
                        var dvPreview = $("#" + preview_element);
                        var regex = /^.*(.jpg|.jpeg|.gif|.png|.bmp)$/;
                        $.each(data.files, function (index, file) {
                            if (file.type.match(regex)) {
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    _this.file_opt_count++;
                                    _this.file_upload_count++;
                                    /*var html = '<a href="' + e.target.result + '" class="uploadImg">';
                                    html += '<div class="imgOut"><img  src="' + e.target.result + '"/></div>';
                                    html += '<span name="img" class="delImg" id="upload_img_' + file_opt_count + '">';
                                    html += '</span>';
                                    html += '</a>';*/
                                    var html ='<div class="imgOut">';
                                    html+='<a href="'+ e.target.result +'" class="uploadImg swipebox">';
                                    html+='<img id="img" src="'+ e.target.result+'"/>';
                                    html+='</a>';
                                    html+='<span class="delImg" id="upload_img_' + _this.file_opt_count + '">';
                                    html+='</span>';
                                    html+='</div>';
                                    dvPreview.append(html);
                                    file.img_id = 'upload_img_' + _this.file_opt_count;
                                    var listL = $('#' + preview_element).find('a').size();
                                    //删除图片
                                    $('#upload_img_' + _this.file_opt_count + '').click(function () {
                                        //如果之前提交到服务器了,需要删除md5
                                        if (typeof(file.img_id) != undefined) {
                                            if (typeof(_this.file_md5_list[file.img_id]) != undefined) {
                                                delete(_this.file_md5_list[file.img_id]);
                                            }
                                        }
                                        //清空files数组
                                        data.files.length = 0;
                                        _this.file_upload_count--;
                                        $(this).parent().remove();
                                        listL--;
                                        countImg();
                                        return false;
                                    });
                                    $('.upImg-out a').height(imgHeight);
                                    $('.imgOut').height(imgHeight);
                                    //alert(listL);
                                    countImg();
                                   //图片点击放大
                                    $( '.swipebox' ).swipebox();
                                }
                                reader.readAsDataURL(file);
                            } else {
                                alert(file.name + " is not a valid image file.");
                                dvPreview.html("");
                                return false;
                            }
                        });
                    } else {
                        alert("This browser does not support HTML5 FileReader.");
                    }
                    var btn_element_list = btn_element.split(',');
                    for (index in btn_element_list) {
                        $('#' + btn_element_list[index]).on('click', function (e) {
                            if (data.files.length > 0) {
                                data.submit();
                            }
                        })
                    }
                },
                done: function (e, data) {
                    var result = data.result;

                    if (result.status == 'success') {
                        var imglist = result.result;
                        for (var key in imglist) {
                            var img = imglist[key];
                            for (var imgkey in img) {
                                if (img[imgkey].error == 0) {
                                    if (typeof(data.files[0].img_id) != undefined) {
                                        _this.file_md5_list[data.files[0].img_id] = img[imgkey].md5;
                                    }
                                }
                            }
                        }
                    }
                },
                fail: function(e, data) {
                    $.each(data.files, function (index, file) {
                        if (typeof(file.img_id) != undefined && !(file.img_id  in _this.file_error_list)) {
                            _this.file_error_count++;
                            _this.file_error_list[file.img_id] =file.img_id;
                        }
                    });
                },
                start: function(e) {
                    //初始化错误文件数和列表
                    _this.file_error_count = 0;
                    _this.file_error_list = [];
                    $('.upload_img_error').each(function(){
                        $(this).removeClass('upload_img_error');
                    });

                },
                stop: function (e) {
                    if (_this.file_error_count) {
                        for (var index in _this.file_error_list) {
                            $('#'+_this.file_error_list[index]).parent().addClass('upload_img_error');
                        }
                        alert('有' + _this.file_error_count + '张图片上传失败!');
                    } else {
                        _this.ajax_commit();
                    }
                },
            });
        }
        return this;
    },
    ajax_commit :function() {

    },
    get_upload_count: function () {
        return this.file_upload_count;
    },
    get_md5_list:function() {
        return this.file_md5_list;
    }

};


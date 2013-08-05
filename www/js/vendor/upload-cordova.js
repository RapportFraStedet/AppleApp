(function ($) {
	$.fn.serializeJSON = function () {
		var json = {};
		jQuery.map($(this).serializeArray(), function (n, i) {
			json[n['name']] = n['value'];
		});
		return json;
	};
})(jQuery);
var currentImage = 0;
var images,filePath;
function win(r) {
	var response = JSON.parse(r.response);
	if (response.result && response.result==="ok") {
		if (images.length > currentImage && images[currentImage].src && images[currentImage].src!='') {
			uploadImage();
		} else{
			location = '#/kommune/' + Rfs.kommune.Nr + '/' + Rfs.tema.Id + '/kvittering';
		}
	} else {
		$("#errorMessage").html("<h3>" + response.error.Message + "</h3><p>" + response.error.ExceptionMessage + "</p>");
		location = '#/kommune/' + Rfs.kommune.Nr + '/' + Rfs.tema.Id + '/kvitteringfejl';		
	}
}
function fail(error) {
	location = "#KvitteringError";
}

function uploadImage(){
	
		var image = images[currentImage];
		currentImage++;
		//var params = $("#rapportForm").serializeJSON();
		var options = new FileUploadOptions();
		options.fileKey = image.id.replace('A', '');
		options.fileName = filePath+'-'+options.fileKey+'.jpg';
		options.mimeType = "image/jpeg";
		//options.params = params;
		var ft = new FileTransfer();
		ft.onprogress = function (e) {
			if (e.lengthComputable) {
				$(".current > span").width(e.loaded / e.total * 100 + "%");
			}
		};
		ft.upload(image.src, encodeURI(Rfs.url + "/Upload.aspx/UploadImage"), win, fail, options);
	
}
function upload() {
	images = $(".imageCamera");
	currentImage = 0;
	if (!window.FormData) {
		var form = $("#rapportForm")[0];
		var formData = new FormData(form);
		if ($(".current > span").hasClass("animate"))
			$(".current > span").removeClass("animate");
		var xhr = new XMLHttpRequest();
		xhr.open('POST', Rfs.url + "/api/SaveFormsData.aspx", true);
		xhr.onerror = function () {
			alert("error");
		};
		xhr.onload = function (e) {
			$(".current > span").width("100%");
			if (this.status == 200) {
				//location = '#/kommune/' + Rfs.kommune.Nr + '/' + Rfs.tema.Id + '/kvittering';
				if (images.length > currentImage && images[currentImage].src && images[currentImage].src!='') {
					filePath=JSON.parse(this.response);
					uploadImage();
				}
			} else {
				var response = JSON.parse(this.response);
				$("#errorMessage").html("<h3>" + response.Message + "</h3><p>" + response.ExceptionMessage + "</p>");
				location = '#/kommune/' + Rfs.kommune.Nr + '/' + Rfs.tema.Id + '/kvitteringfejl';
			}
		};
		xhr.upload.onprogress = function (e) {
			if (e.lengthComputable) {
				$(".current > span").width(e.loaded / e.total * 100 + "%");
			}
		};
		xhr.send(formData);
	} else {
		/*var form = $("#rapportForm")[0];
		form.action = Rfs.url + "/api/SaveFormsData.aspx";
		form.method = "post";
		form.enctype = "multipart/form-data";
		form.target = "hiddenIFrame";
		form.submit();
		$(".current > span").width("100%");
		if (!$(".current > span").hasClass("animate"))
			$(".current > span").addClass("animate");
		location = '#/kommune/' + Rfs.kommune.Nr + '/' + Rfs.tema.Id + '/kvittering';*/
		$.ajax({
		              type: 'POST',
		              url: Rfs.url + "/api/SaveFormsData.aspx", 
		              data: $("#rapportForm").serializeJSON(),
		              success: function(){
		                  alert( "Thank You For Your Submission" );
		              }, //end success
		              error: function(XMLHttpRequest, textStatus, errorThrown) {
		                  console.log(XMLHttpRequest.responseText);
		                  console.log(textStatus);
		                  console.log(errorThrown);
		                  alert("ERROR");

		            } 
		          });
	}
	
	
}
$(function () {
	$("iframe").load(function(){
		setTimeout(function(){
			filePath=JSON.parse(this.response);
			uploadImage();
		},1000);
		filePath=JSON.parse(this.response);
		uploadImage();
	});

});
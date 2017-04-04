$("#btn-upload").click(function() {
  $("#file-projection").click();
  console.log('hello');
});

$(document).ready(function() {
		var fileInput = document.getElementById('file-projection');
		var fileDisplayArea = document.getElementById('demo');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var imageType = /image.*/;

      if (file.type.match(imageType)) {
	var reader = new FileReader();
	reader.onload = function(e) {
        	var img = new Image();
        	img.src = reader.result;
		if(img.height > 300) {
			fileDisplayArea.innerHTML = '';// +img.height;
          		console.log(img.height);
			$("#demo").css('height', Math.ceil((img.height)*.99) + 'px');
		}
        	$("#demo").css('background', 'url(' + reader.result + ')');
      	}
	reader.readAsDataURL(file);
      } else {
	fileDisplayArea.innerHTML = "File not supported!"
      }
});

  var has_touch = 'ontouchstart' in document.documentElement;
	var accX, width, height, xA, accXLast;

  if(has_touch || screen.width <= 700) {
    window.ondevicemotion = function(event) {
		    accX = Math.round(event.accelerationIncludingGravity.x * 9.9) / 100;
        if(typeof accXLast == 'undefined' || Math.abs(accX - accXLast) > 0.021) {
          accXLast = accX;
          xA = ((accX*25) + 25).toFixed(1);
  	      $('#demo').css({'background-position': xA+'% '+ 0+'%'});
        }
		}
	} else {
    $('#demo').mousemove(function(e) {
      xA = e.pageX / $(this).width() * 50;
      $(this).css({'background-position': xA+'% ' +0+'%'});
		});
  }
});

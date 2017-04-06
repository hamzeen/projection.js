/* this method returns a promise */
function readFile(file) {
    $("#wip").addClass("show");
    var reader = new FileReader();
    var deferred = $.Deferred();

    reader.onload = function(event) {
        var img = new Image();
        img.src = event.target.result;
        deferred.resolve(img);
    };

    reader.onerror = function() {
        deferred.reject(this);
    };

    reader.readAsDataURL(file);
    return deferred.promise();
}

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
	 
         var image = readFile(file)
           .then(function (data) {
             fileDisplayArea.innerHTML = "";
             $("#wip").removeClass("show");// remove spinner
             if(data.height <= 700) {
               $("#demo").css('height', Math.ceil((data.height)*.99) + 'px');
             }
             $("#demo").css('background', 'url(' + data.src + ')');
             $("#demo").css({'background-position': 25+'% ' + 50+'%'});
           })
           .catch(function(err) {
             $("#wip").removeClass("show");
             fileDisplayArea.innerHTML = "Could not load your file";
           });
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
  	      $('#demo').css({'background-position': xA+'% '+ 50+'%'});
        }
		}
	} else {
    $('#demo').mousemove(function(e) {
      xA = e.pageX / $(this).width() * 50;
      $(this).css({'background-position': xA+'% ' + 50+'%'});
		});
  }
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Util = function () {
    function Util() {
        classCallCheck(this, Util);
    }

    createClass(Util, null, [{
        key: "hasGetUserMedia",
        value: function hasGetUserMedia() {
            var handle = navigator.mediaDevices.getUserMedia;
            console.log(handle);
            return !!handle;
        }
    }]);
    return Util;
}();

var ApplicationController = function () {
    function ApplicationController() {
        classCallCheck(this, ApplicationController);
    }

    createClass(ApplicationController, [{
        key: "showToast",
        value: function showToast() {
            if (typeof Windows !== "undefined") {
                this.showWinToast("Toast from the remote server!");
            } else {
                this.showWebToast("This is a web toast!");
            }
        }
    }, {
        key: "showWinToast",
        value: function showWinToast(message) {
            var notifications = Windows.UI.Notifications;
            var template = notifications.ToastTemplateType.toastImageAndText01;
            var toastXml = notifications.ToastNotificationManager.getTemplateContent(template);

            var toastTextElements = toastXml.getElementsByTagName("text");
            toastTextElements[0].appendChild(toastXml.createTextNode(message));
            var toast = new notifications.ToastNotification(toastXml);

            var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
            toastNotifier.show(toast);
        }
    }, {
        key: "showWebToast",
        value: function showWebToast(message) {
            var snackbarContainer = document.querySelector('#toast-container');
            var data = { message: message };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
    }, {
        key: "cameraCapture",
        value: function cameraCapture() {
            if (typeof Windows !== "undefined") {
                var captureUI = new Windows.Media.Capture.CameraCaptureUI();
                //Set the format of the picture that's going to be captured (.png, .jpg, ...)
                captureUI.photoSettings.format = Windows.Media.Capture.CameraCaptureUIPhotoFormat.png;
                //Pop up the camera UI to take a picture
                captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {
                    console.log(capturedItem);
                    var image = new Image();
                    image.src = capturedItem.path;

                    var canvas = document.getElementById('image-canvas');
                    var context = canvas.getContext('2d');

                    context.drawImage(image, 0, 0);
                });
            } else if (Util.hasGetUserMedia()) {
                (function () {
                    // navigator.getUserMedia = navigator.webkitGetUserMedia ||
                    //     navigator.mozGetUserMedia || navigator.msGetUserMedia;

                    var video = document.querySelector('video');
                    var canvas = document.getElementById('image-canvas');

                    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (localMediaStream) {
                        video.src = window.URL.createObjectURL(localMediaStream);
                        video.addEventListener('click', function () {
                            var context = canvas.getContext('2d');
                            context.drawImage(video, 0, 0);
                        });
                    });
                })();
            } else {
                this.showWebToast("I don't have a camera for that :(");
            }
        }
    }], [{
        key: "sayHello",
        value: function sayHello() {
            console.log("Hello world!");
        }
    }]);
    return ApplicationController;
}();

var controller = new ApplicationController();
ApplicationController.sayHello();

var toastButton = document.getElementById('toast-button');
toastButton.addEventListener('click', function () {
    controller.showToast();
});

var photoButton = document.getElementById('photo-button');
photoButton.addEventListener('click', function () {
    controller.cameraCapture();
});
//# sourceMappingURL=bundle.js.map

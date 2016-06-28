import {Util} from "./util.js";

export class ApplicationController {

    static sayHello() {
        console.log("Hello world!");
    }

    showToast() {
        if (typeof Windows !== "undefined") {
            this.showWinToast("Toast from the remote server!");
        } else {
            this.showWebToast("This is a web toast!");
        }
    }

    showWinToast(message) {
        var notifications = Windows.UI.Notifications;
        var template = notifications.ToastTemplateType.toastImageAndText01;
        var toastXml = notifications.ToastNotificationManager.getTemplateContent(template);

        var toastTextElements = toastXml.getElementsByTagName("text");
        toastTextElements[0].appendChild(toastXml.createTextNode(message));
        var toast = new notifications.ToastNotification(toastXml);

        var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
        toastNotifier.show(toast);
    }

    showWebToast(message) {
        var snackbarContainer = document.querySelector('#toast-container');
        var data = {message: message};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }

    cameraCapture() {
        if (typeof Windows !== "undefined") {
            var captureUI = new Windows.Media.Capture.CameraCaptureUI();
            //Set the format of the picture that's going to be captured (.png, .jpg, ...)
            captureUI.photoSettings.format = Windows.Media.Capture.CameraCaptureUIPhotoFormat.png;
            //Pop up the camera UI to take a picture
            captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedItem) {
                console.log(capturedItem);
                let image = new Image();
                image.src = capturedItem.path;

                let canvas = document.getElementById('image-canvas');
                let context = canvas.getContext('2d');

                context.drawImage(image, 0, 0);
            });
        } else if (Util.hasGetUserMedia()) {
            // navigator.getUserMedia = navigator.webkitGetUserMedia ||
            //     navigator.mozGetUserMedia || navigator.msGetUserMedia;

            let video = document.querySelector('video');
            let canvas = document.getElementById('image-canvas');

            navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then((localMediaStream) => {
                    video.src = window.URL.createObjectURL(localMediaStream);
                    video.addEventListener('click', () => {
                        let context = canvas.getContext('2d');
                        context.drawImage(video, 0, 0);
                    });
                });
        } else {
            this.showWebToast("I don't have a camera for that :(");
        }
    }
}
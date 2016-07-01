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
                image.src = URL.createObjectURL(capturedItem, {oneTimeOnly: true});

                let wrapper = document.getElementById('media-wrapper');
                for (let i = 0; i < wrapper.childNodes.length; i++) {
                    wrapper.childNodes[i].remove();
                }

                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');

                canvas.width = image.width;
                canvas.height = image.height;

                context.drawImage(image, 0, 0, image.width, image.height,
                    0, 0, canvas.width, canvas.height);

                wrapper.appendChild(canvas);
            });
        } else if (Util.hasGetUserMedia()) {
            let wrapper = document.getElementById('media-wrapper');
            for (let i = 0; i < wrapper.childNodes.length; i++) {
                wrapper.childNodes[i].remove();
            }

            let video = document.createElement('video');
            video.setAttribute('autoplay', true);

            navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then((localMediaStream) => {
                    video.src = window.URL.createObjectURL(localMediaStream);
                    video.addEventListener('click', (e) => {
                        console.log(e);

                        localMediaStream.getVideoTracks().forEach((videoTrack) => {
                            videoTrack.stop();
                        });
                    });

                    wrapper.appendChild(video);
                });
        } else {
            this.showWebToast("I don't have a camera for that :(");
        }
    }
}
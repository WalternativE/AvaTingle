import {ApplicationController} from './controllers/application-controller.js';

var controller = new ApplicationController();
ApplicationController.sayHello();

var toastButton = document.getElementById('toast-button');
toastButton.addEventListener('click', () => {
    controller.showToast();
});

var photoButton = document.getElementById('photo-button');
photoButton.addEventListener('click', () => {
    controller.cameraCapture();
});

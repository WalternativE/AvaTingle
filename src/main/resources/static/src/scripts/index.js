import {ApplicationController} from './controllers/application-controller.js';

var controller = new ApplicationController();
controller.sayHello();

var toastButton = document.getElementById('toast-button');
toastButton.addEventListener('click', () => {
    controller.showToast();
    // comment
});
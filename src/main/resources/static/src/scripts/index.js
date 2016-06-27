import {ApplicationController} from './controllers/application-controller.js';

(function() {
    let controller = new ApplicationController();
    controller.sayHello();

    let toastButton = document.getElementById('toast-button');
    toastButton.addEventListener('click', () => {
       controller.showToast();
    });
})();
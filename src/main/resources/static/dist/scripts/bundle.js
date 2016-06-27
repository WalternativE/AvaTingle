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

var ApplicationController = function () {
    function ApplicationController() {
        classCallCheck(this, ApplicationController);
    }

    createClass(ApplicationController, [{
        key: "sayHello",
        value: function sayHello() {
            console.log("Hello world!");
        }
    }, {
        key: "showToast",
        value: function showToast() {
            if (typeof Windows !== "undefined") {
                var notifications = Windows.UI.Notifications;
                var template = notifications.ToastTemplateType.toastImageAndText01;
                var toastXml = notifications.ToastNotificationManager.getTemplateContent(template);
                var toastTextElements = toastXml.getElementsByTagName("text");
                toastTextElements[0].appendChild(toastXml.createTextNode("Toast from the remote server!"));
                // var toastImageElements = toastXml.getElementsByTagName("image");
                // toastImageElements[0].setAttribute("src", "http://assets.codepen.io/assets/social/facebook-default.png");
                // toastImageElements[0].setAttribute("alt", "red graphic");
                var toast = new notifications.ToastNotification(toastXml);
                var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
                toastNotifier.show(toast);
            }
        }
    }]);
    return ApplicationController;
}();

var controller = new ApplicationController();
controller.sayHello();

var toastButton = document.getElementById('toast-button');
toastButton.addEventListener('click', function () {
    controller.showToast();
    // comment
});
//# sourceMappingURL=bundle.js.map

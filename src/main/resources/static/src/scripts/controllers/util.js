export class Util {

    static hasGetUserMedia() {
        let handle = navigator.mediaDevices.getUserMedia;
        console.log(handle);
        return !!(handle);
    }

}
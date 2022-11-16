import MessageEvent from '@lanshu/system-common/utils/message';

const $msg = MessageEvent(ELEMENT.Message);
export default function message(success, error) {
  return function (res, successCallback, errorCallback) {
    if (res.code === 10000) {
      success && $msg.success(success);
      successCallback && successCallback(res);
    } else {
      $msg.error(res.msg || error);
      errorCallback && errorCallback(res);
    }
    return res;
  };
}

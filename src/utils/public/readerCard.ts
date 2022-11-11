/**
 *  硬件设备：读园区卡
 * */
export const readerParkCard = () => {
  if (!window.callbackObj) return false;
  const json = JSON.parse(callbackObj.readCardNumber());
  const result = {
    message: json.message,
    card: '',
  };
  if (json.code == 0) {
    result['card'] = json.data;
  }
  return result;
};

/**
 *  硬件设备：读身份证
 * */
export const readerIDCard = () => {
  if (!callbackObj) return false;
  return eval('(' + callbackObj.readIDCard() + ')');
};

/**
 *  硬件设备：读密码
 * */
export const readerPassword = () => {
  if (!callbackObj) return false;
  // return eval('(' + callbackObj.readPasswordKeyboard() + ')');
  return callbackObj.readPasswordKeyboard();
};

/**
 *  硬件设备：pos机收款
 * */
export const readerPosPayment = (payAmount: string, businessType: string) => {
  if (!callbackObj) return false;
  return JSON.parse(callbackObj.posPayment(payAmount, businessType));
};

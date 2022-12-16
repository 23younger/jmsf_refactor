import { h } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons-vue';
import { findCardCustomer } from '/@/api/jmsf/jmsfList';

const { createMessage, createErrorModal } = useMessage();
// const error = createMessage.error!;
const warning = createMessage.warning!;

// 刷园区卡
export const handleParkCard = (formModal) => {
  if (typeof callbackObj == 'undefined') return false;
  const json = JSON.parse(callbackObj.readCardNumber());
  const result = {
    message: json.message,
    card: '',
  };
  if (json.code == 0) {
    result['card'] = json.data;
  }
  const { card, message } = result;
  if (card) {
    findCardCustomer({ cardNo: card }).then((customerInfo) => {
      console.log('customerInfo', customerInfo, formModal);
      // formModal['customerId'] = customerInfo.cardNo;
    });
  } else {
    createErrorModal({ title: '提示', content: message });
  }
};

// 刷银行卡
export const handleBankCard = (formModal) => {
  if (typeof callbackObj == 'undefined') return false;
  const json = JSON.parse(callbackObj.readBackCardNumber());
  const result = {
    message: json.message,
    card: '',
  };
  if (json.code == 0) {
    result['card'] = json.data;
  }
  const { card, message } = result;
  if (card) {
    findCardCustomer({ cardNo: card }).then((customerInfo) => {
      console.log('customerInfo', customerInfo, formModal);
    });
  } else {
    createErrorModal({ title: '提示', content: message });
  }
};

// 客户卡号回车键校验
export const handlePressEnter = (value: string, formModal) => {
  findCardCustomer({ cardNo: value }).then((customerInfo) => {
    console.log('customerInfo', customerInfo, formModal);
  });
  warning('卡号不存在');
};

// 查看图片
export const viewImgs = (imgs: string[]) => {
  // if (typeof callbackObj == 'undefined') return;
  // callbackObj.showPictureView(imgs);
  console.log('imgs', imgs);
};

/**
 * 自定义collapse图标
 */
export const cusExpandIcon = (props) => {
  if (props.isActive) {
    return h(
      'div',
      {
        style: {
          fontSize: '12px',
        },
      },
      ['收起', h(CaretDownOutlined, { style: { marginLeft: '8px' } })],
    );
  }
  return h(
    'div',
    {
      style: {
        fontSize: '12px',
      },
    },
    ['展开', h(CaretUpOutlined, { style: { marginLeft: '8px' } })],
  );
};

/**
 * 计算各个金额
 */
export const calculate = (model) => {
  console.log('model', model);
};

/**
 * 读取输入密码
 */
export const readPassword = (model) => {
  model['password'] = '';
  if (typeof callbackObj == 'undefined') return;
  const pwd = JSON.parse(callbackObj.readPasswordKeyboard());
  if (pwd.code != '0') {
    createErrorModal({ title: '提示', content: pwd.message });
  } else {
    model['password'] = pwd.data;
  }
};

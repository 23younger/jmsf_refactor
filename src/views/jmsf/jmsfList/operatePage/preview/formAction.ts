import { useMessage } from '/@/hooks/web/useMessage';
import { readerParkCard, readerIDCard } from '/@/utils/public/readerCard';
import { IDCardEnableCustomer, PublicCustomerAccountApi } from '/@/api/public/customer';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
const warning = createMessage.warning!;

// 刷园区卡
export const handleParkCard = (field, formModal) => {
  console.log('sssss', field, formModal);
  formModal[field] = '123456789012';
  // ty_todo 客户姓名、手机号码、卡余额也应该被读取到的卡务信息更新
  return;
  const { card, message } = readerParkCard() as any;
  if (card) {
    console.info('刷园区卡:-------');
    // 设备读取到园区卡，去账户信息拿到身份证号，再客户系统查客户信息
    PublicCustomerAccountApi({ cardNo: card }).then((accountRes) => {
      IDCardEnableCustomer({
        certificateNumberMatch: accountRes.customerCertificateNumber,
      }).then((res) => {
        formModal[field] = res.data[0];
      });
    });
  } else {
    createErrorModal({ title: '提示', content: message });
  }
};

// 刷银行卡

// 回车键校验
export const handlePressEnter = (value: string) => {
  warning('卡号不存在');
  console.log('value', value);
};

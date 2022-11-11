import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';
import {
  CustomerKeywordItem,
  CustomerAccountItem,
  SystemUserItem,
  CustomerAllCardItem,
  IDCardQueryCustomerItem,
  IDCardCustomerItem,
  CustomerSimpleNormalItem,
} from '/@/api/public/model/customerModel';
import { useUserStoreWithOut } from '/@/store/modules/user';

enum Api {
  PUBLIC_CUSTOMER_INFO = '/customer-service/api/customer/getByKeyword', // 获取客户信息
  PUBLIC_CUSTOMER_INFO_BYCODE = '/customer-service/api/customer/getByCodeAndName', // 根据客户编码获取客户信息
  // PUBLIC_CUSTOMERACCOUNT = '/account-service/api/account/getSingleWithoutValidate', // 卡号查账户信息
  PUBLIC_CUSTOMERACCOUNT = '/account-service/api/account/getSingle', // 卡号查账户信息
  PUBLIC_ACCOUNT_BALANCE = '/account-service/api/account/simpleInfo', // 卡号查账户信息包含余额
  PUBLIC_CUSTOMER_ALL_CARD = '/account-service/api/account/getList', // 客户名下所有卡号
  PUBLIC_SYSTEM_USER = '/dili-uap/userApi/listUsersByExample.api', // 系统用户
  PUBLIC_SYSTEM_USERS = '/dili-uap/userApi/listUsers.api', // 新系统用户
  PUBLIC_IDCARD_CUSTOMER = '/customer-service/api/customer/listBase', //身份证查所有客户
  PUBLIC_IDCARD_CUSTOMER_ENABLE = '/customer-service/api/customer/listNormalPage', //身份证查客户(正常客户)
  PUBLIC_CUSTOMER_SIMPLE_ENABLE = '/customer-service/api/customer/listSimpleNormalPage', //查询正常的简单客户数据集(正常客户)，
}

const userStore = useUserStoreWithOut();
const marketId = userStore.getUserInfo.marketId; //市场id

// 客户基本信息
export const PublicCustomerInfoApi = (params: CustomerKeywordItem) =>
  defHttp.post({
    url: Api.PUBLIC_CUSTOMER_INFO,
    params: qs.stringify({ ...params, state: 1 }, { addQueryPrefix: true }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ignoreCancelToken: true,
    },
  });

// 查询客户系统客户简单信息
export const PublicCustomerSimpleEnableApi = (params: CustomerSimpleNormalItem) =>
  defHttp.post({
    url: Api.PUBLIC_CUSTOMER_SIMPLE_ENABLE,
    params: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ignoreCancelToken: true,
    },
  });

// 根据code获取客户信息
export const getCustomerInfoByCodeApi = (params) =>
  defHttp.post({
    url: Api.PUBLIC_CUSTOMER_INFO_BYCODE,
    data: params,
    headers: {
      ignoreCancelToken: true,
    },
  });

// 客户账户信息
export const PublicCustomerAccountApi = (params: CustomerAccountItem) =>
  defHttp.post({
    url: Api.PUBLIC_CUSTOMERACCOUNT,
    data: params,
    headers: {
      ignoreCancelToken: true,
    },
  });

// 卡号查账户信息包含余额
export const PublicAccountBalanceApi = (params: { cardNo: string }) =>
  defHttp.get({
    url: Api.PUBLIC_ACCOUNT_BALANCE,
    params: { ...params, marketId },
    headers: {
      ignoreCancelToken: true,
    },
  });

// 客户名下所有卡号
export const PublicCustomerAllCardApi = (params: CustomerAllCardItem) =>
  defHttp.post({
    url: Api.PUBLIC_CUSTOMER_ALL_CARD,
    data: { ...params, firmId: marketId },
    headers: {
      ignoreCancelToken: true,
    },
  });

// 系统用户
export const PublicSystemUserListApi = (params: SystemUserItem) =>
  defHttp.get({
    url: Api.PUBLIC_SYSTEM_USER,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

// 新系统用户
export const PublicSystemUserListsApi = (params) =>
  defHttp.get({
    url: Api.PUBLIC_SYSTEM_USERS,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

// 身份证查客户
export const IDCardCustomer = (params: IDCardCustomerItem) =>
  defHttp.post({
    url: Api.PUBLIC_IDCARD_CUSTOMER,
    data: params,
    headers: {
      ignoreCancelToken: true,
    },
  });

// 身份证查客户(正常客户)
export const IDCardEnableCustomer = (params: IDCardQueryCustomerItem) =>
  defHttp.post({
    url: Api.PUBLIC_IDCARD_CUSTOMER_ENABLE,
    data: { ...params, marketId },
    headers: {
      ignoreCancelToken: true,
    },
  });

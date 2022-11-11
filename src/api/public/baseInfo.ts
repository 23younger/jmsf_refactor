import { defHttp } from '/@/utils/http/axios';
import { useUserStoreWithOut } from '/@/store/modules/user';
import {
  CategoryItem,
  ChargeItem,
  RuleBatchItem,
  CityItem,
} from '/@/api/public/model/baseInfoModel';
import axios from 'axios';

const userStore = useUserStoreWithOut();
const marketId = userStore.getUserInfo.marketId; //市场id
const firmCode = userStore.getUserInfo.firmCode; //市场code
const userId = userStore.getUserInfo.userId; // 用户id
enum Api {
  GET_DEPARTMENT = '/dili-uap/departmentApi/listByExample.api', //部门
  GET_POWER_DEPARTMENT = '/dili-uap/userDataAuthApi/listUserDepartmentDataAuth.api', //部门
  GET_POSITION = '/dili-uap/positionApi/listByCondition.api', //根据市场code获取职位列表
  GET_CHARGEITEM = '/intelligent-assets/api/leaseOrder/queryBusinessChargeItem', //收费项
  GET_RULE_BATCH = '/dili-rule/api/chargeRule/batchQueryFeeWithoutShortcut', //计费规则-批量调用
  // GET_RULE = '/dili-rule/api/chargeRule/queryFee', //计费规则-单个调用
  GET_SETTLEDAY = '/account-service/api/settleDay/getOne',
  GET_CATEGORY = '/assets-service/api/cusCategory/getTree',
  GET_PRE_SETTLE_DAY = '/account-service/api/settleDay/getOneInactive', //上一个结算日
  GET_CITY = '/assets-service/api/city/listByKeywordsWithCityCode', // 产地列表
  GET_CITY_ALL = '/assets-service/api/city/listByKeywords', // 产地列表(可以查到中国，省)
  GET_USER_POSITION = '/dili-uap/userApi/getUserPosition.api', // 根据用户id获取职位信息
  GET_USER_ROLENAME = '/dili-uap/roleApi/listByUser.api', // 根据用户id获取角色信息
}

// 获取部门
export const PublicDepartmentAllTextApi = () =>
  defHttp.post({
    url: Api.GET_DEPARTMENT,
    data: { firmId: marketId },
    headers: {
      ignoreCancelToken: true,
    },
    responseType: 'json',
    transformResponse: axios.defaults.transformResponse.concat((res) => {
      const arr = [{ name: '全部', value: '' }];
      res.data = arr.concat(res.data);
      return res;
    }),
  });

// 获取部门
export const PublicDepartmentApi = () =>
  defHttp.post({
    url: Api.GET_DEPARTMENT,
    data: { firmId: marketId },
    headers: {
      ignoreCancelToken: true,
    },
  });

// 根据市场code获取职位
export const PublicPositionApi = () =>
  defHttp.post({
    url: Api.GET_POSITION,
    data: { firmCode },
    headers: {
      ignoreCancelToken: true,
    },
  });

// 获取本市场有数据权限部门
export const PublicPowerDepartmentAllTextApi = () =>
  defHttp.get({
    url: Api.GET_POWER_DEPARTMENT,
    params: { userId },
    responseType: 'json',
    transformResponse: axios.defaults.transformResponse.concat((res) => {
      const arr = [{ name: '全部', value: '' }];
      res.data = arr.concat(res.data);
      return res;
    }),
  });

// 获取本市场有数据权限一级部门
export const PublicPowerFirstDepartmentAllTextApi = () =>
  defHttp.get({
    url: Api.GET_POWER_DEPARTMENT,
    params: { userId },
    responseType: 'json',
    transformResponse: axios.defaults.transformResponse.concat((res) => {
      const arr = [{ name: '全部', value: '' }];
      res.data = res.data.filter((item) => {
        return !item.parentId;
      });
      res.data = arr.concat(res.data);
      return res;
    }),
  });

//获取本市场有数据权限部门
export const PublicPowerDepartmentApi = () =>
  defHttp.get({
    url: Api.GET_POWER_DEPARTMENT,
    params: { userId },
  });

export const PublicChargeItemApi = (params: ChargeItem) =>
  defHttp.get({
    url: Api.GET_CHARGEITEM,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const PublicRuleBatchApi = (params: RuleBatchItem) =>
  defHttp.post({
    url: Api.GET_RULE_BATCH,
    data: params,
    headers: {
      ignoreCancelToken: true,
    },
  });
/*export const PublicRuleApi = (params: RuleBatchItem) =>
  defHttp.post({
    url: Api.GET_RULE,
    data: params,
    headers: {
      ignoreCancelToken: true,
    },
  });*/

// 系统结算日
export const GetSettleDayApi = () =>
  defHttp.get({
    url: Api.GET_SETTLEDAY,
    params: { firmId: marketId },
  });
// 系统结算日
export const GetSettleDaygsApi = (data) =>
  defHttp.get({
    url: Api.GET_SETTLEDAY,
    params: { firmId: marketId, accountType: data.accountType },
  });

//上一个结算日
export const GetPreSettleDayApi = (params?: { accountType?: number }) =>
  defHttp.get({
    url: Api.GET_PRE_SETTLE_DAY,
    params: { ...params, firmId: marketId },
  });

// 品类信息
export const GetCategoryApi = (params?: CategoryItem) =>
  defHttp.post({
    url: Api.GET_CATEGORY,
    params: { ...params, marketId },
    headers: {
      ignoreCancelToken: true,
    },
  });

// 产地信息
export const GetCityApi = (params: CityItem) =>
  defHttp.post({
    url: Api.GET_CITY,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

// 产地信息(包括中国以及省)
export const GetAllCityApi = (params: CityItem) =>
  defHttp.post({
    url: Api.GET_CITY_ALL,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

// 根据用户id获取职位信息
export const GetUserPosition = (params: { userId: string | number }) =>
  defHttp.get({
    url: Api.GET_USER_POSITION,
    params: params,
  });

// 根据用户id获取角色
export const GetUserRoleName = (params: { userId: string | number }) =>
  defHttp.get({
    url: Api.GET_USER_ROLENAME,
    params: params,
  });

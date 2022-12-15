import { jmsfHttp } from '/@/utils/http/axios';
// import { useUserStoreWithOut } from '/@/store/modules/user';

// const userStore = useUserStoreWithOut();
// const marketId = userStore.getUserInfo.marketId; // ty_todo 添加市场id

enum Api {
  GetConfigList = '/api/web/conf/getDetailConfs',
  GetConfig = '/api/web/conf/getDetailConfs',
  GetFormData = '/api/web/detail/getDetailForm',
  GetForm = '/testpage/getForm',
  findDep = '/api/base/findDep', // 通过名字与ID关键字查询部门信息
  findByUserName = '/api/base/findByUserName', // 接车员：通过姓名查询员工信息(接车员)
  findJmsfCarType = '/api/base/findJmsfCarType', // 车型：通过关键字获取车型（默认全部）
  findCardCustomer = '/api/base/findCardCustomer', // 客户卡号：查询卡与客户信息(姓名，卡号，身份证)
  findProduct = '/api/base/findProduct', // 通过名字关键字查询商品与品类信息
  findDistrictByDepId = '/api/base/findDistrictByDepId', // 通过部门ID获取关联区域
  listProves = '/api/base/web/listProves', // 证明类型：获取市场的证明类型
  listGoodsTags = '/api/base/web/listGoodsTags', // 货物标签：获取市场的货物标签
}

export const findDep = (params) =>
  jmsfHttp.get({
    url: Api.findDep,
    params,
  });

export const findByUserName = (params) =>
  jmsfHttp.get({
    url: Api.findByUserName,
    params: {
      marketId: 1,
      name: params.name,
    },
  });

export const findJmsfCarType = (params) =>
  jmsfHttp.get({
    url: Api.findJmsfCarType,
    params,
  });

export const findCardCustomer = (data) =>
  jmsfHttp.post({
    url: Api.findCardCustomer,
    data,
  });

export const listProves = () => {
  jmsfHttp.get({
    url: Api.findProduct,
    params: {
      marketId: 1,
    },
  });
};

export const findProduct = (params) =>
  jmsfHttp.get({
    url: Api.findProduct,
    params: {
      keyword: params.keyword,
      marketId: 1,
    },
  });

export const findDistrictByDepId = (params) =>
  jmsfHttp.get({
    url: Api.findDistrictByDepId,
    params: {
      depId: params.depId,
      marketId: 1,
    },
  });

export const listGoodsTags = () =>
  jmsfHttp.get({
    url: Api.listGoodsTags,
    params: {
      marketId: 1,
    },
  });

export const getConfigList = () => jmsfHttp.get({ url: Api.GetConfigList });
export const getConfig = () => jmsfHttp.get({ url: Api.GetConfig });
export const getFormData = () => jmsfHttp.get({ url: Api.GetFormData });
export const getForm = () => jmsfHttp.get({ url: Api.GetForm });

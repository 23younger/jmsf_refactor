import { jmsfHttp } from '/@/utils/http/axios';
// import { useUserStoreWithOut } from '/@/store/modules/user';

// const userStore = useUserStoreWithOut();
// const marketId = userStore.getUserInfo.marketId; // ty_todo 添加市场id

enum Api {
  GetConfigList = '/api/web/conf/getDetailConfs',
  SaveOrUpdateDetailConf = '/api/web/conf/saveOrUpdateDetailConf',

  GetConfig = '/api/web/conf/getDetailConfs',
  GetFormData = '/api/web/detail/getDetailForm',
  GetForm = '/testpage/getForm',
  findDep = '/api/base/findDep', // 通过名字与ID关键字查询部门信息
  findByUserName = '/api/base/findByUserName', // 接车员：通过姓名查询员工信息(接车员)
  findJmsfCarType = '/api/base/findJmsfCarType', // 车型：通过关键字获取车型（默认全部）
  findCardCustomer = '/api/base/findCardCustomer', // 客户卡号：查询卡与客户信息(姓名，卡号，身份证)
  findProduct = '/api/base/findProduct', // 通过名字关键字查询商品与品类信息
  findDistrictByDepId = '/api/base/findDistrictByDepId', // 通过部门ID获取关联区域
  listProves = '/api/base/listProves', // 证明类型：获取市场的证明类型
  listGoodsTags = '/api/base/listGoodsTags', // 货物标签：获取市场的货物标签
  findWeighType = '/api/base/findWeighType', // 称重类型：获取市场的称重类型 ty_todo
  getStatus = '/api/base/getStatus', // 状态：进门单状态 ty_todo
  getTradeType = '/api/base/getTradeType', // 交易类型: 获取市场交易类型 ty_todo
}

enum ConfigApi {
  getSearchConf = '/api/web/conf/getOneQueryConf', // 获取列表页搜索条件配置
}

// ---------------------- 配置页 -------------------------
/**
 * 通过市场id获取详情页配置
 */
export const getConfigList = (functionType: string) =>
  jmsfHttp.get({
    url: Api.GetConfigList,
    params: {
      marketId: 1,
      functionType,
    },
  });

/**
 * 保存配置
 */
export const saveOrUpdateDetailConf = (params) =>
  jmsfHttp.get({
    url: Api.SaveOrUpdateDetailConf,
    params,
  });

/**
 * 列表搜索条件配置信息
 */
export const getSearchConf = () =>
  jmsfHttp.get({
    url: ConfigApi.getSearchConf,
    params: {
      id: 1, // ty_todo 用户id?
    },
  });

// --------------------- 列表页 -------------------------
export const findDep = () =>
  jmsfHttp.get({
    url: Api.findDep,
    params: {
      marketId: 1,
    },
    transformResponse: (res) => {
      res = JSON.parse(res);
      res.data = [{ id: '', depName: '--全部--' }].concat(res.data);
      return res;
    },
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
    transformResponse: (res) => {
      res = JSON.parse(res);
      res.data = [{ id: '', carTypeName: '--全部--' }].concat(res.data);
      return res;
    },
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
    transformResponse: (res) => {
      res = JSON.parse(res);
      res.data = [{ id: '', name: '--全部--' }].concat(res.data);
      return res;
    },
  });

export const findWeighType = () =>
  jmsfHttp.get({
    url: Api.findWeighType,
    params: {
      marketId: 1,
    },
    transformResponse: (res) => {
      res = JSON.parse(res);
      res.data = [{ id: '', name: '--全部--' }].concat(res.data);
      return res;
    },
  });

export const getStatus = () =>
  jmsfHttp.get({
    url: Api.getStatus,
    params: {
      marketId: 1,
    },
    transformResponse: (res) => {
      res = JSON.parse(res);
      res.data = [{ id: '', name: '--全部--' }].concat(res.data);
      return res;
    },
  });

export const getTradeType = () =>
  jmsfHttp.get({
    url: Api.getTradeType,
    params: {
      marketId: 1,
    },
    transformResponse: (res) => {
      res = JSON.parse(res);
      res.data = [{ id: '', name: '--全部--' }].concat(res.data);
      return res;
    },
  });

// ----------------------- 收费单详情 --------------------------
/**
 * 获取收费单配置
 */
export const getConfig = (functionType) =>
  jmsfHttp.get({
    url: Api.GetConfig,
    params: {
      marketId: 1,
      functionType,
    },
  });

export const getFormData = () => jmsfHttp.get({ url: Api.GetFormData });
export const getForm = () => jmsfHttp.get({ url: Api.GetForm });

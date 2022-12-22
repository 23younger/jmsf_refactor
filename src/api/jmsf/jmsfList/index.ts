import { jmsfHttp } from '/@/utils/http/axios';
// import { useUserStoreWithOut } from '/@/store/modules/user';

// const userStore = useUserStoreWithOut();
// const marketId = userStore.getUserInfo.marketId; // ty_todo 添加市场id

enum Api {
  // 表单配置页
  GetConfigList = '/api/web/conf/getDetailConfs',
  SaveOrUpdateDetailConf = '/api/web/conf/saveOrUpdateDetailConf',

  // 表单详情页
  GetConfig = '/api/web/conf/getDetailConfs', // 获取表单配置信息
  GetFormData = '/api/web/detail/getDetailForm', // 获取表单详情数据
  findCardCustomer = '/api/base/findCardCustomer', // 客户卡号：查询卡与客户信息(姓名，卡号，身份证)
  calcItems = '/calculate/calcItems', // 进门收费项目计算(未更正)
  calcItemsDiscount = '/calculate/calcItemsDiscount', // 进门收费项目，更正操作只计算优惠返点项目
  getPayTypes = '/api/base/getPayTypes', // 获取支付方式 ty_todo
  getAddress = '/api/base/address3', // 货物产地：通过关键字获取包含第三级城市地址
  findHandTeam = '/api/base/findHandTeam', // 装卸队：获取装卸队数据 ty_todo

  // 检索条件配置页
  getSearchConf = '/api/web/conf/getOneQueryConf', // 获取列表页搜索条件配置

  // 进门单列表页
  findDep = '/api/base/findDep', // 通过名字与ID关键字查询部门信息
  findDistrictByDepId = '/api/base/findDistrictByDepId', // 通过部门ID获取关联区域
  findByUserName = '/api/base/findByUserName', // 接车员：通过姓名查询员工信息(接车员)
  findJmsfCarType = '/api/base/findJmsfCarType', // 车型：通过关键字获取车型（默认全部）
  listProves = '/api/base/listProves', // 证明类型：获取市场的证明类型
  findProduct = '/api/base/findProduct', // 通过名字关键字查询商品与品类信息
  listGoodsTags = '/api/base/listGoodsTags', // 货物标签：获取市场的货物标签
  findWeighType = '/api/base/findWeighType', // 称重类型：获取市场的称重类型 ty_todo
  getStatus = '/api/base/getStatus', // 状态：进门单状态 ty_todo
  getTradeType = '/api/base/getTradeType', // 交易类型: 获取市场交易类型 ty_todo
}

/**
 * 表单配置页
 */
// 通过市场id获取详情页配置
export const getConfigList = (functionType: string) =>
  jmsfHttp.get({
    url: Api.GetConfigList,
    params: {
      marketId: 1,
      functionType,
    },
  });

// 保存配置
export const saveOrUpdateDetailConf = (params) =>
  jmsfHttp.get({
    url: Api.SaveOrUpdateDetailConf,
    params,
  });

/**
 * 表单详情页
 */
// 获取收费单配置
export const getConfig = (functionType) =>
  jmsfHttp.get({
    url: Api.GetConfig,
    params: {
      marketId: 1,
      functionType,
    },
  });

// 获取收费单数据
export const getFormData = (params) =>
  jmsfHttp.get({
    url: Api.GetFormData,
    params: {
      marketId: 1,
      id: params.id,
    },
  });

// 进门收费项目计算(未更正)
export const calcItems = (data) =>
  jmsfHttp.post({
    url: Api.calcItems,
    data,
  });

// 进门收费项目，更正操作只计算优惠返点项目
export const calcItemsDiscount = (data) =>
  jmsfHttp.post({
    url: Api.calcItemsDiscount,
    data,
  });

// 客户卡号：查询卡与客户信息(姓名，卡号，身份证)
export const findCardCustomer = (data) =>
  jmsfHttp.post({
    url: Api.findCardCustomer,
    data,
  });

// 支付方式：获取支付方式
export const getPayTypes = () =>
  jmsfHttp.get({
    url: Api.getPayTypes,
    params: {
      marketId: 1,
    },
  });

// 货物产地：通过关键字获取包含第三级城市地址
export const getAddress = (params) =>
  jmsfHttp.get({
    url: Api.getAddress,
    params: {
      keyword: params.keyword,
    },
  });

// 装卸队：获取装卸队数据
export const findHandTeam = (params) =>
  jmsfHttp.get({
    url: Api.findHandTeam,
    params,
  });

/**
 * 检索条件配置页
 */
// 获取检索条件配置
export const getSearchConf = () =>
  jmsfHttp.get({
    url: Api.getSearchConf,
    params: {
      id: 1, // ty_todo 用户id?
    },
  });

/**
 * 进门单列表页
 */
// 部门信息：通过名字与ID关键字查询
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

// 关联区域：通过部门ID获取
export const findDistrictByDepId = (params) =>
  jmsfHttp.get({
    url: Api.findDistrictByDepId,
    params: {
      depId: params.depId,
      marketId: 1,
    },
  });

// 接车员：通过姓名查询员工信息(接车员)
export const findByUserName = (params) =>
  jmsfHttp.get({
    url: Api.findByUserName,
    params: {
      marketId: 1,
      name: params.name,
    },
  });

// 车型：通过关键字获取车型（默认全部）
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

// 证明类型：获取市场的证明类型
export const listProves = () => {
  jmsfHttp.get({
    url: Api.findProduct,
    params: {
      marketId: 1,
    },
  });
};

// 商品信息、品类信息：通过名字关键字查询商品与品类信息
export const findProduct = (params) =>
  jmsfHttp.get({
    url: Api.findProduct,
    params: {
      keyword: params.keyword,
      marketId: 1,
    },
  });

// 货物标签：获取市场的货物标签
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

// 称重类型：获取市场的称重类型
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

// 状态：进门单状态
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

// 交易类型: 获取市场交易类型
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

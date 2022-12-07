import { jmsfHttp } from '/@/utils/http/axios';

enum Api {
  GetConfigList = '/api/web/conf/getDetailConfs',
  GetConfig = '/api/web/conf/getDetailConfs',
  GetFormData = '/api/web/detail/getDetailForm',
  GetForm = '/testpage/getForm',
}

enum API {
  findDep = '/api/base/findDep', // 通过名字与ID关键字查询部门信息
  findByUserName = '/api/base/findByUserName', // 通过姓名查询员工信息(接车员)
  findJmsfCarType = '/api/base/findJmsfCarType', // 通过关键字获取车型（默认全部）
  findCardCustomer = '/api/base/findCardCustomer', // 查询卡与客户信息(姓名，卡号，身份证)
  findProduct = '/api/base/findProduct', // 通过名字关键字查询商品与品类信息
  findDistrictByDepId = '/api/base/findDistrictByDepId', // 通过部门ID获取关联区域
}

export const findDep = (params) =>
  jmsfHttp.get({
    url: API.findDep,
    params,
  });

export const findByUserName = (params) =>
  jmsfHttp.get({
    url: API.findByUserName,
    params,
  });

export const findJmsfCarType = (params) =>
  jmsfHttp.get({
    url: API.findJmsfCarType,
    params,
  });

export const findCardCustomer = (data) =>
  jmsfHttp.post({
    url: API.findCardCustomer,
    data,
  });

export const findProduct = (params) =>
  jmsfHttp.get({
    url: API.findProduct,
    params,
  });

export const findDistrictByDepId = (params) =>
  jmsfHttp.get({
    url: API.findDistrictByDepId,
    params,
  });

export const getConfigList = () => jmsfHttp.get({ url: Api.GetConfigList });
export const getConfig = () => jmsfHttp.get({ url: Api.GetConfig });
export const getFormData = () => jmsfHttp.get({ url: Api.GetFormData });
export const getForm = () => jmsfHttp.get({ url: Api.GetForm });

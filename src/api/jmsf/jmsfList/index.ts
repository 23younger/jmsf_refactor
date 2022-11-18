import { jmsfHttp } from '/@/utils/http/axios';

enum Api {
  GetConfigList = '/getJmsfConfigList',
  GetForm = '/testpage/getForm',
}

export const getConfigList = () => jmsfHttp.get({ url: Api.GetConfigList });
export const getFormData = () => jmsfHttp.get({ url: Api.GetConfigList });
export const getForm = () => jmsfHttp.get({ url: Api.GetForm });

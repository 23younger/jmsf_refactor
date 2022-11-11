import { jmsfHttp } from '/@/utils/http/axios';

enum Api {
  GetConfigList = '/getFormData',
  GetForm = '/testpage/getForm',
}

export const getFormData = () => jmsfHttp.get({ url: Api.GetConfigList });
export const getForm = () => jmsfHttp.get({ url: Api.GetForm });

// 收费项
export interface ChargeItem {
  bizType: string;
  isEnable: number;
  code?: string;
  fixed?: number;
}

// 规则
export interface RuleBatchItem {
  marketId: number;
  businessType: string; //508
  chargeItem: number;
  conditionParams: [];
  calcParams?: [];
}

// 查询品类
export interface CategoryItem {
  keyword: string;
  marketId: number;
}

export interface CityItem {
  allLevelKeyword: string;
}

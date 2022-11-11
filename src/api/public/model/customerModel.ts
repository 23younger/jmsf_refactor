// 查询客户信息
export interface CustomerKeywordItem {
  customerKeywords?: string;
  state?: number;
}

// 查账户信息
export interface CustomerAccountItem {
  cardNo?: string;
  // 卡账户id
  accountId?: string;
  // 货主号
  ownerNo?: string;
}

export interface CustomerSimpleNormalItem {
  marketId?: number;
  id?: number;
}

export interface CustomerAllCardItem {
  customerIds?: [number];
}
export interface MarketItem {
  firmId: number;
}

export interface SystemUserItem {
  marketId: number;
  keyword?: string;
}

// 身份证号查所有客户
export interface IDCardCustomerItem {
  certificateNumberMatch: string;
}

// 身份证号查正常客户
export interface IDCardQueryCustomerItem {
  certificateNumberMatch: string;
}

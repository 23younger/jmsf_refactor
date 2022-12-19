// import { h } from 'vue';
import { dateUtil } from '/@/utils/dateUtil';
import {
  findDep,
  findDistrictByDepId,
  findJmsfCarType,
  findProduct,
  findWeighType,
  getStatus,
  getTradeType,
  listGoodsTags,
} from '/@/api/jmsf/jmsfList/index';
import type { BasicColumn, FormSchema } from '/@/components/Table';

interface btnList {
  icon?: string;
  text: string;
  value: string; // 功能类型
  pression?: string[]; // 可根据该项判断按钮是否disabled
  code?: string; // 按钮权限码
}

export const start = dateUtil(new Date())
  .set({
    date: dateUtil(new Date()).get('date') - 1,
    hour: 0,
    minute: 0,
    second: 0,
  })
  .format('YYYY-MM-DD HH:mm:ss');
export const end = dateUtil(new Date())
  .set({ hour: 23, minute: 59, second: 59 })
  .format('YYYY-MM-DD HH:mm:ss');

// 用于配置页面预览效果
export const configFormSchema: FormSchema[] = [
  {
    field: 'likePlate',
    label: '车号',
    component: 'Input',
  },
  {
    field: 'number',
    label: '收费单号',
    component: 'Input',
  },
  {
    field: 'productId',
    label: '商品',
    component: 'ApiAutoComplete',
  },
  {
    field: 'cashierName',
    label: '收费员',
    component: 'Input',
  },
  {
    field: 'customerName',
    label: '客户姓名',
    component: 'Input',
  },
  {
    field: 'ic',
    label: '客户卡号',
    component: 'Input',
  },
  {
    field: 'customerPhone',
    label: '客户手机',
    component: 'Input',
  },
  {
    field: 'tagId',
    label: '货物标签',
    component: 'ApiSelect',
    defaultValue: '--全部--',
  },
  {
    field: 'carTypeId',
    label: '车型',
    component: 'ApiSelect',
    defaultValue: '--全部--',
  },
  {
    field: 'categoryId',
    label: '货物品类',
    component: 'ApiSelect',
    defaultValue: '--全部--',
  },
  {
    field: 'depId',
    label: '接车部门',
    component: 'ApiSelect',
    defaultValue: '--全部--',
  },
  {
    field: 'regionId',
    label: '货物区域',
    component: 'Select',
    defaultValue: '--全部--',
  },
  {
    field: 'weighType',
    label: '称重类型',
    component: 'ApiSelect',
    defaultValue: '--全部--',
  },
  {
    field: 'status',
    label: '状态',
    component: 'ApiSelect',
    defaultValue: '--全部--',
  },
  {
    field: 'tareOperatorId',
    label: '皮重员',
    component: 'ApiAutoComplete',
  },
  {
    field: 'tradeTypeId',
    label: '交易类型',
    component: 'ApiSelect',
    defaultValue: '--全部--',
  },
  {
    field: 'enterTime',
    label: '进场时间',
    component: 'NewRangePicker',
    colProps: { span: 8 },
    defaultValue: [start, end],
  },
  {
    field: 'payTime',
    label: '交费时间',
    component: 'NewRangePicker',
    colProps: { span: 8 },
    defaultValue: [],
  },
  {
    field: 'refundTime',
    label: '退款时间',
    component: 'NewRangePicker',
    colProps: { span: 8 },
    defaultValue: [],
  },
];
// 列表页搜索条件
export const basicFormSchema: FormSchema[] = [
  {
    field: 'likePlate',
    label: '车号',
    component: 'Input',
  },
  {
    field: 'number',
    label: '收费单号',
    component: 'Input',
  },
  {
    field: 'productId',
    label: '商品',
    component: 'ApiAutoComplete',
    componentProps: {
      api: findProduct,
      valueField: 'id',
      valueFormat: 'name',
      searchKey: 'keyword',
      errTxt: '该品类名称不存在，请重新输入',
    },
  },
  {
    field: 'cashierName',
    label: '收费员',
    component: 'Input',
  },
  // {
  //   field: 'shipperName',
  //   label: '货主姓名',
  //   component: 'Input',
  // },
  {
    field: 'customerName',
    label: '客户姓名',
    component: 'Input',
  },
  {
    field: 'ic',
    label: '客户卡号',
    component: 'Input',
  },
  {
    field: 'customerPhone',
    label: '客户手机',
    component: 'Input',
  },
  {
    field: 'tagId',
    label: '货物标签',
    component: 'ApiSelect',
    componentProps: {
      api: listGoodsTags,
      labelField: 'name',
      valueField: 'id',
    },
    defaultValue: '',
  },
  {
    field: 'carTypeId',
    label: '车型',
    component: 'ApiSelect',
    componentProps: {
      api: findJmsfCarType,
      labelField: 'carTypeName',
      valueField: 'id',
    },
    defaultValue: '',
  },
  // ty_todo 接口未给
  {
    field: 'categoryId',
    label: '货物品类',
    component: 'ApiSelect',
    defaultValue: '--全部--',
  },
  // {
  //   field: 'productName',
  //   label: '商品名',
  //   component: 'ApiAutoComplete',
  // },
  // {
  //   field: 'passCheckTypeId',
  //   label: '通行证',
  //   component: 'Input',
  // },
  // {
  //   field: 'feeDepId',
  //   label: '收费部门',
  //   component: 'Input',
  // },
  // {
  //   field: 'tradeTypeId',
  //   label: '进厅状态',
  //   component: 'Input',
  // },
  {
    field: 'depId',
    label: '接车部门',
    component: 'ApiSelect',
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: findDep,
        labelField: 'depName',
        valueField: 'id',
        onChange: async (val) => {
          const res = await findDistrictByDepId({ depId: val });
          const data = res.map((v) => {
            return {
              label: v.name,
              value: v.id,
              key: v.id,
            };
          });
          formModel['regionId'] = '';
          const { updateSchema } = formActionType;
          updateSchema({
            field: 'regionId',
            componentProps: {
              options: [{ label: '--全部--', value: '', key: 0 }].concat(data),
            },
          });
        },
      };
    },
    defaultValue: '',
  },
  {
    field: 'regionId',
    label: '货物区域',
    component: 'Select',
  },
  {
    field: 'weighType',
    label: '称重类型',
    component: 'ApiSelect',
    componentProps: {
      api: findWeighType,
      labelField: 'name',
      valueField: 'id',
    },
    defaultValue: '',
  },
  {
    field: 'status',
    label: '状态',
    component: 'ApiSelect',
    componentProps: {
      api: getStatus,
      labelField: 'name',
      valueField: 'id',
    },
    defaultValue: '',
  },
  // ty_todo 待给皮重员查询接口
  {
    field: 'tareOperatorId',
    label: '皮重员',
    component: 'ApiAutoComplete',
    componentProps: {
      api: findProduct,
      valueField: 'id',
      valueFormat: 'name',
      searchKey: 'keyword',
      errTxt: '该皮重员不存在，请重新输入',
    },
  },
  {
    field: 'tradeTypeId',
    label: '交易类型',
    component: 'ApiSelect',
    componentProps: {
      api: getTradeType,
      labelField: 'name',
      valueField: 'id',
    },
    defaultValue: '',
  },
  // {
  //   field: 'overNow',
  //   label: '回皮超期',
  //   component: 'Input',
  // },
  {
    field: 'enterTime',
    label: '进场时间',
    component: 'NewRangePicker',
    colProps: { span: 8 },
    defaultValue: [start, end],
  },
  {
    field: 'payTime',
    label: '交费时间',
    component: 'NewRangePicker',
    colProps: { span: 8 },
    defaultValue: [],
  },
  {
    field: 'refundTime',
    label: '退款时间',
    component: 'NewRangePicker',
    colProps: { span: 8 },
    defaultValue: [],
  },
];
// 权限按钮
export const basicBtnList: btnList[] = [
  {
    icon: 'carbon:view',
    text: '查看',
    value: 'preview',
  },
  {
    icon: 'carbon:document-export',
    text: '导出',
    value: 'export',
  },
  {
    icon: 'bytesize:print',
    text: '补打',
    pression: ['已交费', '已冻结'],
    value: 'reprint',
  },
  {
    icon: 'akar-icons:edit',
    text: '修改',
    pression: ['待交费'],
    value: 'update',
  },
  {
    icon: 'ri:wechat-pay-fill',
    text: '缴费',
    pression: ['待交费'],
    value: 'pay',
  },
  {
    icon: 'ant-design:caret-right-filled',
    text: '解冻',
    pression: ['已冻结'],
    value: 'unfreeze',
  },
  {
    icon: 'akar-icons:edit',
    text: '更正',
    pression: ['待交费'],
    value: 'correct',
  },
  {
    icon: 'akar-icons:edit',
    text: '修正',
    pression: ['待交费'],
    value: 'amend',
  },
  {
    icon: 'fluent:calendar-cancel-16-regular',
    text: '作废',
    pression: ['待交费'],
    value: 'invalid',
  },
  {
    icon: 'ri:refund-2-line',
    text: '退款',
    pression: ['已交费'],
    value: 'refund',
  },
  {
    icon: 'bi:collection',
    text: '补录',
    pression: ['已交费', '已冻结', '已退款'],
    value: 'addRecord',
  },
  {
    icon: 'ri:refund-2-line',
    text: '退款补打',
    pression: ['已退款'],
    value: 'refund&reprint',
  },
  {
    icon: 'carbon:application-web',
    text: '作废申请',
    pression: ['已交费'],
    value: 'invalidApply',
  },
  {
    icon: 'carbon:application-web',
    text: '回皮申请',
    pression: ['待回皮'],
    value: 'skinReturnApply',
  },
  {
    icon: 'game-icons:archive-register',
    text: '离场防疫登记',
    pression: ['已交费', '已冻结', '已退款'],
    value: 'exitQuarantineRegistration',
  },
];
// 基础表格字段
export const basicColumnsData: BasicColumn[] = [
  {
    dataIndex: 'created',
    title: '进场时间',
    sorter: true,
  },
  {
    dataIndex: 'number',
    title: '收费单号',
    sorter: true,
  },
  {
    dataIndex: 'plate',
    title: '车号',
    sorter: true,
  },
  {
    dataIndex: 'trailerNumber',
    title: '挂号',
    sorter: true,
  },
  {
    dataIndex: 'tags',
    title: '货物标签',
    sorter: true,
  },
  {
    dataIndex: 'ic',
    title: '客户卡号',
    sorter: true,
  },
  {
    dataIndex: 'customerName',
    title: '客户',
    sorter: true,
  },
  {
    dataIndex: 'carTypeName',
    title: '车型',
    sorter: true,
  },
  {
    dataIndex: 'productName',
    title: '商品',
    sorter: true,
  },
  {
    dataIndex: 'productAlias',
    title: '商品别名',
    sorter: true,
  },
  {
    dataIndex: 'totalPrice',
    title: '总金额/元',
    sorter: true,
  },
  {
    dataIndex: 'paymentTime',
    title: '缴费时间',
    sorter: true,
  },
  {
    dataIndex: 'grossWeight',
    title: '毛重/KG',
    sorter: true,
  },
  {
    dataIndex: 'tareWeight',
    title: '皮重/KG',
    sorter: true,
  },
  {
    dataIndex: 'weight',
    title: '净重/KG',
    sorter: true,
  },
  {
    dataIndex: 'weight',
    title: '存皮重量/KG',
    sorter: true,
  },
  {
    dataIndex: 'productPrice',
    title: '单价',
    sorter: true,
  },
  {
    dataIndex: 'depName',
    title: '接车部门',
    sorter: true,
  },
  {
    dataIndex: 'feeDepName',
    title: '收费部门',
    sorter: true,
  },
  {
    dataIndex: 'type',
    title: '称重类型',
    sorter: true,
  },
  {
    dataIndex: 'tradeTypeName',
    title: '交易类型',
    sorter: true,
  },
  {
    dataIndex: 'status',
    title: '状态',
    sorter: true,
  },
  {
    dataIndex: 'goodsRemark',
    title: '称重备注',
    sorter: true,
  },
  {
    dataIndex: 'holdCardCustomerName',
    title: '持卡人姓名',
    sorter: true,
  },
  {
    dataIndex: 'holdCardCustomerPhone',
    title: '持卡人电话',
    sorter: true,
  },
  {
    dataIndex: 'grossPathName',
    title: '毛重通道',
    sorter: true,
  },
  {
    dataIndex: 'enFee_backSkinTwo',
    title: '二次回皮',
    sorter: true,
  },
  {
    dataIndex: 'passCheckName',
    title: '通行证',
    sorter: true,
  },
  {
    dataIndex: 'shipperName',
    title: '货主姓名',
    sorter: true,
  },
  {
    dataIndex: 'remark',
    title: '备注',
    sorter: true,
  },
  {
    dataIndex: 'payType',
    title: '支付方式',
    sorter: true,
  },
];
// test表格字段变化
export const testColumns: BasicColumn[] = [
  {
    dataIndex: 'created',
    title: '进场时间',
    sorter: true,
  },
  {
    dataIndex: 'number',
    title: '收费单号',
    sorter: true,
  },
  {
    dataIndex: 'plate',
    title: '车号',
    sorter: true,
  },
  {
    dataIndex: 'trailerNumber',
    title: '挂号',
    sorter: true,
  },
];

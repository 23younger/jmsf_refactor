import { FormSchema } from '/@/components/Form';
import { h } from 'vue';
import { viewImgs } from '../common';
import { Input, Button } from 'ant-design-vue';
import payTable from '../components/payTable.vue';
import { getPayTypes, listGoodsTags } from '/@/api/jmsf/jmsfList';

const colProps = {
  span: 6,
};

const colProps1 = {
  span: 4,
};

export const schemas_basicInfo: FormSchema[] = [
  {
    field: 'refs',
    label: '暂存实例',
    component: 'Render',
    ifShow: false,
  },
  {
    field: 'enFee_ic',
    component: 'Input',
    label: '客户卡号',
    itemProps: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    },
    colProps: {
      span: 12,
    },
    componentProps: {
      disabled: true,
      maxLength: 12,
    },
    required: true,
  },
  {
    field: 'enFee_customerName',
    component: 'Input',
    label: '客户姓名',
    colProps,
    componentProps: {
      disabled: true,
    },
    required: true,
  },
  {
    field: 'enFee_customerPhone',
    component: 'Input',
    label: '手机号码',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'balance',
    component: 'Input',
    colProps,
    label: '卡余额',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_payType',
    component: 'ApiSelect',
    label: '支付方式',
    colProps,
    componentProps: {
      disabled: true,
      api: getPayTypes,
      labelField: 'name',
      valueField: 'id',
    },
    defaultValue: 1,
  },
  {
    field: 'enFee_plate',
    component: 'Input',
    label: '车号',
    colProps,
    required: true,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_trailerNumber',
    component: 'Input',
    label: '挂号',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_cardType', // enFee.carTypeCode + enFee.carTypeName
    component: 'Input',
    label: '车型',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'detail_carTypeWeight',
    component: 'Input',
    label: '车型自重',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '公斤',
    },
  },
  {
    field: 'detail_storeTareWeight',
    component: 'Input',
    label: '存皮重量',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '公斤',
    },
  },
  {
    field: 'goods_proveTypeName',
    component: 'Input',
    label: '证明类型',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'wRecord_grossWeight',
    component: 'Input',
    label: '毛重',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '公斤',
    },
    required: ({ model }) => {
      return model['enFee_type'] == 1 ? true : false;
    },
  },
  {
    field: 'wRecord_tareWeight',
    component: 'Input',
    label: '皮重',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '公斤',
    },
    required: ({ model }) => {
      return model['enFee_type'] == 1 ? true : false;
    },
  },
  {
    field: 'goods_weight',
    component: 'Input',
    label: '净重',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '公斤',
    },
  },
  {
    field: 'goods_qty',
    component: 'Input',
    label: '件数',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '件',
    },
    required: ({ model }) => {
      return model['enFee_type'] == 2 ? true : false;
    },
  },
  {
    field: 'goods_itemWeight',
    component: 'Input',
    label: '件重',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '公斤',
    },
    required: ({ model }) => {
      return model['enFee_type'] == 2 ? true : false;
    },
  },
  {
    field: 'productPrice',
    component: 'Input',
    label: '单价',
    colProps,
    componentProps: {
      suffix: '元',
      disabled: true,
    },
  },
  {
    field: 'enFee_depName',
    component: 'Input',
    label: '接车部门',
    colProps,
    componentProps: {
      disabled: true,
    },
    required: true,
  },
  {
    field: 'region_Info',
    component: 'areaInfoComp',
    label: '货区区域',
    colProps,
    componentProps: {
      disabled: true,
    },
    required: true,
    rules: [
      {
        validator(_, value) {
          console.log('validate', value);
          if (value.id) {
            return Promise.resolve();
          } else {
            return Promise.reject('请填写货区区域');
          }
        },
      },
    ],
  },
  {
    field: 'goods_productName',
    component: 'Input',
    label: '商品',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'goods_origin',
    component: 'Input',
    label: '货物产地',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'tradeHall_tradeTypeName',
    component: 'Input',
    label: '交易类型',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'detail_goodsAllocation',
    component: 'Input',
    label: '有无摊位',
    colProps,
    render: ({ model, field }) => {
      return h(Input, { value: model[field] == 1 ? '有' : '无', disabled: true });
    },
  },
  {
    field: 'toll_sum',
    component: 'Input',
    label: '收费总额',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'frozen_amount',
    component: 'Input',
    label: '冻结金额',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_statusText',
    component: 'Input',
    label: '状态',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_created',
    component: 'Input',
    label: '进场时间',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_paymentTime',
    component: 'Input',
    label: '收费时间',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee.cashierName',
    component: 'Input',
    label: '收费员',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_backSkinTwo',
    component: 'Input',
    label: '二次回皮',
    colProps,
    render: ({ model, field }) => {
      return h(Input, { value: model[field] == 1 ? '是' : '否', disabled: true });
    },
  },
  {
    field: 'enFee_holdCardCustomerName',
    component: 'Input',
    label: '持卡人',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_holdCardCustomerPhone',
    component: 'Input',
    label: '持卡人电话',
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_remark',
    component: 'InputTextArea',
    label: '备注',
    itemProps: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    },
    colProps: {
      span: 12,
    },
    componentProps: {
      disabled: true,
      maxLength: 50,
      rows: 1,
    },
  },
  {
    field: 'goods_label',
    component: 'ApiSelect',
    label: '货物标签',
    colProps,
    componentProps: {
      api: listGoodsTags,
      labelField: 'name',
      valueField: 'id',
      disabled: true,
    },
    defaultValue: 1,
  },
];

export const schemas_payInfo: FormSchema[] = [
  {
    field: 'refs',
    label: '暂存实例',
    component: 'Render',
    ifShow: false,
  },
  {
    field: 'steveTeamOrder_steveTeam',
    component: 'Input',
    label: '装卸队',
    colProps: colProps1,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'steveTeamOrder_steveRatio',
    component: 'Input',
    colProps: colProps1,
    label: '装卸比例',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'dszxf',
    component: 'Input',
    colProps: colProps1,
    label: '代收装卸费',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'yszxf',
    component: 'Input',
    colProps: colProps1,
    label: '应收装卸费',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'zxxxglf',
    component: 'Input',
    colProps: colProps1,
    label: '装卸信息管理费',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'yfzxd',
    component: 'Input',
    colProps: colProps1,
    label: '应付装卸队',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'testtable',
    component: 'Input',
    label: '',
    itemProps: {
      labelCol: {
        span: 0,
      },
      wrapperCol: {
        span: 24,
      },
    },
    render: ({ model, field }) => {
      return h(payTable, { model, field });
    },
  },
];

export const schemas_otherInfo: FormSchema[] = [
  {
    field: 'refs',
    label: '暂存实例',
    component: 'Render',
    ifShow: false,
  },
  {
    field: 'totalAndFeeItem_receivableView',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '应收金额',
  },
  {
    field: 'totalAndFeeItem_discountView',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '优惠金额',
  },
  {
    field: 'totalAndFeeItem_collectionView',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '返点金额',
  },
  {
    field: 'category',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '商品品类',
  },
  {
    field: 'enFee_driverTel',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '司机手机',
  },
  {
    field: 'wRecord_operatorName',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '称重员',
  },
  {
    field: 'enFee_type',
    component: 'Select',
    colProps,
    label: '称重类型',
    componentProps: {
      disabled: true,
      options: [
        { label: '整车称重', value: '1', key: '1' },
        { label: '散件称重', value: '1', key: '1' },
        { label: '本地配送', value: '1', key: '1' },
        { label: '预过磅', value: '1', key: '1' },
      ],
    },
  },
  {
    field: 'wRecord_grossWeightDate',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '毛重时间',
  },
  {
    field: 'wRecord_tareWeightDate',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '皮重时间',
  },
  {
    field: 'grossPath',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '毛重通道',
  },
  {
    field: 'tarePath',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '皮重通道',
  },
  {
    field: 'wRecord_tareOperatorName',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '皮重员',
  },
  {
    field: 'wRecord_tareOperatorName',
    component: 'Input',
    colProps,
    label: '带货回皮',
    render: ({ model, field }) => {
      return h(Input, { value: model[field] == 1 ? '是' : '否', disabled: true });
    },
  },
  {
    field: 'goods.remark',
    component: 'InputTextArea',
    label: '称重备注',
    itemProps: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    },
    colProps: {
      span: 12,
    },
    componentProps: {
      disabled: true,
      maxLength: 50,
      rows: 1,
    },
  },
  {
    field: 'detail_inGreeterName',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '进门接车员',
  },
  {
    field: 'detail_outGreeterName',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '出门接车员',
  },
  {
    field: 'imgs',
    component: 'Input',
    colProps,
    label: '查看称重图片',
    render: ({ model, field }) => {
      return h(Button, { onClick: () => viewImgs(model[field]) }, () => h('span', {}, '点击查看'));
    },
  },
  {
    field: 'enFee_trxSumText',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '交易额',
  },
  {
    field: 'goods_shipperName',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '货主姓名',
  },
  {
    field: 'goods_shipperPhone',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '货主手机',
  },
  {
    field: 'enFee_feeDepName',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '收费部门',
  },
  // ty_todo 退款员、退款时间根据该收费单的状态判断是否展示(已退款即展示)
  {
    field: 'detail_operatorName',
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
    },
    label: '退款员',
  },
  {
    field: 'detail_operatorTime',
    component: 'Input',
    label: '退款时间',
    componentProps: {
      disabled: true,
    },
    colProps,
  },
];

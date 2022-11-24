import { FormSchema } from '/@/components/Form';
import { optionsListApi } from '/@/api/demo/select';
import { h } from 'vue';
import { handleParkCard } from './formAction';
import { Input } from 'ant-design-vue';

const colProps = {
  span: 6,
};

const colProps1 = {
  span: 4,
};

export const schemas_basicInfo: FormSchema[] = [
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
  },
  {
    field: 'enFee_payType',
    component: 'ApiSelect',
    label: '支付方式',
    colProps,
    componentProps: {
      getPopupContainer: () => {
        return document.body;
      },
      api: optionsListApi,
      optionFilterProp: 'label',
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
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
      suffix: '公斤',
    },
    required: ({ model }) => {
      return model['enFee_payType'] == 2 ? true : false;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 动态规则
      if (model['enFee_payType'] == 2) {
        return [{ required: true, message: '请输入毛重' }];
      }
      return [{ required: false }];
    },
  },
  {
    field: 'wRecord_tareWeight',
    component: 'Input',
    label: '皮重',
    colProps,
    componentProps: {
      suffix: '公斤',
    },
    required: ({ model }) => {
      return model['enFee_payType'] == 2 ? true : false;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 动态规则
      if (model['enFee_payType'] == 2) {
        return [{ required: true, message: '请输入皮重' }];
      }
      return [{ required: false }];
    },
  },
  {
    field: 'goods_weight',
    component: 'Input',
    label: '净重',
    colProps,
    componentProps: {
      suffix: '公斤',
    },
  },
  {
    field: 'goods_qty',
    component: 'Input',
    label: '件数',
    colProps,
    componentProps: {
      suffix: '件',
    },
    required: ({ model }) => {
      return model['enFee_payType'] == 2 ? true : false;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 动态规则
      if (model['enFee_payType'] == 2) {
        return [{ required: true, message: '请输入皮重' }];
      }
      return [{ required: false }];
    },
  },
  {
    field: 'goods_itemWeight',
    component: 'Input',
    label: '件重',
    colProps,
    componentProps: {
      suffix: '公斤',
    },
    required: ({ model }) => {
      return model['enFee_payType'] == 2 ? true : false;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 动态规则
      if (model['enFee_payType'] == 2) {
        return [{ required: true, message: '请输入皮重' }];
      }
      return [{ required: false }];
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
    component: 'ApiSelect',
    label: '接车部门',
    colProps,
    componentProps: ({ formModel }) => {
      return {
        disabled: true,
        getPopupContainer: () => {
          return document.body;
        },
        api: optionsListApi,
        optionFilterProp: 'label',
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
        onChange: (val) => {
          console.log('val', val);
          formModel['region_Info'] = {
            id: null,
            name: '',
            options: [
              {
                name: '货区3',
                number: '2345',
                id: 3,
              },
              {
                name: '货区4',
                number: '6789',
                id: 4,
              },
            ],
          };
        },
      };
    },
    required: true,
  },
  {
    field: 'region_Info',
    component: 'InputLinkSelect',
    label: '货区区域',
    colProps,
    componentProps: {
      // disabled: true,
    },
    itemProps: {
      validateFirst: false,
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
      // required: true,
    },
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
    component: 'ApiAutoComplete',
    label: '货物产地',
    colProps,
    componentProps: {
      popupContainerBody: true,
      api: optionsListApi,
      resultField: 'list',
      fieldKey: 'name',
      valueFormat: 'name',
      disabled: true,
    },
  },
  {
    field: 'tradeHall_tradeTypeName',
    component: 'ApiSelect',
    label: '交易类型',
    colProps,
    componentProps: {
      getPopupContainer: () => {
        return document.body;
      },
      api: optionsListApi,
      optionFilterProp: 'label',
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
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
    componentProps: ({ formModel }) => {
      return {
        disabled: true,
        suffix: () =>
          h('div', {}, [
            h(
              'span',
              {
                style: {
                  color: 'blue',
                  cursor: 'pointer',
                  marginRight: '5px',
                },
                onclick: () => {
                  handleParkCard('customerIc', formModel);
                },
              },
              '计算',
            ),
            h(
              'span',
              {
                style: {
                  color: 'blue',
                  cursor: 'pointer',
                },
              },
              '修改项目金额',
            ),
          ]),
      };
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
    component: 'NewDatePicker',
    componentProps: {
      disabled: true,
      showTime: {
        format: 'HH:mm:ss',
      },
    },
    label: '进场时间',
    colProps,
  },
  {
    field: 'enFee_paymentTime',
    component: 'NewDatePicker',
    componentProps: {
      disabled: true,
      showTime: {
        format: 'HH:mm:ss',
      },
    },
    label: '收费时间',
    colProps,
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
    component: 'Select',
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
      getPopupContainer: () => {
        return document.body;
      },
      api: optionsListApi,
      optionFilterProp: 'label',
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
      disabled: true,
    },
  },
];

export const schemas_payInfo: FormSchema[] = [
  {
    field: 'steveTeamOrder_steveTeam',
    component: 'ApiSelect',
    label: '装卸队',
    colProps: colProps1,
    componentProps: {
      getPopupContainer: () => {
        return document.body;
      },
      api: optionsListApi,
      optionFilterProp: 'label',
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
      disabled: true,
    },
  },
  {
    field: 'steveTeamOrder_steveRatio',
    component: 'Select',
    colProps: colProps1,
    label: '装卸比例',
    componentProps: {
      getPopupContainer: () => {
        return document.body;
      },
      options: [
        { key: '0', label: '请选择', value: '' },
        { key: '1', label: '10%', value: '10' },
        { key: '2', label: '20%', value: '20' },
        { key: '3', label: '30%', value: '30' },
        { key: '4', label: '40%', value: '40' },
        { key: '5', label: '50%', value: '50' },
        { key: '6', label: '60%', value: '60' },
        { key: '7', label: '70%', value: '70' },
        { key: '8', label: '80%', value: '80' },
        { key: '9', label: '90%', value: '90' },
        { key: '10', label: '100%', value: '100' },
      ],
      disabled: true,
    },
    defaultValue: '',
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
];

export const schemas_otherInfo: FormSchema[] = [
  {
    field: 'totalAndFeeItem_receivableView',
    component: 'Input',
    colProps,
    label: '应收金额',
  },
  {
    field: 'totalAndFeeItem_discountView',
    component: 'Input',
    colProps,
    label: '优惠金额',
  },
  {
    field: 'totalAndFeeItem_collectionView',
    component: 'Input',
    colProps,
    label: '返点金额',
  },
  {
    field: 'category',
    component: 'Input',
    colProps,
    label: '商品品类',
  },
  {
    field: 'enFee_driverTel',
    component: 'Input',
    colProps,
    label: '司机手机',
  },
  {
    field: 'wRecord_operatorName',
    component: 'Input',
    colProps,
    label: '称重员',
  },
  {
    field: 'enFee_type',
    component: 'Select',
    colProps,
    label: '称重类型',
    componentProps: {
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
    label: '毛重时间',
  },
  {
    field: 'wRecord_tareWeightDate',
    component: 'Input',
    colProps,
    label: '皮重时间',
  },
  {
    field: 'grossPath',
    component: 'Input',
    colProps,
    label: '毛重通道',
  },
  {
    field: 'tarePath',
    component: 'Input',
    colProps,
    label: '皮重通道',
  },
  {
    field: 'wRecord_tareOperatorName',
    component: 'Input',
    colProps,
    label: '皮重员',
  },
  {
    field: 'wRecord_tareOperatorName',
    component: 'Input',
    colProps,
    label: '带货回皮',
  },
];

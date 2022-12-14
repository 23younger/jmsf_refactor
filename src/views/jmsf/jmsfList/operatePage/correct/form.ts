import { FormSchema } from '/@/components/Form';
import { optionsListApi } from '/@/api/demo/select';
import { h } from 'vue';
import { handleParkCard, handleBankCard, handlePressEnter, viewImgs, calculate } from '../common';
import { Input, Button } from 'ant-design-vue';
import utils from '/@/utils/public';
import payTable from '../components/payTable.vue';
import {
  findByUserName,
  findDistrictByDepId,
  findJmsfCarType,
  findProduct,
  listProves,
  listGoodsTags,
} from '/@/api/jmsf/jmsfList';

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
    field: 'enFee_type',
    label: '称重类型',
    component: 'Input',
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
    componentProps: ({ formModel }) => {
      return {
        placeholder: '请输入客户卡号',
        maxLength: 12,
        onkeyup: (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
          if (e.target.value && e.keyCode == 13) {
            handlePressEnter(e.target.value, formModel); // 验证卡号，读取该卡号相关信息
          }
        },
        addonAfter: () =>
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
                  handleParkCard(formModel);
                },
              },
              '园区卡',
            ),
            h(
              'span',
              {
                style: {
                  color: 'blue',
                  cursor: 'pointer',
                },
                onclick: () => {
                  handleBankCard(formModel);
                },
              },
              '银行卡',
            ),
          ]),
      };
    },
    required: true,
    rules: [{ required: true }],
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
    rules: [{ required: true }],
  },
  {
    field: 'enFee_customerPhone',
    component: 'Input',
    label: '手机号码',
    colProps,
    componentProps: {
      disabled: true,
    },
    required: true,
    rules: [{ required: true }],
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
    label: '支付方式', // ty_todo 默认选择刷卡
    colProps,
    componentProps: {
      disabled: true,
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
    rules: [{ required: true }],
  },
  {
    field: 'enFee_plate',
    component: 'Input',
    label: '车号',
    colProps,
    componentProps: {
      maxLength: 8,
    },
    required: true,
    rules: [{ required: true }],
  },
  {
    field: 'enFee_trailerNumber',
    component: 'Input',
    label: '挂号',
    colProps,
    componentProps: {
      maxLength: 8,
    },
  },
  {
    field: 'enFee_cardType', // enFee.carTypeCode + enFee.carTypeName
    component: 'ApiAutoComplete',
    label: '车型',
    colProps,
    componentProps: ({ formModel }) => {
      return {
        api: findJmsfCarType,
        valueField: 'id',
        valueFormat: 'name',
        searchKey: 'keyword',
        errTxt: '该地域名称不存在，请重新输入',
        onChange: (_, val) => {
          formModel['detail_carTypeWeight'] = val.value;
        },
      };
    },
    required: ({ model }) => {
      return model['enFee_payType'] == 2 ? false : true;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 称重类型为散件时非必填
      if (model['enFee_payType'] == 2) {
        return [{ required: false }];
      }
      return [{ required: true, message: '请输入' }];
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
    component: 'ApiSelect',
    label: '证明类型',
    colProps,
    componentProps: {
      getPopupContainer: () => {
        return document.body;
      },
      api: listProves,
      optionFilterProp: 'label',
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'wRecord_grossWeight',
    component: 'Input',
    label: '毛重',
    colProps,
    componentProps: ({ formModel }) => {
      console.log('sdsdsdsd', formModel['enFee_type']);
      return {
        onkeyup: (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
          if (/^0/.test(e.target.value)) {
            e.target.value = '';
          }
        },
        disabled: formModel['enFee_type'] == 1 ? false : true,
        suffix: '公斤',
      };
    },
    required: ({ model }) => {
      return model['enFee_type'] == 1 ? true : false;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 称重类型为整车时必填
      if (model['enFee_type'] == 1) {
        return [
          { required: true, message: '请输入1-999999的整数' },
          {
            validator(_, value) {
              if (value && !/\b[1-9]\d{0,5}\b/.test(value)) {
                return Promise.reject('仅限输入1-999999的整数');
              } else {
                return Promise.resolve();
              }
            },
          },
        ];
      }
      return [{ required: false }];
    },
  },
  {
    field: 'wRecord_tareWeight',
    component: 'Input',
    label: '皮重',
    colProps,
    componentProps: ({ formModel }) => {
      return {
        onkeyup: (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
          if (/^0/.test(e.target.value)) {
            e.target.value = '';
          }
        },
        disabled: formModel['enFee_type'] == 1 ? false : true,
        suffix: '公斤',
      };
    },
    required: ({ model }) => {
      return model['enFee_type'] == 1 ? true : false;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 称重类型为整车时必填
      if (model['enFee_type'] == 1) {
        return [
          { required: true, message: '请输入1-999999的整数' },
          {
            validator(_, value) {
              if (value && !/\b[1-9]\d{0,5}\b/.test(value)) {
                return Promise.reject('仅限输入1-999999的整数');
              } else {
                return Promise.resolve();
              }
            },
          },
        ];
      }
      return [{ required: false }];
    },
  },
  {
    // 当称重类型=散件称重时，净重=件数*件重。
    // 当称重类型=整车称重时，净重=货物毛重-车辆皮重
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
    componentProps: ({ formModel }) => {
      return {
        onkeyup: (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
          if (/^0/.test(e.target.value)) {
            e.target.value = '';
          }
        },
        disabled: formModel['enFee_type'] == 1 ? true : false,
        suffix: '件',
      };
    },
    required: ({ model }) => {
      return model['enFee_payType'] == 2 ? true : false;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 称重类型为散件时必填
      if (model['enFee_type'] == 2) {
        return [
          { required: true, message: '请输入1-999999的整数' },
          {
            validator(_, value) {
              if (value && !/\b[1-9]\d{0,5}\b/.test(value)) {
                return Promise.reject('仅限输入1-999999的整数');
              } else {
                return Promise.resolve();
              }
            },
          },
        ];
      }
      return [{ required: false }];
    },
  },
  {
    field: 'goods_itemWeight',
    component: 'Input',
    label: '件重',
    colProps,
    componentProps: ({ formModel }) => {
      return {
        onkeyup: (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
          if (/^0/.test(e.target.value)) {
            e.target.value = '';
          }
        },
        disabled: formModel['enFee_type'] == 1 ? true : false,
        suffix: '公斤',
      };
    },
    required: ({ model }) => {
      return model['enFee_type'] == 2 ? true : false;
    },
    dynamicRules: ({ model }) => {
      // ty_todo 称重类型为整车时必填
      if (model['enFee_type'] == 2) {
        return [
          { required: true, message: '请输入1-999999的整数' },
          {
            validator(_, value) {
              if (value && !/\b[1-9]\d{0,5}\b/.test(value)) {
                return Promise.reject('仅限输入1-999999的整数');
              } else {
                return Promise.resolve();
              }
            },
          },
        ];
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
    required: true,
    rules: [{ required: true }],
  },
  {
    field: 'enFee_depName',
    component: 'ApiSelect',
    label: '接车部门',
    colProps,
    componentProps: ({ formModel }) => {
      return {
        getPopupContainer: () => {
          return document.body;
        },
        api: optionsListApi,
        optionFilterProp: 'label',
        resultField: 'list',
        labelField: 'name',
        valueField: 'id',
        onChange: async (val, row) => {
          console.log('val', val, row);
          const data = await findDistrictByDepId({ depId: val });
          console.log('region_Info', data);
          // ty_todo 将data处理赋值给region_Info的options
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
    rules: [{ required: true, message: '请选择接车部门' }],
  },
  {
    field: 'region_Info',
    component: 'areaInfoComp',
    label: '货区区域',
    colProps,
    componentProps: {
      // disabled: true,
    },
    rules: [
      {
        validator(_, value) {
          if (value.id) {
            return Promise.resolve();
          } else {
            return Promise.reject('请填写货区区域');
          }
        },
        trigger: 'blur',
      },
    ],
    required: true,
  },
  {
    field: 'goods_productName',
    component: 'ApiAutoComplete',
    label: '商品',
    colProps,
    componentProps: {
      api: findProduct,
      valueField: 'id',
      valueFormat: 'name',
      searchKey: 'keyword',
      errTxt: '该品类名称不存在，请重新输入',
    },
    required: true,
    rules: [{ required: true, message: '请输入品类名称' }],
  },
  {
    field: 'goods_origin',
    component: 'ApiAutoComplete',
    label: '货物产地',
    colProps,
    componentProps: {
      api: optionsListApi,
      resultField: 'list',
      valueField: 'id',
      valueFormat: 'name',
      searchKey: 'query',
      errTxt: '该地域名称不存在，请重新输入',
    },
    required: true,
    rules: [{ required: true, message: '请输入货物产地' }],
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
        suffix: '元',
        addonAfter: () =>
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
                  calculate(formModel);
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
                onclick: () => {
                  // ty_todo 点击后收费项目应收可编辑，复选框切换执行计算逻辑，
                  // 输入框失焦时进行新旧值判断看是否修改，修改的话进行计算逻辑，并加上【已更正】
                  // 更正后其他操作页面也得展示【已更正】
                  // 更正后，交费页面不再自动计算金额，需要手动点击计算按钮。
                  calculate(formModel);
                },
              },
              '修改项目金额',
            ),
          ]),
      };
    },
    required: true,
    rules: [{ required: true }],
    // defaultValue: utils.toThousands(123456789.012),
    defaultValue: utils.toThousands(123.148),
  },
  {
    field: 'frozen_amount',
    component: 'Input',
    label: '冻结金额',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '元',
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
    componentProps: {
      options: [
        { key: '1', label: '是', value: '1' },
        { key: '2', label: '否', value: '-1' },
      ],
    },
  },
  {
    field: 'enFee_holdCardCustomerName',
    component: 'Input',
    label: '持卡人', // ty_todo 根据读卡获取
    colProps,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'enFee_holdCardCustomerPhone',
    component: 'Input',
    label: '持卡人电话', // ty_todo 根据读卡获取
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
      maxLength: 40,
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
      api: listGoodsTags,
      optionFilterProp: 'label',
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
    },
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
        { label: '散件称重', value: '2', key: '2' },
        { label: '本地配送', value: '3', key: '3' },
        { label: '预过磅', value: '4', key: '4' },
      ],
    },
  },
  {
    field: 'wRecord_grossWeightDate',
    component: 'NewDatePicker',
    componentProps: {
      showTime: {
        format: 'HH:mm:ss',
      },
    },
    colProps,
    label: '毛重时间',
    required: true,
    rules: [{ required: true, message: '请填写毛重时间' }],
  },
  {
    field: 'wRecord_tareWeightDate',
    component: 'NewDatePicker',
    componentProps: {
      showTime: {
        format: 'HH:mm:ss',
      },
    },
    colProps,
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
    field: 'detail_bskinWithGoods',
    component: 'Select',
    componentProps: {
      options: [
        { key: '1', label: '是', value: '1' },
        { key: '2', label: '否', value: '2' },
      ],
    },
    colProps,
    label: '带货回皮',
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
      maxLength: 25,
      rows: 1,
    },
  },
  {
    field: 'detail_inGreeterName',
    component: 'ApiAutoComplete',
    colProps,
    componentProps: {
      api: findByUserName,
      valueField: 'id',
      valueFormat: 'name',
      searchKey: 'name',
      errTxt: '该进门接车员不存在，请重新输入',
    },
    label: '进门接车员',
    required: true,
    rules: [{ required: true, message: '请输入进门接车员' }],
  },
  {
    field: 'detail_outGreeterName',
    component: 'ApiAutoComplete',
    colProps,
    componentProps: {
      api: findByUserName,
      valueField: 'id',
      valueFormat: 'name',
      searchKey: 'name',
      errTxt: '该出门接车员不存在，请重新输入',
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
    field: 'enFee_trxSumText', // ty_todo 单价为空即为空 交易额=净重*单价 更正页点击计算触发更新该值
    component: 'Input',
    colProps,
    componentProps: {
      disabled: true,
      suffix: '元',
    },
    label: '交易额',
  },
  {
    field: 'goods_shipperName', // 可以输入客户姓名，手机号，身份证号模糊查询。
    component: 'ApiAutoComplete',
    colProps,
    componentProps: ({ formModel }) => {
      return {
        api: optionsListApi,
        resultField: 'list',
        valueField: 'id',
        valueFormat: 'name',
        searchKey: 'query',
        errTxt: '该货主不存在，请重新输入',
        onChange: (_, row) => {
          formModel['goods_shipperPhone'] = row.value;
        },
      };
    },
    label: '货主姓名',
  },
  {
    field: 'goods_shipperPhone', // 根据货主自动带出
    component: 'Input',
    colProps,
    componentProps: {
      maxLength: 13,
    },
    rules: [
      { max: 13, message: '请输入正确的手机号码' },
      {
        validator(_, value) {
          if (value && !/^\d+$/g.test(value)) {
            return Promise.reject('请输入正确的手机号码');
          } else {
            return Promise.resolve();
          }
        },
      },
    ],
    label: '货主手机',
  },
  {
    field: 'enFee_feeDepName',
    component: 'ApiSelect',
    colProps,
    componentProps: {
      api: optionsListApi,
      optionFilterProp: 'label',
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
    },
    label: '收费部门',
  },
];

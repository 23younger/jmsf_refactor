import { FormSchema } from '/@/components/Form';
import { optionsListApi } from '/@/api/demo/select';
import { h } from 'vue';
import { handleParkCard, handlePressEnter } from './formAction';

const colProps = {
  span: 6,
};

export const schemas: FormSchema[] = [
  {
    field: 'enFee_ic',
    component: 'Input',
    label: '客户卡号',
    colProps: {
      span: 7,
    },
    // disabledLabelWidth: true,
    itemProps: {
      labelCol: {
        span: 6,
      },
    },
    componentProps: ({ formModel }) => {
      return {
        placeholder: '请输入客户卡号',
        maxLength: 12,
        onkeyup: (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
          if (e.target.value && e.keyCode == 13) {
            handlePressEnter(e.target.value);
          }
        },
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
              '园区卡',
            ),
            h(
              'span',
              {
                style: {
                  color: 'blue',
                  cursor: 'pointer',
                },
              },
              '银行卡',
            ),
          ]),
      };
    },
    required: true,
  },
  {
    field: 'enFee_customerName',
    component: 'Input',
    label: '客户姓名',
    colProps,
    required: true,
  },
  {
    field: 'enFee_customerPhone',
    component: 'Input',
    colProps,
    label: '手机号码',
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
  },
  {
    field: 'enFee_plate',
    component: 'Input',
    label: '车号',
    colProps,
    required: true,
  },
  {
    field: 'enFee_trailerNumber',
    component: 'Input',
    label: '挂号',
    colProps,
  },
  {
    field: 'enFee_cardType', // enFee.carTypeCode + enFee.carTypeName
    component: 'Input',
    label: '车型',
    colProps,
  },
  {
    field: 'detail_carTypeWeight',
    component: 'Input',
    label: '车型自重',
    colProps,
    componentProps: {
      suffix: '公斤',
    },
  },
  {
    field: 'detail_storeTareWeight',
    component: 'Input',
    label: '存皮重量',
    colProps,
    componentProps: {
      suffix: '公斤',
    },
  },
  {
    field: 'goods_proveTypeName',
    component: 'Input',
    label: '证明类型',
    colProps,
  },
  {
    field: 'wRecord_grossWeight',
    component: 'Input',
    label: '毛重',
    colProps,
    componentProps: {
      suffix: '公斤',
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
  },
  {
    field: 'goods_itemWeight',
    component: 'Input',
    label: '件重',
    colProps,
    componentProps: {
      suffix: '公斤',
    },
  },
  {
    field: 'productPrice',
    component: 'Input',
    label: '单价',
    colProps,
    componentProps: {
      suffix: '元',
    },
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
    required: true,
    rules: [
      {
        validator(_, value) {
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
    },
  },
  {
    field: 'searchTime',
    component: 'NewDatePicker',
    componentProps: {
      showTime: {
        format: 'HH:mm:ss',
      },
    },
    label: '时间',
    colProps,
    // defaultValue: '2022-10-24 14:24:22',
    required: true,
    rules: [{ required: true, message: '请选择时间' }],
  },
  // {
  //   field: 'testSearch',
  //   label: '测试搜索',
  //   component: 'ApiAutoComplete',
  //   componentProps: {
  //     api: optionsListApi,
  //     resultField: 'list',
  //     valueKey: 'id',
  //     valueFormat: 'id|name',
  //   },
  //   defaultValue: '111111',
  // },
];

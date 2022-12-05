<template>
  <div class="content-wrapper">
    <div class="content-wrapper-header">
      车号：<h3>{{ headerRef.carNumber }}</h3> 收费单号：<h3>{{ headerRef.payNumber }}</h3>
      总金额：<h3>{{ headerRef.totalMoney }}</h3>
    </div>
    <Collapse
      v-model:activeKey="activeKey"
      :bordered="false"
      expandIconPosition="right"
      :style="{ background: '#ffffff' }"
      :expandIcon="cusExpandIcon"
    >
      <CollapsePanel key="basic" header="基础信息">
        <BasicForm ref="basicRef" @register="registerBasicInfo" :model="formModel" />
      </CollapsePanel>
      <CollapsePanel key="pay" header="费用信息">
        <BasicForm ref="payRef" @register="registerPayInfo" :model="formModel" />
      </CollapsePanel>
      <CollapsePanel key="other" header="其他信息">
        <BasicForm ref="otherRef" @register="registerOtherInfo" :model="formModel" />
      </CollapsePanel>
    </Collapse>
    <div class="btn-grp">
      <a-button @click="cancel">取消</a-button>
      <a-button @click="submit" type="primary">确定</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getFormData } from '/@/api/jmsf/jmsfList';
  import { cusExpandIcon } from '../common';
  import { Collapse, CollapsePanel } from 'ant-design-vue';
  import { onMounted, onUnmounted, ref, defineEmits } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { schemas_basicInfo, schemas_payInfo, schemas_otherInfo } from './form';
  const props = defineProps({
    id: String,
  });
  console.log('props', props);
  const emit = defineEmits(['set-modal']);
  const activeKey = ref(['basic', 'pay', 'other']);
  const basicInfo = ref([]);
  const payInfo = ref([]);
  const otherInfo = ref([]);
  const formModel = ref<any>({});
  const basicRef = ref();
  const payRef = ref();
  const otherRef = ref();
  const headerRef = ref({
    carNumber: '237',
    payNumber: '202210281400010',
    totalMoney: '55',
  });
  const [
    registerBasicInfo,
    { validate: validateBasicInfo, getFieldsValue: getFieldsValue_basicInfo },
  ] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
    schemas: schemas_basicInfo,
    showActionButtonGroup: false,
  });
  const [registerPayInfo, { validate: validatePayInfo, getFieldsValue: getFieldsValue_payInfo }] =
    useForm({
      labelCol: {
        span: 12,
      },
      wrapperCol: {
        span: 12,
      },
      schemas: schemas_payInfo,
      showActionButtonGroup: false,
    });
  const [
    registerOtherInfo,
    { validate: validateOtherInfo, getFieldsValue: getFieldsValue_otherInfo },
  ] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
    schemas: schemas_otherInfo,
    showActionButtonGroup: false,
  });
  // const calculate = () => {
  //   // 1、更新表格数据
  //   // 2、交费表格中收费项目应收多选框可以点击
  // };
  const cancel = () => {
    emit('set-modal', { visible: false });
  };
  const submit = () => {
    const result = getFieldsValue_basicInfo();
    const result1 = getFieldsValue_payInfo();
    const result2 = getFieldsValue_otherInfo();
    console.log('result', result, result1, result2);
    validateBasicInfo().then(
      (res) => {
        console.log('res', res);
      },
      (error) => {
        console.log('error', error);
      },
    );
    validatePayInfo().then((res) => {
      console.log('res', res);
    });
    validateOtherInfo().then((res) => {
      console.log('res', res);
    });
    // emit('set-modal', { visible: false });
  };
  onMounted(async () => {
    try {
      emit('set-modal', { loading: true });
      const config = await getFormData();
      basicInfo.value = config.basicInfo;
      payInfo.value = config.payInfo;
      otherInfo.value = config.otherInfo;
      formModel.value = {
        enFee_payType: '1',
        enFee_depName: '1',
        region_Info: {
          firstFetch: true,
          id: null,
          number: '',
          options: [
            {
              name: '货区1',
              number: '1234',
              id: 1,
            },
            {
              name: '货区2',
              number: '5678',
              id: 2,
            },
          ],
        },
        enFee_created: '2022-11-04 14:11:23',
        enFee_backSkinTwo: '',
        // toll_sum: '12345',
        testtable: '222',
        refs: {
          basicRef,
          payRef,
          otherRef,
          headerRef,
        },
      };
      emit('set-modal', { loading: false });
    } catch (error) {
      emit('set-modal', { loading: false });
    }
  });
  onUnmounted(() => {
    console.log('xiaohui');
  });
</script>

<style scoped lang="less">
  .content-wrapper {
    &-header {
      color: #000000;
      font-size: 14px;
      margin-bottom: 28px;

      h3 {
        display: inline-block;
        font-size: 18px;
        color: #000000;
        margin-right: 14px;
        margin-bottom: 0;

        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    .btn-grp {
      padding: 10px 0;
      text-align: right;
      button {
        margin-left: 8px;
      }
    }
  }

  ::v-deep(.ant-collapse-header) {
    background: #f0f3f6;
  }

  ::v-deep(.ant-collapse-content) {
    padding: 10px 0;
  }

  ::v-deep(.ant-input[disabled]) {
    color: #000;
  }
</style>

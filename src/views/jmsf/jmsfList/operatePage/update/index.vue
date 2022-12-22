<template>
  <div class="content-wrapper">
    <div class="content-wrapper-header">
      车号：<h3>237</h3> 收费单号：<h3>202210281400010</h3> 总金额：<h3>55</h3>
    </div>
    <Collapse
      v-model:activeKey="activeKey"
      :bordered="false"
      expandIconPosition="right"
      :style="{ background: '#ffffff' }"
      :expandIcon="cusExpandIcon"
    >
      <CollapsePanel key="basic" header="基础信息">
        <BasicForm @register="registerBasicInfo" :model="formModel" />
      </CollapsePanel>
      <CollapsePanel key="pay" header="费用信息">
        <BasicForm @register="registerPayInfo" />
      </CollapsePanel>
      <CollapsePanel key="other" header="其他信息">
        <BasicForm @register="registerOtherInfo" />
      </CollapsePanel>
    </Collapse>
    <div class="btn-grp">
      <a-button @click="cancel">取消</a-button>
      <a-button @click="submit" type="primary">确认</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { calcItems, getConfig, getFormData } from '/@/api/jmsf/jmsfList';
  import { cusExpandIcon } from '../common';
  import { Collapse, CollapsePanel } from 'ant-design-vue';
  import { onMounted, onUnmounted, ref, defineEmits } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { schemas_basicInfo, schemas_payInfo, schemas_otherInfo } from './form';
  import { isFunction } from '/@/utils/is';
  const props = defineProps({
    id: String,
  });
  const emit = defineEmits(['set-modal']);
  const activeKey = ref(['basic', 'pay', 'other']);
  const loading = ref<boolean>(false);
  const formModel = ref<object>({});
  const [
    registerBasicInfo,
    {
      validate: validateBasicInfo,
      getFieldsValue: getFieldsValue_basicInfo,
      resetSchema: resetBasicSchema,
    },
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
  const [
    registerPayInfo,
    {
      validate: validatePayInfo,
      getFieldsValue: getFieldsValue_payInfo,
      resetSchema: resetPaySchema,
    },
  ] = useForm({
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
    {
      validate: validateOtherInfo,
      getFieldsValue: getFieldsValue_otherInfo,
      resetSchema: resetOtherSchema,
    },
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
  const initData = async () => {
    // 1、读取基础数据
    const formData = await getFormData({
      id: props.id,
    });
    // 2、读取费用数据
    const calcResult = await calcItems({});
    console.log('calcResult', calcResult);
    // 2、处理数据
    formModel.value = {
      ...formData,
    };
  };
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
      // 1、读取配置
      const config = await getConfig('update');
      if (config && config.length) {
        const config_basic = config.filter((v) => v.groupType === 1);
        const config_pay = config.filter((v) => v.groupType === 2);
        const config_other = config.filter((v) => v.groupType === 3);
        const schemas_basic = config_basic.map((v) => {
          const schemas_item = schemas_basicInfo.find(($v) => $v.field === v.code);
          if (schemas_item && !isFunction(schemas_item.required)) {
            schemas_item.required = v.required;
          }
          return schemas_item;
        });
        const schemas_pay = config_pay.map((v) =>
          schemas_payInfo.find(($v) => $v.field === v.code),
        );
        const schemas_other = config_other.map((v) =>
          schemas_otherInfo.find(($v) => $v.field === v.code),
        );
        await resetBasicSchema(schemas_basic);
        await resetPaySchema(schemas_pay);
        await resetOtherSchema(schemas_other);

        initData();
      }
      loading.value = false;
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

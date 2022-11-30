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
        <BasicForm @register="registerBasicInfo" :model="formModel">
          <template #toll_sum="{ field, model }">
            <Input :value="model[field]">
              <template #addonAfter>
                <span style="color: blue" @click="calculate">计算</span>
              </template>
            </Input>
          </template>
        </BasicForm>
      </CollapsePanel>
      <CollapsePanel key="pay" header="费用信息">
        <BasicForm @register="registerPayInfo" />
        <div class="table-info-wrapper">
          <table class="ant-table ant-table-bordered">
            <thead class="ant-table-thead">
              <tr class="ant-table-row">
                <th scope="col">收费项目应收</th>
                <th scope="col">收费项目优惠1</th>
                <th scope="col">收费项目优惠2</th>
                <th scope="col">收费项目实收</th>
              </tr>
            </thead>
            <tbody class="ant-table-tbody">
              <tr class="ant-table-row">
                <td style="text-align: left; padding: 8px 4px">
                  <Checkbox />
                  <span style="margin: 0 6px">进门收费:</span>
                  <Input style="width: auto" :disabled="true" />
                </td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
              <tr class="ant-table-row">
                <td style="text-align: left; padding: 8px 4px">
                  <Checkbox />
                  <span style="margin: 0 6px">进门收费:</span>
                  <Input style="width: auto" :disabled="true" />
                </td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CollapsePanel>
      <CollapsePanel key="other" header="其他信息">
        <BasicForm @register="registerOtherInfo" />
      </CollapsePanel>
    </Collapse>
  </div>
  <a-button @click="submit">确认</a-button>
</template>

<script lang="ts" setup>
  import { getFormData } from '/@/api/jmsf/jmsfList';
  import { cusExpandIcon } from '../common';
  import { Collapse, CollapsePanel, Checkbox, Input } from 'ant-design-vue';
  import { onMounted, onUnmounted, ref, defineEmits } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { schemas_basicInfo, schemas_payInfo, schemas_otherInfo } from './form';
  const props = defineProps({
    id: String,
  });
  console.log('props', props);
  const emit = defineEmits(['set-modal']);
  const activeKey = ref(['basic', 'pay', 'other']);
  const loading = ref<boolean>(false);
  const basicInfo = ref([]);
  const payInfo = ref([]);
  const otherInfo = ref([]);
  const formModel = ref<any>({});
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
  const calculate = () => {
    // 1、更新表格数据
    // 2、交费表格中收费项目应收多选框可以点击
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
      loading.value = false;
      formModel.value = {
        enFee_payType: '2',
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
        enFee_backSkinTwo: '0',
        toll_sum: '12345',
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

  .ant-table {
    text-align: center;
    width: 100%;
    border: 1px solid #f0f0f0;

    .ant-table-thead tr th {
      text-align: center;
    }

    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      width: 25%;
      padding: 8px 0;
    }
  }
</style>

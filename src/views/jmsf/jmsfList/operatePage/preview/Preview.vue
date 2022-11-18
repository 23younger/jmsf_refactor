<template>
  <BasicModal
    v-bind="$attrs"
    defaultFullscreen
    @register="register"
    @visible-change="handleChange"
    @ok="handleOk"
  >
    <div class="content-wrapper">
      <div class="content-wrapper-header">
        <h3>车号：237</h3>
        <h3>收费单号：202210281400010</h3>
        <h3>总金额：55</h3>
      </div>
      <Collapse v-model:activeKey="activeKey">
        <CollapsePanel key="1" header="基础信息">
          <BasicForm @register="registerBasicInfo" :model="formModel" />
        </CollapsePanel>
        <CollapsePanel key="2" header="费用信息">
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
                    <Checkbox />进门收费:<Input style="width: auto" />
                  </td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
                <tr class="ant-table-row">
                  <td style="text-align: left; padding: 8px 4px">
                    <Checkbox />进门收费:<Input style="width: auto" />
                  </td>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CollapsePanel>
        <CollapsePanel key="3" header="其他信息">
          <p>qwert</p>
        </CollapsePanel>
      </Collapse>
    </div>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { getFormData } from '/@/api/jmsf/jmsfList';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Collapse, CollapsePanel, Checkbox, Input } from 'ant-design-vue';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { BasicForm, useForm, useComponentRegister } from '/@/components/Form';
  import { schemas_basicInfo, schemas_payInfo } from './form';
  import InputLinkSelect from '../../../components/InputLinkSelect.vue';
  const activeKey = ref(['1', '2', '3']);
  const loading = ref<boolean>(false);
  const basicInfo = ref([]);
  const payInfo = ref([]);
  const otherInfo = ref([]);
  const formModel = ref<object>({});
  const [register, { setModalProps }] = useModalInner();
  useComponentRegister('InputLinkSelect', InputLinkSelect);
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
      // showResetButton: false,
      // showSubmitButton: false,
    });
  const handleChange = async (visible: boolean) => {
    if (visible) {
      setModalProps({ loading: true });
      const config = await getFormData();
      basicInfo.value = config.basicInfo;
      payInfo.value = config.payInfo;
      otherInfo.value = config.otherInfo;
      loading.value = false;
      formModel.value = {
        enFee_depName: 1,
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
      };
      setModalProps({ loading: false });
    } else {
      formModel.value = {};
    }
  };
  const handleOk = () => {
    const result = getFieldsValue_basicInfo();
    const result1 = getFieldsValue_payInfo();
    console.log('result', result, result1);
    validateBasicInfo().then((res) => {
      console.log('res', res);
    });
    validatePayInfo().then((res) => {
      console.log('res', res);
    });
  };
  onMounted(async () => {
    console.log('mount.....');
    try {
      loading.value = true;
    } catch (error) {
      loading.value = false;
    }
  });
  onUnmounted(() => {
    console.log('xiaohui');
  });
</script>

<style scoped lang="less">
  .content-wrapper {
    &-header {
      color: red;
      font-size: 20px;

      h3 {
        display: inline-block;
        margin-left: 20px;
        color: red;

        &:first-of-type {
          margin-left: 0;
        }
      }
    }
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

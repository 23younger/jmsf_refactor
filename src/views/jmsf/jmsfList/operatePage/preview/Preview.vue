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
          <p>qwert</p>
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
  import { Collapse, CollapsePanel } from 'ant-design-vue';
  import { onMounted, onUnmounted, ref } from 'vue';
  import { BasicForm, useForm, useComponentRegister } from '/@/components/Form';
  import { schemas } from './form';
  import InputLinkSelect from '../../../components/InputLinkSelect.vue';
  const activeKey = ref(['1', '2', '3']);
  const loading = ref<boolean>(false);
  const basicInfo = ref([]);
  const payInfo = ref([]);
  const otherInfo = ref([]);
  const formModel = ref<object>({});
  const [register, { setModalProps }] = useModalInner();
  useComponentRegister('InputLinkSelect', InputLinkSelect);
  const [registerBasicInfo, { validate: validateBasicInfo, getFieldsValue, setFieldsValue }] =
    useForm({
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
      schemas: schemas,
      showResetButton: false,
      showSubmitButton: false,
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
        searchTime: '2022-11-04 14:11:23',
      };
      setModalProps({ loading: false });
    } else {
      formModel.value = {};
    }
  };
  const handleOk = () => {
    const result = getFieldsValue();
    console.log('result', result);
    validateBasicInfo().then((res) => {
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
</style>

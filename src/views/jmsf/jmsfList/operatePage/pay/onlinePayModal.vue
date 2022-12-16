<template>
  <BasicModal
    :title="modalInfo.title"
    v-bind="$attrs"
    :can-fullscreen="false"
    @register="register"
    @visible-change="handleChange"
    :show-ok-btn="false"
  >
    <BasicForm @register="registerForm" :model="formModel" />
    <!-- case1 -->
    <Row>
      <Col :offset="4" class="tip">请扫码</Col>
    </Row>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, toRaw, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Row, Col } from 'ant-design-vue';
  const formModel = ref<any>({});
  const emit = defineEmits(['register', 'callback']);
  const modalInfo = ref({
    type: '',
    title: '',
    id: '',
    money: '',
  });
  const updateModalInfo = (data) => {
    console.log('paymodal-data', toRaw(data));
    data = toRaw(data);
    modalInfo.value = data;
    formModel.value = {
      money: data.money,
    };
    // ty_todo 轮询支付状态
  };
  const [register] = useModalInner(updateModalInfo);
  const [registerForm] = useForm({
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
    schemas: [
      {
        field: 'money',
        component: 'Input',
        componentProps: {
          disabled: true,
          suffix: '元',
        },
        label: '支付金额',
      },
    ],
    showActionButtonGroup: false,
  });
  const handleChange = async (visible: boolean) => {
    if (visible) {
    } else {
      // ty_todo 关闭缴费弹窗回到列表页
      // 关闭轮询，
      emit('callback', modalInfo.value.type);
      modalInfo.value = {
        type: '',
        title: '',
        id: '',
        money: '',
      };
    }
  };
  // ty_todo 轮询查找支付状态
  // const queryPayStatus = () => {};
</script>

<style scoped lang="less">
  .tip {
    font-size: 20px;
  }

  ::v-deep(.ant-input[disabled]) {
    color: red;
  }
</style>

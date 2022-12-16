<template>
  <BasicModal
    :title="modalInfo.title"
    v-bind="$attrs"
    :can-fullscreen="false"
    :ok-text="'支付(enter)'"
    @register="register"
    @ok="handlePay"
  >
    <BasicForm @register="registerForm" :model="formModel" />
    <!-- case1 -->
    <p class="error-tip">密码错误，请重新点击输入密码！</p>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, toRaw, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { schemas_payModal } from './form';
  const formModel = ref<any>({});
  const emit = defineEmits(['register', 'callback']);
  const modalInfo = ref({
    type: '',
    title: '',
    id: '',
    money: '',
    name: '',
    card: '',
    password: '',
  });
  const updateModalInfo = (data) => {
    console.log('paymodal-data', toRaw(data));
    data = toRaw(data);
    modalInfo.value = data;
    formModel.value = {
      money: data.money,
      name: data.name,
      card: data.card,
    };
  };
  const [register, { closeModal }] = useModalInner(updateModalInfo);
  const [registerForm, { getFieldsValue }] = useForm({
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
    schemas: schemas_payModal,
    showActionButtonGroup: false,
  });
  const handlePay = () => {
    closeModal();
    return;
    const result = getFieldsValue();
    console.log('handlepay...', result);
    // case1 密码错误，请重新点击输入密码！
    // case2 收费单交费失败：密码输入错误次数已超过限制！(返回列表页)
    // case3 收费单交费失败：xxx！(返回列表页)
    // case4 收费单交费成功！=> 点击确定关闭弹窗同时系统自动打印票据 (返回列表页)
    emit('callback');
  };
</script>

<style scoped lang="less">
  .error-tip {
    text-align: right;
    color: red;
    font-size: 12px;
  }

  ::v-deep(.ant-input[disabled]) {
    color: black;
  }

  ::v-deep(.money-class .ant-input[disabled]) {
    color: red;
  }
</style>

<template>
  <BasicModal
    :title="modalInfo.title"
    v-bind="$attrs"
    defaultFullscreen
    @register="register"
    @visible-change="handleChange"
    :show-cancel-btn="false"
    :show-ok-btn="false"
    :footer="null"
  >
    <Update v-if="modalInfo.type === 'update'" @set-modal="setModalProps" :id="modalInfo.id" />
    <Preview v-if="modalInfo.type === 'preview'" @set-modal="setModalProps" :id="modalInfo.id" />
    <PayFee v-if="modalInfo.type === 'payFee'" @set-modal="setModalProps" :id="modalInfo.id" />
    <Unfreeze v-if="modalInfo.type === 'unfreeze'" @set-modal="setModalProps" :id="modalInfo.id" />
    <Correct v-if="modalInfo.type === 'correct'" @set-modal="setModalProps" :id="modalInfo.id" />
    <Amend v-if="modalInfo.type === 'amend'" @set-modal="setModalProps" :id="modalInfo.id" />
    <Invalid v-if="modalInfo.type === 'invalid'" @set-modal="setModalProps" :id="modalInfo.id" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, toRaw, defineEmits } from 'vue';
  import Preview from './preview/index.vue';
  import Update from './update/index.vue';
  import PayFee from './payFee/index.vue';
  import Unfreeze from './unfreeze/index.vue';
  import Correct from './correct/index.vue';
  import Amend from './amend/index.vue';
  import Invalid from './invalid/index.vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import InputLinkSelect from '../../components/InputLinkSelect.vue';
  import { useComponentRegister } from '/@/components/Form';

  useComponentRegister('InputLinkSelect', InputLinkSelect);

  const emit = defineEmits(['register', 'callback']);
  const modalInfo = ref({
    type: '',
    title: '',
    id: '',
  });
  const updateModalInfo = (data) => {
    console.log('updateModalInfo-data', toRaw(data));
    modalInfo.value = toRaw(data);
  };
  const [register, { setModalProps }] = useModalInner(updateModalInfo);
  const handleChange = async (visible: boolean) => {
    if (visible) {
      console.log('data', modalInfo.value);
    } else {
      // 用于返回列表后判断是否需要更新列表
      emit('callback', modalInfo.value.type);
      modalInfo.value = {
        type: '',
        title: '',
        id: '',
      };
      console.log('close', modalInfo.value);
    }
  };
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

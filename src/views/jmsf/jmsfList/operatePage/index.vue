<template>
  <BasicModal
    :title="modalInfo.title"
    v-bind="$attrs"
    defaultFullscreen
    :can-fullscreen="false"
    @register="register"
    @visible-change="handleChange"
    :show-cancel-btn="false"
    :show-ok-btn="false"
    :footer="null"
  >
    <Preview v-if="modalInfo.type === 'preview'" @set-modal="setModalProps" :id="modalInfo.id" />
    <Update
      v-if="modalInfo.type === 'update'"
      @set-modal="setModalProps"
      @set-refresh="updateShouldRefreshList"
      :id="modalInfo.id"
    />
    <Pay
      v-if="modalInfo.type === 'pay'"
      @set-modal="setModalProps"
      @set-refresh="updateShouldRefreshList"
      :id="modalInfo.id"
    />
    <Unfreeze
      v-if="modalInfo.type === 'unfreeze'"
      @set-modal="setModalProps"
      @set-refresh="updateShouldRefreshList"
      :id="modalInfo.id"
    />
    <Correct
      v-if="modalInfo.type === 'correct'"
      @set-modal="setModalProps"
      @set-refresh="updateShouldRefreshList"
      :id="modalInfo.id"
    />
    <Amend
      v-if="modalInfo.type === 'amend'"
      @set-modal="setModalProps"
      @set-refresh="updateShouldRefreshList"
      :id="modalInfo.id"
    />
    <Invalid
      v-if="modalInfo.type === 'invalid'"
      @set-modal="setModalProps"
      @set-refresh="updateShouldRefreshList"
      :id="modalInfo.id"
    />
    <Refund
      v-if="modalInfo.type === 'refund'"
      @set-modal="setModalProps"
      @set-refresh="updateShouldRefreshList"
      :id="modalInfo.id"
    />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, toRaw, defineEmits, unref } from 'vue';
  import Preview from './preview/index.vue';
  import Update from './update/index.vue';
  import Pay from './pay/index.vue';
  import Unfreeze from './unfreeze/index.vue';
  import Correct from './correct/index.vue';
  import Amend from './amend/index.vue';
  import Invalid from './invalid/index.vue';
  import Refund from './refund/index.vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import areaInfoComp from '../../components/areaInfoComp.vue';
  import { useComponentRegister } from '/@/components/Form';

  useComponentRegister('areaInfoComp', areaInfoComp);

  const emit = defineEmits(['register', 'callback']);
  const modalInfo = ref({
    type: '',
    title: '',
    id: '',
  });
  const shouldRefreshList = ref<boolean>(false);
  const updateModalInfo = (data) => {
    console.log('updateModalInfo-data', toRaw(data));
    modalInfo.value = toRaw(data);
  };
  const updateShouldRefreshList = (bool: boolean) => {
    shouldRefreshList.value = bool;
  };
  const [register, { setModalProps }] = useModalInner(updateModalInfo);
  const handleChange = async (visible: boolean) => {
    if (visible) {
      console.log('data', modalInfo.value);
    } else {
      // ty_todo ???????????????????????????????????????????????????
      emit('callback', toRaw(unref(shouldRefreshList)));
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

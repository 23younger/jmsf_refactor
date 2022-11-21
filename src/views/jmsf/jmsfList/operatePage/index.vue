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
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, toRaw } from 'vue';
  import Preview from './preview/index.vue';
  import Update from './update/index.vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
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

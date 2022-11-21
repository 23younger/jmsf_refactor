<template>
  <RadioGroup v-model:value="operateType" @click="triggerOperate">
    <RadioButton value="preview">查看</RadioButton>
    <RadioButton value="update">编辑</RadioButton>
    <RadioButton value="correct">修正</RadioButton>
  </RadioGroup>
  <OperateModal @register="registerPreviewModal" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { RadioGroup, RadioButton } from 'ant-design-vue';
  import OperateModal from './operatePage/index.vue';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: 'JmsfList',
    components: {
      RadioGroup,
      RadioButton,
      OperateModal,
    },
    setup() {
      const operateType = ref<string>('');
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
      const triggerOperate = (e) => {
        const type = e.target.value;
        switch (type) {
          case 'preview':
            openPreviewModal(true, {
              type: 'preview',
              title: '查看',
              id: '1',
            });
            break;
          case 'update':
            openPreviewModal(true, {
              type: 'update',
              title: '修改',
              id: '2',
            });
            break;
          default:
            break;
        }
      };
      return {
        operateType,
        triggerOperate,
        registerPreviewModal,
      };
    },
  });
</script>

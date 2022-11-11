<template>
  <RadioGroup v-model:value="operateType" @click="triggerOperate">
    <RadioButton value="preview">查看</RadioButton>
    <RadioButton value="edit">编辑</RadioButton>
    <RadioButton value="correct">修正</RadioButton>
  </RadioGroup>
  <PreviewModal @register="registerPreviewModal" title="查看" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { RadioGroup, RadioButton } from 'ant-design-vue';
  import PreviewModal from './operatePage/preview/Preview.vue';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: 'JmsfList',
    components: {
      RadioGroup,
      RadioButton,
      PreviewModal,
    },
    setup() {
      const operateType = ref<string>('');
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
      const triggerOperate = (e) => {
        const type = e.target.value;
        switch (type) {
          case 'preview':
            openPreviewModal(true);
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

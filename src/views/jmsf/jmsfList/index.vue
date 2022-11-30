<template>
  <RadioGroup v-model:value="operateType" @click="triggerOperate">
    <RadioButton value="preview">查看</RadioButton>
    <RadioButton value="update">编辑</RadioButton>
    <RadioButton value="payFee">交费</RadioButton>
  </RadioGroup>
  <OperateModal @register="registerOperateModal" @callback="callback" />
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
      const [registerOperateModal, { openModal: openOperateModal }] = useModal();
      const triggerOperate = (e) => {
        const type = e.target.value;
        switch (type) {
          case 'preview':
            openOperateModal(true, {
              type: 'preview',
              title: '查看',
              id: '1',
            });
            break;
          case 'update':
            openOperateModal(true, {
              type: 'update',
              title: '修改',
              id: '2',
            });
            break;
          case 'payFee':
            openOperateModal(true, {
              type: 'payFee',
              title: '交费',
              id: '3',
            });
            break;
          default:
            break;
        }
      };
      const callback = (type) => {
        console.log('type', type);
      };
      return {
        operateType,
        triggerOperate,
        registerOperateModal,
        callback,
      };
    },
  });
</script>

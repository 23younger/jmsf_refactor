<template>
  <DatePicker
    v-bind="$attrs"
    @change="onChange"
    @openChange="onOpenChange"
    v-model:value="state"
    :valueFormat="'YYYY-MM-DD HH:mm:ss'"
    :inputPrefixCls="inputClass"
  />
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, onMounted, onUnmounted, unref } from 'vue';
  import { DatePicker } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  export default defineComponent({
    name: 'NewDatePciker',
    components: {
      DatePicker,
    },
    props: {
      value: String,
    },
    emits: ['change'],
    setup(props) {
      const emitData = ref<any>({});
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);
      const randomClass = `newDatePicker-${Math.floor(Math.random() * 1000)}`;
      const inputClass = `ant-input ${randomClass}`;
      const inputSelStart = ref<number>(0);

      function listenerPanelInput(e: any) {
        const { value, selectionStart } = e.target;
        const reg =
          /^\d{4}([-])(1[0-2]|0[1-9])\1(0[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
        if (reg.test(value)) {
          setRange(selectionStart, e.target);
        }
      }

      function listenerOuterInput(e: any) {
        const { selectionStart } = e.target;
        inputSelStart.value = selectionStart;
      }

      function panelOnInput(e: any) {
        const { value, selectionStart } = e.target;
        const reg =
          /^\d{4}([-])(1[0-2]|0[1-9])\1(0[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
        if (reg.test(value)) {
          setRange(selectionStart + 1, e.target);
        }
      }

      function onChange(_: any, value: any) {
        emitData.value = value;
      }
      function onOpenChange(e: any) {
        if (e) {
          // 打开面板
          nextTick(() => {
            const antdInput = document.querySelector('.ant-calendar-input ') as HTMLInputElement;
            setRange(unref(inputSelStart), antdInput);
            inputSelStart.value = 0;
            antdInput?.addEventListener('click', listenerPanelInput);
            antdInput?.addEventListener('input', panelOnInput);
          });
        } else {
          // 关闭面板
          const antdInput = document.querySelector('.ant-calendar-input ');
          antdInput?.removeEventListener('click', listenerPanelInput);
          antdInput?.removeEventListener('input', panelOnInput);
        }
      }

      onMounted(() => {
        nextTick(() => {
          const antDateInput = document.querySelector(`.${randomClass}`);
          antDateInput?.addEventListener('click', listenerOuterInput);
        });
      });

      onUnmounted(() => {
        const antDateInput = document.querySelector(`.${randomClass}`);
        antDateInput?.removeEventListener('click', listenerOuterInput);
      });

      function setRange(index: number, dom: any) {
        if (index <= 4) {
          dom.setSelectionRange(0, 4);
        } else if (index <= 7) {
          dom.setSelectionRange(5, 7);
        } else if (index <= 10) {
          dom.setSelectionRange(8, 10);
        } else if (index <= 13) {
          dom.setSelectionRange(11, 13);
        } else if (index <= 16) {
          dom.setSelectionRange(14, 16);
        } else if (index <= 19) {
          dom.setSelectionRange(17, 19);
        }
      }

      return { state, inputClass, onChange, onOpenChange };
    },
  });
</script>

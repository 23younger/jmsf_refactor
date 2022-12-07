<template>
  <div class="time-box">
    <NewDatePicker
      class="time-item"
      v-bind="$attrs"
      show-time
      :disabled="disabled"
      v-model:value="state[0]"
      placeholder="请选择时间"
      @ok="() => timeChange('startTime')"
      @change="() => timeChange('startTime')"
    />
    至
    <NewDatePicker
      class="time-item"
      v-bind="$attrs"
      show-time
      :disabled="disabled"
      v-model:value="state[1]"
      placeholder="请选择时间"
      @ok="() => timeChange('endTime')"
      @change="() => timeChange('endTime')"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import NewDatePicker from './NewDatePicker.vue';
  import { dateUtil } from '/@/utils/dateUtil';
  import { Modal } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  export default defineComponent({
    name: 'NewRangePicker',
    components: { NewDatePicker },
    props: {
      value: {
        type: Array,
        default: () => [],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['change'],
    setup(props) {
      const emitData = ref<any>({});
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      const timeChange = (type: string) => {
        const timeList = unref(state);
        const index = type === 'startTime' ? 0 : 1;
        const isBefore = dateUtil(timeList[0]).isBefore(dateUtil(timeList[1]));
        if (timeList[0] && timeList[1] && !isBefore) {
          Modal.warning({
            title: () => '提示',
            content: () => '结束时间不能小于开始时间！',
            onOk: () => {
              timeList[index] = '';
            },
            onCancel: () => {
              timeList[index] = '';
            },
            zIndex: 9999,
          });
          return;
        }
        emitData.value = timeList;
      };

      return { state, timeChange };
    },
  });
</script>

<style scoped lang="less">
  .time-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .time-item {
    width: calc((100% - 2em) / 2) !important;
    min-width: 0 !important;
  }
</style>

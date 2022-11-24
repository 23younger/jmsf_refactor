<template>
  <Row>
    <Col span="10">
      <Input
        v-bind="$attrs"
        @change="inputChange"
        :disabled="props.disabled"
        v-model:value="state.number"
      />
    </Col>
    <Col span="14">
      <Select
        v-bind="$attrs"
        :options="state.options"
        :disabled="props.disabled"
        v-model:value="state.id"
        @change="selectChange"
      />
    </Col>
  </Row>
</template>

<script lang="ts">
  import { defineComponent, watchEffect, reactive, toRaw, getCurrentInstance } from 'vue';
  import { Row, Col, Input, Select } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  interface regionValue {
    id: number | string | null | undefined;
    number: string | number;
    options: any[];
  }

  export default defineComponent({
    name: 'InputLinkSelect',
    components: {
      Row,
      Col,
      Input,
      Select,
    },
    props: {
      value: {
        type: Object as PropType<regionValue>,
        default: () => ({}),
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const state = reactive<regionValue>({
        id: null,
        number: '',
        options: [],
      });
      const instance = getCurrentInstance();
      console.log('instance', instance);
      const [state1] = useRuleFormItem(props);
      console.log('state1', state1);
      watchEffect(() => {
        state.id = props.value.id || null;
        state.number = props.value.number || '';
        if (props.value.options && props.value.options.length) {
          state.options = props.value.options.map((v) => {
            return {
              label: v.name || v.label,
              value: v.id || v.value,
              number: v.number,
            };
          });
        } else {
          state.options = [];
        }
      });
      const inputChange = (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        const value = e.target.value;
        state.number = value;
        const options = toRaw(state).options;
        const option = options.find((v) => value === v.number);
        state.id = option ? option.value : null;
        emit('change', toRaw(state));
      };
      const selectChange = (val) => {
        const options = toRaw(state).options;
        const option = options.find((v) => v.value === val);
        state.number = option.number || '';
        emit('change', toRaw(state));
      };
      return { state, props, inputChange, selectChange };
    },
  });
</script>

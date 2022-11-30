<template>
  <Select
    showSearch
    v-bind="$attrs"
    v-model:value="state"
    :options="getOptions"
    :showArrow="false"
    :filter-option="false"
    :notFoundContent="setNotFoundContent()"
    @change="handleChange"
    @search="handleSearch"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading || notFund">
      <span v-if="loading">
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
      <span v-else-if="notFund" style="color: #0084f4">
        <ExclamationCircleOutlined />
        {{ errTxt }}
      </span>
    </template>
  </Select>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, computed, reactive, toRefs, watchEffect } from 'vue';
  import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Select } from 'ant-design-vue';
  import { get, debounce } from 'lodash-es';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { propTypes } from '/@/utils/propTypes';
  import { isFunction, isNullOrUnDef } from '/@/utils/is';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  interface OptionsItem {
    label: string;
    value: string;
    disabled?: boolean;
  }
  interface dataType {
    notFund?: boolean;
    loading?: boolean;
    options?: OptionsItem[];
  }

  export default defineComponent({
    name: 'ApiAutoComplete',
    components: { Select, LoadingOutlined, ExclamationCircleOutlined },
    props: {
      value: [String, Object],
      api: {
        type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
        default: null,
      },
      params: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      resultField: propTypes.string.def(''),
      valueField: propTypes.string.def(''), // 返回的字段
      valueFormat: propTypes.string.def('value'), // option展示方式
      searchKey: propTypes.string.def('keyword'), // 查询条件key
      errTxt: propTypes.string.def('暂无数据'), // 查询无结果
    },
    emits: ['change', 'select'],
    setup(props, { attrs }) {
      const { t } = useI18n();
      const emitData = ref<any[]>([]);
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);
      const data = reactive<dataType>({
        notFund: false,
        loading: false,
        options: [],
      });

      const { formValues } = attrs as any;
      const defaultValue = formValues.schema.defaultValue;
      if (defaultValue) getSearch(defaultValue);
      watchEffect(() => {
        if (defaultValue === props.value) getSearch(defaultValue);
      });

      const formatValue = (obj) => {
        const { valueFormat } = props;
        const valueFormatList = valueFormat.split('|');
        return valueFormatList.map((v) => obj?.[v])?.join(' | ');
      };
      const getOptions = computed(() => {
        const { valueField } = props;
        return data.options?.reduce((prev, next: Recordable) => {
          if (next) {
            prev.push({
              ...next,
              label: formatValue(next),
              value: next[valueField],
            });
          }
          return prev;
        }, [] as OptionsItem[]);
      });

      const handleSearch = debounce(getSearch, 300);
      const handleChange = (_, ...args) => {
        emitData.value = args;
      };

      async function getSearch(val) {
        if (isNullOrUnDef(val)) return;
        const { api, searchKey, params, resultField } = props;
        if (!api || !isFunction(api)) return;
        data.options = [];
        data.notFund = false;
        try {
          data.loading = true;
          const ajaxParams = { ...params, [searchKey]: val, name: val };
          const res = await api(ajaxParams);
          if (Array.isArray(res)) {
            data.options = res;
            return;
          }
          if (resultField) {
            data.options = get(res, resultField) || [];
          }
          if (data.options?.length === 0) data.notFund = true;
        } catch (error) {
          data.notFund = true;
          console.warn(error);
        } finally {
          data.loading = false;
        }
      }
      const setNotFoundContent = () => {
        if (!data.loading && !data.notFund) return null;
      };

      return {
        t,
        state,
        ...toRefs(data),
        getOptions,
        handleSearch,
        handleChange,
        setNotFoundContent,
      };
    },
  });
</script>

<template>
  <AutoComplete
    allowClear
    v-bind="$attrs"
    v-model:value="state"
    :options="setOptions"
    @search="onSearch"
    @select="onSelect"
    :get-popup-container="getPopupContainer"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </AutoComplete>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, unref, watch } from 'vue';
  import { AutoComplete } from 'ant-design-vue';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { get, debounce } from 'lodash-es';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { isFunction, isObject } from '/@/utils/is';
  import { propTypes } from '/@/utils/propTypes';
  interface OptionsItem {
    text?: string;
    value: string;
    disabled?: boolean;
  }

  export default defineComponent({
    name: 'ApiAutoComplete',
    components: { AutoComplete, LoadingOutlined },
    props: {
      value: [String, Object, Number],
      api: {
        type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
        default: null,
      },
      params: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      resultField: propTypes.string.def(''),
      fieldKey: propTypes.string.def(''), // 返回的字段
      valueFormat: propTypes.string.def('value'), // option展示方式
      searchKey: propTypes.string.def('keyword'), // 查询条件key
      popupContainerBody: propTypes.bool.def(false), // 下拉框是否挂载于body
    },
    emits: ['change'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const loading = ref(false);
      const options = ref<OptionsItem[]>([]);
      const getPopupContainer = (triggerNode) => {
        if (props.popupContainerBody) {
          return document.body;
        }
        return triggerNode.parentNode || document.body;
      };
      const formatValue = (obj) => {
        const { valueFormat } = props;
        const valueFormatList = valueFormat.split('|');
        return valueFormatList.map((v) => obj[v]).join(' | ');
      };
      const setOptions = computed(() => {
        const arr = unref(options).reduce((prev, next: Recordable) => {
          if (next) {
            prev.push({
              ...next,
              value: `${formatValue(next)}`,
            });
          }
          return prev;
        }, [] as OptionsItem[]);
        return arr;
      });
      const state = ref('');

      const onSearch = debounce(getSearchRes, 50);
      const onSelect = (_, option) => {
        const { fieldKey } = props;
        let res = option;
        if (fieldKey) res = option[fieldKey];
        emit('change', res);
      };

      watch(
        () => props.value,
        async (val, old) => {
          const { fieldKey, value } = props;
          if (isObject(val)) {
            state.value = formatValue(val);
            onSelect('', val);
          } else if (val && !old) {
            await getSearchRes(value);
            const findOption = setOptions.value.find((v) => v[fieldKey] === value) as OptionsItem;
            state.value = formatValue(findOption);
          }
        },
        {
          immediate: true,
        },
      );

      async function getSearchRes(val) {
        const { api, searchKey, params, resultField } = props;
        if (!api || !isFunction(api)) return;
        options.value = [];
        try {
          loading.value = true;
          const ajaxParams = { ...params, [searchKey]: val, name: val };
          const res = await api(ajaxParams);
          if (Array.isArray(res)) {
            options.value = res;
            return;
          }
          if (resultField) {
            options.value = get(res, resultField) || [];
          }
        } catch (error) {
          console.warn(error);
        } finally {
          loading.value = false;
        }
      }

      return {
        t,
        setOptions,
        loading,
        onSearch,
        onSelect,
        state,
        getPopupContainer,
      };
    },
  });
</script>

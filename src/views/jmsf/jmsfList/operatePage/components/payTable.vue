<template>
  <div class="table-info-wrapper">
    <table class="ant-table ant-table-bordered">
      <thead class="ant-table-thead">
        <tr class="ant-table-row">
          <th scope="col">收费项目应收</th>
          <th scope="col">收费项目优惠1</th>
          <th scope="col">收费项目优惠2</th>
          <th scope="col">收费项目实收</th>
        </tr>
      </thead>
      <tbody class="ant-table-tbody">
        <tr class="ant-table-row">
          <td style="text-align: left; padding: 8px 4px">
            <Checkbox @change="watchChange" />
            <span style="margin: 0 6px">进门收费:</span>
            <Input style="width: auto" :disabled="true" />
          </td>
          <td>{{ data }}</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr class="ant-table-row">
          <td style="text-align: left; padding: 8px 4px">
            <Checkbox />
            <span style="margin: 0 6px">进门收费:</span>
            <Input style="width: auto" :disabled="true" />
          </td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { Checkbox, Input } from 'ant-design-vue';
  import { computed, defineProps } from 'vue';
  const props = defineProps({
    model: Object,
    field: String,
  });
  const data = computed(() => {
    const model = props.model;
    const field = props.field;
    return model && field && model[field];
  });
  console.log('props', props);
  const watchChange = () => {
    const { basicRef, headerRef } = props.model?.refs;
    basicRef.setFieldsValue({
      toll_sum: Math.random(),
    });
    console.log('headerRef', headerRef);
    headerRef.totalMoney = '99';
  };
  setTimeout(() => {
    const model = props.model;
    const field = props.field;
    model && field && (model[field] = '999999');
  }, 5000);
</script>

<style scoped lang="less">
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

<template>
  <RadioGroup v-model:value="type">
    <RadioButton value="preview">查看</RadioButton>
    <RadioButton value="edit">编辑</RadioButton>
    <RadioButton value="correct">更正</RadioButton>
  </RadioGroup>
  <Spin :spinning="loading">
    <Space align="start">
      <div class="table-info-wrapper">
        <h3>基础信息</h3>

        <table class="ant-table">
          <thead class="ant-table-thead">
            <tr>
              <th scope="col">序号</th>
              <th scope="col">名称</th>
              <th scope="col">id</th>
              <th scope="col">key</th>
              <th scope="col">是否显示</th>
            </tr>
          </thead>
          <draggable
            v-model="basicInfo"
            tag="tbody"
            item-key="id"
            class="ant-table-tbody"
            v-bind="dragOptions"
          >
            <template #item="{ element, index }">
              <tr class="drag-tr">
                <td>{{ index + 1 }}</td>
                <td>{{ element.name }}</td>
                <td scope="row">{{ element.id }}</td>
                <td>{{ element.key }}</td>
                <td>
                  <Checkbox
                    :checked="element.isShow"
                    @click="changeChecked(element)"
                    :disabled="element.isRequired"
                  />
                </td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
      <div class="table-info-wrapper">
        <h3>费用信息</h3>

        <table class="ant-table">
          <thead class="ant-table-thead">
            <tr>
              <th scope="col">序号</th>
              <th scope="col">名称</th>
              <th scope="col">id</th>
              <th scope="col">key</th>
              <th scope="col">是否显示</th>
            </tr>
          </thead>
          <draggable
            v-model="payInfo"
            tag="tbody"
            item-key="id"
            class="ant-table-tbody"
            v-bind="dragOptions"
          >
            <template #item="{ element, index }">
              <tr class="drag-tr">
                <td>{{ index + 1 }}</td>
                <td>{{ element.name }}</td>
                <td scope="row">{{ element.id }}</td>
                <td>{{ element.key }}</td>
                <td>
                  <Checkbox
                    :checked="element.isShow"
                    @click="changeChecked(element)"
                    :disabled="element.isRequired"
                  />
                </td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
      <div class="table-info-wrapper">
        <h3>其他信息</h3>

        <table class="ant-table">
          <thead class="ant-table-thead">
            <tr>
              <th scope="col">序号</th>
              <th scope="col">名称</th>
              <th scope="col">id</th>
              <th scope="col">key</th>
              <th scope="col">是否显示</th>
            </tr>
          </thead>
          <draggable
            v-model="otherInfo"
            tag="tbody"
            item-key="id"
            class="ant-table-tbody"
            v-bind="dragOptions"
          >
            <template #item="{ element, index }">
              <tr class="drag-tr">
                <td>{{ index + 1 }}</td>
                <td>{{ element.name }}</td>
                <td scope="row">{{ element.id }}</td>
                <td>{{ element.key }}</td>
                <td>
                  <Checkbox
                    :checked="element.isShow"
                    @click="changeChecked(element)"
                    :disabled="element.isRequired"
                  />
                </td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
    </Space>
  </Spin>
</template>

<script setup lang="ts">
  import { getConfigList } from '/@/api/demo/testpage';
  import { computed, onMounted, ref } from 'vue';
  import draggable from 'vuedraggable';
  import { Checkbox, Space, Spin, RadioGroup, RadioButton } from 'ant-design-vue';
  const loading = ref<boolean>(false);
  const type = ref<string>('preview');
  const basicInfo = ref([]);
  const payInfo = ref([]);
  const otherInfo = ref([]);
  onMounted(async () => {
    try {
      loading.value = true;
      const config = await getConfigList();
      basicInfo.value = config.basicInfo;
      payInfo.value = config.payInfo;
      otherInfo.value = config.otherInfo;
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  });
  const dragOptions = computed(() => {
    return {
      animation: 200,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost',
    };
  });
  const changeChecked = (item) => {
    item.isShow = !item.isShow;
  };
</script>

<style scoped lang="less">
  .drag-tr:hover {
    cursor: move;
  }

  .ant-table {
    text-align: center;

    .ant-table-thead tr th {
      text-align: center;
    }
  }
</style>

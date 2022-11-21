<template>
  <Spin :spinning="loading">
    <a-layout>
      <a-layout-sider
        theme="light"
        :style="{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }"
        width="160"
      >
        <Menu
          mode="vertical"
          v-model:selectedKeys="selectedKeys"
          style="width: 100%"
          @select="handleSelect"
        >
          <MenuItem v-for="item in configList" :key="item.key">
            <SendOutlined v-if="selectedKeys.indexOf(item.key) > -1" />
            <span style="margin-left: 16px">{{ item.name }}</span>
          </MenuItem>
        </Menu>
      </a-layout-sider>
      <a-layout-content :style="{ marginLeft: '170px' }">
        <div class="table-info-wrapper">
          <div class="operate-alert">
            <span style="color: red">可进行拖拽排序</span>
          </div>
          <Collapse
            :bordered="false"
            expandIconPosition="right"
            :style="{ background: '#ffffff' }"
            v-model:activeKey="activeKey"
          >
            <CollapsePanel key="basic" header="基本信息">
              <template #extra>{{ activeKey.indexOf('basic') > -1 ? '收起' : '展开' }}</template>
              <table class="ant-table">
                <thead class="ant-table-thead">
                  <tr>
                    <th>序号</th>
                    <th>名称</th>
                    <th>是否必填</th>
                    <th>是否显示</th>
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
                    <tr class="drag-tr" :class="element.moveDisabled && 'undraggable'">
                      <td>{{ index + 1 }}</td>
                      <td>{{ element.name }}</td>
                      <td>
                        <Checkbox
                          :checked="element.isShow"
                          @click="changeChecked(element)"
                          :disabled="element.isRequired"
                        />
                      </td>
                      <td>{{ element.name }}</td>
                    </tr>
                  </template>
                </draggable>
              </table>
            </CollapsePanel>
            <CollapsePanel key="pay" header="费用信息">
              <template #extra>{{ activeKey.indexOf('pay') > -1 ? '收起' : '展开' }}</template>
              <table class="ant-table">
                <thead class="ant-table-thead">
                  <tr>
                    <th>序号</th>
                    <th>名称</th>
                    <th>是否必填</th>
                    <th>是否显示</th>
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
                    <tr class="drag-tr undraggable">
                      <td>{{ index + 1 }}</td>
                      <td>{{ element.name }}</td>
                      <td>
                        <Checkbox
                          :checked="element.isShow"
                          @click="changeChecked(element)"
                          :disabled="element.isRequired"
                        />
                      </td>
                      <td>{{ element.name }}</td>
                    </tr>
                  </template>
                </draggable>
              </table>
            </CollapsePanel>
            <CollapsePanel key="other" header="其他信息">
              <template #extra>{{ activeKey.indexOf('other') > -1 ? '收起' : '展开' }}</template>
              <table class="ant-table">
                <thead class="ant-table-thead">
                  <tr>
                    <th>序号</th>
                    <th>名称</th>
                    <th>是否必填</th>
                    <th>是否显示</th>
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
                      <td>
                        <Checkbox
                          :checked="element.isShow"
                          @click="changeChecked(element)"
                          :disabled="element.isRequired"
                        />
                      </td>
                      <td>{{ element.name }}</td>
                    </tr>
                  </template>
                </draggable>
              </table>
            </CollapsePanel>
          </Collapse>
          <div class="operate-tabs">
            <a-button type="primary" @click="submit">确认</a-button>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </Spin>
</template>

<script setup lang="ts">
  import { getConfigList } from '/@/api/jmsf/jmsfList';
  import { computed, onMounted, ref, unref, toRaw } from 'vue';
  import draggable from 'vuedraggable';
  import { Checkbox, Spin, Menu, MenuItem, Collapse, CollapsePanel } from 'ant-design-vue';
  import { SendOutlined } from '@ant-design/icons-vue';
  const loading = ref<boolean>(false);
  const operateType = ref<string>('preview');
  const configList = ref([
    { key: 'preview', name: '查看' },
    { key: 'update', name: '修改' },
    { key: 'payFee', name: '交费' },
    { key: 'freeze', name: '冻结' },
    { key: 'unfreeze', name: '解冻' },
    { key: 'correct', name: '更正' },
    { key: 'amend', name: '修正' },
    { key: 'refund', name: '退款' },
  ]);
  const activeKey = ref<string[]>(['basic', 'pay', 'other']);
  const selectedKeys = ref<string[]>(['preview']);
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
  const checkMove = (e) => {
    // 用于禁止被拖拽
    if (e.relatedContext.element.moveDisabled) return false;
    return true;
  };
  const dragOptions = computed(() => {
    return {
      animation: 200,
      // group: 'description', // 加上可以多组之间相互拖拽
      disabled: false,
      ghostClass: 'ghost',
      filter: '.undraggable',
      move: checkMove,
    };
  });
  const changeChecked = (item) => {
    item.isShow = !item.isShow;
  };
  const handleSelect = async (e) => {
    operateType.value = e.key;
    try {
      loading.value = true;
      basicInfo.value = [];
      payInfo.value = [];
      otherInfo.value = [];
      const config = await getConfigList();
      basicInfo.value = config.basicInfo;
      payInfo.value = config.payInfo;
      otherInfo.value = config.otherInfo;
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };
  const submit = () => {
    console.log('basic', toRaw(unref(basicInfo)));
    console.log('pay', toRaw(unref(payInfo)));
    console.log('other', toRaw(unref(otherInfo)));
  };
</script>

<style scoped lang="less">
  .table-info-wrapper {
    background: #ffffff;
    padding: 12px;
    position: relative;
    .operate-alert {
      margin-bottom: 4px;
    }
    .operate-tabs {
      margin-top: 8px;
      text-align: right;
    }
  }
  .drag-tr:hover {
    cursor: move;
  }

  ::v-deep(.ant-collapse-header) {
    background: #f0f3f6;
  }

  ::v-deep(.ant-collapse-content) {
    padding: 10px 0;
  }

  .ant-table {
    text-align: center;
    width: 100%;

    .ant-table-thead tr th {
      text-align: center;
    }
  }
  .operate-tab {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }
</style>

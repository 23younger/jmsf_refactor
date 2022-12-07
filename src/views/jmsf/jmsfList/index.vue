<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable
      @register="registerTable"
      @columns-change="columnsChange"
      @selection-change="selectionRow"
    >
      <template #form-advanceBefore>
        <a-button @click="editSearch">编辑</a-button>
      </template>

      <template #toolbar>
        <div class="btn-box">
          <a-button-group>
            <a-button
              v-for="item in btnList"
              :key="item.value"
              type="primary"
              v-auth="item.code"
              @click="handleOperate(item.value)"
            >
              <Icon :icon="item.icon" />
              {{ item.text }}
            </a-button>
          </a-button-group>
        </div>
      </template>
    </BasicTable>
    <OperateModal @register="registerOperateModal" @callback="callback" />
    <FormConfigDialog @register="registerFormConfigDialog" />
    <EpidemicRreportDialog @register="registerEpidemicRreportDialog" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, onMounted, unref } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { Icon } from '/@/components/Icon';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { basicBtnList, basicColumnsData, formData } from './data';
  import FormConfigDialog from './Modal/formConfigDialog.vue';
  import EpidemicRreportDialog from './Modal/epidemicRreport.vue';
  import OperateModal from '../jmsfList/operatePage/index.vue';

  export default defineComponent({
    name: 'JmsfList',
    components: {
      PageWrapper,
      BasicTable,
      Icon,
      OperateModal,
      FormConfigDialog,
      EpidemicRreportDialog,
    },
    setup() {
      const data = reactive({
        btnList: basicBtnList,
      });
      const selectedRow = ref(null);
      const { createInfoModal } = useMessage();
      const [registerTable, { clearSelectedRowKeys }] = useTable({
        api: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve([{ created: '2022-11-01' }]);
            }, 1000);
          }),
        columns: basicColumnsData,
        useSearchForm: true,
        formConfig: {
          labelWidth: '6em',
          schemas: formData,
          baseColProps: { span: 4 },
          autoAdvancedLine: 10,
          fieldMapToTime: [
            ['enterTime', ['startTime', 'endTime'], 'YYYY-MM-DD HH:mm:ss'],
            ['payTime', ['startPayTime', 'endPayTime'], 'YYYY-MM-DD HH:mm:ss'],
            ['refundTime', ['startRefundTime', 'endRefundTime'], 'YYYY-MM-DD HH:mm:ss'],
          ],
          resetFunc: async () => {
            await clearSelectedRowKeys();
          },
        },
        rowSelection: { type: 'radio' },
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        beforeFetch: async (data) => {
          const formInfo = cloneDeep(data);
          console.log(formInfo);
          // 可能会处理部分传参
          // return formInfo 即给上面的api传的参数
        },
      });
      // 表格项设置
      const columnsChange = (val) => {
        console.log(val);
      };
      // 选择表格项
      const selectionRow = ({ rows: [row] }) => {
        selectedRow.value = row;
      };
      const [registerOperateModal, { openModal: openOperateModal }] = useModal();
      const [registerFormConfigDialog, { openModal: openFormConfigDialog }] = useModal();
      const [registerEpidemicRreportDialog, { openModal: openEpidemicRreportDialog }] = useModal();
      const editSearch = () => {
        openFormConfigDialog(true);
      };

      const handleOperate = (type) => {
        if (!unref(selectedRow)) {
          createInfoModal({
            title: '提示',
            content: '请选中一条数据',
          });
          return;
        }
        switch (type) {
          case 'preview':
            openOperateModal(true, {
              type: 'preview',
              title: '查看',
              id: '1',
            });
            break;
          case 'export':
            // 打印操作
            break;
          case 'reprint':
            // 补打
            break;
          case 'update':
            openOperateModal(true, {
              type: 'update',
              title: '修改',
              id: '2',
            });
            break;
          case 'pay':
            openOperateModal(true, {
              type: 'pay',
              title: '缴费',
              id: '3',
            });
            break;
          case 'unfreeze':
            openOperateModal(true, {
              type: 'unfreeze',
              title: '解冻',
              id: '4',
            });
            break;
          case 'correct':
            openOperateModal(true, {
              type: 'correct',
              title: '更正',
              id: '5',
            });
            break;
          case 'amend':
            openOperateModal(true, {
              type: 'amend',
              title: '修正',
              id: '6',
            });
            break;
          case 'invalid':
            openOperateModal(true, {
              type: 'invalid',
              title: '作废',
              id: '7',
            });
            break;
          case 'refund':
            openOperateModal(true, {
              type: 'refund',
              title: '退款',
              id: '8',
            });
            break;
          case 'addRecord':
            // 补录
            break;
          case 'refund&reprint':
            // 退款补打
            break;
          case 'invalidApply':
            // 作废申请
            break;
          case 'skinReturnApply':
            // 回皮申请
            break;
          case 'exitQuarantineRegistration':
            // 离场防疫登记
            openEpidemicRreportDialog();
            break;
          default:
            break;
        }
      };

      // 详情页表单callback，可用于判断是否刷新列表
      const callback = (type) => {
        console.log('type', type);
      };

      onMounted(() => {
        // editSearch();
      });

      return {
        ...toRefs(data),
        registerTable,
        columnsChange,
        selectionRow,
        registerFormConfigDialog,
        editSearch,
        registerEpidemicRreportDialog,
        registerOperateModal,
        handleOperate,
        callback,
      };
    },
  });
</script>
<style scoped>
  .btn-box {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .ant-btn:disabled {
    background-color: #69b7ff;
    color: #fcfdfe;
  }
</style>

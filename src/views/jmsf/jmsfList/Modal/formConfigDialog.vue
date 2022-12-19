<template>
  <BasicModal
    @register="registerModal"
    :canFullscreen="false"
    defaultFullscreen
    title="查询条件编辑"
    @visible-change="init"
    @ok="okFunc"
  >
    <Row style="height: 100%; overflow: hidden">
      <Col
        :span="3"
        class="col-flex flex-col items-center h-full overflow-x-hidden overflow-y-scroll"
      >
        <div class="check-title check-wrap flex items-center justify-center font-bold">
          <div class="check-sort">排序</div>
          <div class="check-choose">是否显示</div>
          <div class="check-name">名称</div>
        </div>
        <CheckboxGroup v-model:value="checkList" @change="checkChange" ref="checkBoxRef">
          <div
            class="flex items-center justify-center check-item check-wrap"
            v-for="item in configFormSchema"
            :key="item.field"
          >
            <div class="check-sort drag">
              <Icon icon="ant-design:drag-outlined" />
            </div>
            <div class="check-choose">
              <Checkbox :value="item.field" />
            </div>
            <div class="check-name"> {{ item.label }} </div>
          </div>
        </CheckboxGroup>
      </Col>
      <Col :span="21" class="h-full overflow-x-hidden overflow-y-scroll form">
        <p class="form-title">样式预览</p>
        <BasicForm @register="registerForm" />
      </Col>
    </Row>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, reactive, unref, nextTick, toRefs } from 'vue';
  import { Row, Col, Checkbox } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { Icon } from '/@/components/Icon';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { isNullAndUnDef } from '/@/utils/is';
  import Sortablejs from 'sortablejs';
  import type Sortable from 'sortablejs';
  import type { FormSchema } from '/@/components/Table';
  import { configFormSchema } from '../data';

  interface stateType {
    checkBoxRef: ComponentRef;
    checkList: string[];
  }
  interface privateDataType {
    isInited?: boolean;
    sortable?: Sortable;
    sortableOrder?: string[];
    baseData: FormSchema[];
    oldList: string[];
  }

  export default defineComponent({
    name: 'FormConfigDialog',
    components: { BasicModal, Row, Col, Icon, Checkbox, CheckboxGroup: Checkbox.Group, BasicForm },
    setup() {
      const state = reactive<stateType>({
        checkBoxRef: null,
        checkList: configFormSchema.map((v) => v.field),
      });
      const privateData: privateDataType = {
        isInited: false,
        baseData: configFormSchema,
        oldList: configFormSchema.map((v) => v.field),
      };
      const [registerModal, { closeModal }] = useModalInner();
      const [registerForm, { resetSchema }] = useForm({
        schemas: configFormSchema,
        labelWidth: '5em',
        baseColProps: { span: 4 },
        showActionButtonGroup: false,
        disabled: true,
      });
      const checkChange = (val) => {
        let changeList: string[] = val;
        const contactField = ['dep', 'regionId'];
        const newIncludes = contactField.some((v) => val.includes(v));
        const newAllIncludes = contactField.every((v) => val.includes(v));
        const oldIncludes = contactField.every((v) => privateData.oldList.includes(v));
        if (newIncludes && !newAllIncludes) {
          if (!oldIncludes) {
            changeList = [...new Set([...val, ...contactField])];
          } else {
            changeList = val.filter((v) => !contactField.includes(v));
          }
        }

        state.checkList = changeList;
        privateData.oldList = changeList;
        const formData = privateData.baseData.filter((v) => changeList.includes(v.field));
        resetSchema(unref(formData));
      };

      const init = async () => {
        if (privateData.isInited) return;
        await nextTick();
        const checkBoxEl = unref(state.checkBoxRef);
        if (!checkBoxEl) return;
        const el = checkBoxEl.$el as HTMLDivElement;
        if (!el) return;
        Sortablejs.create(unref(el), {
          animation: 500,
          delay: 400,
          delayOnTouchOnly: true,
          handle: '.drag',
          onEnd: (evt) => {
            const { oldIndex, newIndex } = evt;
            if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
              return;
            }
            // 排序
            const cloneData = cloneDeep(privateData.baseData);
            if (oldIndex > newIndex) {
              cloneData.splice(newIndex, 0, cloneData[oldIndex]);
              cloneData.splice(oldIndex + 1, 1);
            } else {
              cloneData.splice(newIndex + 1, 0, cloneData[oldIndex]);
              cloneData.splice(oldIndex, 1);
            }
            privateData.baseData = cloneData;
            const formData = cloneData.filter((v) => state.checkList.includes(v.field));
            resetSchema(formData);
          },
        });
        privateData.isInited = true;
      };
      const okFunc = () => {
        console.log(state.checkList);
        closeModal();
      };

      return {
        ...toRefs(state),
        configFormSchema,
        registerModal,
        registerForm,
        checkChange,
        init,
        okFunc,
      };
    },
  });
</script>

<style lang="less" scoped>
  @checkwidth: 100%;

  .col-flex {
    display: flex !important;

    .check-title {
      width: @checkwidth;
    }

    .ant-checkbox-group {
      width: 100%;

      .check-item {
        margin: 0 auto;
      }
    }

    .check-wrap {
      width: @checkwidth;

      div {
        flex-shrink: 0;
        text-align: center;
        border: 1px solid #ccc;
        line-height: 1.8;
      }

      .check-sort {
        width: 3em;
        cursor: move;
        user-select: none;
      }

      .check-choose {
        width: 5em;
        border-left: none;
        border-right: none;
      }

      .check-name {
        flex: 1;
        text-align: left;
        padding-left: 0.5em;
      }
    }
  }

  .form {
    padding: 10px;

    &-title {
      margin: 0 10px 10px;
      font-weight: bold;
      font-size: 24px;
    }
  }
</style>

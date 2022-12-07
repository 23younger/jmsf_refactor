<template>
  <BasicModal @register="registerModal" title="离场防疫登记" @ok="okFunc" width="50%">
    <Row>
      <Col :span="24" class="title">进门信息</Col>
      <Col v-for="item in jmFormData" :key="item.id" :span="8" class="jsItem">
        <label>{{ item.label }}:</label>
        <p>{{ item.value }}</p>
      </Col>
    </Row>
    <Row>
      <Col :span="24" class="title">防疫信息</Col>
      <BasicForm @register="registerForm" />
    </Row>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { Row, Col } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import type { FormSchema } from '/@/components/Table';

  export default defineComponent({
    name: 'EpidemicRreportDialog',
    components: { BasicModal, Row, Col, BasicForm },
    props: {
      id: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      console.log(props);
      const data = reactive({
        jmFormData: [
          {
            label: '收费单号',
            value: '收费单号',
            id: 'No',
          },
          {
            label: '车号',
            value: '车号',
            id: 'No1',
          },
          {
            label: '车型',
            value: '车型',
            id: 'No2',
          },
          {
            label: '商品',
            value: '商品',
            id: 'No3',
          },
          {
            label: '进场时间',
            value: '进场时间',
            id: 'No4',
          },
          {
            label: '缴费时间',
            value: '缴费时间',
            id: 'No5',
          },
        ],
      });
      const epidemicFormInfo: FormSchema[] = [
        {
          field: 'name',
          label: '司机姓名',
          component: 'Input',
          required: true,
        },
        {
          field: 'tel',
          label: '电话',
          component: 'Input',
          required: true,
        },
        {
          field: 'cardNo',
          label: '身份证',
          component: 'Input',
          required: true,
        },
        {
          field: 'name2',
          label: '司乘人员姓名',
          component: 'Input',
        },
        {
          field: 'tel2',
          label: '电话',
          component: 'Input',
        },
        {
          field: 'cardNo2',
          label: '身份证',
          component: 'Input',
        },
        {
          field: 'go',
          label: '车辆去出',
          component: 'Input',
          required: true,
        },
        {
          field: 'person',
          label: '对接人',
          component: 'Input',
          required: true,
        },
        {
          field: 'personTel',
          label: '对接人电话',
          component: 'Input',
          required: true,
        },
        {
          field: 'time',
          label: '离场时间',
          component: 'Input',
          required: true,
        },
        {
          field: 'report',
          label: '核酸报告',
          component: 'Select',
          required: true,
          componentProps: {
            options: [
              {
                value: 'jack',
                label: 'Jack',
              },
            ],
          },
        },
        {
          field: 'note',
          label: '防疫备注',
          component: 'InputTextArea',
          colProps: { span: 24 },
        },
      ];
      const [registerModal, { closeModal }] = useModalInner();
      const [registerForm] = useForm({
        schemas: epidemicFormInfo,
        labelWidth: '7em',
        baseColProps: { span: 8 },
        showActionButtonGroup: false,
      });

      const okFunc = () => {
        console.log('ok');
        closeModal();
      };
      return {
        ...toRefs(data),
        registerModal,
        okFunc,
        registerForm,
      };
    },
  });
</script>

<style lang="less">
  .title {
    font-size: 16px;
    font-weight: bold;
    margin: 3px 0;
  }

  .jsItem {
    display: flex;
    align-items: center;

    label {
      width: 7em;
      text-align: right;
    }

    p {
      margin: 0;
      line-height: 1.3;
      box-sizing: border-box;
      padding-left: 0.5em;
    }
  }
</style>

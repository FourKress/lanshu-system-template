<template>
  <v-page-view showRight>
    <v-list-template
      ref="listTemplate"
      title="这是一个列表页"
      readUrl="/saas"
      :mockData="[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},]"
      :conditions="conditions"
      :columns="columns"
      :batchOperation="batchOperation"
      refTable="list-table"
      :searchCallback="searchCallback"
      :pageSizeArr="[20, 40, 60, 100, 1000, 5000]"
      conditionCache
    >
      <template slot="header-event">
        <v-button type="primary" @click="handleExport">导出</v-button>
      </template>
    </v-list-template>
  </v-page-view>
</template>

<script>
export default {
  name: 'SettingsList',
  data() {
    return {
      conditions: [
        {
          label: '查询一',
          type: 'select',
          key: 'orgIds',
          props: { label: 'name', value: 'id' },
        },
        {
          label: '查询2',
          type: 'lazySelect',
          key: 'parkIds',
        },
        {
          label: '时间',
          type: 'dateRanger',
          key: ['receivedDateStart', 'receivedDateEnd'],
        },

        {
          type: 'input',
          key: 'customerName',
          placeholder: '输入框',
        },
      ],
      columns: [
        {
          key: 'entpCode',
          label: '111',
          minWidth: 180,
        },
        {
          key: 'entpName',
          label: '222',
          minWidth: 180,
        },
        {
          key: 'parkName',
          label: '333',
          minWidth: 180,
        },
        {
          key: 'orgName',
          label: '4444',
          minWidth: 180,
        },

      ],
      queryParams: {},
      batchOperation: [
        {
          text: '批量操作1',
          type: 'primary',
          func: () => {},
        },
        {
          text: '批量操作2',
          type: 'primary',
          func: () => {},
        },
      ],
    };
  },
  methods: {
    async searchCallback(params) {
      this.queryParams = params;
    },
    handleExport() {

    }
  },
};
</script>

<style lang="less" scoped></style>

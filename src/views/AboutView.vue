<template>
  <TableComponent :columns="columns" :dataSource="data" :defaultPageSize="5" :isPaging="true">
    <!-- Action Button Slot -->
    <template #action="{ record }">
      <a-button type="primary" @click="handleAction(record)">View</a-button>
    </template>

    <!-- Dropdown Slot -->
    <template #dropList="{ record }">
      <a-dropdown>
        <a-menu>
          <a-menu-item key="1">Option 1 for {{ record.name }}</a-menu-item>
          <a-menu-item key="2">Option 2 for {{ record.name }}</a-menu-item>
        </a-menu>
      </a-dropdown>
    </template>
  </TableComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TableComponent from '../components/tables/TableComponent.vue';
import { getMaterials } from '../api/materialApi';
import generateColumns from '@/utils/table';

async function fetchMaterials() {
  try {
    const params = {
      page: 0,
      size: 10,
      searchTerm: '',
      sortField: 'name',
      sortType: 'DESC',
    };
    const materials = await getMaterials(params);
    console.log('Fetched materials:', materials);
    data.value = materials.data;
    columns.value = generateColumns(materials.data[0])
    console.log("Columns ", columns)
  } catch (error) {
    console.error('Error fetching materials:', error);
  }
}

const data = ref([]);
const columns = ref([]);

const handleAction = (record) => {
  console.log('Action button clicked for:', record);
};

onMounted(() => {
  fetchMaterials();
});
</script>

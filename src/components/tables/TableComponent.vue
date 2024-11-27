<template>
  <div>
    <!-- Table -->
    <a-table :columns="columnsWithFilters" :data-source="paginatedData" :pagination="false" @change="handleTableChange">
      <!-- Header Cell Slot -->
      <template #headerCell="{ column }">
        <span>{{ column.title }}</span>
      </template>

      <!-- Body Cell Slot -->
      <template #bodyCell="{ column, record }">
        <!-- Custom Action Slot -->
        <slot v-if="column.key === 'action'" name="action" :record="record"></slot>

        <!-- Custom Dropdown Slot -->
        <slot v-else-if="column.key === 'gender'" name="dropList" :record="record"></slot>

        <!-- Default Cell -->
        <span v-else>{{ record[column.dataIndex] }}</span>
      </template>
    </a-table>

    <!-- Pagination -->
    <PaginationComponent v-if="isPaging" :pagination="pagination" :total="dataSource.length"
      @updatePageSize="updatePageSize" @changePage="handlePageChange" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import PaginationComponent from '../paginations/PaginationComponent.vue';

// Define Props
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  dataSource: {
    type: Array,
    required: true,
  },
  defaultPageSize: {
    type: Number,
    default: 10,
  },
  isPaging: {
    type: Boolean,
    default: true,
  },
});

// Pagination State
const pagination = ref({
  current: 1,
  pageSize: props.defaultPageSize,
  total: props.dataSource.length,
});
const filters = ref({});

// Computed Columns with Filters
const columnsWithFilters = computed(() =>
  props.columns.map((col) => {
    if (col.filterOptions) {
      return {
        ...col,
        filters: col.filterOptions.map((option) => ({
          text: option.label,
          value: option.value,
        })),
        onFilter: (value, record) => record[col.dataIndex] === value,
      };
    }
    return col;
  })
);

// Paginated Data
const paginatedData = computed(() => {
  if (!props.isPaging) return props.dataSource; // If pagination is not enabled, return the entire dataSource

  if (props.dataSource.length > 0) {
    const start = (pagination.value.current - 1) * pagination.value.pageSize; // Calculate the start index
    const end = start + pagination.value.pageSize; // Calculate the end index
    return props.dataSource.slice(start, end); // Return the sliced data
  }

  return []; // Return empty array if no data is available
});


// Watch for Data Source Length Change
watch(
  () => props.dataSource.length,
  (newLength) => {
    pagination.value.total = newLength;
  }
);

// Methods
function handleTableChange(newPagination, newFilters) {
  pagination.value.current = newPagination.current;
  filters.value = newFilters;
}

function updatePageSize(newPageSize) {
  pagination.value.current = 1;
  pagination.value.pageSize = newPageSize;
}

function handlePageChange(newPage) {
  pagination.value.current = newPage;
}
</script>

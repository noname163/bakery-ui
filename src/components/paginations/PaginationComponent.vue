<template>
  <div class="pagination-container">
    <a-pagination :current="pagination.current" :pageSize="pagination.pageSize" :total="total" :show-size-changer="true"
      :page-size-options="pageSizeOptions" @change="onPageChange" @showSizeChange="onPageSizeChange" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Props
defineProps({
  pagination: {
    type: Object,
    required: true, // Example: { current: 1, pageSize: 10 }
  },
  total: {
    type: Number,
    required: true, // Total number of items
  },
  pageSizeOptions: {
    type: Array,
    default: () => ['5', '10', '20', '50'], // Default page size options
  },
});

// Emits
const emit = defineEmits(['updatePageSize', 'changePage']);

// Methods
function onPageChange(page) {
  emit('changePage', page);
}

function onPageSizeChange(current, pageSize) {
  emit('updatePageSize', pageSize);
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}
</style>

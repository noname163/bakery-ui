import { getData } from './api'

/**
 * Get materials with optional filters, pagination, and sorting.
 *
 * @param {Object} params - The query parameters for the API call.
 * @param {number} params.page - The current page number (default: 0).
 * @param {number} params.size - The number of items per page (default: 20).
 * @param {string} [params.searchTerm] - The term to search materials.
 * @param {string} params.sortField - The field to sort by (default: "created_date").
 * @param {string} params.sortType - The sort order (ASC or DESC, default: "ASC").
 *
 * @returns {Promise} - A promise resolving to the API response.
 */
export const getMaterials = async ({
  page = 0,
  size = 20,
  searchTerm = '',
  sortField = 'created_date',
  sortType = 'ASC',
} = {}) => {
  const queryParams = {
    page,
    size,
    searchTerm,
    sortField,
    sortType,
  }

  try {
    // Reuse the get method from api.js
    return await getData('/api/materials', queryParams, true)
  } catch (error) {
    console.error('Error fetching materials:', error)
    throw error
  }
}

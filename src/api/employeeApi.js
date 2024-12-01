import { getData } from './api'

export const getEmployees = async ({
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
    return await getData('/api/employees', queryParams, true)
  } catch (error) {
    console.error('Error fetching employees:', error)
    throw error
  }
}

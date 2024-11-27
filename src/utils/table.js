export default function generateColumns(dataObject) {
  return Object.keys(dataObject).map((key) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
    dataIndex: key,
    key: key,
  }))
}

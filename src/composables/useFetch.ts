import { ref } from 'vue'

export function useFetch(url: string) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  async function fetchData() {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      data.value = await response.json()
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  fetchData()

  return {
    data,
    loading,
    error,
    fetchData,
  }
}

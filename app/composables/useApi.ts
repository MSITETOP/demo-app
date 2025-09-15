/**
 * API Composable
 * Предоставляет централизованное управление API запросами
 * с автоматическим выбором базового URL в зависимости от окружения
 */
export const useApi = () => {
  /**
   * Создает полный URL для API запроса
   * @param endpoint - конечная точка API (например, '/eval', '/options')
   * @returns полный URL для запроса
   */
  const getApiUrl = (endpoint: string): string => {
    // Используем URL из конфигурации
    const baseURL = 'https://roborest.ipgpromo.ru'
    
    // Убираем начальный слеш из endpoint если он есть
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    
    return `${baseURL}/${cleanEndpoint}`
  }
  
  /**
   * Выполняет POST запрос к API
   * @param endpoint - конечная точка API
   * @param body - тело запроса
   * @param options - дополнительные опции fetch
   * @returns Promise с результатом запроса
   */
  const apiPost = async <T = any>(
    endpoint: string, 
    body: any, 
    options: RequestInit = {}
  ): Promise<T> => {
    const url = getApiUrl(endpoint)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(body),
      ...options
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }
  
  /**
   * Выполняет POST запрос к API используя $fetch (Nuxt utility)
   * @param endpoint - конечная точка API
   * @param body - тело запроса
   * @returns Promise с результатом запроса
   */
  const apiFetch = async <T = any>(endpoint: string, body: any): Promise<T> => {
    const url = getApiUrl(endpoint)
    
    return $fetch<T>(url, {
      method: 'POST',
      body
    })
  }
  
  return {
    getApiUrl,
    apiPost,
    apiFetch
  }
}
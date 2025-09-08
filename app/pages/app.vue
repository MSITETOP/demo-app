<template>
  <div class="container mx-auto p-6">
    <!-- Header with title and add button -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Мои активити и роботы</h1>
      <B24Button 
        label="Добавить активити / робота"
        color="air-primary-success" 
        size="md"
        :icon="PlusIcon"
        @click="addActivity"
      />
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="i in 6" 
        :key="i"
        class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative"
      >
        <!-- Badge skeleton -->
        <B24Skeleton class="h-6 w-20 absolute -top-2 -right-2 rounded-full" />
        
        <!-- Activity card header skeleton -->
        <div class="flex justify-between items-start">
          <div class="flex items-center flex-1 mr-4">
            <B24Skeleton class="h-6 w-full max-w-48" />
          </div>
        </div>
      </div>
    </div>
    <!-- Activities Grid (3 columns) -->
    <div v-else-if="activities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="activity in activities" 
        :key="activity.id"
        class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow relative"
      >
        <!-- Badge in top right corner -->
        <B24Badge 
          class="absolute -top-2 -right-2" 
          color="air-primary-warning"
        >
          Запусков: {{ activity.usage }}
        </B24Badge>
        <!-- Activity card header -->
        <div class="flex justify-between items-start">
          <div class="flex items-center">
              <h3 
                class="font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                @click="editActivity(activity.id)"
              >
                {{ activity.name }}
              </h3>
          </div>
          
          <!-- Action buttons -->
          <div class="flex gap-2">
            <!-- Edit button -->
            <B24Button
              color="secondary"
              size="sm"
              variant="outline"
              :icon="EditPencilIcon"
              @click="editActivity(activity.id)"
            />
            
            <!-- Delete button -->
            <B24Button
              color="danger"
              size="sm"
              variant="outline"
              :icon="TrashcanIcon"
              @click="deleteActivity(activity.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-900 mb-2">Нет созданных активити</h3>
      <p class="text-gray-500 mb-6">Создайте свой первый активити или робота для начала работы</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditPencilIcon from '@bitrix24/b24icons-vue/main/EditPencilIcon'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import PlusIcon from '@bitrix24/b24icons-vue/button/PlusIcon'
import { initializeB24Frame } from '@bitrix24/b24jssdk'
interface Activity {
  id: string
  name: string
  usage: number
}

interface ApiResponse {
  limit: number
  activities: {
    id: string
    name: string
    usage: number
  }[]
}

const activities = ref<Activity[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const memberId = ref<string>('')

// Initialize Bitrix24 frame and get member_id
const $b24 = await initializeB24Frame()

onMounted(async () => {
  // Get member_id from auth data
  const authData = $b24.auth.getAuthData()
  if (authData && typeof authData === 'object') {
    memberId.value = authData.member_id
  }
  
  // Load activities after getting member_id
  if (memberId.value) {
    await loadActivities()
  } else {
    console.error('No member_id found')
    error.value = 'Ошибка получения идентификатора пользователя'
    isLoading.value = false
  }
})

// Load activities from API
const loadActivities = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    if (!memberId.value) {
      throw new Error('Member ID not available')
    }
    
    const data = await $fetch<ApiResponse>('https://d5dfibnvjutmk39e6uao.yl4tuxdu.apigw.yandexcloud.net/options', {
      method: 'POST',
      body: {
        member_id: memberId.value
      }
    })
    
    // Transform API data to our Activity interface
    activities.value = data.activities.map((item, index) => ({
      id: item.id,
      name: item.name,
      usage: item.usage
    }))
  } catch (err) {
    console.error('Error loading activities:', err)
    error.value = 'Ошибка загрузки активити'
  } finally {
    isLoading.value = false
  }
}



const addActivity = () => {
  // Navigate to activity creation page
  navigateTo('/activity/0')
}

const editActivity = (id: string) => {
  // Navigate to activity edit page
  navigateTo(`/activity/${id}`)
}

const deleteActivity = (id: string) => {
  // Confirm deletion
  if (confirm('Вы уверены, что хотите удалить это активити?')) {
    // Make POST request to delete the activity
    const deleteActivityAPI = async () => {
      try {
        // Use the member_id from auth data
        
        const response = await fetch('https://d5dfibnvjutmk39e6uao.yl4tuxdu.apigw.yandexcloud.net/set-activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            member_id: memberId.value,
            id: id,
            del: true
          })
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const responseData = await response.json()
        console.log('Activity deleted successfully:', responseData)
        
        // Remove from local array after successful API call
        activities.value = activities.value.filter(activity => activity.id !== id)
        
      } catch (error) {
        console.error('Error deleting activity:', error)
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
        alert(`Ошибка при удалении: ${errorMessage}`)
      }
    }
    
    // Execute the deletion
    deleteActivityAPI()
  }
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  })
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'активный':
      return 'bg-green-100 text-green-800'
    case 'неактивный':
      return 'bg-gray-100 text-gray-800'
    case 'ошибка':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
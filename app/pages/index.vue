<template>
  <div class="container mx-auto p-6">
    <!-- Header with title and add button -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Мои активити и роботы</h1>
      <B24Button 
        color="primary" 
        size="md"
        @click="addActivity"
      >
        <B24Icon name="plus" class="mr-2" />
        + добавить активити / робота
      </B24Button>
    </div>

    <!-- Activities Grid (3 columns) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="activity in activities" 
        :key="activity.id"
        class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <!-- Activity card header -->
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center">
              <h3 class="font-semibold text-gray-800">{{ activity.name }}</h3>
          </div>
          
          <!-- Edit button -->
          <B24Button
            color="secondary"
            size="sm"
            variant="outline"
            @click="editActivity(activity.id)"
            class="p-2"
          >
            <B24Icon name="edit" class="text-gray-600" >Редактировать</B24Icon>
          </B24Button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="activities.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <B24Icon name="robot" class="text-gray-400 w-8 h-8" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Нет созданных активити</h3>
      <p class="text-gray-500 mb-6">Создайте свой первый активити или робота для начала работы</p>
      <B24Button 
        color="primary" 
        @click="addActivity"
      >
        <B24Icon name="plus" class="mr-2" />
        Создать первый активити
      </B24Button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Activity {
  id: string
  name: string
  type: 'активити' | 'робот'
  icon: string
  endpoint: string
  createdAt: Date
  status: 'активный' | 'неактивный' | 'ошибка'
}

// Sample data for demonstration
const activities = ref<Activity[]>([
  {
    id: '1',
    name: 'Отправка уведомлений',
    type: 'активити',
    icon: 'mail',
    endpoint: 'https://api.example.com/notify',
    createdAt: new Date('2024-01-15'),
    status: 'активный'
  },
  {
    id: '2', 
    name: 'Обработка заявок',
    type: 'робот',
    icon: 'robot',
    endpoint: 'https://api.example.com/process',
    createdAt: new Date('2024-01-10'),
    status: 'активный'
  },
  {
    id: '3',
    name: 'Синхронизация данных',
    type: 'активити',
    icon: 'sync',
    endpoint: 'https://api.example.com/sync',
    createdAt: new Date('2024-01-05'),
    status: 'неактивный'
  }
])

const addActivity = () => {
  // Navigate to activity creation page
  navigateTo('/activity/create')
}

const editActivity = (id: string) => {
  // Navigate to activity edit page
  navigateTo(`/activity/${id}`)
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
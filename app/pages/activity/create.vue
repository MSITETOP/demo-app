<template>
  <div class="container mx-auto p-6">
    <!-- Editable Header -->
    <div class="mb-8">
      <div v-if="!isEditingTitle" class="flex items-center gap-3">
        <h1 
          class="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
          @click="startEditingTitle"
          title="Нажмите для редактирования"
        >
          {{ activityTitle }}
        </h1>
        <B24Button
          size="sm"
          variant="outline"
          @click="startEditingTitle"
          class="p-2"
        >
          <B24Icon name="settings" class="w-4 h-4 text-gray-600" />
        </B24Button>
      </div>
      
      <div v-else class="flex items-center gap-3">
        <input
          ref="titleInput"
          v-model="editableTitle"
          type="text"
          class="text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-600 min-w-0 flex-1"
          @blur="saveTitle"
          @keyup.enter="saveTitle"
          @keyup.escape="cancelEdit"
          placeholder="Введите название активити"
        />
        <div class="flex gap-2">
          <B24Button
            size="sm"
            color="primary"
            @click="saveTitle"
          >
            ✓
          </B24Button>
          <B24Button
            size="sm"
            variant="outline"
            @click="cancelEdit"
          >
            ✕
          </B24Button>
        </div>
      </div>
      
      <p class="text-gray-500 mt-2">
        {{ isNewActivity ? 'Создание нового активити' : 'Редактирование активити' }}
      </p>
    </div>

    <!-- Back button -->
    <div class="mb-6">
      <B24Button
        variant="outline"
        @click="goBack"
        class="flex items-center gap-2"
      >
        <span>←</span>
        Назад к списку
      </B24Button>
    </div>

    <!-- Configuration Content -->
    <div class="space-y-8">
      <!-- Input Parameters Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Входящие параметры</h2>
        
        <!-- Input Fields List -->
        <div class="space-y-4">
          <div 
            v-for="(field, index) in inputFields" 
            :key="field.id"
            class="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-lg"
          >
            <!-- Column 1: Field Code -->
            <div class="col-span-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Код поля
              </label>
              <input
                type="text"
                :value="field.code"
                readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm"
              />
            </div>
            
            <!-- Column 2: Field Name Input -->
            <div class="col-span-7">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Название поля
              </label>
              <input
                v-model="field.name"
                type="text"
                placeholder="Введите название поля"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            <!-- Column 3: Delete Button -->
            <div class="col-span-1 flex justify-end">
              <B24Button
                color="danger"
                variant="outline"
                size="sm"
                @click="removeField(index)"
                class="p-2"
                title="Удалить поле"
              >
                <span class="text-red-600">✕</span>
              </B24Button>
            </div>
          </div>
          
          <!-- Empty state when no fields -->
          <div v-if="inputFields.length === 0" class="text-center py-8 text-gray-500">
            <p>Нет добавленных полей</p>
            <p class="text-sm">Добавьте поля для настройки входящих параметров</p>
          </div>
        </div>
        
        <!-- Add New Field Button -->
        <div class="mt-6">
          <B24Button
            color="primary"
            variant="outline"
            @click="addNewField"
            class="flex items-center gap-2"
          >
            <span>+</span>
            Добавить поле
          </B24Button>
        </div>
      </div>
      
      <!-- Future sections placeholder -->
      <div class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p class="text-gray-500">
          Здесь будут добавлены другие элементы конфигурации активити
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface InputField {
  id: string
  code: string
  name: string
}

const route = useRoute()
const router = useRouter()

// Determine if this is a new activity or editing existing one
const isNewActivity = computed(() => route.path === '/activity/create')
const activityId = computed(() => route.params.id as string)

// Title management
const activityTitle = ref('Новый активити')
const editableTitle = ref('')
const isEditingTitle = ref(false)
const titleInput = ref<HTMLInputElement>()

// Input Fields management
const inputFields = ref<InputField[]>([])
const fieldCounter = ref(1)

// Initialize title based on route
onMounted(() => {
  if (isNewActivity.value) {
    activityTitle.value = 'Новый активити'
  } else {
    // TODO: Load activity data by ID
    activityTitle.value = `Активити #${activityId.value}`
  }
})

// Input fields management functions
const addNewField = () => {
  const newField: InputField = {
    id: Date.now().toString(),
    code: `Field_input_${fieldCounter.value}`,
    name: ''
  }
  inputFields.value.push(newField)
  fieldCounter.value++
  
  console.log('Added new field:', newField)
}

const removeField = (index: number) => {
  const removedField = inputFields.value[index]
  inputFields.value.splice(index, 1)
  
  console.log('Removed field:', removedField)
}

const startEditingTitle = () => {
  editableTitle.value = activityTitle.value
  isEditingTitle.value = true
  
  nextTick(() => {
    if (titleInput.value) {
      titleInput.value.focus()
      titleInput.value.select()
    }
  })
}

const saveTitle = () => {
  if (editableTitle.value.trim()) {
    activityTitle.value = editableTitle.value.trim()
    isEditingTitle.value = false
    
    // TODO: Save title to backend/storage
    console.log('Saving title:', activityTitle.value)
  }
}

const cancelEdit = () => {
  editableTitle.value = ''
  isEditingTitle.value = false
}

const goBack = () => {
  router.push('/')
}

// Set page title
useHead({
  title: computed(() => `${activityTitle.value} - Конструктор активити`)
})
</script>
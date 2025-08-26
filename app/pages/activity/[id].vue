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
            <div class="col-span-3">
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
            <div class="col-span-4">
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
            
            <!-- Column 3: Test Value Input -->
            <div class="col-span-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Значение для тестирования
              </label>
              <input
                v-model="field.testValue"
                type="text"
                placeholder="Введите тестовое значение"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            
            <!-- Column 4: Delete Button -->
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
      
      <!-- Output Parameters Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Исходящие параметры</h2>
        
        <!-- Output Fields List -->
        <div class="space-y-4">
          <div 
            v-for="(field, index) in outputFields" 
            :key="field.id"
            class="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-lg"
          >
            <!-- Column 1: Field Code -->
            <div class="col-span-3">
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
            
            <!-- Column 3: Multiple Field Checkbox -->
            <div class="col-span-1 flex items-center">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="field.isMultiple"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700">Множественное</span>
              </label>
            </div>
            
            <!-- Column 4: Delete Button -->
            <div class="col-span-1 flex justify-end">
              <B24Button
                color="danger"
                variant="outline"
                size="sm"
                @click="removeOutputField(index)"
                class="p-2"
                title="Удалить поле"
              >
                <span class="text-red-600">✕</span>
              </B24Button>
            </div>
          </div>
          
          <!-- Empty state when no fields -->
          <div v-if="outputFields.length === 0" class="text-center py-8 text-gray-500">
            <p>Нет добавленных полей</p>
            <p class="text-sm">Добавьте поля для настройки исходящих параметров</p>
          </div>
        </div>
        
        <!-- Add New Output Field Button -->
        <div class="mt-6">
          <B24Button
            color="primary"
            variant="outline"
            @click="addNewOutputField"
            class="flex items-center gap-2"
          >
            <span>+</span>
            Добавить поле
          </B24Button>
        </div>
      </div>

      <!-- Activity Code Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Код активити</h2>
        
        <div class="space-y-6">
          <!-- Code Textarea -->
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Код
            </label>
            <textarea
              v-model="testCode"
              placeholder="Введите код для выполнения"
              rows="16"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono resize-y"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Request Testing Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Тестирование запросов</h2>
        
        <div class="space-y-6">
          <!-- Result Textarea -->
          <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Результат
            </label>
            <textarea
              v-model="testResult"
              placeholder="Результат выполнения будет отображен здесь"
              rows="12"
              readonly
              class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono resize-y"
            ></textarea>
          </div>
          
          <!-- Test Actions -->
          <div class="flex gap-3">
            <B24Button
              color="primary"
              @click="executeTest"
              class="flex items-center gap-2"
            >
              <span>▶</span>
              Выполнить тест
            </B24Button>

          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
interface InputField {
  id: string
  code: string
  name: string
  testValue: string
}

interface OutputField {
  id: string
  code: string
  name: string
  isMultiple: boolean
}

const route = useRoute()
const router = useRouter()

// Get activity ID from route params
const activityId = computed(() => route.params.id as string)

// Title management
const activityTitle = ref('')
const editableTitle = ref('')
const isEditingTitle = ref(false)
const titleInput = ref<HTMLInputElement>()

// Input Fields management
const inputFields = ref<InputField[]>([])
const fieldCounter = ref(1)

// Output Fields management
const outputFields = ref<OutputField[]>([])
const outputFieldCounter = ref(1)

// Request Testing management
const testInputParams = ref('')
const testCode = ref('')
const testResult = ref('')

// Load activity data on mount
onMounted(() => {
  loadActivityData()
})

const loadActivityData = () => {
  // TODO: Load actual activity data from backend/storage
  // For now, simulate loading data based on ID
  const sampleActivities = [
    { id: '1', name: 'Отправка уведомлений' },
    { id: '2', name: 'Обработка заявок' },
    { id: '3', name: 'Синхронизация данных' }
  ]
  
  const activity = sampleActivities.find(a => a.id === activityId.value)
  activityTitle.value = activity ? activity.name : `Активити #${activityId.value}`
  
  // Load sample input fields
  inputFields.value = [
    { id: '1', code: 'Field_input_1', name: 'Первое поле', testValue: '' },
    { id: '2', code: 'Field_input_2', name: 'Второе поле', testValue: '' }
  ]
  fieldCounter.value = 3
  
  // Load sample output fields
  outputFields.value = [
    { id: '1', code: 'Field_output_1', name: 'Результат обработки', isMultiple: false },
    { id: '2', code: 'Field_output_2', name: 'Статус выполнения', isMultiple: false }
  ]
  outputFieldCounter.value = 3
  
  // Load sample test data
  testInputParams.value = '{\n  "user_id": 123,\n  "action": "process_data",\n  "params": {\n    "type": "notification"\n  }\n}'
  testCode.value = '// Пример кода для тестирования\nconsole.log("Начало выполнения");\n\n// Обработка входящих параметров\nconst result = {\n  status: "success",\n  message: "Операция выполнена успешно"\n};\n\nreturn result;'
  testResult.value = ''
}

// Input fields management functions
const addNewField = () => {
  const newField: InputField = {
    id: Date.now().toString(),
    code: `Field_input_${fieldCounter.value}`,
    name: '',
    testValue: ''
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

// Output fields management functions
const addNewOutputField = () => {
  const newField: OutputField = {
    id: Date.now().toString(),
    code: `Field_output_${outputFieldCounter.value}`,
    name: '',
    isMultiple: false
  }
  outputFields.value.push(newField)
  outputFieldCounter.value++
  
  console.log('Added new output field:', newField)
}

const removeOutputField = (index: number) => {
  const removedField = outputFields.value[index]
  outputFields.value.splice(index, 1)
  
  console.log('Removed output field:', removedField)
}

// Request Testing functions
const executeTest = () => {
  try {
    // Clear previous result
    testResult.value = ''
    
    // Validate input parameters
    let inputData = {}
    if (testInputParams.value.trim()) {
      try {
        inputData = JSON.parse(testInputParams.value)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
        testResult.value = 'Ошибка: Неверный формат JSON во входящих параметрах\n' + errorMessage
        return
      }
    }
    
    // TODO: Execute the test code with input parameters
    // For now, simulate execution
    const timestamp = new Date().toISOString()
    testResult.value = `Выполнение теста: ${timestamp}\n\nВходящие параметры:\n${JSON.stringify(inputData, null, 2)}\n\nКод для выполнения:\n${testCode.value}\n\n--- Результат выполнения ---\n(Здесь будет результат выполнения кода)`
    
    console.log('Executing test with params:', inputData, 'and code:', testCode.value)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
    testResult.value = `Ошибка выполнения: ${errorMessage}`
    console.error('Test execution error:', error)
  }
}

const clearTestData = () => {
  testInputParams.value = ''
  testCode.value = ''
  testResult.value = ''
  
  console.log('Cleared test data')
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
    console.log('Saving title for activity', activityId.value, ':', activityTitle.value)
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
  title: computed(() => `${activityTitle.value} - Редактирование активити`)
})
</script>
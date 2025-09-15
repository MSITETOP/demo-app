<template>
  <div class="container mx-auto p-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-8">
      <!-- Header Skeleton -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div class="flex-1 flex items-center gap-3">
            <B24Skeleton class="w-6 h-6" />
            <B24Skeleton class="h-8 w-64" />
          </div>
          <div class="ml-4">
            <B24Skeleton class="w-10 h-8" />
          </div>
        </div>
      </div>

      <!-- Input Parameters Section Skeleton -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <B24Skeleton class="h-6 w-48 mb-6" />
        
        <div class="space-y-4">
          <div v-for="i in 2" :key="'input-skeleton-' + i" class="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-lg">
            <div class="col-span-3">
              <B24Skeleton class="h-4 w-16 mb-1" />
              <B24Skeleton class="h-8 w-full" />
            </div>
            <div class="col-span-4">
              <B24Skeleton class="h-4 w-20 mb-1" />
              <B24Skeleton class="h-8 w-full" />
            </div>
            <div class="col-span-4">
              <B24Skeleton class="h-4 w-32 mb-1" />
              <B24Skeleton class="h-8 w-full" />
            </div>
            <div class="col-span-1 flex justify-end">
              <B24Skeleton class="w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <B24Skeleton class="h-8 w-32" />
        </div>
      </div>
      
      <!-- Output Parameters Section Skeleton -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <B24Skeleton class="h-6 w-48 mb-6" />
        
        <div class="space-y-4">
          <div v-for="i in 2" :key="'output-skeleton-' + i" class="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-lg">
            <div class="col-span-3">
              <B24Skeleton class="h-4 w-16 mb-1" />
              <B24Skeleton class="h-8 w-full" />
            </div>
            <div class="col-span-7">
              <B24Skeleton class="h-4 w-20 mb-1" />
              <B24Skeleton class="h-8 w-full" />
            </div>
            <div class="col-span-1">
              <B24Skeleton class="h-4 w-16" />
            </div>
            <div class="col-span-1 flex justify-end">
              <B24Skeleton class="w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <B24Skeleton class="h-8 w-32" />
        </div>
      </div>

      <!-- Activity Code Section Skeleton -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <B24Skeleton class="h-6 w-32 mb-6" />
        
        <div class="space-y-6">
          <div class="w-full">
            <B24Skeleton class="w-full h-96 rounded-md" />
          </div>
        </div>
      </div>

      <!-- Request Testing Section Skeleton -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <B24Skeleton class="h-6 w-48" />
          <B24Skeleton class="h-8 w-32" />
        </div>
        
        <div class="space-y-6">
          <div class="w-full">
            <div class="bg-gray-50 border border-gray-300 rounded-md p-4">
              <div class="text-center py-8">
                <B24Skeleton class="h-4 w-64 mx-auto mb-2" />
                <B24Skeleton class="h-4 w-48 mx-auto" />
              </div>
            </div>
          </div>

          <div class="w-full">
            <div class="flex justify-between items-center mb-6">
              <B24Skeleton class="h-6 w-16" />
              <div class="flex gap-2">
                <B24Skeleton class="h-8 w-20" />
                <B24Skeleton class="h-8 w-24" />
                <B24Skeleton class="h-8 w-24" />
              </div>
            </div>
            
            <B24Skeleton class="w-full h-80 rounded-lg" />
          </div>
        </div>
      </div>
    </div>

    <!-- Actual Content - Hidden during loading -->
    <div v-else>
      <!-- Editable Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div class="flex-1 flex items-center gap-3">
            <Pencil60Icon class="w-6 h-6 text-gray-500" />
            <input
              ref="titleInput"
              type="text"
              v-model="activityTitle"
              class="text-2xl font-bold text-gray-800 bg-transparent p-0 border-0 focus: min-w-0 flex-1"
              placeholder="Введите название активити"
            />
          </div>
          <!-- Delete Activity Button -->
          <div class="ml-4">
            <B24Button
              color="danger"
              variant="solid"
              size="sm"
              class="p-2 bg-red-600 hover:bg-red-700 text-white"
              title="Удалить активити"
              :disabled="activityId === '0'"
              @click="deleteActivity"
            >
              <TrashcanIcon class="w-4 h-4" />
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
            <div class="col-span-1 flex justify-end" style="line-height: 2.5rem; margin-top: 1.5rem;">
              <B24Button
                color="danger"
                variant="outline"
                size="sm"
                @click="removeField(index)"
                class="p-2"
                title="Удалить поле"
              >
                <span class="text-white">✕</span>
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
            <div class="col-span-1 flex items-center" style="line-height: 2.5rem; margin-top: 1.5rem;">
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
            <div class="col-span-1 flex justify-end" style="line-height: 2.5rem; margin-top: 1.5rem;">
              <B24Button
                color="danger"
                variant="outline"
                size="sm"
                @click="removeOutputField(index)"
                class="p-2"
                title="Удалить поле"
              >
                <span class="text-white">✕</span>
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
          <!-- Monaco Editor -->
          <div class="w-full">
            <ClientOnly>
              <VueMonacoEditor
                v-model:value="testCode"
                theme="vs"
                language="typescript"
                :options="{
                  automaticLayout: true,
                  fontSize: 14,
                  fontFamily: 'Monaco, Menlo, Consolas, \'Courier New\', monospace',
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  formatOnPaste: true,
                  formatOnType: true,
                  tabSize: 2,
                  insertSpaces: true,
                  folding: true,
                  autoIndent: 'full',
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: {
                    other: true,
                    comments: true,
                    strings: true
                  },
                  quickSuggestionsDelay: 10,
                  parameterHints: {
                    enabled: true,
                    cycle: true
                  },
                  hover: {
                    enabled: true,
                    delay: 300
                  },
                  contextmenu: true,
                  acceptSuggestionOnEnter: 'on',
                  acceptSuggestionOnCommitCharacter: true,
                  snippetSuggestions: 'top',
                  wordBasedSuggestions: 'allDocuments',
                  colorDecorators: true,
                  codeLens: true,
                  lightbulb: {
                    enabled: true
                  } as any,
                  bracketPairColorization: {
                    enabled: true
                  },
                  guides: {
                    bracketPairs: true,
                    indentation: true
                  }
                }"
                class="border border-gray-300 rounded-md"
                style="height: 800px;"
              />
              <template #fallback>
                <div class="w-full h-96 border border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
                  <div class="text-gray-500">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p>Загрузка редактора...</p>
                  </div>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>

      <!-- Request Testing Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Тестирование запросов</h2>
          <B24Button
            color="primary"
            @click="executeTest"
            :disabled="isTestRunning"
            class="flex items-center gap-2"
          >
            <span v-if="!isTestRunning">▶</span>
            <span v-else class="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            {{ isTestRunning ? 'Выполняется...' : 'Выполнить тест' }}
          </B24Button>
        </div>
        
        <div class="space-y-6">
          <!-- Output Fields Results -->
          <div class="w-full">
            <div class="bg-gray-50 border border-gray-300 rounded-md p-4">
              <div v-if="Object.keys(outputResults).length === 0" class="text-center py-8 text-gray-500">
                <p>Результаты появятся после выполнения теста</p>
                <p class="text-sm">Нажмите "Выполнить тест" для получения результатов</p>
              </div>
              
              <div v-else class="space-y-3">
                <div 
                  v-for="(value, key) in outputResults" 
                  :key="key"
                  class="flex items-center justify-between p-3 bg-white rounded border"
                >
                  <div class="flex-1">
                    <div class="font-bold text-gray-900">
                      {{ getOutputFieldDescription(key) }}
                    </div>
                    <div class="text-sm text-gray-600">{{ key }}</div>
                    <div v-if="getOutputFieldMultiple(key)" class="text-xs text-blue-600">
                      ✓ Множественное поле
                    </div>
                  </div>
                  <div class="flex-1 px-4">
                    <div :class="getValueDisplayClass(value)" class="font-mono px-2 py-1 rounded text-sm">
                      {{ formatDisplayValue(value) }}
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ getValueType(value) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Execution Logs -->
          <div class="w-full">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-semibold text-gray-800">
                Логи
                <span v-if="activeLogFilters.size > 0" class="text-sm font-normal text-gray-500 ml-2">
                  (показано {{ filteredLogs.length }} из {{ activityLogs.length }})
                </span>
              </h3>
              <div class="flex gap-2">
                <B24Button
                  variant="outline"
                  size="sm"
                  @click="clearLogs"
                  class="flex items-center gap-2"
                  title="Очистить логи"
                >
                  <span>🗑️</span>
                  Очистить
                </B24Button>
                <B24Button
                  v-if="activeLogFilters.size > 0"
                  variant="outline"
                  size="sm"
                  @click="clearLogFilters"
                  class="flex items-center gap-2"
                  title="Сбросить фильтры"
                >
                  <span>🔄</span>
                  Показать все
                </B24Button>
                <B24Button
                  variant="outline"
                  size="sm"
                  @click="downloadLogs"
                  :disabled="activityLogs.length === 0"
                  class="flex items-center gap-2"
                  title="Скачать логи"
                >
                  <span>📥</span>
                  Скачать
                </B24Button>
              </div>
            </div>
            
            <!-- Log Statistics (if logs exist) -->
            <div v-if="activityLogs.length > 0" class="grid grid-cols-4 gap-4 mb-4">
              <button 
                @click="toggleLogFilter('DEBUG')"
                :class="[
                  'p-3 rounded text-center transition-all duration-200 border-2',
                  activeLogFilters.has('DEBUG') 
                    ? 'bg-blue-100 border-blue-500 shadow-md' 
                    : 'bg-gray-50 border-transparent hover:bg-blue-50 hover:border-blue-200'
                ]"
              >
                <div class="text-2xl font-bold text-blue-600">{{ logStats.DEBUG }}</div>
                <div class="text-xs text-blue-600">DEBUG</div>
              </button>
              <button 
                @click="toggleLogFilter('INFO')"
                :class="[
                  'p-3 rounded text-center transition-all duration-200 border-2',
                  activeLogFilters.has('INFO') 
                    ? 'bg-green-100 border-green-500 shadow-md' 
                    : 'bg-gray-50 border-transparent hover:bg-green-50 hover:border-green-200'
                ]"
              >
                <div class="text-2xl font-bold text-green-600">{{ logStats.INFO }}</div>
                <div class="text-xs text-green-600">INFO</div>
              </button>
              <button 
                @click="toggleLogFilter('WARN')"
                :class="[
                  'p-3 rounded text-center transition-all duration-200 border-2',
                  activeLogFilters.has('WARN') 
                    ? 'bg-orange-100 border-orange-400 shadow-md' 
                    : 'bg-gray-50 border-transparent hover:bg-orange-50 hover:border-orange-200'
                ]"
              >
                <div class="text-2xl font-bold text-orange-400">{{ logStats.WARN }}</div>
                <div class="text-xs text-orange-400">WARN</div>
              </button>
              <button 
                @click="toggleLogFilter('ERROR')"
                :class="[
                  'p-3 rounded text-center transition-all duration-200 border-2',
                  activeLogFilters.has('ERROR') 
                    ? 'bg-red-100 border-red-500 shadow-md' 
                    : 'bg-gray-50 border-transparent hover:bg-red-50 hover:border-red-200'
                ]"
              >
                <div class="text-2xl font-bold text-red-600">{{ logStats.ERROR }}</div>
                <div class="text-xs text-red-600">ERROR</div>
              </button>
            </div>
            
            <!-- Terminal-style log container -->
            <div class="bg-gray-50 rounded-lg border border-gray-300 h-80 overflow-y-auto font-mono text-sm">
              <div v-if="activityLogs.length === 0" class="p-4 text-center text-gray-500">
                <p>Логи появятся после выполнения теста</p>
              </div>
              
              <div v-else-if="filteredLogs.length === 0 && activeLogFilters.size > 0" class="p-4 text-center text-gray-500">
                <p>Нет логов, соответствующих выбранным фильтрам</p>
                <p class="text-sm">Используйте кнопку "Показать все" для сброса фильтров</p>
              </div>
              
              <div v-else class="p-4 space-y-2">
                <TransitionGroup name="log-filter" tag="div" class="space-y-2">
                  <div 
                    v-for="log in filteredLogs" 
                    :key="log.id"
                    class="flex gap-4 items-start"
                  >
                    <span 
                      :class="getLogLevelClass(log.level)" 
                      class="inline-flex items-center px-2 py-1 rounded text-xs font-medium min-w-[80px] justify-center"
                    >
                      {{ log.level }}
                    </span>
                    <span 
                      :class="getLogTextClass(log.level)" 
                      class="flex-1"
                    >
                      {{ log.emoji ? log.emoji + ' ' : '' }}{{ log.message }}
                    </span>
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Save Bar - Only show when there are changes -->
    <div v-if="hasChanges" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-sm text-gray-600">
          <span v-if="activityId === '0'">Несохраненные изменения в новом активити</span>
          <span v-else>У вас есть несохраненные изменения</span>
        </div>
        
        <div>
          <B24Button
            color="primary"
            @click="saveActivity"
            class="flex items-center gap-2"
            :disabled="isSaving"
          >
            <B24Icon v-if="!isSaving" name="check" class="w-4 h-4" />
            <span v-if="isSaving" class="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            {{ isSaving ? 'Сохранение...' : 'Сохранить изменения' }}
          </B24Button>
        </div>
      </div>
    </div>

    <!-- Add bottom padding to account for fixed save bar -->
    <div class="h-20"></div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import TrashcanIcon from '@bitrix24/b24icons-vue/outline/TrashcanIcon'
import Pencil60Icon from '@bitrix24/b24icons-vue/actions/Pencil60Icon'
import { initializeB24Frame } from '@bitrix24/b24jssdk'

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

// API response interfaces
interface ApiActivityResponse {
  code: string  // base64 encoded code
  counter: number
  id: string
  input_params: string  // JSON string
  member_id: string
  name: string
  output_params: string  // JSON string
}

interface ApiInputParam {
  code: string
  name: string
  testValue: string
}

interface ApiOutputParam {
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
const outputResults = ref<{[key: string]: any}>({})
const isTestRunning = ref(false)

// Activity Logs management
interface ActivityLog {
  id: string
  timestamp: string
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL' | 'PERF'
  message: string
  emoji?: string
}

const activityLogs = ref<ActivityLog[]>([])

// Log filtering
const activeLogFilters = ref<Set<ActivityLog['level']>>(new Set())

// Log statistics computed properties
const logStats = computed(() => {
  const stats = {
    DEBUG: 0,
    INFO: 0,
    WARN: 0,
    ERROR: 0,
    FATAL: 0,
    PERF: 0
  }
  
  activityLogs.value.forEach(log => {
    stats[log.level]++
  })
  
  return stats
})

// Filtered logs based on active filters
const filteredLogs = computed(() => {
  if (activeLogFilters.value.size === 0) {
    return activityLogs.value
  }
  
  return activityLogs.value.filter(log => 
    activeLogFilters.value.has(log.level)
  )
})

// Log level styling
const getLogLevelClass = (level: ActivityLog['level']) => {
  const classes = {
    DEBUG: 'bg-blue-600 text-white',
    INFO: 'bg-green-600 text-white',
    WARN: 'bg-orange-400 text-white',
    ERROR: 'bg-red-600 text-white',
    FATAL: 'bg-black text-white',
    PERF: 'bg-cyan-600 text-white'
  }
  return classes[level]
}

const getLogTextClass = (level: ActivityLog['level']) => {
  // Все тексты логов черные
  return 'text-black'
}

// Save management
const isSaving = ref(false)
const isLoading = ref(false)
const lastSaved = ref('')
const hasChanges = ref(false)
const memberId = ref<string>('')

// Initialize Bitrix24 frame and get member_id
const $b24 = await initializeB24Frame()

// Original data for change tracking
const originalData = ref({
  title: '',
  inputFields: [],
  outputFields: [],
  code: ''
})

// Load activity data on mount
onMounted(async () => {
  // Get member_id from auth data
  const authData = $b24.auth.getAuthData()
  if (authData && typeof authData === 'object') {
    memberId.value = authData.member_id
  }
  
  if (memberId.value) {
    await loadActivityData()
  } else {
    console.error('No member_id found')
    alert('Ошибка получения идентификатора пользователя')
  }
  
  // Configure Monaco Editor for enhanced JavaScript experience
  nextTick(() => {
    configureMonacoEditor()
  })
})

// Watch for route changes to reload activity data when navigating to different activity IDs
watch(() => route.params.id, async (newId) => {
  if (newId && memberId.value) {
    console.log('Route changed, loading activity data for ID:', newId)
    await loadActivityData()
  }
}, { immediate: false })

// Watch for changes to detect if form has been modified
watch([activityTitle, inputFields, outputFields, testCode], () => {
  checkForChanges()
}, { deep: true })

// Additional watch specifically for the title input
watch(activityTitle, (newTitle, oldTitle) => {
  console.log('Title changed:', { oldTitle, newTitle })
  checkForChanges()
})

// Function to check if current data differs from original
const checkForChanges = () => {
  const currentData = {
    title: activityTitle.value,
    inputFields: JSON.parse(JSON.stringify(inputFields.value)),
    outputFields: JSON.parse(JSON.stringify(outputFields.value)),
    code: testCode.value
  }
  
  hasChanges.value = JSON.stringify(currentData) !== JSON.stringify(originalData.value)
}

const loadActivityData = async () => {
  try {
    isLoading.value = true
    
    // Clear previous logs when loading new activity
    activityLogs.value = []
    outputResults.value = {}
    
    // Handle new activity creation when ID is '0'
    if (activityId.value === '0') {
      activityTitle.value = 'Новое активити'
      
      // Initialize with empty fields for new activity
      inputFields.value = []
      fieldCounter.value = 1
      
      outputFields.value = []
      outputFieldCounter.value = 1
      
      // Initialize with empty test data
      testInputParams.value = ''
      testCode.value = `// Пример активити с использованием params и logger
logger.info("Активити запущено");

// Получение входящих параметров
const input1 = params["field_input_1"];
const input2 = params["field_input_2"];

logger.debug("Входящие параметры:", { input1, input2 });

// Обработка данных
try {
  // Простые вычисления для демонстрации
  const sum = Number(input1) + Number(input2);
  const product = Number(input1) * Number(input2);
  
  logger.info("Вычисления выполнены", { sum, product });
  
  // Установка исходящих параметров
  params["field_output_1"] = [sum];
  params["field_output_2"] = [product];
  
  logger.info("Обработка завершена успешно");
  
} catch (error) {
  logger.error("Ошибка при обработке:", error);
  throw error;
}`
      testResult.value = ''
      
      // Store original data
      originalData.value = {
        title: activityTitle.value,
        inputFields: JSON.parse(JSON.stringify(inputFields.value)),
        outputFields: JSON.parse(JSON.stringify(outputFields.value)),
        code: testCode.value
      }
      
      // For new activities, always show changes (since it's new content)
      hasChanges.value = true
      
      return
    }
    
    if (!memberId.value) {
      throw new Error('Member ID not available')
    }
    
    // Make POST request to get-activity endpoint
    const response = await fetch('https://d5dfibnvjutmk39e6uao.yl4tuxdu.apigw.yandexcloud.net/get-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        member_id: memberId.value,
        id: activityId.value
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const activityData: ApiActivityResponse = await response.json()
    console.log('Activity data:', activityData);
    
    // Load activity data from API response
    activityTitle.value = activityData.name || `Активити #${activityId.value}`
    
    // Parse input_params from JSON string with type safety
    let inputParamsData: ApiInputParam[] = []
    try {
      const parsed = JSON.parse(activityData.input_params || '[]')
      inputParamsData = Array.isArray(parsed) ? parsed : []
    } catch (error) {
      console.error('Error parsing input_params:', error)
      inputParamsData = []
    }
    console.log(inputParamsData);
    // Load input fields - add unique IDs if not present
    inputFields.value = inputParamsData.map((field: ApiInputParam, index: number) => ({
      id: (Date.now() + index).toString(),
      code: field.code,
      name: field.name || '',
      testValue: field.testValue || ''
    }))
    fieldCounter.value = inputFields.value.length + 1
    
    // Parse output_params from JSON string with type safety
    let outputParamsData: ApiOutputParam[] = []
    try {
      const parsed = JSON.parse(activityData.output_params || '[]')
      outputParamsData = Array.isArray(parsed) ? parsed : []
    } catch (error) {
      console.error('Error parsing output_params:', error)
      outputParamsData = []
    }
    
    // Load output fields - add unique IDs if not present
    outputFields.value = outputParamsData.map((field: ApiOutputParam, index: number) => ({
      id: (Date.now() + index + 1000).toString(),
      code: field.code,
      name: field.name || '',
      isMultiple: field.isMultiple || false
    }))
    outputFieldCounter.value = outputFields.value.length + 1
    
    // Decode base64 code with proper UTF-8 handling
    let decodedCode = ''
    if (activityData.code) {
      try {
        // Proper UTF-8 decoding from base64
        const binaryString = atob(activityData.code)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        decodedCode = new TextDecoder('utf-8').decode(bytes)
      } catch (error) {
        console.error('Error decoding base64 code:', error)
        decodedCode = '// Ошибка декодирования кода активити'
      }
    }
    
    testCode.value = decodedCode
    testInputParams.value = ''
    testResult.value = ''
    
    // Store original data for change detection
    originalData.value = {
      title: activityTitle.value,
      inputFields: JSON.parse(JSON.stringify(inputFields.value)),
      outputFields: JSON.parse(JSON.stringify(outputFields.value)),
      code: testCode.value
    }
    
    // No changes initially for loaded activities
    hasChanges.value = false
    
    console.log('Activity data loaded successfully:', {
      id: activityData.id,
      name: activityData.name,
      counter: activityData.counter,
      inputFields: inputParamsData.length,
      outputFields: outputParamsData.length,
      codeLength: decodedCode.length
    })
    
  } catch (error) {
    console.error('Error loading activity data:', error)
    
    // Fallback to default values on error
    activityTitle.value = `Активити #${activityId.value}`
    inputFields.value = []
    outputFields.value = []
    testCode.value = '// Ошибка загрузки активити'
    
    // Show error message to user
    alert(`Ошибка загрузки активити: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`)
  } finally {
    isLoading.value = false
  }
}

// Input fields management functions
const addNewField = () => {
  const newField: InputField = {
    id: Date.now().toString(),
    code: `field_input_${fieldCounter.value}`,
    name: '',
    testValue: ''
  }
  inputFields.value.push(newField)
  fieldCounter.value++
  checkForChanges()
  
  console.log('Added new field:', newField)
}

const removeField = (index: number) => {
  const removedField = inputFields.value[index]
  inputFields.value.splice(index, 1)
  checkForChanges()
  
  console.log('Removed field:', removedField)
}

// Output fields management functions
const addNewOutputField = () => {
  const newField: OutputField = {
    id: Date.now().toString(),
    code: `field_output_${outputFieldCounter.value}`,
    name: '',
    isMultiple: false
  }
  outputFields.value.push(newField)
  outputFieldCounter.value++
  checkForChanges()
  
  console.log('Added new output field:', newField)
}

const removeOutputField = (index: number) => {
  const removedField = outputFields.value[index]
  outputFields.value.splice(index, 1)
  checkForChanges()
  
  console.log('Removed output field:', removedField)
}

// Request Testing functions
const executeTest = async () => {
  try {
    isTestRunning.value = true
    // Clear previous logs and results
    activityLogs.value = []
    outputResults.value = {}
    
    // Add initial logs
    addLog('INFO', 'Запуск тестирования активити', '🚀')
    
    const timestamp = new Date().toISOString()
    console.log('Начало выполнения теста:', timestamp)
    
    // Validate input fields have test values
    const fieldsWithoutValues = inputFields.value.filter(field => !field.testValue)
    if (fieldsWithoutValues.length > 0) {
      addLog('WARN', `Некоторые входные поля не имеют тестовых значений: ${fieldsWithoutValues.map(f => f.code).join(', ')}`, '⚠️')
    }
    
    // Prepare request payload
    const inParams = inputFields.value.map(field => ({
      name: field.code,
      desc: field.name || `Поле ${field.code}`,
      value: field.testValue || ''
    }))
    
    const outParams = outputFields.value.map(field => ({
      name: field.code,
      desc: field.name || `Поле ${field.code}`,
      multiple: field.isMultiple
    }))
    
    // Encode activity code to base64 with proper UTF-8 handling
    const encoder = new TextEncoder()
    const utf8Bytes = encoder.encode(testCode.value)
    const binaryString = String.fromCharCode(...utf8Bytes)
    const activityCodeBase64 = btoa(binaryString)
    
    const requestPayload = {
      inParams,
      outParams,
      activityCode: activityCodeBase64
    }
    
    // Make POST request to Yandex Cloud Function
    addLog('INFO', 'Отправка запроса на сервер', '📤')
    
    const response = await fetch('https://d5dfibnvjutmk39e6uao.yl4tuxdu.apigw.yandexcloud.net/eval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestPayload)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const responseData = await response.json()
    addLog('INFO', 'Данные ответа получены и обработаны', '✅')
    
    // Store output results
    if (responseData.params) {
      outputResults.value = responseData.params
    }
    
    // Process logs from response
    if (responseData.logs && Array.isArray(responseData.logs)) {
      responseData.logs.forEach((logEntry: any) => {
        const level = logEntry.level?.toUpperCase() || 'INFO'
        let message = ''
        
        if (typeof logEntry.message === 'string') {
          message = logEntry.message
        } else if (typeof logEntry.message === 'object') {
          message = JSON.stringify(logEntry.message, null, 2)
        } else {
          message = String(logEntry.message)
        }
        
        // Map log level to our format
        const mappedLevel = (['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'].includes(level)) 
          ? level as ActivityLog['level'] 
          : 'INFO'
        
        addLog(mappedLevel, message)
      })
    }
    
    // addLog('INFO', 'Тестирование выполнено успешно', '🎉')
    
    console.log('Request payload:', requestPayload)
    console.log('Response data:', responseData)
    console.log('Тестирование выполнено успешно')
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
    addLog('FATAL', `Критическая ошибка при выполнении теста: ${errorMessage}`, '💀')
    console.error('Ошибка выполнения теста:', error)
  } finally {
    isTestRunning.value = false
  }
}

const clearTestData = () => {
  testInputParams.value = ''
  testCode.value = ''
  testResult.value = ''
  
  console.log('Cleared test data')
}

// New functions for log management
const clearLogs = () => {
  console.log('Clearing activity logs...')
  activityLogs.value = []
  // Clear filters when clearing logs
  activeLogFilters.value.clear()
}

// Log filter management functions
const toggleLogFilter = (level: ActivityLog['level']) => {
  if (activeLogFilters.value.has(level)) {
    activeLogFilters.value.delete(level)
  } else {
    activeLogFilters.value.add(level)
  }
  
  console.log('Active log filters:', Array.from(activeLogFilters.value))
}

const clearLogFilters = () => {
  activeLogFilters.value.clear()
  console.log('Cleared all log filters')
}

const downloadLogs = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  
  // Generate log content from current logs
  let logContent = ''
  activityLogs.value.forEach(log => {
    const emoji = log.emoji ? `${log.emoji} ` : ''
    logContent += `[${log.timestamp}] [${log.level}] ${emoji}${log.message}\n`
  })
  
  // Add performance summary
  const totalLogs = activityLogs.value.length
  const errorCount = logStats.value.ERROR + logStats.value.FATAL
  const warningCount = logStats.value.WARN
  
  logContent += `\n--- Статистика логов ---\n`
  logContent += `Общее количество: ${totalLogs}\n`
  logContent += `DEBUG: ${logStats.value.DEBUG}\n`
  logContent += `INFO: ${logStats.value.INFO}\n`
  logContent += `WARN: ${logStats.value.WARN}\n`
  logContent += `ERROR: ${logStats.value.ERROR}\n`
  logContent += `FATAL: ${logStats.value.FATAL}\n`
  logContent += `PERFORMANCE: ${logStats.value.PERF}\n`
  logContent += `\nОшибки/Предупреждения: ${errorCount + warningCount}\n`
  
  // Create and download file
  const blob = new Blob([logContent], { type: 'text/plain;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `activity-logs-${timestamp}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
  
  console.log('Downloaded activity logs:', `activity-logs-${timestamp}.txt`)
}

// Add log function for real-time logging
const addLog = (level: ActivityLog['level'], message: string, emoji?: string) => {
  const newLog: ActivityLog = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString().replace('T', ' ').substr(0, 23),
    level,
    message,
    emoji
  }
  
  activityLogs.value.push(newLog)
  
  // Auto-scroll to bottom (if implemented in UI)
  nextTick(() => {
    // You could add auto-scrolling logic here
  })
}

// Helper functions for output field display
const getFieldDescription = (fieldCode: string | number): string => {
  // Сначала ищем среди выходных полей
  const outputField = outputFields.value.find(f => f.code === String(fieldCode))
  if (outputField?.name) {
    return outputField.name
  }
  
  // Затем ищем среди входных полей
  const inputField = inputFields.value.find(f => f.code === String(fieldCode))
  if (inputField?.name) {
    return inputField.name
  }
  
  // Если не найдено, возвращаем дефолтное значение
  return `Поле ${fieldCode}`
}

const getOutputFieldDescription = (fieldCode: string | number): string => {
  return getFieldDescription(fieldCode)
}

const getOutputFieldMultiple = (fieldCode: string | number): boolean => {
  const field = outputFields.value.find(f => f.code === String(fieldCode))
  return field?.isMultiple || false
}

const getValueType = (value: any): string => {
  if (value === null || value === undefined) return 'Null'
  if (Array.isArray(value)) return 'Array'
  if (typeof value === 'object') return 'Object'
  if (typeof value === 'string') return 'String'
  if (typeof value === 'number') return 'Number'
  if (typeof value === 'boolean') return 'Boolean'
  return 'Unknown'
}

const getValueDisplayClass = (value: any): string => {
  const type = getValueType(value)
  const classes = {
    'String': 'text-green-600 bg-green-50',
    'Number': 'text-purple-600 bg-purple-50',
    'Boolean': 'text-blue-600 bg-blue-50',
    'Array': 'text-orange-600 bg-orange-50',
    'Object': 'text-gray-600 bg-gray-100',
    'Null': 'text-gray-400 bg-gray-50'
  }
  return classes[type as keyof typeof classes] || 'text-gray-600 bg-gray-100'
}

const formatDisplayValue = (value: any): string => {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') return `"${value}"`
  if (Array.isArray(value)) {
    if (value.length > 3) {
      return `[${value.slice(0, 3).map(v => JSON.stringify(v)).join(', ')}, ...] (${value.length} items)`
    }
    return JSON.stringify(value)
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value)
    if (keys.length > 3) {
      return `{${keys.slice(0, 3).join(', ')}, ...} (${keys.length} keys)`
    }
    return JSON.stringify(value)
  }
  return String(value)
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
    if (activityId.value === '0') {
      // For new activity, generate new ID and redirect
      const newId = Date.now().toString()
      console.log('Creating new activity with ID', newId, ':', activityTitle.value)
      
      // TODO: Here you would typically save the activity to backend
      // For now, just navigate to the new ID
      router.push(`/activity/${newId}`)
    } else {
      console.log('Saving title for activity', activityId.value, ':', activityTitle.value)
    }
  }
}

const cancelEdit = () => {
  editableTitle.value = ''
  isEditingTitle.value = false
}

const goBack = () => {
  router.push('/')
}

// Configure Monaco Editor for enhanced JavaScript experience
const configureMonacoEditor = () => {
  if (typeof window !== 'undefined' && (window as any).monaco) {
    const monaco = (window as any).monaco
    
    // Register custom JavaScript snippets
    monaco.languages.registerCompletionItemProvider('typescript', {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = [
          {
            label: 'activity-basic-template',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '// Базовый шаблон активити с работой с params и logger',
              'logger.info("Активити запущено");',
              '',
              '// Получение входящих параметров',
              'const input1 = params["field_input_1"];',
              'const input2 = params["field_input_2"];',
              '',
              'logger.debug("Входящие параметры:", { input1, input2 });',
              '',
              '// Обработка данных',
              'try {',
              '\tconst result1 = ${1:input1 + input2};',
              '\tconst result2 = ${2:input1 * input2};',
              '\t',
              '\t// Установка исходящих параметров',
              '\tparams["field_output_1"] = [result1];',
              '\tparams["field_output_2"] = [result2];',
              '\t',
              '\tlogger.info("Обработка завершена успешно");',
              '} catch (error) {',
              '\tlogger.error("Ошибка при обработке:", error);',
              '\tthrow error;',
              '}'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Базовый шаблон активити с работой с входящими и исходящими параметрами'
          },
          {
            label: 'params-get-input',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '// Получение входящих параметров',
              'const ${1:paramName} = params["${2:field_input_1}"];',
              'logger.debug("Получен параметр ${1:paramName}:", ${1:paramName});'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Получение входящего параметра с логированием'
          },
          {
            label: 'params-set-output',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '// Установка исходящего параметра',
              'params["${1:field_output_1}"] = [${2:value}];',
              'logger.info("Установлен исходящий параметр ${1:field_output_1}:", ${2:value});'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Установка исходящего параметра с логированием'
          },
          {
            label: 'logger-all-levels',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '// Логирование на всех уровнях',
              'logger.debug("${1:Отладочная информация}", ${2:data});',
              'logger.info("${3:Информационное сообщение}");',
              'logger.warn("${4:Предупреждение}");',
              'logger.error("${5:Ошибка}:", ${6:error});',
              'logger.fatal("${7:Критическая ошибка}");'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Примеры логирования на всех доступных уровнях'
          },
          {
            label: 'activity-with-bitrix24',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '// Активити с интеграцией Bitrix24',
              'import { B24Hook } from \'@bitrix24/b24jssdk\';',
              '',
              'logger.info("Запуск активити с Bitrix24 интеграцией");',
              '',
              '// Получение параметров',
              'const webhookUrl = params["field_input_1"] || "https://your_domain.bitrix24.com/rest/1/xxxx/";',
              'const operation = params["field_input_2"] || "crm.deal.list";',
              '',
              'logger.debug("Параметры Bitrix24:", { webhookUrl, operation });',
              '',
              'try {',
              '\t// Инициализация Bitrix24 Hook',
              '\tconst b24 = B24Hook.fromWebhookUrl(webhookUrl);',
              '\tlogger.info("Bitrix24 Hook инициализирован");',
              '\t',
              '\t// Выполнение запроса',
              '\tconst result = await b24.call(operation, {',
              '\t\torder: { DATE_CREATE: "DESC" },',
              '\t\tlimit: 50',
              '\t});',
              '\t',
              '\tlogger.info(`Получено ${result.result?.length || 0} записей`);',
              '\t',
              '\t// Установка результата',
              '\tparams["field_output_1"] = [JSON.stringify(result.result)];',
              '\tparams["field_output_2"] = [`Операция ${operation} выполнена успешно`];',
              '\t',
              '\tlogger.info("Активити выполнено успешно");',
              '',
              '} catch (error) {',
              '\tlogger.error("Ошибка выполнения активити:", error);',
              '\tparams["field_output_1"] = [""];',
              '\tparams["field_output_2"] = [`Ошибка: ${error.message}`];',
              '\tthrow error;',
              '}'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Полный шаблон активити с Bitrix24 интеграцией, логированием и обработкой ошибок'
          },
          {
            label: 'nodejs-async-function',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'async function ${1:functionName}(${2:params}: any): Promise<any> {',
              '\ttry {',
              '\t\tconsole.log("Starting ${1:functionName}...");',
              '\t\t${3:// Your Node.js code here}',
              '\t\treturn ${4:result};',
              '\t} catch (error: any) {',
              '\t\tconsole.error("Error in ${1:functionName}:", error);',
              '\t\tthrow error;',
              '\t}',
              '}'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Node.js async function template with TypeScript types and error handling'
          },
          {
            label: 'nodejs-file-operation',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'import { promises as fs } from \'fs\';',
              'import path from \'path\';',
              '',
              'async function ${1:fileOperation}(filePath: string, data: any): Promise<any> {',
              '\ttry {',
              '\t\tconst safePath = path.resolve(process.cwd(), filePath);',
              '\t\t',
              '\t\t// Read file',
              '\t\tconst content = await fs.readFile(safePath, \'utf8\');',
              '\t\tconst parsedData = JSON.parse(content);',
              '\t\t',
              '\t\t// Process data',
              '\t\tconst result = { ...parsedData, ...data };',
              '\t\t',
              '\t\t// Write back',
              '\t\tawait fs.writeFile(safePath, JSON.stringify(result, null, 2));',
              '\t\t',
              '\t\treturn { success: true, filePath: safePath };',
              '\t} catch (error: any) {',
              '\t\tthrow new Error(`File operation failed: ${error.message}`);',
              '\t}',
              '}'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Node.js file system operation template with fs/promises'
          },
          {
            label: 'nodejs-http-request',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'import https from \'https\';',
              '',
              'function ${1:makeRequest}(url: string, data: any): Promise<any> {',
              '\treturn new Promise((resolve, reject) => {',
              '\t\tconst postData = JSON.stringify(data);',
              '\t\tconst urlObj = new URL(url);',
              '\t\t',
              '\t\tconst options = {',
              '\t\t\thostname: urlObj.hostname,',
              '\t\t\tport: urlObj.port || 443,',
              '\t\t\tpath: urlObj.pathname + urlObj.search,',
              '\t\t\tmethod: \'POST\',',
              '\t\t\theaders: {',
              '\t\t\t\t\'Content-Type\': \'application/json\',',
              '\t\t\t\t\'Content-Length\': Buffer.byteLength(postData)',
              '\t\t\t}',
              '\t\t};',
              '\t\t',
              '\t\tconst req = https.request(options, (res) => {',
              '\t\t\tlet responseData = \'\';',
              '\t\t\tres.on(\'data\', (chunk) => responseData += chunk);',
              '\t\t\tres.on(\'end\', () => {',
              '\t\t\t\ttry {',
              '\t\t\t\t\tresolve(JSON.parse(responseData));',
              '\t\t\t\t} catch {',
              '\t\t\t\t\tresolve(responseData);',
              '\t\t\t\t}',
              '\t\t\t});',
              '\t\t});',
              '\t\t',
              '\t\treq.on(\'error\', reject);',
              '\t\treq.write(postData);',
              '\t\treq.end();',
              '\t});',
              '}'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Node.js HTTPS request template using native modules'
          },
          {
            label: 'nodejs-class-template',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'import { EventEmitter } from \'events\';',
              '',
              'class ${1:ClassName} extends EventEmitter {',
              '\tprivate ${2:property}: ${3:string};',
              '\t',
              '\tconstructor(${4:param}: ${5:string}) {',
              '\t\tsuper();',
              '\t\tthis.${2:property} = ${4:param};',
              '\t}',
              '\t',
              '\tasync ${6:methodName}(${7:param}: any): Promise<any> {',
              '\t\ttry {',
              '\t\t\tthis.emit(\'progress\', { status: \'started\' });',
              '\t\t\t${8:// Your implementation}',
              '\t\t\tthis.emit(\'progress\', { status: \'completed\' });',
              '\t\t\treturn ${9:result};',
              '\t\t} catch (error) {',
              '\t\t\tthis.emit(\'error\', error);',
              '\t\t\tthrow error;',
              '\t\t}',
              '\t}',
              '}',
              '',
              'export default ${1:ClassName};'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Node.js class template extending EventEmitter with TypeScript'
          },
          {
            label: 'nodejs-activity-template',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              '// Node.js Bitrix24 Activity Template',
              'import { promisify } from \'util\';',
              '',
              'interface ActivityInput {',
              '\tuserId: number;',
              '\toperation: string;',
              '\tpayload?: any;',
              '}',
              '',
              'interface ActivityResult {',
              '\tstatus: \'success\' | \'error\';',
              '\tmessage: string;',
              '\tdata?: any;',
              '\terror?: string;',
              '}',
              '',
              'async function ${1:activityName}(input: ActivityInput): Promise<ActivityResult> {',
              '\tconsole.log("Node.js activity started:", input);',
              '\t',
              '\ttry {',
              '\t\tconst { userId, operation, payload = {} } = input;',
              '\t\t',
              '\t\t// Validate input',
              '\t\tif (!userId || !operation) {',
              '\t\t\tthrow new Error(\'Missing required parameters\');',
              '\t\t}',
              '\t\t',
              '\t\t// Process operation',
              '\t\tconst result = await processOperation(operation, payload);',
              '\t\t',
              '\t\treturn {',
              '\t\t\tstatus: \'success\',',
              '\t\t\tmessage: \'Activity completed successfully\',',
              '\t\t\tdata: result',
              '\t\t};',
              '\t\t',
              '\t} catch (error: any) {',
              '\t\tconsole.error("Activity failed:", error);',
              '\t\treturn {',
              '\t\t\tstatus: \'error\',',
              '\t\t\tmessage: error.message,',
              '\t\t\terror: error.stack',
              '\t\t};',
              '\t}',
              '}',
              '',
              'async function processOperation(operation: string, payload: any): Promise<any> {',
              '\t${2:// Implement your operation logic here}',
              '\treturn { operation, payload, processedAt: Date.now() };',
              '}',
              '',
              'export default ${1:activityName};'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Complete Node.js Bitrix24 activity template with TypeScript interfaces'
          },
          {
            label: 'bitrix24-hook-init',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'import { B24Hook } from \'@bitrix24/b24jssdk\';',
              '',
              'const b24 = B24Hook.fromWebhookUrl(\'https://your_domain.bitrix24.com/rest/1/xxxx/\');',
              '',
              'try {',
              '\tconst result = await b24.call(\'${1:crm.deal.list}\', {',
              '\t\torder: { DATE_CREATE: \'DESC\' },',
              '\t\tfilter: { ${2:STAGE_ID: \'NEW\'} },',
              '\t\tselect: [${3:\'ID\', \'TITLE\', \'STAGE_ID\', \'DATE_CREATE\'}]',
              '\t});',
              '',
              '\tconsole.log(\'Результат:\', result);',
              '\treturn result;',
              '} catch (err) {',
              '\tconsole.error(\'Ошибка при выполнении запроса:\', err.message);',
              '\tthrow err;',
              '}'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Bitrix24 SDK initialization and basic API call template'
          },
          {
            label: 'bitrix24-batch-call',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'import { B24Hook } from \'@bitrix24/b24jssdk\';',
              '',
              'const b24 = B24Hook.fromWebhookUrl(\'https://your_domain.bitrix24.com/rest/1/xxxx/\');',
              '',
              '// Batch operations for better performance',
              'const batch = {',
              '\t${1:deals}: [\'crm.deal.list\', {',
              '\t\torder: { DATE_CREATE: \'DESC\' },',
              '\t\tfilter: { STAGE_ID: \'NEW\' },',
              '\t\tselect: [\'ID\', \'TITLE\', \'STAGE_ID\'],',
              '\t\tlimit: 50',
              '\t}],',
              '\t${2:contacts}: [\'crm.contact.list\', {',
              '\t\torder: { DATE_CREATE: \'DESC\' },',
              '\t\tselect: [\'ID\', \'NAME\', \'LAST_NAME\', \'EMAIL\'],',
              '\t\tlimit: 50',
              '\t}]',
              '};',
              '',
              'try {',
              '\tconst batchResult = await b24.callBatch(batch);',
              '\tconsole.log(\'Batch results:\', batchResult);',
              '\treturn batchResult;',
              '} catch (err) {',
              '\tconsole.error(\'Ошибка batch операции:\', err.message);',
              '\tthrow err;',
              '}'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Bitrix24 batch API call template for multiple operations'
          },
          {
            label: 'bitrix24-crm-operation',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: [
              'import { B24Hook } from \'@bitrix24/b24jssdk\';',
              '',
              'async function ${1:crmOperation}(b24: any, ${2:entityId}: string, ${3:data}: any): Promise<any> {',
              '\ttry {',
              '\t\t// ${4:Create/Update/Delete} CRM entity',
              '\t\tconst result = await b24.call(\'${5:crm.deal.update}\', {',
              '\t\t\tid: ${2:entityId},',
              '\t\t\tfields: {',
              '\t\t\t\t...${3:data},',
              '\t\t\t\tDATE_MODIFY: new Date().toISOString()',
              '\t\t\t}',
              '\t\t});',
              '',
              '\t\tconsole.log(\'CRM operation result:\', result);',
              '',
              '\t\treturn {',
              '\t\t\tstatus: \'success\',',
              '\t\t\tmessage: \'Operation completed successfully\',',
              '\t\t\tdata: result.result',
              '\t\t};',
              '',
              '\t} catch (error: any) {',
              '\t\tconsole.error(\'CRM operation error:\', error.message);',
              '\t\treturn {',
              '\t\t\tstatus: \'error\',',
              '\t\t\tmessage: error.message,',
              '\t\t\tcode: error.code || \'CRM_ERROR\'',
              '\t\t};',
              '\t}',
              '}'
            ].join('\n'),
            insertTextFormat: monaco.languages.CompletionItemInsertTextFormat.Snippet,
            documentation: 'Bitrix24 CRM operation template with error handling'
          }
        ];
        
        return { suggestions };
      }
    });
    
    // Configure JavaScript language features
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      lib: ['ES2020', 'DOM'],
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      allowJs: true,
      strict: false,
      noImplicitAny: false,
      skipLibCheck: true,
      resolveJsonModule: true,
      typeRoots: ["node_modules/@types", "node_modules/@types/node"]
    });
    
    // Add common JavaScript libraries and APIs
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
      // Activity Context - Global variables available in activity code
      declare var params: {
        [key: string]: any;
      };
      
      declare var logger: {
        debug(message: string): void;
        info(message: string): void;
        warn(message: string): void;
        error(message: string): void;
      };
      `,
      'node-globals.d.ts'
    );
  }
}

// Save activity function
const saveActivity = async () => {
  try {
    isSaving.value = true
    
    // Validate required fields
    if (!activityTitle.value.trim()) {
      alert('Пожалуйста, введите название активити')
      return
    }
    
    if (!memberId.value) {
      alert('Ошибка: недоступен идентификатор пользователя')
      return
    }
    
    // Encode activity code to base64 with proper UTF-8 handling
    const encoder = new TextEncoder()
    const utf8Bytes = encoder.encode(testCode.value)
    const binaryString = String.fromCharCode(...utf8Bytes)
    const activityCodeBase64 = btoa(binaryString)
    
    // Prepare activity data in the same structure as the API response
    const activityData = {
      member_id: memberId.value,
      id: activityId.value,
      name: activityTitle.value,  // Use 'name' instead of 'title' to match API format
      input_params: JSON.stringify(inputFields.value.map(field => ({
        code: field.code,
        name: field.name,
        testValue: field.testValue
      }))),
      output_params: JSON.stringify(outputFields.value.map(field => ({
        code: field.code,
        name: field.name,
        isMultiple: field.isMultiple
      }))),
      code: activityCodeBase64
    }
    
    // Send data to set-activity endpoint
    const response = await fetch('https://d5dfibnvjutmk39e6uao.yl4tuxdu.apigw.yandexcloud.net/set-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activityData)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const responseData = await response.json()
    
    console.log('Activity saved successfully:', responseData)
    
    // После сохранения активити добавляем/обновляем робота в Битрикс24
    await addOrUpdateBitrix24Robot()
    
    // Handle new activity creation
    if (activityId.value === '0') {
      // Check if API returned an ID (for new activity creation)
      if (responseData.id) {
        const newId = responseData.id
        console.log('Created new activity with ID:', newId)
        
        // Update last saved timestamp
        lastSaved.value = new Date().toLocaleString('ru-RU')
        
        // Navigate to the new activity edit page
        await router.push(`/activity/${newId}`)
        return  // Exit early to avoid updating original data for old route
      } else {
        console.warn('API did not return ID for new activity')
        alert('Активити сохранено, но ID не получен. Перезагрузите страницу.')
      }
    } else {
      // Update last saved timestamp
      lastSaved.value = new Date().toLocaleString('ru-RU')
      console.log('Updated activity:', activityId.value)
    }
    
    // Reset changes state and update original data (only if we're not redirecting)
    if (activityId.value !== '0') {
      originalData.value = {
        title: activityTitle.value,
        inputFields: JSON.parse(JSON.stringify(inputFields.value)),
        outputFields: JSON.parse(JSON.stringify(outputFields.value)),
        code: testCode.value
      }
      hasChanges.value = false
    }
    
    // Show success message (you could use a toast notification instead)
    // alert('Активити успешно сохранено!')
    
  } catch (error) {
    console.error('Error saving activity:', error)
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
    alert(`Ошибка при сохранении: ${errorMessage}`)
  } finally {
    isSaving.value = false
  }
}

// Delete activity function
const deleteActivity = async () => {
  if (activityId.value === '0') {
    // Для новых активити просто возвращаемся на главную
    router.push('/')
    return
  }
  
  // Подтверждение удаления
  const confirmed = confirm(`Вы уверены, что хотите удалить активити "${activityTitle.value}"?\n\nЭто действие нельзя отменить.`)
  
  if (!confirmed) {
    return
  }
  
  try {
    console.log(`Удаление активити ${activityId.value}: ${activityTitle.value}`)
    
    if (!memberId.value) {
      alert('Ошибка: недоступен идентификатор пользователя')
      return
    }
    
    // Сначала удаляем робота из Битрикс24
    await deleteBitrix24Robot()
    
    // Send delete request to set-activity endpoint
    const response = await fetch('https://d5dfibnvjutmk39e6uao.yl4tuxdu.apigw.yandexcloud.net/set-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        member_id: memberId.value,
        id: activityId.value,
        del: true
      })
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const responseData = await response.json()
    console.log('Активити успешно удалено:', responseData)
    
    // Перейти на главную страницу
    router.push('/app')
    
  } catch (error) {
    console.error('Ошибка при удалении активити:', error)
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
    alert(`Ошибка при удалении: ${errorMessage}`)
  }
}

// Функция для добавления или обновления робота в Битрикс24
const addOrUpdateBitrix24Robot = async () => {
  try {
    console.log('Добавление/обновление робота в Битрикс24...')
    
    // Параметры для робота
    const robotParams = {
      CODE: activityId.value === '0' ? `activity_${Date.now()}` : `activity_${activityId.value}`, // ID активити
      HANDLER: 'https://d5dfibnvjutmk39e6uao.yl4tuxdu.apigw.yandexcloud.net/robot', // Адрес обработчика
      NAME: activityTitle.value || 'Активити робот', // Название робота
      PROPERTIES: {
        // Входящие параметры
        ...Object.fromEntries(
          inputFields.value.map(field => [
            field.code,
            {
              Name: field.name || field.code,
              Type: 'string',
              Required: 'N',
              Multiple: 'N'
            }
          ])
        ),
        // Исходящие параметры
        ...Object.fromEntries(
          outputFields.value.map(field => [
            field.code,
            {
              Name: field.name || field.code,
              Type: 'string',
              Required: 'N',
              Multiple: field.isMultiple ? 'Y' : 'N'
            }
          ])
        )
      }
    }
    
    console.log('Параметры робота:', robotParams)
    
    // Вызов API Битрикс24 для добавления робота
    const result = await $b24.callMethod('bizproc.robot.add', robotParams)
    
    console.log('Робот успешно добавлен/обновлен в Битрикс24:', result)
    
    // Можно добавить уведомление пользователю о успешном создании робота
    // alert('Робот успешно создан в Битрикс24!')
    
  } catch (error: any) {
    console.error('Ошибка при добавлении/обновлении робота в Битрикс24:', error)
    
    // Проверяем, существует ли уже такой робот
    if (error && typeof error === 'object' && error.error_description) {
      const errorDesc = String(error.error_description)
      if (errorDesc.includes('already exists') || errorDesc.includes('уже существует')) {
        console.log('Робот уже существует, попытка обновления...')
        
        try {
          // Попытка обновить существующий робот
          const updateParams = {
            CODE: activityId.value === '0' ? `activity_${Date.now()}` : `activity_${activityId.value}`,
            HANDLER: 'https://d5dfibnvjutmk39e6uao.yl4tuxdu.apigw.yandexcloud.net/robot',
            NAME: activityTitle.value || 'Активити робот',
            PROPERTIES: {
              // Входящие параметры
              ...Object.fromEntries(
                inputFields.value.map(field => [
                  field.code,
                  {
                    Name: field.name || field.code,
                    Type: 'string',
                    Required: 'N',
                    Multiple: 'N'
                  }
                ])
              ),
              // Исходящие параметры
              ...Object.fromEntries(
                outputFields.value.map(field => [
                  field.code,
                  {
                    Name: field.name || field.code,
                    Type: 'string',
                    Required: 'N',
                    Multiple: field.isMultiple ? 'Y' : 'N'
                  }
                ])
              )
            }
          }
          
          const updateResult = await $b24.callMethod('bizproc.robot.update', updateParams)
          
          console.log('Робот успешно обновлен в Битрикс24:', updateResult)
        } catch (updateError) {
          console.error('Ошибка при обновлении робота:', updateError)
          // Не прерываем выполнение, робот может быть не критичен для сохранения активити
        }
      } else {
        // Другие ошибки - просто логируем, не прерываем выполнение
        console.warn('Не удалось создать робота в Битрикс24, но активити сохранено:', error)
      }
    } else {
      console.warn('Неизвестная ошибка при работе с роботом Битрикс24:', error)
    }
  }
}

// Функция для удаления робота из Битрикс24
const deleteBitrix24Robot = async () => {
  try {
    console.log('Удаление робота из Битрикс24...')
    
    const robotCode = `activity_${activityId.value}`
    
    // Пытаемся удалить робота по коду
    await $b24.callMethod('bizproc.robot.delete', {
      CODE: robotCode
    })
    
    console.log('Робот успешно удален из Битрикс24:', robotCode)
    
  } catch (error: any) {
    console.error('Ошибка при удалении робота из Битрикс24:', error)
    
    // Проверяем, существует ли робот вообще
    if (error && typeof error === 'object' && error.error_description) {
      const errorDesc = String(error.error_description)
      if (errorDesc.includes('not found') || errorDesc.includes('не найден') || errorDesc.includes('does not exist')) {
        console.log('Робот не найден, возможно он уже был удален')
      } else {
        // Другие ошибки - просто логируем, не прерываем выполнение
        console.warn('Не удалось удалить робота из Битрикс24, но продолжаем удаление активити:', error)
      }
    } else {
      console.warn('Неизвестная ошибка при удалении робота Битрикс24:', error)
    }
  }
}

// Set page title
useHead({
  title: computed(() => {
    if (activityId.value === '0') {
      return 'Создание нового активити'
    }
    return `${activityTitle.value} - Редактирование активити`
  })
})
</script>

<style scoped>
/* Log filter transition animations */
.log-filter-enter-active, .log-filter-leave-active {
  transition: all 0.3s ease;
}

.log-filter-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.log-filter-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.log-filter-move {
  transition: transform 0.3s ease;
}
</style>
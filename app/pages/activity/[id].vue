<template>
  <div class="container mx-auto p-6">
    <!-- Editable Header -->
    <div class="mb-8">
      <div class="flex justify-between items-start">
        <div class="flex-1">
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
                style="height: 400px;"
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
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'

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

// Save management
const isSaving = ref(false)
const lastSaved = ref('')
const hasChanges = ref(false)

// Original data for change tracking
const originalData = ref({
  title: '',
  inputFields: [],
  outputFields: [],
  code: ''
})

// Load activity data on mount
onMounted(() => {
  loadActivityData()
  
  // Configure Monaco Editor for enhanced JavaScript experience
  nextTick(() => {
    configureMonacoEditor()
  })
})

// Watch for changes to detect if form has been modified
watch([activityTitle, inputFields, outputFields, testCode], () => {
  checkForChanges()
}, { deep: true })

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

const loadActivityData = () => {
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
    testCode.value = `// Node.js Activity - Server-side Processing
// This code demonstrates Node.js syntax highlighting and features

import { promises as fs } from 'fs';
import path from 'path';
import https from 'https';
import { promisify } from 'util';

/**
 * Main Node.js activity function
 * @param {Object} inputData - Input parameters from Bitrix24
 * @returns {Promise<Object>} Activity result
 */
async function executeNodeActivity(inputData: any): Promise<any> {
  console.log('🚀 Node.js activity started:', inputData);
  
  try {
    // Destructure input parameters with TypeScript types
    const { 
      userId, 
      operation, 
      filePath,
      apiEndpoint,
      data = {} 
    } = inputData;
    
    // Validate required parameters
    if (!userId || !operation) {
      throw new Error('Missing required parameters: userId or operation');
    }
    
    // Process different Node.js operations
    switch (operation) {
      case 'file_operation':
        return await handleFileOperation(filePath, data);
      
      case 'http_request':
        return await makeHttpRequest(apiEndpoint, data);
      
      case 'data_processing':
        return await processData(userId, data);
      
      case 'system_info':
        return await getSystemInfo();
      
      default:
        throw new Error(\`Unknown operation: \${operation}\`);
    }
    
  } catch (error: any) {
    console.error('❌ Node.js activity failed:', error);
    return {
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Handle file system operations
 */
async function handleFileOperation(filePath: string, data: any): Promise<any> {
  try {
    // Ensure safe file path
    const safePath = path.resolve(process.cwd(), 'data', path.basename(filePath));
    
    // Read existing file or create new
    let fileContent = '{}';
    try {
      fileContent = await fs.readFile(safePath, 'utf8');
    } catch (err) {
      console.log('File does not exist, creating new one');
    }
    
    // Parse and merge data
    const existingData = JSON.parse(fileContent);
    const mergedData = { ...existingData, ...data, updatedAt: Date.now() };
    
    // Write back to file
    await fs.writeFile(safePath, JSON.stringify(mergedData, null, 2));
    
    return {
      status: 'success',
      message: 'File operation completed',
      filePath: safePath,
      dataSize: JSON.stringify(mergedData).length
    };
    
  } catch (error: any) {
    throw new Error(\`File operation failed: \${error.message}\`);
  }
}

/**
 * Make HTTP requests using Node.js native modules
 */
async function makeHttpRequest(url: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Bitrix24-Activity/1.0'
      }
    };
    
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            status: 'success',
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsedData
          });
        } catch (error) {
          resolve({
            status: 'success',
            statusCode: res.statusCode,
            data: responseData
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(\`HTTP request failed: \${error.message}\`));
    });
    
    req.write(postData);
    req.end();
  });
}

/**
 * Get system information using Node.js APIs
 */
async function getSystemInfo(): Promise<any> {
  const os = require('os');
  
  return {
    status: 'success',
    systemInfo: {
      platform: process.platform,
      architecture: process.arch,
      nodeVersion: process.version,
      cpuCores: os.cpus().length,
      totalMemory: Math.round(os.totalmem() / 1024 / 1024) + ' MB',
      freeMemory: Math.round(os.freemem() / 1024 / 1024) + ' MB',
      uptime: Math.round(process.uptime()) + ' seconds',
      hostname: os.hostname(),
      workingDirectory: process.cwd(),
      processId: process.pid
    }
  };
}

// Export the main function
export default executeNodeActivity;`
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
    { id: '1', code: 'field_input_1', name: 'Первое поле', testValue: '' },
    { id: '2', code: 'field_input_2', name: 'Второе поле', testValue: '' }
  ]
  fieldCounter.value = 3
  
  // Load sample output fields
  outputFields.value = [
    { id: '1', code: 'field_output_1', name: 'Результат обработки', isMultiple: false },
    { id: '2', code: 'field_output_2', name: 'Статус выполнения', isMultiple: false }
  ]
  outputFieldCounter.value = 3
  
  // Load sample test data
  testInputParams.value = '{\n  "user_id": 123,\n  "action": "process_data",\n  "params": {\n    "type": "notification"\n  }\n}'
  testCode.value = `// Node.js Server-side Activity Processing
// Demonstrates Node.js modules and server-side capabilities

import { EventEmitter } from 'events';
import { createHash } from 'crypto';
import { Worker, isMainThread, parentPort } from 'worker_threads';

/**
 * Advanced Node.js activity processor
 * @param inputData - Input parameters with proper typing
 */
async function processNodeActivity(inputData: {
  userId: number;
  operation: string;
  payload?: any;
  options?: {
    timeout?: number;
    retries?: number;
  };
}): Promise<any> {
  console.log('🚀 Node.js activity started:', inputData);
  
  const { userId, operation, payload = {}, options = {} } = inputData;
  const { timeout = 5000, retries = 3 } = options;
  
  try {
    // Validate with TypeScript-style checks
    if (!userId || typeof userId !== 'number') {
      throw new Error('Valid userId (number) is required');
    }
    
    if (!operation || typeof operation !== 'string') {
      throw new Error('Valid operation (string) is required');
    }
    
    // Create activity processor instance
    const processor = new ActivityProcessor(userId);
    
    // Execute with timeout and retry logic
    const result = await executeWithRetry(
      () => processor.execute(operation, payload),
      retries,
      timeout
    );
    
    return {
      status: 'success',
      userId,
      operation,
      result,
      executedAt: new Date().toISOString(),
      nodeInfo: {
        version: process.version,
        platform: process.platform,
        pid: process.pid
      }
    };
    
  } catch (error: any) {
    console.error('❌ Node.js activity failed:', error);
    return {
      status: 'error',
      message: error.message,
      code: error.code || 'UNKNOWN_ERROR',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  }
}

/**
 * Activity processor class using Node.js patterns
 */
class ActivityProcessor extends EventEmitter {
  private userId: number;
  private startTime: number;
  
  constructor(userId: number) {
    super();
    this.userId = userId;
    this.startTime = Date.now();
    
    // Set up event listeners
    this.on('progress', (data) => {
      console.log(\`Progress for user \${this.userId}:\`, data);
    });
  }
  
  async execute(operation: string, payload: any): Promise<any> {
    this.emit('progress', { operation, status: 'started' });
    
    switch (operation) {
      case 'hash_data':
        return this.hashData(payload);
      
      case 'process_async':
        return this.processAsync(payload);
      
      case 'worker_task':
        return this.executeInWorker(payload);
      
      default:
        throw new Error(\`Unsupported operation: \${operation}\`);
    }
  }
  
  private hashData(data: any): any {
    const hash = createHash('sha256');
    hash.update(JSON.stringify(data));
    
    return {
      originalData: data,
      hash: hash.digest('hex'),
      algorithm: 'sha256',
      processingTime: Date.now() - this.startTime
    };
  }
  
  private async processAsync(data: any): Promise<any> {
    // Simulate async processing with streams/buffers
    return new Promise((resolve) => {
      const chunks: Buffer[] = [];
      const dataString = JSON.stringify(data);
      
      // Simulate chunked processing
      for (let i = 0; i < dataString.length; i += 100) {
        const chunk = Buffer.from(dataString.slice(i, i + 100));
        chunks.push(chunk);
      }
      
      setTimeout(() => {
        const result = Buffer.concat(chunks).toString();
        this.emit('progress', { operation: 'process_async', status: 'completed' });
        
        resolve({
          processedData: JSON.parse(result),
          chunks: chunks.length,
          totalSize: Buffer.concat(chunks).length
        });
      }, 100);
    });
  }
  
  private async executeInWorker(data: any): Promise<any> {
    // Note: This is a simplified example
    // In real implementation, you'd create an actual worker file
    return new Promise((resolve, reject) => {
      if (isMainThread) {
        // Simulate worker result
        setTimeout(() => {
          resolve({
            workerResult: data,
            processedBy: 'worker-thread',
            timestamp: Date.now()
          });
        }, 200);
      } else {
        reject(new Error('Not in main thread'));
      }
    });
  }
}

/**
 * Utility function for retry logic
 */
async function executeWithRetry<T>(
  fn: () => Promise<T>,
  retries: number,
  timeout: number
): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Race between the function and timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Operation timeout')), timeout);
      });
      
      return await Promise.race([fn(), timeoutPromise]);
      
    } catch (error) {
      console.warn(\`Attempt \${attempt} failed:\`, error);
      
      if (attempt === retries) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  
  throw new Error('All retry attempts failed');
}

export default processNodeActivity;`
  testResult.value = ''
  
  // Store original data for change detection
  originalData.value = {
    title: activityTitle.value,
    inputFields: JSON.parse(JSON.stringify(inputFields.value)),
    outputFields: JSON.parse(JSON.stringify(outputFields.value)),
    code: testCode.value
  }
  
  // No changes initially for existing activities
  hasChanges.value = false
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
      // Node.js and Common APIs with TypeScript definitions
      declare var console: {
        log(...args: any[]): void;
        error(...args: any[]): void;
        warn(...args: any[]): void;
        info(...args: any[]): void;
        debug(...args: any[]): void;
        trace(...args: any[]): void;
      };
      
      declare var process: {
        env: { [key: string]: string | undefined };
        argv: string[];
        platform: string;
        arch: string;
        version: string;
        pid: number;
        cwd(): string;
        uptime(): number;
        exit(code?: number): never;
      };
      
      declare var Buffer: {
        from(data: string | number[] | Uint8Array, encoding?: string): Buffer;
        alloc(size: number, fill?: any, encoding?: string): Buffer;
        concat(list: Buffer[]): Buffer;
        byteLength(string: string, encoding?: string): number;
      };
      
      interface Buffer {
        length: number;
        toString(encoding?: string): string;
        write(string: string, offset?: number, length?: number, encoding?: string): number;
      }
      
      declare var __dirname: string;
      declare var __filename: string;
      
      declare function require(id: string): any;
      
      declare var module: {
        exports: any;
        require: typeof require;
        id: string;
        filename: string;
        loaded: boolean;
        parent: any;
        children: any[];
      };
      
      declare var exports: any;
      
      declare function setTimeout(callback: Function, ms: number, ...args: any[]): NodeJS.Timeout;
      declare function clearTimeout(timeoutId: NodeJS.Timeout): void;
      declare function setInterval(callback: Function, ms: number, ...args: any[]): NodeJS.Timeout;
      declare function clearInterval(intervalId: NodeJS.Timeout): void;
      declare function setImmediate(callback: Function, ...args: any[]): NodeJS.Immediate;
      declare function clearImmediate(immediateId: NodeJS.Immediate): void;
      
      declare namespace NodeJS {
        interface Timeout {}
        interface Immediate {}
      }
      
      declare var JSON: {
        parse(text: string): any;
        stringify(value: any, replacer?: any, space?: any): string;
      };
      
      declare var Date: {
        new(): Date;
        new(value: number | string): Date;
        now(): number;
      };
      
      interface Date {
        getTime(): number;
        toISOString(): string;
        toString(): string;
      }
      
      declare class Promise<T> {
        constructor(executor: (resolve: (value: T) => void, reject: (reason?: any) => void) => void);
        then<U>(onFulfilled?: (value: T) => U | Promise<U>, onRejected?: (reason: any) => U | Promise<U>): Promise<U>;
        catch<U>(onRejected?: (reason: any) => U | Promise<U>): Promise<U>;
        finally(onFinally?: () => void): Promise<T>;
        static resolve<T>(value: T): Promise<T>;
        static reject<T>(reason?: any): Promise<T>;
        static race<T>(promises: Promise<T>[]): Promise<T>;
        static all<T>(promises: Promise<T>[]): Promise<T[]>;
      }
      
      // Node.js modules
      declare module 'fs' {
        export function readFile(path: string, encoding: string): Promise<string>;
        export function writeFile(path: string, data: string): Promise<void>;
        export const promises: {
          readFile(path: string, encoding?: string): Promise<string>;
          writeFile(path: string, data: string): Promise<void>;
          mkdir(path: string, options?: any): Promise<void>;
          rmdir(path: string, options?: any): Promise<void>;
        };
      }
      
      declare module 'path' {
        export function resolve(...paths: string[]): string;
        export function join(...paths: string[]): string;
        export function basename(path: string, ext?: string): string;
        export function dirname(path: string): string;
        export function extname(path: string): string;
      }
      
      declare module 'crypto' {
        export function createHash(algorithm: string): Hash;
        interface Hash {
          update(data: string | Buffer): Hash;
          digest(encoding?: string): string | Buffer;
        }
      }
      
      declare module 'events' {
        export class EventEmitter {
          on(event: string, listener: Function): this;
          emit(event: string, ...args: any[]): boolean;
          removeListener(event: string, listener: Function): this;
        }
      }
      
      declare module 'https' {
        export function request(options: any, callback?: Function): any;
        export function get(url: string, callback?: Function): any;
      }
      
      declare module 'os' {
        export function cpus(): any[];
        export function totalmem(): number;
        export function freemem(): number;
        export function hostname(): string;
        export function platform(): string;
        export function arch(): string;
      }
      
      // Bitrix24 specific globals (if available)
      declare var BX24: any;
      declare var BX: any;
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
    
    // Prepare activity data
    const activityData = {
      id: activityId.value,
      title: activityTitle.value,
      inputFields: inputFields.value,
      outputFields: outputFields.value,
      code: testCode.value,
      testParams: testInputParams.value,
      updatedAt: new Date().toISOString()
    }
    
    // TODO: Send data to backend API
    // For now, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Saving activity data:', activityData)
    
    // Handle new activity creation
    if (activityId.value === '0') {
      const newId = Date.now().toString()
      console.log('Created new activity with ID:', newId)
      
      // Update last saved timestamp
      lastSaved.value = new Date().toLocaleString('ru-RU')
      
      // Navigate to the new activity
      await router.push(`/activity/${newId}`)
    } else {
      // Update last saved timestamp
      lastSaved.value = new Date().toLocaleString('ru-RU')
      console.log('Updated activity:', activityId.value)
    }
    
    // Reset changes state and update original data
    originalData.value = {
      title: activityTitle.value,
      inputFields: JSON.parse(JSON.stringify(inputFields.value)),
      outputFields: JSON.parse(JSON.stringify(outputFields.value)),
      code: testCode.value
    }
    hasChanges.value = false
    
    // Show success message (you could use a toast notification instead)
    alert('Активити успешно сохранено!')
    
  } catch (error) {
    console.error('Error saving activity:', error)
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
    alert(`Ошибка при сохранении: ${errorMessage}`)
  } finally {
    isSaving.value = false
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
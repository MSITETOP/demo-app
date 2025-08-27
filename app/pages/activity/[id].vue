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
          <!-- Output Fields Results -->
          <div class="w-full">
            <div class="bg-gray-50 border border-gray-300 rounded-md p-4">
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-white rounded border">
                  <div class="flex-1">
                    <div class="font-medium text-gray-900">field_output_1</div>
                    <div class="text-sm text-gray-600">Результат обработки</div>
                  </div>
                  <div class="flex-1 px-4">
                    <div class="text-green-600 font-mono bg-green-50 px-2 py-1 rounded text-sm">
                      "success"
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">
                    String
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-white rounded border">
                  <div class="flex-1">
                    <div class="font-medium text-gray-900">field_output_2</div>
                    <div class="text-sm text-gray-600">Статус выполнения</div>
                  </div>
                  <div class="flex-1 px-4">
                    <div class="text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded text-sm">
                      "completed"
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">
                    String
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-white rounded border">
                  <div class="flex-1">
                    <div class="font-medium text-gray-900">deals_count</div>
                    <div class="text-sm text-gray-600">Количество сделок (автогенерация)</div>
                  </div>
                  <div class="flex-1 px-4">
                    <div class="text-purple-600 font-mono bg-purple-50 px-2 py-1 rounded text-sm">
                      847
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">
                    Number
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-white rounded border">
                  <div class="flex-1">
                    <div class="font-medium text-gray-900">execution_time</div>
                    <div class="text-sm text-gray-600">Время выполнения (автогенерация)</div>
                  </div>
                  <div class="flex-1 px-4">
                    <div class="text-orange-600 font-mono bg-orange-50 px-2 py-1 rounded text-sm">
                      "611ms"
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">
                    String
                  </div>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-white rounded border">
                  <div class="flex-1">
                    <div class="font-medium text-gray-900">api_response</div>
                    <div class="text-sm text-gray-600">Ответ API (множественное)</div>
                    <div class="text-xs text-blue-600">✓ Множественное поле</div>
                  </div>
                  <div class="flex-1 px-4">
                    <div class="text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                      [{"ID": "1234", "TITLE": "Deal 1"}, ...] (847 items)
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">
                    Array
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Execution Logs -->
          <div class="w-full">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Логи</h2>
        
            <div class="bg-gray-50 text-green-400 p-4 rounded-md font-mono text-sm overflow-auto" style="height: 300px;">
              <div class="space-y-1">
                <!-- Session Start -->
                <div class="text-cyan-400 border-b border-gray-700 pb-2 mb-2">
                  <span class="text-blue-400">[2024-08-26 23:15:01.000]</span>
                  <span class="bg-cyan-600 px-2 py-0.5 rounded text-xs text-black font-bold">SESSION</span>
                  <span class="text-cyan-400">🚀 Activity execution session started - ID: exec_847291</span>
                </div>
                
                <!-- Initialization Phase -->
                <div class="text-gray-400 bg-gray-800 px-2 py-1 rounded text-xs mb-2">
                  📋 INITIALIZATION PHASE
                </div>
                
                <div class="text-gray-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.123]</span>
                  <span class="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300">DEBUG</span>
                  <span class="text-gray-300">⚙️ Activity framework initialized</span>
                </div>
                <div class="text-gray-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.145]</span>
                  <span class="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300">DEBUG</span>
                  <span class="text-gray-300">📥 Input validation: {"userId": 123, "operation": "get_deals"}</span>
                </div>
                <div class="text-gray-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.156]</span>
                  <span class="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300">DEBUG</span>
                  <span class="text-gray-300">🔗 Webhook URL validated successfully</span>
                </div>
                
                <!-- Execution Phase -->
                <div class="text-gray-400 bg-gray-800 px-2 py-1 rounded text-xs mb-2 mt-3">
                  ⚡ EXECUTION PHASE
                </div>
                
                <div class="text-white ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.234]</span>
                  <span class="bg-blue-600 px-2 py-0.5 rounded text-xs text-white font-bold">INFO</span>
                  <span class="text-white">🎯 Starting: executeBitrix24Activity</span>
                </div>
                <div class="text-white ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.267]</span>
                  <span class="bg-blue-600 px-2 py-0.5 rounded text-xs text-white font-bold">INFO</span>
                  <span class="text-white">🔌 B24Hook connection established</span>
                </div>
                <div class="text-white ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.289]</span>
                  <span class="bg-blue-600 px-2 py-0.5 rounded text-xs text-white font-bold">INFO</span>
                  <span class="text-white">🔄 Processing operation: get_deals</span>
                </div>
                
                <!-- API Communication -->
                <div class="text-gray-400 bg-gray-800 px-2 py-1 rounded text-xs mb-2 mt-3">
                  📡 API COMMUNICATION
                </div>
                
                <div class="text-white ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.445]</span>
                  <span class="bg-blue-600 px-2 py-0.5 rounded text-xs text-white font-bold">INFO</span>
                  <span class="text-white">📤 API Request: crm.deal.list → {"filter": {"STAGE_ID": "NEW"}}</span>
                </div>
                
                <div class="text-yellow-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.567]</span>
                  <span class="bg-yellow-600 px-2 py-0.5 rounded text-xs text-black font-bold">WARN</span>
                  <span class="text-yellow-400">⚠️ Large dataset detected: 847 records (consider pagination)</span>
                </div>
                <div class="text-yellow-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.578]</span>
                  <span class="bg-yellow-600 px-2 py-0.5 rounded text-xs text-black font-bold">WARN</span>
                  <span class="text-yellow-400">⚠️ Missing OPPORTUNITY field in 12 records</span>
                </div>
                
                <!-- Processing Phase -->
                <div class="text-gray-400 bg-gray-800 px-2 py-1 rounded text-xs mb-2 mt-3">
                  🔧 DATA PROCESSING
                </div>
                
                <div class="text-green-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.678]</span>
                  <span class="bg-green-600 px-2 py-0.5 rounded text-xs text-black font-bold">SUCCESS</span>
                  <span class="text-green-400">✅ Data retrieved: 847 deals processed</span>
                </div>
                <div class="text-green-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.689]</span>
                  <span class="bg-green-600 px-2 py-0.5 rounded text-xs text-black font-bold">SUCCESS</span>
                  <span class="text-green-400">✅ Data transformation completed</span>
                </div>
                
                <!-- Error Handling -->
                <div class="text-red-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.702]</span>
                  <span class="bg-red-600 px-2 py-0.5 rounded text-xs text-white font-bold">ERROR</span>
                  <span class="text-red-400">❌ Record ID:12345 - Invalid STAGE_ID format (skipped)</span>
                </div>
                
                <!-- Completion Phase -->
                <div class="text-gray-400 bg-gray-800 px-2 py-1 rounded text-xs mb-2 mt-3">
                  🏁 COMPLETION PHASE
                </div>
                
                <div class="text-green-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.734]</span>
                  <span class="bg-green-600 px-2 py-0.5 rounded text-xs text-black font-bold">SUCCESS</span>
                  <span class="text-green-400">🎉 Activity completed successfully</span>
                </div>
                
                <!-- Output Generation -->
                <div class="text-white border-t border-gray-700 pt-2 mt-3">
                  <div class="text-blue-400 font-semibold mb-2">📤 OUTPUT FIELDS GENERATED</div>
                </div>
                
                <div class="text-green-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.745]</span>
                  <span class="bg-green-600 px-2 py-0.5 rounded text-xs text-black font-bold">OUTPUT</span>
                  <span class="text-green-400">field_output_1 = "success"</span>
                </div>
                <div class="text-green-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.746]</span>
                  <span class="bg-green-600 px-2 py-0.5 rounded text-xs text-black font-bold">OUTPUT</span>
                  <span class="text-green-400">field_output_2 = "completed"</span>
                </div>
                <div class="text-green-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.747]</span>
                  <span class="bg-green-600 px-2 py-0.5 rounded text-xs text-black font-bold">OUTPUT</span>
                  <span class="text-green-400">deals_count = 847</span>
                </div>
                
                <!-- Performance Metrics -->
                <div class="text-white border-t border-gray-700 pt-2 mt-3">
                  <div class="text-purple-400 font-semibold mb-2">⚡ PERFORMANCE METRICS</div>
                </div>
                
                <div class="text-purple-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.750]</span>
                  <span class="bg-purple-600 px-2 py-0.5 rounded text-xs text-white font-bold">PERF</span>
                  <span class="text-purple-400">🕐 Total execution time: 611ms</span>
                </div>
                <div class="text-purple-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.751]</span>
                  <span class="bg-purple-600 px-2 py-0.5 rounded text-xs text-white font-bold">PERF</span>
                  <span class="text-purple-400">📡 API response time: 423ms</span>
                </div>
                <div class="text-purple-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.752]</span>
                  <span class="bg-purple-600 px-2 py-0.5 rounded text-xs text-white font-bold">PERF</span>
                  <span class="text-purple-400">🔄 Processing time: 67ms</span>
                </div>
                <div class="text-purple-400 ml-4">
                  <span class="text-blue-400">[2024-08-26 23:15:01.753]</span>
                  <span class="bg-purple-600 px-2 py-0.5 rounded text-xs text-white font-bold">PERF</span>
                  <span class="text-purple-400">💾 Memory usage: 12.4MB</span>
                </div>
                
                <!-- Session End -->
                <div class="text-cyan-400 border-t border-gray-700 pt-2 mt-3">
                  <span class="text-blue-400">[2024-08-26 23:15:01.760]</span>
                  <span class="bg-cyan-600 px-2 py-0.5 rounded text-xs text-black font-bold">SESSION</span>
                  <span class="text-cyan-400">🏁 Session completed - Duration: 760ms</span>
                </div>
                
                <!-- Fatal Error Example (commented) -->
                <div class="text-gray-600 mt-4 border-t border-gray-800 pt-2">
                  <div class="text-gray-500 text-xs">// Пример критических ошибок (при фатальных сбоях):</div>
                  <div class="text-gray-600 ml-4">
                    <span class="text-gray-500"># [TIMESTAMP] [FATAL] 💀 Authentication failed - Invalid webhook token</span>
                  </div>
                  <div class="text-gray-600 ml-4">
                    <span class="text-gray-500"># [TIMESTAMP] [FATAL] 💀 Critical system error - Activity terminated</span>
                  </div>
                </div>
              </div>
            </div>
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
            
            <B24Button
              variant="outline"
              @click="clearLogs"
              class="flex items-center gap-2"
            >
              <span>🗑️</span>
              Очистить логи
            </B24Button>
            
            <B24Button
              variant="outline"
              @click="downloadLogs"
              class="flex items-center gap-2"
            >
              <span>📥</span>
              Скачать логи
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
    testCode.value = `// Bitrix24 SDK Integration Example
// This code demonstrates Bitrix24 API integration with error handling

import { B24Hook } from '@bitrix24/b24jssdk';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Main Bitrix24 activity function
 * @param {Object} inputData - Input parameters from Bitrix24
 * @returns {Promise<Object>} Activity result
 */
async function executeBitrix24Activity(inputData: any): Promise<any> {
  console.log('🚀 Bitrix24 activity started:', inputData);
  
  // Initialize Bitrix24 Hook
  const b24 = B24Hook.fromWebhookUrl('https://your_domain.bitrix24.com/rest/1/xxxx/');
  
  try {
    // Destructure input parameters
    const { 
      operation = 'get_deals', 
      stageId = 'NEW', 
      limit = 50,
      userId 
    } = inputData;
    
    // Validate required parameters
    if (!userId) {
      throw new Error('Missing required parameter: userId');
    }
    
    // Process different Bitrix24 operations
    switch (operation) {
      case 'get_deals':
        return await getDeals(b24, stageId, limit);
      
      case 'create_deal':
        return await createDeal(b24, inputData);
      
      case 'update_deal':
        return await updateDeal(b24, inputData);
      
      case 'get_contacts':
        return await getContacts(b24, limit);
      
      default:
        throw new Error(\`Unknown operation: \${operation}\`);
    }
    
  } catch (error: any) {
    console.error('❌ Bitrix24 activity failed:', error);
    return {
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Get deals from Bitrix24 CRM
 */
async function getDeals(b24: any, stageId: string, limit: number): Promise<any> {
  try {
    const result = await b24.call('crm.deal.list', {
      order: { DATE_CREATE: 'DESC' },
      filter: { STAGE_ID: stageId }, // фильтр по стадии
      select: ['ID', 'TITLE', 'STAGE_ID', 'DATE_CREATE', 'OPPORTUNITY', 'CURRENCY_ID'],
      start: 0,
      limit: limit
    });

    console.log('Сделки:', result);
    
    return {
      status: 'success',
      message: \`Found \${result.result.length} deals\`,
      data: {
        deals: result.result,
        total: result.total,
        stageId
      }
    };
    
  } catch (err: any) {
    console.error('Ошибка при получении сделок:', err.message);
    throw new Error(\`Failed to get deals: \${err.message}\`);
  }
}

/**
 * Create new deal in Bitrix24 CRM
 */
async function createDeal(b24: any, inputData: any): Promise<any> {
  try {
    const { title, opportunity, contactId, companyId } = inputData;
    
    const dealData = {
      TITLE: title || 'New Deal from Activity',
      STAGE_ID: 'NEW',
      OPPORTUNITY: opportunity || 0,
      CURRENCY_ID: 'RUB',
      CONTACT_ID: contactId,
      COMPANY_ID: companyId,
      ASSIGNED_BY_ID: 1, // ID ответственного
      SOURCE_ID: 'WEB'
    };
    
    const result = await b24.call('crm.deal.add', {
      fields: dealData
    });
    
    console.log('Deal created:', result);
    
    return {
      status: 'success',
      message: 'Deal created successfully',
      data: {
        dealId: result.result,
        dealData
      }
    };
    
  } catch (err: any) {
    console.error('Ошибка при создании сделки:', err.message);
    throw new Error(\`Failed to create deal: \${err.message}\`);
  }
}

/**
 * Update existing deal in Bitrix24 CRM
 */
async function updateDeal(b24: any, inputData: any): Promise<any> {
  try {
    const { dealId, updateFields } = inputData;
    
    if (!dealId) {
      throw new Error('Deal ID is required for update operation');
    }
    
    const result = await b24.call('crm.deal.update', {
      id: dealId,
      fields: {
        ...updateFields,
        DATE_MODIFY: new Date().toISOString()
      }
    });
    
    console.log('Deal updated:', result);
    
    return {
      status: 'success',
      message: 'Deal updated successfully',
      data: {
        dealId,
        updated: result.result
      }
    };
    
  } catch (err: any) {
    console.error('Ошибка при обновлении сделки:', err.message);
    throw new Error(\`Failed to update deal: \${err.message}\`);
  }
}

/**
 * Get contacts from Bitrix24 CRM
 */
async function getContacts(b24: any, limit: number): Promise<any> {
  try {
    const result = await b24.call('crm.contact.list', {
      order: { DATE_CREATE: 'DESC' },
      select: ['ID', 'NAME', 'LAST_NAME', 'EMAIL', 'PHONE', 'DATE_CREATE'],
      start: 0,
      limit: limit
    });
    
    console.log('Контакты:', result);
    
    return {
      status: 'success',
      message: \`Found \${result.result.length} contacts\`,
      data: {
        contacts: result.result,
        total: result.total
      }
    };
    
  } catch (err: any) {
    console.error('Ошибка при получении контактов:', err.message);
    throw new Error(\`Failed to get contacts: \${err.message}\`);
  }
}

// Export the main function
export default executeBitrix24Activity;`
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
  testCode.value = `// Bitrix24 CRM Integration with Advanced Features
// Demonstrates Bitrix24 SDK usage with batch operations and error handling

import { B24Hook } from '@bitrix24/b24jssdk';
import { EventEmitter } from 'events';

/**
 * Advanced Bitrix24 activity processor
 * @param inputData - Input parameters with proper typing
 */
async function processBitrix24Activity(inputData: {
  operation: string;
  webhookUrl: string;
  batchSize?: number;
  filters?: any;
  userId?: number;
}): Promise<any> {
  console.log('🚀 Bitrix24 activity started:', inputData);
  
  const { 
    operation, 
    webhookUrl = 'https://your_domain.bitrix24.com/rest/1/xxxx/',
    batchSize = 50,
    filters = {},
    userId
  } = inputData;
  
  // Initialize Bitrix24 Hook
  const b24 = B24Hook.fromWebhookUrl(webhookUrl);
  
  try {
    // Validate webhook URL format
    if (!webhookUrl.includes('bitrix24.com/rest/')) {
      throw new Error('Invalid Bitrix24 webhook URL format');
    }
    
    // Create activity processor instance
    const processor = new Bitrix24Processor(b24, userId || 1);
    
    // Execute operation with proper error handling
    const result = await processor.execute(operation, { batchSize, filters });
    
    return {
      status: 'success',
      operation,
      result,
      executedAt: new Date().toISOString(),
      webhookDomain: new URL(webhookUrl).hostname
    };
    
  } catch (error: any) {
    console.error('❌ Bitrix24 activity failed:', error);
    return {
      status: 'error',
      message: error.message,
      code: error.code || 'BITRIX24_ERROR',
      operation
    };
  }
}

/**
 * Bitrix24 processor class with EventEmitter for progress tracking
 */
class Bitrix24Processor extends EventEmitter {
  private b24: any;
  private userId: number;
  private startTime: number;
  
  constructor(b24Hook: any, userId: number) {
    super();
    this.b24 = b24Hook;
    this.userId = userId;
    this.startTime = Date.now();
    
    // Set up event listeners for progress tracking
    this.on('progress', (data) => {
      console.log(\`Progress for user \${this.userId}:\`, data);
    });
  }
  
  async execute(operation: string, options: any): Promise<any> {
    this.emit('progress', { operation, status: 'started' });
    
    switch (operation) {
      case 'get_deals':
        return this.getDealsWithBatch(options);
      
      case 'sync_contacts':
        return this.syncContactsBatch(options);
      
      case 'batch_operations':
        return this.performBatchOperations(options);
        
      case 'deal_pipeline_stats':
        return this.getDealPipelineStats(options);
      
      default:
        throw new Error(\`Unsupported operation: \${operation}\`);
    }
  }
  
  /**
   * Get deals using your provided example with enhancements
   */
  private async getDealsWithBatch(options: any): Promise<any> {
    try {
      const { batchSize, filters } = options;
      
      // Your original example enhanced with batch processing
      const result = await this.b24.call('crm.deal.list', {
        order: { DATE_CREATE: 'DESC' },
        filter: { STAGE_ID: 'NEW', ...filters }, // фильтр по стадии
        select: ['ID', 'TITLE', 'STAGE_ID', 'DATE_CREATE', 'OPPORTUNITY', 'ASSIGNED_BY_ID'],
        start: 0,
        limit: batchSize
      });

      console.log('Сделки:', result);
      
      this.emit('progress', { operation: 'get_deals', status: 'completed', count: result.result.length });
      
      return {
        deals: result.result,
        total: result.total,
        processingTime: Date.now() - this.startTime,
        batchSize: result.result.length
      };
      
    } catch (err: any) {
      console.error('Ошибка при получении сделок:', err.message);
      throw new Error(\`Failed to get deals: \${err.message}\`);
    }
  }
  
  /**
   * Perform batch operations for better performance
   */
  private async performBatchOperations(options: any): Promise<any> {
    try {
      // Batch multiple API calls for efficiency
      const batch = {
        deals: ['crm.deal.list', {
          order: { DATE_CREATE: 'DESC' },
          filter: { STAGE_ID: 'NEW' },
          select: ['ID', 'TITLE', 'STAGE_ID'],
          limit: 10
        }],
        contacts: ['crm.contact.list', {
          order: { DATE_CREATE: 'DESC' },
          select: ['ID', 'NAME', 'LAST_NAME', 'EMAIL'],
          limit: 10
        }],
        companies: ['crm.company.list', {
          order: { DATE_CREATE: 'DESC' },
          select: ['ID', 'TITLE', 'EMAIL'],
          limit: 5
        }]
      };
      
      // Execute batch call
      const batchResult = await this.b24.callBatch(batch);
      
      this.emit('progress', { operation: 'batch_operations', status: 'completed' });
      
      return {
        batchResults: batchResult,
        operations: Object.keys(batch),
        processingTime: Date.now() - this.startTime
      };
      
    } catch (err: any) {
      throw new Error(\`Batch operations failed: \${err.message}\`);
    }
  }
  
  /**
   * Get deal pipeline statistics
   */
  private async getDealPipelineStats(options: any): Promise<any> {
    try {
      // Get deals grouped by stages
      const stages = ['NEW', 'PREPARATION', 'PREPAYMENT_INVOICE', 'EXECUTING', 'FINAL_INVOICE'];
      const stats: any = {};
      
      for (const stage of stages) {
        const result = await this.b24.call('crm.deal.list', {
          filter: { STAGE_ID: stage },
          select: ['ID', 'OPPORTUNITY'],
          limit: 1000
        });
        
        stats[stage] = {
          count: result.result.length,
          totalValue: result.result.reduce((sum: number, deal: any) => 
            sum + (parseFloat(deal.OPPORTUNITY) || 0), 0
          )
        };
      }
      
      this.emit('progress', { operation: 'deal_pipeline_stats', status: 'completed' });
      
      return {
        pipelineStats: stats,
        totalDeals: Object.values(stats).reduce((sum: number, stage: any) => sum + stage.count, 0),
        totalValue: Object.values(stats).reduce((sum: number, stage: any) => sum + stage.totalValue, 0),
        processingTime: Date.now() - this.startTime
      };
      
    } catch (err: any) {
      throw new Error(\`Pipeline stats failed: \${err.message}\`);
    }
  }
  
  private async syncContactsBatch(options: any): Promise<any> {
    // Implementation for contact synchronization
    this.emit('progress', { operation: 'sync_contacts', status: 'completed' });
    return { synced: true, processingTime: Date.now() - this.startTime };
  }
}

export default processBitrix24Activity;`
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
    // The logs are now displayed statically in the UI
    // This function would trigger actual execution in a real implementation
    const timestamp = new Date().toISOString()
    
    console.log('Test execution started:', timestamp)
    console.log('Input fields:', inputFields.value)
    console.log('Output fields:', outputFields.value)
    console.log('Code to execute:', testCode.value)
    
    // In a real implementation, this would:
    // 1. Execute the activity code
    // 2. Capture real logs
    // 3. Update the output fields with actual results
    // 4. Display real-time logs in the logging area
    
    console.log('Test execution completed - see comprehensive logs above')
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
    console.error('Ошибка выполнения теста:', errorMessage)
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
  // Here you would clear the logs display
  // For now, just log the action
}

const downloadLogs = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const logContent = `
[2024-08-26 23:15:01.123] [DEBUG] Activity initialization started
[2024-08-26 23:15:01.145] [DEBUG] Input parameters received: {"userId": 123, "operation": "get_deals"}
[2024-08-26 23:15:01.156] [DEBUG] Webhook URL validated: https://your_domain.bitrix24.com/rest/1/xxxx/
[2024-08-26 23:15:01.234] [INFO] 🚀 Bitrix24 activity started: executeBitrix24Activity
[2024-08-26 23:15:01.267] [INFO] B24Hook initialized successfully
[2024-08-26 23:15:01.289] [INFO] Executing operation: get_deals
[2024-08-26 23:15:01.445] [INFO] API call: crm.deal.list with filters {"STAGE_ID": "NEW"}
[2024-08-26 23:15:01.567] [WARN] ⚠️ Large result set detected: 847 deals found, consider pagination
[2024-08-26 23:15:01.578] [WARN] ⚠️ Some deals missing OPPORTUNITY field
[2024-08-26 23:15:01.678] [INFO] ✅ Сделки успешно получены: 847 записей
[2024-08-26 23:15:01.689] [INFO] ✅ Data transformation completed
[2024-08-26 23:15:01.702] [ERROR] ❌ Deal ID 12345: Invalid STAGE_ID format, skipping
[2024-08-26 23:15:01.734] [INFO] 🎉 Activity completed successfully in 611ms
`
  
  // Create and download file
  const blob = new Blob([logContent], { type: 'text/plain' })
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
      
      // Bitrix24 SDK types
      declare module '@bitrix24/b24jssdk' {
        export class B24Hook {
          static fromWebhookUrl(url: string): B24Hook;
          call(method: string, params?: any): Promise<any>;
          callBatch(batch: any): Promise<any>;
        }
        
        export interface Result<T = any> {
          result: T;
          total?: number;
          next?: number;
          error?: string;
          error_description?: string;
        }
        
        export class LoggerBrowser {
          log(message: string, data?: any): void;
          error(message: string, error?: any): void;
          warn(message: string, data?: any): void;
        }
        
        export namespace Text {
          export function encode(text: string): string;
          export function decode(text: string): string;
        }
        
        export enum EnumCrmEntityTypeId {
          lead = 1,
          deal = 2,
          contact = 3,
          company = 4,
          invoice = 31,
          quote = 7
        }
        
        export class ISODate {
          constructor(date?: Date | string);
          toString(): string;
          toJSON(): string;
        }
      }
      
      // Common Bitrix24 CRM field types
      interface DealFields {
        ID?: string;
        TITLE?: string;
        STAGE_ID?: string;
        OPPORTUNITY?: string | number;
        CURRENCY_ID?: string;
        CONTACT_ID?: string;
        COMPANY_ID?: string;
        ASSIGNED_BY_ID?: string;
        DATE_CREATE?: string;
        DATE_MODIFY?: string;
        SOURCE_ID?: string;
      }
      
      interface ContactFields {
        ID?: string;
        NAME?: string;
        LAST_NAME?: string;
        EMAIL?: string[];
        PHONE?: string[];
        COMPANY_ID?: string;
        ASSIGNED_BY_ID?: string;
        DATE_CREATE?: string;
        DATE_MODIFY?: string;
      }
      
      interface CompanyFields {
        ID?: string;
        TITLE?: string;
        EMAIL?: string[];
        PHONE?: string[];
        ASSIGNED_BY_ID?: string;
        DATE_CREATE?: string;
        DATE_MODIFY?: string;
      }
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
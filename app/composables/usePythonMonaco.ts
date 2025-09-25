/**
 * Python-specific Monaco Editor configuration
 * Provides enhanced Python syntax highlighting and autocompletion
 */

export const usePythonMonaco = () => {
  const configurePythonEditor = async () => {
    if (typeof window !== 'undefined') {
      const monaco = await import('monaco-editor')
      
      // Register Python snippets
      monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position)
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          }
          
          const suggestions = [
            // Common Python snippets
            {
              label: 'def',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'def ${1:function_name}(${2:parameters}):\n\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Function definition',
              range: range
            },
            {
              label: 'class',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'class ${1:ClassName}:\n\tdef __init__(self${2:parameters}):\n\t\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Class definition',
              range: range
            },
            {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'if ${1:condition}:\n\t${2:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'If statement',
              range: range
            },
            {
              label: 'for',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'for ${1:item} in ${2:items}:\n\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'For loop',
              range: range
            },
            {
              label: 'while',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'while ${1:condition}:\n\t${2:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'While loop',
              range: range
            },
            {
              label: 'try',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${4:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Try/except block',
              range: range
            },
            {
              label: 'with',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'with ${1:expression} as ${2:variable}:\n\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'With statement',
              range: range
            },
            {
              label: 'import',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'import ${1:module}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Import statement',
              range: range
            },
            {
              label: 'from',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'from ${1:module} import ${2:name}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'From import statement',
              range: range
            }
          ]
          
          return { suggestions }
        }
      })
      
      // Add Python-specific keywords for better syntax highlighting
      monaco.languages.setLanguageConfiguration('python', {
        comments: {
          lineComment: '#',
        },
        brackets: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')']
        ],
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"', notIn: ['string'] },
          { open: "'", close: "'", notIn: ['string', 'comment'] }
        ],
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: "'", close: "'" }
        ],
        onEnterRules: [
          {
            beforeText: new RegExp("^\\s*#.*"),
            afterText: /.+$/,
            action: { indentAction: monaco.languages.IndentAction.None, appendText: '# ' }
          }
        ]
      })
    }
  }
  
  return {
    configurePythonEditor
  }
}
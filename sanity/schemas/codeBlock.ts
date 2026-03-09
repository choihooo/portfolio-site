export default {
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'Bash', value: 'bash' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
        ],
      },
      initialValue: 'javascript',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
    },
    {
      name: 'filename',
      title: 'Filename (optional)',
      type: 'string',
      description: 'Optional filename to display above the code block',
    },
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
    },
    prepare: (selection: any) => {
      const { language, code } = selection
      const title = language ? `${language.toUpperCase()} Code` : 'Code'
      const subtitle = code ? code.substring(0, 50) + '...' : ''
      return { title, subtitle }
    },
  },
}

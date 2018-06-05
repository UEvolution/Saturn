module.exports = {
  create: [
    {key: 'title', required: true},
    {key: 'alias', required: true},
    {key: 'pic', required: true},
    'relate',
    'bio'
  ],
  edit: [
    'title',
    'alias',
    'pic',
    'relate',
    'bio'
  ]
}

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/world/**/*.ts',
      'src/step-definitions/**/*.ts',
      'src/hooks/**/*.ts'
    ],
    format: ['progress',
      "html:reports/cucumber-report.html"
    ],
    paths: ['src/features/**/*.feature'],
    publishQuiet: true
  }
};
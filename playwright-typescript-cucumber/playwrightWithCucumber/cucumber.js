module.exports = {
  default: {
    require: [
      'step-definitions/demoSteps.js',
      'support/**/*.js'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true
  }
};
// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  // 'default e2e tests': function (browser) {
  // automatically uses dev Server port from /config.index.js
  // default: http://localhost:8080
  // see nightwatch.conf.js
  // const devServer = browser.globals.devServerURL

  // browser
  // .url(devServer)
  // .waitForElementVisible('#app', 5000)
  // .assert.elementPresent('.hello')
  // .assert.containsText('h1', 'Welcome to Your Vue.js App')
  // .assert.elementCount('img', 1)
  // .end()

  // 'Demo test Google': browser => {
  //   browser
  //     .url('http://www.google.com')
  //     .waitForElementVisible('body', 1000)
  //     .setValue('input[type=text]', ['nightwatch', browser.Keys.ENTER])
  //     .pause(1000)
  //     .useXpath()
  //     .click('//*[@id="hdtb-msb-vis"]/div[2]/a')
  //   browser.end()
  // },
  // 'Demo test Google 2': browser => {
  //   browser
  //     .url('http://www.google.com')
  //     .pause(1000)
  //     .setValue('input[type=text]', ['nightwatch', browser.Keys.ENTER])
  //     .end()
  // }

  'Does not add empty or blank tasks'(client) {
    client
      .url('http://todomvc.com/examples/react/#/')
      .waitForElementVisible('.header h1', 3000)
      .setValue('.new-todo', 'New task')
      .keys(client.Keys.ENTER)
      .keys(client.Keys.ENTER)
      .setValue('.new-todo', '  ')
      .keys(client.Keys.ENTER)
      .assert.containsText('.todo-count', '1 item left')
      .end()
  },
  'Demo test Google': browser => {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', ['nightwatch', browser.Keys.ENTER])
      .pause(1000)
      .useXpath()
      .click('//*[@id="hdtb-msb-vis"]/div[2]/a')
    browser.end()
  }
}

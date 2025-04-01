const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com/customer/account/login/",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    URL: "https://magento.softwaretestingboard.com/customer/account/create/",
  },
});

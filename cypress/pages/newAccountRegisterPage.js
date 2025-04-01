export class RegisterPage {
  // Only Web Locators will be stored

  webLocators = {
    firstName: "#firstname",
    lastName: "#lastname",
    email: "#email_address",
    password: "#password",
    confirmPassword: "#password-confirmation",
    createAnAccountButton: ".action.submit.primary",
    successMessage: "div.message-success.success.message",
  };

  // Methods

  openURL() {
    cy.visit(Cypress.env("URL"));
  }

  enterFirstName(FName) {
    cy.get(this.webLocators.firstName).type(FName);
  }
  enterLastName(LName) {
    cy.get(this.webLocators.lastName).type(LName);
  }
  enterEmail(Email) {
    cy.get(this.webLocators.email).type(Email);
  }
  enterPassword(password) {
    cy.get(this.webLocators.password).type(password);
    cy.get(this.webLocators.confirmPassword).type(password);
  }
  enterCreateAnAccountButton() {
    cy.get(this.webLocators.createAnAccountButton).click();
  }
  successFullCreateAccountMessage() {
    return cy.get(this.webLocators.successMessage).should("be.visible");
  }
}

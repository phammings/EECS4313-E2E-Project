import { RegisterPage } from "../../pages/newAccountRegisterPage";
import registerAccountData from "../../fixtures/registerAccountData.json";

const registerObj = new RegisterPage();

describe("Test Suite for Register New A/C", () => {
  it("#TC-1 Register New Account", () => {
    registerObj.openURL();
    registerObj.enterFirstName(registerAccountData.name.firstName);
    registerObj.enterLastName(registerAccountData.name.lastName);
    registerObj.enterEmail(registerAccountData.email);
    registerObj.enterPassword(registerAccountData.password.password);
    registerObj.enterPassword(registerAccountData.password.confirmPassword);
    registerObj.enterCreateAnAccountButton();
    registerObj.successFullCreateAccountMessage(
      registerAccountData.successFullCreateAccountMessage
    );
  });
});

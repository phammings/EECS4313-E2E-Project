import { whatsNewPage } from "../../pages/whatsNewPage";
import whatsNewData from "../../fixtures/whatsNewData.json";
import registerAccountData from "../../fixtures/registerAccountData.json";
const whatsNewPageObj = new whatsNewPage();

describe("Whats New Test Suite-2", () => {
  before(() => {
    cy.login(
      registerAccountData.login.email,
      registerAccountData.login.password
    );
  });

  it("#TC-2 Whats new ", () => {
    whatsNewPageObj.clickWhatsNew();
    //whatsNewPageObj.newLumaYogaCollectionLink();
    whatsNewPageObj.shopNewYogaButton();
    whatsNewPageObj
      .message()
      .should("contain.text", whatsNewData.message.titleMessage);
    whatsNewPageObj.selectCartNewLumaYogaCollection();
    whatsNewPageObj.selectSizeOfDress();
    whatsNewPageObj.selectColourOfDress();
    whatsNewPageObj.typeQty();
    whatsNewPageObj.addToCartButton();
    whatsNewPageObj
      .addToCartmessage()
      .should("contain.text", whatsNewData.message.addToCartMessage);
    whatsNewPageObj.cartCheckOut();
    whatsNewPageObj.proceedToCheckout();
    //whatsNewPageObj.verifyShippingText();
 
    whatsNewPageObj.shippingAddressFName(
      whatsNewData.shippingInfo.name.firstName
    );
    whatsNewPageObj.shippingAddressLName(
      whatsNewData.shippingInfo.name.lastName
    );
    whatsNewPageObj.shippingEmail(
      whatsNewData.shippingInfo.email
    );
    whatsNewPageObj.shippingAddressCompany(whatsNewData.shippingInfo.company);
    whatsNewPageObj.shippingAddressStreet(
      whatsNewData.shippingInfo.streetAddress
    );
    whatsNewPageObj.shippingAddressCity(whatsNewData.shippingInfo.city);
    whatsNewPageObj.stateByDropDown();
    whatsNewPageObj.shippingAddressPostalCode(
      whatsNewData.shippingInfo.postalCode
    );
    whatsNewPageObj.countryByDropDown();
    whatsNewPageObj.shippingAddressTelephone(
      whatsNewData.shippingInfo.telephone
    );
    whatsNewPageObj.shippingMethods();
    whatsNewPageObj.nextButtonClick();
    whatsNewPageObj.paymentMethodCheck();
    whatsNewPageObj.placeOrderButton();
    whatsNewPageObj
      .purchaseMessage()
      .should("contain.text", whatsNewData.message.purchaseMessage);
    whatsNewPageObj.continueShoppingButton();
    //whatsNewPageObj.checkSortByDropDown();
  });
});

// Here’s a corrected and complete Cypress test for the user story:

// ```javascript
import { whatsNewPage } from "../../pages/whatsNewPage";
import whatsNewData from "../../fixtures/whatsNewData.json";
import registerAccountData from "../../fixtures/registerAccountData.json";
const whatsNewPageObj = new whatsNewPage();
    describe("User logs in, searches for a product, adds it to the cart, and completes checkout", () => {

  it("should complete the checkout process", () => {
    
    // **Step 1: Ensure user is logged in before proceeding**
    cy.login(
      registerAccountData.login.email,
      registerAccountData.login.password
    );

    // **Step 2: Navigate to 'What's New' section**
    whatsNewPageObj.clickWhatsNew();
    whatsNewPageObj.shopNewYogaButton(); // Clicks on the "Shop New Yoga" button

    // **Step 3: Verify the page loads with the correct title message**
    whatsNewPageObj
      .message()
      .should("contain.text", whatsNewData.message.titleMessage);

    // **Step 4: Select a product from the New Yoga Collection**
    whatsNewPageObj.selectCartNewLumaYogaCollection(); // Clicks on the product

    // **Step 5: Choose product options (Size, Color, Quantity)**
    whatsNewPageObj.selectSizeOfDress(); // Selects the available size
    whatsNewPageObj.selectColourOfDress(); // Selects the available color
    whatsNewPageObj.typeQty(); // Enters the desired quantity

    // **Step 6: Add item to cart and verify**
    whatsNewPageObj.addToCartButton(); // Clicks "Add to Cart" button
    whatsNewPageObj
      .addToCartmessage()
      .should("contain.text", whatsNewData.message.addToCartMessage);

    // **Step 7: Proceed to checkout**
    whatsNewPageObj.cartCheckOut(); // Clicks on cart icon
    whatsNewPageObj.proceedToCheckout(); // Clicks "Proceed to Checkout" button

    // **Step 8: Enter Shipping Information**
    whatsNewPageObj.shippingAddressFName(whatsNewData.shippingInfo.name.firstName); // First name
    whatsNewPageObj.shippingAddressLName(whatsNewData.shippingInfo.name.lastName); // Last name
    whatsNewPageObj.shippingEmail(whatsNewData.shippingInfo.email); // Email
    whatsNewPageObj.shippingAddressCompany(whatsNewData.shippingInfo.company); // Optional company name
    whatsNewPageObj.shippingAddressStreet(whatsNewData.shippingInfo.streetAddress); // Street Address
    whatsNewPageObj.shippingAddressCity(whatsNewData.shippingInfo.city); // City
    whatsNewPageObj.stateByDropDown(); // Selects state from dropdown
    whatsNewPageObj.shippingAddressPostalCode(whatsNewData.shippingInfo.postalCode); // Postal code
    whatsNewPageObj.countryByDropDown(); // Selects country from dropdown
    whatsNewPageObj.shippingAddressTelephone(whatsNewData.shippingInfo.telephone); // Phone number
    
    // **Step 9: Select Shipping Method**
    whatsNewPageObj.shippingMethods(); // Selects shipping method
    whatsNewPageObj.nextButtonClick(); // Clicks "Next" button to continue

    // **Step 10: Choose Payment Method**
    whatsNewPageObj.paymentMethodCheck(); // Ensures payment method is selected

    // **Step 11: Place Order**
    whatsNewPageObj.placeOrderButton(); // Clicks "Place Order" button

    // **Step 12: Verify Order Confirmation**
    whatsNewPageObj
      .purchaseMessage()
      .should("contain.text", whatsNewData.message.purchaseMessage); // Ensures success message is displayed

    // **Step 13: Continue Shopping**
    whatsNewPageObj.continueShoppingButton(); // Clicks "Continue Shopping" button
  });
});
import OpenAI from "openai";
import fs from "fs";

const data = {
    "message": {
      "titleMessage": "New Luma Yoga Collection",
      "addToCartMessage": "You added Echo Fit Compression Short to your ",
      "purchaseMessage": "Thank you for your purchase!"
  
    },
    "shippingInfo":{
      "email": "ryantesting4313@gmail.com",
    "name": {
    "firstName": "Raju",
    "lastName": "Ahmed"
  },
    "company": "Microsoft Heaven",
    "streetAddress": "Mirpur-2",
    "city": "Dhaka",
    "postalCode": "1216",
    "telephone": "01890219995"
  
    }
}

const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: '---'
});

// async function generateCypressTest(userStory) {
//   const completion = await openai.chat.completions.create({
//     model: "deepseek-chat",
//     messages: [
//       { role: "system", content: "You are an expert in writing Cypress test cases." },
//       { role: "user", content: `Generate a Cypress test for this user story: ${userStory}` }
//     ],
//     max_tokens: 500
//   });

//   const testScript = completion.choices[0].message.content;
//   fs.writeFileSync("ai_test.cy.js", testScript);
//   console.log("Generated Cypress test saved as ai_test.js");
// }

async function fixTest(userStory, errorLog) {
  const prompt = `
  You are a Cypress testing expert. Generate a Cypress test for the following user story.
  
  **User Story:** ${userStory}
  **Error Log:** ${errorLog}

  Login details can be imported from the json "../../fixtures/registerAccountData.json" as registerAccountData under login.email and login.password

  Use imports from here to get relevant data.
  import { whatsNewPage } from "../../pages/whatsNewPage";
  import ( whatsNewData as data } from "../../fixtures/whatsNewData.json";
  import registerAccountData from "../../fixtures/registerAccountData.json";
  const whatsNewPageObj = new whatsNewPage();

  **Step-by-step process with selectors:**
  1. Visit the login page (https://magento.softwaretestingboard.com/customer/account/login/)
  2. Enter email: cy.get('${selectors.email}').type('ryantesting4313@gmail.com');
  3. Enter password: cy.get('${selectors.password}').type('captain@123');
  4. Click login: cy.get('${selectors.loginButton}').click();
  5. Navigate to the whats new page: https://magento.softwaretestingboard.com/what-is-new.html
  6. Click on the "Shop New Yoga" button: cy.get('${selectors.shopNewYogaButton}').click();
  7. Verify the page displays the expected message: cy.get('${selectors.pageMessage}').should("contain.text", '${data.message.titleMessage}');
  8. Select "Luma Yoga Collection" and add it to the cart: cy.get('${selectors.lumaYogaCollection}').click();
  9. Select the dress size: cy.get('${selectors.dressSizeDropdown}').select('${data.product.size}');
  10. Select the dress color: cy.get('${selectors.dressColorDropdown}').select('${data.product.color}');
  11. Enter quantity: cy.get('${selectors.quantityInput}').clear().type('${data.product.quantity}');
  12. Click "Add to Cart": cy.get('${selectors.addToCartButton}').click();
  13. Verify item was added successfully: cy.get('${selectors.addToCartMessage}').should("contain.text", '${data.message.addToCartMessage}');
  14. Click cart icon and proceed to checkout: cy.get('${selectors.cartIcon}').click(); cy.get('${selectors.proceedToCheckoutButton}').click();
  15. Enter shipping first name: cy.get('${selectors.shippingFirstName}').type('${data.shippingInfo.name.firstName}');
  16. Enter shipping last name: cy.get('${selectors.shippingLastName}').type('${data.shippingInfo.name.lastName}');
  17. Enter shipping email: cy.get('${selectors.shippingEmail}').type('${data.shippingInfo.email}');
  18. Enter company name (if applicable): cy.get('${selectors.shippingCompany}').type('${data.shippingInfo.company}');
  19. Enter shipping street address: cy.get('${selectors.shippingStreetAddress}').type('${data.shippingInfo.streetAddress}');
  20. Enter shipping city: cy.get('${selectors.shippingCity}').type('${data.shippingInfo.city}');
  21. Select shipping state from dropdown: cy.get('${selectors.shippingStateDropdown}').select('${data.shippingInfo.state}');
  22. Enter postal code: cy.get('${selectors.shippingPostalCode}').type('${data.shippingInfo.postalCode}');
  23. Select shipping country: cy.get('${selectors.shippingCountryDropdown}').select('${data.shippingInfo.country}');
  24. Enter shipping telephone: cy.get('${selectors.shippingTelephone}').type('${data.shippingInfo.telephone}');
  25. Select shipping method: cy.get('${selectors.shippingMethod}').click();
  26. Click "Next" to proceed to payment: cy.get('${selectors.nextButton}').click();
  27. Select payment method: cy.get('${selectors.paymentMethod}').click();
  28. Click "Place Order" button: cy.get('${selectors.placeOrderButton}').click();
  29. Verify the purchase message appears: cy.get('${selectors.purchaseMessage}').should("contain.text", '${data.message.purchaseMessage}');
  30. Click "Continue Shopping" button: cy.get('${selectors.continueShoppingButton}').click();


  Generate a working Cypress test based on these steps.
  `;
  
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are an expert in fixing Cypress test errors." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500
    });
  
    fs.writeFileSync("ai_fixed_test.cy.js", completion.choices[0].message.content);
    console.log("Corrected test saved as ai_fixed_test.cy.js");
  }
  
  // Example: Call function after a failed test
  const userStory = "User logs in, searches for a product, adds it to the cart, and completes checkout.";
  const selectors = {
      shopNewYogaButton: ".more.button",
      whatsNewTopTitleText: "span.base",
      addToCartText: ".message-success.success.message",
      clickWhatsNewLink:
        'a[href="https://magento.softwaretestingboard.com/what-is-new.html"]',
      newLumaYogaCollectionLink:
        'a[href="https://magento.softwaretestingboard.com/collections/yoga-new.html"]',
      selectCartNewLumaYogaCollection: "li[class ='item product product-item']",
      selectSizeOfDress: "#option-label-size-143-item-171",
      selectColourOfDress: "#option-label-color-93-item-57",
      typeQty: 'input[name="qty"]',
      addToCartButton: 'button[class="action primary tocart"]',
      cartCheckOut:
        'a[href="https://magento.softwaretestingboard.com/checkout/cart/"]',
  
      proceedToCheckout: '[data-role="proceed-to-checkout"]',
      email: '/html/body/div[2]/main/div[2]/div/div[2]/div[4]/ol/li[1]/div[2]/form[1]/fieldset/div/div/input',
      firstName: 'input[name="firstname"]',
      lastName: 'input[name="lastname"]',
      company: 'input[name="company"]',
      streetAddress: 'input[name="street[0]"]',
      city: 'input[name="city"]',
      postalCode: 'input[name="postcode"]',
      telephone: 'input[name="telephone"]',
      countryDropdown: '[name="country_id"]',
      shippingMethodsRadioButton: 'input[type="radio"]',
      nextButton: '[class="button action continue primary"]',
      purchaseMessage: '[data-ui-id="page-title-wrapper"]',
      continueShoppingButton: '[class="action primary continue"]',
  };

  const errorLog = 'none';
  
  fixTest(userStory, errorLog);
  
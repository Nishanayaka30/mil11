import {BeforeAll,AfterAll,Given,When,Then} from "@cucumber/cucumber"
import {expect,element, by, waitFor} from "detox"
import { faker } from '@faker-js/faker';


const invalidname = faker.name.fullName();
const invalidpass =faker.internet.password();


BeforeAll({ timeout: 120 * 1000 }, async () => {
  await detox.init();
  await device.launchApp();
  await device.reloadReactNative();
});


Given("I should see the {string} text", async (logintext)=>{
    await expect(element(by.text(logintext))).toBeVisible();  //the testID used in app code should be login 
});

When("I enter the name",async()=>{
    const nameInput=await element(by.id('nameInput'));
    await waitFor(nameInput).toBeVisible().waitTimeout(3000);
    await nameInput.clearText();
    await nameInput.typeText(invalidname);
   
});

When("I enter the password", async()=>{
    const passInput=await element(by.id('passInput'));
    await waitFor(passInput).toBeVisible().waitTimeout(3000);
    await passInput.clearText();
    await passInput.typeText(invalidpass);
    //await waitFor(element(by.id('passInput'))).toBeVisible().waitTimeout(3000).replaceText(invalidPass)

}); 

Then("I click on the login button", async()=>{
    await waitFor(element(by.id('loginbtn'))).toBeVisible().waitTimeout(3000).tap();

});

Then('I should see a message stated as {string}', async(msg)=>{
    await expect(element(by.text(msg))).toBeVisible();

});

When("I enter the name as {string}",async(name)=>{
  await element(by.id('nameInput')).clearText();
  await waitFor(element(by.id('nameInput'))).toBeVisible().waitTimeout(3000).typeText(name);

});
When('I enter the password as {string}',async(pass)=>{
  await element(by.id('passInput')).clearText();
  await waitFor(element(by.id('passInput'))).toBeVisible().waitTimeout(3000).typeText(pass);

});

And('I should see the home page',async()=>{

  await waitFor(element(by.id('welcome'))).toBeVisible().waitTimeout(3000);

});

When('I click on the categories',async()=>{
  await element(by.id('dropdownbutton')).tap();
  await waitFor(element(by.id('dropdownlist'))).toBeVisible().waitTimeout(3000);


});

When('I select the {string} option',async(mobile)=>{
  await element(by.text('mobile')).tap();

});
Then('I see a list of mobiles',async()=>{
  await waitFor(element(by.id('mobile1'))).toBeVisible().waitTimeout(3000);

   //first product from the list selected

});

When('I enter the price as {string} and {string}', async(min,max)=>{
  this.minvalue = parseFloat(min);
  this.maxvalue = parseFloat(max);
  await element(by.id('minPriceInput')).clearText();
  await element(by.id('minPriceInput')).typeText(minvalue);
  await element(by.id('maxPriceInput')).clearText();
  await element(by.id('maxPriceInput')).typeText(maxvalue);
  
});

Then('I should not see the product within the range',async()=>{

  const products = await element(by.id('productList')).getAttributes();
  const productfound=false;
  for (const product of products) {
    const price = parseFloat(product.price);
    if(price >=this.minvalue && price<=this.maxvalue){
      productfound=true;
      break;
    }
    
  }
  expect(productfound).toBe(false);

});

Then('I see the list of mobile within the filtered price', async()=>{
  const products = await element(by.id('productList')).atIndex(0).getAttributes();
  const productfound=false;
  
    const price = parseFloat(products.price);
    if(price >=this.minvalue && price<=this.maxvalue){
      productfound=true;
    }
  expect(productfound).toBe(true);
});

When("I sort the list by clicking {string}",async(sort)=>{
  await element(by.id(sort)).tap();

 });

Then("the items are sorted in the ascending order", async()=>{
  const productsorted=false;
  const product1 = await element(by.id('productList')).atIndex(0).getAttributes();
  const product1price= parseFloat(product1.price);
  const product2 = await element(by.id('productList')).atIndex(1).getAttributes();
  const product2price= parseFloat(product2.price);

  if(product1price < product2price){
    productsorted=true;
  }
  expect(productsorted).toBe(true);

});

Then("the items are sorted in the decending order", async()=>{
  const productsorted=false;
  const product1 = await element(by.id('productList')).atIndex(0).getAttributes();
  const product1price= parseFloat(product1.price);
  const product2 = await element(by.id('productList')).atIndex(1).getAttributes();
  const product2price= parseFloat(product2.price);
  if(product1price > product2price){
    productsorted=true;
  }
  expect(productsorted).toBe(true);

});



AfterAll({ timeout: 120 * 1000 }, async () => {
  await detox.cleanup();

});
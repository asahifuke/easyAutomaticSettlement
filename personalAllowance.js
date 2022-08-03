const { Builder, By, until } = require('selenium-webdriver')
const EasySettlement = require('./easySettlement')
const {setTimeout} = require("timers/promises");

class PersonalAllowance extends EasySettlement {
  constructor() {
    super()
    this.filePath = '/Users/asahi.fuke/Downloads/Amazon.co.jp.pdf'
    this.isReceipt = true
    this.yearReceived = '2022'
    this.monthReceived = '7'
    this.dayReceived = '10'
  }

  // get filePath(){
  //   return this.filePath
  // }

  // get isReceipt(){
  //   return this.isReceipt
  // }

  // get yearReceived(){
  //   return this.yearReceived
  // }

  // get monthReceived(){
  //   return this.monthReceived
  // }

  // get dayReceived(){
  //   return this.dayReceived
  // }

  async procedure(){
    await this.login()
    await this.registrateNewReceipt()
    await this.personalAllowance()
    // await this.driver.quit()
  }

  async fillInTradingDay(){
    await this.driver.findElement(By.xpath('//*[@id="d_master_contents"]/div[4]/div[1]/table/tbody/tr[1]/td[1]/input[1]')).sendKeys(this.tradingYear);
    await this.driver.findElement(By.xpath('//*[@id="d_master_contents"]/div[4]/div[1]/table/tbody/tr[1]/td[1]/input[2]')).sendKeys(this.tradingMonth);
    await this.driver.findElement(By.xpath('//*[@id="d_master_contents"]/div[4]/div[1]/table/tbody/tr[1]/td[1]/input[3]')).sendKeys(this.tradingDay);
  }

  async fillInDayReceived(){
    await this.driver.findElement(By.xpath('//*[@id="d_master_contents"]/div[4]/div[1]/table/tbody/tr[2]/td/input[1]')).sendKeys(this.yearReceived);
    await this.driver.findElement(By.xpath('//*[@id="d_master_contents"]/div[4]/div[1]/table/tbody/tr[2]/td/input[2]')).sendKeys(this.monthReceived);
    await this.driver.findElement(By.xpath('//*[@id="d_master_contents"]/div[4]/div[1]/table/tbody/tr[2]/td/input[3]')).sendKeys(this.dayReceived);
  }

  async registrateNewReceipt(){
    await this.driver.get('https://rsdrum.rakurakuseisan.jp/TAtIRiwtqAa/sapEbookFile/initializeView');
    await this.driver.findElement(By.xpath('//*[@id="d_master_contents"]/div[3]/table/tbody/tr[1]/td/input')).sendKeys(this.filePath);
    if (!this.isReceipt) { await thisdriver.findElement(By.xpath('//*[@id="documentKbn_1"]')).click() }
    await this.fillInTradingDay()
    await this.fillInDayReceived()
    await this.fillInTaxIncludedAmount('//*[@id="d_master_contents"]/div[4]/div[1]/table/tbody/tr[4]/td/table/tbody/tr[1]/td[1]/input')
    await this.fillInClient('//*[@id="d_master_contents"]/div[4]/div[1]/table/tbody/tr[5]/td/input')
    await this.driver.findElement(By.xpath('//*[@id="d_master_contents"]/div[5]/button[1]')).click();
  }

  async personalAllowance() {
    await this.driver.get('https://rsdrum.rakurakuseisan.jp/TAtIRiwtqAa/sapKeiseiDenpyo/initializeView');
    this.fillInApplicationPurpose('//*[@id="inputHeaderArea"]/div/div[1]/div/div/table[2]/tbody/tr[1]/td/div/div/div/div/input')
    await this.addDetails()
    await this.driver.findElement(By.xpath('//*[@id="d_denpyo"]/form/div/div[5]/div/div[3]/button')).click();
  }

  async addDetails(){
    await this.driver.findElement(By.xpath('//*[@id="denpyoFixedArea"]/div[1]/div/button[1]')).click();
    await this.fillInUseDay('//*[@id="inputArea"]/table/tbody/tr/td[1]/div/div/div/div/input[1]')
    await this.fillInBreakdown('//*[@id="inputArea"]/table/tbody/tr/td[2]/div/div/table/tbody/tr/td[1]/div/div/input')
    await this.fillInClient('//*[@id="inputArea"]/table/tbody/tr/td[3]/div/div/div/div/input')
    await this.fillInAbstract('//*[@id="inputArea"]/table/tbody/tr/td[4]/div/div/div/div/input')
    await this.fillInTaxIncludedAmount('//*[@id="inputArea"]/table/tbody/tr/td[6]/div/div/div/div/input')
    // await this.sentReceipt();後で直す！！
    await this.driver.findElement(By.xpath('//*[@id="inputAreaWindow"]/div[3]/div/button[3]')).click();
  }

  async sentReceipt(){
    // await this.driver.get('https://rsdrum.rakurakuseisan.jp/TAtIRiwtqAa/sapKeiseiDenpyo/ebookFileDataFormView');
    console.log(await this.driver.getCurrentUrl())
    await this.driver.findElement(By.xpath('//*[@id="inputArea"]/table/tbody/tr/td[5]/div/div/button[1]')).click()
    let handles = await this.driver.getAllWindowHandles()
    let handle = await handles[0];
    await this.driver.switchTo().window(handle);
    console.log(await handles)
    
    
    await this.takeScreenshot()
    
    await this.driver.findElement(By.xpath('//*[@id="ebookListTable"]/tbody[1]')).click();
    
  }

}

module.exports = PersonalAllowance

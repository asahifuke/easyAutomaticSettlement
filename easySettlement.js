const { Builder, By, Key } = require('selenium-webdriver')
const { promisify } = require('util');
const fs = require('fs');

class EasySettlement {
  constructor() {
    this.driver = new Builder().forBrowser('chrome').build()
    this.loginId = '130034'
    this.password = 'seisan07fuke@s@h118'
    this.tradingYear = '2022'
    this.tradingMonth = '7'
    this.tradingDay = '8'
    this.client = 'Amazon.co.jp'
    this.breakdown = '1145'
    this.applicationPurpose = '技術書購入のため。'
    this.abstract = '内定者インターンで利用しているフィヨルドブートキャンプのカリキュラムで使用する技術書購入のため。'
    this.taxIncludedAmount = 2000
  }

  // get loginId() {
  //   return this.loginId
  // }

  // get password(){
  //   return this.password
  // }

  // get tradingYear(){
  //   return this.tradingYear
  // }

  // get tradingMonth(){
  //   return this.tradingMonth
  // }

  // get tradingDay(){
  //   return this.tradingDay
  // }

  // get client(){
  //   return this.client
  // }

  // get breakdown() {
  //   return this.breakdown
  // }

  // get applicationPurpose() {
  //   return this.applicationPurpose
  // }

  // get abstract(){
  //   return this.abstract
  // }

  // get taxIncludedAmount() {
  //   return this.taxIncludedAmount
  // }

  async login(){
    await this.driver.get('https://rsdrum.rakurakuseisan.jp/TAtIRiwtqAa/')
    await this.driver.findElement(By.xpath('//*[@id="d_login_input"]/table/tbody/tr[1]/td[2]/input')).sendKeys(this.loginId)
    await this.driver.findElement(By.xpath('//*[@id="d_login_input"]/table/tbody/tr[2]/td[2]/input')).sendKeys(this.password, Key.RETURN)
  }

  async useDay() {
    return `${this.tradingYear}/${this.tradingMonth}/${this.tradingDay}`
  }

  async fillInUseDay(path) {
    return await this.driver.findElement(By.xpath(path)).sendKeys(this.useDay());
  }

  async fillInBreakdown(path) {
    return await this.driver.findElement(By.xpath(path)).sendKeys(this.breakdown);
  }
  async fillInAbstract(path) {
    return await this.driver.findElement(By.xpath(path)).sendKeys(this.abstract);
  }

  async fillInTaxIncludedAmount(path) {
    return await this.driver.findElement(By.xpath(path)).sendKeys(this.taxIncludedAmount);
  }

  async fillInClient(path) {
    return await this.driver.findElement(By.xpath(path)).sendKeys(this.client);
  }

  async fillInApplicationPurpose(path) {
    return await this.driver.findElement(By.xpath(path)).sendKeys(this.applicationPurpose);
  }

  async takeScreenshot() {
    let base64 = await this.driver.takeScreenshot();
    let buffer = Buffer.from(base64, 'base64');
    await promisify(fs.writeFile)('screenshot.jpg', buffer);
  }

}

module.exports = EasySettlement

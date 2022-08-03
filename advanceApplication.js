const { By } = require('selenium-webdriver')
const EasySettlement = require('./easySettlement')

class AdvanceApplication extends EasySettlement {
  constructor() {
    super()
    this.delayReason = '失念しました'
    this.burdenElement = 101720560
  }

  // get delayReason(){
  //   return this.delayReason
  // }

  // get burdenElement(){
  //   return this.burdenElement
  // }

  async procedure() {
    await this.login()
    await this.applyInAdvance()
    // await this.driver.quit()
  }

  async applyInAdvance(){
    await this.driver.get('https://rsdrum.rakurakuseisan.jp/TAtIRiwtqAa/sapKeishinDenpyo/initializeView');
    await this.driver.findElement(By.xpath('//*[@id="inputHeaderArea"]/div/div[1]/div/div[1]/table[1]/tbody/tr[3]/td/div/div/div/div/input')).sendKeys(this.delayReason);
    await this.fillInApplicationPurpose('//*[@id="inputHeaderArea"]/div/div[1]/div/div[1]/table[1]/tbody/tr[4]/td/div/div/div/div/input')
    await this.fillInClient('//*[@id="inputHeaderArea"]/div/div[1]/div/div[1]/table[1]/tbody/tr[5]/td/div/div/div/div/div[2]/input')
    await this.addStatement()
    // await driver.findElement(By.xpath('//*[@id="d_denpyo"]/form/div/div[5]/div/div[3]/button')).click();
  }

  async addStatement(){
    await this.driver.findElement(By.xpath('//*[@id="denpyoFixedArea"]/div[1]/div/button')).click()
    await this.fillInUseDay('//*[@id="inputArea"]/table[1]/tbody/tr/td[1]/div/div/div/div/input[1]')
    await this.fillInBreakdown('//*[@id="inputArea"]/table[1]/tbody/tr/td[2]/div/div/table/tbody/tr/td[1]/div/div/input')
    await this.fillInAbstract('//*[@id="inputArea"]/table[1]/tbody/tr/td[3]/div/div/div/div/input')
    await this.driver.findElement(By.xpath('//*[@id="inputArea"]/table[1]/tbody/tr/td[5]/div/div/div/div/select')).click();
    await this.driver.findElement(By.xpath('//*[@id="inputArea"]/table[1]/tbody/tr/td[5]/div/div/div/div/select/option[3]')).click();
    await this.fillInTaxIncludedAmount('//*[@id="inputArea"]/table[1]/tbody/tr/td[6]/div/div/div/div/input')
    await this.driver.findElement(By.xpath('//*[@id="inputAreaWindow"]/div[3]/div/button[3]')).click();
  }
}

module.exports = AdvanceApplication

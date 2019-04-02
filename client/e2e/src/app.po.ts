import { browser, by, element } from 'protractor';

export class MainPage {
  navigateTo(to: string) {
    return browser.get(to);
  }

  getCssText(css: string) {
    return element(by.css(css)).getText();
  }
}

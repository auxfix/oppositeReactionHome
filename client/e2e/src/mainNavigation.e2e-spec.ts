import { MainPage } from './app.po';

describe('e2e: main navigation', () => {
  let page: MainPage;

  beforeEach(() => {
    page = new MainPage();
  });

  it('navigate to root', () => {
    page.navigateTo('/');
    expect(page.getCssText('app-root h3')).toEqual('Home');
  });

  it('navigate to home', () => {
    page.navigateTo('/home');
    expect(page.getCssText('app-root h3')).toEqual('Home');
  });
});

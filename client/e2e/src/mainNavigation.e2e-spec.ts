import { MainPage } from './app.po';

describe('e2e: main navigation', () => {
  let page: MainPage;

  beforeEach(() => {
    page = new MainPage();
  });

  it('navigate to root', () => {
    page.navigateTo('/');
    expect(page.getCssText('app-root h3')).toEqual('or');
  });

  it('navigate to or', () => {
    page.navigateTo('/home');
    expect(page.getCssText('app-root h3')).toEqual('or');
  });

  it('navigate to tracks', () => {
    page.navigateTo('/tracks');
    expect(page.getCssText('app-root h3')).toEqual('tracks');
  });
});


const expect = require('chai').expect;
const PhotoLister = require('./photo-lister');
const cheerio = require('cheerio');

// PART 3
// 1
describe('PhotoLister', () => {
  it('should exist', () => {
    expect(PhotoLister).not.to.be.undefined;
  });
});

// 2
describe('#photoToListItem()', () => {
  it('should take a photo object and return a list item string', () => {
    const input = {
      title: 'This is a test',
      url: 'http://loremflickr.com/960/593',
    };
    const expected = '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
                     '<figcaption>This is a test</figcaption></figure></li>';
    expect(PhotoLister.photoToListItem(input)).to.equal(expected);
  });
});

// 3
describe('#photoToListItem()', () => {
  it('should take a photo object and return a list item string', () => {
    let input = {
      title: 'This is a test',
      url: 'http://loremflickr.com/960/593',
    };
    let expected = '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
                     '<figcaption>This is a test</figcaption></figure></li>';
    expect(PhotoLister.photoToListItem(input)).to.equal(expected);

    input = {
      title: 'This is another test',
      url: 'http://loremflickr.com/960/593/puppy',
    };
    expected = '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>' +
                 '<figcaption>This is another test</figcaption></figure></li>';
    expect(PhotoLister.photoToListItem(input)).to.equal(expected);
  });
});

// 4
describe('#photoListToHTML()', () => {
  it('should take an array of photo objects and convert them to an HTML list', () => {
    const input = [{
      title: 'This is a test',
      url: 'http://loremflickr.com/960/593',
    }, {
      title: 'This is another test',
      url: 'http://loremflickr.com/960/593/puppy',
    }];
    const expected = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
                     '<figcaption>This is a test</figcaption></figure></li>' +
                     '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>' +
                     '<figcaption>This is another test</figcaption></figure></li></ul>';
    expect(PhotoLister.photoListToHTML(input)).to.equal(expected);
  });
});

// 5 cheerio - DOM testing
describe('#addPhotosToElement()', () => {
  it('should take an HTML string of list items and add them to an element with a given selector', () => {
    const $ = cheerio.load('<html><head></head><body><div id="mydiv"></div></body></html>');
    const list = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
                     '<figcaption>This is a test</figcaption></figure></li>' +
                     '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>' +
                     '<figcaption>This is another test</figcaption></figure></li></ul>';
    const selector = '#mydiv';
    const $div = PhotoLister.addPhotosToElement($, selector, list);
    expect($div.find('ul').length).to.equal(1);
    expect($div.find('li').length).to.equal(2);
    expect($div.find('figure').length).to.equal(2);
    expect($div.find('img').length).to.equal(2);
    expect($div.find('figcaption').length).to.equal(2);
  });
});

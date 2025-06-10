import { Circumfix } from "../lib";

describe('Circumfix', () => {
  let circumfix = new Circumfix('pre', 'post', /[^a-zA-Z0-9$_]/g);

  beforeEach(() => circumfix = new Circumfix('pre', 'post', /[^a-zA-Z0-9$_]/g))

  it('should create an instance of Circumfix', () => {
    expect(circumfix).toBeInstanceOf(Circumfix);
  });

  it('should have the correct start and end', () => {
    expect(circumfix.start).toBe('pre');
    expect(circumfix.end).toBe('post');
  });

  it('should apply circumfix to a string', () => {
    expect(circumfix.insertTo('testString', '-')).toBe('pre-testString-post');
  });

  it(`static insert() with default`, () =>{
    Circumfix.default = ['start', 'end'];
    expect(Circumfix.insert('light')).toBe('startlightend'); // startlightend
    expect(Circumfix.insert('light', undefined, '-')).toBe('start-light-end'); // start-light-end
  });

  it(`static insert()`, () =>{
    expect(Circumfix.insert('light', 'en')).toBe('enlighten'); // enlighten
    expect(Circumfix.insert('light', 'en', '-')).toBe('en-light-en'); // en-light-en
    expect(Circumfix.insert('stem', ['start', 'end'], '-')).toBe('start-stem-end'); // start-stem-end
  });

  it('should sanitize the start and end using the pattern', () => {
    const sanitizedCircumfix = new Circumfix('pre@#$', 'post!@#$', /[^a-zA-Z0-9$_]/g);
    expect(sanitizedCircumfix.start).toBe('pre$');
    expect(sanitizedCircumfix.end).toBe('post$');
  });
});

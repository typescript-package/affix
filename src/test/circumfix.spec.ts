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
    const result = circumfix.insertTo('testString', '-');
    expect(result).toBe('pre-testString-post');
  });

  it('should sanitize the start and end using the pattern', () => {
    const sanitizedCircumfix = new Circumfix('pre@#$', 'post!@#$', /[^a-zA-Z0-9$_]/g);
    expect(sanitizedCircumfix.start).toBe('pre$');
    expect(sanitizedCircumfix.end).toBe('post$');
  });
});

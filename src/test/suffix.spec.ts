import { Suffix } from "../lib";

describe(Suffix.name, () => {
  let suffix = new Suffix('post', /[^a-zA-Z0-9$_]/g);

  beforeEach(() => suffix = new Suffix('post', /[^a-zA-Z0-9$_]/g));

  it('is DEFINED', () => expect(suffix).toBeDefined());
  it('initially set suffix to $$', () => expect(suffix.value).toEqual('post'));
  it('set suffix to $$', () => expect(suffix.set({value: 'post'}).value).toEqual('post'));

  it('should apply suffix to a string', () => {
    const result = suffix.appendTo('testString', '-');
    expect(result).toBe('testString-post');
  });

  it('should sanitize the suffix using the pattern', () => {
    const sanitizedSuffix = new Suffix('post@#$', /[^a-zA-Z0-9$_]/g);
    expect(sanitizedSuffix.value).toBe('post$');
  });

  it('should have an appendTo method', () => {
    expect(suffix.appendTo).toBeDefined();
    expect(typeof suffix.appendTo).toBe('function');
  });

  it('should return the correct value when appendTo is called', () => {
    const result = suffix.appendTo('testString', '-');
    expect(result).toBe('testString-post');
  });

  it('should return the correct Symbol.toStringTag', () => {
    expect(Object.prototype.toString.call(suffix).match(/\[object (\w+)]/)?.[1]).toBe('Suffix');
  });

  it('should append a suffix to a string', () => {
    const result = Suffix.append('testString', 'post', '-');
    expect(result).toBe('testString-post');
  });
});
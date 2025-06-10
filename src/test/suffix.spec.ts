import { Suffix } from "../lib";

describe(Suffix.name, () => {
  let suffix = new Suffix('post', /[^a-zA-Z0-9$_]/g);

  beforeEach(() => suffix = new Suffix('post', /[^a-zA-Z0-9$_]/g));

  it('is DEFINED', () => expect(suffix).toBeDefined());
  it('initially set suffix to $$', () => expect(suffix.value).toEqual('post'));
  it('set suffix to $$', () => expect(suffix.set({value: 'post'}).value).toEqual('post'));

  it('should apply suffix to a string', () => {
    expect(suffix.appendTo('testString', '-')).toBe('testString-post');
  });

  it('should sanitize the suffix using the pattern', () => {
    expect(new Suffix('post@#$', /[^a-zA-Z0-9$_]/g).value).toBe('post$');
  });

  it('should have an appendTo method', () => {
    expect(suffix.appendTo).toBeDefined();
    expect(typeof suffix.appendTo).toBe('function');
  });

  it('should return the correct value when appendTo is called', () => {
    expect(suffix.appendTo('testString', '-')).toBe('testString-post');
  });

  it('should return the correct Symbol.toStringTag', () => {
    expect(Object.prototype.toString.call(suffix).match(/\[object (\w+)]/)?.[1]).toBe('Suffix');
  });

  it('should append a suffix to a string', () => {
    expect(Suffix.append('testString', 'post', '-')).toBe('testString-post');
  });
});
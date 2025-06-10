import { Prefix } from '../lib/prefix.class';

describe(Prefix.name, () => {
  let prefix = new Prefix('pre', /[^a-zA-Z0-9$_]/g);

  beforeEach(() => prefix = new Prefix('pre', /[^a-zA-Z0-9$_]/g));

  it('is DEFINED', () => expect(prefix).toBeDefined());
  it('initially set prefix to $$', () => expect(prefix.value).toEqual('pre'));
  it('set prefix to $$', () => expect(prefix.set({value: 'pre'}).value).toEqual('pre'));

  it('should apply prefix to a string', () => {
    expect(prefix.prependTo('testString', '-')).toBe('pre-testString');
  });

  it('should sanitize the prefix using the pattern', () => {
    expect(new Prefix('pre@#$', /[^a-zA-Z0-9$_]/g).value).toBe('pre$');
  });

  it('should have a prependTo method', () => {
    expect(prefix.prependTo).toBeDefined();
    expect(typeof prefix.prependTo).toBe('function');
  });

  it('should return the correct value when prependTo is called', () => {
    expect(prefix.prependTo('testString', '-')).toBe('pre-testString');
  });

  it('should return the correct Symbol.toStringTag', () => {
    expect(Object.prototype.toString.call(prefix).match(/\[object (\w+)]/)?.[1]).toBe('Prefix');
  });

  // Static.
  it('should prepend a prefix to a string', () => {
    expect(Prefix.prepend('testString', 'pre', '-')).toBe('pre-testString');
  });

  it('should sanitize a prefix using the static sanitize method', () => {
    expect(Prefix.sanitize('pre@#$', /[^a-zA-Z0-9$_]/g)).toBe('pre$');
  });

  it('should have a static default property', () => {
    expect(typeof Prefix.default).toBe('string');
  });

  it('should have a static pattern property', () => {
    expect(Prefix.pattern).toBeDefined();
  });

  it('should have a static tagName property', () => {
    expect(Prefix.tagName).toBe('Prefix');
    Prefix.tagName = 'NewPrefix';
    expect(Prefix.tagName).toBe('NewPrefix');
  });
});

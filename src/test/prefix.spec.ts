import { Prefix } from '../lib/prefix.class';

describe(Prefix.name, () => {
  let prefix = new Prefix('pre', /[^a-zA-Z0-9$_]/g);

  beforeEach(() => prefix = new Prefix('pre', /[^a-zA-Z0-9$_]/g));

  it('is DEFINED', () => expect(prefix).toBeDefined());
  it('initially set prefix to $$', () => expect(prefix.value).toEqual('pre'));
  it('set prefix to $$', () => expect(prefix.set({value: 'pre'}).value).toEqual('pre'));

  it('should apply prefix to a string', () => {
    const result = prefix.prependTo('testString', '-');
    expect(result).toBe('pre-testString');
  });

  it('should sanitize the prefix using the pattern', () => {
    const sanitizedPrefix = new Prefix('pre@#$', /[^a-zA-Z0-9$_]/g);
    expect(sanitizedPrefix.value).toBe('pre$');
  });

  it('should have a prependTo method', () => {
    expect(prefix.prependTo).toBeDefined();
    expect(typeof prefix.prependTo).toBe('function');
  });

  it('should return the correct value when prependTo is called', () => {
    const result = prefix.prependTo('testString', '-');
    expect(result).toBe('pre-testString');
  });

  it('should return the correct Symbol.toStringTag', () => {
    expect(Object.prototype.toString.call(prefix).match(/\[object (\w+)]/)?.[1]).toBe('Prefix');
  });

  it('should prepend a prefix to a string', () => {
    const result = Prefix.prepend('testString', 'pre', '-');
    expect(result).toBe('pre-testString');
  });
});

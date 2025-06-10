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

console.group('Prefix');

export const prefix = new Prefix(
  'pre', // Value
  /[^a-zA-Z0-9$_]/g // Pattern
);

console.group('Properties');

console.debug(`default => `, Prefix.default); // 'prefix'
console.debug(`pattern => `, Prefix.pattern); // RegExp /[^a-zA-Z0-9$_]/g
console.debug(`tagName => `, Prefix.tagName); // 'Prefix'

console.debug(`kind => `, prefix.kind); // 'prefix'
console.debug(`pattern => `, prefix.pattern); // RegExp /[^a-zA-Z0-9$_]/g
console.debug(`prefix => `, prefix.prefix); // 'pre'
console.debug(`toStringTag => `, prefix[Symbol.toStringTag]); // 'Prefix'
console.debug(`value => `, prefix.value); // 'pre'
console.groupEnd();

console.group('Methods');
console.debug(`Prefix.sanitize('pre@#$', /[^a-zA-Z0-9$_]/g) => `, Prefix.sanitize('pre@#$', /[^a-zA-Z0-9$_]/g)); // 'pre$'
console.debug(`Prefix.prepend('stem', 'pre', '-') => `, Prefix.prepend('stem', 'pre', '-')); // 'pre-stem'

console.debug(`prependTo('stem', '-') => `, prefix.prependTo('stem', '-')); // 'pre-stem'
console.debug(`toString() => `, prefix.toString()); // '[object Prefix]'

console.debug(`prefix.get()`, prefix.get()); // 'pre'
console.debug(`prefix.set({value: 'newPrefix'}) => `, prefix.set({value: 'newPrefix' as any}).value); // 'newPrefix'

console.debug(`prefix.setKind('newKind') => `, prefix.setKind('newKind' as any).kind); // 'newKind'
console.debug(`prefix.setPattern(/newPattern/g) => `, prefix.setPattern(/newPattern/g).pattern); // /newPattern/g
console.debug(`prefix.setValue('newValue') => `, prefix.setValue('newValue' as any).value); // 'newValue'

console.groupEnd();

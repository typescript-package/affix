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

console.group('Suffix');

export const suffix = new Suffix(
  'post', // Value
  /[^a-zA-Z0-9$_]/g // Pattern
);

console.group('Properties');

console.group('Static');
console.debug(`default => `, Suffix.default); // ''
console.debug(`pattern => `, Suffix.pattern); // RegExp /[^a-zA-Z0-9$_]/g
console.debug(`tagName => `, Suffix.tagName); // 'Suffix'
console.groupEnd();

console.group('Instance');
console.debug(`kind => `, suffix.kind); // 'suffix'
console.debug(`pattern => `, suffix.pattern); // RegExp /[^a-zA-Z0-9$_]/g
console.debug(`suffix => `, suffix.suffix); // 'post'
console.debug(`toStringTag => `, suffix[Symbol.toStringTag]); // 'Suffix'
console.debug(`value => `, suffix.value); // 'post'
console.groupEnd();
console.groupEnd();

console.group('Methods');
console.debug(`Suffix.sanitize('post@#$', /[^a-zA-Z0-9$_]/g) => `, Suffix.sanitize('post@#$', /[^a-zA-Z0-9$_]/g)); // 'post$'
console.debug(`Suffix.append('stem', 'post', '-') => `, Suffix.append('stem', 'post', '-')); // 'stem-post'

console.debug(`appendTo('stem', '-') => `, suffix.appendTo('stem', '-')); // 'stem-post'
console.debug(`toString() => `, suffix.toString()); // '[object Suffix]'

console.debug(`suffix.get()`, suffix.get()); // 'post'
console.debug(`suffix.set({value: 'newSuffix'}) => `, suffix.set({value: 'newSuffix' as any}).value); // 'newSuffix'

console.debug(`suffix.setKind('newKind') => `, suffix.setKind('newKind' as any).kind); // 'newKind'
console.debug(`suffix.setPattern(/newPattern/g) => `, suffix.setPattern(/newPattern/g).pattern); // /newPattern/g
console.debug(`suffix.setValue('newValue') => `, suffix.setValue('newValue' as any).value); // 'newValue'

console.groupEnd();

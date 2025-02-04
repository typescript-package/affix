import { typeOf } from '@typescript-package/core';
import { Prefix } from '../lib/prefix.class';

const prefix = new Prefix();

console.group(`Prefix`);
console.log(prefix);

console.debug(`set('_')`, prefix.set('_'));
console.debug(`get()`, prefix.get());
console.debug(`value`, prefix.value);

console.log(`typeOf(), `, typeOf(prefix));
console.log(`[object Suffix], `, Object.prototype.toString.call(prefix));

console.groupEnd();

describe(Prefix.name, () => {
  let namePrefix: Prefix;

  beforeEach(() => namePrefix = new Prefix());

  it('is DEFINED', () => expect(namePrefix).toBeDefined());
  it('initially set prefix to $$', () => expect(new Prefix('$$').value).toEqual('$$'));
  it('set prefix to $$', () => expect(namePrefix.set('$$').value).toEqual('$$'));
});

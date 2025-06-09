import { Infix } from "../lib";

describe(Infix.name, () => {
  let infix = new Infix('infixValue' as string);

  beforeEach(() => {
    infix = new Infix('infixValue', /[^a-zA-Z0-9$_]/g);
  });

  it('is DEFINED', () => expect(infix).toBeDefined());
  it('initially set infix to infixValue', () => expect(infix.value).toEqual('infixValue'));
  it('set infix to new value', () => expect(infix.set({value: 'newInfixValue'}).value).toEqual('newInfixValue'));

  it('should apply infix to a string', () => {
    const result = infix.insertTo('testString', 4, '-');
    expect(result).toBe('test-infixValue-String');
  });

  it('should sanitize the infix using the pattern', () => {
    const sanitizedInfix = new Infix('infix@#$', /[^a-zA-Z0-9$_]/g);
    expect(sanitizedInfix.value).toBe('infix$');
  });

  it('should return the correct Symbol.toStringTag', () => {
    expect(Object.prototype.toString.call(infix).match(/\[object (\w+)]/)?.[1]).toBe('Infix');
  });

  it(`should insert infix into a string at the specified position`, () => {
    const result = Infix.insert('testString', 'infixValue', 4, '-');
    expect(result).toBe('test-infixValue-String');
  });
});
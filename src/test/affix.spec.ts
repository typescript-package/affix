import { BasicAffixKind } from "@typedly/affix";
import { Affix } from "../lib";

describe(Affix.name, () => {
  let affix: Affix;

  beforeEach(() => {
    affix = new Affix("testAffixValue", {
      kind: 'prefix' as BasicAffixKind,
      pattern: /[^a-zA-Z0-9$_]/g,
    });
  });

  it('is DEFINED', () => expect(affix).toBeDefined());

  it('initially set affix to testAffixValue', () => expect(affix.value).toEqual('testAffixValue'));
  it('initially set the correct kind', () => expect(affix.kind).toEqual('prefix'));
  it('initially set the correct pattern', () => expect(affix.pattern).toEqual(/[^a-zA-Z0-9$_]/g));
  it('initially set the correct value', () => expect(affix.value).toEqual('testAffixValue'));

  // set
  it('set affix to new value', () => expect(affix.set({value: 'newAffixValue'}).value).toEqual('newAffixValue'));

  // setKind
  it('should set the kind of affix', () => {
    affix.setKind('infix' as BasicAffixKind);
    expect(affix.kind).toEqual('infix');
  });

  // setPattern
  it('should set the pattern of affix', () => {
    affix.setPattern(/^[a-zA-Z0-9$_]/g);
    expect(affix.pattern).toEqual(/^[a-zA-Z0-9$_]/g);
  });

  // setValue
  it('should set the value of affix', () => {
    affix.setValue('updatedAffixValue');
    expect(affix.value).toEqual('updatedAffixValue');
  });

  // sanitization
  it('should sanitize the affix using the pattern', () => {
    const sanitizedAffix = new Affix('test@#$', { pattern: /[^a-zA-Z0-9$_]/g });
    expect(sanitizedAffix.value).toBe('test$');
  });

  it('should return the correct Symbol.toStringTag', () => {
    expect(Object.prototype.toString.call(affix).match(/\[object (\w+)]/)?.[1]).toBe(Affix.name);
  });
});


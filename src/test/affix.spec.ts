import { BasicAffixKind } from "@typedly/affix";
import { Affix } from "../lib";


export const prefix = new Affix("testAffixValue",  {
  kind: 'prefix' as BasicAffixKind,
  pattern: /[^a-zA-Z0-9$_]/g,
});

prefix.setKind('suffix');

console.log(prefix.kind);
console.log(`[object Affix], `, Object.prototype.toString.call(prefix).match(/\[object (\w+)]/)?.[1]);

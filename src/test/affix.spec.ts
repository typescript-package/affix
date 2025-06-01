import { BasicAffixKind } from "@typedly/affix";
import { Affix } from "../lib";

export class TestAffix<
  Value extends string = '',
  KindValue extends BasicAffixKind | undefined = BasicAffixKind,
  PatternValue extends RegExp | string | undefined = RegExp | string | undefined,
> extends Affix<Value, KindValue, PatternValue> {}

const testAffix = new TestAffix("testAffixValue", 
  {
    kind: 'prefix',
    pattern: /[^a-zA-Z0-9$_]/g,
  }
  // {'min': 3, 'max': 10}
);

console.log(testAffix);
console.log(`[object Affix], `, Object.prototype.toString.call(testAffix).match(/\[object (\w+)]/)?.[1]);

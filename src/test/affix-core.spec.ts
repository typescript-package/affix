import { BasicAffixKind } from "@typedly/affix";
import { AffixCore } from "../lib";

export class TestAffix<
  Value extends string = string,
  Kind extends BasicAffixKind | undefined = BasicAffixKind | undefined,
> extends AffixCore<Value, Kind> {
  constructor(
    value: Value,
    kind?: Kind
  ) {
    super(value, kind);
  }
}

const testAffix = new TestAffix('test', 'prefix' as BasicAffixKind);

testAffix.setKind('suffix' as BasicAffixKind);

console.log(testAffix.kind);
console.log(`[object Affix], `, Object.prototype.toString.call(testAffix).match(/\[object (\w+)]/)?.[1]);

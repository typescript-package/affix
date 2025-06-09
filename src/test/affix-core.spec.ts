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

describe("AffixCore", () => {
  it("should create an instance with default values", () => {
    const affix = new TestAffix("test");
    expect(affix.value).toBe("test");
    expect(affix.kind).toBeUndefined();
  });

  it("should create an instance with specified kind", () => {
    const affix = new TestAffix("test", "prefix");
    expect(affix.value).toBe("test");
    expect(affix.kind).toBe("prefix");
  });

});
// Abstract.
import { AffixCore } from "./affix-core.abstract";
// Interface.
import { BasicAffixKind } from "@typedly/affix";
/**
 * @description A concrete class to manage affixes that can be applied to strings with additional sanitization.
 * @export
 * @class Affix
 * @template {string} [Value=string] The type of affix constrained by the `string`. Defaults to `string`.
 * @template {BasicAffixKind | undefined} [Kind=BasicAffixKind | undefined] 
 * @template {RegExp | string | undefined} [Pattern=RegExp | string | undefined] 
 */
export class Affix<
  Value extends string = string,
  Kind extends BasicAffixKind | undefined = BasicAffixKind | undefined,
  Pattern extends RegExp | string | undefined = RegExp | string | undefined,
> extends AffixCore<Value, Kind> {
  /**
   * @description Returns the `string` tag representation of the `Affix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return Affix.name;
  }

  /**
   * @description The default pattern used to sanitize the affix, which removes characters that are not part of the valid characters for the affix.
   * @public
   * @static
   * @type {RegExp | string}
   */
  public static pattern: RegExp | string = /[^a-zA-Z0-9$_]/g;

  /**
   * @description Defines the affix sanitized by specified pattern.
   * @public
   * @static
   * @template {string} [Value=string] The type of affix constrained by the `string` type. Defaults to `string`.
   * @param {Value} value A value of generic type variable `Value` constrained by the `string` type to be sanitized with the `pattern`.
   * @param {RegExp | string} [pattern=Affix.pattern] The pattern of `RegExp` to sanitize the `affix`. Defaults to static `Affix.pattern`.
   * @returns {Value} The returned value is an affix of a generic type variable `Value`, optionally sanitized by the `pattern`.
   */
  public static sanitize<Value extends string = string>(
    value: Value,
    pattern: RegExp | string = this.pattern,
  ): Value {
    return value.replace(pattern, '') as Value;
  }

  /**
   * @description Returns the privately stored pattern of `PatternValue` type to sanitize the affix.
   * @public
   * @readonly
   * @type {(Pattern)}
   */
  public get pattern(): Pattern {
    return this.#pattern as Pattern;
  }

  /**
   * @description Privately stored pattern of `Pattern` to sanitize the affix.
   * @type {Pattern | undefined}
   */
  #pattern?: Pattern;

  /**
   * Creates an instance of `Affix`.
   * @constructor
   * @param {Value} value An optional initial affix of generic type variable `Value` constrained by `string` type. Defaults to `Affix.pattern`.
   * @param {{ kind?: Kind, pattern?: Pattern }} [param0={}] The options object to set the kind and pattern of the affix.
   * @param {Kind} param0.kind The kind of affix constrained by `BasicAffixKind` type.
   * @param {Pattern} param0.pattern The pattern of `PatternValue` to sanitize the affix.
   */
  constructor(
    value: Value,
    { kind, pattern }: { kind?: Kind, pattern?: Pattern } = {},
  ) {
    super(value, kind);
    this.#pattern = pattern ?? Affix.pattern as Pattern;
  }

  /**
   * @description Returns the affix, optionally sanitized by the `pattern`.
   * @public
   * @param {(Pattern)} [pattern=this.#pattern] The pattern of `RegExp` to sanitize privately stored affix.
   * @returns {Value} Returns privately stored `#affix` of `Value` type optionally sanitized by the `pattern`.
   */
  public get(pattern: Pattern = this.#pattern as Pattern): Value {
    return Affix.sanitize(super.value, pattern) as Value;
  }

  /**
   * @description Sets and stores privately sanitized affix of generic type variable `Value` constrained by `string` type.
   * @public
   * @param {({ kind?: Kind, pattern?: Pattern, value?: Value})} [param0={}] 
   * @param {Kind} param0.kind The kind of affix constrained by `BasicAffixKind` type.
   * @param {Pattern} param0.pattern The pattern of `Pattern` to sanitize the affix.
   * @param {Value} param0.value The value of the affix constrained by `string` type.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public set({ kind, pattern, value }: { kind?: Kind, pattern?: Pattern, value?: Value } = {}): this {
    typeof value === 'string' && this.setValue(Affix.sanitize(value, pattern) as Value);
    'kind' in arguments[0] && this.setKind(kind as Kind);
    'pattern' in arguments[0] && this.setPattern(pattern as Pattern);
    return this;
  }

  /**
   * @description Sets the pattern to sanitize the affix.
   * @public
   * @param {Pattern} pattern The pattern of `Pattern` to sanitize the affix.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public setPattern(pattern: Pattern): this {
    this.#pattern = pattern;
    return this;
  }
}

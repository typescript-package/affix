// Interface.
import { BasicAffixKind } from "@typedly/affix";
/**
 * @description A base class to manage affixes (prefixes or suffixes) that can be applied to strings.
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
> {
  /**
   * @description Returns the `string` tag representation of the `Affix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag]() {
    return Affix.name;
  }

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
   * @description The default pattern used to sanitize the affix, which removes characters that are not part of the valid characters for the affix.
   * @public
   * @static
   * @type {RegExp | string}
   */
  public static pattern: RegExp | string = /[^a-zA-Z0-9$_]/g;

  /**
   * @description Returns the kind of affix.
   * @public
   * @readonly
   * @type {(Kind | undefined)}
   */
  public get kind(): Kind | undefined {
    return this.#kind;
  }

  /**
   * @description Returns the privately stored pattern of `PatternValue` type to sanitize the affix.
   * @public
   * @readonly
   * @type {(Pattern | undefined)}
   */
  public get pattern(): Pattern | undefined {
    return this.#pattern;
  }

  /**
   * @description Returns the privately stored affix of generic type variable `Value` constrained by `string` type.
   * @public
   * @readonly
   * @type {Value}
   */
  public get value(): Value {
    return this.#value;
  }

  /**
   * @description Privately stored kind of `Kind` to define the type of affix.
   * @type {Kind | undefined}
   */
  #kind: Kind | undefined;

  /**
   * @description Privately stored pattern of `Pattern` to sanitize the affix.
   * @type {Pattern | undefined}
   */
  #pattern: Pattern | undefined;

  /**
   * @description Privately stored affix of generic type variable `Value` constrained by `string` type.
   * @type {Value}
   */
  #value: Value;

  /**
   * Creates an instance of `Affix`.
   * @constructor
   * @param {Value} value An optional initial affix of generic type variable `Value` constrained by `string` type. Defaults to `Affix.pattern`.
   * @param {{ kind?: Kind, pattern?: Pattern }} [param0={}] 
   * @param {Kind} param0.kind The kind of affix constrained by `BasicAffixKind` type.
   * @param {Pattern} param0.pattern The pattern of `PatternValue` to sanitize the affix.
   */
  constructor(
    value: Value,
    { kind, pattern }: { kind?: Kind, pattern?: Pattern } = {},
  ) {
    this.#pattern = pattern ?? Affix.pattern as Pattern;
    this.#kind = kind;
    this.#value = Affix.sanitize(value ?? '', this.#pattern) as Value;
  }

  /**
   * @description Returns the affix, optionally sanitized by the `pattern`.
   * @public
   * @param {(Pattern | undefined)} [pattern=this.#pattern] The pattern of `RegExp` to sanitize privately stored affix.
   * @returns {Value} Returns privately stored `#affix` of `Value` type optionally sanitized by the `pattern`.
   */
  public get(pattern: Pattern | undefined = this.#pattern): Value {
    return Affix.sanitize(this.#value, pattern) as Value;
  }

  /**
   * @private
   * @param {Value} value The `affix` of generic type variable `Value`.
   * @param {(Pattern | undefined)} [pattern=this.#pattern] The pattern of `RegExp` to sanitize the `affix`. Defaults to privately stored `#pattern`.
   */

  /**
   * @description Sets and stores privately sanitized affix of generic type variable `Value` constrained by `string` type.
   * @public
   * @param {({ kind?: Kind | undefined, pattern?: Pattern | undefined, value?: Value})} [param0={}] 
   * @param {Kind} param0.kind The kind of affix constrained by `BasicAffixKind` type.
   * @param {Pattern} param0.pattern The pattern of `Pattern` to sanitize the affix.
   * @param {Value} param0.value The value of the affix constrained by `string` type.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public set({ kind, pattern, value }: { kind?: Kind | undefined, pattern?: Pattern | undefined, value?: Value } = {}): this {
    typeof value === 'string' && this.setValue(Affix.sanitize(value, pattern) as Value);
    this.setKind(kind);
    this.setPattern(pattern);
    return this;
  }

  /**
   * @description Sets the kind of affix.
   * @public
   * @param {Kind | undefined} kind The kind of generic type variable `Kind` constrained by `BasicAffixKind` type.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public setKind(kind: Kind | undefined): this {
    this.#kind = kind;
    return this;
  }

  /**
   * @description Sets the pattern to sanitize the affix.
   * @public
   * @param {Pattern | undefined} pattern The pattern of `Pattern` to sanitize the affix.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public setPattern(pattern: Pattern | undefined): this {
    this.#pattern = pattern;
    return this;
  }

  /**
   * @description Sets the value of the affix, sanitizing it according to the defined pattern.
   * @public
   * @param {Value | undefined} value 
   * @returns {this} 
   */
  public setValue(value: Value | undefined): this {
    this.#value = Affix.sanitize(value ?? '' as Value, this.#pattern);
    return this;
  }
}

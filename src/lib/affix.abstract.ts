// Class.
import { Value } from '@typescript-package/core';
/**
 * @description A class to manage affixes (prefixes or suffixes) that can be applied to strings.
 * @export
 * @abstract
 * @class Affix
 * @template {string} [Value=string] The type of affix constrained by the `string`. Defaults to, `string`.
 * @extends {Value<Value>}
 */
export abstract class Affix<Value extends string = string> extends Value<Value> {
  /**
   * @description Returns the `string` tag representation of the `Affix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return 'Affix';
  }

  /**
   * @description Defines the affix sanitized by specified pattern.
   * @public
   * @static
   * @template {string} [Value=string] 
   * @param {Value} value A value of generic type variable `Value` constrained by the `string` type to be sanitized with the `pattern`.
   * @param {RegExp} [pattern=Affix.pattern] The pattern of `RegExp` to sanitize the `affix`. Defaults to static `Affix.pattern`.
   * @returns {Value} The returned value is an affix of a generic type variable `Value`, optionally sanitized by the `pattern`.
   */
  public static sanitize<Value extends string = string>(
    value: Value,
    pattern: RegExp = Affix.pattern,
  ): Value {
    return value.replace(pattern, '') as Value;
  }

  /**
   * @description The default pattern pattern used to sanitize the affix, which removes characters that are not part of the valid characters for the affix.
   * @public
   * @static
   * @type {RegExp}
   */
  public static pattern: RegExp = /[^a-zA-Z0-9$_]/g;

  /**
   * @description Returns the privately stored pattern of `RegExp` type to sanitize the affix.
   * @public
   * @readonly
   * @type {RegExp}
   */
  public get pattern() {
    return this.#pattern;
  }

  /**
   * @description Privately stored pattern of `RegExp` to sanitize the affix.
   * @type {RegExp}
   */
  #pattern = Affix.pattern;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {?Value} [value] An optional initial affix of generic type variable `Value` constrained by `string` type.
   * @param {?RegExp} [pattern] The pattern of `RegExp` to sanitize the affix.
   */
  constructor(value?: Value, pattern?: RegExp) {
    super(value || '' as Value);
    pattern instanceof RegExp && (this.#pattern = pattern);
    typeof value !== 'undefined' && this.set(value);
  }

  /**
   * @description Returns the affix, optionally sanitized by the `pattern`.
   * @public
   * @param {?RegExp} [pattern] The pattern of `RegExp` to sanitize privately stored affix.
   * @returns {string} Returns privately stored `#affix` of `string` type optionally sanitized by the `pattern`.
   */
  public get(pattern?: RegExp) {
    return Affix.sanitize(this.value, pattern);
  }

  /**
   * @description Sets and stores privately sanitized affix of generic type variable `Value` constrained by `string` type.
   * @private
   * @param {Value} value The `affix` of generic type variable `Value`.
   * @param {RegExp} [pattern=this.#pattern] The pattern of `RegExp` to sanitize the `affix`. Defaults to privately stored `#pattern`.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public set(value: Value, pattern: RegExp = this.#pattern): this {
    typeof value === 'string' && (super.setValue(Affix.sanitize(value, pattern) as Value));
    return this;
  }

  /**
   * @description Sets the pattern to sanitize the affix.
   * @public
   * @param {RegExp} pattern The pattern of `RegExp` to sanitize the affix.
   * @returns {this} 
   */
  public setPattern(pattern: RegExp): this {
    pattern instanceof RegExp && (this.#pattern = pattern);
    return this;
  }
}

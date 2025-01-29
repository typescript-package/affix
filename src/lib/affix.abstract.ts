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
   * @description Defines the affix sanitized by specified filter.
   * @public
   * @static
   * @template {string} [Value=string] 
   * @param {Value} value A value of generic type variable `Value` constrained by the `string` type to be sanitized with the `filter`.
   * @param {RegExp} [filter=Affix.filter] The filter of `RegExp` to sanitize the `affix`. Defaults to static `Affix.filter`.
   * @returns {Value} The returned value is an affix of a generic type variable `Value`, optionally sanitized by the `filter`.
   */
  public static sanitize<Value extends string = string>(
    value: Value,
    filter: RegExp = Affix.filter,
  ): Value {
    return value.replace(filter, '') as Value;
  }

  /**
   * @description The default filter pattern used to sanitize the affix, which removes characters that are not part of the valid characters for the affix.
   * @public
   * @static
   * @type {RegExp}
   */
  public static filter: RegExp = /[^a-zA-Z0-9$_]/g;

  /**
   * @description Returns the privately stored filter of `RegExp` type to sanitize the affix.
   * @public
   * @readonly
   * @type {RegExp}
   */
  public get filter(): RegExp {
    return this.#filter;
  }

  /**
   * @description Privately stored filter of `RegExp` to sanitize the affix.
   * @type {RegExp}
   */
  #filter = Affix.filter;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {?Value} [value] An optional initial affix of generic type variable `Value` constrained by `string` type.
   * @param {?RegExp} [filter] The filter of `RegExp` to sanitize the affix.
   */
  constructor(value?: Value, filter?: RegExp) {
    super(value || '' as Value);
    filter instanceof RegExp && (this.#filter = filter);
    typeof value !== 'undefined' && this.set(value);
  }

  /**
   * @description Returns the affix, optionally sanitized by the `filter`.
   * @public
   * @param {?RegExp} [filter] The filter of `RegExp` to sanitize privately stored affix.
   * @returns {string} Returns privately stored `#affix` of `string` type optionally sanitized by the `filter`.
   */
  public get(filter?: RegExp) {
    return Affix.sanitize(this.value, filter);
  }

  /**
   * @description Sets and stores privately sanitized affix of generic type variable `Value` constrained by `string` type.
   * @private
   * @param {Value} value The `affix` of generic type variable `Value`.
   * @param {RegExp} [filter=this.#filter] The filter of `RegExp` to sanitize the `affix`. Defaults to privately stored `#filter`.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public set(value: Value, filter: RegExp = this.#filter): this {
    typeof value === 'string' && (super.setValue(Affix.sanitize(value, filter) as Value));
    return this;
  }

  /**
   * @description Sets the filter to sanitize the affix.
   * @public
   * @param {RegExp} filter The filter of `RegExp` to sanitize the affix.
   */
  public setFilter(filter: RegExp): this {
    filter instanceof RegExp && (this.#filter = filter);
    return this;
  }
}

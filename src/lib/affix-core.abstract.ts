// Interface.
import { BasicAffixKind } from "@typedly/affix";
/**
 * @description A core abstract class to manage affixes with the value and kind that can be applied to strings.
 * @export
 * @abstract
 * @class AffixCore
 * @template {string | [string, string]} [Value=string | [string, string]] The type of affix constrained by the `string` and tuple of strings. Defaults to `string`.
 * @template {BasicAffixKind | undefined} [Kind=BasicAffixKind | undefined] The kind of affix.
 */
export abstract class AffixCore<
  Value extends string | [string, string] = string | [string, string],
  Kind extends BasicAffixKind | undefined = BasicAffixKind | undefined,
> {
  /**
   * @description Checks if the given instance is an instance of `AffixCore`.
   * @public
   * @static
   * @param {any} instance The instance to check.
   * @returns {boolean} The boolean value indicating whether the instance is of type `AffixCore`.
   */
  public static is(instance: any): boolean {
    return Object.prototype.toString.call(instance).match(/\[object (\w+)]/)?.[1] === this.tagName;
  }

  /**
   * @description Tag name for the `toStringTag`.
   * @public
   * @static
   * @type {string}
   */
  public static tagName: string = 'AffixCore';

  /**
   * @description Returns the `string` tag representation of the `Affix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag]() {
    return AffixCore.tagName;
  }

  /**
   * @description Returns the kind of affix.
   * @public
   * @readonly
   * @type {(Kind)}
   */
  public get kind(): Kind {
    return this.#kind as Kind;
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
  #kind?: Kind;

  /**
   * @description Privately stored affix of generic type variable `Value` constrained by `string` type.
   * @type {Value}
   */
  #value: Value;

  /**
   * Creates an instance of `AffixCore`.
   * @constructor
   * @param {Value} value An optional initial affix of generic type variable `Value` constrained by `string` type. Defaults to `Affix.pattern`.
   * @param {?Kind} [kind] The kind of generic type variable `Kind` constrained by `BasicAffixKind` type. Defaults to `undefined`.
   */
  constructor(
    value: Value,
    kind?: Kind,
  ) {
    this.#kind = kind;
    this.#value = value as Value;
  }

  /**
   * @description Sets the kind of affix.
   * @public
   * @param {Kind} kind The kind of generic type variable `Kind` constrained by `BasicAffixKind` type.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public setKind(kind: Kind): this {
    this.#kind = kind;
    return this;
  }

  /**
   * @description Sets the value of the affix, sanitizing it according to the defined pattern.
   * @public
   * @param {Value} value 
   * @returns {this} 
   */
  public setValue(value: Value): this {
    this.#value = value as Value;
    return this;
  }
}

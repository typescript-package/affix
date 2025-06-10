// Class.
import { Affix } from "./affix.class";
// Type.
import { PrefixTemplate } from '@typedly/affix';
/**
 * @description A class to manage prefixes that can be applied to strings.
 * @export
 * @class Prefix
 * @template {string} [Value=string] The type of prefix constrained by the `string`.
 * @template {RegExp | string | undefined} [Pattern=RegExp | string | undefined] The type of pattern constrained by the `RegExp` or `string`.
 * @extends {Affix<Value, 'prefix', Pattern>}
 */
export class Prefix<
  Value extends string = string,
  Pattern extends RegExp | string | undefined = RegExp | string | undefined,
> extends Affix<Value, 'prefix', Pattern> {
  /**
   * @description Prepends the prefix to stem string.
   * @public
   * @static
   * @template {string} [Stem=string] The type of stem string constrained by the `string`.
   * @template {string} [Prefix=string] The type of prefix constrained by the `string`.
   * @param {Stem} stem The stem string to append the prefix.
   * @param {Prefix} [prefix=Prefix.default as Prefix] Prefix to append to stem.
   * @param {Delimiter} [delimiter='' as Delimiter] The delimiter to use between the prefix and the stem.
   * @param {boolean} [sanitize=true] Whether to sanitize the prefix using the static `Prefix.pattern`.
   * @returns {PrefixTemplate<Prefix, Stem, Delimiter>} 
   */
  public static prepend<
    Stem extends string = string,
    Prefix extends string = string,
    Delimiter extends string = '',
  >(
    stem: Stem,
    prefix: Prefix = Prefix.default as Prefix,
    delimiter: Delimiter = '' as Delimiter,
    sanitize: boolean = true
  ): PrefixTemplate<Prefix, Stem, Delimiter> {
    return `${sanitize ? super.sanitize(prefix, this.pattern) : prefix}${delimiter}${stem}`;
  }

  /**
   * @description Tag name for the `toStringTag`.
   * @public
   * @static
   * @type {string}
   */
  public static override tagName: string = 'Prefix';

  /**
   * @description The default prefix to use.
   * @public
   * @static
   * @type {string}
   */
  public static default: string = '';

  /**
   * @description Returns the `string` tag representation of the `Prefix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return Prefix.tagName;
  }

  /**
   * @description The prefix value of the generic type variable `Value` constrained by the `string` type.
   * @public
   * @readonly
   * @type {Value}
   */
  public get prefix(): Value {
    return this.value as Value;
  }

  /**
   * Creates an instance of `Prefix`.
   * @constructor
   * @param {Value} [value='' as Value] The value of the prefix, constrained by the `string` type. Defaults to an empty string.
   * @param {Pattern} [pattern=Prefix.pattern] The pattern to sanitize the prefix. Defaults to the static `Prefix.pattern`.
   */
  constructor(
    value: Value = '' as Value,
    pattern: Pattern = Prefix.pattern as Pattern
  ) {
    super(value, { kind: 'prefix', pattern });
  }

  /**
   * @description Prepends the prefix to stem string.
   * @public
   * @template {string} [Stem=string] The type of the stem string.
   * @template {string} [Delimiter=''] The type of delimiter string.
   * @param {Stem} stem The stem to prepend the prefix.
   * @param {Delimiter} [delimiter='' as Delimiter] The delimiter to use between the prefix and the stem.
   * @returns {PrefixTemplate<Value, Stem, Delimiter>} The resulting string with the prefix prepended.
   */
  public prependTo<Stem extends string = string, Delimiter extends string = ''>(
    stem: Stem,
    delimiter: Delimiter = '' as Delimiter
  ): PrefixTemplate<Value, Stem, Delimiter> {
    return Prefix.prepend(
      stem,
      Prefix.sanitize(this.prefix, this.pattern),
      delimiter
    ) as PrefixTemplate<Value, Stem, Delimiter>;
  }

  /**
   * Sets the pattern and value for the prefix affix.
   * @inheritdoc
   * @public
   * @param {{ pattern?: Pattern, value?: Value }} [param0={}] 
   * @param {Pattern} param0.pattern The pattern to sanitize the prefix.
   * @param {Value} param0.value The value of the prefix, constrained by the `string` type.
   * @returns {this} The current instance of `Prefix`.
   */
  public override set({ pattern, value }: { pattern?: Pattern, value?: Value } = {}): this {
    super.set({ pattern, value });
    return this;
  }
}

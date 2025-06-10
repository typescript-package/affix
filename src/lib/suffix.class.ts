// Class.
import { Affix } from "./affix.class";
// Type.
import { SuffixTemplate } from "@typedly/affix";
/**
 * @description A class to manage suffixes that can be applied to strings.
 * @export
 * @class Suffix
 * @template {string} [Value=string] The type of suffix constrained by the `string`.
 * @template {RegExp | string | undefined} [Pattern=RegExp | string | undefined] The type of pattern constrained by the `RegExp` or `string`.
 * @extends {Affix<Value, 'suffix', Pattern>}
 */
export class Suffix<
  Value extends string = string,
  Pattern extends RegExp | string | undefined = RegExp | string | undefined,
> extends Affix<Value, 'suffix', Pattern> {
  /**
   * @description Appends the suffix to the stem string.
   * @public
   * @static
   * @template {string} [Stem=string] The type of stem string constrained by the `string`.
   * @template {string} [Suffix=string] The type of suffix constrained by the `string`.
   * @param {Stem} stem The stem string to append the suffix.
   * @param {Suffix} [suffix=Suffix.default as Suffix] Suffix to append to stem.
   * @param {Delimiter} [delimiter='' as Delimiter] The delimiter to use between the stem and the suffix.
   * @param {boolean} [sanitize=true] Whether to sanitize the suffix using the static `Suffix.pattern`.
   * @returns {SuffixTemplate<Stem, Suffix>} 
   */
  public static append<
    Stem extends string = string,
    Suffix extends string = string,
    Delimiter extends string = ''
  >(
    stem: Stem,
    suffix: Suffix = Suffix.default as Suffix,
    delimiter: Delimiter = '' as Delimiter,
    sanitize: boolean = true
  ): SuffixTemplate<Stem, Suffix, Delimiter> {
    return `${stem}${delimiter}${sanitize ? super.sanitize(suffix, this.pattern) : suffix}`;
  }

  /**
   * @description Tag name for the `toStringTag`.
   * @public
   * @static
   * @type {string}
   */
  public static override tagName: string = 'Suffix';

  /**
   * @description The default suffix to use.
   * @public
   * @static
   * @type {string}
   */
  public static default: string = '';

  /**
   * @description Returns the `string` tag representation of the `Suffix` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return Suffix.tagName;
  }

  /**
   * @description The suffix value of generic type variable `Value` constrained by the `string` type.
   * @public
   * @readonly
   * @type {Value}
   */
  public get suffix(): Value {
    return this.value as Value;
  }

  /**
   * Creates an instance of `Suffix`.
   * @constructor
   * @param {Value} [value='' as Value] The value of the suffix, constrained by the `string` type. Defaults to an empty string.
   * @param {(Pattern)} [pattern=Suffix.pattern] The pattern to sanitize the suffix. Defaults to the static `Suffix.pattern`.
   */
  constructor(
    value: Value = '' as Value,
    pattern: Pattern = Suffix.pattern as Pattern
  ) {
    super(value, { kind: 'suffix', pattern });
  }

  /**
   * @description Appends the internal suffix to the stem string.
   * @public
   * @template {string} Stem The type of stem string.
   * @param {Stem} stem The stem string to append the suffix.
   * @param {Delimiter} delimiter The delimiter between stem and suffix.
   * @returns {SuffixTemplate<Stem, Value, Delimiter>} The returned value is a template of stem and suffix.
   */
  public appendTo<
    Stem extends string,
    Delimiter extends string = ''
  >(
    stem: Stem,
    delimiter: Delimiter = '' as Delimiter
  ): SuffixTemplate<Stem, Value, Delimiter> {
    return Suffix.append(
      stem,
      Suffix.sanitize(this.suffix, this.pattern),
      delimiter,
      false
    );
  }
  
  /**
   * Sets the pattern and value for the suffix affix.
   * @inheritdoc
   * @public
   * @param {{ pattern?: Pattern, value?: Value }} [param0={}] 
   * @param {Pattern} param0.pattern The pattern to sanitize the suffix.
   * @param {Value} param0.value The value of the suffix, constrained by the `string` type.
   * @returns {this} The current instance of `Suffix`.
   */
  public override set({ pattern, value }: { pattern?: Pattern, value?: Value } = {}): this {
    super.set({ pattern, value });
    return this;
  }
}

<a href="https://www.typescriptlang.org/">
  <img
    src="https://avatars.githubusercontent.com/u/189666396?s=150&u=9d55b1eb4ce258974ead76bf07ccf49ef0eb0ea7&v=4"
    title="@typescript-package - The typescript package enhances the development of typescript-based applications by providing well-structured, reusable, easy-to-use packages."
  />
</a>

## typescript-package/affix

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

**version**: v4.0.0

A **lightweight** TypeScript library for different kind of affixes.

<br>

## Table of contents

- [Installation](#installation)
- [Api](#api)
  - [`AffixCore`](#affixcore)
  - [`Affix`](#affix)
  - [`Circumfix`](#circumfix)
  - [`Infix`](#infix)
  - [`Prefix`](#prefix)
  - [`Suffix`](#suffix)
- [Contributing](#contributing)
- [Support](#support)
- [Code of Conduct](#code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)

## Installation

### 1. Install peer dependencies

```bash
npm install @typedly/affix --save-peer
```

### 2. Install the package

```bash
npm install @typescript-package/affix --save-peer
```

## Api

```typescript
import {
  // Abstract.
  AffixCore,
  // Class.
  Affix,
  Circumfix,
  Infix,
  Prefix,
  Suffix,
} from '@typescript-package/affix';
```

### `AffixCore`

A core `abstract` class to manage affixes with the value and kind that can be applied to strings.

```typescript
import { AffixCore } from '@typescript-package/affix';

class Prefix extends AffixCore<string, 'prefix'> {
  constructor(value: string) {
    super(value, 'prefix');
  }
}
```

### `Affix`

A concrete class to manage affixes that can be applied to strings with additional sanitization.

```typescript
import { Affix } from '@typescript-package/affix';

export const prefix = new Affix("testAffixValue",  {
  kind: 'prefix' as BasicAffixKind,
  pattern: /[^a-zA-Z0-9$_]/g,
});
```

### `Circumfix`

A class to manage circumfixes that can be applied to strings.

```typescript
import { Circumfix } from '@typescript-package/affix';

const circumfix = new Circumfix(
  'pre', // Start
  'post', // End
  /[^a-zA-Z0-9$_]/g // Pattern
);

circumfix.insertTo(
  'light' // Stem
); // 'prelightpost'
```

### `Infix`

A class to manage infixes that can be applied to strings.

```typescript
import { Infix } from '@typescript-package/affix';

const infix = new Infix('en');

infix.insertTo(
  'light', // stem
  5 // position
); // 'lighten'
infix.insertTo(
  'light', // stem
  0 // position
); // 'enlight'
infix.insertTo(
  'light', // stem
  1, // position
  '-' // delimiter
); // 'l-en-ight'
```

### `Prefix`

A class to manage prefixes that can be applied to strings.

```typescript
import { Prefix } from '@typescript-package/affix';

const prefix = new Prefix(
  'pre', // Value
  /[^a-zA-Z0-9$_]/g // Pattern
);

prefix.prependTo(
  'stem', // stem
  '-' // delimiter
); // 'pre-stem'

console.debug(`default => `, Prefix.default); // ''
console.debug(`pattern => `, Prefix.pattern); // RegExp /[^a-zA-Z0-9$_]/g
console.debug(`tagName => `, Prefix.tagName); // 'Prefix'

console.debug(`kind => `, prefix.kind); // 'prefix'
console.debug(`pattern => `, prefix.pattern); // RegExp /[^a-zA-Z0-9$_]/g
console.debug(`prefix => `, prefix.prefix); // 'pre'
console.debug(`toStringTag => `, prefix[Symbol.toStringTag]); // 'Prefix'
console.debug(`value => `, prefix.value); // 'pre'

console.debug(`prefix.get()`, prefix.get()); // 'pre'
console.debug(`prefix.set({value: 'newPrefix'}) => `, prefix.set({value: 'newPrefix' as any}).value); // 'newPrefix'

console.debug(`prefix.setKind('newKind') => `, prefix.setKind('newKind' as any).kind); // 'newKind'
console.debug(`prefix.setPattern(/newPattern/g) => `, prefix.setPattern(/newPattern/g).pattern); // /newPattern/g
console.debug(`prefix.setValue('newValue') => `, prefix.setValue('newValue' as any).value); // 'newValue'

```

### `Suffix`

A class to manage suffixes that can be applied to strings.

```typescript
import { Suffix } from '@typescript-package/affix';

export const suffix = new Suffix(
  'post', // Value
  /[^a-zA-Z0-9$_]/g // Pattern
);

Suffix.append(
  'stem',
  'post',
  '-'
); // 

```

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

- [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
- [Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)
- [GitHub](https://github.com/sponsors/angular-package/sponsorships?sponsor=sciborrudnicki&tier_id=83618)
- [DonorBox](https://donorbox.org/become-a-sponsor-to-the-angular-package?default_interval=o)
- [Patreon](https://www.patreon.com/checkout/angularpackage?rid=0&fan_landing=true&view_as=public)

or via Trust Wallet

- [XLM](https://link.trustwallet.com/send?coin=148&address=GAFFFB7H3LG42O6JA63FJDRK4PP4JCNEOPHLGLLFH625X2KFYQ4UYVM4)
- [USDT (BEP20)](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94&token_id=0x55d398326f99059fF775485246999027B3197955)
- [ETH](https://link.trustwallet.com/send?coin=60&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
- [BTC](https://link.trustwallet.com/send?coin=0&address=bc1qnf709336tfl57ta5mfkf4t9fndhx7agxvv9svn)
- [BNB](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)

Thanks for your support!

## Code of Conduct

By participating in this project, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

- [AngularJS Git Commit Message Conventions][git-commit-angular]
- [Karma Git Commit Msg][git-commit-karma]
- [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © angular-package ([license][typescript-package-license])

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/affix
  [typescript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/affix
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/affix
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/affix
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/affix/issues
  [typescript-package-forks]: https://github.com/typescript-package/affix/network
  [typescript-package-license]: https://github.com/typescript-package/affix/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/affix/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/%40typescript-package%2Faffix.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/%40typescript-package%2Faffix

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/

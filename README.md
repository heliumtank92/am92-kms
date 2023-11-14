# @am92/kms

[![npm version](https://img.shields.io/npm/v/@am92/kms?style=for-the-badge)](https://www.npmjs.com/package/@am92/kms)&nbsp;
[![ECMAScript Module](https://img.shields.io/badge/ECMAScript-Module%20Only-red?style=for-the-badge)](https://nodejs.org/api/esm.html)&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@am92/kms?color=yellow&style=for-the-badge)](https://opensource.org/licenses/MIT)&nbsp;
[![Vulnerabilities: Snyk](https://img.shields.io/snyk/vulnerabilities/npm/@am92/kms?style=for-the-badge)](https://security.snyk.io/package/npm/@am92%2Fkms)&nbsp;
[![Downloads](https://img.shields.io/npm/dy/@am92/kms?style=for-the-badge)](https://npm-stat.com/charts.html?package=%40m92%2Fkms)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@am92/kms?style=for-the-badge)](https://bundlephobia.com/package/@am92/kms)

<br />

This package provides Key Management related functionalities using either Node Crypto or AWS KMS. It provides the following functionalities:
* Generating Encryption Key for Symmetric and Asymmetric Algorithms
* Encrypting and Decrypting data using:
  * Defined Master Key and Master IV in case of Node Crypto
  * KMS defined Master Key and IV in case of AWS KMS

<br />

## Table of Content
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Creating a KMS Instance](#creating-a-kms-instance)
- [Contributors](#contributors)
- [Resources](#resources)
- [License](#license)

<br />

## Installation
```bash
$ npm install --save @am92/kms
```
<br />

## Environment Variables
The following environment variables need to be set to work with this package:
```sh
##### KMS Config
export KMS_ENABLED=false
export KMS_TYPE=''
export KMS_KEY_SPEC='AES_256'
export KMS_KEY_PAIR_SPEC='RSA_2048'
export KMS_KEY_FORMAT='base64'
export KMS_PLAIN_TEXT_FORMAT='base64'
export KMS_CIPHER_TEXT_FORMAT='base64'
export KMS_MASTER_KEY_HEX='0000000000000000000000000000000000000000000000000000000000000000'
export KMS_MASTER_IV_HEX='00000000000000000000000000000000'
export KMS_AWS_REGION='ap-south-1'
export KMS_AWS_KEY_ID=''
```

*Note:*
* *If 'KMS_ENABLED' is set to 'true', 'KMS_TYPE' is required. Possible values are 'NODE' and 'AWS'*
* *If 'KMS_TYPE' is set to 'AWS', 'KMS_AWS_KEY_ID'is required*
* *Variables where values have been defined can be omitted from being defined as the mentioned values are internally defaulted.*

<br />

## Creating a KMS Instance
```javascript
import Kms from '@am92/kms'

const kms = new Kms()
export default kms
```

If you wish to pass your custom 'config' to Kms Class, then you can build it as follows:

```javascript
import Kms from '@am92/kms'

const config = {
  KMS_TYPE: 'NODE'
}

const kms = new Kms(config)
export default kms
```

<br />

## Contributors
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href='https://github.com/ankitgandhi452'>
          <img src="https://avatars.githubusercontent.com/u/8692027?s=400&v=4" width="100px;" alt="Ankit Gandhi"/>
          <br />
          <sub><b>Ankit Gandhi</b></sub>
        </a>
      </td>
      <td align="center">
        <a href='https://github.com/agarwalmehul'>
          <img src="https://avatars.githubusercontent.com/u/8692023?s=400&v=4" width="100px;" alt="Mehul Agarwal"/>
          <br />
          <sub><b>Mehul Agarwal</b></sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>

<br />

## Resources
* [AWS SDK - KMS Client](https://www.npmjs.com/package/@aws-sdk/client-kms)

<br />

## License
* [MIT](https://opensource.org/licenses/MIT)


<br />
<br />

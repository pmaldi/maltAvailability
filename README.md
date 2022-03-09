<h1 align="center">Welcome to maltavailability 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/KalenasTV" target="_blank">
    <img alt="Twitter: KalenasTV" src="https://img.shields.io/twitter/follow/KalenasTV.svg?style=social" />
  </a>
</p>

> Allows to automate the update of the availability on the Malt.fr website

## Install

```sh
npm install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

<p><em>Login Field</em></p>

`USER_EMAIL`=foo@bar.com<br />
`USER_PASSWORD`=foobar30!<br />

<p><em>Duration between each tests</em></p>

`TESTS_TIMEOUT`=2000

<p><em>AVAILABLE Or NOT_AVAILABLE</em></p>
<p><em>If AVAILABLE is set, NOT_AVAILABLE and NOT_AVAILABLE_CUSTOM_DATE variable is not used</em></p>

`AVAILABLE`=AVAILABLE

<p><em>Availability Frequency : <br />
FULL_TIME<br />
EVENINGS_AND_WEEKENDS<br />
FOUR_DAYS_PER_WEEK<br />
THREE_DAYS_PER_WEEK<br />
TWO_DAYS_PER_WEEK<br />
ONE_DAY_PER_WEEK<br /></em></p>

`AVAILABILITY_FREQUENCY`=FULL_TIME

<p><em> Not Availability Frequency :<br />
1month<br />
3month<br />
6month<br />
CUSTOM_DATE<br /></em></p>

`NOT_AVAILABLE`=1month <br />
`NOT_AVAILABLE_CUSTOM_DATE`=dd/MM/yyyy

## Usage

Just run the following command and have fun :

```sh
npm run test
```
If no test is in error, it means that everything went well.

## Author

👤 **Patrice MALDI**

* Website: http://pandit.fr
* Twitter: [@KalenasTV](https://twitter.com/KalenasTV)
* Github: [@pmaldi](https://github.com/pmaldi)
* LinkedIn: [@pmaldi](https://linkedin.com/in/pmaldi)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/pmaldi/maltAvailability/issues). 

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
# Monnbot Server

Monnbot is a trading system that captures funding rates and spreads of cryptocurrency pairs. This server layer includes Discord notifications for the top funding plays of the last hour and a cronjob to capture spread data on FTX.

## Features
- Discord notifications for the top funding plays of the last hour
- Cronjob to capture spread data on FTX
- Connects to the FTX API and provides account specific data

## Cronjob
Monnbot captures spread data on FTX using a cronjob. The cronjob is set to run every `2s` by default, but you can change the schedule in the cronjob.js file.

**Discord Notifications**

![funding_alert](https://github.com/RyanMoreau/monnbot-server/assets/3619317/4777f00b-b926-41c4-beeb-0558844d2540)

See the [dashboard](https://github.com/RyanMoreau/monnbot-dashboard) or [CLI](https://github.com/RyanMoreau/monnbot) for further information and screenshots

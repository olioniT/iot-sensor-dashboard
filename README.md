# iot-sensor-dashboard

## Required Software/Environment
The following are all that's required to run the desktop application.
- NVM v2.0.0

To check your NVM version run the following:
```
C:\...\Desktop> nvm -v
```
If it doesn't say `v2.0.0` run `nvm use 22`.

## Installation
Before beginning, open two separate terminal instances, one will act as your backend, one will be your frontend. In each terminal, navigate to each half of the project, so you should be in:

`C:\...\iot-sensor-dashboard\Frontend>`
and
`C:\...\iot-sensor-dashboard\Backend>`

In `Backend`, run the following:
```
C:\...\iot-sensor-dashboard\Backend> npm i
C:\...\iot-sensor-dashboard\Backend> npx prisma generate
C:\...\iot-sensor-dashboard\Backend> npx prisma db seed
C:\...\iot-sensor-dashboard\Backend> npm run dev
```

In `Frontend` run the following:
```
C:\...\iot-sensor-dashboard\Frontend> npm i
C:\...\iot-sensor-dashboard\Frontend> npm run start
```
After a small period your desktop application window should be open on the log in screen.
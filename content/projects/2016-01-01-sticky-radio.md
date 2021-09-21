---
title: "Sticky Radio"
description: "Sticky Radio was the result of a consultancy and prototyping work for Sveriges Radio Ressearch and Development department."
cover: '/dev/sticky-radio.jpg'
path: '/project/2016-01-sticky-radio'
tags:
- 'research'
---

![](/dev/sticky-radio.jpg)

Sticky Radio was the result of a consultancy and prototyping work for Sveriges Radio. Their R&D department was working on a "seamless experience" between the digital and analog radio broadcasting. I participated actively on the design process and developed a prototype of an app that would recognize which radio channel you were listening (something like a Shazam for Sveriges Radio) and display more information about it. It also gave an option to continue the stream from the device, transitioning seamlessly between the analog and digital.

The app was a mix of Cordova app, nodejs backend and AWS infrastructure (for audio fingerprinting). During the process I also developed this library that helps to integrate with a third party audio fingerprinting service: [https://github.com/murilopolese/acr-cloud](https://github.com/murilopolese/acr-cloud)

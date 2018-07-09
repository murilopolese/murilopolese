---
layout: post
title: "Sticky Radio"
categories: dev
excerpt: "Sticky Radio was the result of a consultancy and prototyping work for Sveriges Radio Ressearch and Development department. The goal was to explore the idea of what could be a \"seamless experience\" between digital and traditional radio broadcasting."
cover: '/assets/dev/sticky-radio.jpg'
---

![](/assets/dev/sticky-radio.jpg)

Sticky Radio was the result of a consultancy and prototyping work for Sveriges Radio. Their R&D department was working on a "seamless experience" between the digital and analog radio broadcasting. I participated actively on the design process and developed a prototype of an app that would recognize which radio channel you were listening (something like a Shazam for Sveriges Radio) and display more information about it. It also gave an option to continue the stream from the device, transitioning seamlessly between the analog and digital.

The app was a mix of Cordova app, nodejs backend and AWS infrastructure (for audio fingerprinting). Also during the process I developed this library that helps to integrate with a third party audio fingerprinting service: [https://github.com/murilopolese/acr-cloud](https://github.com/murilopolese/acr-cloud)

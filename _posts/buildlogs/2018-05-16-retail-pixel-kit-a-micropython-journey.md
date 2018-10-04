---
layout: post
title: "Retail Pixel Kit - A MicroPython Journey"
categories: buildlog
excerpt: "Retail Pixel Kit and it's a retail oriented redesign of the \"Kano 2\" Kickstarter Pixel Kit. It features the ESP32 as a replacement for the Banana Pi brains and it's a perfect MicroPython device!"
---

# What is the RPK today

RPK Stands for Retail Pixel Kit and it's a retail oriented redesign of the "Kano 2" Kickstarter Pixel Kit. It features the ESP32 as a replacement for the Banana Pi brains and the USB ports are not connected to the ESP32, they behave as a USB hub when the RPK is connected to the computer.

The only way to play with it today is through an Electron app called Kano Code App that has some onboarding, social network/profile, challenges and an IDE. While connected to the computer via usb serial or web sockets the app can stream the creations (shares or on the IDE) to the RPK. It's impossible to store programs on the RPK. The only thing you can store on the board are animations.

Although it has a series of roadblocks they are mostly software issues. The hardware and design shines. Compared with any other available "LED matrix" board, the Pixel Kit has the most powerful microprocessor with support for both wifi and bluetooth, the best battery/charger setup, it has already 7 options of buttons (5 of them on a joystick like button and 2 as independent buttons), a dial for analog input and 128 really bright RGB LEDs (I mean, really bright!). The size and format are comfortable enough and the plastics are beautiful.

This document goes through the main issues experienced and reported by users and tries to give a perspective on how to solve them.

# Problems

- Store programs on the board
- Setup without cables (enables tablet)
- GPIOs for physical computing
- Software installation on multiple platforms (Windows, MacOS, Windows and KanoOS)
- Third party integration

## Storing programs on the board

To store programs on the board there are two approaches: Either we recompile and flash again the board or we install a firmware that is able to interpret instructions inside a part of the memory that can be rewritten without having to flash the entire board again. The difference is subtle but the implications are huge.

The ESP32 compiler stack is not so straight forward to setup and that would be a significant overhead for Kano Code. Also the idea of a cloud compiler is apparently not an option, the obvious choice is to pick an interpreted language to run on the ESP32.

BASIC, Lua, JavaScript and MicroPython are the first names that come out on a quick search on the internet, being MicroPython the option with greater hardware support and community. Recently we've seen companies such as BBC (with BBC micro:bit) and Adafruit (with CircuitPython boards) embracing MicroPython as their interpreted language of choice to run on their boards.

The MicroPython for ESP32 you download from the official website works "out of the box" on the RPK only requiring to erase the flash the downloaded firmware as the website suggests.

## Setup without cables

This could be solved using a setup flow already in place with most IoT devices: Create a hotspot and serve a "settings" page and/or an api if an external interface such an app, chrome extension or website is provided.

This can be done both by running a script (to be interpreted by MicroPython firmware for example) or as a low level compiled C module. In a perfect scenario the solution would be a mix of those two: A low level compiled C module that offers bindings to be manipulated with an interpreted language of choice.

## GPIOS

The ESP32 behind the RPK has many, many available GPIOs that are not accessible. While you can hack and solder on top of the SMD circuitry it's not really inviting to do it. On the other hand there are 6 easily accessible GPIOS, power and ground soldering pads close to the bottom of the RPK. With very little soldering and courage enough to open a hole on the bottom of your RPK you can have 6 GPIOs to hack around.

## Software installation

Following the "setup without cables" topic, it's fairly simple to serve an IDE from the board so users don't really need to install anything else than a browser to be able to program their RPK. It has to be very small to fit on the board and to be fast served. It can eventually import external source files that improve the experience and we could apply a heavy caching strategy so most of the work happens on the browser/client side.

The issue is that the feature that would enable this easily is implemented on a module named "webrepl" that is unavailable for the ESP32 "vanilla" firmware. The "webrepl" basically clones the serial REPL over WebSockets. Other options such as a file uploader or script evaluation could be a replacement for "webrepl".

## Third party integration

MicroPython is great and there are already IDEs and tools out there to connect, browse and send files, execute code and etc. By just installing the "vanilla" MicroPython on the RPK it's already possible to use [uPyCraft](https://github.com/DFRobot/uPyCraft), [uPiCraft](https://dfrobot.gitbooks.io/upycraft/content/), [ampy](https://github.com/adafruit/ampy) and even bare terminal using the ["screen" software](https://www.wikiwand.com/en/GNU_Screen).

# First steps

## Storing programs on the board

To begin thinking about solutions I started with "Storing programs on the board". This wasn't really a problem: Downloading the official MicroPython firmware for ESP32 and flashing it was as easy as it could be. Nothing custom or special had to be done. After a few days I had a PixelKit module in MicroPython that allowed drawing on LEDs, interacting with buttons, dial and network. As I have access to a few repositories from the electronic team, I could find all the PIN numbers by reading the code for the original firmware, which I am not sure why isn't open sourced...

All done through via MicroPython's REPL over USB serial, I used Atom for writing the module and through a quite boring but effective method of copy/paste/execute on terminal I was able to develop, test and run code on the board. I sent the files to the board using Adafruit's tool ampy.

I was able to develop a series of games, animations, drawing applications and a new menu all in MicroPython through this process. They used not only the buttons but the dial that, which by the way, was a much better way to control the pads on pong than the otherwise clumsy joystick. All this was running on the board so once uploaded I could "cut the wire" with the computer and play with the Pixel Kit (including using the buttons and dial) wherever I go.

While the process of developing, testing, running and saving code on the board was not so good, the problem of "storing programs on the board" was solved.

## Setup without a cable and Software installation

As soon as MicroPython was up and running and connected to wifi I started to write small HTTP and WebSocket servers to host interfaces to interact with the board. Since my C proficiency is not the best I went to a all MicroPython solution.

The MicroPython for ESP32 firmware won't include a "webREPL" module, mostly due to the `dupterm` method on the `uos` module not being available, a remote REPL to interact with the interpreter via WebSocket was not so simple. I did a few attempts to implement it but due to lack of C and FreeRTOS knowledge I failed. Although my attempt failed I can confirm it's possible to do it since there are out there other firmwares with REPL over wifi using Telnet (loboris firmware to quote one).

Although the "webREPL" wasn't available I managed to host a WebSocket server that would "eval" python code but that wasn't a good solution because, well, "eval" is evil. I managed to make with success a wifi setup and a live drawing applications that would host html interfaces to interact with the board.

Even this is a really important feature, I wasn't so excited to develop this kind of code since I have no real passion about it and I am doing all this on my spare time... I quickly switched my efforts when I understood it's so easy that even I, who am not really interested, could do it. In the hands of the properly motivated and proficient developer this would be a no brainer.

## GPIOs

I have a personal love for GPIOs. I believe they are powerful portals between the world of bits and atoms. It's through GPIOs that I can express myself creatively the most fun and pure way. Being able to interact with all sorts of electronic, mechanical entities and the world in general is what makes me feel creativity is my only constraint. I can connect the Pixel Kit with previous knowledge, passion and dreams beyond turning LEDs on.

The ESP32 is extremely rich in GPIOs, having a list of different families of pins enabling a range of protocols, analog and digital write and read, pulse width modulation and even capacitive sensing! All this is there but not available to use. I could either hack the surface soldered components but I got the brilliant suggestion from Ricardo, who has been not only helping but advising and incentivising me on this quest, to use the headers used for flashing and debugging firmware on the board. This pins are conveniently very close to the bottom of the case and have a nice pad to solder on top.

Once I got enough courage I drilled a hole on the case of my Pixel Kit enough to fit 2 rows of 4 female pins and soldered them on the pins. I left 2 unused female pins for future uses. Again with help of Ricardo I managed to find out what were those pins numbers and in the same day I had an extra, and useless, extra LED connected to the GPIOs. Once that LED was blinking I got a feeling hard to describe, for the first time I was able to feel I could express myself creatively through the Pixel Kit.

Followed by the useless blinking LED, which could be replaced now by an IR LED to control a TV, I plugged a buzzer on the GPIOs and guess what? There was music! Not only blips and blops but a looper, a generative music program and even a 16 step sequencer. The interface? That beautiful RGB LED matrix is just what I needed. I was also able to add sound effects to previous creations and it's hard to hide how excited I got when I thought about the magic word: Motors.

## Third Party Integration

With MicroPython running and all the wonders it brought to me I started thinking what doors this could open for the MicroPython community, that is clearly the fastest growing one when it comes to interpreted languages on microprocessors.

All "MicroPython" IDEs and editors worked out of the box. Tools such as ampy are not only compatible but were my initial choice of development.

At this point I don't think this is a problem anymore and I went on another track: Could I create my own IDE for MicroPython? The answer is, yes! And I believe I created myself one of the best tools for my use of MicroPython, not only for Pixel Kit but also for other ESP8266 projects!

# Conclusion

As mentioned before, the hardware present on the Pixel Kit is brilliant. With the exception of access to the GPIO, it's both a great platform to give the first steps coding and a hacker dream. Most of the roadblocks were software related and MicroPython seems to cover many, if not all, of them.

The major source of complications in my opinion would be the transition from a stream based, javascript, Kano Code experience to a solution where the code runs on the board, using python and using something else than Kano Code. We could make Kano Code output Python but Kano Code is already a wild piece of software as it is, I wouldn't suggest adding yet another feature to it without proper planning and solving the current issues.

Once the firmware on the Pixel Kit is replaced to run MicroPython, which can be done with an existing third party or branded solution, there is still the coding experience to be solved. One solution would be to create a Kano MicroPython IDE that would have one clear and simple job: Program devices running MicroPython. Pixel Kit to start with but nothing would stop to program an Adafruit board, a BBC:microbit or a Camera Kit.

Another solution would point towards a Pixel Kit 2.0, which would feature from beginning all the solutions, including a self hosted IDE.

All those solutions are still subject to further investigation but the current results hints a bright future ahead for Pixel Kit.

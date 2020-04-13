---
title: "WebREPL on ESP32"
excerpt: "If the WebREPL just worked for the ESP32… Oh, well... Now it works!"
---

I’m currently trying to think and develop a MicroPython experience for learning and hobby development. It’s mostly created on top of the WebREPL feature with the ESP8266 as the low end target board but it should work on the ESP32 as well.

While the ESP8266 comes with WebREPL from the beginning, my attempts to use it on ESP32 failed. I was able to find more or less why (the error happened trying to call the `os.dupterm`) but couldn’t even imagine a solution.

For the ESP8266 I used and still use [Flying Circus Web](http://flying-circus-web.herokuapp.com) for programming after an initial setup over Serial USB. Since I don’t know how to host a web server and keep the repl free for use with the WebREPL, this is the final setup for the ESP8266.

For the ESP32 I never did anything without cable because the board I’m using is the Kano Pixel Kit and it’s common that the Pixel Kit is near and usually connected to the computer.

Recently I found out about the support for threading on ESP32 and that it could host a web server without holding the repl! I immediately hosted a page that could evaluate Python on the board over WebSockets. Although it really worked and I fell in love with Mozilla’s IoT Webthings framework, it was not “the same” as using the WebREPL.

If the WebREPL just worked for the ESP32…

Oh, well... Now it works! And it’s as awesome as it sounds. I’m very excited about it and so far the only problem I encountered is that entering, evaluating code and leaving “raw repl” mode has to be done with some interval between.

I assume it’s because the network is handled by a dedicated core on the processor and evaluating Python is handled by the other. But that is just a very long shot. I’m pasting line by line and giving 50 milliseconds between each, which definitely slows down code execution but it is very reliable.

And there is [this javascript library](https://github.com/murilopolese/webrepl-client) I wrote to help with the WebREPL protocol using javascript.

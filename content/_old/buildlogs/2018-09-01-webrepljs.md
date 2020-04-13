---
title: "Webrepl.js"
excerpt: "Javascript library to interact with MicroPython WebREPL"
---

While not a build log, I want to talk about this because many of the future build logs might use it and even extend it. The first time I found out I could run interpreted languages on a microprocessor, I thought it would be much easier to use them in a “learning” environment than the current C++ and would give a much richer experience than the visual programming paradigms.

But it would also provide me a much more interactive way to experiment with the boards than compiling every time I want try things. Quick responses and trial and error is an approach I really like to take when I’m learning about something. At that time I wanted to do something with temperature, light, plants and I found that the Particle/Spark I had was a bit pricey to buy in quantity, dip in dirt or put too close to a big water source.

The lower entry point at that time was to run LUA on an ESP8266. I went on DXtreme and bought myself 3 modules of the NodeMCU prototyping board.

![](/buildlogs/nodemcu_yellow.jpg)

As expected, it took 2+ months to arrive and when it arrived I was already into something else so it took me a little while to actually turn them on for the first time. When I did I was already thinking about flashing MicroPython on the board because I thought Python would be much more useful to learn than LUA. But the more I read about MicroPython the less I bothered with trying more than the blinky example in LUA. And the main reason for that was this feature called: WebREPL.

This blew my mind, I was trying to figure out how to run interpreted languages on MicroProcessors over **SERIAL USB** and now I just found out I can do that over **WebSockets**. WOW!

![](/buildlogs/mindblown.gif)

So the way I tested if for the first time was beautiful. After flashing with the esptool, which was fairly simple, the firmware at that time came with WebREPL activated by default so once I connected on wifi (the first things I did, even before blinky), I went to this wonderful, wonderful website: [http://micropython.org/webrepl/](http://micropython.org/webrepl/).

Seriously I have emotional connection with this page. It blew my mind so hard. I like it no matter what. Everything I did after this date would include somehow using WebREPL. Talk about big fan here.

It solved not only one of the problems I wanted to solve but it pushed the limits on how easy can it be. To the extent I could imagine now how to create learning or building experiences not only with a interpreted language to facilitate exploration and sandboxing but wireless even if there is no internet or router around: the board can host its own access point network!

It’s hard to believe this in this part of the world but no wireless networks or internet is a reality on many, MANY other places to not say everywhere else. But have I mentioned you only need a browser to do it? Yes, no additional setup or chrome extension, no install. You are correct, that also mean you can do it on your tablet. Seriously: Transfer python files through to an “arduino” with your browser and only your browser.

![](/buildlogs/mindblown.gif)

## Fabulous Drawing Machine

I used it a lot on one of my first project with the ESP8266: The fabulous drawing machine [https://github.com/murilopolese/fabulous-machine](https://github.com/murilopolese/fabulous-machine)

Then I made a website so [Bee](https://beegrandinetti.com) could draw me things while she was away for a long time. I know, awn… The website believe or not uses Backbone.js and it still works: [https://fabulous-machines.herokuapp.com/](https://fabulous-machines.herokuapp.com/)

You can check in the code how I basically copied and pasted, with tiny adjustments, the source code for the official webrepl link:

- [https://github.com/micropython/webrepl](https://github.com/micropython/webrepl)
- [https://github.com/murilopolese/fabulous-machine-website](https://github.com/murilopolese/fabulous-machine-website)

Notice that I kept the website separated from the actual python code as a way to enforce that the firmware is something and you can create many websites to send drawings to the machine itself, all through webrepl. I planned to make a TSP art, a photo rastering and rendering sites or even use Processing, whatever. The thing for me was always the webrepl.

- [https://www.instagram.com/p/BQyesuHBPCb/?taken-by=murilopolese](https://www.instagram.com/p/BQyesuHBPCb/?taken-by=murilopolese)
- [https://www.instagram.com/p/BRDkaZShjFL/?taken-by=murilopolese](https://www.instagram.com/p/BRDkaZShjFL/?taken-by=murilopolese)
- [https://www.instagram.com/p/BRmUW-7haPG/?taken-by=murilopolese](https://www.instagram.com/p/BRmUW-7haPG/?taken-by=murilopolese)

I actually even tried with different motors and physical structures:

- [https://www.instagram.com/p/BSM01cfh8Tg/?taken-by=murilopolese](https://www.instagram.com/p/BSM01cfh8Tg/?taken-by=murilopolese)
- [https://www.instagram.com/p/BQRR1pwgcBs/?taken-by=murilopolese](https://www.instagram.com/p/BQRR1pwgcBs/?taken-by=murilopolese)

There were several attempts of making some sort of reusable webrepl library, class or whatever so I could use in the many websites I want to build (LOL). The first attempt was really a Polymer component! I had just joined Kano and they used Polymer quite heavily there, I wanted to practice!

I keep most of my “drafts” and very early experiments on Bitbucket as I believe they are much cooler than Github for offering private repositories for free. But I also understand Github, whatever, this is the link for the `<fabulous-webrepl>`: [https://bitbucket.org/murilopolese/fabulous-webrepl/src/master/](https://bitbucket.org/murilopolese/fabulous-webrepl/src/master/)

It didn’t take long to find out doing it as a Polymer component was a mistake.

## OFFLINE

There were things I mentioned with more excitement than experience, some were more theory than something I had actually tried. Before I went further on nailing all the infinite different things I could draw with the machines I wanted to give a try on a few other exciting things you could do: 100% offline experience.

Everything was pretty much solved until one bit: You either need to have internet connection to access [http://micropython.org/webrepl/](http://micropython.org/webrepl/) or you must have accessed it and saved it somehow to your computer. Fair enough. But I was really tempted to host the webrepl page on the board because I had plenty flash storage available and an ip address… How hard could it be?

Well, very hard. First because I didn’t find a way to run a web server process and keep the repl available. I eventually managed to create a web server that would deliver the page once and then release the REPL but I found the experience a bit clumsy so I abandoned this approach.

After many failed trials I realised the main reason I was failing so hard could be because I didn’t know much about Python and my code was basically Javascript transated into Python and that was **NO GOOD**. So I decided to trust it’s possible to do it and I’m just not proficient enough. One thing I did learn: The http responses are slower than I expected and there is a limit of how much data you can buffer to dispatch to the socket. I needed to compact the webrepl page to the extreme, and put it on a single file.

It comes then the point of this story I feel like I’m betraying [http://micropython.org/webrepl/](http://micropython.org/webrepl/). Although it does everything a hacker can wish for, I started to get tired of writing my software on a text editor, copying it, going to the webrepl page, entering paste mode, pasting and executing. Sometimes the code would be too big and it wouldn’t work. I had to upload and reset the board every time. I wished the webrepl to have a text editor and a play button! I didn’t find so I start building it. How hard can it be?

In the beginning I was trying to make it ultra minimal so it would be faster to deliver by the ESP8266. At that time I made something using choo [https://github.com/choojs/choo](https://github.com/choojs/choo) which just met my criteria of framework: No fancy, small. My first attempt was with this interface:

![](/buildlogs/image1.png)

You can check the code at: [https://bitbucket.org/murilopolese/micropython-host/src/master/](https://bitbucket.org/murilopolese/micropython-host/src/master/)

## The Library

At this point I also found out that the javascript code for the webrepl page was not really reusable, and that is ok. It does the job and it does very well! But now I wanted to build something else and had to revisit that code to make it usable elsewhere.

I dropped that minimalistic idea as I figured out that it would be actually really hard to host a page and keep the REPL free on the ESP8266. With the ESP32, there are threads and you can host the interface and keep the repl free but there is no webrepl :(

Update: [Now there is!](http://murilopolese.com/buildlog/2018-09-webrepl-on-esp32.html) :)

Then I went for my second attempt: trying to really copy the Processing IDE design. I think it’s great UI and I know it works. That is when I started thinking about Flying Circus [http://flying-circus-ide.herokuapp.com/](http://flying-circus-ide.herokuapp.com/), but that is another build log on its own. The thing is, I really took the time and made a definitive (laughs) webrepl javascript library to use! It’s called the `webrepl-client` and it really works!! [https://github.com/murilopolese/webrepl-client](https://github.com/murilopolese/webrepl-client)

It’s structure is pretty simple and it could easily be copied and pasted into a html file for a quick prototype or hobby project. It features all the things the original WebREPL page would do as evaluate code, download, upload files and get MicroPython's REPL output. But it also contains helpers to enter and exit “raw repl” mode, remove files and a method to evaluate a long string containing python code. Much can, should and will be improved but before nailing it down, I think I will give some time to learn more about the WebREPL on the ESP32.

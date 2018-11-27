---
layout: post
title: "Fabulous remote control"
categories: buildlog
excerpt: "Revisiting one of my favourite childhood game but as a grown up kid."
---

I believe it started when I remembered one of my favourite child games and got really sad feeling I was forgetting one really important and dear memory. The game was simple enough that could be replicated in most of places with very flexible rules and materials: A bottle lid race. You have to flick the lid all the way through a course avoiding landing outside the track and without flipping the lid. If any of those things happen, you pass turn and you return your lid to the previous place. If playing with other people we usually would give 3 flicks per turn. If playing solo, you could just practice a jump, try records or other crazy thing you might want to do.

This was a fantastic game and kept me entertained for my whole childhood until one event happened in my life: Video games. I have no strong memories of playing this game after video games. The cartridge? Rock’n’roll Racing. I guess video game gave me all the rewards the bottle lids plus required less space and didn’t need to clean the mess (plus Black Sabbath soundtrack).

I decided to see if the game is still fun and made a track, got some plastic bottle lids and went for a ride. Yes, still great! Freaking great actually. Specially this idea came in mind: This was really cool, but now I also know how to make stuff with way more advanced tools and materials than what is just laying around.

In a few hours I had the first glimpse of what would become my new hobby, apparently.

[https://www.youtube.com/watch?v=wHZdDi59iDs](https://www.youtube.com/watch?v=wHZdDi59iDs)

This is an ESP8266, 2 big continuous servo motors and a 3.7V battery inside a cardboard box. I also put a pin on the back to help the balance and movement.

I had completely forgot about remote controls for some time. Even with Quirkbot or Strawbees the main thing was to make a creature/construction that would be somehow autonomous. Then there was this obvious moment when I remembered how cool is to remote control something.

Technically speaking the first setup wasn’t so different from what I use today: A WebSocket server on the board and a web page split in 4 areas with different colors, each one sending a different message through a websocket connection with the board.

![Remote control interface](https://i.imgur.com/7m4Y3vi.png)

The first versions were developed with the [ESP8266 core for Arduino](https://github.com/esp8266/Arduino) to program the ESP8266.

It would get a nice custom domain using mDNS (something like http://fabulous-car.local), host the webpage for the remote control, start a websocket server and parse the incoming websocket messages to call methods that controlled the motors. The only “problem” was having to reflash the board when wifi changed.

A few days after building the first one, I made a second one only changing the motors and the housing.

- [https://www.youtube.com/watch?v=YUY0712q7UU](https://www.youtube.com/watch?v=YUY0712q7UU)
- [https://www.youtube.com/watch?v=YhmTvO1K7pw](https://www.youtube.com/watch?v=YhmTvO1K7pw)
- [https://www.youtube.com/watch?v=JVZBXbz1MTU](https://www.youtube.com/watch?v=JVZBXbz1MTU)

Figuring out how much fun that was, I flashed a second board and build a second car (using the big servos instead of the small ones).

[https://www.youtube.com/watch?v=OYkAw4DRREA](https://www.youtube.com/watch?v=OYkAw4DRREA)

After a long weekend of playing I was amazed by the response time over websocket, the battery life took a few DAYS to run out and the proportion, weight, size and friction was just great, especially after we give some love to the wheels.

At this point I had to test it with other people to make sure me and [Bee](https://beegrandinetti.com/) were not going totally nuts. Plus we wanted to make real nice cars so she invited some friends over to build cool cars and race. The result was awesome:

- [https://www.instagram.com/p/BWm58wzBbTN/](https://www.instagram.com/p/BWm58wzBbTN/)
- [https://www.youtube.com/watch?v=1xfpP4DiD-k](https://www.youtube.com/watch?v=1xfpP4DiD-k)
- [https://www.youtube.com/watch?v=_K0wJcru81c](https://www.youtube.com/watch?v=_K0wJcru81c)

I kept the green one for longer and even build some new, mode advanced tracks:

- [https://www.youtube.com/watch?v=8NV_yfLuNQ0](https://www.youtube.com/watch?v=8NV_yfLuNQ0)
- [https://www.youtube.com/watch?v=BAb8MPA5VQ4](https://www.youtube.com/watch?v=BAb8MPA5VQ4)

You can check the code I used for all those cars [here](https://gist.github.com/murilopolese/67c657863a14641df26abe670cb0da29#file-fabulous-car-continuous-servo-ino)

I believe that was when I started to think about reproducing it for a workshop, for example. To make 5 cars I would need 10 continuous servo and they are surprisingly more expensive than the regular 180 degrees hobby servos. Battery and board were already taking most of my “10 moneys” target budget. Turning regular servos into continuous was a bit clumsy and generated very unreliable motors. None of the cars using converted servos were great and I didn’t feel a beginner would be able to do it easily (or without trash the motor and end the fun).

DC motors on the other hand are way more available and dead cheap (when not for free if you find on trash). But also require a driver, a gearbox to strengthen the movement and eventually more calibration than the servos to have a car walking on a straight line. Because of that I decided to try a different design using only one DC for pushing the car and a regular hobby servo for steering it. The mechanism is far more complex but not impossible to make with simple materials as you can see in this design using only popsicles, paper clips, rubber band and because I wanted to try out, 3D printed wheels.

- [https://www.youtube.com/watch?v=orERmnNw00w](https://www.youtube.com/watch?v=orERmnNw00w)
- [https://www.youtube.com/watch?v=y9BPpDNsV-4](https://www.youtube.com/watch?v=y9BPpDNsV-4)

I repurposed the DC motors from my previous adventure: A steering mechanism for a spider bot. Also added a driver to be able to reverse the movement.

- [https://www.youtube.com/watch?v=PIT5GvHz98g](https://www.youtube.com/watch?v=PIT5GvHz98g)
- [https://www.youtube.com/watch?v=gyuaZGs3uz0](https://www.youtube.com/watch?v=gyuaZGs3uz0)

I had to make [a few adjustments on the code](https://gist.github.com/murilopolese/67c657863a14641df26abe670cb0da29#file-fabulous-car-dc-motor-and-servo-ino) and on the interface. The changes were mostly changing the “backward” and “forward” messages of one motor to “left” and “right”. Also, switched servo PWM to digital pins toggling.

Using the exact same interface to steer was a bit of a challenge but not a big deal. Learning how to use a remote control that is not 100% intuitive does triggers a weird kind of satisfaction!

This design was far the nicest one to drive but it wouldn’t climb as well as the others. Smooth and stable, steering it was real fun because I could keep a constant forward speed as opposed to having to stop one wheel to make a curve.

But even using the same components and exactly the same design the cars were very different. Racing two of them was nice but felt quite unfair! Instead, a tag game was much more interesting as the slower one was able to get more movement precision and hide between chair legs, which was much harder to get in for the speedy one.

This is still my favourite design and driving experience but when showing to people it looked very complicated to build and most of them didn’t believe they could reverse engineer it. I decided to try a simpler design with the same components and came up with those Strawbees based ones:

- [https://www.youtube.com/watch?v=nA4M4s0oigs](https://www.youtube.com/watch?v=nA4M4s0oigs)
- [https://www.youtube.com/watch?v=KdB3SY64FcU](https://www.youtube.com/watch?v=KdB3SY64FcU)
- [https://www.youtube.com/watch?v=AfM0Fl08czc](https://www.youtube.com/watch?v=AfM0Fl08czc)

As my adventures with MicroPython WebREPL advanced, I am on the process to switch the custom Arduino code to MicroPython. The main problem so far is that the board isn’t able to host the remote control so I need to figure out how a solution for that. Response time is pretty good but I noticed the experience being way less reliable and battery time being not so good.

I made a few builds and wrote the code but haven’t finished yet.

[https://www.instagram.com/p/BnkPhrCHgg4/](https://www.instagram.com/p/BnkPhrCHgg4/)

The code is split in a [`boot.py`](https://gist.github.com/murilopolese/67c657863a14641df26abe670cb0da29#file-py_boot-py) responsible by wifi connection, [`main.py`](https://gist.github.com/murilopolese/67c657863a14641df26abe670cb0da29#file-py_main-py) that declare the methods to control the motors and a [`remote.html`](https://gist.github.com/murilopolese/67c657863a14641df26abe670cb0da29#file-py_remote-html) that connects to the board using the [WebREPL Client](https://github.com/murilopolese/webrepl-client).

The main reason I wanted to switch to MicroPython, apart from my personal love for it, is so people could understand, tweak, extend and update the source code that is much simpler in Python than in C++.

Unfortunately even it’s working and “fixed the problem” of having to flash the board every time the wifi network changes, I believe the WebREPL approach is not very suitable for remote control projects. Next run I might use a [wifi setup library for ESP8266](https://github.com/tzapu/WiFiManager), captive portal and enable OTA updates instead of WebREPL to “fix this problem”. Time will tell.

I also wanted to add a “replay” feature where people could record a set of remote control interactions (forward, left, left, backward, right, etc) and “play” them once or in a loop, eventually even create a new button for that set of commands (see where this is going?). I’m sure it’s possible to do it in C++ but if I had to choose I’d rather do it in Python.

The actual next step is to try running a few workshops and think about interactive or remote controlled props for the tracks, add an extra motor on the designs to fire a rubber band, lift or just be able to poke stuff.

In the end, I believe that using remote controls is a great introduction to STEAM. Not so much in the sense of how the firmware is written or how the information is flowing, although I believe this is a possible next step, but it’s a great opportunity to think about the mechanisms on the cars, material properties, interactive design process, motor skills (pun not intended) etc.

Down the road of playing, it might be natural to ask “when do you think it’s time to curve in this particular part of the track?”, “is there a reference point you are using to help you?”, “how could we make it curve automatically?”, “do you think it’s possible to record your movements to replay it?”, “how could we make a bot to race against?”, etc.

---
title: "Fabulous remote control"
cover: '/buildlogs/rccars.jpg'
excerpt: "Revisiting one of my favourite childhood game but as a grown up kid."
---

I used to love flicking games when I was a child and there was something about making the tracks, easy access to material and the playfulness of it all that stuck with me. In fact I still like flicking games! At a certain point it felt natural for me to start using the new abundant material around: Technology!

In a few hours I had the first glimpse of what would become my new hobby, apparently.

<iframe width="890" height="500" src="https://www.youtube-nocookie.com/embed/wHZdDi59iDs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This is an ESP8266, 2 big continuous servo motors and a 3.7V battery inside a cardboard box. Technically speaking the first setup wasn’t so different from what I use today: A WebSocket server on the board and a web page split in 4 areas with different colors, each one sending a different message through a websocket connection with the board.

![Remote control interface](/remotecontrol.png)

A few days after building the first one, I made a second one only changing the motors and the housing.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/YUY0712q7UU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/YhmTvO1K7pw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/JVZBXbz1MTU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Figuring out how much fun that was, I flashed a second board and build a second car (using the big servos instead of the small ones).

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/OYkAw4DRREA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

At this point I wanted to test it with other people to make sure me and [Bee](https://beegrandinetti.com/) and we invited some friends over to build cool cars and race.

![](/buildlogs/rccars.jpg)

[https://www.instagram.com/p/BWm58wzBbTN/](https://www.instagram.com/p/BWm58wzBbTN/)

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/_K0wJcru81c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I kept the green one for longer and even build some new, mode advanced tracks:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/BAb8MPA5VQ4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8NV_yfLuNQ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/BAb8MPA5VQ4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You can check the code I used for all those cars [here](https://gist.github.com/murilopolese/67c657863a14641df26abe670cb0da29#file-fabulous-car-continuous-servo-ino).

When I looked at prices it was kind of shocking to see how expensive those continuous servos are so I repurposed many regular servo motors but the result was not reliable enough. With pretty much the [same code](https://gist.github.com/murilopolese/67c657863a14641df26abe670cb0da29#file-fabulous-car-dc-motor-and-servo-ino) I also built versions with a DC motor and a regular servo.

<iframe width="560" height="315" src="https://www.youtube.com/embed/orERmnNw00w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/y9BPpDNsV-4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/nA4M4s0oigs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/KdB3SY64FcU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AfM0Fl08czc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

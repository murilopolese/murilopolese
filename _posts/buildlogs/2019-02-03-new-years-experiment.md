---
layout: post
title: "New Year's Experiment"
categories: buildlog
excerpt: "Using a 3D printer to print frames of a stop motion animation."
---

![New Year's Experiment](https://static1.squarespace.com/static/55c63ae6e4b06ae6eeb73710/t/5c4f23456d2a73c5a05b007b/1548690416364/newyears.gif?format=1000w)

2018 wasn’t a great year of collaborations between me and [Bee](http://www.beegrandinetti.com/) so we decided to fix that in 2019 by starting the year doing something together.

I have been very, very into drawing machines and digital fabrication the past 4 years. During all this time my focus was try building machines made out of widely available materials such as plastic, cardboard, tape, strings, etc. While it gets me a special type of satisfaction to build from scratch using very simple materials, reliability and precision were not the strength of those builds.

Perhaps the most complicated step on the process is to encode a drawing to machine language (compiling) that requires a lot of math, thinking, tweaking, calibration and ends up taking a lot of time and no drawing along the way.

Since I spent so much time on the building and encoding steps I had very little experience actually drawing a lot of things. That made me feel I had to fill that gap somehow. I have a cheap yet reliable 3D printer at home so why not stick a pen on it and start drawing?

To my surprise that was way easier than I expected! After 3 iterations and a few video tutorials later I had a very satisfactory process and an actual amazing result.

On the hardware side what I did was to put an old SD card between the Z axis end stop and the axis itself so when setting the motors to “home” it would think it’s a few centimeters above the bed. The pen would be stuck on the nozzle carriage by rubber bands, applying very little pressure, just enough to not fall and to come back to its original position if pressed against the bed.

Software side was a tiny bit more complicated still very simple. It’s just a lot of steps I didn’t bother to automate.

First I converted an SVG to STL on Tinkercad because I was too lazy to actually do it myself using one of the plenty available resources to do it. 
Then I would set the height of that STL to `0.1mm` and import it to Cura. I created a profile on Cura that mainly slowed down the printing speeds, set the layer height to `0.1mm` and nozzle size to whatever the size of my pen tip was. 
I also removed all the GCODE that would “home” the axis automatically so it would start printing from whatever the nozzle was.
I had to manually remove a line of GCODE that would set the nozzle temperature because I couldn’t figure out how to do it through Cura. That had to be done every time.
Additionally I tweaked the Z axis movement on the very beginning of the drawing but that was more a nice touch than a requirement.

With the GCODE ready, I uploaded it to [Octopi](https://octoprint.org/download/) and positioned the nozzle carriage in a way the tip of the pen would match either the bed’s or the paper “origin”.

To calibrate the pen pressure on the paper I would set the X and Y axis to their “home” and do the Z axis with the SD card with the pen stuck on the nozzle carriage but not touching the bed. Once the Z axis was at “home” position, with a draft paper on top of the bed I would slide the pen down until it applied just the right amount of pressure needed to the pen I picked. If too little it would draw, if too much it would drag and wobble. Both failures actually generate very interesting aesthetic results.

After calibrated the pen pressure I would raise the Z axis a few millimeters, remove the draft, put the final paper if it wasn’t there already and send the GCODE to print!

The results were actually fantastic: [https://www.instagram.com/p/Br3rruJjB6-/](https://www.instagram.com/p/Br3rruJjB6-/)

When Bee saw that, she got so excited! I was so happy that we set to do something together with that technique. We had this idea to make a new years card to send to some of our friends but each card would be a frame of a stop motion animation we would make with the prints.

She made a drawing test on Adobe Illustrator and we started to tinker around how to export the SVG. Tinkercad wouldn’t create a STL out of any SVG so we went back and forth trying different ways to do it. To be honest, I am not sure what has to be done as Adobe terrain is a bit out of my open source realm. She managed to squeeze a good SVG out of it, though.

We tried many pens, different papers, colors, pen pressure, slicing configurations, printing speed, real fun and mesmerizing exploration process. Finally we set to try white and golden Posca pens on blue and black thick paper.

She made an animation on Adobe After Effects but it didn’t export the frames to vectors so she had to export 24 bitmaps, raster them on Illustrator and then export to SVG. Quite a ride since line thickness and edges got all sort of distortions from the raster. That is probably the part of the process that took more time to master and it’s still not 100%.

On some drawings the slicing left some lines behind. On some of those cases I fiddled with the slicing parameters but a few frames had to be finished by hand with a ruler. I joked we were faking it but actually it was a fair compromise. Next time I hope we won’t need it!

Once the frames were ready in SVG we started with white on blue. We thought the golden on black would be the nicest result and we wanted to have a chance to fail printing. It ended up that the white on blue looked nicer and we never printed the frames on black paper. I guess white on black would be great as well.

Printing was a lot of fun! One of us would create and adjust the GCODE and control the printer on Octopi while the other would lay down the paper, guide where the nozzle carriage should be and calibrate the Z axis and pen pressure. I could honestly have automated that but it was so fun to do it together that I didn’t want technology to be on the way of such a pleasing human to human and human to machine interaction.

I personally felt like what we were doing was closer to woodblock printing than using an inkjet printer. That was the feeling I wanted anyway with my drawing machines: To be an extension of my skills, interest and abilities, not a replacement.

After printing the 24 frames, which took about 6 hours spread on 2 or 3 days, Bee did her magic with photos, colors, corrections and made the stop motion animation. Not enough she made a soundtrack and added “behind the scenes” footage. So much talent!

[https://vimeo.com/channels/staffpicks/313494443](https://vimeo.com/channels/staffpicks/313494443)

She posted it on Vimeo and for our surprise it got staff picked: The artsy interwebz podium! It’s kind of fun to be so happy about being validated when this was more of a play session and gift for our friends but it’s undeniable how nice it was! Such an awesome result for this first project of 2019.

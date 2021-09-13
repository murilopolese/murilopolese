---
title: "Color Code!"
cover: "/color_code.png"
description: "Color Code is a cellular automaton and visual programming language without words or symbols, just colors!"
path: "/blog/2020-11-color-code"
---

[![Color Code](./color_code_screenshot.png)](http://colorcode.bananabanana.me)

A few months ago I found [this article](https://www.microsoft.com/en-us/research/publication/tilecode-creation-of-video-games-on-gaming-handhelds/) from Microsoft research and since I put my eyes on it I couldn't stop thinking about the subject.

> We present TileCode, a video game creation environment that runs on battery-powered microcontroller-based gaming handhelds.

> We demonstrate that a variety of popular video games can be programmed with TileCode using 10-15 visual rules and compare/contrast with block-based versions of the same games implemented using MakeCode Arcade.

I find this idea fantastic: Program a computer by giving both the rules and the initial grid configuration of a cellular automata.

The only issue with TileCode for me is that I would love to have an interface for such programming to not rely on having "so many pixels". One that I could run on an LED matrix, on my MIDI controller or 7 segment display, why not?

At this point I'm also remembering the experiments I made with random cellular automata rules in [EXPLOR](https://github.com/murilopolese/RTP_SFPC_SUMMER20/tree/master/openframeworks/EXPLOR):

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/I9418531UNo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

MINI-EXPLOR was really eye opening for me:

- [MINI-EXPLOR: a FORTRAN-coded version of the EXPLOR language for mini (and larger) computers](https://dl.acm.org/doi/10.1145/988049.988052)
- [A report on the use of FORTRAN-coded EXPLOR for the teaching of computer graphics and computer art](https://dl.acm.org/doi/10.1145/942576.807020)

This was the first time I pictured the dimension and versatility that is possible to achieve by just poking on the rules and initial configuration. Including the ability to implement this other cellular automaton called WireWorld that I also played with:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HY_w05ehNi0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

WireWorld is capable of very complex computation. The best resource I have found was [http://wireworld.co/][http://wireworld.co/]. There is also a competition of who can [build a clock with WireWorld](https://codegolf.stackexchange.com/questions/88799/build-a-digital-clock-in-wireworld) that entertained me for a few weeks.

I spent some time fiddling with an interface that would be comfortable to play with such ideas and I built something like a interactive animated pixel doodler that I call Color Code:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/5M5hy9xsqKc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You can play with Color Code and the examples at http://colorcode.bananabanana.me

Color Code is an experiment and a challenge for me, I hope it can be a tool one day. But before that, this is probably my first attempt to answer a few questions:

- What is the minimal amount of buttons that you need to program a computer?
- What kind of programs can be easily or naturally created using this interface?
- Can you do something interesting with it?

My answers are so far are: 7, interactive animations and yes!

Below is almost a video transcript:

## 1. Puzzle mindset

> A puzzle is a game, problem, or toy that tests a person's ingenuity or knowledge. In a puzzle, the solver is expected to put pieces together in a logical way, in order to arrive at the correct or fun solution of the puzzle.
https://en.wikipedia.org/wiki/Puzzle

Color Code focus on people's ingenuity as a creative source. There are very few textbooks or people telling you what you can't do with it. It's quite the opposite, it's been proven many times that the whole idea behind it is very capable.

It also focus on arriving to a fun solution rather than a correct solution. The only correct solution is if it's doing what you are expecting it to do. If it's not, you haven't solved the puzzle yet.

## 2. Drawing tool

Color Code is a simulation of a handheld game console much like a gameboy or a tetris mini game toy.

Its screen is 16 pixels wide and 16 pixels tall, it has 7 buttons, 4 of which are directional buttons for up, right, down and left and the other three buttons are action buttons named as you wish: A-B-C, 1-2-3, You-And-Me, e-t-c... I will call them "a", "b" and "c" buttons.

With the directional buttons you move the blinking pixel that we call the cursor. With the "a" button you stamp the cursor color on the screen. With the "b" button you erase the color under the cursor. The "c" button will hide the cursor and then show it if you press again. The "c" button is much more than that but we'll talk about it later.

You can erase the screen "frame".

If you simply move the cursor out of the screen you'll switch to the code editor. To go back to the other screen you walk out the screen again. This will work in any direction and there are only 2 screens.

The code screen is split in sections. The important for drawing are the two lines of color palette. If you move the cursor to a color and press "a" the cursor change its color. There are 16 colors for drawing counting the color the screen gets when you erase it (black).

If you don't feel like inventing a character or making a composition yourself, you can always rely on recreating your favourite pixel art. There are vast galleries of pixel art out there for you to find a style you like or get inspired while you try to replicate things you find nice. There is nothing wrong with recreating, just don't take the credit you don't think you deserve.

## 3. Animation tool
Once you have a drawing you might as well imagine how it would move. In color code, different from other animation tools, you don't replace the entire screen with a new drawing, rather you replace small chunks of 3x3 pixels at time.

The next section to look at on the code screen is the "when" and "then" part below the color palette. They are two separate 3x3 canvas for you to draw on. You can use "a" to stamp and "b" to erase, except here not having a color is different than the color "black".

On the left canvas, the "when", you can draw a piece of the drawing that you want to replace and on the right side, the "then", you draw what you want to replace it with. Notice that Color Code will try to match this pattern in the entire canvas so if this patter appears somewhere else, it will be replaced in both. If you want only one thing to move, make it unique.

As mentioned before, the button "c" does more than hiding and showing the cursor, it is the button that toggles between editing and playing. When you are editing you can draw and create rules, when you are playing you can't. If you press "c" from the code screen you switch automatically to the other screen. And if everything works as expected, you will see all the occurrences of what you drawn on "when" be replaced by what you have on "then".

To make an animation we'll create a new rule that reverses the drawing to the original form. The next section to look at are the two lines above the color palette. The are all the same color except one pixel except for one. The pixels represent the rule slots: You can create 16 rules. The different pixel represents the rule you are currently editing. You can change the currently selected rule by moving to it and pressing "a".

## 4. Interactive

The last section of the screen to look at is the first line of pixels. The are also the same color except one and it operates very much like the rule selection. This line on the other hand represents events. The first event is the "clock tick", which means the rules in this slot will be executed every time the Color Code clock ticks (and it usually ticks 3 or 4 times per second).

The next 7 slots represent the events for button press in this order: up, right, down, left (think of clockwise movement starting from up), "a", "b" and "c". If you create events for "c" they will not override its main function of switching modes. The last pixel is for hackers.

The rule slot will not reset when you change events.

You can either control the animation with the buttons instead of playing a loop or you can mix looped with interactive animations.

## 5. Game Maker

Lastly, you can create rules that don't take the whole 3x3 canvas. Having no color on parts of the canvas means that pixel will not be considered for this rule.

For the "when" chunk, not having a color means the pattern gets smaller down to a single pixel. You can easily swap colors of your drawings or check the surroundings of a "particle" pixel. All "when" rules must have a color on its center pixel.

For the "then" chunk you can leave as many pixels without color and it doesn't need to have a color in its center. Not having color means those pixels will remain unchanged.

Although you can write on the margins of the screen for the "then" rules, you can't have any rules that the center of the "when" is on a border.

Many games, puzzles, abstract drawings, math exploration, physics simulations and all sorts of things can be programmed by a combination of drawing, animating and adding interaction.

## Extendable

At its core Color Code is a cellular automata it can be easily implemented in any language, architecture, hardware, planet, etc...

The whole 16x16 screen or parts of it can be easily mapped to different types of inputs and outputs, depending only of what's available and baring with being limited by 16 values.

There is an entire event on that is empty and can be triggered by different things such as sensors, data, randomly, etc...

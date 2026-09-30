---
title: My avatar, now alive
description: How I turned a 48 × 48 pixel art avatar into a character that blinks, looks around and reacts.
date: 2026-09-27
lang: en
translationKey: pixel-avatar
draft: false
tags: [canvas, pixel-art, astro]
---

A designer made me a beautiful pixel art avatar: 48 × 48 pixels, 80 colors and 20-pixel blocks. I wanted to bring it to life without redrawing it.

## The grid is the data

The first step was to read the image as a grid. Each 20 × 20 block is one logical pixel. That gives me a 48 × 48 matrix of colors that I can change as I like.

The edges of the avatar were anti-aliased against the cyan background. I calculated the transparency of those pixels from their darkest neighbor, so the avatar works on any background.

## Faces are patches

Each expression changes between 2 and 30 pixels:

- **Blink:** the eyelid moves down one row.
- **Laugh:** open mouth with teeth and happy eyes.
- **Surprise:** wider eyes and an "o" mouth.

The original mouth already had upturned corners. That is why a one-pixel smile was invisible. I also had to change the eyes and add a blush.

## Crisp pixels, smooth shapes

The avatar is drawn on a canvas with `imageSmoothingEnabled = false`. The rounded shape is a vector mask applied at the real screen size. The pixels stay crisp and the edge stays smooth.

## On this site

Here it is a custom element, `<pixel-avatar>`. Any link with `data-mood="smile"` makes it smile. If you visit in the middle of the night, Spanish time, it is asleep.

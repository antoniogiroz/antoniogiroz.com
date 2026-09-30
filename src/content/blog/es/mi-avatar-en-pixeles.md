---
title: Mi avatar, ahora con vida
description: Cómo convertí un avatar pixel art de 48 × 48 en un personaje que parpadea, mira y reacciona.
date: 2026-09-27
lang: es
translationKey: pixel-avatar
draft: false
tags: [canvas, pixel-art, astro]
---

Un diseñador me hizo un avatar pixel art precioso: 48 × 48 píxeles, 80 colores y bloques de 20 píxeles. Quería darle vida sin redibujarlo.

## La rejilla es el dato

El primer paso fue leer la imagen como una rejilla. Cada bloque de 20 × 20 píxeles es un píxel lógico. Con eso tengo una matriz de 48 × 48 colores que puedo cambiar como quiera.

Los bordes del avatar estaban suavizados contra el fondo cian. Calculé la transparencia de esos píxeles a partir de su vecino más oscuro, así el avatar funciona sobre cualquier fondo.

## Las caras son parches

Cada expresión cambia entre 2 y 30 píxeles:

- **Parpadeo:** el párpado baja una fila.
- **Risa:** boca abierta con dientes y ojos felices.
- **Sorpresa:** ojos más abiertos y una boca en forma de «o».

La boca original ya tenía las comisuras hacia arriba. Por eso una sonrisa de un píxel no se notaba. Tuve que cambiar también los ojos y añadir rubor.

## Píxeles nítidos, formas suaves

El avatar se dibuja en un canvas con `imageSmoothingEnabled = false`. La forma redondeada es una máscara vectorial que se aplica al tamaño real de la pantalla. Así los píxeles quedan nítidos y el borde queda suave.

## En esta web

Aquí es un custom element, `<pixel-avatar>`. Cualquier enlace con `data-mood="smile"` hace que sonría. Si entras de madrugada, hora de España, está dormido.

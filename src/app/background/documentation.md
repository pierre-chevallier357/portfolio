# Aura Background Animation

## Setup

  On view init (aura-background.ts), a canvas is resized to fill its container and 12 "AuraDot" instances are created, each picking a random pastel color from AURA_COLORS. Each frame, the canvas is cleared and every dot is updated then redrawn via requestAnimationFrame.

## Movement

Each dot gets random position, a fixed random radius (200–500px), and a small constant velocity (vx, vy, up to ±0.6 px/frame) at creation. Every frame it just adds velocity to position — straight-line drifting, no acceleration or randomness change over time. When a dot fully exits the canvas bounds (accounting for its radius), it wraps around to the opposite edge rather than bouncing.

## Size

Fixed per dot for its lifetime — set once in reset(), never grows/shrinks while animating (only changes if reset() is called again, e.g. on window resize when new dots are created).

## Color

Also fixed per dot — one pastel color chosen at creation, never transitions or shifts hue over time.

## Fading

The "fade" is purely spatial, not temporal. Each dot is drawn every frame as a radial gradient: solid color from center to 50% of its radius, then fading to transparent (matching the background RGB) at the edge — so it always looks like a soft glowing blob, with multiply blend mode used to keep pastel tones visible on the light background instead of washing out.

## Summary

Dots drift linearly forever, wrap at edges, and keep constant size/color — the only "fade" is the static soft edge of each blob's gradient, not an animation over time.

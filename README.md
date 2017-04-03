# The Lost Woods
https://sjcobb.github.io/lost-woods

The Lost Woods is a way to navigate between and explore WebVR demos auditorily. If you'd like to add a link to your site, email sjcobb.dev@gmail.com with a URL and audio file, or edit the portal object in [portal.js](https://github.com/sjcobb/lost-woods/blob/master/js/portal.js) and submit a pull request.

If anyone would like to collaborate (Hyrule is plenty big), just let me know. I am currently working on implementing an item inventory that we can share between games.

## Future Plans
There are a few places online with [curated lists](http://vrlist.io) of VR experiences, I want the Lost Woods to serve that purpose but keep the user immersed. Another difference is I want to include all types of demos, no matter how half-baked. As the number grows, I will sort them by popularity (or some other criteria).

I also want to explore sharing gameplay elements between sites. For example, you find a key in my game that unlocks a door in your game. I am implementing this now in the [Fire Temple](https://sjcobb.github.io/fire-temple) and [Lake Hylia](https://sjcobb.github.io/lake-hylia), but it isn't complete yet.

## TODOs
- Add gamepad support
- Improve experience when linking between games
- Finish inventory (may need multiple variations based on device)
- Add weapons (sword and bow)
- Add collision detection with raycaster
- Add ocarina, song building feature
- Finish music maze ([fire-temple](https://github.com/sjcobb/fire-temple))
- Finish platform jumping game ([ice-cavern](https://github.com/sjcobb/ice-cavern))
- Finish bow & arrow shooter ([lake-hylia](https://github.com/sjcobb/lake-hylia))
- Improve Navi

## Issues
Pull requests are welcome. All I currently have to test with is a Google Cardboard headset so I could use help supporting the higher end VR systems.

## Inventory
Shared inventory documentation to come. For now if you want an annoying fairy in your game, check out [navi.js](https://github.com/sjcobb/lost-woods/blob/master/js/navi.js).

## Getting Started with WebVR
Like most things on the web, there isn't one best way to go about creating a WebVR experience. Here are some suggestions for getting started.

- [WebVR Boilerplate](https://github.com/borismus/webvr-boilerplate) - Starting point for cross-platform web-based VR experiences.
- [A-Frame](https://github.com/aframevr/aframe) - A-Frame is a WebVR framework using three.js. It abstracts away a lot of the basic setup and uses an entity-component-system pattern. 
- [Three.js Examples](https://threejs.org/examples/) - Check them all out, especially the ones under webvr and misc.
- [FirstPersonVRControls](https://github.com/brianpeiris/three-firstperson-vr-controls) - Helpful implementation of first-person controls.
- [WebVR Starter Kit](https://github.com/povdocs/webvr-starter-kit) - I haven't used this much, but it has some interesting examples to learn from.
- [Awesome WebVR](https://github.com/wizztjh/awesome-WebVR) - more links
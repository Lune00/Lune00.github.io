import demoVariation from './sketch-variation.js'

export const main = (() => {

  const main = {};
  main.start = function() {
    main.p5demoVariation = new p5(demoVariation, 'canvas-demo-variation')
  }

  return main

})();

main.start()

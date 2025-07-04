var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        var circle;
        var circles = [];

        // draws a circle and pushes it to the circles array
        function drawCircle() {
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
            physikz.addRandomVelocity(circle, canvas, 5, 5);
            view.addChild(circle);
            circles.push(circle);
        }

        for (var i = 0; i < 1000; i++) {
            drawCircle();
        }
        
        /* 
        This Function is called 60 times/second, producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            for (var i = 0; i < circles.length; i++) {
                physikz.updatePosition(circles[i]);
                game.checkCirclePosition(circles[i]);
            }
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            if (circle.x < 0) {
                circle.x = canvas.width;
            }
            if (circle.y > canvas.height) {
                circle.y = 0;
            }
            if (circle.y < 0) {
                circle.y = canvas.height
            }

        }
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}

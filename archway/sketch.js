/*
* p5.mapper
* Video on quad surface
* Click to start video
* 
* Jenna deBoisblanc
* jdeboi.com
* 11/16/2021
* 
*/

let numVids = 1;

let pMapper;
let quadMap;

let video;
const videoDim = { w: 960, h: 540 };
let isPlaying = false;

let maskImg;
let myFont;


function preload() {
    myFont = loadFont('assets/Roboto.ttf');
    maskImg = loadImage("assets/mask2.png");
    video = createVideo('assets/coins1.mp4');
    video.hide();
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    textFont(myFont);
    noCursor();

}

function draw() {
    background(0);


    translate(-width / 2, -height / 2);

    getVideos();
    displayFadeOut();

    displayFrameRate();
}

function keyPressed() {
    switch (key) {
        case 'c':
            // pMapper.toggleCalibration();
            break;
        case 'f':
            let fs = fullscreen();
            document.getElementById("header").style.display = "none";
            fullscreen(!fs);
            break;
        case 'l':
            // pMapper.load("maps/map.json");
            break;

        case 's':
            // pMapper.save("map.json");
            break;
    }
}

function getVideos() {
    const { w, h } = getVideoDim();
    for (let i = 0; i < numVids; i++) {
        image(video, i*w, 0, w, h);
    }
}


function displayFadeOut() {
    const { w, h } = getVideoDim();
    const startY = h * .8;
    const endY = h * .9;
    for (let y = startY; y < h * 1.1; y++) {
        const alpha = constrain(floor(map(y, startY, endY, 0, 255)), 0, 255);
        stroke(0, alpha);
        line(0, y, width, y);
    }
}

function getVideoDim() {
    let dim = { ...videoDim };
    // max out width
    dim.w = width;
    dim.h = width / videoDim.w * videoDim.h;
    dim.w /= numVids;
    dim.h /= numVids;
    return dim;
}

function mousePressed() {
    isPlaying = true;
    video.loop();
    // pMapper.onClick();
}

function mouseDragged() {
    // pMapper.onDrag();
}

function mouseReleased() {
    // pMapper.onRelease();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function displayFrameRate() {
    fill(255);
    noStroke();
    text(round(frameRate()), -width / 2 + 20, -height / 2 + 20);
}
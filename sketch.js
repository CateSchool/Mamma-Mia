
let mode = 0;
let videos = [];
let pMapper;
let maskMaps = [];
let calibrating = false;

const START_SCREEN = 0;
const BLACK_1 = 1;
const MONEY_MONEY = 2;
const BLACK_2 = 3;
const DISCO_1 = 4;
const BLACK_3 = 5;
const DISCO_2 = 6;
const BLACK_4 = 7;
const ABBA = 8;
const BLACK_5 = 9;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pMapper = createProjectionMapper(this);
    videos[0] = createVideo('assets/coins2.mp4');
    videos[0].hide();
    

    // dancing queen full screen
    videos[1] = createVideo('assets/swirls.mp4');
    videos[1].hide();

    // gimme gimme up top
    videos[2] = createVideo('assets/disco1.mov');
    videos[2].hide();

    // abba full screen
    videos[3] = createVideo('assets/pentagon.mp4');
    videos[3].hide();

    maskMaps[0] = pMapper.createMaskMap(6);
    maskMaps[1] = pMapper.createMaskMap(6);
    pMapper.load("assets/map.json");
}

function draw() {

    if (calibrating) {
        displayCalibration();
    }
    else {
        background(0);
        switch (mode) {
            case 0:
                displayStart();
                break;
            case 2:
                displayMoney();
                break;
            case 4:
                displayDancingQueen();
                break;
            case 6:
                displayGimmeGimme();
                break;
            case ABBA:
                displayAbba();
                break;
            default:
                displayBlack();
        }
    }


}

function mousePressed() {
    if (mode == START_SCREEN) {
        mode = BLACK_1;
        let fs = fullscreen();
        fullscreen(!fs);
        playVid();
    }
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        if (mode > START_SCREEN) {
            mode++;
            if (mode > BLACK_5) {
                mode = BLACK_5;
            }
        }
        triggerVideo();
    }
    else if (keyCode == LEFT_ARROW) {
        if (mode > BLACK_1) {
            mode--;
        }
        triggerVideo();
    }

    if (key == 'c') {
        calibrating = !calibrating;
        pMapper.toggleCalibration();
    }
    else if (key == 's') {
        pMapper.save("map.json");
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function displayStart() {
    background(0);
    textSize(50);
    fill(255);
    text("Click to Begin Show", 100, 100);
}

function displayCalibration() {
    background('red');
    textSize(130);
    fill(255);
    text("CALIBRATING", 100, height / 2);
    displayMasks();
}

function displayMasks() {
    for (const m of maskMaps) {
        m.display();
    }
}

function displayBlack() {
    background(0);
}

function displayMoney() {
    image(videos[0], 0, 0, width, height);
    displayMasks();
}

function displayDancingQueen() {
    image(videos[1], 0, 0, width, height);
    displayMasks();
}

function maskTop() {
    let start = 300;
    let dY = 100;
    for (let y = start; y < height+100; y++) {
        let a = map(y, start, start+dY, 0, 255);
        a = constrain(a, 0, 255);
        a = floor(a);
        fill(0, a);
        noStroke();
        rect(0, y, width, 1);
    }
}

function displayGimmeGimme() {
    image(videos[2], 0, 0, width, height);
    maskTop();
    displayMasks();
}

function displayAbba() {
    image(videos[3], 0, 0, width, height);
    displayMasks();
}

function triggerVideo() {
    // if (mode == MONEY_MONEY) {
    //     playVid(0);
    // }
    // else if (mode == DISCO_1) {
    //     playVid(1);
    // }
    // else if (mode == DISCO_2) {
    //     playVid(2);
    // }
    // else if (mode == ABBA) {
    //     playVid(3);
    // }
}

function playVid(num) {
    for (let i = 0; i < videos.length; i++) {
        // if (num == i) {
            videos[i].loop();
        // }
        // else {
            // videos[i].pause();
        // }
    }
}
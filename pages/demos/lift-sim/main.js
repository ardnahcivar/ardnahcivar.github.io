/* 
Lift has:
    nosLevels
    currLevel
    state can be UP/DOWN/STAT
    srcLevel default can  be zero
    destLevel
*/

const UP_ARROW_CODE = '8920';
const DOWN_ARROW_CODE = '8921';

const LIFT_STATUS = {
    UP: "UP",
    DOWN: "DOWN",
    STAT: "STATIONARY"
};

const LIFT_MOVEMENT_FACTOR = 2;
const INTERVAL_FACTOR = 10;
const LEVEL_HEIGHT = 150;
function LiftLevel(id){
   this.isOpen = false;
   this.id =  id;
}

LiftLevel.prototype.toggle = function(){
    this.isOpen = !this.isOpen;
}

function Lift(nosLevels){
    this.nosLevels = nosLevels;
    this.currLevel = 0;
    this.status = LIFT_STATUS.STAT;
    this.srcLevel = 0;
    this.destLevel = -1;
    this.liftLevels = [];

    for(let i = 0; i < this.nosLevels; i++){
        this.liftLevels[i] = new LiftLevel(i);
    }
}
function LiftView(container, levels){
    this.parent = container;
    this.liftState = new Lift(levels);
    this.liftLevelViews = [];
    this.currY = null;

    this.liftView = document.createElement('div');
    this.liftView.classList.add('lift-view');

    this.parent.appendChild(this.liftView);

    this.liftView.addEventListener('click', (event) => {
        this.onClickHandler(event);
    });
}

LiftView.prototype.onClickHandler = function(event){
    const { currLevel, nosLevels  } = this.liftState;
    const isButtonClicked = event.target.tagName === 'BUTTON';
    
    if(!isButtonClicked){
        return
    }

    const { id } = event.target.dataset;
    let [floor, direction] = id.split(':');
    floor = parseInt(floor);

    if(floor - 1 === currLevel || (currLevel === 0 && direction === "0" && floor - 1 === currLevel)){
            return;
    }

    this.toggleLiftButtons(true);
    this.movingLift.classList.remove('open');
    this.movingLift.classList.remove('closed');
    this.movingLift.classList.add('open');

    setTimeout(() => {
        this.movingLift.classList.remove('open');
        this.movingLift.classList.remove('closed');
        this.movingLift.classList.add('closed');
    },4000)

    setTimeout(() => {
        this.triggerLiftMovement(floor - 1, direction)
    },8000)
}


LiftView.prototype.toggleLiftButtons = function(shouldDisable){
    for(let i = 0; i < this.liftLevelViews.length; i++){
        const buttons = this.liftLevelViews[i].querySelectorAll('button');
        if(shouldDisable){
            buttons[0].setAttribute('disabled', true);
            buttons[1].setAttribute('disabled', true);
        }else{
            buttons[0].removeAttribute('disabled');
            buttons[1].removeAttribute('disabled');
        }
    }
}

LiftView.prototype.triggerLiftMovement = function(gotoFloor, direction){
    const { status, currLevel } = this.liftState;
    this.liftState.status = direction === "1" ? LIFT_STATUS.UP : LIFT_STATUS.DOWN;
    const indicatorDir = this.liftState.currLevel < gotoFloor ? "1" : "0";

    this.handleLiftStatusIndicator(indicatorDir, false);
    if(gotoFloor === currLevel){
        return
    }

    let start = this.currY || this.liftState.currLevel * this.levelHeight;
    let end = gotoFloor * this.levelHeight;

    let intervalId;
    let self = this;
    
    function moveLift(yCord){
        clearTimeout(intervalId);
        const condition = self.liftState.currLevel < gotoFloor ? yCord < end : yCord > end;
        console.log(yCord, Math.floor(self.liftView.clientHeight / self.liftState.nosLevels)) ;
        console.log(Math.floor(yCord / this.levelHeight) + 1);
        self.updateCurrLevelStatus(yCord);
        if(condition){
            self.movingLift.style.transform = `translateY(-${Math.abs(yCord)}px)`;
            const newYcords = self.liftState.currLevel < gotoFloor ? yCord + LIFT_MOVEMENT_FACTOR : yCord - LIFT_MOVEMENT_FACTOR;
            intervalId = setTimeout(moveLift.bind(self, newYcords), INTERVAL_FACTOR);
        }else{
            self.liftState.currLevel = gotoFloor;
            self.currY = yCord;
            self.movingLift.classList.remove('moving');
            self.movingLift.classList.remove('closed');
            self.movingLift.classList.remove('open');
            self.movingLift.classList.add('open');
            setTimeout(() => {
                self.movingLift.classList.remove('open');
                self.movingLift.classList.remove('closed');
                self.movingLift.classList.add('closed');
                self.toggleLiftButtons(false);
                self.handleLiftStatusIndicator(direction, true);
            },4000)
        }
    }

    this.movingLift.classList.add('moving');
    moveLift(start, currLevel);
}

LiftView.prototype.handleLiftStatusIndicator = function(direction, pauseIndicator){
    const removeProgress = () => {
        const statusElems = this.liftView.querySelectorAll('.lift-status');
        for(let i = 0; i < statusElems.length; i++){
            statusElems[i].classList.remove('progress-1');
            statusElems[i].classList.remove('progress-0');
        }
    }

    removeProgress();

    if(!pauseIndicator){
        const statusElems = this.liftView.querySelectorAll('.lift-status');

        if(direction === "1"){
            for(let i = 0; i < statusElems.length; i++){
                statusElems[i].classList.remove('progress-1');
                statusElems[i].classList.remove('progress-0');
                statusElems[i].classList.add('progress-1');
            }
        }else{
            for(let i = 0; i < statusElems.length; i++){
                statusElems[i].classList.remove('progress-1');
                statusElems[i].classList.remove('progress-0');
                statusElems[i].classList.add('progress-0');
            }
        }
    }else{
        removeProgress();
    }
}


LiftView.prototype.updateCurrLevelStatus = function(yCord){
    const currLevelElems = this.liftView.querySelectorAll('.lift-status .curr-lift-level');
    for(let i = 0; i < currLevelElems.length; i++){
        let prevValue = +currLevelElems[i].textContent;
        let newValue = Math.floor(yCord / this.levelHeight) + 1;
        if(prevValue !== newValue){
            currLevelElems[i].textContent = newValue;
        }
    }
}

LiftView.prototype.createLiftLevelView = function(levelNo){    
    const currLevel = this.liftState.nosLevels - levelNo; 

    let floorNoElem = document.createElement('span');
    floorNoElem.classList.add('floor-no');
    floorNoElem.textContent = currLevel;

    this.levelElem = document.createElement('div');

    this.levelElem.style.width = `100%`;
    
    this.doorElem = document.createElement('div');
    this.doorElem.classList.add('door');

    let leftDoor = document.createElement('div');
    let rightDoor = document.createElement('div');
    let statusIndicator = document.createElement('div');
    let currLevelIndicator = document.createElement('div');
    currLevelIndicator.classList.add('curr-lift-level');

    let upArrow = document.createElement('div');
    upArrow.classList.add('up-arrow');
    upArrow.textContent = String.fromCodePoint(UP_ARROW_CODE);

    let downArrow = document.createElement('div');
    downArrow.classList.add('down-arrow');
    downArrow.textContent = String.fromCodePoint(DOWN_ARROW_CODE);
    
    statusIndicator.appendChild(upArrow);
    statusIndicator.appendChild(downArrow);
    statusIndicator.appendChild(currLevelIndicator);

    statusIndicator.classList.add('lift-status');

    leftDoor.classList.add('left-door');
    rightDoor.classList.add('right-door');
    this.doorElem.appendChild(leftDoor);
    this.doorElem.appendChild(rightDoor);
    this.doorElem.appendChild(statusIndicator);
    


    this.controlsElem = document.createElement('div');
    this.controlsElem.classList.add('controls');

    this.levelUpElem = document.createElement('button');
    this.levelUpElem.classList.add('level-up');
    this.levelUpElem.dataset.id = `${currLevel}:${1}`;

    this.levelDownElem = document.createElement('button');
    this.levelDownElem.classList.add('level-down');
    this.levelDownElem.dataset.id = `${currLevel}:${0}`;

    this.controlsElem.appendChild(this.levelUpElem);
    this.controlsElem.appendChild(this.levelDownElem);

    this.levelElem.appendChild(floorNoElem);
    this.levelElem.appendChild(this.controlsElem);
    this.levelElem.appendChild(this.doorElem);

    return this.levelElem;
}

LiftView.prototype.render = function(){
    const { nosLevels } = this.liftState;

    this.liftView.style.height = `${LEVEL_HEIGHT * nosLevels}px`;
    this.totalHeight = LEVEL_HEIGHT * nosLevels;
    this.levelHeight = Math.floor(this.totalHeight / nosLevels);
    this.liftLevelViews = [];

    for(let i = 0; i < nosLevels; i++){
        let level =  this.createLiftLevelView(i);
        level.style.height = `${this.levelHeight}px`;
        level.classList.add('floor');
        this.liftView.appendChild(level);
        this.liftLevelViews.push(level);
    }

    this.movingLift = document.createElement('div');
    this.movingLift.classList.add('moving-lift');


    let leftDoor = document.createElement('div');
    let rightDoor = document.createElement('div');
    let handle = document.createElement('div');

    leftDoor.classList.add('left-door');
    rightDoor.classList.add('right-door');
    handle.classList.add('handle');

    this.movingLift.style.height = `${this.levelHeight / 2}px`;
    this.movingLift.appendChild(leftDoor);
    this.movingLift.appendChild(rightDoor);
    this.movingLift.appendChild(handle);

    this.liftView.appendChild(this.movingLift);
}

function LiftSim(container, nof, nol){
    this.root = container;
    this.totalLevels = nof;
    this.totalLifts = nol;
    this.liftSimView = document.createElement('div');
    this.liftSimView.classList.add('list-sim-view');
    this.root.appendChild(this.liftSimView);
}


LiftSim.prototype.render = function(){
    for(let i = 0; i < this.totalLifts; i++){
        let lv = new LiftView(this.liftSimView, this.totalLevels);
        lv.render()
    }
}

const rootElem = document.querySelector('#lift-sim-container');
const liftInputForm = document.querySelector('#lift-sim-input');
const renderLiftSimBtn = document.querySelector('#lift-sim-render');

renderLiftSimBtn.addEventListener('click', function(e){
    const nosBuildings = +liftInputForm.elements['nos-buildings'].value;
    const nosFloors = +liftInputForm.elements['nos-floors'].value;
    console.log(nosBuildings, nosFloors);
    if(nosBuildings === 0 || nosFloors <= 1){
        alert('please fill no of building greater than 0 and floors with numbers greater than 1')
        return;
    }

    if(nosBuildings >= 10 || nosFloors > 10){
        alert('please fill no of building 10 or less and floors with numbers 10 or less')
        return;  
    }

    if(nosBuildings && nosFloors){
        rootElem.replaceChildren();
        for(let i = 0; i < nosBuildings; i++){
            let ls = new LiftSim(rootElem, nosFloors, 1);
            ls.render();
        }
    }   

});

for(let i = 0; i < 4; i++){
    let ls = new LiftSim(rootElem, 4, 1);
    ls.render();
}




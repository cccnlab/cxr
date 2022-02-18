var imgSrc = 'im/';
var imgList = ['acousticguitar.jpg','apple.jpg','arm.jpg','asianelephant.jpg','axe.jpg','balloon.jpg','banana.jpg','bed.jpg','belt.jpg','bicycle.jpg','birdnest.jpg','birthdaycandle.jpg','blackbear.jpg','book.jpg','bowl.jpg','boxingglove.jpg','broom.jpg','bus.jpg','butterfly.jpg','button.jpg','cabbage.jpg','cane.jpg','car.jpg','cauliflower.jpg','chain.jpg','chair.jpg','chilipeppers.jpg','clock.jpg','comb.jpg','computermouse.jpg','corn.jpg','couch.jpg','cow.jpg','crab.jpg','crocodile.jpg','cucumber.jpg','desk.jpg','dice.jpg','dragonfly.jpg','duck.jpg','ear.jpg','egg.jpg','elbow.jpg','envelope.jpg','eraser.jpg','eye.jpg','feather.jpg','flashlight.jpg','flipflop.jpg','foot.jpg','fork.jpg','freighttruck.jpg','fridge.jpg','fryingpan.jpg','garbagebin.jpg','giftbag.jpg','giraffe.jpg','glasses.jpg','glassmop.jpg','grandpiano.jpg','grape.jpg','greatwhiteshark.jpg','hairband.jpg','hairdryer.jpg','hammer.jpg','hand.jpg','handcuffs.jpg','hanger.jpg','hat.jpg','headphones.jpg','helicopter.jpg','hibiscusflower.jpg','highheelshoe.jpg','honeybee.jpg','horse.jpg','iron.jpg','jackrabbit.jpg','jeans.jpg','kalashnikovrifle.jpg','key.jpg','knee.jpg','knife.jpg','ladle.jpg','ladybug.jpg','laptop.jpg','leaf.jpg','leg.jpg','lighter.jpg','lion.jpg','lip.jpg','lizard.jpg','lock.jpg','magnifyingglass.jpg','mango.jpg','mangosteen.jpg','manshoe.jpg','measuringtape.jpg','microphone.jpg','microwave.jpg','motorcycle.jpg','mouse.jpg','mug.jpg','mushroom.jpg','nail.jpg','nailclipper.jpg','nose.jpg','onion.jpg','orange.jpg','paintbrush.jpg','paintcan.jpg','panda.jpg','papaya.jpg','paperclip.jpg','parkbench.jpg','peacock.jpg','peanut.jpg','pen.jpg','pencil.jpg','pencilsharpener.jpg','pepper.jpg','pictureframe.jpg','pig.jpg','pigeon.jpg','pillow.jpg','pineapple.jpg','pingpongpaddle.jpg','plasticbasket.jpg','plate.jpg','pot.jpg','powerline.jpg','puzzlepiece.jpg','qtip.jpg','rambutan.jpg','razor.jpg','remotecontrol.jpg','rhinoceros.jpg','ribbon.jpg','rice.jpg','ring.jpg','rooster.jpg','rose.jpg','ruler.jpg','safetypin.jpg','saw.jpg','scarf.jpg','scissors.jpg','scorpion.jpg','scotchtape.jpg','screwdriver.jpg','scrubbingbrush.jpg','sheep.jpg','shoppingcart.jpg','shoulder.jpg','shrimp.jpg','siamesecat.jpg','sieve.jpg','soccerball.jpg','sock.jpg','speaker.jpg','sponge.jpg','spoon.jpg','sportshorts.jpg','squid.jpg','squirrel.jpg','stairs.jpg','starfish.jpg','strawberry.jpg','stuffedanimal.jpg','tank.jpg','tennisball.jpg','thaigreencurry.jpg','thaihotandsoursoup.jpg','thainoodlestirfry.jpg','thread.jpg','tie.jpg','tiger.jpg','toaster.jpg','toilet.jpg','toothbrush.jpg','tortoise.jpg','towel.jpg','tree.jpg','tshirt.jpg','tupperware.jpg','tweezers.jpg','umbrella.jpg','watch.jpg','waterbottle.jpg','waterbuffalo.jpg','watermelon.jpg','window.jpg','zebra.jpg','zipper.jpg'];
Shuffle(imgList)
var curTrial = 0; 
var naming = [];
var similarity = [];
var nTrials = imgList.length;
var trialStruct = [];
var st = null;

// Settings

for (i = 0; i < nTrials; i++){
    similarity[i] = 99;
    naming[i] = "";
}

for (i = 1; i < 6; i++){
var eachInputSimilarity = "inputSimilarity" + i;
var eachSimilarity = document.getElementById(eachInputSimilarity);
}

function shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

// While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function makeBackground(bgcolor){
// Fill background
    makeRectangle('bg', centerX, centerX, 400, 400, false, bgcolor, bgcolor);
    
}

function startTime(){
    var d = new Date();
    st = d.getTime();
}

function endTime(){
    var d = new Date();
    timeDif = d.getTime() - st;
    return timeDif;
}

function trialIsOver() {
    var curTrialStruct = {};
    curTrialStruct.image = imgList[curTrial];
    curTrialStruct.naming = naming[curTrial]
    curTrialStruct.similarity = similarity[curTrial]
    trialStruct.push(curTrialStruct);
    curTrial = curTrial + 1 ; 

    if (curTrial >= nTrials){
        Done();
    } else {
        startTrialTime = new Date();
        var picture = document.getElementById('picture');
        picture.src = imgSrc + imgList[curTrial];
    }
}

function Done() {
    $('#frame1').hide();
    $("#done").show();

    var dataToServer = {};
    dataToServer.id = getParameterByName("subjectId"); /* getParameterByName("code") */
    dataToServer.experimenter = 'Chaipat';
    dataToServer.experimentName = 'Naming';
    dataToServer.curData = JSON.stringify(trialStruct);
    $.post("https://psyc241.ucsd.edu/Turk/save.php", dataToServer, AfterSuccessDataSaving).fail(AfterFailedSaving);
}

function AfterSuccessDataSaving() {
    // After they are done, send them here:
    // window.location = "https://ucsd.sona-systems.com/webstudy_credit.aspx?experiment_id=1267&credit_token=805f6634de5a46b3aecffe2818d8d90c&survey_code=" + getParameterByName("code");
    // $('#submitButton').show();
    $('#done').html("All done, thanks! Please refresh the screen.");
    console.log("Saved!");
}

function AfterFailedSaving() {
    console.log("oops, failed to save");

// window.location = "https://ucsd.sona-systems.com/webstudy_credit.aspx?experiment_id=1267&credit_token=805f6634de5a46b3aecffe2818d8d90c&survey_code=" + getParameterByName("code");  
// $('#submitButton').show();
$('#done').html("All done, thanks! Please refresh the screen.");

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkNaming(){
    var eachInputNaming = document.getElementById("inputNaming").value;
    console.log(eachInputNaming);
    naming[curTrial] = eachInputNaming;
    // document.getElementById("inputNaming").value = "";
} 

function checkSimilarity(){
    for (i = 1; i < 6; i++){
        var eachInputSimilarity = "inputSimilarity" + i;
        var eachSimilarity = document.getElementById(eachInputSimilarity);

        if (eachSimilarity.checked){
            similarity[curTrial] = i;
            eachSimilarity.checked = false;
        }
    }
} 

function TOK(){
    $('#instructions').hide();
    $('#startExperimentButton').hide();
    $('#frame1').show();
    console.log(curTrial);
  }

function previous(){
    if (curTrial != 0){
        curTrial = curTrial - 1;
        var picture = document.getElementById('picture');
        picture.src = imgSrc + imgList[curTrial];
        console.log(curTrial);
    }  
}

function beforeNext(){
        checkSimilarity();
        checkNaming();

    if (similarity[curTrial] < 99 && naming[curTrial] != ""){
        next();
    }     
    
}

function pressKeyboard(event){
    if (event.key === "Alt"){
        beforeNext();
    } else if (event.key === 'Escape') {
        previous();
    }
}

document.addEventListener('keydown', pressKeyboard);
    
function next(){
    var eachInputNaming = document.getElementById("inputNaming").value;
    naming[curTrial] = eachInputNaming;
    document.getElementById("inputNaming").value = "";

    if (curTrial < imgList.length){
        trialIsOver();
        console.log(curTrial);
    } 
}

function initPicture(){
    var picture = document.getElementById('picture');
    picture.src = imgSrc + imgList[curTrial];
}

document.addEventListener("DOMContentLoaded", function () {
    initPicture();
    $('#startExperiment').click(TOK);
})

// =======================================================

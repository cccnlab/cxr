var imgSrc = 'allim/';
var imgList = [];
var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;
var img=new Image(); 

var condList = ['n','c'];
var nFilePerConds = 20;
var nBlock = 4;
var nflip = 2*2;
var usableKeys = ['z','x'];
var swipeDir = ['left','right'];
var stimDur = 300;
var preStim = 1000; 
var canResp = 1;
var breakEvery = 40;
///////////////////////////////////////////////////////////// 
// สร้างกล่อง 2x2x2 ที่มีไพ่ 20 ใบ (ที่ shuffle แล้ว)
for (iheart = 0; iheart<condList.length; iheart++){
    imgList[iheart] = [];
    for (ilr = 0; ilr<2; ilr++){
        imgList[iheart][ilr] = [];
        for (iud = 0; iud<2; iud++){
            imgList[iheart][ilr][iud] = [];
            for (ifile = 0; ifile<nFilePerConds; ifile++){
                imgList[iheart][ilr][iud].push(ifile)
            }
            Shuffle(imgList[iheart][ilr][iud]) // (ที่ shuffle แล้ว ตรงนี้)
        }
    }
}

var curTrial = 0; 
var rt = [];
var ans = [];
var ncond = 4;
var nRepPerBlock = 5;

///////////////////////////////////////////////////////////// 
// สร้าง var "conds" ซึ่งมี 4 blocks ในแต่ละ block มีความยาวเท่ากับจำนวน trials (40)
var conds = [];
for (iblock = 0; iblock <nBlock; iblock++){
    conds[iblock] = [];
    icount = 0;
    for (irep = 0; irep<nRepPerBlock; irep++){
        for (iheart = 0; iheart<condList.length; iheart++){
            for (ilr = 0; ilr<2; ilr++){
                for (iud = 0; iud<2; iud++){

                    conds[iblock][icount] = [condList[iheart],imgList[iheart][ilr][iud][iblock*nRepPerBlock+irep],ilr,iud]
                    icount++;
                }
            }
        }
    }
    Shuffle(conds[iblock]) // shuffle อีก เพื่อความบ้าคลั่ง
}

/////////////////////////////////////////////////////////////
// ขอลองแบบนี้ก่อน เหนื่อยแล้ว
// อย่าลืมมาแก้ให้ run เป็น block ได้นะ
/////////////////////////////////////////////////////////////

var tootired = [];
for (iblock=0;iblock<nBlock;iblock++){
    if (iblock == 0){
        tootired = conds[iblock];
    }
    else{
        tootired = tootired.concat(conds[iblock])
    }
    
}
var nTrials = tootired.length;

var trialStruct = [];
var st = null;


//////////////////////////////////////////////////////////////
// สร้าง array เปล่า ไว้เก็บข้อมูล 
//////////////////////////////////////////////////////////////
for (i = 0; i < tootired.length; i++){
    rt[i] = 99;
    ans[i] = "99";
}

//////////////////////////////////////////////////////////////

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

function startTime(){
    var d = new Date();
    st = d.getTime();
}

function endTime(){
    var d = new Date();
    timeDif = d.getTime() - st;
    return timeDif;
}

function scaleIt(source,scaleFactor){
  var c=document.createElement('canvas');
  var ctx=c.getContext('2d');
  var w=source.width*scaleFactor;
  var h=source.height*scaleFactor;
  c.width=w;
  c.height=h;
  ctx.drawImage(source,0,0,w,h);
  return(c);
}

function start(){
  var c1=scaleIt(img,1);
  canvas.width=c1.width/2;
  canvas.height=c1.height/2;
  ctx.translate(canvas.width * tootired[curTrial][2], canvas.height * tootired[curTrial][3]);
  ctx.scale(1-tootired[curTrial][2]*2, 1-tootired[curTrial][3]*2);
  ctx.drawImage(c1,0,0,canvas.width,canvas.height);

    // note : I got this from the awesome internet 
    // canvas = document.createElement('canvas');
    // canvasContext = canvas.getContext('2d');

    // canvasContext.translate(width, 0);
    // canvasContext.scale(-1, 1);
    // canvasContext.drawImage(image, 0, 0);
}


//////////////////////////////////////////////////////////////

document.addEventListener('keydown', pressKeyboard);
document.addEventListener('swiped', swipeOnPhone);

function initPicture(){
    $('#break').hide();

    erase(ctx);
    clear();
    setTimeout(function(){
        img.onload=start;
        img.src=imgSrc + tootired[curTrial][0]+tootired[curTrial][1]+'.png';
        startTrialTime = new Date().getTime();
        canResp = 1; 
        console.log(tootired[curTrial])
    },preStim)

    removeIm = setTimeout(function(){
        erase(ctx);
        clear();
    },preStim+stimDur)
}

document.addEventListener("DOMContentLoaded", function () {
    $('#startExperiment').click(Prinn);
})


function Prinn(){
    $('#instructions').hide();
    $('#startExperimentButton').hide();
    document.getElementById("startExperiment").innerHTML = "พร้อมจะไปต่อแล้วล่ะ";
    initPicture();
  }


function pressKeyboard(event){
    if (canResp && (event.key === usableKeys[0] || event.key === usableKeys[1])){
        endTrialTime = new Date().getTime(); 
        console.log('you have pressed ' + event.key)
        ans[curTrial] = event.key;
        rt[curTrial] = endTrialTime-startTrialTime;
        canResp = 0;
        trialIsOver();
    } 
}

function swipeOnPhone(event) {
    if (canResp && (event.detail.dir === swipeDir[0] || event.detail.dir === swipeDir[1])){
        endTrialTime = new Date().getTime(); 
        console.log('you have swiped ' + event.detail.dir)
        ans[curTrial] = event.detail.dir;
        rt[curTrial] = endTrialTime-startTrialTime;
        canResp = 0;
        trialIsOver();
    } 

}

function trialIsOver() {
    var curTrialStruct = {};
    curTrialStruct.heart = tootired[curTrial][0];
    curTrialStruct.imageId = tootired[curTrial][1];
    curTrialStruct.fliplr = tootired[curTrial][2];
    curTrialStruct.flipud = tootired[curTrial][3];
    curTrialStruct.ans = ans[curTrial];
    curTrialStruct.rt = rt[curTrial];
    trialStruct.push(curTrialStruct);
    curTrial = curTrial + 1 ; 

    clearTimeout(removeIm); 

    if (curTrial >= nTrials){
        Done();
    }else if(curTrial % breakEvery == 0){
        $('#frame').hide();
        $('#break').show();
        $('#startExperimentButton').show();
    } else {
        initPicture()
    }
}

//////////////////////////////////////////////////////////////

function Done() {
    $('#frame').hide();
    $("#done").show();

    var dataToServer = {};
    dataToServer.id = getParameterByName("subjectId"); /* getParameterByName("code") */
    dataToServer.experimenter = 'Chaipat';
    dataToServer.experimentName = 'cxr';
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



// =======================================================

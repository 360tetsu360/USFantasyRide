var tagName,entityName,scoreboardName,filename;
var moves;
var moveTime = 0;
var elemX = new Array();
var elemY = new Array();
var elemZ = new Array();
var elemTick = new Array();
var elemSpeed = new Array();
var func = new Array();
var finalFunc = new String();
var publicScore = 0;
console.log(moves)
onload = function(){
    moves = document.getElementById("moves")
    getScoreboardName()
    console.log(scoreboardName)
    console.log(moves)
    AddMove()
}
console.log(moves)
function getScoreboardName(){
    scoreboardName = document.getElementById("scoreboardName").value
}
function getEntity(){
    entityName =  document.getElementById("entityName").value
}
function getTag(){
    tagName =  document.getElementById("tagName").value
}
function getfileName(){
    filename = document.getElementById("file").value
}
function getMove(idx,idy,idz,tick,speed){
    func.push(
        [
            document.getElementById(idx).value,
            document.getElementById(idy).value,
            document.getElementById(idz).value,
            document.getElementById(tick).value,
            document.getElementById(speed).value
        ]
    )
}
function AddMove(){
    moveTime += 1;
    moves.insertAdjacentHTML('beforeend',
    `
    <br>
    <p>move${moveTime}</p>
    <ul>
        <li>
            block X<input type="tel" id="blockx${moveTime}">
        </li>
        <li>
            block Y<input type="tel" id="blocky${moveTime}">
        </li>
        <li>
            block Z<input type="tel" id="blockz${moveTime}">
        </li>
        <li>
            tick<input type="tel" id="tick${moveTime}">
        </li>
        <li>
            speed<input type="tel" id="speed${moveTime}">
        <li>
    </ul>`
    );
    elemX.push(`blockx${moveTime}`)
    elemY.push(`blocky${moveTime}`)
    elemZ.push(`blockz${moveTime}`)
    elemTick.push(`tick${moveTime}`)
    elemSpeed.push(`speed${moveTime}`)
}
function Generate(){
    getScoreboardName();
    getTag();
    getEntity();
    getfileName();
    for (var ele = 0; ele < moveTime; ele++) {
        console.log('a')
        getMove(
            elemX[ele],
            elemY[ele],
            elemZ[ele],
            elemTick[ele],
            elemSpeed[ele]
        )  
    }
    for (var f = 0; f < func.length; f++) {
        console.log('a')
        if(func[f][0]!=null && func[f][1]!=null && func[f][2]!=null && func[f][4]!=null){
            if(f == 0){
                finalFunc += `execute @e[type=${entityName},tag=${tagName},scores={${Number(publicScore)}..${publicScore + Number(func[f][3])}}] ~~~ tp @s ~${func[f][0] * func[f][4]}~${func[f][1] * func[f][4]}~${func[f][2] * func[f][4]}`
            }else{
                finalFunc += `\nexecute @e[type=${entityName},tag=${tagName},scores={${Number(publicScore + 1)}..${publicScore + Number(func[f][3])}}] ~~~ tp @s ~${func[f][0] * func[f][4]}~${func[f][1] * func[f][4]}~${func[f][2] * func[f][4]}`
            }
            publicScore += Number(func[f][3])
        }else if(func[f][3]!=null)
        {
            publicScore += Number(func[f][3])
        }
    }
    let blob = new Blob([finalFunc],{type:"text/plan"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.mcfunction`;
    link.click();
}
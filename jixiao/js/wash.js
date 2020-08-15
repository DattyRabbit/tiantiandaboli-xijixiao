//加载完html界面后，填充显示现有技能
initSkillPool();
fillSkill();

function fillSkill(){
    var $skillIcons = $("#skillPanel .skillIcon");
    var $skillNames = $("#skillPanel  .skillName");
    var $skillDetails = $("#skillPanel .skillDetail");
    $skillIcons.each(function(i){
        $(this).css({"background-image":"url("+ petSkillPool[i].pic +")"});
        $skillNames.get(i).innerHTML = petSkillPool[i].name;
        $skillDetails.get(i).innerHTML = petSkillPool[i].desp;
    });
}

function washSkill(index){
    setSkillPool();
    var newSkill = getNewSkill();
    fillWashSuccessPanel(petSkillPool[index], newSkill);
    return newSkill;
}

/**
 * 在备选池中随机选出一个新的技能
 */
function getNewSkill(){
    var index = Math.floor(Math.random() * randomSkillPool.length);
    return randomSkillPool[index];
}

/**
 * 根据现有宠物技能重新设置备选技能池
 */
function setSkillPool(skillPoolWithOutJixiaoDa){
    randomSkillPool = [];
    var skillMaps = skillPoolWithOutJixiaoDa != undefined ? skillPoolWithOutJixiaoDa : skillMap;
    for(var key in skillMaps)  {
        var hasFitSkill = false;
        var sameName = false;
        var timeLimit = false;
        var doubleFriend = 0;
        var doubleBane = 0;
        for(var key1 in petSkillPool){
            //排除掉相同的技能，以及如果有适应类型的技能，将其他的适应技能排除在外
            if(petSkillPool[key1].type == "fit"){
                hasFitSkill = true
            }
            if(skillMaps[key].name == petSkillPool[key1].name){
                sameName = true;
            }
            if(petSkillPool[key1].type == "friend"){
                doubleFriend++;
            }
            if(petSkillPool[key1].type == "bane"){
                doubleBane++;
            }
            // if(petSkillPool[key1].type == "special_time"){
            //     timeLimit = true;
            // }
        }
        if(sameName || (timeLimit && skillMaps[key].type == "special_time") || (hasFitSkill && skillMaps[key].type == "fit")
        || (doubleFriend == 2 && skillMaps[key].type == "friend")|| (doubleBane == 2 && skillMaps[key].type == "bane")){
            continue;
        }
        //满足的技能放入备选池
        randomSkillPool.push(skillMaps[key]);
    };
}

/**
 * 每次洗练完毕之后进行检查
 */
function checkSkill(){
    //增加洗练次数
    washCount++;
    //显示洗练次数
    showWashCount();
}

/**
 * 显示洗练次数
 */
function showWashCount(){
    //显示洗练次数
    $("#washCount").html("已洗练"+washCount+"次,\n已使用"+washCount*5+"碎片");
    $("#washCost").html("约等于花费 "+ washCount * 2.5 +" m！");
}
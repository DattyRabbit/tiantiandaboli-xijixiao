function Skill(name, desp, pic, type){
    var skill = {};
    skill.name = name;
    skill.desp = desp;
    skill.pic = pic;
    skill.type = type;
    return skill
}

/**
 * 洗练次数
 * @type {number}
 */
var washCount = 0;

/**
 * 全部原始技能池
 */
var skillPool = [
    //xx之友系列
    Skill("不死之友","提高与不死系一起探险的成功率","../file/pic/不死之友.jpg","friend"),
    Skill("人类之友","提高与人类系一起探险的成功率","../file/pic/人类之友.jpg","friend"),
    Skill("天使之友","提高与天使系一起探险的成功率","../file/pic/天使之友.jpg","friend"),
    Skill("恶魔之友","提高与恶魔系一起探险的成功率","../file/pic/恶魔之友.jpg","friend"),
    Skill("昆虫之友","提高与昆虫系一起探险的成功率","../file/pic/昆虫之友.jpg","friend"),
    Skill("植物之友","提高与植物系一起探险的成功率","../file/pic/植物之友.jpg","friend"),
    //xx克星系列
    Skill("不死克星","提高战胜不死系的成功率","../file/pic/不死克星.jpg","bane"),
    Skill("人类克星","提高战胜人类系的成功率","../file/pic/人类克星.jpg","bane"),
    Skill("天使克星","提高战胜天使系的成功率","../file/pic/天使克星.jpg","bane"),
    Skill("恶魔克星","提高战胜恶魔系的成功率","../file/pic/恶魔克星.jpg","bane"),
    Skill("昆虫克星","提高战胜昆虫系的成功率","../file/pic/昆虫克星.jpg","bane"),
    Skill("植物克星","提高战胜植物系的成功率","../file/pic/植物克星.jpg","bane"),
    Skill("动物克星","提高战胜动物系的成功率","../file/pic/动物克星.jpg","bane"),
    //xx适应系列
    Skill("沙漠适应","提高在沙漠赢得战斗的几率","../file/pic/沙漠适应.jpg","fit"),
    Skill("地下适应","提高在地下赢得战斗的几率","../file/pic/地下适应.jpg","fit"),
    Skill("沼泽适应","提高在沼泽赢得战斗的几率","../file/pic/沼泽适应.jpg","fit"),
    Skill("森林适应","提高在森林赢得战斗的几率","../file/pic/森林适应.jpg","fit"),
    Skill("山地适应","提高在山地赢得战斗的几率","../file/pic/山地适应.jpg","fit"),
    Skill("平原适应","提高在平原赢得战斗的几率","../file/pic/平原适应.jpg","fit"),
    //特殊技能
    Skill("优等生","此宠物获得的基础经验提高50%","../file/pic/优等生.jpg","special"),
    Skill("齐头并进","当前任务中的所有宠物基础经验提高30%","../file/pic/齐头并进.jpg","special"),
    Skill("耐力持久","提高时间大于7小时的探险成功率","../file/pic/耐力持久.jpg","special_time"),
    Skill("能量爆发","提高时间少于7小时的探险成功率","../file/pic/能量爆发.jpg","special_time"),
    Skill("食物链制霸","提高战胜多种怪物几率","../file/pic/食物链制霸.jpg","special"),
    Skill("探险能手","额外提高探险成功率","../file/pic/探险能手.jpg","special"),
    Skill("探险老手","大幅提高探险成功率","../file/pic/探险老手.jpg","special"),
    Skill("探险达人","极大提高探险成功率","../file/pic/探险达人.jpg","special"),
    Skill("急行者","探险时间缩短50%","../file/pic/急行者.jpg","special"),
    Skill("效率至上","获得的特殊奖励数量提高100%","../file/pic/效率至上.jpg","special")
];

/**
 * 初始化宠物技能map,技能名称为KEY
 */
var skillMap = {};
for(var i = 0; i < skillPool.length; i++){
    skillMap[skillPool[i].name] = skillPool[i];
}

/**
 * 洗练时备选技能池
 */
var randomSkillPool = [];


/**
 * 宠物当前拥有的技能
 * @type {{}}
 */
var petSkillPool = {};

/**
 * 洗练获得的新技能
 * @type {{}}
 */
var newSkill = {};

/**
 * 初始化技能池
 */
function initSkillPool(){
    //重置洗练次数
    washCount = 0;
    //先清空技能池
    petSkillPool = {};
    //再随机3个技能，
    petSkillPool[0] = createSkill();
    petSkillPool[1] = createSkill();
    petSkillPool[2] = createSkill();
}

/**
 * 重置宠物技能时，新创建一个技能
 */
function createSkill(){
    var skillPoolWithOutJixiaoDa = $.extend({},skillPool,true);
    delete skillPoolWithOutJixiaoDa[28];
    delete skillPoolWithOutJixiaoDa[27];
    delete skillPoolWithOutJixiaoDa[26];
    setSkillPool(skillPoolWithOutJixiaoDa);
    var newSkill = getNewSkill();
    return newSkill;
}

/**
 * 重置技能
 */
function resetSkill(){
    //初始化技能.
    initSkillPool();
    //重新渲染技能和显示洗练次数
    fillSkill();
    showWashCount();
}


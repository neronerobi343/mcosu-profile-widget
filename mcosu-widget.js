const JSON_PATH = "./exampleStats.json"

// ========== HELPER FUNCTIONS ==========
function createElement(tag, content, attributes, children) {
    const ele = document.createElement(tag);

    const classAttr = attributes.class;
    const classes = attributes.classes; //string[]
    const id = attributes.id;
    const src = attributes.src;
    const href = attributes.href;
    const title = attributes.title;

    if (classAttr) {
        ele.classList.add(classAttr);
    } else if (classes) {
        classes.forEach(c => ele.classList.add(c));
    }

    if (id) ele.classList.add(id);
    if (title) ele.title = title;
    
    if (tag === "img") {
        if (!src) throw new Error("createElement(): Source not given for img");
        
        ele.src = src;
    }
    
    if (tag === "a") {
        if (!href) throw new Error("createElement(): Source not given for a");
        ele.href = href;
    }
    
    if (content) {
        const textContent = document.createTextNode(content);
        ele.append(textContent);
    }
    
    if (children) ele.append(...children);
    
    return ele;
}


function createModsStr(mods) {
    if (mods.length > 1) {
        let modStr = "+";
        for (let i = 0; i < mods.length; i++) {
            if (i === mods.length - 1) {
                modStr += mods[i];
            } else {
                modStr += `${mods[i]},`
            }
        }
        return modStr;
    } else if (mods.length === 1) {
        return `+${mods[0]}`;
    }
    
    return "";
}

function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));

    const format = (value, unit, useAbout = false) => {
        const base = `${value} ${unit}${value === 1 ? '' : 's'}`;
        return `${useAbout ? 'about ' : ''}${base} ago`;
    };

    if (seconds < 60) {
        return format(seconds, 'second', true);
    } else if (minutes < 60) {
        return format(minutes, 'minute', true);
    } else if (hours < 48) {
        return format(hours, 'hour', true);
    } else if (days < 31) {
        return format(days, 'day');
    } else if (months < 12) {
        return format(months, 'month');
    } else {
        return format(years, 'year');
    }
}


// ========== CREATE HTML NODES ==========
function createStats(widget) {
    const playerStats = createElement("div", null, {class: "player-stats"}, [

    ]);
    
    widget.append(playerStats);
}

function createScoreEntry(score, includeWeights) {
    const beatmapDetails = createElement("div", null, {class: "beatmap-details"}, [
                               createElement("div", score.grade, {classes: ["grade", score.grade]}),
                               createElement("a", `${score.artist} - ${score.beatmapName} [${score.difficultyName}]`, {class: "beatmap", href: score.beatmapSetId !== "" ? `https://osu.ppy.sh/beatmapsets/${score.beatmapSetId}` : "#"}),
                               createElement("div", `x${(score.speedMultiplier).toFixed(2)}`, {class: "speed-multiplier"}),
                               createElement("div", createModsStr(score.mods), {class: "mods"}),
                               createElement("div", `(${(score.accuracy).toFixed(2)}%)`, {class: "accuracy"}),
                               createElement("div", timeAgo(score.date), {class: "date", title: score.date}),
                           ])
    const ppDetails = createElement("div", null, {class: "pp-details"}, [
                          createElement("div", `${Math.round(score.rawPP)}pp`, {class: "raw"}),
                      ])
    if (includeWeights) ppDetails.append(createElement("div", `weighted ${Math.round(score.weight)}% (${Math.round(score.weightPP)}pp)`, {class: "weight-details"}));

    return createElement("div", null, {class: "score"}, [beatmapDetails, ppDetails]);
}

function createScoreList(scores, scoreType, headingStr, widget, includeWeights) {
    const scoreList = createElement("section", null, {class: scoreType});
    scoreList.append(createElement("h2", headingStr, {}));
    for (let i = 0; i < scores.length; i++) {
        scoreList.append(createScoreEntry(scores[i], includeWeights));
    }

    widget.append(scoreList);
}

async function createWidget() {
    const r = await fetch(JSON_PATH);
    const { playerStats, topScores, recentScores } = await r.json();
    const widget = document.querySelector("#mcosu-widget");
    
    if (playerStats) createStats(widget);   
    if (topScores) createScoreList(topScores, "top-scores", "Top Ranks", widget, true);
    if (recentScores) createScoreList(recentScores, "recent-scores", "Recent Plays", widget, false);
}

createWidget();

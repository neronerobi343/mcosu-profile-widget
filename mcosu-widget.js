async function createWidget() {
    const r = await fetch('./exampleStats.json');
    const { playerStats, topScores, recentScores } = await r.json();
    
    if (playerStats) {
        // const statsContainer = 
    }
    
    if (topScores) {
        
    }
    
    if (recentScores) {
        
    }
}

createWidget();

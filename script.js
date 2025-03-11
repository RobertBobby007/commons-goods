// Třídy pro hráče
class Player {
    constructor(name, strategy) {
        this.name = name;
        this.balance = 10; // Počáteční zůstatek
        this.strategy = strategy; // Strategie hráče
    }

    // Funkce pro výpočet příspěvku podle strategie
    contribute(players) {
        switch (this.strategy) {
            case 'fair':
                return this.balance * 0.5; // Férový hráč přispívá 50 %
            case 'selfish':
                return 0; // Sobecký hráč nepřispívá
            case 'reactive':
                let averageContribution = players.reduce((sum, player) => sum + player.lastContribution, 0) / players.length;
                return averageContribution; // Reaktivní hráč přispívá podle průměru ostatních
            case 'random':
                return Math.random() * this.balance; // Náhodný hráč přispívá náhodně
            default:
                return 0;
        }
    }

    // Funkce pro zisk po kole
    getReward(totalContributed) {
        let totalFund = totalContributed * 1.5; // Koeficient pro zvýšení fondu
        return totalFund / 4; // Výdělek je rovnoměrně rozdělen mezi všechny hráče
    }
}

function simulateRound(players) {
    // Každý hráč přispívá
    let totalContributed = 0;
    players.forEach(player => {
        let contribution = player.contribute(players);
        totalContributed += contribution;
        player.lastContribution = contribution; // Uložení příspěvku pro reaktivní hráče
    });

    // Každý hráč dostane podíl z celkového fondu
    players.forEach(player => {
        let reward = player.getReward(totalContributed);
        player.balance += reward - player.lastContribution; // Příspěvek je odečten, výhra je přičtena
    });
}

// Vytvoření hráčů se strategií
let players = [
    new Player('Hráč 1', 'fair'),
    new Player('Hráč 2', 'selfish'),
    new Player('Hráč 3', 'reactive'),
    new Player('Hráč 4', 'random')
];

// Simulace několika kol
for (let round = 1; round <= 5; round++) {
    console.log(`Kolo ${round}:`);
    simulateRound(players);
    players.forEach(player => {
        console.log(`${player.name} má zůstatek: ${player.balance.toFixed(2)}`);
    });
    console.log('---');
}

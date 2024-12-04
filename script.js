// Game state
let openedGifts = [];
let currentTask = null;
let tasks = [];
let gameStarted = false;

// All possible tasks
const allTasks = [
    "Nodziediet 'Zvaniņš skan' pirmo pantu",
    "Pastāstiet savu mīļāko Ziemassvētku atmiņu",
    "Parādiet savu labāko Ziemassvētku vecīša imitāciju",
    "Nosauciet 3 Ziemassvētku filmas",
    "Parādiet, kā jūs dejotu ap eglīti",
    "Pastāstiet jautru Ziemassvētku joku",
    "Nosauciet 3 tradicionālos Ziemassvētku ēdienus",
    "Imitējiet ziemeļbriedi Rūdolfu",
    "Pastāstiet, ko vēlaties Ziemassvētkos",
    "Parādiet, kā izskatās sniegpārsliņa dejojot",
    "Noskaitiet Ziemassvētku dzejolīti",
    "Parādiet, kā rotājat eglīti",
    "Nosauciet 3 Ziemassvētku tradīcijas",
    "Pastāstiet, kāda ir jūsu sapņu dāvana",
    "Parādiet Ziemassvētku piparkūku ēšanas pantomīmu",
    "Nodziediet 'Klusa nakts' pirmo rindiņu",
    "Pastāstiet par smieklīgāko Ziemassvētku dāvanu",
    "Parādiet, kā slidojat pa ledu",
    "Imitējiet eglītes rotājumu",
    "Pastāstiet savu Ziemassvētku vēlējumu kolēģiem",
    "Imitējiet sniegavīra veidošanu",
    "Nodziediet 'Reiz mežā dzima eglīte' pirmo pantu",
    "Pastāstiet par savām Ziemassvētku tradīcijām",
    "Parādiet, kā jūs atverat dāvanu",
    "Nosauciet 5 Ziemassvētku dziesmas",
    "Imitējiet sniega eņģeļa veidošanu",
    "Pastāstiet par savu mīļāko Ziemassvētku ēdienu",
    "Parādiet, kā mīcat piparkūku mīklu",
    "Nosauciet 3 Ziemassvētku rotājumus",
    "Imitējiet sniega piku mešanu",
    "Pastāstiet par savu ideālo Ziemassvētku vakaru",
    "Parādiet, kā iesaiņojat dāvanu",
    "Nodziediet jebkuru Ziemassvētku dziesmu refrēnu"
];

// DOM Elements
const setupScreen = document.getElementById('setupScreen');
const gameScreen = document.getElementById('gameScreen');
const playerCountInput = document.getElementById('playerCount');
const startGameBtn = document.getElementById('startGameBtn');
const resetBtn = document.getElementById('resetBtn');
const giftsGrid = document.getElementById('giftsGrid');
const currentTaskAlert = document.getElementById('currentTask');
const taskText = document.getElementById('taskText');
const congratsModal = document.getElementById('congratsModal');

// Event Listeners
playerCountInput.addEventListener('input', handlePlayerCountChange);
startGameBtn.addEventListener('click', handleStartGame);
resetBtn.addEventListener('click', resetGame);

function handlePlayerCountChange(event) {
    const count = parseInt(event.target.value);
    startGameBtn.disabled = !count || count < 1 || count > 20;
}

function handleStartGame() {
    const count = parseInt(playerCountInput.value);
    if (count > 0 && count <= 20) {
        const shuffled = [...allTasks].sort(() => 0.5 - Math.random());
        tasks = shuffled.slice(0, count);
        gameStarted = true;
        setupScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        createGiftCards();
    }
}

function createGiftCards() {
    giftsGrid.innerHTML = '';
    tasks.forEach((_, index) => {
        const card = document.createElement('div');
        card.className = 'card gift-card';
        card.innerHTML = `
            <div class="gift-card-content">
                ${createGiftIcon()}
                <p class="mt-2 text-center font-medium">
                    Dāvana #${index + 1}
                </p>
            </div>
        `;
        card.addEventListener('click', () => handleGiftClick(index));
        giftsGrid.appendChild(card);
    });
}

function createGiftIcon() {
    return `
        <svg class="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
        </svg>
    `;
}

function createCheckIcon() {
    return `
        <svg class="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    `;
}

function handleGiftClick(index) {
    if (!openedGifts.includes(index)) {
        openedGifts.push(index);
        currentTask = tasks[index];
        updateUI(index);
        
        if (openedGifts.length === tasks.length) {
            setTimeout(showCongratsModal, 1000);
        }
    }
}

function updateUI(index) {
    // Update gift card
    const giftCard = giftsGrid.children[index];
    giftCard.classList.add('opened');
    giftCard.querySelector('.gift-card-content').innerHTML = `
        ${createCheckIcon()}
        <p class="mt-2 text-center font-medium">
            Dāvana #${index + 1}
        </p>
    `;

    // Show current task
    currentTaskAlert.classList.remove('hidden');
    taskText.textContent = currentTask;
}

function showCongratsModal() {
    congratsModal.classList.remove('hidden');
}

function hideCongratsModal() {
    congratsModal.classList.add('hidden');
}

function resetGame() {
    openedGifts = [];
    currentTask = null;
    tasks = [];
    gameStarted = false;
    
    // Reset UI
    setupScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    currentTaskAlert.classList.add('hidden');
    congratsModal.classList.add('hidden');
    playerCountInput.value = '';
    startGameBtn.disabled = true;
}
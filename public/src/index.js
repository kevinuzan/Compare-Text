let rodadaAtual = 0; // Global variable to track the current round number

/**
 * Calculates the total points for a player in a specific game based on input values.
 * @param {number} jogador - The player number (e.g., 1, 2).
 * @param {string} jogo - The game identifier ("SSAP" or "encantados").
 * @returns {number} The total points for the player in the current round.
 */
function calcularPontosJogador(jogador, jogo) {
    let totalRodada = 0;

    if (jogo === "SSAP") {
        const par = parseInt(document.getElementById(`par-${jogador}`).value) * 2 || 0;
        const animal = parseInt(document.getElementById(`animal-${jogador}`).value) || 0;
        const colecao = parseInt(document.getElementById(`colecao-${jogador}`).value) || 0;
        const bonus = parseInt(document.getElementById(`bonus-${jogador}`).value) || 0;
        const ultima = parseInt(document.getElementById(`ultima-${jogador}`).value) || 0;
        totalRodada = par + animal + colecao + bonus + ultima;
        document.getElementById(`total-rodada-${jogador}`).innerText = totalRodada;
    } else if (jogo === "encantados") {
        const jardim = parseInt(document.getElementById(`jardim-${jogador}`).value) || 0;
        const cancao = parseInt(document.getElementById(`cancao-${jogador}`).value) || 0;
        const bonusEncantados = parseInt(document.getElementById(`bonusEncantados-${jogador}`).value) || 0;
        totalRodada = jardim + cancao + bonusEncantados;
        document.getElementById(`totalRodadaEncantados-${jogador}`).innerText = totalRodada;
    } else if (jogo === "agricola") {
        var Campos = parseInt(document.getElementById(`Campos-${jogador}`).value) || 0;
        var Pastagens = parseInt(document.getElementById(`Pastagens-${jogador}`).value) || 0;
        var Graos = parseInt(document.getElementById(`Graos-${jogador}`).value) || 0;
        var Vegetais = parseInt(document.getElementById(`Vegetais-${jogador}`).value) || 0;
        var Ovelhas = parseInt(document.getElementById(`Ovelhas-${jogador}`).value) || 0;
        var Javalis = parseInt(document.getElementById(`Javalis-${jogador}`).value) || 0;
        var Gado = parseInt(document.getElementById(`Gado-${jogador}`).value) || 0;
        var CasasBarro = parseInt(document.getElementById(`CasasBarro-${jogador}`).value) || 0;
        var CasasPedra = parseInt(document.getElementById(`CasasPedra-${jogador}`).value) * 2 || 0;
        var Membro = parseInt(document.getElementById(`Membro-${jogador}`).value) * 3 || 0;
        var EstabuloCercado = parseInt(document.getElementById(`EstabuloCercado-${jogador}`).value) * 3 || 0;
        var FazendaEmBranco = parseInt(document.getElementById(`FazendaEmBranco-${jogador}`).value) * (-1) || 0;
        var BonusAgricola = parseInt(document.getElementById(`BonusAgricola-${jogador}`).value) || 0;
        // Campos conversion
        if (Campos <= 1) {
            Campos = -1;
        } else if (Campos == 2) {
            Campos = 1;
        } else if (Campos == 3) {
            Campos = 2;
        } else if (Campos == 4) {
            Campos = 3;
        } else if (Campos >= 5) {
            Campos = 4;
        }

        // Pastagens conversion
        if (Pastagens == 0) {
            Pastagens = -1;
        } else if (Pastagens == 1) {
            Pastagens = 1;
        } else if (Pastagens == 2) {
            Pastagens = 2;
        } else if (Pastagens == 3) {
            Pastagens = 3;
        } else if (Pastagens >= 4) {
            Pastagens = 4;
        }

        // Graos conversion
        if (Graos == 0) {
            Graos = -1;
        } else if (Graos >= 1 && Graos <= 3) {
            Graos = 1;
        } else if (Graos >= 4 && Graos <= 5) {
            Graos = 2;
        } else if (Graos >= 6 && Graos <= 7) {
            Graos = 3;
        } else if (Graos >= 8) {
            Graos = 4;
        }

        // Vegetais conversion
        if (Vegetais == 0) {
            Vegetais = -1;
        } else if (Vegetais == 1) {
            Vegetais = 1;
        } else if (Vegetais == 2) {
            Vegetais = 2;
        } else if (Vegetais == 3) {
            Vegetais = 3;
        } else if (Vegetais >= 4) {
            Vegetais = 4;
        }

        // Ovelhas conversion
        if (Ovelhas == 0) {
            Ovelhas = -1;
        } else if (Ovelhas >= 1 && Ovelhas <= 3) {
            Ovelhas = 1;
        } else if (Ovelhas >= 4 && Ovelhas <= 5) {
            Ovelhas = 2;
        } else if (Ovelhas >= 6 && Ovelhas <= 7) {
            Ovelhas = 3;
        } else if (Ovelhas >= 8) {
            Ovelhas = 4;
        }

        // Javalis conversion
        if (Javalis == 0) {
            Javalis = -1;
        } else if (Javalis >= 1 && Javalis <= 2) {
            Javalis = 1;
        } else if (Javalis >= 3 && Javalis <= 4) {
            Javalis = 2;
        } else if (Javalis >= 5 && Javalis <= 6) {
            Javalis = 3;
        } else if (Javalis >= 7) {
            Javalis = 4;
        }

        // Gado conversion
        if (Gado == 0) {
            Gado = -1;
        } else if (Gado == 1) {
            Gado = 1;
        } else if (Gado >= 2 && Gado <= 3) {
            Gado = 2;
        } else if (Gado >= 4 && Gado <= 5) {
            Gado = 3;
        } else if (Gado >= 6) {
            Gado = 4;
        }


        totalRodada = Campos + Pastagens + Graos + Vegetais + Ovelhas + Javalis + Gado + CasasBarro + CasasPedra + Membro + EstabuloCercado + FazendaEmBranco + BonusAgricola
        document.getElementById(`totalGeralAgricola-${jogador}`).innerText = totalRodada;
    }
    return totalRodada;
}

/**
 * Updates the total points for all players in the currently selected game.
 * @param {string} jogo - The game identifier ("SSAP" or "encantados").
 */
function atualizarTodos(jogo) {
    // Determine the maximum number of players based on the game
    let valMax = 0;
    if (jogo === "SSAP" || jogo === "agricola") {
        valMax = 5; // Assuming 5 players for SSAP
    } else if (jogo === "encantados") {
        valMax = 2; // Assuming 2 players for Encantados
    }

    for (let i = 1; i <= valMax; i++) {
        calcularPontosJogador(i, jogo);
    }
}

// Lists of input prefixes to identify which game's inputs are being interacted with
const listaSSAP = ["nome", "par", "animal", "colecao", "bonus", "ultima", "total-rodada"]; // Added 'ultima' and 'total-rodada' to ensure it's captured
// Removed 'colecao' if it's not an input for Encantados, and added 'totalRodadaEncantados'
const listaEncantados = ["nomeEncantados", "jardim", "cancao", "bonusEncantados", "totalRodadaEncantados"];
// Removed 'colecao' if it's not an input for Encantados, and added 'totalRodadaEncantados'
const listaAgricola = ["Campos",
    "Pastagens",
    "Graos",
    "Vegetais",
    "Ovelhas",
    "Javalis",
    "Gado",
    "CasasBarro",
    "CasasPedra",
    "BonusAgricola",
    "Membro",
    "EstabuloCercado",
    "FazendaEmBranco"];

// Event listener for input changes on number fields
document.addEventListener('input', function (event) {
    if (event.target.matches('input[type="number"]')) {
        const inputIdPrefix = event.target.id.split("-")[0];
        let detectedGame = '';

        if (listaSSAP.includes(inputIdPrefix)) {
            detectedGame = "SSAP";
        } else if (listaEncantados.includes(inputIdPrefix)) {
            detectedGame = "encantados";
        } else if (listaAgricola.includes(inputIdPrefix)) {
            detectedGame = "agricola";
        }

        if (detectedGame) {
            atualizarTodos(detectedGame);
        }
    }
});

/**
 * Saves the current round's scores, updates the table, and clears input fields.
 * For "encantados", it also saves the data to localStorage.
 */
function salvarRodada() {
    rodadaAtual++; // Increment the round number
    const jogoSelecionado = document.getElementById('seletorJogo').value;
    let tabelaId = '';
    let totalGeralIdPrefix = '';
    let gameTypeForCalculation = ''; // Used for 'calcularPontosJogador'

    if (jogoSelecionado === "encantados") {
        tabelaId = "tabela-pontos-encantados";
        totalGeralIdPrefix = "totalGeralEncantados";
        gameTypeForCalculation = "encantados";
    } else if (jogoSelecionado === "ssap") {
        tabelaId = "tabela-pontos";
        totalGeralIdPrefix = "total-geral";
        gameTypeForCalculation = "SSAP";
    } else {
        console.warn("Nenhum jogo válido selecionado para salvar a rodada.");
        return; // Exit if no game is selected or recognized
    }

    const tabela = document.getElementById(tabelaId);
    if (!tabela) {
        console.error(`Tabela com ID '${tabelaId}' não encontrada.`);
        return;
    }
    const headerRow = tabela.querySelector('thead tr');
    if (!headerRow) {
        console.error(`Cabeçalho da tabela com ID '${tabelaId}' não encontrado.`);
        return;
    }

    // Create the new Round column in the header
    const novaTh = document.createElement('th');
    novaTh.innerText = `Rodada ${rodadaAtual}`;
    // Insert before the last child (which should be "Total Geral")
    headerRow.insertBefore(novaTh, headerRow.lastElementChild);

    let numPlayers = 0;
    if (jogoSelecionado === "ssap") numPlayers = 5; else numPlayers = 2;

    // Object to store scores for the current round for localStorage
    const currentRoundScores = {};

    // Add each player's score to the new column and update total general
    for (let i = 1; i <= numPlayers; i++) {
        const totalRodada = calcularPontosJogador(i, gameTypeForCalculation); // Calculate current round score

        const row = tabela.querySelector(`tbody tr:nth-child(${i})`);
        if (!row) {
            console.error(`Linha para o Jogador ${i} não encontrada na tabela ${tabelaId}.`);
            continue;
        }
        const novaTd = document.createElement('td');
        novaTd.innerText = totalRodada;
        // Insert before the last child (which should be the Total Geral cell)
        row.insertBefore(novaTd, row.lastElementChild);

        // Update the Total Geral
        const totalGeralSpan = document.getElementById(`${totalGeralIdPrefix}-${i}`);
        if (totalGeralSpan) {
            const totalAnterior = parseInt(totalGeralSpan.innerText) || 0;
            totalGeralSpan.innerText = totalAnterior + totalRodada;
        } else {
            console.error(`Elemento totalGeralSpan para o Jogador ${i} com ID '${totalGeralIdPrefix}-${i}' não encontrado.`);
        }


        // Store the score for this player in the current round data
        currentRoundScores[i] = totalRodada;

        // Clear inputs for the next round
        if (gameTypeForCalculation === "SSAP") {
            document.getElementById(`par-${i}`).value = 0;
            document.getElementById(`animal-${i}`).value = 0;
            document.getElementById(`colecao-${i}`).value = 0;
            document.getElementById(`bonus-${i}`).value = 0;
            document.getElementById(`ultima-${i}`).value = 0;
            document.getElementById(`total-rodada-${i}`).innerText = 0;
        } else if (gameTypeForCalculation === "encantados") {
            document.getElementById(`jardim-${i}`).value = 0;
            document.getElementById(`cancao-${i}`).value = 0;
            document.getElementById(`bonusEncantados-${i}`).value = 0;
            document.getElementById(`totalRodadaEncantados-${i}`).innerText = 0;
        }
    }

    // Save current round data to localStorage ONLY if it's Encantados
    if (gameTypeForCalculation === "encantados") {
        let encantadosRounds = JSON.parse(localStorage.getItem('encantadosRounds')) || [];
        encantadosRounds.push(currentRoundScores);
        try {
            localStorage.setItem('encantadosRounds', JSON.stringify(encantadosRounds));
            localStorage.setItem('encantadosRodadaAtual', rodadaAtual.toString());
            console.log("Dados de Encantados salvos no localStorage:", encantadosRounds, "Rodada:", rodadaAtual);
        } catch (e) {
            console.error("Erro ao salvar dados de Encantados no localStorage:", e);
            alert("Não foi possível salvar os dados do jogo. Seu navegador pode estar no modo de navegação privada ou o armazenamento está cheio.");
        }
    }
}

/**
 * Clears all saved rounds and resets the game for the selected game.
 */
function limparJogo() {
    const confirmar = confirm("Tem certeza que deseja limpar todas as rodadas e começar um novo jogo?");
    if (!confirmar) {
        return; // User cancelled
    }

    const jogoSelecionado = document.getElementById('seletorJogo').value;
    let tabelaId = '';
    let totalGeralIdPrefix = '';
    let gameType = '';

    if (jogoSelecionado === "encantados") {
        tabelaId = "tabela-pontos-encantados";
        totalGeralIdPrefix = "totalGeralEncantados";
        gameType = "encantados";
    } else if (jogoSelecionado === "ssap") {
        tabelaId = "tabela-pontos";
        totalGeralIdPrefix = "total-geral";
        gameType = "SSAP";
    } else if (jogoSelecionado === "agricola") {
        tabelaId = "tabela-pontos-agricola";
        totalGeralIdPrefix = "totalGeralAgricola";
        gameType = "agricola";
    } else {
        console.warn("Nenhum jogo válido selecionado para limpar.");
        return;
    }

    const table = document.getElementById(tabelaId);
    if (!table) {
        console.error(`Tabela com ID '${tabelaId}' não encontrada para limpeza.`);
        return;
    }
    const headerRow = table.rows[0];
    if (!headerRow) {
        console.error(`Cabeçalho da tabela com ID '${tabelaId}' não encontrado para limpeza.`);
        return;
    }

    // 1) Remove all past round columns from header and body
    // Iterate backwards to avoid issues with changing indices
    // Keep 'Jogador' (index 0) and 'Total Geral' (last element)
    for (let i = headerRow.cells.length - 2; i > 0; i--) {
        if (headerRow.cells[i].innerText.startsWith("Rodada")) {
            // Remove the cell from each row corresponding to this round
            for (let j = 0; j < table.rows.length; j++) {
                if (table.rows[j].cells[i]) { // Ensure the cell exists before deleting
                    table.rows[j].deleteCell(i);
                }
            }
        }
    }

    let numPlayers = 0;
    if (jogoSelecionado === "ssap" || jogoSelecionado === "agricola") numPlayers = 5; else numPlayers = 2;

    // Reset Total Geral for all players
    for (let i = 1; i <= numPlayers; i++) {
        const totalGeralSpan = document.getElementById(`${totalGeralIdPrefix}-${i}`);
        if (totalGeralSpan) {
            totalGeralSpan.innerText = 0;
        }
    }

    rodadaAtual = 0; // Reset global round counter

    // Clear localStorage for the specific game
    if (gameType === "encantados") {
        localStorage.removeItem('encantadosRounds');
        localStorage.removeItem('encantadosRodadaAtual');
        console.log("Dados de Encantados limpos do localStorage.");
    }
    // If you implement localStorage for SSAP, clear it here as well
    // else if (gameType === "SSAP") {
    //     localStorage.removeItem('ssapRounds');
    //     localStorage.removeItem('ssapRodadaAtual');
    // }

    alert("Jogo limpo! Você pode começar uma nova série de rodadas.");
}

/**
 * Hides/shows the appropriate game placar based on the selected game.
 * Also triggers loading of saved data for the selected game.
 */
function trocarJogo() {
    const jogoSelecionado = document.getElementById('seletorJogo').value;

    // Hide all game placar divs
    document.querySelectorAll('.placar-jogo').forEach(div => div.style.display = 'none');

    // Show the selected game placar div
    if (jogoSelecionado === 'ssap') {
        document.getElementById('placar-ssap').style.display = 'block';
        // You might want to call a load function for SSAP here if you implement it
    } else if (jogoSelecionado === 'agricola') {
        document.getElementById('placar-agricola').style.display = 'block';
    } else if (jogoSelecionado === 'encantados') {
        document.getElementById('placar-encantados').style.display = 'block';
        carregarEncantados(); // This is crucial: load Encantados data when it's selected
    }
}

/**
 * NEW FUNCTION: Loads saved "Encantados" game data from localStorage and rebuilds the table.
 */
function carregarEncantados() {
    console.log("Tentando carregar dados de Encantados...");
    const savedRodadaAtual = parseInt(localStorage.getItem('encantadosRodadaAtual')) || 0;
    const savedRounds = JSON.parse(localStorage.getItem('encantadosRounds')) || [];

    // Get table elements
    const tabela = document.getElementById("tabela-pontos-encantados");
    if (!tabela) {
        console.error("Tabela de Encantados (id: tabela-pontos-encantados) não encontrada ao carregar.");
        return;
    }
    const headerRow = tabela.querySelector('thead tr');
    const tbody = tabela.querySelector('tbody');

    if (!headerRow || !tbody) {
        console.error("Cabeçalho ou corpo da tabela de Encantados não encontrado ao carregar.");
        return;
    }

    // 1. Clean up existing dynamic columns (Rodada X) before re-adding them
    // Iterate backwards from the second to last cell to avoid issues with changing indices
    // We want to keep the player name column (index 0) and Total Geral (last cell)
    for (let i = headerRow.cells.length - 2; i > 0; i--) {
        if (headerRow.cells[i].innerText.startsWith("Rodada")) {
            for (let j = 0; j < tabela.rows.length; j++) {
                if (tabela.rows[j].cells[i]) {
                    tabela.rows[j].deleteCell(i);
                }
            }
        }
    }

    // Reset global rodadaAtual for reconstruction
    rodadaAtual = 0;
    let numPlayers = 2; // Fixed number of players for Encantados

    // Reset Total Geral spans before re-calculating
    for (let i = 1; i <= numPlayers; i++) {
        const totalGeralSpan = document.getElementById(`totalGeralEncantados-${i}`);
        if (totalGeralSpan) {
            totalGeralSpan.innerText = 0;
        }
    }

    // 2. Re-add saved rounds to the table
    if (savedRounds.length > 0) {
        console.log("Dados salvos encontrados:", savedRounds);
        savedRounds.forEach((roundData, index) => {
            rodadaAtual = index + 1; // Update global rodadaAtual based on the loaded rounds

            // Add header for this round
            const novaTh = document.createElement('th');
            novaTh.innerText = `Rodada ${rodadaAtual}`;
            // Insert before the last child (Total Geral)
            headerRow.insertBefore(novaTh, headerRow.lastElementChild);

            // Add scores for each player in this round
            for (let i = 1; i <= numPlayers; i++) {
                const row = tabela.querySelector(`tbody tr:nth-child(${i})`);
                if (row) {
                    const novaTd = document.createElement('td');
                    // Use saved score, default to 0 if not found for some reason
                    novaTd.innerText = roundData[i] !== undefined ? roundData[i] : 0;
                    // Insert before the last child (Total Geral cell)
                    row.insertBefore(novaTd, row.lastElementChild);

                    // Update the Total Geral as we re-add each round's score
                    const totalGeralSpan = document.getElementById(`totalGeralEncantados-${i}`);
                    if (totalGeralSpan) {
                        const currentTotal = parseInt(totalGeralSpan.innerText) || 0;
                        totalGeralSpan.innerText = currentTotal + (roundData[i] !== undefined ? roundData[i] : 0);
                    }
                }
            }
        });
        rodadaAtual = savedRodadaAtual; // Restore the actual latest round number after loading
    } else {
        console.log("Nenhum dado de Encantados salvo encontrado no localStorage.");
        rodadaAtual = 0; // Ensure rodadaAtual is 0 if no rounds were loaded
    }
}

// --- Initial Setup on Page Load ---
document.addEventListener('DOMContentLoaded', function () {
    // Set the initial state of game selection
    // Call trocarJogo() once to display the correct placar and load data if applicable
    trocarJogo();

    // Attach event listener for the game selector dropdown
    const seletorJogoElement = document.getElementById('seletorJogo');
    if (seletorJogoElement) {
        seletorJogoElement.addEventListener('change', trocarJogo);
    } else {
        console.error("Elemento 'seletorJogo' não encontrado. Certifique-se de que seu HTML tem um elemento com este ID.");
    }
});
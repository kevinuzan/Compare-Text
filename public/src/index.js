let rodadaAtual = 0;

function calcularPontosJogador(jogador) {
    const par = parseInt(document.getElementById(`par-${jogador}`).value) * 2 || 0;
    const animal = parseInt(document.getElementById(`animal-${jogador}`).value) || 0;
    const colecao = parseInt(document.getElementById(`colecao-${jogador}`).value) || 0;
    const bonus = parseInt(document.getElementById(`bonus-${jogador}`).value) || 0;
    const ultima = parseInt(document.getElementById(`ultima-${jogador}`).value) || 0;

    const totalRodada = par + animal + colecao + bonus + ultima;

    document.getElementById(`total-rodada-${jogador}`).innerText = totalRodada;
    return totalRodada;
}

function atualizarTodos() {
    for (let i = 1; i <= 5; i++) {
        calcularPontosJogador(i);
    }
}

document.addEventListener('input', function (event) {
    if (event.target.matches('input[type="number"]')) {
        atualizarTodos();
    }
});

function salvarRodada() {
    rodadaAtual++;
    const tabela = document.getElementById('tabela-pontos');
    const headerRow = tabela.querySelector('thead tr');

    // Cria a nova coluna de Rodada no cabeçalho
    const novaTh = document.createElement('th');
    novaTh.innerText = `Rodada ${rodadaAtual}`;
    headerRow.insertBefore(novaTh, headerRow.lastElementChild); // Antes da coluna Total Geral

    // Adiciona a pontuação de cada jogador na nova coluna
    for (let i = 1; i <= 5; i++) {
        const totalRodada = calcularPontosJogador(i);

        const row = tabela.querySelector(`tbody tr:nth-child(${i})`);
        const novaTd = document.createElement('td');
        novaTd.innerText = totalRodada;
        row.insertBefore(novaTd, row.lastElementChild); // Antes da célula Total Geral

        // Atualiza o Total Geral
        const totalGeralSpan = document.getElementById(`total-geral-${i}`);
        const totalAnterior = parseInt(totalGeralSpan.innerText) || 0;
        totalGeralSpan.innerText = totalAnterior + totalRodada;

        // Limpa os inputs pra próxima rodada
        document.getElementById(`par-${i}`).value = 0;
        document.getElementById(`animal-${i}`).value = 0;
        document.getElementById(`colecao-${i}`).value = 0;
        document.getElementById(`bonus-${i}`).value = 0;
        document.getElementById(`ultima-${i}`).value = 0;
        document.getElementById(`total-rodada-${i}`).innerText = 0;
    }
}

function limparJogo() {
    const confirmar = confirm("Tem certeza que deseja limpar todas as rodadas e começar um novo jogo?");
    if (confirmar) {
        const table = document.getElementById('tabela-pontos');

        const headerRow = table.rows[0];

        // 1) Remover todas as colunas de rodadas passadas (as que começam com "Rodada")
        for (let i = headerRow.cells.length - 2; i > 0; i--) {
            if (headerRow.cells[i].innerText.startsWith("Rodada")) {
                // Remover a célula de cada linha correspondente a essa rodada
                for (let j = 0; j < table.rows.length; j++) {
                    table.rows[j].deleteCell(i);
                }
            }
        }

        for (let i = 1; i <= 5; i++) {
            // Atualiza o Total Geral
            const totalGeralSpan = document.getElementById(`total-geral-${i}`);
            totalGeralSpan.innerText = 0;
        }

        rodadaAtual = 0
        alert("Jogo limpo! Você pode começar uma nova série de rodadas.");
    }
}


function trocarJogo() {
    const jogoSelecionado = document.getElementById('seletorJogo').value;

    document.querySelectorAll('.placar-jogo').forEach(div => div.style.display = 'none');

    if (jogoSelecionado === 'ssap') {
        document.getElementById('placar-ssap').style.display = 'block';
    } else if (jogoSelecionado === 'agricola') {
        document.getElementById('placar-agricola').style.display = 'block';
    }
}

function calcularAgricola() {
    const campos = parseInt(document.getElementById('campos').value) || 0;
    const pastagens = parseInt(document.getElementById('pastagens').value) || 0;
    const graos = parseInt(document.getElementById('graos').value) || 0;
    const vegetais = parseInt(document.getElementById('vegetais').value) || 0;
    const ovelhas = parseInt(document.getElementById('ovelhas').value) || 0;
    const javalis = parseInt(document.getElementById('javalis').value) || 0;
    const gado = parseInt(document.getElementById('gado').value) || 0;
    const casa = parseInt(document.getElementById('casa').value) || 0;
    const bonus = parseInt(document.getElementById('bonus').value) || 0;

    const total = campos + pastagens + graos + vegetais + ovelhas + javalis + gado + casa + bonus;

    document.getElementById('resultado-agricola').innerText = `Total: ${total} pontos`;
}
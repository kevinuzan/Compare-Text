var string_base = '';
var selectData = '<option value="Digite">Digite Seu Texto</option>';
async function getJson() {
    fetch('/json/text.json')
        .then(response => response.json())
        .then(data => {
            // Aqui você pode manipular o conteúdo do arquivo JSON
            for (i in data) {
                selectData += `<option value="${i}">${i}: ${data[i]}</option>`;
            }
            $('#textSelect')[0].innerHTML = selectData;
            const select = document.getElementById('textSelect');
            const options = select.getElementsByTagName('option');

            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                const maxLength = 55;
                const text = option.textContent;

                if (text.length > maxLength) {
                    option.textContent = text.substring(0, maxLength) + '...';
                }
            }
            saveJson(data)
        })
        .catch(error => {
            console.error('Ocorreu um erro ao carregar o arquivo JSON:', error);
        });
}
var dataJson
function saveJson(data) {
    dataJson = data
}

async function getData_() {
    const array_base = string_base.split(' ');
    var string_comp = $('#textData')[0].value;
    const array_comp = string_comp.split(' ');
    var j = 0;
    const threshold = 0.4;
    var erros = [];
    var palavrasErradas = [];
    var text_check = '';
    var arrayMenor = false
    if (array_comp.length < array_base.length) {
        arrayMenor = true
    } else {
        arrayMenor = false
    }
    try {
        for (var i = 0; i < array_base.length; i++) {
            if (array_comp[j] == '') {
                text_check += `<span class="red-slashed">&nbsp;</span>` //VERMELHO COM TRAÇO
                erros.push(1)
                i--;
            } else if (array_base[i] != array_comp[j]) {
                var similar = isSimilar(array_base[i], array_comp[j], threshold);
                if (!similar) {
                    if (array_base.join(' ').indexOf(array_comp.slice(j, j + 2).join(' ')) > -1) {
                        if (isSimilar(array_base[i + 1], array_comp[j], threshold)) {
                            text_check += `<span class="green-missed">${array_base[i]}</span> ` //VERDE
                            erros.push(array_base[i].length);
                            console.log(array_base[i])
                            i++;
                        } else {
                            var text_check2 = '';
                            while (!isSimilar(array_base[i + 1], array_comp[j], threshold)) {
                                text_check2 += `<span class="green-missed">${array_base[i]}</span> ` //VERDE
                                erros.push(array_base[i].length);
                                i++;
                            }
                            text_check2 += `<span class="green-missed">${array_base[i]}</span> ` //VERMELHO COM TRAÇO
                            erros.push(array_base[i].length);
                            if (array_base[i] == array_comp[j]) {
                                text_check2 += `${array_base[i]} `
                            }
                            text_check += text_check2;
                        }
                        j--;
                    }
                    else {
                        if (isSimilar(array_base[i], array_comp[j + 1], threshold)) {
                            text_check += `<span class="red-slashed">${array_comp[j]}</span> ` //VERMELHO COM TRAÇO
                            erros.push(array_comp[j].length);
                            if (array_base[i] == array_comp[j + 1]) {
                                text_check += `${array_base[i]} `
                            } else {
                                text_check += `<span class="green-missed">${array_base[i]}</span> ` //VERDE
                                erros.push(array_base[i].length);
                            }
                            j++;
                        } else if (!isSimilar(array_base[i], array_comp[j + 1], threshold)) {
                            var text_check2 = '';
                            while (!isSimilar(array_base[i], array_comp[j], threshold)) {
                                text_check2 += `<span class="red-slashed">${array_comp[j]}</span> ` //VERMELHO COM TRAÇO
                                erros.push(array_comp[j].length);
                                if (array_base[i + 1] == array_comp[j + 1]) {
                                    text_check2 += `<span class="green-missed">${array_base[i]}</span> ` //PALAVRA FALTANTE
                                    //text_check2 += `${array_base[i]} `
                                    break;
                                } else if (isSimilar(array_base[i + 1], array_comp[j + 1], threshold)) {
                                    console.log(array_base[i + 1], array_comp[j + 1])
                                    text_check2 += `<span class="green-missed">${array_base[i]}</span> ` //PALAVRA FALTANTE
                                    erros.push(array_base[i].length);
                                    break;
                                }
                                j++;
                            }
                            if (array_base[i] == array_comp[j]) {
                                text_check2 += `${array_base[i]} `
                            }
                            text_check += text_check2;
                        }
                    }
                } else {
                    var [letrasErradas, numeroErros] = comparar(array_base[i], array_comp[j])
                    erros.push(numeroErros)
                    palavrasErradas.push(letrasErradas)
                    text_check += `<span class="orange-dif">${letrasErradas}</span> ` //LARANJA
                }
            } else {
                text_check += `${array_comp[j]} `
            }
            j++;
        }
    } catch (e) {
        console.log(e)
        if (arrayMenor) {
            text_check += `<span class="green-missed">${array_base.slice(i).join(' ')}</span>`
            console.log(array_base.slice(j).join(' '));
        }
    }
    if (array_comp.length > j) {
        text_check += `<span class="red-slashed">${array_comp.slice(j).join(' ')}</span>`
        console.log(array_comp.slice(j).join(' '));
    }
    $('#resultado')[0].innerHTML = text_check
    var nota = (8 - (erros.reduce((partialSum, a) => partialSum + a, 0) * 0.05)).toString().replaceAll('.', ',')
    if (nota < 0) nota = 0
    $('#notaUser')[0].innerHTML = `Nota: ${nota}/8,0`;
    $('#errosUser')[0].innerHTML = `Erros: ${erros.reduce((partialSum, a) => partialSum + a, 0)}`;
    stopCounter()
    console.log(erros, palavrasErradas)

}

function calculateLevenshteinDistance(str1, str2) {
    const matrix = [];
    const len1 = str1.length;
    const len2 = str2.length;

    // Inicializar a primeira linha e a primeira coluna da matriz
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    // Preencher a matriz
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // Deleção
                matrix[i][j - 1] + 1, // Inserção
                matrix[i - 1][j - 1] + cost // Substituição
            );
        }
    }

    return matrix[len1][len2];
}

function isSimilar(str1, str2, threshold) {
    const distance = calculateLevenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = 1 - distance / maxLength;
    return similarity >= threshold;
}

function comparar(palavra1, palavra2) { //palavra certa, palavra errada
    var newPalavra = ''
    var j = 0;
    var ocorrencias = 0;
    if (palavra1.length < palavra2.length) {
        for (var i = 0; i < palavra2.length; i++) {
            if (palavra2[i] == palavra1[j]) {
                newPalavra += palavra2[i]
                j++;
            } else if (palavra2[i] == palavra1[j + 1]) {
                newPalavra += `<span class="red-slashed">${palavra2[i]}</span>`
                ocorrencias++;
                j++;
            } else {
                newPalavra += `<span class="red-slashed">${palavra2[i]}</span>`
                ocorrencias++;
            }
        }
    } else {
        for (var i = 0; i < palavra1.length; i++) {
            if (palavra1.length == palavra2.length) {
                if (palavra1[i] == palavra2[i]) {
                    newPalavra += palavra2[i]
                } else {
                    newPalavra += `<span class="red-slashed">${palavra2[i]}</span>`
                    ocorrencias++;
                }
            } else if (palavra1.length > palavra2.length) {
                if (palavra1[i] == palavra2[j]) {
                    newPalavra += palavra2[j]
                    j++;
                } else {
                    newPalavra += `<span class="red-slashed">${palavra2[i]}</span>`
                    ocorrencias++;
                }
            }
        }
    }
    return [newPalavra, ocorrencias];
}



var counterElement = document.getElementById("counter");
var startButton = document.getElementById("startButton");

var intervalId;
var minutes = 11;
var seconds = 0;
var isRunning = false;

function startCounter() {
    if (!isRunning) {
        minutes = 11;
        seconds = 0;
        intervalId = setInterval(updateCounter, 1000);
        isRunning = true;
        $('#textData')[0].disabled = false;
        $('#textSelect')[0].disabled = true;
        $('#textData')[0].value = '';
        $('#resultado')[0].innerHTML = '';
        playAudio();
        $('#notaUser')[0].innerHTML = `Nota: 8,0/8,0`;
        $('#errosUser')[0].innerHTML = `Erros: 0`;
        if (document.getElementById('textSelect').value != 'Digite') string_base = dataJson[document.getElementById('textSelect').value]
        else string_base = $('#textDataInsert')[0].value
    }
}
async function changeSelect() {
    if (document.getElementById('textSelect').value != 'Digite') $('#textDataInsert')[0].value = dataJson[document.getElementById('textSelect').value];
    else $('#textDataInsert')[0].value = ''
}


function stopCounter() {
    clearInterval(intervalId);
    isRunning = false;
    $('#textData')[0].disabled = true;
    $('#textSelect')[0].disabled = false;
    pauseAudio();
}



function updateCounter() {
    if (minutes === 0 && seconds === 0) {
        stopCounter();
        return;
    }

    if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }

    var formattedTime =
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);

    counterElement.textContent = formattedTime;
}

startButton.addEventListener("click", startCounter);
var audio = document.getElementById("myAudio");

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

function fazerDownload() {
    // Cria um elemento <a> para o link de download
    const linkDownload = document.createElement('a');

    // Define o conteúdo do arquivo
    const conteudoArquivo = new Blob([dataJson[document.getElementById('textSelect').value]], { type: 'text/plain' });

    // Define o URL do arquivo
    const urlArquivo = URL.createObjectURL(conteudoArquivo);

    // Define os atributos do link de download
    linkDownload.href = urlArquivo;
    linkDownload.download = `${document.getElementById('textSelect').value} - Digitação.txt`;

    // Simula um clique no link para iniciar o download
    linkDownload.click();

    // Libera o objeto URL
    URL.revokeObjectURL(urlArquivo);
}


function getData() {
    // Exemplo de uso
    //const text1 = "A agricultura é uma atividade importante para a economia de qualquer país. Ela desempenha um papel vital no fornecimento de alimentos para a população e contribui para o desenvolvimento econômico. No entanto, a agricultura intensiva pode ter impactos negativos no meio ambiente. Um dos problemas associados à agricultura intensiva é o uso excessivo de agrotóxicos. Os agrotóxicos são substâncias químicas utilizadas para controlar pragas e doenças nas plantações. Apesar de serem eficazes na proteção das plantas, seu uso descontrolado pode contaminar o solo, a água e afetar a saúde humana. Outro desafio enfrentado pela agricultura é a perda de biodiversidade. A monocultura, prática comum na agricultura intensiva, envolve o cultivo de uma única espécie em larga escala. Isso pode levar à perda de diversidade genética e aumentar a vulnerabilidade das plantações a doenças e pragas. Além disso, o uso excessivo de fertilizantes pode causar a eutrofização dos corpos d'água. Os fertilizantes contêm nutrientes como nitrogênio e fósforo, que podem ser arrastados pela chuva e acabar nos rios e lagos. Esse aumento nos nutrientes pode levar ao crescimento excessivo de algas, causando a morte de peixes e outros organismos aquáticos. É importante buscar práticas agrícolas mais sustentáveis, que minimizem os impactos negativos da agricultura no meio ambiente. A agricultura orgânica, por exemplo, utiliza métodos naturais de controle de pragas e fertilizantes orgânicos. Além disso, a diversificação de culturas e o uso de técnicas de conservação do solo podem ajudar a preservar a biodiversidade e a saúde dos ecossistemas. Investir em pesquisa e educação também é essencial para promover a agricultura sustentável. Novas tecnologias e conhecimentos científicos podem contribuir para o desenvolvimento de práticas agrícolas mais eficientes e ambientalmente responsáveis. A conscientização da população sobre a importância da agricultura sustentável também desempenha um papel crucial na adoção dessas práticas. Em conclusão, a agricultura desempenha um papel fundamental na sociedade, mas é necessário adotar medidas para minimizar os impactos negativos no meio ambiente. A busca por práticas agrícolas mais sustentáveis e o investimento em pesquisa e educação são essenciais para garantir a segurança alimentar e a preservação dos recursos naturais.";
    //const text2 = "A agricultura é uma atividade importante para a economia de qualquer país. Ela desempenha um papel vital no fornecimento de alimentos para a população e contribui para o desenvolvimento economico. Isso pode levar à perda de diversidade genética e aumentar a vulnerabilidade das plantações a doenças e pragas. No entanto, a agricultura intensiva pode ter impactos negativos no meio ambiente. Um dos problemas associados à agricultura intensiva é o uso excessivo de agrotóxcios. Os agrotóxicos são substâncias químicas utilizadas para controlar pragas e doenças nas plantações. Apesar de serem eficazes na proteção das plantas, seu uso descontrolado pode contaminar o solo, a água e afetar a saúde humana. Outro desafio enfrentado pela agricultura é a perda de biodiversidade. Além disso, o uso excessivo de fertilizantes pode causar a eutrofização dos corpos d'água. Os fertilizantes contêm nutrientes como nitrogênio e fósforo, que podem ser arrastados pela chuva e acabar nos rios e lagos. Esse aumento nos nutrientes pode levar ao crescimento exessivo de algas, causando a morte de peixes e outros organismos aquáticos. É importante buscar práticas agrícolas mais sustentáveis, que minimizem os impactos negativos da agricultura no meio ambiente.  Além disso, a diversificação de culturas e o uso de técnicas de conservação do solo podem ajudar a preservar a biodiversidade e a saúde dos ecossistemas. Investir em pesquisa e educação também é essencial para promover a agricultura sustentável. Novas tecnologias e conhecimentos científicos podem contribuir para o desenvolvimento de práticas agrícolas mais eficientes e ambientalmente responsáveis. A conscientização da população sobre a importância da agricultura sustentável também desempenha um papel crucial na adoção dessas práticas. Em conclusão, a agricultura desempenha um papel fundamental na sociedade, mas é necessário adotar medidas para minimizar os impactos negativos no meio ambiente. sdasdasdas por práticas agrícolas mais sustentáveis e o investimento em pesquisa e educação";

    const text1 = $('#textDataInsert')[0].value
    const text2 = $('#textData')[0].value

    const [diff, erros] = lcs(text1, text2);
    $('#resultado')[0].innerHTML = diff;
    var nota = (8 - (erros * 0.05)).toString().replaceAll('.', ',');
    if (parseInt(nota) < 0) nota = 0;
    $('#notaUser')[0].innerHTML = `Nota: ${nota}/8,0`; ''
    $('#errosUser')[0].innerHTML = `Erros: ${erros}`;
    stopCounter();
}


function lcs_words(text1, text2) {
    const m = text1.length;
    const n = text2.length;

    // Inicializar a tabela LCS
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Preencher a tabela LCS
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruir as diferenças
    const diffs = [];
    let i = m;
    let j = n;
    let erros = 0;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && text1[i - 1] === text2[j - 1]) {
            diffs.unshift(text1[i - 1]);
            i--;
            j--;
        }
        else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            diffs.unshift(`<span class="red-slashed">${text2[j - 1]}</span>`);
            j--;
            erros++;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
            diffs.unshift(`<span class="green-missed">${text1[i - 1]}</span>`);
            i--;
            erros++;
        }
    }
    //console.log(diffs.join(''))
    return [diffs.join(''), erros];
}

function lcs(text1, text2) {
    const words1 = text1.split(" ");
    const words2 = text2.split(" ");
    const m = words1.length;
    const n = words2.length;

    // Inicializar a tabela LCS
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Preencher a tabela LCS
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (words1[i - 1] === words2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruir as diferenças
    const diffs = [];
    let erros = 0;
    const threshold = 0.75;
    let i = m;
    let j = n;
    var diffs_aux = '';
    let erros_aux = 0;

    while (i > 0 || j > 0) {
        if (words2[j - 1] === '') {
            diffs.unshift(`<span class="red-slashed">&nbsp;</span>`);
            erros++;
            j--;
        }
        else if (i > 0 && j > 0 && words1[i - 1] === words2[j - 1]) {
            diffs.unshift(`<span>${words1[i - 1]}&nbsp;</span>`);
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            if (i !== 0) {
                var similar = isSimilar(words1[i - 1], words2[j - 1], threshold);
                if (similar) {
                    [diffs_aux, erros_aux] = lcs_words(words1[i - 1], words2[j - 1]);
                    diffs.unshift(diffs_aux);
                    erros += erros_aux;
                    i--;
                } else {
                    diffs.unshift(`<span class="red-slashed">${words2[j - 1]}&nbsp;</span>`);
                    erros += words2[j - 1].length + 1;
                }
            } else {
                diffs.unshift(`<span class="red-slashed">${words2[j - 1]}&nbsp;</span>`);
                erros += words2[j - 1].length + 1;
            }
            j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
            if (j !== 0) {
                var similar = isSimilar(words1[i - 1], words2[j - 1], threshold);
                if (similar) {
                    [diffs_aux, erros_aux] = lcs_words(words1[i - 1], words2[j - 1]);
                    diffs.unshift(diffs_aux);
                    erros += erros_aux;
                    j--;
                } else {
                    diffs.unshift(`<span class="green-missed">${words1[i - 1]}&nbsp;</span>`);
                    erros += words1[i - 1].length + 1;
                }
            } else {
                diffs.unshift(`<span class="green-missed">${words1[i - 1]}&nbsp;</span>`);
                erros += words1[i - 1].length + 1;
            }
            i--;
        } else if (i === 0) {
            diffs.unshift(`<span class="red-slashed">${words2[j - 1]}&nbsp;</span>`);
            erros += words2[j - 1].length + 1;
            j--;
        } else if (j === 0) {
            diffs.unshift(`<span class="green-missed">${words1[i - 1]}&nbsp;</span>`);
            erros += words1[i - 1].length + 1;
            i--;
        }
    }

    return [diffs.join(""), erros];
}
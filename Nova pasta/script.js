var imagemAtual = true;
var audioContext = new(window.AudioContext || window.webkitAudioContext)();
var source = null;

function alterarImagem() {
    var imagem = document.getElementById("imagem");
    if (imagemAtual) {
        imagem.src = "img/video-pause-button.png";
        imagemAtual = false;
        tocarMusica();
    } else {
        imagem.src = "img/play-button.png";
        imagemAtual = true;
        pararMusica();
    }
}

function tocarMusica() {
    if (!source) {
        fetch('music/Luzdoluartatoegabb.mp3')
            .then(response => response.arrayBuffer())
            .then(buffer => {
                audioContext.decodeAudioData(buffer, function(decodedData) {
                    source = audioContext.createBufferSource();
                    source.buffer = decodedData;
                    source.connect(audioContext.destination);
                    source.start(0);
                });
            });
    }
}

function pararMusica() {
    if (source) {
        source.stop();
        source = null;
    }
}
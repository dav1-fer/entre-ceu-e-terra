let newX = 0, newY = 0, startX = 0, startY = 0;
let dashOffset = 0;
const main = document.querySelector('main');
const cards = document.querySelectorAll(".image-card");
const canvas = document.getElementById("web-canvas");
const ctx = canvas.getContext("2d");
let showConnections = false; // Toggle show-connections
const showWebBtn = document.querySelector(".show-web");

// Initial canvas dimensions
canvas.width = main.clientWidth;
canvas.height = main.clientHeight;

// Toggle connection lines on/off
showWebBtn.addEventListener('click', () => {
    showConnections = !showConnections; // Changes connections state
    drawConnections(); // Redraws lines according to connection state

    const icon = showWebBtn.querySelector('i');
    const text = showWebBtn.querySelector('p');
    if (showConnections) {
        icon.classList.replace("fa-eye", "fa-eye-slash"); // Eye open
        text.textContent = "Esconder conexões";
    } else {
        icon.classList.replace("fa-eye-slash", "fa-eye"); // Eye closed
        text.textContent = "Mostrar conexões";
    }
});

// Function to resize the canvas and redraw lines
function resizeCanvas() {
    canvas.width = main.clientWidth;
    canvas.height = main.clientHeight;
    drawConnections();
}

// Function to draw connection lines
function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    if (!showConnections) return; // Skip if connections are off
    
    // Connection lines appearance 
    ctx.strokeStyle = "#D8C21B";
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 1.5;
    ctx.lineDashOffset = dashOffset;

    const mainRect = main.getBoundingClientRect();
    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            const rectA = cards[i].getBoundingClientRect();
            const rectB = cards[j].getBoundingClientRect();

            const centerAx = rectA.left + rectA.width / 2 - mainRect.left;
            const centerAy = rectA.top + rectA.height / 2 - mainRect.top;
            const centerBx = rectB.left + rectB.width / 2 - mainRect.left;
            const centerBy = rectB.top + rectB.height / 2 - mainRect.top;

            ctx.beginPath();
            ctx.moveTo(centerAx, centerAy);
            ctx.lineTo(centerBx, centerBy);
            ctx.stroke();
        }
    }
}

// Animate line dashes in a loop
function animateLines() {
    dashOffset -= 0.2;
    drawConnections();
    requestAnimationFrame(animateLines);
}

// Resize listener to adjust canvas on window resize
window.addEventListener('resize', resizeCanvas);

// Dragging functionality for each card
cards.forEach(card => {
    card.addEventListener('mousedown', mouseDown);

    function mouseDown(e) {
        e.preventDefault();

        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    function mouseMove(e) {
        newX = e.clientX - startX;
        newY = e.clientY - startY;

        startX = e.clientX;
        startY = e.clientY;

        const mainRect = main.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        let newTop = card.offsetTop + newY;
        let newLeft = card.offsetLeft + newX;

        if (newTop < 0) newTop = 0;
        if (newTop + cardRect.height > mainRect.height) newTop = mainRect.height - cardRect.height;
        if (newLeft < 0) newLeft = 0;
        if (newLeft + cardRect.width > mainRect.width) newLeft = mainRect.width - cardRect.width;

        card.style.top = newTop + 'px';
        card.style.left = newLeft + 'px';

        drawConnections();
    }

    function mouseUp(e) {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
        drawConnections();
    }
});

animateLines();


// ----- POP-UP FEATURE -------

const popup = document.getElementById("info-popup");
const closeBtn = document.querySelector(".close-btn");
const popupCards = document.querySelectorAll(".image-card"); // Select cards specifically for popup

// Popup content data
const imageData = {
    "image-1": {
        title: "A Natureza e o Homem",
        subtitle: "O Homem como Medida do Mundo",
        work: "Estudo de Proporções do Homem (Homem Vitruviano)",
        author: "Leonardo da Vinci",
        date: "cerca de 1490",
        material: "Tinta e papel",
        technique: "Desenho à tinta e lavis (técnica de sombreado)",
        description: "Leonardo da Vinci criou o famoso desenho do Homem Vitruviano como um estudo das proporções ideais do corpo humano, baseando-se nas proporções descritas pelo arquiteto romano Vitruvius. Utilizando tinta e a técnica de lavis, ele conseguiu capturar com precisão as proporções humanas em relação ao círculo e ao quadrado, que representam a harmonia e o equilíbrio entre o corpo e o universo. Este desenho reflete o ideal renascentista de que o homem é a medida de todas as coisas, e também simboliza a interconexão entre arte e ciência. Da Vinci aplicou uma leve sombra para destacar as linhas do corpo, criando uma sensação de profundidade que demonstra sua habilidade de observação anatômica. Este trabalho é frequentemente interpretado como uma celebração da simetria, do humanismo e da racionalidade, pilares fundamentais do Renascimento."
    },
    "image-2": {
        title: "A Razão e o Universo",
        subtitle: "A Razão como Reflexo da Harmonia Universal",
        work: "A Escola de Atenas",
        author: "Rafael",
        date: "entre 1509-1511",
        material: "Tinta de fresco sobre reboco",
        technique: "Pintura a fresco",
        description: "Em A Escola de Atenas, Rafael reúne os grandes filósofos da antiguidade em um espaço arquitetônico grandioso, representando a harmonia entre o conhecimento humano e o universo. Feita com a técnica de pintura a fresco, esta obra destaca figuras como Platão e Aristóteles ao centro, simbolizando diferentes abordagens filosóficas como o idealismo e realismo, respectivamente. A técnica de fresco, onde os pigmentos são aplicados sobre reboco molhado, permite que a pintura mantenha um brilho duradouro, que ainda pode ser visto na obra original. Rafael utiliza uma composição geométrica, com perspectivas cuidadosas, para criar uma sensação de profundidade e de grandeza arquitetônica. Este trabalho é considerado uma celebração da racionalidade e da busca pela verdade, e reflete os ideais renascentistas de que a razão e a harmonia são reflexos da ordem universal."
    },
    "image-3": {
        title: "O Homem e a Geometria Sagrada",
        subtitle: "A Geometria como Refúgio do Divino no Racional",
        work: "A Flagelação de Cristo",
        author: "Piero della Francesca",
        date: "entre 1455-1460",
        material: "Têmpera e madeira",
        technique: "Pintura em têmpera",
        description: "Piero della Francesca explorou a perspectiva de forma pioneira, utilizando a técnica de têmpera sobre madeira para criar linhas precisas e cores estáveis. Este estudo é um exemplo do uso da geometria sagrada para capturar a profundidade e a proporção, refletindo o entendimento matemático do espaço e da forma. A têmpera, feita a partir de pigmentos misturados com gema de ovo, permite uma secagem rápida e linhas nítidas, características ideais para obras que exploram a exatidão geométrica. Neste trabalho, Piero della Francesca representa a busca pela perfeição e pela ordem divina através da racionalidade e da matemática, conceitos que eram altamente valorizados no Renascimento. Suas técnicas de perspectiva foram influentes e revolucionaram a forma como os artistas compreendiam e representavam o espaço tridimensional."
    },
    "image-4": {
        title: "O Divino e a Criação",
        subtitle: "O Toque de Deus e o Despertar da Razão",
        work: "A Criação de Adão",
        author: "Michelangelo",
        date: "cerca de 1511",
        material: "Tinta de fresco sobre reboco",
        technique: "Pintura a fresco",
        description: "Esta obra icônica, pintada no teto da Capela Sistina por Michelangelo, captura o momento em que Deus concede vida a Adão com um toque. Usando a técnica de pintura a fresco, Michelangelo aplicou pigmentos sobre reboco fresco, o que permitiu que as cores se fixassem de maneira permanente, dando profundidade e intensidade ao trabalho. Este gesto simbólico é interpretado como a transmissão de intelecto e alma, onde Deus e o homem quase se tocam. A escolha de cores vibrantes e o detalhamento anatômico de Adão e de Deus mostram o domínio de Michelangelo sobre a figura humana e sua habilidade para expressar temas espirituais profundos. Essa imagem também é uma poderosa representação do Renascimento, que via o homem como uma criação divina digna de conhecimento e sabedoria, além de enfatizar a relação entre o sagrado e o humano."
    },
    "image-5": {
        title: "A Redenção e o Sofrimento",
        subtitle: "O Sofrimento Humano como Caminho de Conexão ao Divino",
        work: "A Deposição de Cristo",
        author: "Rogier van der Weyden",
        date: "entre 1435-1438",
        material: "Óleo sobre painel de madeira",
        technique: "Pintura a óleo",
        description: "Em A Deposição de Cristo, Rogier van der Weyden explora o sofrimento humano e a redenção espiritual, utilizando óleo sobre painel de madeira para alcançar um realismo impressionante. Esta técnica permite uma mistura suave de cores, especialmente eficaz para capturar expressões emocionais e detalhes minuciosos dos rostos das figuras. A composição é intensa, com Maria e outras figuras que seguram o corpo de Cristo com expressões de dor e compaixão. Van der Weyden utiliza a técnica de óleo para criar texturas detalhadas e uma profundidade de campo que dá vida à cena, tornando-a ainda mais emocionalmente poderosa. Esta obra é considerada um dos melhores exemplos do realismo gótico, capturando a humanidade e o sofrimento das figuras, e é um testemunho da capacidade de Van der Weyden de expressar a espiritualidade através da dor e da empatia visual."
    },
    "image-6": {
        title: "A Luz e a Sombra",
        subtitle: "O Chamado ao Conhecimento Espiritual",
        work: "A Vocação de São Mateus",
        author: "Caravaggio",
        date: "cerca de 1600",
        material: "Óleo sobre tela",
        technique: "Pintura a óleo",
        description: "A Vocação de São Mateus, de Caravaggio, é um exemplo extraordinário do uso do chiaroscuro, a técnica de contraste entre luz e sombra que Caravaggio aperfeiçoou. A pintura mostra o momento em que Jesus chama Mateus para ser seu discípulo, com um feixe de luz iluminando Mateus, destacando-o em meio à penumbra da sala. O uso dramático do claro-escuro enfatiza a espiritualidade e o mistério da cena, enquanto a luz direciona a atenção para o chamado divino. Caravaggio optou por pintar a óleo, o que permite uma mistura suave de cores, especialmente nas sombras profundas e nas áreas de iluminação. Esta técnica criou um efeito realista e dramático, onde os personagens parecem saltar da tela. A Vocação de São Mateus não só é um marco do Barroco, como também reflete a humanidade e o dinamismo que Caravaggio trazia para temas religiosos."
    },
    "image-7": {
        title: "A Harmonia entre o Céu e a Terra",
        subtitle: "O Paradigma do Prazer e a Busca pelo Divino",
        work: "O Jardim das Delícias",
        author: "Hieronymus Bosch",
        date: "entre 1490-1510",
        material: "Óleo sobre painel de madeira",
        technique: "Pintura a óleo",
        description: 'Hieronymus Bosch utilizou tinta a óleo sobre um painel de madeira em sua famosa obra "O Jardim das Delícias", uma técnica que proporcionou uma saturação intensa de cores e um nível de detalhe impressionante. Essa abordagem foi crucial para a representação das cenas ricas e imaginativas que permeiam o tríptico, permitindo que cada elemento se destaque de maneira vibrante. A tinta a óleo confere uma profundidade única e luminosidade à composição, atraindo o olhar do espectador e revelando as sutilezas das narrativas visuais. Os detalhes meticulosamente elaborados, desde as expressões dos personagens até os elementos simbólicos intricados, oferecem uma experiência visual envolvente. Cada painel do tríptico apresenta uma narrativa distinta, explorando temas de prazer, moralidade e a condição humana. A escolha do suporte em madeira também agrega uma textura que complementa a riqueza das tintas, resultando em uma obra-prima que continua a fascinar e intrigar o público até os dias de hoje.'
    }
};

// Set up event listeners for each popup card
popupCards.forEach(card => {
    card.addEventListener("dblclick", () => {
        const cardId = card.dataset.id;
        // Populate popup with data from imageData based on card ID
        const data = imageData[cardId];
        if (data) {
            document.getElementById("popup-image").src = card.querySelector("img").src;
            document.getElementById("popup-title").textContent = data.title;
            document.getElementById("popup-subtitle").textContent = data.subtitle;
            document.getElementById("popup-work").textContent = data.work;
            document.getElementById("popup-author").textContent = data.author;
            document.getElementById("popup-date").textContent = data.date;
            document.getElementById("popup-material").textContent = data.material;
            document.getElementById("popup-technique").textContent = data.technique;
            document.getElementById("popup-description").textContent = data.description;
        }
        // Show popup
        popup.style.display = "flex";
    });
});

// Close popup when close button is clicked
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});
// Close popup when clicking outside the popup content
window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
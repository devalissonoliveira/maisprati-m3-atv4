// -------------------- Recomendações --------------------
const getCommentById = async (id) => {
    try {
        const response = await fetch(`https://my-json-server.typicode.com/devalissonoliveira/fakeapi-testes/comments/${id}`);
        const commentData = await response.json();
        return commentData;
    } catch (error) {
        console.error("Falha ao buscar o comentário:", error);
        return null; 
    }
};

function createCommentArticle(commentData, i) {
    const article = document.createElement('article');
    article.classList.add('comment', 'w-50', 'd-flex', 'gap-4');
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('imageContainerComment', 'rounded-circle');
    
    const img = document.createElement('img');
    img.classList.add('imageComment', 'rounded-circle', 'object-fit-cover');
    img.id = `imageComment${i}`;
    img.src = commentData.image;
    img.alt = commentData.altText || 'Image sem descrição';
    
    imageContainer.appendChild(img);
    
    const textContainer = document.createElement('div');
    
    const commentParagraph = document.createElement('p');
    commentParagraph.classList.add('contentComment');
    commentParagraph.id = `comment${i}`;
    commentParagraph.textContent = commentData.body || 'Sem comentário disponível.';
    
    const authorParagraph = document.createElement('p');
    authorParagraph.classList.add('autorComment', 'text-info', 'fw-semibold', 'm-0');
    authorParagraph.id = `autorComment${i}`;
    authorParagraph.textContent = commentData.name || 'Autor desconhecido';
    
    const occupationParagraph = document.createElement('p');
    occupationParagraph.classList.add('occupationComment');
    occupationParagraph.id = `occupationComment${i}`;
    occupationParagraph.textContent = commentData.occupation || 'Ocupação desconhecida';
    
    textContainer.appendChild(commentParagraph);
    textContainer.appendChild(authorParagraph);
    textContainer.appendChild(occupationParagraph);
    
    article.appendChild(imageContainer);
    article.appendChild(textContainer);
    
    return article;
}

function createSwiperSlide(commentData, i) {
    const swiperSlide = document.createElement('swiper-slide');
    
   
    const article = createCommentArticle(commentData, i);
    
    swiperSlide.appendChild(article);
    
    return swiperSlide;
}

async function showComments(ids) {
    const swiperContainer = document.querySelector('.mySwiper');
    
    for (let i = 0; i < ids.length; i++) {
        const commentData = await getCommentById(ids[i]);
        
        if (commentData) {     
            const swiperSlide = createSwiperSlide(commentData, i + 1);
            
            swiperContainer.appendChild(swiperSlide);
        }
    }
}

showComments([1, 2, 3]);


// -------------------- Serviços --------------------
const createServiceArticle = (service, id) => {
    const article = document.createElement('article');
    article.classList.add('col', 'text-center');

    article.setAttribute('data-aos', 'fade-up');
    article.setAttribute('data-aos-anchor-placement', 'center-bottom');

    const iconDiv = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('material-icons', 'text-info');
    icon.id = `iconService${id}`;
    icon.innerText = service.icon;
    iconDiv.appendChild(icon);

    const title = document.createElement('h3');
    title.id = `serviceTipy${id}`;
    title.innerText = service.serviceType;

    const description = document.createElement('p');
    description.id = `descriptionService${id}`;
    description.innerText = service.description;

    article.appendChild(iconDiv);
    article.appendChild(title);
    article.appendChild(description);

    return article;
};

const getServiceById = async (id) => {
    try {
        const response = await fetch(`https://my-json-server.typicode.com/devalissonoliveira/fakeapi-testes/services/${id}`);
        const serviceData = await response.json();
        return serviceData;
    } catch (error) {
        console.error("Falha ao buscar o serviço:", error);
        return null; 
    }
};

const showServices = async (ids) => {
    const row1 = document.querySelector('#services .row:nth-child(1)');
    const row2 = document.querySelector('#services .row:nth-child(2)');

    for (let id of ids) {
        let service = await getServiceById(id);
        if (service) {
            const article = createServiceArticle(service, id);
            if (id <= 3) {
                row1.appendChild(article);
            } 
            else {
                row2.appendChild(article);
            }
        }
    }
};

showServices([1, 2, 3, 4, 5, 6]);


// -------------------- Contato --------------------
document.getElementById('phoneForm').addEventListener('input', function (e) {
    let input = this.value.replace(/\D/g, ''); 
    if (input.length > 10) {
        input = input.slice(0, 11);
    }
    const formattedInput = input.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
                                 .replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    this.value = formattedInput;
});


document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('nameForm').value.trim();
    const phone = document.getElementById('phoneForm').value.trim().replace(/\D/g, '');
    const email = document.getElementById('emailForm').value.trim();
    const message = document.getElementById('messageForm').value.trim();

    const phoneRegex = /^\d{10,11}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    
    if (!phoneRegex.test(phone)) {
        alert('Por favor, insira um telefone válido com 10 ou 11 dígitos.');
        return;
    }
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
});


document.getElementById('contactForm').addEventListener('submit', sendMail);

function sendMail(e) {
    e.preventDefault();

    emailjs
      .sendForm('service_0im57yj', 'template_edcd7go', e.target, {
        publicKey: 'w1HnTX30yOL20Jxg-',
      })
      .then(
        () => {
            alert("Menssagem enviada com sucesso!");
        },
        (error) => {
            alert(error.message);
        },
      );
}
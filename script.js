function openPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'flex'; // Mostra o popup
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none'; // Esconde o popup
}


function irParaMenu() {
  window.location.href = "menu.html"; // Substitua com o nome da sua página de menu
}
function irParainicio() {
  window.location.href = "index.html"; // Substitua com o nome da sua página de menu
}
function irParaquem() {
  window.location.href = "QuemSomos.html"; // Substitua com o nome da sua página de menu
}
function irParadepoimentos() {
  window.location.href = "depoimentos.html"; // Substitua com o nome da sua página de menu
}

function irParalogar() {
  window.location.href = "logar.html"; // Substitua com o nome da sua página de menu
  }



// Salvar pedido no Local Storage
function saveOrderToLocal() {
  localStorage.setItem('currentOrder', JSON.stringify(cart)); // 'cart' é o array do pedido
}

let currentIndex = 0;

function moveSlide(direction) {
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  currentIndex += direction;

  // Garantir que o índice fique no limite
  if (currentIndex < 0) {
    currentIndex = totalItems - 1;
  } else if (currentIndex >= totalItems) {
    currentIndex = 0;
  }

  // Calcular o deslocamento
  const offset = -currentIndex * 100;
  track.style.transform = `translateX(${offset}%)`;
}

// Girar automaticamente
function autoSlide() {
  setInterval(() => {
    moveSlide(1); // Passa para o próximo slide automaticamente
  }, 5000); // Altere o valor (3000 ms) para ajustar o intervalo (3 segundos)
}

// Iniciar o carrossel automático ao carregar a página
document.addEventListener('DOMContentLoaded', autoSlide);



let cart = []; // Carrinho de compras

// Adicionar ao carrinho e mostrar o carrinho
function addToCart(itemName, itemPrice, quantityId) {
    const quantityInput = document.getElementById(quantityId); // Obtém o campo de quantidade
    const quantity = parseInt(quantityInput.value) || 1;

    if (quantity <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    const hasDiscount = quantity >= 50; // Mais de 50 unidades
    const discountRate = hasDiscount ? 0.25 : 0; // 25% de desconto
    const discountedPrice = itemPrice * (1 - discountRate); // Aplica o desconto

    const item = {
        id: Date.now(),
        name: itemName,
        price: itemPrice,
        quantity: quantity,
        total: discountedPrice * quantity,
        hasDiscount: hasDiscount,
    };

    cart.push(item);
    updateCartDisplay();
    openCart();
}

// Atualiza a exibição do carrinho no DOM
function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total-price');

    cartList.innerHTML = '';
    cart.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${item.total.toFixed(2)}
            ${item.hasDiscount ? '<span class="discount-label">Desconto aplicado (25%)</span>' : ''}
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartList.appendChild(listItem);
    });

    totalElement.textContent = `R$ ${calculateTotal().toFixed(2)}`;
}

// Calcula o total do carrinho
function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.total, 0);
}

// Remover item do carrinho
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }
    updateCartDisplay();
}

// Abrir o carrinho
function openCart() {
    const cartElement = document.getElementById('side-cart');
    cartElement.classList.add('visible');
    cartElement.classList.remove('hidden');
}

// Fechar o carrinho
function closeCart() {
    const cartElement = document.getElementById('side-cart');
    cartElement.classList.remove('visible');
    cartElement.classList.add('hidden');
}

// Salvar pedido no Local Storage e redirecionar
function confirmarCompra() {
    if (cart.length === 0) {
        alert("O carrinho está vazio! Adicione itens antes de confirmar.");
        return;
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
    window.location.href = 'resumo.html';
}


// Atualizar o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    document.getElementById('confirmar-button').addEventListener('click', confirmarCompra);
});




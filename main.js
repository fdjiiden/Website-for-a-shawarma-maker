function see(el) {
    rect = el.getBoundingClientRect();
    wind = window.innerHeight;    
    return (
        rect.top <= wind * 0.8 && rect.bottom >= 0
    );
}
function active(block) {
    t = block.querySelectorAll('.shaurma1, .shaurma2, .shaurma3, .Block_1, .Block_2, .Block_3, .price1');
    t.forEach(el => {
        if (el.style.animationName === "none") {
            if (el.classList.contains('shaurma1') || el.classList.contains('shaurma2') || el.classList.contains('shaurma3')) {
                el.style.animation = "move 1s forwards 0.5s";
            } else {
                el.style.animation = "movetext 2s forwards";
            }
        }
    });
}
function handleScroll() {
    allBl = document.querySelectorAll('.Vshaurm, .shaurm');
    allBl.forEach(block => {
        if (see(block)) {
            active(block);
        }
    });
}
function init() {
    const allel = document.querySelectorAll('.shaurma1, .shaurma2, .shaurma3, .Block_1, .Block_2, .Block_3, .price1');
    allel.forEach(el => {
        el.style.opacity = "0";
        el.style.animation = "none";
    });    
    handleScroll();
    initCartLogic(); 
    renderCart()
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', init);


//Дальнейший юлок кода сделал ИИ c моими правками по мелочи
let cart = []; // Массив для хранения товаров

// Функция для отрисовки содержимого корзины
function renderCart() {
    const dialog = document.getElementById('basketDIA');
    
    // 1. Добавляем '.cart-pay-button' в список на удаление
    const oldItems = dialog.querySelectorAll('.cart-item, .cart-total, .cart-pay-button');
    oldItems.forEach(el => el.remove());
    
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.count;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.style.color = "black";
        div.style.padding = "5px 20px";
        div.innerHTML = `
            ${item.name} x${item.count} - ${item.price * item.count}р 
            <button onclick="removeFromCart(${index})" style="color:red; cursor:pointer; border:none; background:none; font-size: 18px;">X</button>
        `;
        dialog.appendChild(div);
    });
    
    const totalEl = document.createElement('p');
    totalEl.className = 'cart-total';
    totalEl.style.color = "black";
    totalEl.style.fontWeight = "bold";
    totalEl.style.padding = "10px 20px";
    totalEl.style.textAlign = "center";
    
    if (total > 0) {
        totalEl.innerText = `Итого: ${total}р`;
        const payBtn = document.createElement('a');
        payBtn.className = 'cart-pay-button'; 
        payBtn.href = 'oplata.html';
        payBtn.innerText = 'Перейти к оплате';
        payBtn.style.display = 'block';
        payBtn.style.margin = '10px auto';
        payBtn.style.padding = '10px 20px';
        payBtn.style.backgroundColor = '#28a745';
        payBtn.style.color = 'white';
        payBtn.style.textDecoration = 'none';
        payBtn.style.textAlign = 'center';
        payBtn.style.fontWeight = 'bold';
        payBtn.style.borderRadius = '5px';
        
        dialog.appendChild(payBtn); 
    } else {
        totalEl.innerText = `Корзина пуста`;
    }

    dialog.appendChild(totalEl);
    localStorage.setItem('userCart', JSON.stringify(cart));
}


// Функция удаления
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Инициализация кликов по блокам
function initCartLogic() {
    const blocks = document.querySelectorAll('.Block_1, .Block_2, .Block_3');
    
    blocks.forEach(block => {
        block.addEventListener('click', () => {
            const name = block.getAttribute('data-name');
            const price = parseInt(block.getAttribute('data-price'));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                cart.push({ name, price, count: 1 });
            }
            
            // Визуальный отклик при нажатии
            block.style.opacity = "0.7";
            setTimeout(() => block.style.opacity = "1", 100);
            
            renderCart();
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('oplata');
    // Достаем данные из хранилища и превращаем обратно в массив
    const savedCart = JSON.parse(localStorage.getItem('userCart')) || [];
    if (savedCart.length === 0) {
        container.innerHTML = '<h3>Корзина пуста</h3>';
        return;
    }
    let total = 0;
    savedCart.forEach(item => {
        total += item.price * item.count;
        const itemEl = document.createElement('div');
        itemEl.style.padding = "5px";
        itemEl.innerHTML = `${item.name} ${item.count}шт. — ${item.price * item.count}р`;
        container.appendChild(itemEl);
    });
    const totalEl = document.createElement('div');
    totalEl.style.borderTop = "1px solid black";
    totalEl.style.marginTop = "10px";
    totalEl.style.fontWeight = "bold";
    totalEl.innerHTML = `ИТОГО: ${total}р`;
    container.appendChild(totalEl);
});

// блок окончен
function soub(){
    alert('Тут должна быть оплата');
}
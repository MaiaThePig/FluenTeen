var dinheiroDisponivel = 1000;

function comprarCosmetico(preco) {
    if (dinheiroDisponivel >= preco) {
        dinheiroDisponivel -= preco;
        alert('Compra realizada com sucesso!');
        document.querySelector('.header p').textContent = 'Dinheiro Disponível: ' + dinheiroDisponivel + ' Moedas';
    } else {
        alert('Dinheiro insuficiente para comprar este item.');
    }
}

const listasDiv = document.getElementById('listas');

const STORAGE_KEY = 'listaDeCompras';

// Dados padrão (se não houver no localStorage)
const dadosIniciais = {
  "Alimentação Boa (Saudável)": [
    { text: "Frutas variadas (banana, maçã, laranja, etc.)", checked: false },
    { text: "Legumes (cenoura, abobrinha, batata, etc.)", checked: false },
    { text: "Verduras e folhas (alface, couve, espinafre)", checked: false },
    { text: "Alho e cebola", checked: false },
    { text: "Tomate", checked: false },
    { text: "Limão", checked: false },
    { text: "Ovos", checked: false },
    { text: "Frango", checked: false },
    { text: "Peixe", checked: false },
    { text: "Carne vermelha magra", checked: false },
    { text: "Queijo branco", checked: false },
    { text: "Iogurte natural", checked: false },
    { text: "Leite", checked: false },
    { text: "Arroz integral", checked: false },
    { text: "Feijão (preto, carioca ou outro)", checked: false },
    { text: "Lentilha", checked: false },
    { text: "Aveia", checked: false },
    { text: "Grão-de-bico", checked: false },
    { text: "Farinha de trigo/integral", checked: false },
    { text: "Macarrão (de preferência integral)", checked: false },
    { text: "Pão integral", checked: false },
    { text: "Azeite de oliva", checked: false },
    { text: "Sal e temperos naturais (orégano, cúrcuma, pimenta, etc.)", checked: false },
    { text: "Açúcar mascavo ou mel", checked: false },
    { text: "Café ou chá", checked: false },
    { text: "Água (caso não use filtro)", checked: false }
  ],
  "Produtos de Limpeza": [
    { text: "Detergente", checked: false },
    { text: "Esponja", checked: false },
    { text: "Sabão em barra", checked: false },
    { text: "Água sanitária", checked: false },
    { text: "Desinfetante", checked: false },
    { text: "Multiuso", checked: false },
    { text: "Sabão em pó ou líquido", checked: false },
    { text: "Amaciante", checked: false },
    { text: "Vassoura", checked: false },
    { text: "Rodo", checked: false },
    { text: "Pá de lixo", checked: false },
    { text: "Balde", checked: false },
    { text: "Pano de chão", checked: false },
    { text: "Pano de limpeza", checked: false },
    { text: "Sacos de lixo (pequeno, médio, grande)", checked: false },
    { text: "Esponja de aço", checked: false },
    { text: "Luvas de limpeza", checked: false }
  ],
  "Higiene Pessoal": [
    { text: "Sabonete", checked: false },
    { text: "Shampoo", checked: false },
    { text: "Condicionador", checked: false },
    { text: "Creme dental", checked: false },
    { text: "Escova de dente", checked: false },
    { text: "Fio dental", checked: false },
    { text: "Desodorante", checked: false },
    { text: "Papel higiênico", checked: false },
    { text: "Cotonetes", checked: false },
    { text: "Absorventes (se necessário)", checked: false },
    { text: "Lâminas de barbear", checked: false },
    { text: "Toalhas (banho, rosto)", checked: false },
    { text: "Álcool em gel ou líquido", checked: false },
    { text: "Lenços umedecidos", checked: false }
  ],
  "Utensílios Básicos de Cozinha": [
    { text: "Pratos", checked: false },
    { text: "Copos", checked: false },
    { text: "Talheres", checked: false },
    { text: "Panelas", checked: false },
    { text: "Frigideira", checked: false },
    { text: "Peneira", checked: false },
    { text: "Tábua de corte", checked: false },
    { text: "Espátula/colher de pau", checked: false },
    { text: "Abridor de lata", checked: false },
    { text: "Potes plásticos com tampa", checked: false },
    { text: "Assadeira", checked: false },
    { text: "Panela de pressão", checked: false },
    { text: "Escorredor de macarrão", checked: false },
    { text: "Escorredor de louça", checked: false },
    { text: "Jarra de água", checked: false },
    { text: "Pano de prato", checked: false },
    { text: "Guardanapos de papel", checked: false },
    { text: "Papel toalha", checked: false },
    { text: "Papel alumínio", checked: false },
    { text: "Filme plástico", checked: false }
  ],
  "Outros Úteis": [
    { text: "Isqueiro ou fósforo", checked: false },
    { text: "Lâmpadas extras", checked: false },
    { text: "Pilhas", checked: false },
    { text: "Repelente/inseticida", checked: false },
    { text: "Remédios básicos", checked: false },
    { text: "Velas", checked: false },
    { text: "Sacolas reutilizáveis ou ecobags", checked: false }
  ]
};

// Carregar dados do localStorage
const dados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || dadosIniciais;

for (const categoria in dados) {
  const div = document.createElement('div');
  div.className = 'category';
  div.innerHTML = `<h2>${categoria}</h2>`;
  const ul = document.createElement('ul');

  dados[categoria].forEach(item => {
    const li = criarItem(item.text, item.checked);
    ul.appendChild(li);
  });

  const input = document.createElement('input');
  input.placeholder = '➕ Adicionar item';

  const btnAdd = document.createElement('button');
  btnAdd.innerText = 'Adicionar';
  btnAdd.onclick = () => {
    if (input.value.trim() !== '') {
      const novoItem = criarItem(input.value);
      ul.appendChild(novoItem);
      salvarDados();
      input.value = '';
    }
  };

  const addArea = document.createElement('div');
  addArea.className = 'add-area';
  addArea.appendChild(input);
  addArea.appendChild(btnAdd);

  div.appendChild(ul);
  div.appendChild(addArea);
  listasDiv.appendChild(div);
}

function criarItem(texto, checked = false) {
  const li = document.createElement('li');
  li.innerHTML = `<span>${texto}</span>`;

  if (checked) li.classList.add('checked');

  li.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      li.classList.toggle('checked');
      salvarDados();
    }
  };

  const btnExcluir = document.createElement('button');
  btnExcluir.innerText = '❌';
  btnExcluir.onclick = () => {
    li.remove();
    salvarDados();
  };

  li.appendChild(btnExcluir);
  return li;
}

// Função que salva os dados no localStorage
function salvarDados() {
  const categorias = document.querySelectorAll('.category');
  const dadosParaSalvar = {};

  categorias.forEach(cat => {
    const titulo = cat.querySelector('h2').innerText;
    const itens = [];

    cat.querySelectorAll('li').forEach(li => {
      itens.push({
        text: li.querySelector('span').innerText,
        checked: li.classList.contains('checked')
      });
    });

    dadosParaSalvar[titulo] = itens;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosParaSalvar));
}

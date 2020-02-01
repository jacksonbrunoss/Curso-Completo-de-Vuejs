const vue = new Vue({
    el: "#app",
    data: {
        produtos: [],
        produto: [],
        carrinho: []
    },
    filters: {
        numeroPreco(valor) {
            return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL" });
        }
    },
    computed: {
        carrinhoTotal() {
            let total = 0;
            if(this.carrinho.length) {
                this.carrinho.forEach(item => {
                    total += item.preco;
                })
            }
            return total;
        }
    },
    methods: {
        fetchProdutos() {
            try {
                fetch('./api/produtos.json', {method: 'get'})
                .then(r => r.json())
                .then(r => {
                    this.produtos = r;
                })
            }
            catch(err) {
                console.log('Aconteceu um erro: ', err);
            }
        },
        fetchProduto(id) {
            fetch(`./api/produtos/${id}/dados.json`)
            .then(r => r.json())
            .then(r => {
                this.produto = r;
            })
        },
        abrirModal(id) {
            this.fetchProduto(id);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        fecharModal({target, currentTarget}) {
            if (target === currentTarget) this.produto = false
        },
        ADDItem() {
            this.produto.estoque--;
            const {id, nome, preco } = this.produto
            this.carrinho.push({id, nome, preco});
        },
        removeItem(index) {
            this.carrinho.splice(index, 1)
            console.log(index);
        },
        checarLocal() {
            if(window.localStorage.carrinho) {
                this. carrinho = JSON.parse(window.localStorage.carrinho);
            }
        }
    },
    watch: {
        carrinho() {
            window.localStorage.carrinho = JSON.stringify(this.carrinho);
        }
    },
    created() {
        this.fetchProdutos();
        this.checarLocal();
    },
})
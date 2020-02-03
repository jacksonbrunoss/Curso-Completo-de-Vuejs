Vue.component('MostrarTempo', {
    name: 'MostrarTempo',
    data() {
        return {
            tempo: []
        }
    },
    template: `<div>{{tempo}}<div>`,
    methods: {
        PegarTempo() {
            try {
                fetch(`https://www.metaweather.com/api/location/455825`)
                .then(response => response.json())
                .then( response => {
                    this.tempo = response.consolidated_weather[0].max_temp;
                });
            }
            catch(e) {
                console.log(`Aconteceu algum erro: ${e}`)
            }
        }
    },
    created() {
        this.PegarTempo();
    },
});
const vue = new Vue({
    el: '#app',
    data: {
      
    }, 
}) 
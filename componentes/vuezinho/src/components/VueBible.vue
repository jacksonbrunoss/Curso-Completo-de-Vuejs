<template>
  <div>{{biblia}}</div>
</template>

<script>
export default {
  name: 'VueBible',
  data() {
    return {
      biblia: [],
    };
  },
  methods: {
    puxarBiblia() {
      fetch('https://bibleapi.co/api/verses/nvi/sl/23')
        .then(res => res.json())
        .then((response) => {
          this.biblia = response;
        });
    },
  },
  created() {
    this.puxarBiblia();
  },
};
</script>

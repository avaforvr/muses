Component({
  data: {
    dataA: 'initial a',
  },

  methods: {
    methodA() {
      this.setData({
        dataA: 'changed aa'
      });
    },
  }
});
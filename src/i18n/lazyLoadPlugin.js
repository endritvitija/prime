const lazyLoadPlugin = {
  type: 'backend',
  init: function () {},
  read: function (language, _, callback) {
    import(`./${language}.json`).then((obj) => {
      callback(null, obj);
    });
  },
  save: function () {},
  create: function () {},
};

export default lazyLoadPlugin;

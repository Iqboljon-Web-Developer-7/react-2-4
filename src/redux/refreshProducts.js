const refreshProducts = (state = false, action) => {
  switch (action.type) {
    case "refreshProducts":
      state = !state;
      return state;
    default:
      return state;
  }
};

export default refreshProducts;

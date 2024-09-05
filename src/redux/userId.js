const userId = (state = localStorage.getItem("userId") || null, action) => {
  switch (action.type) {
    case "saveId":
      state = action.id;
      return state;
    default:
      return state;
  }
};

export default userId;

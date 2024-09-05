const userToken = (
  state = localStorage.getItem("userToken") || null,
  action
) => {
  switch (action.type) {
    case "saveToken":
      localStorage.setItem("userToken", JSON.stringify(action.token));
      return state;
    default:
      return state;
  }
};

export default userToken;

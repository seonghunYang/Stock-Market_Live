import produce from "immer";

const initialState = {
  companyList: null ,
  searchedCompanyList: null,
}

const reducer = produce((state, action) => {
  switch(action.type) {
    case "CREATE_COMPANYLIST": 
      state.companyList = action.payload;
      state.searchedCompanyList = action.payload;
      console.log(state.companyList)
      break;
    case "SEARCH_COMPANY":
      state.searchedCompanyList = action.payload;
    default:
      break;
  }
}, initialState);

export default reducer;
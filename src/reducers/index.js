import produce from "immer";

const initialState = {
  companyList: null ,
  searchedCompanyList: null,
  companyInfo: null,
}

const reducer = produce((state, action) => {
  switch(action.type) {
    case "CREATE_COMPANYLIST": 
      state.companyList = action.payload;
      state.searchedCompanyList = action.payload;
      break;
    case "SEARCH_COMPANY":
      state.searchedCompanyList = action.payload;
      break;
    case "CREATE_DETAIL":
      state.companyInfo = action.payload;
      break;
    default:
      break;
  }
}, initialState);

export default reducer;
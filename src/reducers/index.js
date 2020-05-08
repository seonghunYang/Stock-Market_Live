import produce from "immer";

const initialState = {
  companyList: null ,
  searchedCompanyList: null,
  companyInfo: null,
  companyStockInfo: null 
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
      state.companyStockInfo = action.payload2;
      break;
    default:
      break;
  }
}, initialState);

export default reducer;
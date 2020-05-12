import produce from "immer";

const initialState = {
  companyList: null ,
  searchedCompanyList: null,
  companyInfo: null,
  companyStockInfo: null,
  companyCandleInfo: null,
  news: null,
  wishlist: []
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
      state.companyCandleInfo = action.payload3;
      break;
    case "CREATE_JENERAL_NEWS":
      state.news = action.payload;
      break;
    case "CREATE_SYMBOL_NEWS":
      state.news = action.payload;
      break;
    case "ADD_WISHLIST": 
      state.wishlist.push(action.symbol);
    default:
      break;
  }
}, initialState);

export default reducer;
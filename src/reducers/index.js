import produce from "immer";

const initialState = {
  companyList: null ,
  searchedCompanyList: null,
  companyInfo: null,
  companyStockInfo: null,
  companyCandleInfo: null,
  news: null,
  wishlist: [],
  loading: false,
  importantStock : null
}

const reducer = produce((state, action) => {
  switch(action.type) {
    case "CREATE_COMPANYLIST": 
      state.companyList = action.payload;
      state.searchedCompanyList = action.payload;
      state.wishlist = action.wishlist;
      state.importantStock = action.importantStock
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
      console.log(action.symbol);
      state.wishlist.push(action.symbol);
      break;
    case "DELETE_WISHLIST":
      const cleanwishlist = state.wishlist.filter(function(item) {  //true만 남김
        return item.symbol !== action.symbol.symbol;
      }); 
      state.wishlist = cleanwishlist;
      break;
    case "UPDATE_CANDLEINFO":
      state.companyCandleInfo = action.payload   
      break;
    case "START_LOADING":
      state.loading = true;
      break;
    case "END_LOADING":
      state.loading = false;
      break;
    default:
      break;
  }
}, initialState);

export default reducer;
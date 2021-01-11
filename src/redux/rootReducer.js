import * as auth from "../app/modules/Auth/_redux/authRedux";

import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { walletReducer } from "../store/reducers/WalletReducer";

export const rootReducer = combineReducers({
  wallet: walletReducer,
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
});

// export function* rootSaga() {
//   yield all([auth.saga()]);
// }

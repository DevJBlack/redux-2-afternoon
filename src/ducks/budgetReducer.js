import axios from 'axios'

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false

}

const REQUEST_BUDGET_DATA =  'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const requestBudgetDate = () => {
  let data = axios.get('/api/budget-data').then(res => res.data)

  const action = {
    type: REQUEST_BUDGET_DATA,
    payload: data
  }
  return action
}

export const addPurchase = (price, description, category) => {
  let data = axios.post('/api/budget-data/purchase', {
    description,
    price,
    category
  }).then(res => res.data)

  const action = {
    type: ADD_PURCHASE,
    payload: data
  }
  return action
}

export const removePurchase = (id) => {
  let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
  const action = {
    type: REMOVE_PURCHASE,
    payload: data
  }
  return action
}

export default function budgetReducer(state = initialState, action){
  switch(action.type){
    case REQUEST_BUDGET_DATA + '_PENDING':
      return { ...state, loading: true }
    case REQUEST_BUDGET_DATA + '_FULFILLED':
      return { ...state, ...action.payload, loading: false }
    case ADD_PURCHASE + '_PENDING':
      return { ...state, loading: true}
    case ADD_PURCHASE + '_FULFILLED':
      return { ...state, purchase: action.payload, loading: false }
    case REMOVE_PURCHASE + '_PENDING':
      return { ...state, loading: true };
    case REMOVE_PURCHASE + '_FULFILLED':
      return { ...state, loading: false, purchases: action.payload}
    default:
      return state;
  }
}
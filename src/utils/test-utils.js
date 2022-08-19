import React from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux'
import { render as rtlRender } from '@testing-library/react'
import rootReducer from '../store/rootReducer';
import { BrowserRouter } from "react-router-dom";
import thunkMiddleware from 'redux-thunk'

const renderWithRedux = ( ui, {initialState, store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware)), ...renderOptions} = {}) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { renderWithRedux }
import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import store from './Config/store'
import './css/all.css'
import './css/index.css'
const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
      <Suspense fallback={'Conectando al servidor...'} >  
        <Provider store={store} > 
          <App />
        </Provider>
      </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
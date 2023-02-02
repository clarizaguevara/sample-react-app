
import DevStore from './store.dev'
import ProdStore from './store.prod'

let store = null
if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
    store = DevStore()
} else {
    store = ProdStore()
}

export default store

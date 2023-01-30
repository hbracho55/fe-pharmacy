import { useState } from 'react';
import './App.css'

function App() {

  const [formValues, SetFormValues] = useState({
      commune: '',
      store: ''
  })
  const [stores, setStores] = useState([])

  const onInputChange = ({target}) => {
      SetFormValues({
          ...formValues,
          [target.name]: target.value
      })
  }

  const onSubmit  = async(event) => {
    try{
      event.preventDefault()
      const bodyData = { commune: `${formValues.commune}`, store: `${formValues.store}` }

      const resp = await fetch(`http://localhost:8080/pharmacies`, {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(bodyData) 
      });
      const data = await resp.json();
      
      setStores(data.map(p=> ({
        localDireccion: p.localDireccion,
        localLat: p.localLat,
        localLng: p.localLng,
        localNombre: p.localNombre,
        localTelefono: p.localTelefono 
      })))

    }catch(error){
      console.error('Error retrieving data')
    }
  }

  return (
    <div className="App">
      <h1>Pharmacies on duty</h1>
      <div className="card">
        <form className="container" onSubmit={ onSubmit }>
          <div className="form-group mb-2">
              <label>Comunne: </label>
              <input 
                  type="text" 
                  className={ `form-control ` }
                  placeholder="Type the Commune name.."
                  name="commune"
                  value={ formValues.commune }
                  onChange={ onInputChange }
              />
              {"  -   "}
              <label>Store: </label>
              <input 
                  type="text" 
                  className={ `form-control ` }
                  placeholder="Type the Store name.."
                  name="store"
                  value={ formValues.store }
                  onChange={ onInputChange }
              />
          </div>
          <div>.</div>
          <button 
              type="submit">
              Search pharmacies
          </button>
        </form>
      </div>
      <div className="read-the-docs">

        <ol>
          {
          stores.map(store => {
            return <li key={store.localNombre+store.localLat}>{ `${store.localNombre} / ${store.localTelefono} / ${store.localDireccion} / ${store.localLat} / ${store.localLng}`}</li>
          })}
        </ol>
      </div>
    </div>
  )
}

export default App

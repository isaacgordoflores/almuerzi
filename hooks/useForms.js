import { useState } from 'react'

/**
 * Esta funcion devuelve un objeto que contiene subscribe,
 * handleSubmit y los inputs del formulario
 * 
 */
export default (initialState, onSubmit) => {

    /**
     * uso setState para guardar los valores del campo formulario
     * le paso initialState para indicarle si el usuario entra con id, email, user ...
     * setInputs se ejecuta cada vez que llame a la funcion subscribe
     */
    const [inputs, setInputs] = useState(initialState)

    /**
     * En subscribe recibo el nombre del campo "field" (email, password...) + el valor "value" 
     * con ambos llamo a setInputs para que actualice los valores
     * pero !!!
     * antes creo una copia de todos los valores anteriores del formulario ( ...inputs )
     * para que no se eliminen los valores anteriores
     * 
     * luego cambia la propiedad del campo "field" que correponde asignandole el valor que se reciba en dicho campo
     * 
     */
    const subscribe = field => value => {
        setInputs({ ...inputs, [field]: value })
    }

    const handleSubmit = () => {
        onSubmit(inputs)
    }

    return { subscribe, handleSubmit, inputs }
}

import React, { Component } from 'react';
import Imagen from './Imagen';
import Navegacion from './Navegacion';

class Resultado extends Component {
    
    mostrarImagenes = ()=>{
        let imagenes = this.props.imagenes;
        if(imagenes.length===0) return null;

        return(
            <React.Fragment>
                <div className="col-12 p-5 row">
                    {imagenes.map(imagen=>(
                        <Imagen
                            key = {imagen.id}
                            imagen = {imagen}
                        />    
                    ))}
                </div>
                <Navegacion
                    paginaAnterior = {this.props.paginaAnterior}
                    paginaSiguiente = {this.props.paginaSiguiente}
                    pagina = {this.props.pagina}
                    totalPaginas = {this.props.totalPaginas}
                />
            </React.Fragment>
        );
    }
    
    render() {
        return (
            <React.Fragment>
                {this.mostrarImagenes()}
            </React.Fragment>
        );
    }
}

export default Resultado;
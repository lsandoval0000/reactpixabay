import React, { Component } from 'react';

class Navegacion extends Component {

    mostrarAnterior=()=>{
        let pagina = this.props.pagina;
        if(pagina === 1) return null;

        return(
            <button type="button" onClick={this.props.paginaAnterior} className="btn btn-info mr-1">&larr; Anterior</button>
        );
    }

    mostrarSiguiente=()=>{
        let {pagina,totalPaginas} = this.props;
        if(pagina === totalPaginas) return null;

        return(
            <button type="button" onClick={this.props.paginaSiguiente} className="btn btn-info">Siguiente &rarr;</button>
        );
    }

    render() {
        return (
            <div className="py-5">
                {this.mostrarAnterior()}
                {this.mostrarSiguiente()}
            </div>
        );
    }
}

export default Navegacion;
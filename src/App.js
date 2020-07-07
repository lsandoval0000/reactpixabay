import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      termino : '',
      imagenes : [],
      pagina:0,
      cargando:false,
      totalPaginas:0,
      porPagina : 20
    };
  }

  consultarAPI= async ()=>{
    const url=`https://pixabay.com/api/?key=17250280-cd2a48caeecb3f224c7c44e9c&q=${this.state.termino}&per_page=${this.state.porPagina}&page=${this.state.pagina}`;

    await fetch(url)
    .then(respuesta=>{
      this.setState({
        cargando:true
      });
      return respuesta.json();
    })
    .then(datos =>{
      let totalPaginas = Math.ceil(datos.totalHits/this.state.porPagina);
      setTimeout(() => {
        this.setState({
          imagenes:datos.hits,
          cargando: false,
          totalPaginas: totalPaginas
        });
      }, 1000);
    });
  }

  paginaAnterior =()=>{
    let pagina = this.state.pagina;
    if(pagina === 1) return null;
    pagina -=1;
    this.setState({
      pagina : pagina
    },()=>{
      this.consultarAPI();
      this.scroll();
    });
  }

  paginaSiguiente =()=>{
    let pagina = this.state.pagina;

    if(pagina === this.state.totalPaginas) return null;

    pagina +=1;
    this.setState({
      pagina : pagina
    },()=>{
      this.consultarAPI();
      this.scroll();
    });
  }

  scroll = ()=>{
    let elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('auto','start');
  }

  datosBusqueda = (termino)=>{
    this.setState({
      termino : termino,
      pagina : 1
    },()=>{
      this.consultarAPI();
    });
  }

  render() {
    let cargando = this.state.cargando;
    let resultado = '';
    if(cargando){
      resultado = <div className="spinner">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                  </div>
    }else{
      resultado = <Resultado
                    imagenes = {this.state.imagenes}
                    paginaAnterior = {this.paginaAnterior}
                    paginaSiguiente = {this.paginaSiguiente}
                    pagina = {this.state.pagina}
                    totalPaginas = {this.state.totalPaginas}
                  />
    }

    return (
      <div className="app container">
          <div className="jumbotron">
            <p className="lead text-center">Buscador de Imágenes</p>
            <Buscador
              datosBusqueda= {this.datosBusqueda}
            />
          </div>
          <div className="row justify-content-center">
            {resultado}
          </div>
      </div>
    );
  }
}

export default App;
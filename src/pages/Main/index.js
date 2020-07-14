import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';

// vamos usar classe pq vamos manipular o estado. state. ta passando um array vazio, inicia vazio.
class Main extends Component {
    state = {
        biographies: [],
        pages: 1,
        page: 1
    }

    componentDidMount() {
        this.loadBiographies();
    }

    // colocar async - espera que algo aconteça - impede que  a aplicação pare. tipo um ignora isso e segue se não houver o gatilho
    // lista de documentos. cada doc é um objeito {}, 
    loadBiographies = async (page = 1) => {
        const response = await api.get(`/biographies?page=${page}`)

        const { docs, pages} = response.data

        // state é uma lista, biographies nao precisa de chaves novamente
        this.setState({ biographies: docs, page, pages})
    }

    prevPage = () => {
        const {page} = this.state;
        
        if (page === 1 ) return;
        
        const pageNumber = page -1;
        
        this.loadBiographies(pageNumber);
    }

    // não é async pq não espera nenhuma resposta
    nextPage = () => {
        const { page, pages }= this.state;

        if (page === pages) return;

        const pageNumber = page +1;

        this.loadBiographies(pageNumber)
    }

    render() {
        const { biographies, page, pages } = this.state;
        //console.log('o que vem do state: ', biographies)
        //id é necessário pra não dar warning no article
        return (
            <div className='biography-list'>
                {biographies.map(biography => (
                    <article key={biography._id}>
                        <strong>{biography.nome}</strong>
                        <p className='biography-description'>{biography.description}</p>
                        <Link to={`/biography/${biography._id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === pages}  onClick={this.nextPage}>Próximo</button>
                </div>

            </div>
        )
    }
}

export default Main;
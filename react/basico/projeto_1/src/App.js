import logo from './logo.svg';
import './App.css';
import React from 'react'

class App extends React.Component {
  state = {
    nome: "Gabriel Rosa",
    cont: 0,
    posts: []
  };

  //Função que soma 1 ao cont a cada click no nome
  nome_onClick = () => {
    const { cont } = this.state;
    setTimeout(() => {
      this.setState({
        cont: cont + 1
      });
    }, 1000);

  }

  //Recuperando itens de uma API (maneira 1) - ja atualiza os dados
  loadPosts = () => {
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(response => this.setState({ posts: response }));
  }

  //Recuperando itens de uma API (maneira 1)
  loadPosts2 = async () => {

    //Declara as variaveis que buscam os dados da requisição e faz um unico await para as duas requisições
    const [posts, photos] = await Promise.all([
      fetch('http://jsonplaceholder.typicode.com/posts'),
      fetch('http://jsonplaceholder.typicode.com/photos')
    ])

    const [postsJason, photoJason] = await Promise.all([
      posts.json(),
      photos.json()
    ])

    //Junta duas listas de json em uma unica com um paremetro cover vindo de photoJason
    const postAndPhoto = postsJason.map((post, index) => {
      return { ...post, cover: photoJason[index].url }
    })

    this.setState({ posts: postAndPhoto })

  }

  //A função componentDidMount realiza o que estiver em seu corpo assim que o elemento abaixo for renderizado
  componentDidMount() {
    //Recuperando itens de uma API
    this.loadPosts2();
  }

  //A função componentDidUpdate realiza o que estiver em seu corpo assim que o elemento abaixo alterar seu estado
  componentDidUpdate() {
    console.log('O iten mudou seu estado')
    this.nome_onClick()
  }

  //A função componentWillUnmount realiza o que estiver em seu corpo assim que o elemento abaixo for desmontado 
  componentWillUnmount() {
    //Exclui todo lixo de memoria que pode ser gerado em alguma recursão
    clearTimeout(this.state.cont);
  }

  //A função render renderiza o layout na tela 
  render() {
    const { nome, cont, posts } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.nome_onClick}>
            {nome} {cont}
          </p>
          <div className='posts'>
            {posts.map(post => (
              <div key={post.id} className='post-card'>
                <img src={post.cover} alt={post.title} />
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}


// É preciso exportar toda class ou função dessa maneira para que elas possam serem utilizadas em outros arquivos 
export default App;

import React, { Component } from 'react';

class Client extends Component {

  //creer une reference pour la soumission du formualaire avec la methode createRef()
  //clientInput est une variable qui va servir de reference a un elt du DOM en
  // inserant la ref dans le champ input

 // clientInput = React.createRef();

  //Puis inserer l'input suivant dans le formulaire
 /* <form onSubmit={this.handleSubmit}>
          <input ref={this.clientInput} type="text" placeholder="ajouter un client" />
          <button>Valider</button>
        </form>
*/


// les props offrent la possibilite d'utiliser une variable declarer 
// sur un composant A vers un composant B 
/*

<Client details={client} /> // Composant A sur le quel la variable client existe

sur le composant B (au lieu de: this.client.nom)
faire: this.props.details.nom

Pour le cas des fonctions présente dans le composant A et appelé dans le composant B

<Client details={client} onDelete={this.handleDelete}/> // Composant A sur le quel la variable fonction existe

composant B
remplace le: this.handleDelete par: this.props.onDelete

e.g:
composant A

      <li key={client.id}>
        {client.nom} <button onClick={() => this.handleDelete(client.id)}>X</button>
      </li>

composant B

Declarer les nouvelles variables
    
    const details = this.props.details,
    const onDelete = this.props.onDelete

ou declarer de cette maniere:
   
    const {details, onDelete} = this.props;

      <li key={details.id}>
        {details.nom} <button onClick={() => onDelete(details.id)}>X</button>
      </li>

*/

  state = {
    clients: [
      { id: 1, nom: 'Daurian balenvokolo' },
      { id: 2, nom: 'servet supreme' },
      { id: 3, nom: 'vincia carmen' },
    ],
    nouveauClient: 'daurian'
  };

  /*
  //Toujours utiliser setState pour changer l'état de nos composants qui sont représentés par des objets
  //Avoir l'habitude de déclarer des methodes flechées pour gerer facilement le "this"

  handleClick = () => {

//function slice() permet de creer une copie de notre objet clients

    const clients = this.state.clients.slice();
    clients.push({id: 4, nom: "Anne Dupont"});
    this.setState({clients: clients});
  };

  //boutton faisant appel à la fonction pour réagir à l'évènement
  //interpoler la fonction sans les paranthèses a la fin

  <button onClick={this.handleClick}>Cliquez ici</button>
  */ 

  //gestion de l'evenement de suppression

  handleDelete = (id) =>{

    // creer premièrement une copie du tableau des clients
    const clients =this.state.clients.slice();

    // trouver l'index du client à supprimer à travers la methode findindex()
    const index = clients.findIndex(client => client.id === id);

    clients.splice(index, 1);

    //met à jout le state ou l'etat du composant
    this.setState({clients: clients});

  };


  //gestion de sooumission de formulaire (enregistrer un client via un formulaire)

  handleSubmit = (event) =>{

    //fonction preventDefault() pour eviter le rechargement de la page
    event.preventDefault();
    const id = new Date().getTime();
    const nom =this.state.nouveauClient;

    const client = {id: id, nom: nom};

    const clients = this.state.clients.slice();
    clients.push(client);
    
    this.setState({clients: clients, nouveauClient: ''});

  }

  handleChange = (event)=>{
    const value =event.currentTarget.value;
    this.setState({nouveauClient: value});
  }

  render() {
    const elements = this.state.clients.map((client) => (
      <li key={client.id}>
        {client.nom} <button onClick={() => this.handleDelete(client.id)}>X</button>
      </li>
    ));

    return (
      <div>
        <ul>{elements}</ul>

        <form onSubmit={this.handleSubmit}>
          <input value={this.state.nouveauClient} onChange={this.handleChange} type="text" placeholder="ajouter un client" />
          <button>Valider</button>
        </form>

        
      </div>
    );
  }
}

export default Client;

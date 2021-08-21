let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon) {
      pokemonList.push(pokemon);
    } 
    else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  
  function remove(start, number) {
    document.write(`<br><p>${pokedex[start].name}
      </p><p> </p><br>`);
    
    pokemonList.splice(start, number);
  }
  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    listItem.classList.add('col-lg-4', 'col-md-6', 'col');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-lg', 'btn-primary');
    button.dataset.target = "#exampleModal";
    button.dataset.toggle = "modal";
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  };
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
  }).catch(function (e) {
    console.error(e);
  });
  };
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
      
    });
  };

  function showModal(pokemon) {
    console.log('showModal is running');

    let modalContent = document.querySelector('.modal-content');

    let modalHeader = document.querySelector('.modal-header');
    let modalBody = document.querySelector('.modal-body');
    let modalFooter = document.querySelector('.modal-footer');
    let buttonClose = document.querySelector('#close');
    let buttonX = document.querySelector('#button-x');
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name; 
    let contentElement = document.createElement('p');
    contentElement.innerText = pokemon.height;
    let weightElement = document.createElement('p');
    weightElement.innerText = pokemon.weight;
    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;
    // modalContent.innerHTML = '';
    modalHeader.innerHTML = '';
    modalBody.innerHTML = '';

    console.log(pokemon);

    //modal content
    modalHeader.appendChild(titleElement);
    modalBody.appendChild(contentElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(imgElement);
    //modal botton buttons 
    modalHeader.appendChild(buttonX); //close X button added
    modalFooter.appendChild(buttonClose); //Close btn-primary added
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
  };
  return {
    add: add,
    getAll: getAll,
    remove: remove,
    addListItem: addListItem,
    loadList: loadList,
    loadDetils: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
  };
})();
pokemonRepository.loadList().then(function() {
  // data is being loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
function changeColor() {
  let body = document.querySelector('body');
  body.classList.toggle('change-color');
};






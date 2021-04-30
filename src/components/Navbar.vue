<template>
    <nav>
      <a><router-link to="/home"><img src="../assets/logoBeau.svg" alt="logo Site" ></router-link></a>  
      <a><router-link to="/drawing"><span>Atelier Dessin</span></router-link></a>    
      <a><router-link to="/flashCards"><span>FlashCards</span></router-link></a>
      <a><router-link to="/memoryCard"><span>MemoryCard</span></router-link></a>
      <a><router-link to="/search"><span>Trouver un Kanji</span></router-link></a>
      <a><router-link to="/about"><span>A propos</span></router-link></a>


    </nav>
</template>

<style  scoped>

nav {
    background-color: #222; 
}
img {
    width: 60px;
    height: 60px;
}
a {
    margin-right: 3%;
 
}
/* Supprime la barre sous les liens */
a:link { text-decoration: none; }

a:visited { text-decoration: none; }

a:hover { text-decoration: none; }

a:active { text-decoration: none; }

span:hover {
          color: #ea4f4c;
}


span {
    margin-bottom: 15px;
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    color: white;
    align-items: center;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
</style>
<template>
    <nav>
      <a><router-link to="/home"><img src="../assets/logoBeau.svg" alt="logo Site" ></router-link></a>  
      <a><router-link to="/drawing"><span>Atelier Dessin</span></router-link></a>    
      <a><router-link to="/flashCards"><span>FlashCards</span></router-link></a>
      <a><router-link to="/memoryCard"><span>MemoryCard</span></router-link></a>
      <a><router-link to="/pictures"><span>PicturesGame</span></router-link></a>
      <a><router-link to="/search"><span>Trouver un Kanji</span></router-link></a>
      <a><router-link to="/about"><span>A propos</span></router-link></a>


    </nav>
</template>

<script>

export default {
    methods :{
        getUrl(){
            console.log(window.location.pathname);
        }
    },
    created(){  
        this.getUrl()

        var links = document.getElementsByTagName("a")
        console.log(links)
        var hrefs = Array.from(links).map(link => {
           return link.href
        })

        console.log(hrefs)

    }

}
</script>


<style  scoped>

nav {
    background-color: rgb(34,34,34); 
    height: 65px;
}
img {
    width: 65px;
    height: 65px;
    float : left;
}
a {
    margin-right: 1%;
 
}
/* Supprime la barre sous les liens */
a:link { text-decoration: none; }

a:visited { text-decoration: none; }

a:hover { text-decoration: none; }

a:active { text-decoration: none; }

span:hover {
  background-image: linear-gradient(to top, rgb(235,210,205), rgb(250,240,205), rgb(235,210,205));
  color: black
}
span:hover img {opacity: 0.5;}


span {
    float:left;
    padding: 23px;
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    color: white;
    align-items: center;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
</style>
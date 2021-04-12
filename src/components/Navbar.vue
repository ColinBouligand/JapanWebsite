<template>
    <nav> <a><img src="../assets/logo.png" alt="logo Site" ></a>    <a><span>Kanjos</span></a>      <a><span>Atelier Dessin</span></a>       <a><span>Flash Cards</span></a>
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
<template>
<div>
        <h1>A propos de nous</h1>
        <p>Ce site a été créé par </p>
        <h2>Colin Bouligand & Louis Euvrard</h2>
        <p>Il a été réalisé dans le cadre du projet de fin d'année de notre Licence 3 d'informatique à l'université d'informatique d'Angers.</p>
        <p>Il a pour but principal d'illustrer les compétences acquises lors de notre formation.</p>
        <p>On y compte par exemple les compétences en développement web et en déploiement qui nous ont permis de réaliser ce site et de le mettre en ligne.</p>
        <p>Sans oublier le python et le machine learning qui nous ont permis de réaliser cette reconnaissance des kanji dessinés par un utilisateur.</p>
        <p>Merci aux API qui nous ont permis de réaliser ce site : <a href="https://kanjiapi.dev/">kanjiapi</a>, <a href="https://libretranslate.com/">libretranslate</a>, <a href="https://app.kanjialive.com/api/docs">kanjialive</a> et <a href="https://www.pexels.com/">pexels</a>. </p>
</div>
</template>

<style scoped>

div {
    display: flex;
    flex-direction: column;
    width:98%;
    text-align: center;
}

    h1,h2,p {
        float: left;
        margin: 1%; 
        color :#faf0cd;
        font-weight: bold;
    }

    p {
        font-size:130%;

    }

    a {
         color :#faf0cd;
        font-weight: bold;  
    }
</style>
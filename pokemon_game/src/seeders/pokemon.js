const pool = require('../db/connection');

const pokemonSeeder = async () => {
    const {results} = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151').then(res => res.json());

    //con esto vemos que si se imprime todos los pokemones
    //console.log(results);

    //const pokemons = fetch('https://pokeapi.co/api/v2/pokemon/1').then(res => res.json());


        const pokemons = await Promise.all(results.map(async (poke)=>{
            //muy importante esto para que se ejecute  
            const pokemon = await fetch(poke.url).then(res => res.json()); //invocamos el atributo url de poke que nos sale al ejecutar

        return {
            name: poke.name,
            image: pokemon.sprites.other.dream_world.front_default,
        }


        })
    
    );

    //console.log(await Promise.all(pokemons));

    //este es el bueno
    //console.log(pokemons);


    let conn; 

    try{
        conn = await pool.getConnection();

        //desahabilitamos la revision de llaves foraneas
        await conn.query('SET FOREIGN_KEY_CHECKS=0');

        //  con TRUNCATE ELIMINAMOS TODOS LOS REGISTROS
        await conn.query('TRUNCATE pokemons');

         //habilitamos la revision de llaves foraneas
         await conn.query('SET FOREIGN_KEY_CHECKS=1');

        pokemons.forEach((pokemon)=>{
            conn.query('INSERT INTO pokemons(name, image) VALUES (?, ?)',[
                pokemon.name,
                pokemon.image

            ])

        });

    }catch(err){
        console.log(err);

    }finally{
        if(conn) conn.end();
    }


}

module.exports=pokemonSeeder;
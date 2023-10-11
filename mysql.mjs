import knex from 'knex';


const knexInstance = knex(
{
    client: 'mysql2',
    connection:{
        host:'143.106.241.3',
        user:'cl201272',
        password:'cl*26082005',
        database:'cl201272',
        port:3306,
    },
}
);

export default knexInstance
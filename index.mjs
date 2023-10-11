import { gql } from "apollo-server";
import { ApolloServer } from "apollo-server";
import knex from './mysql.mjs';
//interface
const typeDefs = gql `
    type Aluno {
        id: ID! #notnull
        ra: Int!
        nome: String!
        email: String!
    }

    type Query {
        aluno(ra: Int!): Aluno!
        alunos: [Aluno]!
    }

    
    type Mutation{
        createAluno(ra: Int!, nome: String!, email: String!): Aluno!
        deleteAluno(ra: Int!): Aluno!
        updateAluno(id: ID!, ra: Int!, nome: String!, email: String!): Aluno!
    }
`;

const resolvers = {
    Query: {
        alunos: async() =>{
            //select * from
            return knex("alunos").select("*");
        },
        aluno: async (_,{ra}) =>{
            const alunos = await knex('alunos').where('ra',ra).first();
            return alunos;
        }
    },
    Mutation:{
        createAluno: async(_,{ ra,nome,email }) => {
            await knex("alunos").insert({ra,nome,email});
            const novoAluno = await knex("alunos").where("ra",ra).first();
            return novoAluno;
        }
    }
}

    const server = new ApolloServer({typeDefs, resolvers});
    server.listen().then(({ url })=>{
        console.log(`Servidor GraphQL rodando em ${url}`);
    })
## Projeto desenvolvido em 24h durante o hackathon do Banco do Brasil no Rec'N Play

## Descrição do Projeto
Este projeto foi desenvolvido durante um hackathon para responder ao desafio: **"Como facilitar a coleta e o manejo sustentável de resíduos eletrônicos usando visão computacional para identificar objetos destinados ao descarte?"**

### Nossa Solução
A solução criada inclui três funcionalidades principais:
- **Detecção de Eletrônicos**: Identificação automática de itens eletrônicos para descarte.
- **Sistema de Recompensas**: Pontuação para incentivar o descarte responsável, com pontos diferenciados para cada tipo de resíduo eletrônico.
- **Localização de Pontos de Coleta**: Identificação das agências do Banco do Brasil mais próximas ao usuário para facilitar o descarte.

Essas funcionalidades promovem o descarte sustentável e posicionam o Banco do Brasil como um incentivador da sustentabilidade.

## Tecnologias Utilizadas
- **Modelo de Visão Computacional**: Vertex AI do Google Cloud para detecção de produtos eletrônicos.
- **Back-end**: Nest.js com autenticação JWT, banco de dados PostgreSQL, Docker e testes com Insomnia. ([Repositório do front-end](https://github.com/pedroandriottii/hackaton-bb-frontend))
- **Front-end**: Next.js e React, com estilização em Tailwind CSS. ([Repositório do back-end](https://github.com/pedroandriottii/hackaton-bb-backend))

## Como Rodar o Projeto

1. Clone o repositório do back-end:
   ```bash
   git clone https://github.com/pedroandriottii/hackaton-bb-backend
   cd https://github.com/pedroandriottii/hackaton-bb-backend

2. Clone o repositório do front-end:
   ```bash
   git clone https://github.com/pedroandriottii/hackaton-bb-frontend
   cd https://github.com/pedroandriottii/hackaton-bb-frontend
   
3. Navegue até a pasta hackathon-bb-backend:
   ```bash
   cd hackaton-bb-backend
   docker-compose up
   npm run start

4. Navegue até a pasta hackathon-bb-frontend:
   ```bash
   cd hackaton-bb-frontend
   npm run dev

## Equipe
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/gabrielpires-1">
        <img src="https://avatars.githubusercontent.com/u/111147078?v=4" width="100px;" alt="Foto Albert"/><br>
        <sub>
          <b>Gabriel Pires</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/lilymtbr">
        <img src="https://avatars.githubusercontent.com/u/142419881?v=4" width="100px;" alt="Foto Caio"/><br>
        <sub>
          <b>Lisa Matubara</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/pedroandriottii">
        <img src="https://avatars.githubusercontent.com/u/112347899?v=4" width="100px;" alt="Foto Stora"/><br>
        <sub>
          <b>Pedro Andriotti</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/MatheusVelame">
        <img src="https://avatars.githubusercontent.com/u/142419976?v=4" width="100px;" alt="Foto Megas"/><br>
        <sub>
          <b>Matheus Velame</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

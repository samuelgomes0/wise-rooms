# Wise Rooms

**Conectando espaços, criando possibilidades.**

Wise Rooms é um sistema intuitivo de agendamento e reserva de espaços institucionais como salas, laboratórios, auditórios, e muito mais. O projeto foi desenvolvido para otimizar a gestão desses espaços, proporcionando uma experiência fluida e prática tanto para administradores quanto para usuários.

## Tecnologias Utilizadas

- **Front-end**

  - [TypeScript](https://www.typescriptlang.org/)
  - [React](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcn/UI](https://shadcn.dev/)

- **Back-end**
  - [TypeScript](https://www.typescriptlang.org/)
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Prisma ORM](https://www.prisma.io/)
  - [PostgreSQL](https://www.postgresql.org/)

## Funcionalidades Principais

- **Gerenciamento de Usuários e Autenticação**  
   Suporte para criação de contas, login e atribuição de papéis com diferentes permissões de acesso.

- **Reserva de Salas**  
   Usuários podem visualizar a disponibilidade das salas e realizar reservas para horários e datas específicas, com verificação de conflitos de agendamento.

- **Gerenciamento de Recursos**  
   Administração de recursos associados às salas, permitindo a adição, edição e remoção de equipamentos.

- **Histórico de Reservas e Cancelamentos**  
   Usuários podem visualizar o histórico de suas reservas e realizar cancelamentos, se necessário.

- **Gerenciamento de Salas**  
   Criação, edição e exclusão de salas com informações detalhadas.

## Instalação

Siga as etapas abaixo para rodar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Passos para rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/samuelgomes0/wise.rooms.git
   ```

2. Acesse os diretórios do projeto:

   ```bash
   cd wise.rooms/client
   cd wise.rooms/server
   ```

3. Instale as dependências em ambos:

   ```bash
   npm install
   ```

4. Configure os arquivos `.env` com as variáveis de ambiente necessárias. Exemplo:

   ```bash
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

5. Rode as migrações do Prisma no server para configurar o banco de dados:

   ```bash
   npx prisma migrate dev
   ```

6. Inicie os ambientes de testes em ambos os diretórios:

   ```bash
   npm run dev
   ```

7. Acesse o projeto. Exemplo: `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Se você deseja melhorar o projeto, siga os passos:

1. Faça um fork do projeto.
2. Crie uma nova branch com a sua funcionalidade (`git checkout -b minha-feature`).
3. Commit suas mudanças (`git commit -m 'Adicionar minha nova feature'`).
4. Envie para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.

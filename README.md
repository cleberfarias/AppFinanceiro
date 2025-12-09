# AppFinanceiro

Uma aplicação web (React) para controle básico de finanças pessoais/empresariais. Este projeto utiliza React, Firebase e algumas bibliotecas de UI e utilitários (Material UI, Bootstrap, FontAwesome, xlsx) para fornecer cadastro de lançamentos, visualização de saldos e importação/exportação simples.

> Observação: este README foi criado com base na estrutura do repositório e nas dependências listadas em package.json.

## Funcionalidades principais (exemplos)
- Cadastro de entradas e saídas (receitas e despesas)
- Visualização de saldo e histórico de lançamentos
- Importação/exportação de dados em formato Excel (biblioteca xlsx)
- Persistência em Firebase (Realtime Database / Firestore / Auth conforme configuração do projeto)
- UI construida com Material UI / Bootstrap e ícones via FontAwesome

> Verifique a implementação no diretório `src/` para confirmar as funcionalidades exatas e rotas do projeto.

## Tecnologias
- React (react-scripts)
- Firebase (firebase)
- Material UI (@mui/material, @mui/icons-material)
- Bootstrap + bootstrap-icons
- styled-components, react-icons
- xlsx (para importação/exportação)
- FontAwesome (ícones)

## Pré-requisitos
- Node.js (recomendado >= 18)
- npm
- Conta no Firebase (para usar hosting, Firestore/Realtime DB e Auth, se aplicável)
- Firebase CLI (para deploy): `npm install -g firebase-tools` (opcional, só se for realizar deploy)

## Instalação e execução local
1. Clone o repositório:
   git clone https://github.com/cleberfarias/AppFinanceiro.git
2. Entre na pasta do projeto:
   cd AppFinanceiro
3. Instale as dependências:
   npm install
4. Crie um arquivo de variáveis de ambiente (ex.: `.env.local`) com a configuração do Firebase (exemplo abaixo).
5. Inicie a aplicação em modo de desenvolvimento:
   npm start
6. Para gerar o build de produção:
   npm run build

## Variáveis de ambiente (exemplo)
Crie um arquivo `.env.local` na raiz com as chaves do seu projeto Firebase. Ajuste os nomes conforme a forma que o projeto consome as variáveis (ex.: process.env.REACT_APP_*).

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
# Opcional: outras variáveis que o projeto utilize

Observação: não comite arquivos contendo chaves sensíveis.

## Configuração e deploy com Firebase (resumo)
1. Faça login no Firebase CLI:
   firebase login
2. Inicialize o projeto (se ainda não estiver configurado):
   firebase init
   - Selecione "Hosting" e/ou "Firestore" conforme necessário.
3. Para implantar:
   firebase deploy --only hosting

A configuração de `firebase.json` e `.firebaserc` já está presente no repositório; verifique e ajuste conforme seu projeto e seu ambiente Firebase.

## Estrutura do projeto (resumo)
- public/ — ativos públicos (index.html, icons, etc.)
- src/ — código-fonte React (componentes, páginas, serviços)
- firebase.json, .firebaserc — configurações de deploy Firebase
- package.json — dependências e scripts

## Scripts úteis
- npm start — executa em modo desenvolvimento
- npm run build — gera build de produção
- npm test — executa testes (se houver)
- npm run eject — ejetar create-react-app (use com cuidado)

## Boas práticas e notas
- Mantenha chaves do Firebase fora do controle de versão.
- Use commits pequenos e descritivos.
- Adicione validações e tratamento de erros ao lidar com importação/exportação de arquivos.
- Se utilizar autenticação, proteja rotas e dados conforme regras do Firebase Security.

## Contribuição
Contribuições são bem-vindas. Abra uma issue para discutir funcionalidades/bugs ou envie um pull request com uma descrição clara das mudanças.


## Contato
Desenvolvedor: cleberfarias  
Repositório: https://github.com/cleberfarias/AppFinanceiro

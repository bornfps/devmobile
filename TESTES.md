# Documentacao  de Testes

## 1. Introducao

Este documento apresenta a estrategia de testes automatizados adotada no projeto `devmobile`, desenvolvido em React Native com Expo. A proposta e verificar comportamentos essenciais da aplicacao, reduzindo o risco de regressoes em componentes reutilizaveis, regras de negocio e fluxo de navegacao.

A automacao de testes foi utilizada como apoio a validacao funcional do sistema, permitindo verificar se partes importantes da aplicacao continuam funcionando corretamente apos ajustes no codigo.

## 2. Objetivo Geral

Documentar a estrutura, a finalidade e os resultados esperados da suite de testes automatizados do projeto, demonstrando como os testes contribuem para a confiabilidade da aplicacao.

## 3. Objetivos Especificos

- descrever as ferramentas utilizadas no ambiente de testes
- registrar como os testes podem ser executados
- explicar o que cada suite valida
- apresentar a metodologia adotada na construcao dos testes
- indicar os limites atuais da cobertura
- fornecer uma base documental adequada para entrega academica

## 4. Escopo dos Testes

Os testes atuais cobrem quatro frentes principais do sistema:

- componente reutilizavel de interface
- contexto de autenticacao
- contexto de dados em memoria
- roteamento condicionado ao perfil do usuario

Os testes foram definidos com foco em comportamento observavel, priorizando os pontos de maior impacto para a experiencia do usuario e para a estabilidade da aplicacao.

## 5. Ferramentas e Ambiente

As tecnologias utilizadas no processo de teste foram:

- `Jest`: execucao da suite e organizacao dos casos de teste
- `@testing-library/react-native`: renderizacao de componentes, hooks e simulacao de interacoes
- `@testing-library/jest-native`: matchers especificos para ambiente React Native
- `react-test-renderer`: dependencia de suporte exigida pela Testing Library
- `babel-preset-expo`: suporte a transformacao Babel no ambiente Expo

Arquivos de configuracao relacionados:

- `babel.config.js`
- `jest.config.js`
- `jest.setup.js`

## 6. Procedimento de Execucao

A execucao dos testes deve ser realizada na raiz do projeto `devmobile`.

Comando principal:

```bash
npm test
```

Comandos auxiliares:

- `npm run test:watch`
- `npm run test:coverage`
- `npm test -- --runInBand`

O modo `--runInBand` e util em ambientes academicos e laboratoriais por executar a suite em serie, facilitando diagnostico e reproducao de falhas.

## 7. Estrutura da Suite

Os testes automatizados encontram-se na pasta `__tests__/`, distribuidos da seguinte forma:

- `__tests__/components/PrimaryButton.test.js`
- `__tests__/context/AuthContext.test.js`
- `__tests__/context/DataContext.test.js`
- `__tests__/routes/AppRoutes.test.js`

## 8. Descricao das Suites

### 8.1 Testes do componente `PrimaryButton`

Finalidade:

Validar o comportamento do botao reutilizavel utilizado em diferentes pontos da interface.

Cenarios cobertos:

- renderizacao do titulo recebido via propriedade `title`
- execucao da funcao `onPress` ao interagir com o botao
- bloqueio da interacao quando o estado `loading` esta ativo

Contribuicao para o sistema:

Esse teste ajuda a garantir consistencia nas acoes disparadas pela interface e previne regressao em um componente de uso recorrente.

### 8.2 Testes do `AuthContext`

Finalidade:

Validar as regras do fluxo de autenticacao simulada.

Cenarios cobertos:

- login com credenciais validas
- erro ao tentar autenticar sem email ou senha
- erro ao tentar autenticar com senha invalida
- limpeza do usuario autenticado no logout
- atualizacao dos dados do perfil apos autenticacao

Contribuicao para o sistema:

A suite verifica a confiabilidade do contexto responsavel pelo estado de autenticacao da aplicacao.

Observacao tecnica:

Como o login utiliza operacao assincrona baseada em `setTimeout`, foi necessario usar `waitFor` para aguardar o estado final antes das assercoes.

### 8.3 Testes do `DataContext`

Finalidade:

Validar as operacoes principais do contexto responsavel pelos dados simulados da aplicacao.

Cenarios cobertos:

- criacao de usuario com atributos padrao corretos
- criacao de servico com estado inicial esperado
- criacao de solicitacao com status `pendente`
- envio de mensagem com atualizacao da conversa relacionada
- alteracao de status de solicitacoes existentes

Contribuicao para o sistema:

Esses testes ajudam a assegurar que as regras centrais de manipulacao de dados continuem corretas mesmo apos manutencoes futuras.

### 8.4 Testes do `AppRoutes`

Finalidade:

Verificar se o roteamento principal da aplicacao muda corretamente de acordo com o perfil do usuario autenticado.

Cenarios cobertos:

- usuario nao autenticado acessa a pilha de login
- usuario com perfil `client` acessa a navegacao de contratante
- usuario com perfil `provider` acessa a navegacao de prestador
- usuario com perfil `admin` acessa a navegacao administrativa

Contribuicao para o sistema:

A suite valida a decisao de navegacao, ponto essencial para o controle de acesso e para a experiencia adequada de cada tipo de usuario.

Observacao tecnica:

As telas foram mockadas para que o foco do teste permanecesse na regra de roteamento, e nao no conteudo interno de cada screen.

## 9. Metodologia Adotada

A metodologia utilizada na construcao da suite seguiu os principios abaixo:

- testar comportamento observavel em vez de detalhes internos de implementacao
- isolar responsabilidades por camada, separando componentes, contextos e rotas
- usar mocks apenas quando o objetivo do teste nao era validar a dependencia externa
- nomear os casos de teste com base no comportamento esperado
- tratar fluxos assincronos com espera explicita para reduzir falsos negativos

Essa abordagem torna a suite mais legivel, mais estavel e mais adequada para manutencao.

## 10. Resultados Esperados

Ao executar a suite, espera-se que:

- os componentes fundamentais renderizem corretamente
- eventos de interface disparem as acoes previstas
- contextos atualizem seus estados conforme as regras de negocio
- a navegacao respeite o perfil do usuario autenticado
- falhas introduzidas por regressao sejam identificadas rapidamente

## 11. Evidencias de Execucao

Como evidencia pratica da validacao, recomenda-se registrar:

- comando utilizado para execucao
- quantidade de suites executadas
- quantidade de testes aprovados
- ausencia de falhas ao final da execucao

Exemplo de evidencia textual:

```text
npm test -- --runInBand
Test Suites: 4 passed, 4 total
Tests: 17 passed, 17 total
```

Essa evidencia pode ser acompanhada por captura de tela do terminal no momento da entrega, caso solicitado pelo professor.

## 12. Limites da Cobertura Atual

Apesar de contribuir para a estabilidade do sistema, a cobertura atual ainda nao contempla:

- testes detalhados de telas individuais
- validacoes completas de formularios
- fluxos integrados mais longos entre telas e contextos
- testes de interface visual mais refinados
- cenarios negativos mais profundos em navegacao e dados

Esses pontos podem ser explorados em evolucoes futuras do projeto.

## 13. Conclusao

A documentacao e os testes demonstram uma preocupacao com qualidade, manutencao e verificacao funcional do projeto. Mesmo com cobertura focada em pontos centrais, os testes ja oferecem uma base consistente para detectar regressoes e sustentar futuras expansoes da aplicacao.

Do ponto de vista academico, o material evidencia nao apenas a existencia dos testes, mas tambem a justificativa tecnica de sua organizacao e de sua contribuicao para a confiabilidade do software.

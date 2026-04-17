# Relatório de Apoio — Strategy Pattern (POO · IFAL 2026.1)

Documento de contexto para os quatro apresentadores. Para cada slide, o objetivo aqui **não** é ditar a fala (isso está em `roteiro.md`), mas dar profundidade suficiente para que quem fala **entenda o que está dizendo** e consiga responder perguntas do público.

Leia uma vez inteiro antes da apresentação. Releia apenas os slides do seu bloco no dia.

---

## Slide 1 — Capa

**O que é:** identificação do trabalho, grupo, disciplina, professor e data. Visual com título grande e acento esmeralda.

**Contexto pra quem apresenta:**
- Esta é a sua janela de 5 segundos pra causar boa impressão. O público já viu trinta capas iguais — a nossa aposta é no contraste: tipografia serifa (Cormorant) no título + acento "Design Pattern" em itálico esmeralda, pra sinalizar que isto não é um trabalho genérico.
- Ao abrir, **não leia a capa**. Diga o título, nome dos integrantes rapidamente, e já emende no Bloco 0 (slide 3). Capas lidas em voz alta matam o ritmo.
- Se alguém perguntar "por que esse visual?" no Q&A: o tema segue o padrão de decks técnicos modernos (navy + accent, sem clip art), porque queríamos mostrar que padrões de projeto também são *design* — forma comunica intenção.

---

## Slide 2 — Sumário

**O que é:** os 5 blocos da apresentação, com subtítulo de cada um.

**Contexto:**
- Serve como **contrato com o público**. Eles agora sabem que vão ouvir por ~20 min e sabem a estrutura. Isso baixa a ansiedade ("quando isso acaba?") e aumenta a atenção.
- Os blocos **não são seções estanques**. O Bloco 1 (fundamentos) prepara terreno pro Bloco 2 (importância), que emenda no Bloco 3 (Strategy especificamente). Se quem apresenta tratar cada bloco como ilha, a apresentação fica fragmentada.
- **Não enumere os cinco itens em voz alta.** O slide já faz isso. Diga algo tipo "vamos de 5 blocos, começando pela dor do dia a dia até chegar em como resolver com código" e avance.

---

## Slide 3 — Bloco 0.2: A pergunta (teaser)

**O que é:** pergunta retórica — "alguém já escreveu ou leu algo assim?" — como preparação emocional para o código ruim do slide 4.

**Contexto:**
- Este é um **gancho emocional**, não informativo. O objetivo é que o público se *identifique* antes de ver o código. Todo mundo que já programou tem trauma com um arquivo gigante com 20 `if/else`.
- Pergunta aberta funciona melhor que afirmação. "Alguém já escreveu" deixa o público responder mentalmente "sim" — e quando o código aparece no próximo slide, a reação é "eu conheço essa dor", não "o que é isso?".
- **Dica de apresentação:** pausa de 2 segundos depois da pergunta. Resista ao impulso de preencher o silêncio. Deixa o público pensar.

---

## Slide 4 — Bloco 0.2: Zoom no código (step-reveal)

**O que é:** um arquivo `CalculadoraFrete` em full-screen com 8 passos de destaque (tecla `.` avança, `,` volta). Cada passo ilumina um trecho específico e mostra uma nota explicando o problema.

**Contexto:**
- Este é o slide mais longo da apresentação em tempo de atenção (~60-90s). **Use os steps**. Não mostre o código inteiro de cara — fica visualmente intimidador.
- Os 8 passos foram pensados pra contar uma história: dispatch por string → cada transportadora com seu estilo → "adicionado na sprint passada" → "adicionado ontem" → fallback via exceção. A mensagem é: **isso não nasceu assim, isso *virou* assim com o tempo**.
- Cada transportadora no código ilustra uma **patologia diferente**:
  - **CORREIOS**: vazamento do ciclo de vida da API (connect/auth/disconnect) pra dentro da lógica de negócio.
  - **JADLOG**: estilo de API diferente (síncrono, com retry inline) — evidencia que cada integração impõe seu vocabulário.
  - **LOGGI**: null-check virando regra de negócio — erro de infra mascarado como regra.
  - **MERCADO_ENVIOS**: novo tipo de identificador (`sellerId: Long`) que os outros não têm — cada frete traz termos próprios.
  - **RETIRADA / DRONE**: comentários "adicionado na sprint passada / ontem" — mostram o crescimento orgânico que é o real problema.
- Se alguém perguntar "mas não dá pra usar `switch` em vez de `if/else`?": sim, Java 14+ tem switch expressions e isso melhora *um pouco*. Mas **não resolve o problema de fundo**, que é: cada novo frete = editar a mesma classe. Strategy ataca isso.
- **Fallback por exceção** (passo 8) é importante: se o frete vier em minúsculo (`"correios"`), explode em produção. Tipagem fraca via string é parte da dor.

---

## Slide 5 — Bloco 0.3: A realidade dos projetos

**O que é:** 3 cards — Início / Meio do caminho / 6 meses depois — mostrando a evolução natural de qualquer projeto real, terminando numa citação-definição sobre por que padrões existem.

**Contexto:**
- Este slide **desculpa o programador anterior**. É importante. O público alvo são estudantes de 4º período que ainda pensam "quem escreveu aquilo era ruim". A mensagem aqui é: **não era incompetência, é a natureza do negócio**.
- A estrutura 3-cards está contando uma narrativa temporal:
  - **Início**: 3 casos, escopo fechado, tudo sob controle.
  - **Meio**: cliente não sabe o que quer até usar. Feature nova → outra → outra. *Esse é o ponto que ninguém de 4º período entendeu ainda.* Em TCC, o escopo é fixo. No mundo real, o escopo é um rio.
  - **6 meses depois**: 3 virou 15. Toda feature nova exige mexer na *mesma* classe. O que era um `switch` simples virou um campo minado.
- A citação no fim (`def-box`) não é de ninguém específico — é um framing nosso. Padrões existem **exatamente porque essa dor é inevitável**. Isso justifica o Bloco 1 inteiro.
- Se o público perguntar "não dá pra escrever bem desde o início?": sim, dá — **se você já viu esse filme antes**. Padrões são exatamente o vocabulário que permite antecipar esse filme.

---

## Slide 6 — Bloco 1: Definição + famílias GoF

**O que é:** a definição clássica de padrão de projeto + as 3 famílias da Gang of Four (Criacionais, Estruturais, Comportamentais), destacando que Strategy é comportamental.

**Contexto:**
- **Gang of Four (GoF)** é o apelido dos quatro autores (Gamma, Helm, Johnson, Vlissides) do livro *Design Patterns: Elements of Reusable Object-Oriented Software* (1994). O livro catalogou 23 padrões. Hoje existem centenas documentados, mas os 23 originais continuam sendo o vocabulário base.
- As 3 famílias respondem a "o que o padrão organiza?":
  - **Criacionais** — a criação de objetos. Ex.: Singleton (garante uma instância só), Factory Method (delega a escolha de qual classe instanciar), Builder (monta objeto complexo passo a passo).
  - **Estruturais** — a composição entre objetos. Ex.: Adapter (encaixa interfaces incompatíveis), Decorator (adiciona responsabilidade em runtime), Facade (simplifica um subsistema complexo).
  - **Comportamentais** — a colaboração/comunicação. Ex.: Observer (publisher/subscriber), State (muda comportamento com o estado interno), **Strategy** (encapsula algoritmos intercambiáveis).
- A "receita de bolo vs. bolo pronto" é uma analogia que **funciona**: padrão é a receita (descrição de como fazer), não o bolo (código pronto). Uma receita de pão-de-ló é a mesma em qualquer cozinha, mas cada pessoa executa com ingredientes e forno diferentes.
- Se perguntarem "padrões são obrigatórios?": não. São **vocabulário**. Se você tem um problema que não encaixa, crie sua solução. Forçar padrão onde não cabe é anti-padrão.
- "Os padrões se complementam entre si" é um gancho pro slide 7.

---

## Slide 7 — Bloco 1: Problemas recorrentes → padrões já têm nome

**O que é:** extensão direta do slide 6 ("padrões são soluções nomeadas pra problemas recorrentes"). Aqui a ideia sai do abstrato: **4 cards em grid 2×2**, cada um com uma "dor" que todo dev encontra (escrita em primeira pessoa, como um desabafo), e o padrão da GoF que nomeia a solução. Strategy aparece destacado (borda esmeralda) porque é o padrão que vamos destrinchar no resto da apresentação.

**Contexto pra quem apresenta:**
- **A tese**: o catálogo da GoF não é teoria de laboratório — é um *índice de dores* que quem programa já enfrenta há 30+ anos. A pessoa ouviu no slide anterior que "padrão = solução nomeada de problema recorrente". Aqui ela **vê**, em linguagem natural, quais são esses problemas concretos.
- **Os 4 problemas destrinchados** (cada card do slide):

  **Strategy — "Preciso trocar o algoritmo sem mexer em quem chama."**
  Situação típica: você tem um `Carrinho` que precisa calcular frete, e existem 3 transportadoras. Amanhã vira 5. Sem Strategy, cada transportadora nova exige editar o `Carrinho`. Com Strategy, o `Carrinho` nunca muda — só entram classes novas que implementam o contrato. É o assunto do Bloco 3 e 4.

  **Observer — "Quero avisar vários lugares quando um dado mudar."**
  Situação típica: a tela do perfil do usuário aparece em 3 lugares diferentes da app. Quando o usuário muda a foto, as 3 telas precisam atualizar. Sem Observer, cada tela consulta o servidor periodicamente (polling) ou vira espaguete de callbacks. Com Observer, o modelo publica "foto mudou" e quem se inscreveu recebe. É o padrão por baixo do `useState` do React, dos event listeners do DOM, de todo sistema pub/sub.

  **Singleton — "Preciso de uma única instância compartilhada por toda a app."**
  Situação típica: configurações da aplicação (variáveis de ambiente, URL do banco, chave de API). Não faz sentido criar um objeto `Config` novo toda vez — todo mundo precisa do mesmo. Sem Singleton, você passa o `Config` como parâmetro de 50 métodos. Com Singleton, chama `Config.getInstance()`. Pooling de conexão, cache, logger — todos são Singleton na prática.

  **Adapter — "Quero juntar classes que não nasceram pra conversar."**
  Situação típica: sua app recebe dados de uma API externa que devolve em um formato (XML em camelCase), mas seu código trabalha com outro (JSON em snake_case). Sem Adapter, você espalha conversão em todo lugar. Com Adapter, existe uma classe no meio que traduz — e o resto do código não sabe que existe API externa. Aparece em integrações, legados, drivers de banco.

- **Por que esses 4 e não outros**:
  - **Strategy** — é o tema da apresentação. Obrigatório estar aqui.
  - **Observer** — provavelmente o segundo mais comum; quem já mexeu em React/Vue usa sem saber.
  - **Singleton** — o mais famoso, todo mundo já ouviu falar. Inclusão cria sensação de "ah, já vi esse nome".
  - **Adapter** — mais "estrutural" (família diferente de Strategy/Observer/Singleton). Mostra que o catálogo é diverso — problemas de algoritmo, de comunicação, de criação e de integração.

- **Strategy destacado em verde**: visualmente marca o padrão que a apresentação vai aprofundar. O público pega rápido "ah, dos 4 aqui, o que vamos ver é esse". Cria gancho natural pro próximo slide (Strategy — intenção).

- **Entrega ideal**:
  - Leia cada problema em voz alta *como se fosse um desabafo*. As aspas são intencionais — é o dev murmurando consigo mesmo. Essa leitura gera identificação: "sim, eu já pensei isso".
  - Pausa curta depois do problema, antes de dizer o nome do padrão. Deixa o público tentar adivinhar.
  - No último, amarre: "Strategy é o que vocês vão ouvir daqui a pouco. Os outros três ficam de gancho pra quem quiser se aprofundar depois."

- **Perguntas prováveis**:
  - "Só tem esses 4 padrões?" — não, são 23 no catálogo original da GoF, dezenas mais foram adicionados depois. Esses 4 são os mais reconhecíveis no início da jornada.
  - "Eu consigo resolver sem usar padrão?" — consegue. Padrão não é obrigação, é atalho. Você ganha tempo por não reinventar; ganha comunicação por usar nome já conhecido. Em projeto de 10 linhas é over-engineering; em projeto de 10 mil linhas é sanidade mental.
  - "E se o problema que eu tenho não está no catálogo?" — aí você cria solução e, se ela se repetir em vários projetos, pode virar um padrão novo. Foi assim que vieram os padrões de microserviços (CQRS, Circuit Breaker) — surgiram da prática.

- **Amarração com o resto**:
  - **Slide 6** (anterior): lá a gente disse que padrão é "solução nomeada". Aqui mostra que os nomes são reais e úteis.
  - **Slide 12** (Strategy — intenção): o próximo zoom específico em Strategy. Este slide 7 serve como "teaser estendido".
  - **Slide 23** (quando NÃO usar): volta com a ideia de que padrão não é obrigação — fecha o arco.

---

## Slide 8 — Bloco 2a: Colaboração humana

**O que é:** o primeiro motivo clássico de por que padrões importam — código é mais lido do que escrito, e padrões são vocabulário compartilhado. Traz a analogia das peças de xadrez.

**Contexto:**
- A estatística "código é mais lido do que escrito" é **real** e vem de estudos de engenharia de software (Parnas, Brooks, e mais recentes como o *Clean Code* do Martin). A proporção varia (8:1, 10:1), mas o ponto é que o custo real do código está em manutenção, não em escrita.
- **Analogia do xadrez**: é poderosa porque é concreta. Imagine explicar o movimento do cavalo pra alguém sem usar a palavra "cavalo" — "aquela peça que anda duas casas numa direção e uma perpendicular". Funciona, mas é lento. Com "cavalo" você economiza 5 segundos por conversa. Multiplique por 100 conversas por sprint.
- **Code review**: num time que usa padrões, um reviewer vê "Strategy" e já sabe:
  - Há uma interface no centro.
  - Há N implementações, cada uma isolada.
  - O Context delega, não decide.
  - Onde procurar regressões (toda implementação deve ter teste).
- **Onboarding**: dev novo que entra num projeto com Strategy bem nomeado consegue navegar em horas. Em projeto com `if/else` espalhado, leva semanas.
- A frase "Até aqui é o argumento clássico" (no rodapé) é **o gancho** pro Bloco 2b. Este slide apresenta o argumento que todo livro de POO já traz. O próximo slide traz a nossa contribuição: o motivo *novo*.

---

## Slide 9 — Bloco 2b: A IA amplifica — inclusive a bagunça

**O que é:** o slide denso do meio. Estabelece que agentic coding virou rotina e carrega uma advertência: **sem padrão bem definido, a IA acelera inconsistência, não qualidade**. Visual em duas colunas contrastando "sem padrão" (vermelho — cinco dialetos no mesmo repo) vs. "com padrão" (verde — feature nova já nasce no molde). Botão abre carrossel modal com três orchestrators (Conductor, T3 Code, Cursor 3).

**Contexto pra quem apresenta:**
- **Agentic coding** em 2026: o dev descreve a intenção em linguagem natural, o agente de IA executa — lê arquivos, edita código, roda testes, commita. Ferramentas populares: Claude Code (Anthropic), Cursor (Anysphere), GitHub Copilot Agent, Codex, Zed.
- A frase "escrevemos mais código e digitamos menos" captura a mudança: o dev hoje é mais **arquiteto e revisor** do que digitador. O agente digita; você revisa e aceita.
- **A tese central deste slide**: IA **amplifica** o que encontrar. Se o projeto tem convenção clara, novas features saem consistentes. Se o projeto é bagunça, a IA gera mais bagunça — e mais rápido. O risco não é a IA "escrever errado"; é ela escrever *diferente toda vez*.
- **Por que acontece**: agentes não têm contexto persistente entre sessões. Sem um molde explícito no código (padrões visíveis, classes que servem de exemplo), cada sessão toma decisões locais. Resultado concreto:
  - Sessão da terça: implementou desconto com `if/else` encadeado.
  - Sessão da quinta: outro dev pediu a mesma coisa, agente gerou com `switch expression`.
  - Sprint seguinte: um terceiro, com `Map<String, Function>` funcional.
  - Seis meses depois, o mesmo tipo de problema aparece resolvido de **cinco formas diferentes** no repo. Nenhuma errada. Nenhuma igual. Manutenção vira arqueologia.
- **A saída é estrutural, não de prompt**: você pode tentar lembrar de pedir "usa Strategy" toda vez, mas isso falha. O que funciona é **ter Strategy já implementado no projeto** — a IA lê as classes existentes (`FreteStrategy`, `FreteCorreios`) e copia o molde sem precisar ser instruída. O padrão serve como *exemplo permanente*.
- **Carrosel de orchestrators** (botão "Ver os orchestrators" — clique pra abrir):
  - **Conductor** (Melty Labs): roda agentes locais em paralelo. Você descreve N tarefas, ele distribui, mostra progresso lado a lado.
  - **T3 Code** (Theo Browne): orchestrator em alpha focado em fluxo de PR — agente faz, você revisa no próprio CLI.
  - **Cursor 3** (Anysphere): versão atual do Cursor com capacidades de agente mais fortes, incluindo execução em cloud sandboxes.
  - Esses três existem pra mostrar que *agentes não são mais experimentos de laboratório* — são ferramentas que times reais usam pra gerar volume de código. Por isso a advertência do slide importa agora, não em 5 anos.
- **Se o público não conhece nenhuma dessas ferramentas**: é normal. Não gaste mais que 30s explicando. O ponto do slide é "a realidade mudou — se o projeto não tem padrão, você agora escala a bagunça".
- **Perguntas prováveis**:
  - "E se eu der prompt muito detalhado, a IA não segue?" — segue *naquela sessão*. Semana que vem você (ou outra pessoa) não vai lembrar exatamente do mesmo prompt. Padrão no código é memória durável; prompt é memória volátil.
  - "Não existe jeito de 'ensinar' a IA?" — existe (arquivos de regras tipo `CLAUDE.md`, `AGENTS.md`, `.cursor/rules/`), e ajuda. Mas mesmo isso funciona melhor quando tem padrão no código pra referenciar. Documentação aponta; código exemplifica.

---

## Slide 10 — Bloco 2b: Mesmo sozinho, você já trabalha em par

**O que é:** slide da **tese central** da apresentação. Visual com demo de pair programming (agente escrevendo / você revisando) + 3 cards numerados. Mensagem: padrão deixou de ser "etiqueta de time" — é necessidade até no projeto pessoal, porque mesmo sozinho você tem a IA como par.

**Contexto pra quem apresenta:**
- **Pair programming** originalmente: dois devs no mesmo teclado, um digita (driver), outro pensa (navigator). Veio da Extreme Programming (Kent Beck, ~2000). Aumenta qualidade, reduz bugs — mas na prática era caro (dois salários pra uma linha de código), então poucas empresas adotavam integralmente.
- **O virada histórica do slide**: o argumento clássico pró-padrão sempre foi coletivo — "escreve bonito pro próximo dev". Estudante de 4º período ouve isso e pensa "ok, mas meu TCC/projeto pessoal é só meu, posso relaxar". Esse raciocínio **morreu em 2024-2026**.
- **Por que morreu**: se o próximo dev a tocar no código é a IA (revisitando o projeto duas semanas depois via Cursor/Claude Code), e a IA só gera código consistente se houver padrão pra copiar, então **padrão virou infraestrutura pessoal**, não cortesia social.
- **A demo visual** (duas panes): mostra literalmente o que acontece num projeto solo hoje. À esquerda, agente escreve `FreteLoggi implements FreteStrategy`. À direita, você revisa: aceita (✓), edita (✎), pergunta (?). Esse ciclo é pair programming — e sua única chance de manter qualidade quando a IA está produzindo volume.
- **As 3 razões (agora orientadas ao solo-dev + IA)**:
  1. **Reconhecimento.** LLMs foram treinados em milhões de linhas open-source — GitHub, Stack Overflow, livros. Strategy é um dos padrões mais comuns. Ao ver `FreteStrategy` com 3 implementações, o agente encaixa instantaneamente no esquema mental que já tem. Nenhum prompt elaborado necessário.
  2. **Menos contexto, menos alucinação.** LLMs alucinam quando precisam *inventar* estrutura. Padrão concreto = exemplo permanente pra copiar. Se o projeto tem `if/else` de 500 linhas, o agente precisa ler tudo antes de adicionar caso novo — e chance de errar uma condição sobe.
  3. **Você-futuro entende.** Ponto mais específico ao solo-dev: você volta no projeto em 2 meses e precisa continuar. Com padrão, a classe se identifica ("ah, é uma Strategy") e você (e a IA) retomam em minutos. Sem padrão, você e a IA gastam horas redescobrindo o que o código faz.
- **Perguntas prováveis do público**:
  - "Mas se eu não uso IA no meu projeto, isso se aplica?" — aplica parcialmente. Padrão ainda serve pro seu "você-futuro" lembrar. Se você **nunca** vai usar IA (improvável em 2026+), o argumento volta a ser só "código é mais lido do que escrito". Mas a realidade é que quem tá se formando agora vai usar IA na vida profissional, então a disciplina vale a pena cultivar desde o projeto pessoal.
  - "Mas e se o agente usar Strategy onde não cabe?" — mesmo risco que dev júnior. Você revisa. É por isso que existe code review (mesmo quando é "self-review").
  - "IA vai substituir programador?" — não nos próximos 5 anos. Ela **troca** o que o programador faz: menos digitação, mais arquitetura, mais revisão, mais decisões.
- **Entrega ideal da fala**: pausa pesada em "*até no seu projeto pessoal você escreve em dupla*". É o ponto que desloca a percepção do público — eles saem do modo "padrão é teoria de empresa" pra "isso é útil pra mim, agora, no meu TCC, no meu repo do GitHub".

---

## Slide 11 — Bloco 2b: Frameworks mudam, padrões persistem

**O que é:** slide de frase-de-impacto. Título grande: "Frameworks mudam. Padrões persistem." Justificativa curta embaixo, com atribuição a Simon Willison e comunidade.

**Contexto:**
- **Simon Willison** é um engenheiro inglês conhecido por escrever muito sobre agentic engineering e LLMs em 2025-2026. O blog dele (simonwillison.net) virou referência na área. A frase exata "frameworks change, patterns persist" circulou na comunidade em 2026 — não é atribuível a uma única pessoa, mas Simon foi quem mais ajudou a popularizar.
- **A mensagem literal**: em 15 anos de Java, você viveu Struts, Spring, Spring Boot, Quarkus, Micronaut. Cada um foi "o jeito certo" na sua época. Hoje código em Struts parece antigo. Mas **o conceito de "encapsular algoritmo em uma classe que implementa interface comum"** era verdade em 1994 (GoF), é em 2026, e será em 2040.
- **Por que isso importa no contexto agentic:** frameworks vão continuar mudando (talvez mais rápido, com IA acelerando a experimentação). Se você decorou Spring, seu conhecimento decai. Se você entendeu Strategy, Observer, Decorator — seu conhecimento **compõe** sobre frameworks novos.
- Este é o slide mais "filosófico" da apresentação. Tom ideal: confiante, sem ser arrogante. A gente está fazendo uma afirmação forte; deixa ela repousar no ar.
- Se alguém rebater "mas há padrões que ficaram datados, tipo Singleton": é verdade que alguns padrões caíram em desuso ou viraram anti-padrões em certos contextos (Singleton é discutível em apps multi-thread). Mas "mudança de linguagem" ≠ "obsolescência". Singleton não sumiu, mudou de uso.

---

## Slide 12 — Bloco 3: Strategy — intenção

**O que é:** a definição canônica do padrão (GoF literal) + dois cards contrastando "o problema" (em vermelho) e "a solução" (em verde).

**Contexto:**
- A definição do GoF é **densa**. Vale desmontar:
  - *"Define uma família de algoritmos"* — uma família = várias formas de fazer a mesma coisa. Ex.: várias formas de calcular frete.
  - *"encapsula cada um"* — cada forma vira uma classe isolada, com responsabilidade única.
  - *"e os torna intercambiáveis"* — você pode trocar uma pela outra sem o resto do sistema saber.
  - *"Strategy permite que o algoritmo varie independentemente dos clientes que o usam"* — o código que *usa* frete (Carrinho) não muda quando você adiciona nova transportadora. Isso é **Open/Closed Principle** na veia.
- **OCP (Open/Closed Principle)** é um dos 5 SOLID (Liskov, Interface Segregation, etc.): *"open for extension, closed for modification"*. Seu código deve ser fácil de *estender* (adicionar coisas novas) sem *modificar* o que já funciona. Strategy é um dos padrões mais diretos pra atingir OCP.
- **Problema em uma frase**: sem Strategy, comportamento variante mora dentro da classe principal como `switch`. Cada variação nova = editar essa classe. Acoplamento alto, testabilidade baixa.
- **Solução em uma frase**: cada variação mora na sua própria classe, atrás de uma interface comum. Context (quem usa) só conhece a interface. Variação nova = classe nova, zero mudança no Context.
- Se perguntarem "isso não é só polimorfismo?": é. Strategy **é** polimorfismo, mas com uma **intenção nomeada**. O próximo slide (14) trata disso.

---

## Slide 13 — Bloco 3: Estrutura UML

**O que é:** diagrama simplificado no estilo UML — Context no topo, Strategy (interface) no meio, ConcreteStrategy A/B/C embaixo — + lista de responsabilidades de cada papel.

**Contexto:**
- **UML** (Unified Modeling Language) é a notação padrão pra desenhar relacionamentos entre classes. Os 3 papéis do Strategy:
  - **Context** — quem precisa do algoritmo. No nosso caso: `Carrinho`. Guarda uma referência à Strategy (normalmente em atributo).
  - **Strategy** — a interface. Define o contrato (método único ou poucos). No nosso caso: `FreteStrategy` com `calcular(double peso)`.
  - **ConcreteStrategy** — cada implementação. No nosso caso: `FreteCorreios`, `FreteJadlog`, `FreteRetirada`.
- **Relação Context → Strategy**: agregação (losango aberto em UML). Context *tem um* Strategy, mas não é dono exclusivo — outra instância pode usar a mesma strategy (especialmente se for stateless).
- **Relação Strategy → ConcreteStrategy**: herança/realização (linha tracejada com triângulo). Cada concreta implementa a interface.
- **Troca em runtime**: Context expõe um setter (`setFrete`) que aceita qualquer `FreteStrategy`. Isso permite trocar a estratégia a qualquer momento — inclusive baseado em entrada do usuário, config dinâmica, feature flag.
- **Sem recompilar o Context**: esse é o ponto. Adicionar uma 4ª, 5ª, 10ª estratégia = criar classe nova. `Carrinho.class` fica idêntico.
- **Perguntas possíveis**:
  - "Por que interface e não classe abstrata?" — ambos funcionam. Interface é preferível se as estratégias não compartilham código. Classe abstrata (Template Method) se compartilham.
  - "Se só tem um método, vale a interface?" — em Java 8+, sim, porque vira functional interface e aceita lambda (ver slide 21).

---

## Slide 14 — Bloco 3: Polimorfismo com nome

**O que é:** slide "filosófico" afirmando que Strategy é polimorfismo com intenção nomeada. Sem diagrama, só texto.

**Contexto:**
- O "insight" que este slide tenta passar: **padrão = polimorfismo + semântica**. Em POO pura, polimorfismo é uma *mecânica* (subclasse sobrescreve método, dispatch dinâmico). Strategy usa essa mecânica, mas **anexa uma intenção**: "estou usando polimorfismo aqui porque quero intercambiar algoritmos".
- **Por que isso importa:** quando alguém lê seu código e vê `interface Pagamento` com 3 implementações, precisa inferir a intenção. Quando vê `interface PagamentoStrategy`, a intenção está no nome — estratégias intercambiáveis, um padrão conhecido.
- **Convenção de nomenclatura**: muitos times sufixam o nome com o padrão (`FreteStrategy`, `OrderFactory`, `UserObserver`). Não é obrigatório, mas comunica intenção gratuitamente.
- **Humano vs. agente**: o ponto conecta ao Bloco 2b. Humano entende mais rápido; agente também. Código com intenção nomeada é código que se explica.
- **Armadilha a evitar:** não caia em "então todo polimorfismo é Strategy". Não. Polimorfismo via herança (classe `Animal` com subclasses `Cachorro`, `Gato`) não é necessariamente Strategy — pode ser apenas modelagem de domínio. Strategy é quando **você intencionalmente quer intercambiar comportamento**.

---

## Slide 15 — Bloco 4: Cenário da demo

**O que é:** apresenta o cenário usado na demo — cálculo de frete com 3 opções (Correios, Jadlog, Retirada) — e provoca "e se amanhã o chefe pedir Loggi?".

**Contexto:**
- Escolhemos **cálculo de frete** entre várias opções (gateway de pagamento, sorting, parser de arquivo) porque:
  - É concreto — todo mundo já comprou online e sabe o que é "frete".
  - É pequeno o bastante pra caber em slides.
  - Tem clara natureza de "família de algoritmos que fazem a mesma coisa".
  - O "adicionar Loggi amanhã" é realista — todo e-commerce real passa por isso.
- As fórmulas são **arbitrárias** mas plausíveis:
  - Correios: peso × 2,5 + 10 (taxa fixa + variável por peso).
  - Jadlog: peso × 3,0 + 5 (variável maior, fixo menor — perfil diferente).
  - Retirada: 0 (retirada no balcão é grátis).
- O gancho "e se amanhã o chefe pedir Loggi" é o **teste definitivo** de cada abordagem. No slide 16 (antes) adicionar Loggi = mexer em classe já pronta. No slide 19 (depois) = classe nova. Essa diferença é a razão inteira do Strategy.
- **Se perguntarem sobre fretes reais**: sim, na vida real tem muito mais variáveis (CEP origem, CEP destino, dimensões, seguro, prazo). O ponto do slide é *didático*, não operacional. Uma implementação real teria `calcular(Pedido)` em vez de `calcular(double peso)`.

---

## Slide 16 — Bloco 4: Antes (if/else hell simplificado)

**O que é:** versão simplificada do anti-pattern — a mesma `CalculadoraFrete` do slide 4, mas mais curta e com lista de problemas ao lado.

**Contexto:**
- Este slide é o **contraponto simplificado** ao slide 4. No 4 mostramos como fica no mundo real (com APIs, erros, métricas). Aqui é o esqueleto.
- **Os 4 problemas listados**:
  1. **Strings mágicas**: `"CORREIOS"` em maiúsculo quebra se alguém digitar `"correios"`. Sem compilador pra ajudar. Bug em runtime.
  2. **Viola OCP**: nova transportadora = editar esta classe. Modificação, não extensão.
  3. **Teste acoplado**: pra testar a lógica do Jadlog, você instancia a calculadora inteira. Não dá pra isolar.
  4. **Crescimento linear sem fim**: a classe só inflama. 3 hoje, 15 em 2 anos.
- **Contraste claro**: use o slide 19 (main + output) pra mostrar que a versão com Strategy tem exatamente a mesma feature, mas sem nenhum desses problemas.
- **Se o público já viu o slide 4**: sim, é intencional revisitar. O 4 tinha muita informação — aqui a gente lista os problemas em vocabulário estruturado (OCP, testabilidade, crescimento). Reforço.

---

## Slide 17 — Bloco 4: A interface

**O que é:** passo 1 de 4 do refactor. Define `FreteStrategy` como interface com um único método `calcular(double pesoKg)`, com explicação ao lado.

**Contexto:**
- Interface em Java com um método só é o **coração do contrato**. Quem implementar `FreteStrategy` se compromete a fornecer um `calcular` que recebe peso e devolve double.
- **Ponto de desacoplamento**: antes da interface, `Carrinho` estava grudado em `CalculadoraFrete`. Com a interface no meio, `Carrinho` depende só do contrato (`FreteStrategy`), não da implementação. Inversão de dependência (D do SOLID) acontece aqui.
- **Functional interface**: desde Java 8, interface com um único método abstrato é uma *functional interface*. Isso permite usar lambda (`peso -> peso * 2.5`) ou method reference como implementação. Vamos voltar a isso no slide 21.
- **Vale marcar com `@FunctionalInterface`?** É opcional mas recomendado. A anotação falha em compilação se alguém adicionar um segundo método abstrato — trava a intenção.
- **Perguntas possíveis**:
  - "Por que não passar mais parâmetros (CEP, dimensões)?" — simplicidade didática. No mundo real seria `calcular(Pedido)`.
  - "E se o método precisar lançar exceção?" — você declara `throws` na interface, ou usa `Optional<Double>`, ou um resultado tipado.

---

## Slide 18 — Bloco 4: Três classes concretas

**O que é:** passo 2 de 4. Três colunas mostrando `FreteCorreios`, `FreteJadlog`, `FreteRetirada`, cada uma implementando `FreteStrategy` e retornando sua fórmula.

**Contexto:**
- Ponto visual: **cada classe é idêntica em forma, única em conteúdo**. Isso comunica "contrato respeitado, lógica isolada".
- **`@Override`** não é obrigatório mas é recomendado. Se você errar a assinatura (ex.: `calcular(int pesoKg)` em vez de `double`), o compilador reclama. Documentação + checagem gratuita.
- **Testabilidade isolada**: `new FreteJadlog().calcular(2.0)` retorna `11.0` (2 × 3 + 5). Teste unitário de uma linha, sem mock, sem setup. Compare com testar a calculadora antiga: tem que instanciar a calculadora inteira e passar string.
- **Stateless**: nenhuma das três tem campo. São puros cálculos. Isso é uma propriedade importante:
  - Podem virar Singleton (uma instância serve toda a app).
  - Thread-safe de graça.
  - Podem ser pré-instanciadas em `enum`.
- **Nenhuma conhece as outras**: é isso que importa. `FreteCorreios` não sabe que existe `FreteJadlog`. Zero acoplamento lateral.
- **Se o público perguntar por que não colocar como métodos estáticos**: você pode — `FreteCorreios.calcular(peso)` estático. Mas aí perde polimorfismo (não dá pra passar "a função" como argumento) e volta à necessidade de `switch` em algum lugar. A interface é o que destrava o dinamismo.

---

## Slide 19 — Bloco 4: O Context

**O que é:** passo 3 de 4. A classe `Carrinho` — o Context. Recebe `FreteStrategy` no construtor, tem setter para trocar, e um método `totalComFrete` que delega.

**Contexto:**
- **`Carrinho` é o Context do padrão.** Ele usa o frete, mas não decide qual. Não instancia. Não conhece implementações concretas.
- **Injeção no construtor** (`new Carrinho(new FreteCorreios())`) é a forma mais limpa. O carrinho nasce já sabendo qual frete usar. Não tem estado "frete == null".
- **Setter `setFrete`**: permite trocar em runtime sem criar novo carrinho. Cenários reais:
  - Usuário digita CEP, sistema detecta região → troca pra transportadora que atende aquele CEP.
  - Promoção ativa → troca pra estratégia promocional (que aplica desconto).
  - A/B test → cada usuário pega uma estratégia diferente.
- **`totalComFrete`**: método de uma linha que simplesmente delega. Essa é a beleza — o Context é "burro" sobre a estratégia. Ele só chama.
- **Injeção de dependência na veia, sem framework**: a frase no slide conecta ao mundo real. Spring (`@Autowired`) faz isso por você; aqui é manual. O princípio é o mesmo: classe não sabe quem implementa, recebe de fora.
- **Perguntas possíveis**:
  - "E se alguém passar `null`?" — você pode validar no construtor (`Objects.requireNonNull`). Não coloquei no slide por espaço.
  - "Onde decide qual frete instanciar?" — fora do Carrinho. Pode ser no `main`, num Factory, num controller HTTP, num teste. Essa é a separação que Strategy te dá.

---

## Slide 20 — Bloco 4: Troca em runtime + output

**O que é:** passo 4 de 4. Um `main` que cria um Carrinho com Correios, imprime o total, troca pra Jadlog, imprime, troca pra Retirada, imprime. Output no terminal ao lado.

**Contexto:**
- **Narrativa do main**:
  1. `new Carrinho(new FreteCorreios())` — carrinho começa com Correios.
  2. `totalComFrete(100.0, 2.0)` → 100 (subtotal) + (2 × 2.5 + 10) = 115.0.
  3. `setFrete(new FreteJadlog())` — troca pra Jadlog.
  4. Mesmo carrinho, mesmo subtotal, mesmo peso → agora 111.0.
  5. `setFrete(new FreteRetirada())` → 100.0 (subtotal puro, frete grátis).
- **O que o output prova**: a mesma instância de Carrinho produziu três resultados diferentes porque a estratégia mudou. Isso é "algoritmo varia independentemente do cliente" na prática.
- **A frase-chave no rodapé direito**: "Adicionar Loggi amanhã? FreteLoggi implements FreteStrategy. Zero alteração no Carrinho."
  - Esse é o **payoff** do bloco 4 inteiro. Todos os benefícios acumulados (OCP, testabilidade, polimorfismo nomeado) se manifestam numa frase concreta.
  - Conecta de volta ao Bloco 2b: **essa é a estrutura que um agente de IA adora estender**.
- **Se perguntarem sobre thread-safety**: trocar strategy via setter no meio de uma operação multi-thread pode dar race condition. Em produção, ou se protege (sync) ou se usa strategies imutáveis + recria contexto.

---

## Slide 21 — Bloco 4: Bônus — lambda como Strategy

**O que é:** slide opcional (se sobrar tempo). Mostra que, como `FreteStrategy` tem um único método, Java 8+ aceita lambda no lugar de classe: `FreteStrategy freteGratis = peso -> 0.0`.

**Contexto:**
- **Functional interface**: desde Java 8, qualquer interface com exatamente um método abstrato é tratada como functional interface. Isso abre três formas equivalentes de implementar:
  - Classe completa (como no slide 18).
  - Classe anônima: `new FreteStrategy() { public double calcular(double p) { return 0.0; } }`.
  - Lambda: `peso -> 0.0`. Mais curto, mesmo efeito.
- **Quando usar lambda vs. classe?**
  - **Lambda**: estratégia simples, escopo local (um `main` de teste, uma config que monta estratégia conforme flag).
  - **Classe nomeada**: estratégia que você quer testar isolada, referenciar em múltiplos lugares, ou documentar com javadoc.
- **A frase-chave do slide**: "padrão não envelhece — a linguagem evolui pra expressá-lo melhor". Conecta com o slide 11 (frameworks mudam, padrões persistem). Java 8 não *destruiu* o Strategy; deu uma forma mais concisa de expressá-lo pros casos simples.
- **Kotlin, Scala, Python** têm construções ainda mais elegantes pra Strategy (funções de primeira classe nativas). A ideia é a mesma, a sintaxe encolhe.
- **Se perguntarem "então sempre usar lambda?"**: não. Lambda perde em:
  - Testabilidade (lambda anônima não tem nome pra referenciar em teste).
  - Reusabilidade (lambda dentro de método some quando o método retorna).
  - Clareza (lambda de 10 linhas é ilegível).

---

## Slide 22 — Bloco 5: Resumo em três frases

**O que é:** 3 itens numerados — "O que é", "Quando usar", "Por que importa agora" — sintetizando a apresentação.

**Contexto:**
- Slide de **recall**. O público ouviu 18 minutos de conteúdo. Aqui compactamos em três frases pra sobreviver até amanhã.
- **"Por que importa agora"** é o item mais importante pra quem fala — é a amarração de tudo. Código padronizado é mais legível pra humanos **E** pra agentes de IA. Essa conjunção é o diferencial da nossa apresentação. Reforce.
- **Dicas de entrega**:
  - Leia cada item devagar. Não corra.
  - Pausa de 1-2s entre os três.
  - Mantenha contato visual, não olhe só pro slide.
- Se o público só lembrar de UMA coisa da apresentação toda, que seja essa conjunção: *padrões servem humano e máquina*.

---

## Slide 23 — Bloco 5: Quando NÃO usar

**O que é:** três armadilhas — Over-engineering, Abstração vazia, Dogma — em cards com borda âmbar.

**Contexto:**
- Este slide **protege o público**. Sem ele, alguém sai pensando "vou strategyzar tudo". Resultado: projetos piores.
- **Over-engineering**: Strategy adiciona 3+ arquivos (interface + N classes). Se você só tem 2 casos que **nunca** vão virar 5, um `if/else` simples é mais honesto. "Adote o padrão quando a dor começar, não antes."
- **Abstração vazia (leaky abstraction inverso)**: se todas as implementações fazem quase a mesma coisa com uma diferença trivial, a interface está escondendo zero variação real. Você criou ruído, não clareza. Sinal claro: copiar-colar de uma implementação pra outra e trocar só um número = provavelmente não é Strategy.
- **Dogma**: padrões são sugestões, não lei. Se o time decidiu usar Strategy mas na prática a solução natural é outra coisa, respeite a solução natural. *"O padrão serve o projeto, não o contrário."*
- **A frase-fecho** ("use padrões pra problemas que doem"): é **humilde**. Mostra que vocês entendem que padrão é ferramenta, não religião. Professor Kenji vai gostar.
- Se perguntarem "como saber quando um `if/else` virou dor?" — regra informal: se você teve que editar a mesma classe >3 vezes pelo mesmo motivo, é hora de refatorar.

---

## Slide 24 — Bloco 5: Perguntas?

**O que é:** slide simples, tipografia grande "Perguntas?", rodapé com dica de Factory.

**Contexto:**
- Este é o momento **mais imprevisível** da apresentação. Prepare-se:
  - **Pergunta técnica**: se todos do grupo souberem responder, o mais próximo do tópico responde. Se não, quem sabe mais responde. Se ninguém sabe: *"Boa pergunta. Não temos certeza, vamos pesquisar e te responder depois."* — resposta honesta é melhor que invenção.
  - **Pergunta capciosa** ("isso não é overkill pra um cálculo de frete?"): reconheça a parte válida ("sim, pra 3 casos fixos seria"), reafirme o ponto ("mas o cenário real é justamente que não fica em 3 casos"). Não brigue.
  - **Silêncio**: se ninguém perguntar por 5s, tenha 1-2 perguntas "plantadas" pra o grupo comentar entre si ("ah, a pergunta que a gente achou que ia vir era X — e a resposta é..."). Evita silêncio constrangedor.
- A dica de Factory no rodapé é gancho caso alguém queira puxar assunto de outros padrões.
- **Quem responde o quê**: combine antes. Cada bloco tem um dono; perguntas sobre o bloco vão pra ele primeiro. Outros completam se precisar.

---

## Slide 25 — Recomendações

**O que é:** dois cards linkáveis — Refactoring.Guru (artigo) e vídeo no YouTube — pra quem quiser aprofundar.

**Contexto:**
- **Refactoring.Guru** é referência quase universal em padrões de projeto. Visual limpo, exemplos em várias linguagens, cobre os 23 padrões da GoF + alguns mais recentes. Link: refactoring.guru/design-patterns/strategy.
- O **vídeo** complementa com apresentação visual + refactor ao vivo. Bom pra quem aprende melhor assistindo.
- Este slide **não precisa ser falado** em voz alta se o tempo estiver apertado. Basta mostrar.
- Se o tempo permitir, a fala ideal é: *"Pra quem quiser se aprofundar, deixamos dois links aqui. O da Refactoring.Guru cobre os 23 padrões todos, se vocês curtiram hoje."*

---

## Slide 26 — Obrigado!

**O que é:** slide final. Título grande "Obrigado!", nomes dos 4 integrantes, rodapé com POO / IFAL / Prof. Kenji.

**Contexto:**
- **Easter egg**: pressione a tecla `K` neste slide. Dispara confetti, party hats e um modal "Parabéns, Kenji!". É um agrado pra professora Kenji — uma surpresa visual no fim.
  - Use com bom senso. Se o clima da apresentação for mais formal, pode pular. Se estiver leve, dá pra acionar depois do "Obrigado!" como cereja do bolo.
  - Fechamento: clicar fora do modal, apertar ESC, ou clicar em "fechar".
- **Não leia os nomes**. O público acabou de ouvir vocês por 20 minutos. Eles sabem quem vocês são.
- Fala ideal: *"É isso. Obrigado pela atenção. Se tiverem mais alguma pergunta, a gente fica aqui."* — curto, sem forçar aplauso.
- **Postura**: os 4 integrantes alinhados na frente, sorrindo, fazendo contato visual com a turma. Isso comunica "terminamos juntos".

---

## Dicas gerais de apresentação

**Antes:**
- Ensaie **em voz alta** (não só mental) pelo menos 2 vezes. Cronometre.
- Teste `.` e `,` no slide 4 pra garantir que os step-reveals funcionam na máquina da apresentação.
- Teste o modal de orchestrators (slide 9 — botão "Ver os orchestrators").
- Teste o easter egg do Kenji no slide final.

**Durante:**
- **Respire**. 20 minutos é longo; você tem tempo.
- Se errar uma palavra, não corrija — siga. Ninguém percebe.
- Use o teclado (setas ou espaço) em vez de mouse. Menos visual, mais fluido.
- Contato visual > ler o slide.

**Se der problema técnico:**
- Projetor travou → tenha o `index.html` aberto num segundo navegador, já na tela.
- Animação não rodou → siga em frente, não explique o problema.
- Máquina desligou → cinco segundos de silêncio, volte, retome onde parou. O público esquece rápido.

---

*Última revisão: 2026-04-17 · Qualquer dúvida durante o ensaio, grupo alinha em reunião.*

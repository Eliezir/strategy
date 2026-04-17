# Roteiro — Apresentação Strategy Pattern

**Disciplina:** Programação Orientada a Objetos (POO)
**Curso:** Sistemas de Informação — 4º período — IFAL
**Professor:** Kenji
**Grupo:** Eliezir Moreira, Thomas Gabriel, Carlos Roque, Eduardo Pereira
**Duração alvo:** 20 minutos

---

## Estrutura geral

| # | Bloco | Tempo |
|---|---|---|
| 0 | Abertura + gancho "a dor real" em código | 2 min |
| 1 | O que são padrões de projeto | 2,5 min |
| 2 | Por que padrões importam (colaboração + agentic coding) | 4,5 min |
| 3 | Strategy — intenção, estrutura, UML | 4 min |
| 4 | Strategy em Java — demo de código | 5 min |
| 5 | Encerramento, quando **não** usar, Q&A | 2 min |
| 6 | **[Reserva]** Bônus: Strategy vs State | +1,5 min (pós Q&A) |

> A divisão de quem fala o quê será definida entre o próprio grupo.

---

## Bloco 0 — Abertura + "a dor real" (2 min)

Este bloco tem dois momentos: uma abertura rápida (capa) e um **gancho forte em código**, mostrando visualmente o tipo de dor que o padrão Strategy resolve — *antes* de apresentar qualquer definição.

### 0.1. Abertura (20s)

**Slide sugerido:** capa com título, nomes do grupo, disciplina, professor.

**Fala-guia:**
> "Bom dia/boa tarde. Somos Eliezir, Thomas, Carlos e Eduardo, e hoje a gente vai falar sobre o padrão de projeto **Strategy**, na disciplina de POO do professor Kenji."

### 0.2. Gancho em código — a dor real (1 min)

**Slide sugerido:** trecho de código grande, propositalmente feio, ocupando metade ou mais do slide. Exemplo:

```java
public class Processador {

    public void executar(String feature, Request req) {
        switch (feature) {
            case "feature1":
                // lógica da feature 1
                validar(req); salvar(req); notificar(req);
                break;
            case "feature2":
                // lógica da feature 2
                validar(req); gerarRelatorio(req);
                break;
            case "feature3":
                // lógica da feature 3
                aplicarDesconto(req); salvar(req);
                break;
            case "feature4":
                // ...
                break;
            case "feature5":
                // ...
                break;
            // ... e mais 10 cases ...
            default:
                throw new IllegalArgumentException("Feature desconhecida: " + feature);
        }
    }
}
```

### 0.3. A realidade dos projetos (40s)

**Slide sugerido:** 3 pontos curtos ou uma imagem simbolizando "escopo crescendo"; a fala é o que carrega.

**Fala-guia, desenvolvendo o "por que isso acontece":**

- **Ninguém escreve esse código de propósito.** Projeto real raramente nasce com o escopo fechado. Você começa com 3 casos bem definidos.
- **Na maioria das vezes, nem o próprio cliente sabe o que quer no início.** Entrega a primeira versão, ele usa, pede ajustes, aparece uma feature nova. Depois outra. Depois outra.
- **Aí o código cresce organicamente.** Em 6 meses, aquele `switch` de 3 casos virou 15. Cada feature nova exige editar a mesma classe. Testar uma feature depende de instanciar o sistema inteiro. Mudar uma coisa pode quebrar outra.
- **E aqui vai o ponto-chave pra fechar o gancho:**
> "Isso não é incompetência — é a natureza do negócio de software. E padrões de projeto existem **exatamente** porque essa dor é inevitável. Eles são a resposta sistematizada de quem passou por isso primeiro. Hoje a gente vai falar de um padrão específico que ataca direto o problema desse switch aí."

---

## Bloco 1 — O que são padrões de projeto (2,5 min)

**Slides sugeridos (2):**
1. Definição + analogia + origem (famílias).
2. O que padrão *não* é.

### 1.1. Definição curta (30s)

> "Padrões de projeto são **soluções reutilizáveis e nomeadas** para problemas que aparecem repetidamente no design de sistemas orientados a objetos. Não é código pronto — é uma **receita** pra resolver um tipo de problema."

**Analogia rápida:** o padrão é a *receita*, não o bolo. Dois cozinheiros seguem a mesma receita e entregam bolos ligeiramente diferentes — a receita guia, não obriga.

### 1.2. Origem e famílias (1 min)

- Consagrados em 1994 pelo livro *Design Patterns*, dos quatro autores conhecidos como **Gang of Four (GoF)**: Gamma, Helm, Johnson e Vlissides.
- São **23 padrões clássicos**, divididos em 3 famílias:
  - **Criacionais** — como objetos são criados (ex.: Singleton, Factory).
  - **Estruturais** — como objetos se compõem (ex.: Adapter, Decorator).
  - **Comportamentais** — como objetos colaboram e trocam responsabilidades (ex.: Observer, **Strategy**, State).
- Strategy é **comportamental**. Trata de *como* um objeto faz uma coisa — e permite trocar esse "como" sem mexer no objeto.

### 1.3. O que padrão NÃO é (45s)

- **Não é biblioteca** — você não importa "Strategy" de lugar nenhum, você *escreve* no seu código.
- **Não é framework** — é independente de Spring, Quarkus, qualquer coisa.
- **Não é obrigação** — usar padrão em código que não precisa é over-engineering.
- **É vocabulário compartilhado** — quando você diz "aqui é Strategy", quem conhece o padrão entende em 3 segundos.

**Transição pro próximo bloco:**
> "Beleza, existe um catálogo de padrões há mais de 30 anos. Mas por que isso importa *hoje*, em 2026? É o que vamos ver agora."

---

## Bloco 2 — Por que padrões importam hoje (4,5 min)

**Dois mini-blocos:** colaboração humana + realidade do agentic coding.

### 2a. Colaboração humana (1,5 min)

**Fato central (mostrar no slide):**
> *Em qualquer projeto real, você passa mais tempo **lendo** código do que **escrevendo**.*

**Pontos a desenvolver (rápido, são reforços — a "dor" já foi apresentada no Bloco 0):**

- **Código é comunicação.** Padrão é um **protocolo** entre devs que nunca se viram — reduz discussão em code review e facilita onboarding.
- **Analogia curta:** é como conhecer o nome das peças de xadrez. Em vez de "aquela peça que anda em L", você diz "cavalo" — e a conversa fica imediata.

**Pausa estratégica:**
> "Até aqui é o argumento clássico. Mas em 2026 tem um motivo novo, e pra mim é o mais interessante."

### 2b. Agentic coding (3 min)

**Slide sugerido:** screenshot do Claude Code, Cursor ou Copilot Agent em ação.

#### O que é agentic coding (1 min)

- **Definição:** um modelo de desenvolvimento em que você descreve a **intenção** ("adicione suporte a pagamento via Pix") e um **agente autônomo** — baseado em LLM — lê o código, planeja, edita arquivos, roda testes e até faz commits.
- Ferramentas atuais: **Cursor**, **Claude Code**, **GitHub Copilot Agent**, **Windsurf**, entre outras.
- Escala do fenômeno: **Gartner projeta que, até 2026, 40% das aplicações empresariais vão incorporar agentes de IA** — em 2025, esse número era menos de 5%.

#### Por que padrões importam ainda mais com agentes (2 min)

**Tese central:**
> *Padrões de projeto ficaram **mais** importantes, não menos, na era do agentic coding.*

**Três razões:**

1. **Agentes reconhecem estruturas nomeadas.** LLMs foram treinados em milhões de linhas de código open-source. Um padrão clássico como Strategy é reconhecido na hora — o agente "sabe onde encaixar" uma extensão.

2. **Menos contexto necessário.** Se o código tem `PagamentoStrategy` com 3 implementações, pedir "adicione Pix" = o agente cria `PagamentoPix` e plugga. Num código com `if/else` espalhado em 5 arquivos, ele precisa entender cada ramificação — gasta mais contexto, erra mais, demora mais.

3. **Frase que resume (citação da comunidade):**
   > *"Frameworks mudam. Padrões persistem."* — Simon Willison e outros, 2026.
   >
   > Spring muda, Quarkus muda, o próprio Java muda. Mas o conceito de "encapsular algoritmo em uma classe que implementa uma interface comum" é verdade em 1994, em 2026, e vai ser em 2040.

**Exemplo concreto pra deixar no ar (transição pro próximo bloco):**
> "Imaginem: você tem um e-commerce com 3 transportadoras. Amanhã o chefe chega e diz: 'adicione Loggi'. Num código com Strategy, isso é **uma classe nova, zero mudança no resto**. É exatamente esse padrão que a gente vai detalhar agora."

---

## Bloco 3 — Strategy: intenção e estrutura (4 min)

### 3.1. Definição oficial da GoF (30s)

> *"Define uma família de algoritmos, encapsula cada um e os torna intercambiáveis. Strategy permite que o algoritmo varie independentemente dos clientes que o usam."*

Tradução em linguagem humana:
> "Quando você tem várias formas de fazer a mesma coisa, cada forma vira uma classe separada, e o código que usa essas formas escolhe qual usar sem saber os detalhes."

### 3.2. O problema que Strategy resolve (1 min)

Sem Strategy, um objeto que precisa se comportar de formas diferentes acaba:
- Cheio de `if/else` ou `switch` baseados em tipo/estado.
- Impossível de estender sem modificar (**viola o Open/Closed Principle de SOLID**).
- Difícil de testar isoladamente — cada ramo é um cenário acoplado ao resto.

**Princípios SOLID em jogo:**
O acrônimo SOLID representa os cinco princípios que facilitam o processo de desenvolvimento — o que facilita a manutenção e a expansão do software. Estes princípios são fundamentais na programação orientada a objetos e podem ser aplicados em qualquer linguagem que adote este paradigma.

- **S — Single Responsibility Principle:** cada algoritmo em uma classe separada → cada classe tem uma única responsabilidade.
- **O — Open-Closed Principle:** aberto pra extensão, fechado pra modificação. Strategy permite adicionar novos algoritmos sem alterar o código existente.

**Outros Princípios de SOLID:**
- **L — Liskov Substitution Principle (Princípio da substituição de Liskov)
- **I — Interface Segregation Principle (Princípio da Segregação da Interface)
- **D — Dependency Inversion Principle (Princípio da inversão da dependência)

### 3.3. Estrutura (2 min)

**Slide sugerido:** diagrama UML simples.

```
           ┌──────────────┐            ┌──────────────────┐
           │   Context    │ ◇--------▶ │    Strategy      │  (interface)
           │              │            │  + execute()     │
           └──────────────┘            └──────────────────┘
                                                ▲
                                                │ (implementam)
                                       ┌────────┼────────┐
                                       │        │        │
                                ┌──────┴─┐ ┌────┴───┐ ┌──┴─────┐
                                │Concrete│ │Concrete│ │Concrete│
                                │Strat. A│ │Strat. B│ │Strat. C│
                                └────────┘ └────────┘ └────────┘
```

**Atores:**
- **`Context`** — classe que *precisa* executar o algoritmo. Guarda uma referência a uma `Strategy` e chama seus métodos, mas **não sabe** qual implementação concreta está usando.
- **`Strategy`** (interface) — contrato comum. Um único método (ou poucos) que cada algoritmo precisa implementar.
- **`ConcreteStrategy`** — cada algoritmo concreto numa classe própria.

**Fluxo de uso:**
1. O cliente escolhe/recebe uma `ConcreteStrategy`.
2. Injeta no `Context` (construtor ou setter).
3. O `Context` chama `strategy.execute()` sem saber qual é.
4. Se amanhã precisar trocar, é só passar outra `ConcreteStrategy` — **runtime**, sem recompilar nada além da nova classe.

### 3.4. Strategy é polimorfismo "com nome e intenção" (30s)

Muita gente aprende polimorfismo em POO e depois aprende Strategy e pensa "mas isso é só polimorfismo". É — mas com uma intenção nomeada. O valor do padrão é **comunicar**: dizer "isso aqui é Strategy" avisa o leitor *por que* o polimorfismo está sendo usado.

**Transição pro próximo bloco:**
> "Ok, na teoria tá lindo. Agora a gente mostra isso em Java, com um exemplo real de e-commerce."

---

## Bloco 4 — Strategy em Java: demo de código (5 min)

**Cenário:** e-commerce que calcula frete de acordo com a transportadora escolhida. Três opções iniciais: **Correios**, **Jadlog**, **Retirada na loja**.

### 4.1. O ANTI-PATTERN — código sem Strategy (1 min)

**Slide com o código problemático:**

```java
public class CalculadoraFrete {

    public double calcular(String tipo, double pesoKg) {
        if (tipo.equals("CORREIOS")) {
            return pesoKg * 2.5 + 10.0;
        } else if (tipo.equals("JADLOG")) {
            return pesoKg * 3.0 + 5.0;
        } else if (tipo.equals("RETIRADA")) {
            return 0.0;
        }
        throw new IllegalArgumentException("Tipo de frete inválido: " + tipo);
    }
}
```

**Problemas a apontar em voz alta:**
- **Strings mágicas.** Se alguém digitar "correios" em minúsculo, quebra.
- **Cada nova transportadora = editar esta classe.** Viola Open-Closed Principle (OCP).
- **Lógica de cálculo acoplada.** Testar o cálculo da Jadlog exige instanciar `CalculadoraFrete` inteira.
- **Cresce para sempre.** 3 hoje. 7 no ano que vem. 15 em dois anos. Aí vira o "if/else hell" que a gente mencionou antes.

### 4.2. A SOLUÇÃO — refatorando com Strategy (3 min)

**Passo 1 — a interface (o contrato):**

```java
public interface FreteStrategy {
    double calcular(double pesoKg);
}
```

**Passo 2 — as estratégias concretas:**

```java
public class FreteCorreios implements FreteStrategy {
    @Override
    public double calcular(double pesoKg) {
        return pesoKg * 2.5 + 10.0;
    }
}

public class FreteJadlog implements FreteStrategy {
    @Override
    public double calcular(double pesoKg) {
        return pesoKg * 3.0 + 5.0;
    }
}

public class FreteRetirada implements FreteStrategy {
    @Override
    public double calcular(double pesoKg) {
        return 0.0;
    }
}
```

**Passo 3 — o Context (quem usa a estratégia):**

```java
public class Carrinho {

    private FreteStrategy frete;

    public Carrinho(FreteStrategy frete) {
        this.frete = frete;
    }

    public void setFrete(FreteStrategy frete) {
        this.frete = frete;
    }

    public double totalComFrete(double subtotal, double pesoKg) {
        return subtotal + frete.calcular(pesoKg);
    }
}
```

**Passo 4 — uso, com troca em runtime:**

```java
public class App {
    public static void main(String[] args) {
        Carrinho carrinho = new Carrinho(new FreteCorreios());
        System.out.println(carrinho.totalComFrete(100.0, 2.0));   // Correios

        carrinho.setFrete(new FreteJadlog());
        System.out.println(carrinho.totalComFrete(100.0, 2.0));   // Jadlog

        carrinho.setFrete(new FreteRetirada());
        System.out.println(carrinho.totalComFrete(100.0, 2.0));   // Retirada
    }
}
```

**Pontos a ressaltar enquanto mostra:**
- `Carrinho` **não conhece** `FreteCorreios`, `FreteJadlog`, `FreteRetirada`. Só conhece a interface `FreteStrategy`.
- Pra adicionar **Loggi** amanhã: crio `FreteLoggi implements FreteStrategy`. **Ponto.** Zero alteração em `Carrinho`.
- Cada estratégia é testável isolada: `new FreteJadlog().calcular(2.0)`.

### 4.3. Bônus (se sobrar tempo, ~1 min) — versão moderna com lambda

Como `FreteStrategy` tem **um único método**, é uma *functional interface*. Java 8+ permite:

```java
FreteStrategy freteGratis = peso -> 0.0;
FreteStrategy fretePromocional = peso -> peso * 1.0;

carrinho.setFrete(freteGratis);
```

Conecta o padrão clássico (1994) com a sintaxe moderna do Java — mostra que padrão não envelhece, linguagem evolui pra expressar o padrão melhor.

### 4.4. Fechamento do bloco

> "Então, resumindo o Bloco 4: o `if/else` virou uma interface e classes pequenas. O código ficou mais longo em número de arquivos — sim, é verdade — mas **ganhou em todas as outras dimensões**: extensível, testável, legível, e, como a gente falou antes, muito mais fácil pra um agente de IA estender. Isso é o OCP na prática."

**Transição pro encerramento:**
> "Mas, pra não passar a ideia errada, é importante falar de *quando NÃO usar* Strategy. A gente fecha com isso."

---

## Bloco 5 — Encerramento (2 min)

### 5.1. Resumo em 3 frases (30s)

1. **O que é:** Strategy encapsula variações de um algoritmo em classes separadas, trocáveis em tempo de execução.
2. **Quando usar:** quando você tem várias formas de fazer a mesma coisa *e* elas tendem a crescer ao longo do tempo.
3. **Por que importa agora:** código bem padronizado é mais legível pra humanos **e** pra agentes de IA — e padrões persistem mesmo quando frameworks mudam.

### 5.2. Quando NÃO usar (45s) — armadilhas comuns

- **Over-engineering.** Se você tem 2 casos e eles nunca vão virar 5, um `if/else` simples é mais honesto que criar interface + 2 classes.
- **Abstração vazia.** Se todas as suas "estratégias" fazem praticamente a mesma coisa com variação trivial, você não está usando Strategy — está usando uma interface pra constar.
- **Escolher Strategy é uma decisão de design, não de dogma.** O padrão serve o projeto, não o contrário.

### 5.3. Relação com outros padrões (15s — opcional, 1 slide)

- **Factory** costuma aparecer *junto* com Strategy — alguém precisa decidir *qual* estratégia instanciar, e esse alguém é frequentemente uma Factory.
- **State** — deixamos pra explicar em detalhe se der tempo ou se aparecer pergunta (ver Bloco 6).

### 5.4. Agradecimento, Q&A e gancho pro bônus (30s)

**Fala-guia:**
> "Obrigado! Antes de abrir pra perguntas — uma pergunta que muita gente faz quando aprende Strategy é: *'qual a diferença entre Strategy e o padrão State, já que o diagrama deles é praticamente igual?'* Guardei essa resposta pro final. Então, se alguém tiver alguma pergunta sobre o que a gente mostrou, levanta a mão. [pausa para Q&A] E, se quiserem, a gente fecha mostrando essa distinção — é rapidinho."

> **Intenção do gancho:** a pergunta "alguém tem dúvida?" sempre tem um vácuo. Esse gancho (a) faz ela parecer mais convidativa (já avisa que tem um extra), (b) te dá controle se ninguém perguntar — você mesmo pode dizer "então deixa eu mostrar essa curiosidade", e (c) mostra profundidade de preparo.

---

## Bloco 6 — [Reserva] Bônus: Strategy vs State (1,5 min)

**Quando usar:** depois do "alguém tem perguntas?", seja como resposta a alguém que perguntou, seja como fechamento ativo se ninguém perguntar. Pensar este bloco como *reserva controlada*: se o Q&A for animado e consumir tempo, pode ser cortado; se houver silêncio, ele salva a apresentação.

**Slide sugerido:** comparação lado a lado — duas colunas, cada uma com um diagrama UML simples (idênticos) e logo abaixo a intenção distinta. Ênfase visual: mesmo esqueleto, perguntas diferentes.

### 6.1. A observação que dispara a dúvida (15s)

> "Se vocês olharem o diagrama UML do Strategy e o do State lado a lado, eles são **praticamente idênticos**: um Context, uma interface, várias classes concretas. Então qual a diferença, afinal? A resposta está na **intenção**, não na estrutura."

### 6.2. Strategy — o cliente escolhe (30s)

- As estratégias geralmente **não se conhecem**. Cada `FreteCorreios`, `FreteJadlog`, `FreteRetirada` vive isolada.
- Quem decide trocar é **o cliente** (ou uma Factory externa): *"use Correios agora; depois troque pra Jadlog"*.
- **Pergunta que o padrão responde:** *"qual algoritmo eu uso pra esta execução?"*.
- **Exemplo:** cálculo de frete — o usuário escolhe a transportadora, o `Carrinho` executa.

### 6.3. State — o próprio objeto transita (30s)

- Os estados **frequentemente se conhecem** — cada estado sabe pra qual próximo estado pode transicionar.
- Quem decide trocar é **o próprio objeto dono do estado**, reagindo a eventos do ciclo de vida.
- **Pergunta que o padrão responde:** *"em que momento do ciclo de vida eu estou agora?"*.
- **Exemplo clássico:** um `Pedido` que passa de `Pendente` → `Pago` → `Enviado` → `Entregue`. O pedido dita as transições; o cliente externo só dispara eventos ("pagar", "enviar").

### 6.4. Frase de fechamento (15s)

> "Mesma estrutura, perguntas diferentes. Strategy pergunta *'qual algoritmo eu uso agora?'*. State pergunta *'em que momento do ciclo de vida estou?'*. Esse é o detalhe que separa os dois. Obrigado de novo, pessoal."

---

## Checklist pré-apresentação

- [ ] Cronometrar cada bloco em voz alta. Alvo total: **18–20 min**, deixando margem.
- [ ] Definir a divisão de quem fala cada bloco antes de ensaiar.
- [ ] Transições entre blocos estão ensaiadas (são onde as apresentações mais emperram).
- [ ] Screenshot do Claude Code/Cursor preparado pro Bloco 2b.
- [ ] Código da demo (Bloco 4) pronto e rodando localmente — mesmo que não execute ao vivo, mostrar que roda é prova de seriedade.
- [ ] Slide de referências/créditos no final (GoF, Refactoring.Guru, Baeldung).

---

## Referências

- Gamma, Helm, Johnson, Vlissides. *Design Patterns: Elements of Reusable Object-Oriented Software* (GoF, 1994).
- [Strategy pattern — Refactoring.Guru](https://refactoring.guru/design-patterns/strategy/java/example)
- [Strategy Pattern in Java — Baeldung](https://www.baeldung.com/java-strategy-pattern)
- [From If-Else Hell to Strategy Pattern — Medium](https://medium.com/@niteshthakur498/from-if-else-hell-to-strategy-pattern-refactoring-business-logic-in-java-bca6d28d4894)
- [Agentic Engineering Patterns — Simon Willison (2026)](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/)
- [Agentic Design Patterns — SitePoint (2026)](https://www.sitepoint.com/the-definitive-guide-to-agentic-design-patterns-in-2026/)

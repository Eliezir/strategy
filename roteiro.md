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
| 0 | Abertura & apresentação do grupo | 1 min |
| 1 | O que são padrões de projeto | 3 min |
| 2 | Por que padrões importam (colaboração + agentic coding) | 5 min |
| 3 | Strategy — intenção, estrutura, UML | 4 min |
| 4 | Strategy em Java — demo de código | 5 min |
| 5 | Encerramento, quando **não** usar, Q&A | 2 min |

> A divisão de quem fala o quê será definida entre o próprio grupo.

---

## Bloco 0 — Abertura (1 min)

**Slide sugerido:** capa com título, nomes do grupo, disciplina, professor.

**Fala-guia:**
> "Bom dia/boa tarde. Somos Eliezir, Thomas, Carlos e Eduardo, e hoje a gente vai falar sobre o padrão de projeto **Strategy**, na disciplina de POO do professor Kenji."

**Gancho pro público (15–20s, antes de entrar em definições):**
> "Antes de começar — rápido: quem aqui já escreveu um `if/else` gigantesco no código e, uma semana depois, precisou adicionar mais um `else if`? E mais um? E mais um? [pausa] Pois é. Essa dor não é só de vocês — é um problema clássico, e hoje a gente mostra um padrão que resolve exatamente isso."

---

## Bloco 1 — O que são padrões de projeto (3 min)

**Slides sugeridos (2–3):**
1. Definição.
2. As 3 famílias da GoF.
3. O que padrão *não* é.

### 1.1. Definição curta (40s)

> "Padrões de projeto são **soluções reutilizáveis e nomeadas** para problemas que aparecem repetidamente no design de sistemas orientados a objetos. Não é código pronto — é uma **receita** pra resolver um tipo de problema."

### 1.2. Origem e famílias (1 min)

- Consagrados em 1994 pelo livro *Design Patterns* de quatro autores conhecidos como **Gang of Four (GoF)**: Gamma, Helm, Johnson e Vlissides.
- São **23 padrões clássicos**, divididos em 3 famílias:
  - **Criacionais** — como objetos são criados (ex.: Singleton, Factory).
  - **Estruturais** — como objetos se compõem (ex.: Adapter, Decorator).
  - **Comportamentais** — como objetos colaboram e trocam responsabilidades (ex.: Observer, **Strategy**, State).
- Strategy é **comportamental**. Trata de *como* um objeto faz uma coisa — e permite trocar esse "como" sem mexer no objeto.

### 1.3. Analogia (40s)

> "Pensem numa receita de bolo. O padrão é a *receita* — não é o bolo pronto. Dois padeiros podem seguir a mesma receita e fazer bolos diferentes no final, com ingredientes locais, tamanho diferente. A receita guia, mas não obriga."

### 1.4. O que padrão NÃO é (30s)

- **Não é biblioteca** — você não importa "Strategy" de lugar nenhum, você *escreve* no seu código.
- **Não é framework** — é independente de Spring, Quarkus, qualquer coisa.
- **Não é obrigação** — usar padrão em código que não precisa é over-engineering.
- **É vocabulário compartilhado** — quando você diz "aqui é Strategy", quem conhece o padrão entende em 3 segundos.

**Transição pro próximo bloco:**
> "Beleza, existe um catálogo de padrões. Mas por que isso importa *hoje*, em 2026? É o que vamos ver agora."

---

## Bloco 2 — Por que padrões importam hoje (5 min)

**Dois mini-blocos:** colaboração humana + realidade do agentic coding.

### 2a. Colaboração humana (2 min)

**Fato central (mostrar no slide):**
> *Em qualquer projeto real, você passa mais tempo **lendo** código do que **escrevendo**.*

**Pontos a desenvolver:**

- **Código é comunicação.** Num projeto com 5, 10, 50 devs, a pessoa que vai mexer no seu código em 2027 talvez nem te conheça. Padrão é **protocolo de comunicação** entre devs que nunca se viram.
- **Reduz discussões.** Em code review, "usei Strategy aqui" substitui um parágrafo de explicação. Todo mundo que conhece o padrão já sabe o porquê.
- **Facilita onboarding.** Dev novo entra no time, bate o olho num código com padrões conhecidos e se localiza muito mais rápido do que em código ad-hoc.
- **Analogia:** é como conhecer o nome de peças de xadrez. Você não precisa explicar "aquela peça que anda em L" — é só dizer "cavalo".

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
- Impossível de estender sem modificar (**viola o Open/Closed Principle**).
- Difícil de testar isoladamente — cada ramo é um cenário acoplado ao resto.

**Princípios SOLID em jogo:**
- **O (Open/Closed):** aberto pra extensão, fechado pra modificação. Strategy é a materialização deste princípio.
- **S (Single Responsibility):** cada algoritmo numa classe → cada classe tem uma responsabilidade.

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
- **Cada nova transportadora = editar esta classe.** Viola OCP.
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

### 5.3. Relação com outros padrões (20s — opcional, 1 slide)

- **Factory** costuma aparecer *junto* com Strategy — alguém precisa decidir *qual* estratégia instanciar, e esse alguém é frequentemente uma Factory.
- **State** tem estrutura **idêntica** a Strategy, mas intenção diferente: State modela transições entre estados; Strategy troca algoritmos.

### 5.4. Agradecimento e Q&A (25s)

> "Obrigado. Perguntas?"

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

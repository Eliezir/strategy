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
| 0 | Abertura (capa) | 30s |
| 1 | O que são padrões de projeto | 2,5 min |
| 2 | Por que padrões importam (colaboração humana) | 3 min |
| 3 | Strategy — intenção e problema | 3 min |
| 4 | Estrutura técnica (baseada no Refactoring Guru) | 3 min |
| 5 | Exemplo de código em Java | 4 min |
| 6 | Prós e contras | 1 min |
| 7 | Quando aplicar | 1 min |
| 8 | Mini quiz pro público | 2 min |
| 9 | Conclusão e encerramento | 30s |
| 10 | **[Reserva]** Bônus: Strategy vs State | +1,5 min (pós Q&A) |

> A divisão de quem fala o quê será definida entre o próprio grupo.

---

## Bloco 0 — Abertura (30s)

**Slide sugerido:** capa com título, nomes do grupo, disciplina, professor.

**Fala-guia:**
> "Bom dia/boa tarde. Somos Eliezir, Thomas, Carlos e Eduardo, e hoje a gente vai falar sobre o padrão de projeto **Strategy**, na disciplina de POO do professor Kenji. Antes de entrar no padrão em si, vamos começar respondendo: o que são padrões de projeto, e por que a gente deveria se importar."

---

## Bloco 1 — O que são padrões de projeto (2,5 min)

**Slides sugeridos (2):**
1. Definição + analogias (receita + xadrez) + origem (GoF, famílias).
2. O que padrão *não* é.

### 1.1. Definição curta (30s)

> "Padrões de projeto são **soluções reutilizáveis e nomeadas** para problemas que aparecem repetidamente no design de sistemas orientados a objetos. Não é código pronto — é uma **receita** pra resolver um tipo de problema."

### 1.2. Analogias: receita e jogadas de xadrez (1 min)

**Receita:** o padrão é a *receita*, não o bolo. Dois cozinheiros seguem a mesma receita e entregam bolos ligeiramente diferentes — a receita guia, não obriga.

**Jogadas de xadrez:** quem joga xadrez conhece aberturas com nomes — **"Defesa Siciliana"**, **"Gambito da Dama"**, **"Abertura Italiana"**. Ninguém inventa esses movimentos do zero: são *padrões de jogo* batizados, estudados e reutilizados há séculos.

- Dizer *"vou jogar Siciliana"* resume, numa frase, uma sequência de 5–10 lances.
- Dois enxadristas adaptam a Siciliana ao momento, mas ambos sabem a estrutura.
- Padrões de projeto funcionam igual: **"aqui usei Strategy"** diz, em duas palavras, o que seria meia página de explicação.

### 1.3. Origem e famílias (30s)

- Consagrados em 1994 pelo livro *Design Patterns*, dos quatro autores conhecidos como **Gang of Four (GoF)**: Gamma, Helm, Johnson e Vlissides.
- São **23 padrões clássicos**, divididos em 3 famílias:
  - **Criacionais** — como objetos são criados (ex.: Singleton, Factory).
  - **Estruturais** — como objetos se compõem (ex.: Adapter, Decorator).
  - **Comportamentais** — como objetos colaboram e trocam responsabilidades (ex.: Observer, **Strategy**, State).

### 1.4. O que padrão NÃO é (30s)

- **Não é biblioteca** — você não importa "Strategy" de lugar nenhum, você *escreve* no seu código.
- **Não é framework** — é independente de Spring, Quarkus, qualquer coisa.
- **Não é obrigação** — usar padrão em código que não precisa é over-engineering.
- **É vocabulário compartilhado** — quando você diz "aqui é Strategy", quem conhece o padrão entende em 3 segundos.

**Transição:**
> "Beleza, existe um catálogo de padrões há mais de 30 anos. Mas por que um aluno de POO deveria se importar com isso na prática? É o que a gente vê agora."

---

## Bloco 2 — Por que padrões importam (3 min)

O foco deste bloco é responder "por que importa, na prática?". A resposta: **padrões são, antes de tudo, uma decisão social dentro de um time de engenharia**.

**Fato central (mostrar no slide):**
> *Em qualquer projeto real, você passa mais tempo **lendo** código do que **escrevendo**.*

Três pilares sustentam o valor de um padrão num time: **linguagem compartilhada**, **code review e onboarding**, e **intenção preservada no código**.

### 2.1. Linguagem onipresente (1 min)

- **Padrão é um protocolo** entre devs que nunca se viram.
- Dizer *"aqui usamos um Strategy"* resume, em uma frase, o que levaria minutos pra explicar passo a passo — exatamente como um enxadrista diz "Siciliana" pra resumir dez lances.
- **Reduz a carga cognitiva** de quem chega no projeto — não precisa decifrar a forma, só entender a regra de negócio.

### 2.2. Code review e onboarding (1 min)

- **Code review fica focado no que importa.** O revisor já sabe a estrutura que vai encontrar — interface + classes concretas + um Context que delega. Ele não gasta tempo decifrando *forma*; gasta tempo avaliando *lógica*.
- **Onboarding é mais rápido.** Um dev novo, ao ver uma pasta `frete/` com `FreteStrategy.java` e três implementações, entende a arquitetura da feature em segundos. Sem padrão, ele precisaria ler cada `if/else` pra separar variação de comportamento de regra de negócio.

### 2.3. Código autodocumentado (1 min)

- O padrão **revela a intenção** do autor original.
- Se você vê `FreteStrategy` implementada por várias classes, sabe que a intenção era: *"queremos trocar algoritmos de cálculo em runtime"*. Isso não precisa estar num comentário, num Confluence, numa reunião — está na **estrutura do código**.
- Seis meses depois, quando nem o próprio autor lembra por que escreveu daquele jeito, o padrão continua comunicando.
- **Frameworks mudam, padrões persistem.** Spring muda, Quarkus muda, o próprio Java muda. Mas "encapsular algoritmo em uma classe que implementa uma interface comum" é verdade em 1994, em 2026, e vai ser em 2040.

**Transição:**
> "Agora a gente aterrissa no padrão específico — o Strategy — e começa mostrando exatamente o tipo de dor que ele resolve."

---

## Bloco 3 — Strategy: intenção e problema (3 min)

### 3.1. Definição — o que é Strategy (30s)

Strategy é um padrão **comportamental** — ou seja, foca em *como os objetos colaboram e distribuem responsabilidades*, em oposição aos criacionais (que tratam da criação de objetos) e estruturais (que tratam da composição entre eles).

Definição da GoF:
> *"Define uma família de algoritmos, encapsula cada um e os torna intercambiáveis. Strategy permite que o algoritmo varie independentemente dos clientes que o usam."*

Em linguagem humana:
> "Quando você tem várias formas de fazer a mesma coisa, cada forma vira uma classe separada, e o código que usa essas formas escolhe qual usar sem saber os detalhes."

### 3.2. O problema — o método gigante (1,5 min)

**Slide:** trecho de código propositalmente feio, ocupando metade do slide.

```java
public class CalculadoraFrete {

    public double calcular(String tipo, double pesoKg) {
        if (tipo.equals("CORREIOS")) {
            return pesoKg * 2.5 + 10.0;
        } else if (tipo.equals("JADLOG")) {
            return pesoKg * 3.0 + 5.0;
        } else if (tipo.equals("RETIRADA")) {
            return 0.0;
        } else if (tipo.equals("SEDEX")) {
            return pesoKg * 4.0 + 15.0;
        } else if (tipo.equals("LOGGI")) {
            return pesoKg * 2.8 + 8.0;
        }
        // ... e mais 10 casos ...
        throw new IllegalArgumentException("Tipo de frete inválido: " + tipo);
    }
}
```

**Por que isso aparece na prática:**

- **Ninguém escreve esse código de propósito.** Projeto real raramente nasce com escopo fechado. Você começa com 3 casos bem definidos.
- **O cliente não sabe o que quer no início.** Entrega a primeira versão, ele usa, pede ajustes, aparece uma feature nova. Depois outra. Depois outra.
- **O código cresce organicamente.** Em 6 meses, aquele `if/else` de 3 casos virou 15.

**Problemas concretos apontáveis no código:**

- **Strings mágicas.** Se alguém digitar "correios" em minúsculo, quebra.
- **Cada nova transportadora = editar esta classe.** Viola o **Open/Closed Principle (OCP)**.
- **Risco de regressão.** E esse é o ponto mais perigoso: adicionar a próxima transportadora exige **mexer no mesmo método** que já contém o cálculo da Jadlog — que pode já estar **homologado em produção há meses**. Um `else` no lugar errado, um refactor mal pensado, uma condição perdida, e você **quebra uma funcionalidade que estava funcionando**. No mundo real, isso vira bug em produção, ticket aberto, rollback de madrugada.
- **Lógica de cálculo acoplada.** Testar o cálculo da Jadlog exige instanciar `CalculadoraFrete` inteira.
- **Cresce para sempre.** 3 hoje, 7 no ano que vem, 15 em dois anos — o clássico "if/else hell".

> "Isso não é incompetência — é a natureza do negócio de software. E é exatamente o tipo de dor que o Strategy existe pra curar."

### 3.3. A solução — encapsular algoritmos (1 min)

**Ideia central do Strategy:**
> Em vez de manter todos os algoritmos dentro de uma classe com `if/else`, **cada algoritmo vira uma classe própria**, implementando uma interface comum. O objeto que precisa do algoritmo apenas delega a execução.

Em diagrama de conceito:

```
ANTES:                          DEPOIS:
┌──────────────────────┐        ┌──────────────┐     ┌──────────────────┐
│ CalculadoraFrete     │        │   Carrinho   │ ◇──▶│ FreteStrategy    │
│  if tipo=="CORREIOS" │        │              │     │  + calcular()    │
│  if tipo=="JADLOG"   │        └──────────────┘     └──────────────────┘
│  if tipo=="RETIRADA" │                                      ▲
│  ...(15 ifs)...      │                         ┌────────────┼────────────┐
└──────────────────────┘                   FreteCorreios FreteJadlog FreteRetirada
```

**Três ganhos imediatos:**

1. **Adicionar nova transportadora** = criar uma classe nova. Zero alteração no `Carrinho`.
2. **Testar `FreteJadlog` isolado:** `new FreteJadlog().calcular(2.0)`.
3. **O `Carrinho` não conhece** as implementações — só o contrato `FreteStrategy`.

**Transição:**
> "Mas como esse esquema funciona em detalhe? É aí que entra a estrutura técnica — que a gente vai ver agora, baseada no Refactoring Guru."

---

## Bloco 4 — Estrutura técnica (3 min)

**Referência:** essa estrutura é canônica — vocês encontram em qualquer livro de padrões e, com os mesmos nomes, no [Refactoring Guru](https://refactoring.guru/pt-br/design-patterns/strategy), que é a melhor referência visual gratuita sobre o tema.

### 4.1. Os quatro atores (1,5 min)

**Slide sugerido:** diagrama UML.

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

1. **Contexto (`Context`)** — a classe que *precisa* do algoritmo. Ela **não sabe** *como* ele funciona, apenas *quando* executá-lo. Guarda uma referência a uma `Strategy` e chama seus métodos.
2. **Interface Strategy** — o *contrato* que define o que todas as estratégias devem fazer. Um único método (ou poucos).
3. **Estratégias Concretas (`ConcreteStrategy`)** — as diferentes implementações do contrato. Cada algoritmo numa classe separada.
4. **Cliente** — o código que **configura** qual estratégia o Contexto deve usar. Escolhe e injeta a estratégia concreta no momento adequado.

### 4.2. Fluxo de uso (30s)

1. O Cliente escolhe uma `ConcreteStrategy`.
2. Injeta no `Context` (construtor ou setter).
3. O `Context` chama `strategy.execute()` **sem saber qual é**.
4. Pra trocar em runtime: passa outra `ConcreteStrategy` — sem recompilar nada além da nova classe.

### 4.3. Composição em vez de herança (30s)

Strategy é a aplicação prática de um dos princípios mais clássicos do GoF: **"Prefira composição em vez de herança"**.

- Se o `Carrinho` **herdasse** de uma classe `CalculadoraCorreios`, ele ficaria preso a Correios em tempo de compilação — pra trocar de transportadora, precisaria virar outra subclasse. Herança **acopla** o comportamento à identidade da classe.
- Com Strategy, o `Carrinho` **tem um** `FreteStrategy` (relação *has-a*, composição). O comportamento é **plugado em runtime**, não herdado.

Herança amarra; composição liberta. É por isso que qualquer refatoração séria tende a substituir árvores de herança por colaborações baseadas em interfaces.

### 4.4. Strategy é polimorfismo com nome e intenção (30s)

Muita gente aprende polimorfismo em POO e depois aprende Strategy e pensa: "mas isso é só polimorfismo". É — mas com uma **intenção nomeada**. O valor do padrão é **comunicar**: dizer "isso aqui é Strategy" avisa o leitor *por que* o polimorfismo está sendo usado.

**Transição:**
> "Ok, teoria tá linda. Agora vamos colocar isso em Java."

---

## Bloco 5 — Exemplo em Java (4 min)

**Cenário:** o mesmo `CalculadoraFrete` do Bloco 3, agora refatorado.

### 5.1. Passo 1 — a interface (30s)

```java
public interface FreteStrategy {
    double calcular(double pesoKg);
}
```

Uma interface com **um único método** — o contrato que todas as transportadoras vão seguir.

### 5.2. Passo 2 — as estratégias concretas (1 min)

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

Cada classe cuida **apenas** da sua regra. Não há `if` de tipo — o tipo *é* a classe.

### 5.3. Passo 3 — o Contexto (1 min)

```java
import java.util.Objects;

public class Carrinho {

    private FreteStrategy frete;

    public Carrinho(FreteStrategy frete) {
        this.frete = Objects.requireNonNull(frete, "Estratégia de frete é obrigatória");
    }

    public void setFrete(FreteStrategy frete) {
        this.frete = Objects.requireNonNull(frete, "Estratégia de frete é obrigatória");
    }

    public double totalComFrete(double subtotal, double pesoKg) {
        return subtotal + frete.calcular(pesoKg);
    }
}
```

O `Carrinho` **não conhece** nenhuma transportadora específica. Só conhece a interface.

**Observação técnica — protegendo contra `NullPointerException`:**

Sem os `Objects.requireNonNull`, chamar `totalComFrete()` num carrinho sem estratégia definida derruba a aplicação com um `NullPointerException` de stack trace inútil. Temos **duas formas de tratar isso**:

1. **Estratégia obrigatória (fail-fast).** É o que fizemos acima — o `requireNonNull` **falha rápido** no exato momento da injeção, com mensagem clara. Torna explícito que o `Carrinho` **não existe sem frete**.

2. **Padrão Null Object — uma "estratégia padrão" que não faz nada.** Em vez de rejeitar null, você cria uma estratégia neutra:

   ```java
   public class FreteIndefinido implements FreteStrategy {
       @Override
       public double calcular(double pesoKg) {
           return 0.0;  // ou lançar exceção de negócio descritiva
       }
   }

   // Construtor sem argumentos usa a estratégia neutra:
   public Carrinho() {
       this.frete = new FreteIndefinido();
   }
   ```

   Vantagem: o sistema nunca quebra por ausência de estratégia. Desvantagem: esconde possíveis esquecimentos em tempo de desenvolvimento.

**Qual escolher?** Em cálculo de frete, a regra de negócio exige uma escolha explícita → **fail-fast** é mais honesto. Em domínios onde "nada" é um estado válido (ex.: *logger* que pode estar desabilitado), **Null Object** é mais elegante.

### 5.4. Passo 4 — uso e troca em runtime (1 min)

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

Pra adicionar **Loggi** amanhã: crio `FreteLoggi implements FreteStrategy`. **Ponto.** Zero alteração em `Carrinho`, `FreteCorreios`, `FreteJadlog` ou `FreteRetirada`. **Isso é OCP na prática.**

### 5.5. Bônus — versão com lambda (se sobrar tempo, ~30s)

Como `FreteStrategy` tem **um único método**, é uma *functional interface*. Java 8+ permite:

```java
FreteStrategy freteGratis = peso -> 0.0;
FreteStrategy fretePromocional = peso -> peso * 1.0;

carrinho.setFrete(freteGratis);
```

Padrão nasceu em 1994; linguagem evolui pra expressar o padrão melhor.

---

## Bloco 6 — Prós e contras (1 min)

**Slide sugerido:** duas colunas lado a lado.

**Prós:**
- **Troca em runtime** — muda o algoritmo sem recompilar o cliente.
- **Isolamento** — cada algoritmo é uma classe pequena e focada.
- **Testes unitários triviais** — `new FreteJadlog().calcular(2.0)`, sem montar o sistema inteiro.
- **Extensão sem modificação** — OCP na prática.

**Contras:**
- **Mais arquivos** — 1 interface + N classes em vez de 1 classe com `if/else`.
- **Cliente precisa saber escolher** — alguém decide qual estratégia usar (daí Factory às vezes vir junto).
- **Over-engineering se o domínio é estável** — 2 algoritmos que nunca vão virar 5 custam mais do que entregam.

---

## Bloco 7 — Quando aplicar (1 min)

### 7.1. Use Strategy quando…

- Você tem **várias variantes** de um algoritmo que precisam ser trocadas.
- Essas variantes **tendem a crescer** ao longo do tempo.
- Você quer **isolar a lógica** complexa da classe principal de negócio.
- Você quer **testar cada variante isoladamente**.

### 7.2. Dica de ouro

> *"Se você se pegar escrevendo `switch` ou vários `if/else` baseados em 'tipos' de comportamento — é hora de considerar Strategy."*

Essa é a regra prática pra reconhecer o padrão no código que você lê e escreve no dia a dia.

### 7.3. Quando NÃO usar — armadilhas comuns

- **Over-engineering.** 2 casos que nunca vão virar 5? Um `if/else` simples é mais honesto.
- **Abstração vazia.** Se todas as "estratégias" fazem praticamente a mesma coisa com variação trivial, você tá usando interface pra constar.
- **Strategy é decisão de design, não de dogma.** O padrão serve o projeto, não o contrário.

---

## Bloco 8 — Mini quiz pro público (2 min)

**Intenção:** engajar a turma, consolidar o conteúdo na memória de quem responde, e fechar a apresentação como conversa.

**Formato:** 3 perguntas rápidas — mostrar opções no slide, pedir resposta em voz alta ou mão levantada, revelar a resposta e comentar em 1 frase. Se a turma travar, o grupo responde e segue — o objetivo é engajar, não esperar.

### Pergunta 1 — reconhecer o problema

**Slide:**
```java
if (usuario.tipo.equals("ADMIN"))       usuario.fullAccess();
else if (usuario.tipo.equals("EDITOR")) usuario.limitedAccess();
else if (usuario.tipo.equals("VIEWER")) usuario.readOnly();
```

> *"Esse código pede qual padrão?"*
> (a) Singleton  (b) **Strategy**  (c) Observer  (d) Nenhum — tá simples o suficiente

**Resposta:** (b) Strategy.
**Comentário (15s):** "Sempre que o comportamento depende de um *tipo* que pode crescer, Strategy é o primeiro candidato."

### Pergunta 2 — Strategy ou outro padrão?

> *"Em cada cenário, decidam: Strategy, ou outra coisa?"*

1. **Um jogo com 3 modos de dificuldade (fácil/médio/difícil), cada um com IA diferente dos inimigos.**
   → **Strategy** ✓ (algoritmos intercambiáveis, cliente escolhe).

2. **Um pedido que passa de `Pendente` → `Pago` → `Enviado` → `Entregue`.**
   → **Não é Strategy.** É **State** — o próprio objeto dita as transições.

3. **Três algoritmos de ordenação (bubble, merge, quick) que o usuário escolhe.**
   → **Strategy** ✓.

**Comentário (15s):** "Quando o *cliente* escolhe o algoritmo, é Strategy. Quando o *próprio objeto* transita entre comportamentos seguindo um ciclo de vida, geralmente é State — a gente guardou isso pro bônus no fim."

### Pergunta 3 — conceitual (SOLID)

> *"Quais princípios do SOLID o Strategy atende mais fortemente? (pode ter mais de um)"*
> (a) SRP — Single Responsibility
> (b) **OCP — Open/Closed**
> (c) **DIP — Dependency Inversion**
> (d) ISP — Interface Segregation

**Resposta:** (b) OCP **e** (c) DIP — os dois juntos são o coração do padrão.

**Comentário (30s):**

- **OCP (Open/Closed) — extensão sem modificação.** Você *estende* o sistema adicionando uma classe nova (`FreteLoggi`), sem *modificar* nada do código existente. É a definição literal do princípio.

- **DIP (Dependency Inversion) — dependência da abstração.** O `Carrinho` (módulo de **alto nível**, lógica de negócio) não depende de `FreteCorreios` ou `FreteJadlog` (módulos de **baixo nível**, detalhes de implementação). Todos — alto e baixo nível — dependem da **abstração** `FreteStrategy`. A dependência *inverteu*: em vez de a regra de negócio depender do detalhe, o detalhe se curva à interface. É esse desacoplamento que torna o padrão tão poderoso: trocar, testar, mockar e estender fica trivial.

- **SRP de bônus:** cada estratégia concreta tem uma única responsabilidade (calcular o frete *daquela* transportadora).

---

## Bloco 9 — Conclusão e encerramento (30s)

**Resumo em 3 frases:**

1. **O que é:** Strategy encapsula variações de um algoritmo em classes separadas, trocáveis em tempo de execução.
2. **Quando usar:** quando há várias formas de fazer a mesma coisa *e* elas tendem a crescer.
3. **Por que importa:** código padronizado comunica intenção, encurta code review, acelera onboarding — e padrões persistem mesmo quando frameworks mudam.

**Fala-guia:**
> "Obrigado! Antes de abrir pra perguntas — uma dúvida que muita gente tem quando aprende Strategy é: *'qual a diferença entre Strategy e o padrão State, já que o diagrama deles é praticamente igual?'* Guardei essa resposta pro final. Então, se alguém tiver dúvida sobre o que a gente mostrou, levanta a mão. E, se quiserem, a gente fecha mostrando essa distinção — é rapidinho."

> **Intenção do gancho:** a pergunta "alguém tem dúvida?" sempre tem um vácuo. Esse gancho (a) faz ela parecer mais convidativa (já avisa que tem um extra), (b) dá controle se ninguém perguntar — o grupo pode dizer "então deixa eu mostrar essa curiosidade", e (c) mostra profundidade de preparo.

---

## Bloco 10 — [Reserva] Bônus: Strategy vs State (1,5 min)

**Quando usar:** depois do Q&A, como resposta a quem perguntou ou como fechamento ativo se ninguém perguntar.

**Slide sugerido:** comparação lado a lado — duas colunas, cada uma com um diagrama UML simples (idênticos) e logo abaixo a intenção distinta.

### 10.1. A observação que dispara a dúvida (15s)

> "Se vocês olharem o diagrama UML do Strategy e o do State lado a lado, eles são **praticamente idênticos**: um Context, uma interface, várias classes concretas. Então qual a diferença? A resposta está na **intenção**, não na estrutura."

### 10.2. Strategy — o cliente escolhe (30s)

- As estratégias geralmente **não se conhecem**. `FreteCorreios`, `FreteJadlog`, `FreteRetirada` vivem isoladas.
- Quem decide trocar é **o cliente** (ou uma Factory externa).
- **Pergunta que o padrão responde:** *"qual algoritmo eu uso pra esta execução?"*
- **Exemplo:** cálculo de frete — o usuário escolhe a transportadora.

### 10.3. State — o próprio objeto transita (30s)

- Os estados **frequentemente se conhecem** — cada estado sabe pra qual próximo pode transicionar.
- Quem decide trocar é **o próprio objeto dono do estado**, reagindo a eventos do ciclo de vida.
- **Pergunta que o padrão responde:** *"em que momento do ciclo de vida eu estou agora?"*
- **Exemplo clássico:** um `Pedido` que passa de `Pendente` → `Pago` → `Enviado` → `Entregue`.

### 10.4. Frase de fechamento (15s)

> "Mesma estrutura, perguntas diferentes. Strategy pergunta *'qual algoritmo eu uso agora?'*. State pergunta *'em que momento do ciclo de vida estou?'*. É isso. Valeu de novo, pessoal."

---

## Checklist pré-apresentação

- [ ] Cronometrar cada bloco em voz alta. Alvo total: **18–20 min**, deixando margem.
- [ ] Definir a divisão de quem fala cada bloco antes de ensaiar.
- [ ] Transições entre blocos estão ensaiadas (são onde as apresentações mais emperram).
- [ ] Código da demo (Bloco 5) pronto e rodando localmente — mesmo que não execute ao vivo, mostrar que roda é prova de seriedade.
- [ ] Ensaiar o mini quiz do Bloco 8 — slides das respostas prontos, quem apresenta cada pergunta combinado, respostas de reserva caso a turma trave.
- [ ] Slide de referências/créditos no final (GoF, Refactoring Guru, Baeldung).

---

## Referências

- Gamma, Helm, Johnson, Vlissides. *Design Patterns: Elements of Reusable Object-Oriented Software* (GoF, 1994).
- [Strategy pattern — Refactoring Guru (PT-BR)](https://refactoring.guru/pt-br/design-patterns/strategy)
- [Strategy pattern em Java — Refactoring Guru](https://refactoring.guru/design-patterns/strategy/java/example)
- [Strategy Pattern in Java — Baeldung](https://www.baeldung.com/java-strategy-pattern)
- [From If-Else Hell to Strategy Pattern — Medium](https://medium.com/@niteshthakur498/from-if-else-hell-to-strategy-pattern-refactoring-business-logic-in-java-bca6d28d4894)

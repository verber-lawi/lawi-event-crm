export const EVENTS = [
  {
    id: "smart-summit-2026",
    name: "Smart Summit 2026",
    date: "2026-03-12",
    endDate: "2026-03-13",
    location: "ExpoRio Cidade Nova, Rio de Janeiro",
    url: "https://smartsummit.com.br",
    status: "past",
    description: "9ª edição. +9.000 participantes, +300 palestrantes. Investimentos, negócios, tecnologia, Web3 e empreendedorismo.",
    strategy: "Foco em founders Web3 Tier 1 (startups early/growth) e Tier 2 (soft landing de empresas globais). Draper House como diferencial. Blockchain Rio como parceiro estratégico.",
    color: "#003366",
  },
  {
    id: "merge-sp-2026",
    name: "MERGE São Paulo 2026",
    date: "2026-03-17",
    endDate: "2026-03-19",
    location: "Theatro Municipal + World Trade Center, São Paulo",
    url: "https://www.mmerge.io/pt/merge-sao-paulo-2026",
    status: "upcoming",
    description: "Onde instituições se encontram com cripto e Web3. +4.000 participantes, +200 speakers. Institutional Summit + Conferência principal. Foco em regulação, DeFi, stablecoins, tokenização.",
    strategy: "Evento institucional pesado: bancos centrais, Visa, Mastercard, Ripple, Santander. Foco da Lawi: (1) Startups/founders no startup track, (2) Soft Landing de empresas globais entrando em LATAM, (3) Networking regulatório para inteligência, (4) Parcerias com players intermediários como Foxbit, Gnosis Pay, Bass Pago.",
    color: "#7B1FA2",
  },
  {
    id: "inta-2026",
    name: "INTA 2026 Annual Meeting",
    date: "2026-05-02",
    endDate: "2026-05-06",
    location: "ExCeL London, Londres, Inglaterra",
    url: "https://www.inta.org/meetings/2026-annual-meeting/home/",
    status: "upcoming",
    description: "148ª edição. 'Davos da Propriedade Intelectual'. 6.000+ registrados de 2.800+ organizações e 134 jurisdições. Maior evento global de IP e marcas.",
    strategy: "Evento core para o serviço de IP da Lawi. Foco: (1) Networking com escritórios de IP globais para expandir rede de parceiros (modelo spread), (2) Captação direta de startups/tech companies que precisam de registro de marca global, (3) Posicionamento da Lawi como referência em IP para startups e Web3. Lawi já registrou 1.637 marcas em 2025.",
    color: "#E65100",
  },
];

export const TIER_CONFIG = {
  1: { color: "#2E7D32", bg: "#E8F5E9", label: "PRIORIDADE" },
  2: { color: "#E65100", bg: "#FFF3E0", label: "SOFT LANDING" },
  3: { color: "#1565C0", bg: "#E3F2FD", label: "ECOSSISTEMA" },
};

export const SVC_COLORS = {
  LDFS: "#1565C0", "SL-IN": "#E65100", "SL-OUT": "#6A1B9A",
  IP: "#2E7D32", W3: "#00838F", DH: "#C62828",
};

export const LEADS = {
  // ========================================
  // SMART SUMMIT 2026
  // ========================================
  "smart-summit-2026": [
    {id:"ss-01",name:"Arthur Coelho",role:"CEO",company:"Tokeniza",tier:1,segment:"Tokenização/Web3",services:["LDFS","W3","IP","SL-OUT","DH"],pitch:"Lawi é especializada em startups de tokenização: compliance cripto, estruturação de tokens e proteção de marca global.",icebreaker:"Como vocês lidam com a questão regulatória dos tokens no Brasil?",why:"Startup BR tokenização em crescimento. Perfil exato Lawi."},
    {id:"ss-02",name:"Beny Fard",role:"CEO",company:"DeFin",tier:1,segment:"DeFi/Web3",services:["LDFS","W3","IP","SL-OUT","DH"],pitch:"DeFi é um dos setores mais regulados. A Lawi nasceu para resolver isso — jurídico terceirizado que entende Web3.",icebreaker:"Quais os maiores desafios regulatórios de operar DeFi no Brasil?",why:"DeFi BR, precisa de suporte jurídico especializado."},
    {id:"ss-03",name:"Fillipe Trentin",role:"CEO",company:"Oxus Finance",tier:1,segment:"DeFi/Web3",services:["LDFS","W3","IP","SL-OUT","DH"],pitch:"Estruturação societária entre co-founders + compliance DeFi. Lawi resolve do começo ao fim.",icebreaker:"Como foi estruturar a Oxus entre dois co-founders?",why:"DeFi early stage, dois co-founders."},
    {id:"ss-04",name:"Bruno Moniz",role:"COO/Co-founder",company:"Global Cripto / Nora Finance",tier:1,segment:"Cripto/Web3",services:["LDFS","W3","IP","SL-OUT","DH"],pitch:"Lawi ajuda startups cripto a crescer globalmente — da estruturação societária até incorporação internacional.",icebreaker:"Vocês já operam fora do Brasil?",why:"Ambição global, precisa de SL-OUT e LDFS."},
    {id:"ss-05",name:"Cassio J Krupinsk",role:"CEO",company:"BlockBR",tier:1,segment:"Tokenização/Web3",services:["LDFS","W3","IP","SL-OUT"],pitch:"Com o crescimento da BlockBR, proteção de marca e expansão internacional se tornam essenciais.",icebreaker:"A BlockBR tem planos de expansão para outros mercados?",why:"Tokenização BR. IP + expansão."},
    {id:"ss-06",name:"Luiz Parreira",role:"CEO",company:"BIPA",tier:1,segment:"Cripto/Pagamentos",services:["LDFS","W3","IP"],pitch:"Pagamentos em Bitcoin cruzam regulação financeira, cripto e compliance. Lawi resolve sem burocracia.",icebreaker:"Como a BIPA navega a regulação pós-marco regulatório?",why:"Pagamentos Bitcoin BR."},
    {id:"ss-07",name:"Ariel Scaliter",role:"CTO",company:"Justoken",tier:1,segment:"Tokenização Jurídica",services:["W3","IP","LDFS"],pitch:"Justoken tokeniza o jurídico, Lawi é o jurídico que entende tokenização. Nascemos para trabalhar juntos.",icebreaker:"Tokenização jurídica é fascinante. Enfrentam resistência regulatória?",why:"Afinidade direta. Cliente E parceiro."},
    {id:"ss-08",name:"Diogo Gonçalves",role:"CEO",company:"CreAItive",tier:1,segment:"AI/Web3",services:["LDFS","W3","IP","SL-OUT"],pitch:"AI e Web3 são os setores que mais precisam de IP. Lawi registra marcas globalmente — 1.600+ em 2025.",icebreaker:"Já pensaram na proteção de IP dos modelos da CreAItive?",why:"AI + Web3. IP é crítico."},
    {id:"ss-09",name:"Patrick Suyti",role:"Fundador",company:"Ludus",tier:1,segment:"Gaming/Web3",services:["LDFS","W3","IP","SL-OUT","DH"],pitch:"Gaming Web3 = IP + tokens + regulação. Lawi oferece tudo + Draper House.",icebreaker:"Como funciona a regulação dos tokens in-game?",why:"Gaming Web3. Pacote completo."},
    {id:"ss-10",name:"Nathaly Diniz",role:"CRO",company:"Lumx",tier:1,segment:"Web3/Infra",services:["LDFS","W3","IP","SL-OUT","DH"],pitch:"Empresa em crescimento acelerado precisa de jurídico que acompanhe o ritmo.",icebreaker:"O jurídico tem acompanhado o crescimento da Lumx?",why:"Infra Web3 BR em crescimento."},
    {id:"ss-11",name:"Fabio Thiele",role:"Co-fundador e COO",company:"UnblockPay",tier:1,segment:"Pagamentos Cripto",services:["LDFS","W3","IP","SL-OUT"],pitch:"Lawi complementa como LDFS externo — contratos, regulação, expansão.",icebreaker:"A UnblockPay tem planos de expansão para LATAM?",why:"Pagamentos cripto, complementa compliance."},
    {id:"ss-12",name:"Ibiaçu Caetano",role:"CFO",company:"Bitybank",tier:1,segment:"Banco Digital Cripto",services:["LDFS","W3","IP","SL-OUT"],pitch:"Banco digital cripto = regulação financeira + cripto. Lawi entende os dois.",icebreaker:"Qual o maior desafio regulatório de banco digital cripto?",why:"CFO banco digital cripto."},
    {id:"ss-13",name:"Rodrigo Caggiano",role:"Founder",company:"Capitare / Mobiup",tier:1,segment:"Blockchain/Startup",services:["LDFS","W3","IP","SL-OUT","DH"],pitch:"Empreendedor serial tem demandas em dobro. Lawi resolve tudo num lugar só.",icebreaker:"Gerenciar jurídico de duas empresas é desafiador, como lida?",why:"Serial entrepreneur blockchain."},
    {id:"ss-14",name:"Gustavo Siuves",role:"CRO",company:"Azify",tier:1,segment:"Cripto/Fintech",services:["LDFS","W3","IP","SL-OUT"],pitch:"Escalar receita em fintech cripto exige compliance robusto.",icebreaker:"A Azify pretende expandir para outros mercados?",why:"Fintech cripto escalando."},
    {id:"ss-15",name:"Felipe Maurano",role:"Country Manager BR",company:"Kraken",tier:2,segment:"Exchange Global",services:["SL-IN","W3","IP"],pitch:"Lawi assessora empresas cripto estrangeiras no Brasil. Regulação local com visão global.",icebreaker:"Quais os desafios jurídicos da Kraken no Brasil?",why:"Exchange global com operação BR."},
    {id:"ss-16",name:"André Sprone",role:"Head Ibero-América",company:"MEXC",tier:2,segment:"Exchange Global",services:["SL-IN","W3","IP"],pitch:"Expansão para LATAM exige compliance local. Lawi opera no Brasil, Argentina e tem parceiros globais.",icebreaker:"A MEXC já tem entidade no Brasil?",why:"Exchange asiática expandindo."},
    {id:"ss-17",name:"Sofia Düesberg",role:"General Manager",company:"Conduit",tier:2,segment:"Infra Blockchain Global",services:["SL-IN","W3","IP","DH"],pitch:"Infra blockchain precisa de compliance local. Lawi entende tecnologia E regulação brasileira.",icebreaker:"Como está montando operação da Conduit no Brasil?",why:"Infra blockchain global com GM local."},
    {id:"ss-18",name:"Alec Howard",role:"CEO",company:"Ruvo",tier:2,segment:"Web3/Startup Global",services:["SL-IN","LDFS","W3","IP","DH"],pitch:"Se a Ruvo quer operar no Brasil, Lawi faz soft landing completo + Draper House como base.",icebreaker:"O que trouxe a Ruvo ao Brasil?",why:"Startup Web3 global, CEO no evento."},
    {id:"ss-19",name:"Arthur Ribeiro",role:"Country Manager BR",company:"Reap",tier:2,segment:"Fintech Global",services:["SL-IN","W3","IP"],pitch:"Lawi é especialista em ajudar fintechs internacionais a se estabelecer no Brasil.",icebreaker:"Como tem sido a Reap entrando no Brasil?",why:"Fintech global com CM no Brasil."},
    {id:"ss-20",name:"Guilherme Wenceloski",role:"LATAM Director",company:"Hypernative",tier:2,segment:"Segurança Web3",services:["SL-IN","W3","DH"],pitch:"Segurança Web3 + compliance jurídico = pacote. Parceria Lawi + Hypernative.",icebreaker:"Interesse em parceria compliance + segurança on-chain?",why:"Segurança Web3 global. Potencial parceria."},
    {id:"ss-21",name:"Francisco Carvalho",role:"CEO",company:"Blockchain Rio",tier:3,segment:"Ecossistema Web3",services:["DH","W3"],pitch:"Blockchain Rio + Draper House = ecossistema Web3 do Rio completo.",icebreaker:"Como integrar DH como parceiro jurídico do ecossistema?",why:"Parceiro existente. Fortalecer."},
    {id:"ss-22",name:"Fernando Seabra",role:"Investidor Anjo",company:"Independente",tier:3,segment:"Investimento Anjo",services:["DH"],pitch:"Investidores que indicam bons advogados constroem confiança.",icebreaker:"Qual suporte jurídico os founders mais precisam?",why:"Multiplicador de leads."},
    {id:"ss-23",name:"Bruno Batavia",role:"Diretor",company:"Valor Capital Group",tier:3,segment:"VC",services:["DH"],pitch:"VCs que indicam jurídico agregam valor ao portfolio.",icebreaker:"As investidas do portfolio têm jurídico estruturado?",why:"VC relevante. Portfolio = indicações."},
    {id:"ss-24",name:"Julia Rosin",role:"CEO",company:"ABcripto",tier:3,segment:"Associação Cripto",services:["W3"],pitch:"Posicionar Lawi como referência para membros.",icebreaker:"Membros têm dificuldade em achar jurídico que entenda cripto?",why:"Associação cripto. Posicionamento."},
    {id:"ss-25",name:"Antonio Neto",role:"Head LATAM",company:"Solana Foundation",tier:3,segment:"Blockchain L1",services:["DH"],pitch:"DH como hub para builders Solana no Rio.",icebreaker:"Vocês têm grants para startups LATAM?",why:"Ecosystem play. Grants = clientes."},
  ],
  // ========================================
  // MERGE SÃO PAULO 2026
  // ========================================
  "merge-sp-2026": [
    {id:"mg-01",name:"Federico Murrone",role:"CEO & Founder",company:"Lirium",tier:1,segment:"Infra Cripto/Banking",services:["LDFS","W3","IP","SL-OUT"],pitch:"Lirium é infra cripto para bancos. Regulação e compliance são essenciais. Lawi é especialista nisso.",icebreaker:"Lirium opera em quais mercados na América Latina?",why:"Founder de infra cripto. Precisa de compliance multi-jurisdição."},
    {id:"mg-02",name:"Ricardo Dantas",role:"CEO",company:"Foxbit",tier:1,segment:"Exchange BR",services:["LDFS","W3","IP","SL-OUT"],pitch:"Foxbit é uma das maiores exchanges BR. Expansão internacional + compliance reforçado.",icebreaker:"A Foxbit tem planos de expansão internacional?",why:"Exchange BR em crescimento. IP + SL-OUT."},
    {id:"mg-03",name:"Rafael Pereira",role:"CEO",company:"Gnosis Pay",tier:1,segment:"Pagamentos Web3",services:["SL-IN","W3","IP"],pitch:"Gnosis Pay trazendo pagamentos cripto para LATAM precisa de assessoria local especializada.",icebreaker:"A Gnosis Pay está entrando no mercado brasileiro?",why:"Pagamentos Web3, potencial SL-IN."},
    {id:"mg-04",name:"Manuel Almeida",role:"CEO",company:"Bass Pago",tier:1,segment:"Pagamentos",services:["LDFS","W3","IP","SL-OUT"],pitch:"Pagamentos digitais precisam de compliance robusto e IP protegido. Lawi oferece os dois.",icebreaker:"Bass Pago opera em quais mercados?",why:"Founder, pagamentos digitais."},
    {id:"mg-05",name:"Alberto Murad",role:"CEO",company:"Bind PSP",tier:1,segment:"Fintech/PSP",services:["LDFS","W3","IP","SL-OUT"],pitch:"PSP na Argentina. Lawi opera na Argentina e pode assessorar expansão.",icebreaker:"A Bind PSP tem planos de expansão para o Brasil?",why:"CEO fintech argentina. Lawi bilateral BR-ARG."},
    {id:"mg-06",name:"Carlos Eduardo Franco Russo",role:"CEO",company:"Bloquo",tier:1,segment:"Tokenização",services:["LDFS","W3","IP"],pitch:"Tokenização precisa de compliance e IP. Lawi é especialista.",icebreaker:"Qual o maior desafio regulatório para tokenização no Brasil?",why:"CEO Bloquo, já presente no Smart Summit (ABTOKEN)."},
    {id:"mg-07",name:"Diego Gutiérrez Zaldívar",role:"Chairman & Co-Founder",company:"RootstockLabs",tier:1,segment:"Blockchain/Bitcoin L2",services:["W3","IP","SL-IN"],pitch:"Rootstock traz smart contracts ao Bitcoin. Lawi entende regulação de blockchain e IP.",icebreaker:"Rootstock está expandindo presença no Brasil?",why:"Co-founder blockchain L2 Bitcoin. Potencial SL-IN."},
    {id:"mg-08",name:"Daren Guo",role:"Co-Founder",company:"Reap",tier:1,segment:"Fintech Global",services:["SL-IN","W3","IP"],pitch:"Lawi já identificou a Reap no Smart Summit. Continuidade da conversa.",icebreaker:"Ótimo reencontrar a Reap! Como avançou a operação no Brasil?",why:"Co-founder Reap. Follow-up do Smart Summit."},
    {id:"mg-09",name:"Victória de Sá",role:"Founding Partner",company:"VERT Capital",tier:1,segment:"Investimentos/VC",services:["LDFS","W3"],pitch:"VC focado em startups. Lawi como parceiro jurídico para o portfolio.",icebreaker:"Qual tipo de suporte jurídico as investidas da VERT mais precisam?",why:"Founding partner VC. Multiplicador."},
    {id:"mg-10",name:"Jonathan Levin",role:"CEO & Co-founder",company:"Chainalysis",tier:2,segment:"Compliance/Analytics",services:["W3"],pitch:"Chainalysis + Lawi: compliance on-chain + compliance jurídico. Parceria potencial.",icebreaker:"Chainalysis tem parcerias com escritórios jurídicos em LATAM?",why:"CEO Chainalysis. Parceria de ecossistema."},
    {id:"mg-11",name:"Monica Long",role:"Presidente",company:"Ripple",tier:3,segment:"Blockchain/Pagamentos Global",services:[],pitch:"Networking. Ripple é grande demais para Lawi, mas ecossistema XRPL tem startups.",icebreaker:"Ripple tem programas para startups XRPL na América Latina?",why:"Presidente Ripple. Ecosystem play apenas."},
    {id:"mg-12",name:"Silvio Pegado",role:"Managing Director LATAM",company:"Ripple",tier:2,segment:"Blockchain/Pagamentos Global",services:["W3","DH"],pitch:"MD LATAM da Ripple. Conhecer para ecossistema. Startups XRPL = potenciais clientes Lawi.",icebreaker:"Como está o ecossistema Ripple na América Latina?",why:"MD LATAM Ripple. Mais acessível que Monica Long."},
    {id:"mg-13",name:"Guilherme Bettanin",role:"Latam Lead",company:"Base (Coinbase L2)",tier:2,segment:"Blockchain L2",services:["SL-IN","W3","DH"],pitch:"Base/Coinbase expandindo LATAM. Builders do ecossistema = clientes Lawi.",icebreaker:"Base tem programas para builders na América Latina?",why:"Latam Lead Base. Ecosystem play."},
    {id:"mg-14",name:"Sthefano Batista",role:"Head of LaTam",company:"Figment",tier:2,segment:"Staking/Infra",services:["SL-IN","W3"],pitch:"Figment expandindo em LATAM. Staking tem questões regulatórias. Lawi assessora.",icebreaker:"Figment está constituindo operação no Brasil?",why:"Head LATAM infra staking."},
    {id:"mg-15",name:"Daniel Mangabeira",role:"VP Strategy & Policy LATAM",company:"Circle",tier:3,segment:"Stablecoin Global",services:["W3"],pitch:"Circle/USDC em LATAM. Networking regulatório para inteligência.",icebreaker:"Quais os maiores desafios regulatórios para stablecoins no Brasil?",why:"VP Circle LATAM. Inteligência regulatória."},
    {id:"mg-16",name:"Cristian Bohn",role:"Sr. Director BD LATAM",company:"Circle",tier:3,segment:"Stablecoin Global",services:["W3"],pitch:"BD LATAM Circle. Potenciais clientes que usam USDC = startups que precisam da Lawi.",icebreaker:"Circle tem parcerias com startups em LATAM?",why:"BD Circle. Ecossistema."},
    {id:"mg-17",name:"Alejandro Acuña",role:"GTM Stablecoins",company:"Stripe",tier:3,segment:"Pagamentos Global",services:[],pitch:"Stripe entrando em stablecoins. Networking puro. Grande demais para Lawi.",icebreaker:"Como a Stripe vê stablecoins no mercado LATAM?",why:"Stripe. Networking apenas."},
    {id:"mg-18",name:"Kyle Rojas",role:"Institutional Lead Americas",company:"Ethereum Foundation",tier:3,segment:"Blockchain L1",services:["DH"],pitch:"ETH Foundation + Draper House. Builders Ethereum no Rio = clientes Lawi.",icebreaker:"Vocês têm grants para projetos no Brasil? A Lawi já tem parceria com ETH Global.",why:"ETH Foundation. Parceria existente."},
    {id:"mg-19",name:"Marco Antongiovanni",role:"Head BD Brazil",company:"B2C2",tier:2,segment:"Market Making",services:["SL-IN","W3"],pitch:"Continuidade do Smart Summit. B2C2 no Brasil precisa de assessoria local.",icebreaker:"Reencontro do Smart Summit! Como avançou a operação no Brasil?",why:"Follow-up Smart Summit."},
    {id:"mg-20",name:"Courtnay Guimarães",role:"Head Digital Assets",company:"Bradesco",tier:3,segment:"Banco/Digital Assets",services:["W3"],pitch:"Networking. Bradesco é grande, mas ecossistema de startups ao redor pode ser cliente.",icebreaker:"Quais tendências de digital assets vocês veem para bancos em 2026?",why:"Networking. Inteligência de mercado."},
    {id:"mg-21",name:"André Portilho",role:"Partner Head Digital Assets",company:"BTG Pactual",tier:3,segment:"Banco/Digital Assets",services:["W3"],pitch:"Networking. BTG idem.",icebreaker:"O ecossistema de digital assets do BTG tem programas para startups?",why:"Networking apenas."},
    {id:"mg-22",name:"Guto Antunes",role:"Partner Head Digital Assets",company:"Itaú Unibanco",tier:3,segment:"Banco/Digital Assets",services:["W3"],pitch:"Networking.",icebreaker:"Como o Itaú vê a regulação de ativos digitais evoluindo?",why:"Networking. Inteligência regulatória."},
    {id:"mg-23",name:"Maria Darbra",role:"Head of Brazil",company:"Ebury Bank",tier:2,segment:"Fintech/Câmbio Global",services:["SL-IN","W3"],pitch:"Ebury entrando no Brasil. Lawi pode assessorar soft landing.",icebreaker:"Como está a operação da Ebury no Brasil?",why:"Fintech europeia com Head BR."},
    {id:"mg-24",name:"Renan Ramos",role:"Sr. Institutional Relationship",company:"Kraken",tier:2,segment:"Exchange Global",services:["SL-IN","W3"],pitch:"Follow-up do Smart Summit. Kraken no Brasil.",icebreaker:"Continuidade da conversa do Smart Summit sobre Kraken no Brasil.",why:"Follow-up Smart Summit."},
    {id:"mg-25",name:"Katherine Cloud",role:"Head Government Relations",company:"Sumsub",tier:2,segment:"Compliance/KYC",services:["W3"],pitch:"Sumsub faz KYC. Potencial parceria: Sumsub (KYC) + Lawi (compliance jurídico).",icebreaker:"Sumsub tem parcerias com escritórios jurídicos em LATAM?",why:"Potencial parceria compliance."},
    {id:"mg-26",name:"Solange Gueiros",role:"Blockchain Dev Relations",company:"Chainlink Labs",tier:3,segment:"Oracle/Infra",services:["DH"],pitch:"Chainlink developers no Brasil. DH como hub para devs.",icebreaker:"Chainlink tem comunidade ativa de devs no Brasil?",why:"Dev relations. Ecosystem play."},
    {id:"mg-27",name:"João Lopes",role:"Gerente Projetos Blockchain",company:"BNDES",tier:3,segment:"Fomento/Governo",services:["W3"],pitch:"Networking institucional. BNDES blockchain = tendências do mercado.",icebreaker:"Quais projetos blockchain o BNDES está desenvolvendo?",why:"BNDES. Inteligência de mercado."},
    {id:"mg-28",name:"Antônia Souza",role:"Blockchain & Crypto Director LAC",company:"VISA",tier:3,segment:"Pagamentos Global",services:[],pitch:"Networking. VISA é enterprise demais. Mas ecossistema ao redor é relevante.",icebreaker:"Como a VISA vê crypto/blockchain impactando pagamentos em LATAM?",why:"Networking. Tendências."},
    {id:"mg-29",name:"Fabio Araujo",role:"Economista",company:"Banco Central do Brasil",tier:3,segment:"Regulador",services:[],pitch:"Networking regulatório. Ouvir tendências do DREX e regulação cripto.",icebreaker:"Quais as próximas fases do DREX? Como impacta startups?",why:"BCB. Inteligência regulatória."},
    {id:"mg-30",name:"Roberto E. Silva",role:"Presidente",company:"CNV Argentina",tier:3,segment:"Regulador",services:[],pitch:"Regulador argentino. Lawi opera na Argentina. Conhecer para posicionamento.",icebreaker:"Como está o ambiente regulatório para cripto na Argentina?",why:"Regulador ARG. Lawi é bilateral."},
  ],
  // ========================================
  // INTA 2026 ANNUAL MEETING
  // ========================================
  "inta-2026": [
    {id:"in-01",name:"Daren Tang",role:"Diretor Geral",company:"WIPO",tier:3,segment:"Organização Internacional IP",services:["IP"],pitch:"Networking institucional de alto nível. Posicionar Lawi como player global de IP para startups.",icebreaker:"Como a WIPO vê o futuro do registro de marcas para startups de tecnologia?",why:"Diretor Geral WIPO. Posicionamento institucional."},
    {id:"in-02",name:"John A. Squires",role:"Under Secretary / Director",company:"USPTO",tier:3,segment:"Escritório Patentes EUA",services:["IP"],pitch:"Networking. USPTO é regulador. Inteligência sobre tendências de registro nos EUA.",icebreaker:"Quais mudanças de política de marcas podemos esperar nos EUA?",why:"Director USPTO. Inteligência regulatória."},
    {id:"in-03",name:"Iyinoluwa Aboyeji",role:"Founder & CEO",company:"Future Africa",tier:1,segment:"VC/Startups África",services:["LDFS","IP","SL-OUT","W3"],pitch:"Future Africa investe em startups tech africanas. Essas startups precisam de IP global e possivelmente incorporação em outros países.",icebreaker:"As startups do portfolio da Future Africa protegem IP em múltiplas jurisdições?",why:"Founder VC tech africano. Portfolio = clientes potenciais."},
    {id:"in-04",name:"Ese Akpogheneta",role:"Trademark Counsel",company:"British American Tobacco",tier:3,segment:"Corporação Global",services:["IP"],pitch:"Networking. BAT é enterprise. Mas pode referenciar para startups no ecossistema.",icebreaker:"Quais os maiores desafios de gestão de portfolio de marcas global?",why:"In-house IP. Networking apenas."},
    {id:"in-05",name:"Lynn Carrillo",role:"Director Commercial Legal",company:"FIFA",tier:3,segment:"Esportes Global",services:["IP"],pitch:"Networking. FIFA é enterprise. Interessante para posicionamento em IP esportivo.",icebreaker:"Como a FIFA protege IP em jurisdições emergentes?",why:"Networking esportivo/IP."},
    {id:"in-06",name:"Escritórios de IP globais (geral)",role:"Parceiros potenciais",company:"Diversos (2.800+ orgs)",tier:1,segment:"IP/Advocacia",services:["IP"],pitch:"A Lawi busca parceiros locais em jurisdições onde ainda não opera para expandir o modelo de registro de marca com spread. Já registramos 1.637 marcas em 2025.",icebreaker:"Em quais jurisdições vocês são mais fortes? Temos clientes que precisam de registros em [país].",why:"INTA é o principal evento para expandir rede de agentes de IP. Modelo spread."},
    {id:"in-07",name:"Startups tech como expositoras",role:"Diversos",company:"Amazon, Microsoft, HP, Qualcomm etc.",tier:3,segment:"Tech/Enterprise",services:["IP"],pitch:"Grandes empresas não são clientes. Mas seus ecossistemas de startups precisam de IP.",icebreaker:"Vocês têm programas para startups? As startups costumam proteger IP desde o início?",why:"Ecosystem play. Startups nos programas deles."},
    {id:"in-08",name:"Kanisha Narayan MP",role:"UK IP Minister",company:"Governo UK",tier:3,segment:"Governo/Regulação",services:[],pitch:"Networking político. Inteligência sobre regulação de IP no UK.",icebreaker:"Como o UK vê a proteção de IP para startups de tecnologia?",why:"Regulação UK. Inteligência."},
    {id:"in-09",name:"Profissionais de IP LATAM",role:"Diversos",company:"Escritórios BR, ARG, MX, CO",tier:1,segment:"IP/Advocacia LATAM",services:["IP"],pitch:"Colegas de LATAM que podem ser parceiros ou fonte de referência mútua para registros na região.",icebreaker:"Em quais áreas vocês são mais fortes? Podemos trocar referências de clientes?",why:"Rede de parceiros LATAM para modelo spread."},
    {id:"in-10",name:"Profissionais de IP Europa",role:"Diversos",company:"Escritórios EU",tier:1,segment:"IP/Advocacia Europa",services:["IP"],pitch:"Lawi está expandindo para Europa (Espanha). Parceiros europeus para registro de marca EUIPO.",icebreaker:"Como funciona o registro via EUIPO para startups? Podemos ser parceiros?",why:"Expansão Europa. Parceiros para modelo spread."},
  ],
};

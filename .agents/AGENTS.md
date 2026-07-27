# Regras Personalizadas do Projeto (Workspace Rules)

## Atalhos de Comando
- Quando o usuário digitar `666` ou `rxzn` (ou usar os termos `666` ou `rxzn`), você deve **imediatamente iniciar o processo de deploy da aplicação**, empurrando as alterações locais para o repositório no GitHub (`https://github.com/taniosacacio/rushzine.git`) e acionando o pipeline (Coolify/MCP).
- Quando o usuário digitar `0gcot` ou usar o termo `0gcot`, você deve **imediatamente abrir a aplicação localmente no Google Chrome do usuário** executando o comando `open -a "Google Chrome"`. 

## Formatação de Mensagens (Comunicação)
- **Links Clicáveis:** Sempre que você mencionar um link (como `http://localhost:5173` ou qualquer outra URL), certifique-se de enviá-lo de forma clicável (usando a formatação padrão de markdown `<http://localhost:5173>` ou `[localhost](http://localhost:5173)`). Nunca envie URLs apenas em formato de código de texto plano se o usuário precisar clicar nelas.

## Restrições de Nomenclatura e Terminologia Técnica
- **JAMAIS utilizar o verbo "MEXER"** em discussões técnicas, documentações, commits ou explicações de interface (ex: "mexer no CSS", "mexer no layout", "fazer o botão mexer"). 
- **Substitutos Obrigatórios:** Utilize verbos técnicos formais e apropriados de engenharia de software e UX/UI, tais como: **Animar, Transladar, Manipular, Rotacionar, Transformar, Escalar, Ajustar, Customizar, Implementar, Alterar ou Refatorar**.
- *Nota:* O termo "mexer" só é tolerado se referindo estritamente aos elementos da interface que o usuário final vai interagir fisicamente (ex: "letras que se mexem"), mas nunca na comunicação profissional/gerencial do projeto.
Regra de Tipografia e Controle de Quebra (Line-wrapping):Proíba a separação de palavras que formam nomes próprios, termos compostos ou blocos semânticos indissociáveis (ex: Geddy Lee, Call-to-Action). Trate esses conjuntos como uma unidade visual única. Force o agrupamento utilizando lógicas de non-breaking space ou comportamento de white-space: nowrap. Se não houver espaço horizontal no contêiner, o termo inteiro deve ser empurrado para a próxima linha, preservando o impacto visual e a fluidez da leitura. Elimine viúvas e órfãs nos blocos de texto.
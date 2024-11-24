# **Gerenciador de Abas Inteligente**

Esta é uma extensão para o Google Chrome que permite gerenciar abas inativas de maneira inteligente. Ela fecha automaticamente as abas que estão inativas por mais de um tempo configurável pelo usuário, e também permite salvar a sessão atual das abas para que você possa restaurá-las mais tarde.

## **Funcionalidades**

- **Limite de Inatividade Configurável:** O usuário pode definir o tempo (em minutos) de inatividade após o qual as abas são fechadas automaticamente.
- **Salvar Sessão de Abas:** O usuário pode salvar a sessão atual de abas abertas, para restaurá-las posteriormente.
- **Prevenção de Fechamento da Aba Ativa:** A aba que está em uso nunca será fechada, mesmo que exceda o limite de inatividade configurado.
  
## **Tecnologias Utilizadas**

- JavaScript (para a lógica de gerenciamento de abas)
- HTML (para a interface do popup)
- CSS (para o estilo do popup)
- `chrome.storage.local` (para armazenar as preferências do usuário e sessão das abas)

## **Instalação**

1. Clone o repositório ou faça o download do código:
   ```bash
   git clone https://github.com/LucasAro/Gerenciador-de-Abas-Inteligent.git
   ```

2. Abra o Chrome e acesse a página de extensões:
   - Vá para `chrome://extensions/`

3. Habilite o **Modo de desenvolvedor** no canto superior direito da página de extensões.

4. Clique em **Carregar sem compactação** e selecione o diretório do projeto clonado.

5. A extensão será carregada e o ícone aparecerá na barra de ferramentas do navegador.

---

## **Uso**

1. **Configurar Limite de Inatividade:**
   - Clique no ícone da extensão na barra de ferramentas.
   - Insira o número de minutos para o tempo de inatividade.
   - Clique em **Salvar Configuração**.
   
2. **Salvar a Sessão Atual:**
   - Clique em **Salvar Sessão Atual** para armazenar os URLs das abas abertas.
   - Você pode restaurar essas abas futuramente (para adicionar a funcionalidade de restauração de abas, você pode expandir o código).

3. **Fechamento de Abas Inativas:**
   - A extensão fechará automaticamente as abas que excederem o tempo de inatividade configurado, **exceto a aba ativa**.

---

## **Estrutura do Projeto**

```plaintext
gerenciador-abas/
│
├── background.js           # Lógica de gerenciamento de abas
├── popup.html              # Interface do popup da extensão
├── popup.js                # Lógica do popup (interação com a UI)
├── manifest.json           # Manifesto da extensão
└── README.md               # Este arquivo
```

---

## **Como Contribuir**

1. Faça um fork do repositório.
2. Crie uma branch com sua feature ou correção: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -am 'Adicionando nova funcionalidade'`
4. Faça push para a sua branch: `git push origin minha-feature`
5. Abra um pull request para a branch principal.

---

## **Licença**

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.


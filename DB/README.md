# Repositório Banco de Dados SGP (Sistema Gerenciador de Poupas).

## Estrutura do Banco de Dados -> Diagrama de Entidade e Relacionamento

![Img1](<IMG1.png>)

![Img2](<IMG2.png>)

## Relacionamento das Tabelas

**USUARIO ↔ VENDA**

***Relacionamento: 1:N (Um Usuário realiza N Vendas)***

Regra: Cada venda é registrada por um usuário.

**PRODUTO ↔ LOTE**

***Relacionamento: 1:N (Um Produto tem N Lotes)***

Regra: Atende à regra de negócio: "Produtos devem ser controlados por lote e data de validade."

**LOTE ↔ ITEM_VENDA**

***Relacionamento: 1:N (Um Lote pode estar em N Itens de Venda)***

Regra: Garante que cada venda debite do lote correto para fins de controle de validade/perda.

**VENDA ↔ ITEM_VENDA**

***Relacionamento: 1:N (Uma Venda tem N Itens de Venda)***

Regra: Permite que uma venda inclua múltiplos produtos/lotes.

**LOTE ↔ MOVIMENTACAO**

***Relacionamento: 1:N (Um Lote tem N Movimentações)***

Regra: Registra a entrada (compra) ou saída (ajuste/perda) de estoque, vinculando sempre ao lote.

**OBSERVAÇÃO: A tabela MOVIMENTACAO é usada para registrar perdas por vencimento (Relatório 3.1) e outros ajustes de estoque. As saídas por venda são controladas pelas tabelas VENDA e ITEM_VENDA.**

-----------------------------------------------------------

# Ambiente de Homologação e Teste do Banco de Dados

## Docker: Instalação e Configuração

### Windows:

A maneira mais comum e recomendada de instalar o Docker no Windows (Windows 10 Pro/Enterprise/Education, Windows 11 ou Windows Server) é usando o Docker Desktop.

O Docker Desktop facilita muito o uso do Docker e inclui o Docker Engine, Docker CLI e o Docker Compose. Ele geralmente requer o uso do WSL 2 (Windows Subsystem for Linux 2) para um desempenho ideal.

**Aqui está um passo a passo geral para a instalação:**

**Pré-requisitos (Verifique se estão ativos ou serão ativados):
Ativar a Virtualização do CPU: Certifique-se de que a virtualização (como Intel VT-x ou AMD-V) esteja ativada na BIOS/UEFI do seu computador.**

**Instalar e/ou Atualizar o WSL 2: O Docker Desktop para Windows moderno usa o WSL 2 para executar o Docker Engine.**

**Windows 10/11 Home, Pro, Enterprise, Education: Você precisará ter o WSL 2 instalado e configurado antes ou durante a instalação do Docker Desktop.**

**Você pode abrir o PowerShell ou Prompt de Comando como administrador e executar:**

***wsl --install***
(Isso instala o WSL, se ainda não estiver instalado, e baixa uma distribuição Linux padrão).

**Se o WSL 2 já estiver instalado, certifique-se de que esteja atualizado:**

***wsl --update***
Você também pode precisar baixar e instalar o pacote de atualização do kernel Linux para WSL 2 do site da Microsoft.

**Passos para a Instalação do Docker Desktop:**

**Baixar o Instalador:**

Vá para o site oficial do Docker e baixe o instalador do Docker Desktop for Windows.

**Executar o Instalador:**

Dê um duplo clique no arquivo Docker Desktop Installer.exe para iniciar a instalação.

Na tela de configuração, geralmente você deve manter a opção "Use WSL 2 instead of Hyper-V (recommended)" marcada. Isso garantirá o melhor desempenho.

Clique em "OK" para prosseguir com a instalação.

Aguardar a Instalação e Reiniciar:

O instalador fará todo o trabalho, incluindo a cópia de arquivos e a configuração de componentes.

Ao final, o instalador provavelmente pedirá para reiniciar o seu computador. É importante fazer isso para que as alterações entrem em vigor.

**Iniciar o Docker Desktop:**

Após a reinicialização, procure e inicie o Docker Desktop no seu menu Iniciar.

O Docker Desktop pode levar alguns minutos para iniciar na primeira vez. Ele mostrará um ícone de baleia na bandeja do sistema (perto do relógio) que mudará de cor (geralmente de cinza para azul) quando estiver rodando.

**Verificar a Instalação:**

Abra o PowerShell ou Prompt de Comando.

Execute os seguintes comandos para verificar se o Docker está funcionando corretamente:

***docker --version***

***docker run hello-world***

O comando docker run hello-world deve baixar uma imagem de teste e exibir uma mensagem de confirmação se tudo estiver correto.

Pronto! O Docker estará instalado e pronto para uso no seu Windows.

**Nota:** Se você estiver usando o Windows Server, o processo de instalação é diferente, pois não utiliza o Docker Desktop e sim a instalação direta do Docker Engine via PowerShell e habilitação do recurso de Contêineres. Se for esse o caso, me avise que posso te dar os passos específicos.

--------------------------------

## Linux

A instalação do Docker no Linux geralmente envolve o Docker Engine (e não o Docker Desktop, que é mais comum no Windows/Mac), e o processo pode variar ligeiramente dependendo da sua distribuição (como Ubuntu, Fedora, Debian, etc.).

O método mais recomendado é usar o repositório oficial do Docker para garantir que você sempre instale a versão mais recente e estável.

Abaixo estão os passos detalhados para o Ubuntu/Debian, que são as distribuições mais comuns (baseadas em APT):

Instalação do Docker Engine no Ubuntu/Debian
Pré-requisitos:

Você deve ter um usuário com privilégios sudo.

- O sistema deve estar atualizado.

    1. Atualizar o sistema e instalar dependências
Abra o terminal e execute:

**Bash**

### Atualiza a lista de pacotes e o sistema

***sudo apt update***

***sudo apt upgrade -y***

### Instala pacotes necessários para o APT usar repositórios via HTTPS
***sudo apt install ca-certificates curl gnupg lsb-release -y***

2. Adicionar a chave GPG oficial do Docker
O Docker usa uma chave GPG para garantir que os pacotes que você baixa são autênticos:

**Bash**

### Cria o diretório para chaves GPG, se não existir
***sudo mkdir -p /etc/apt/keyrings***

### Baixa e adiciona a chave GPG oficial do Docker
***curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg***

3. Adicionar o repositório do Docker ao APT
Adicione o repositório estável do Docker às suas fontes de pacotes. Os comandos abaixo são para Ubuntu (se for Debian, você precisará mudar ubuntu para debian):

**Bash**

### Adiciona o repositório stable
***echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null***

### Atualiza novamente a lista de pacotes para incluir o novo repositório

***sudo apt update***

4. Instalar o Docker Engine
Agora você pode instalar o Docker Engine (incluindo o Docker CLI e o containerd):

**Bash**

***sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y***

5. Habilitar e Iniciar o Serviço Docker
O Docker geralmente inicia automaticamente, mas é bom verificar e garantir que ele inicie no boot:

**Bash**

### Inicia o serviço Docker
***sudo systemctl start docker***

### Habilita o serviço Docker para iniciar na inicialização
***sudo systemctl enable docker***

6. Executar o Docker sem sudo (Passo Opcional, mas Recomendado)
Por padrão, você precisa usar sudo para cada comando docker. Para usar o Docker como um usuário normal:

Adicione seu usuário ao grupo docker:

**Bash**

***sudo usermod -aG docker $USER***

Saia e entre novamente (ou reinicie o terminal):
Você precisa fazer logout e login novamente (ou reiniciar o sistema) para que a alteração do grupo tenha efeito.

7. Verificar a Instalação
Após fazer logout/login ou reiniciar, execute o comando de teste:

**Bash**

***docker run hello-world***

Se tudo estiver correto, você verá uma mensagem de confirmação do Docker.

Para Distribuições Baseadas em RHEL/Fedora (usando DNF/YUM)
Se você estiver usando Fedora, CentOS, RHEL ou distribuições semelhantes, o gerenciador de pacotes é o dnf (ou yum em sistemas mais antigos) e o processo de repositório é similar, mas com comandos diferentes.

### Instalar o dnf-plugins-core:

**Bash**

***sudo dnf -y install dnf-plugins-core***

### Adicionar o repositório do Docker:

**Bash**

***sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo***

### Instalar o Docker Engine:

**Bash**

***sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y***

### Iniciar e habilitar o serviço:

**Bash**

***sudo systemctl start docker***
***sudo systemctl enable docker***

**Siga os passos opcionais 6 e 7 de verificação e permissão de grupo descritos acima.**

--------------------------------

## Tutorial Youtube

**Windows:** *https://www.youtube.com/watch?v=kh1gkqCrNx4*

**Linux:** *https://www.youtube.com/watch?v=aGoQFy3BHHE*

----------------------------------

# Como Rodar o Banco de Dados via Docker

- Via bash, dentro do diretório DB, execute o comando: ***'docker-compose' up -d'***;

- Em seguida, execute o comando: ***docker container inspect estoque_db***;

- Copie o **IpAddress** do container;

- Cole no Host do seu SGBD;

- Insira o User: **estoques**, senha: **estoques** e Db: **estoques_db**;



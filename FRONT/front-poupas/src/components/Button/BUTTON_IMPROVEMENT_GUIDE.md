# Guia de Melhorias para o Componente Button

Este guia detalha os passos para refatorar o `Button.jsx` utilizando bibliotecas padrão de mercado como **CVA (Class Variance Authority)**, **clsx** e **tailwind-merge** para criar um componente mais robusto, escalável e fácil de manter.

---

### Passo 1: Instalação das Dependências

Para um gerenciamento de classes CSS mais inteligente e para criar variantes de componentes de forma declarativa, vamos instalar três pacotes.

- **`class-variance-authority`**: Permite criar variantes de estilo (ex: botões primários, secundários, de diferentes tamanhos) de uma maneira limpa.
- **`clsx`**: Uma pequena utilidade para construir strings de `className` condicionalmente.
- **`tailwind-merge`**: Usado para mesclar classes do Tailwind CSS sem conflitos de estilo (ex: um `p-2` sobrescrevendo um `p-4`).

Execute o seguinte comando no terminal, na raiz do projeto `front-poupas`:

```bash
npm install class-variance-authority clsx tailwind-merge
```

---

### Passo 2: Refatorando o Código do `Button.jsx`

Agora, altere o arquivo `src/components/Button.jsx` para usar as bibliotecas instaladas. O código abaixo implementa um sistema de variantes completo.

**Substitua o conteúdo de `Button.jsx` pelo código abaixo:**

```jsx
import * as React from "react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// 1. Definição das Variantes do Botão com CVA
const buttonVariants = cva(
  // Classes base aplicadas a todas as variantes
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      // Variantes de "intenção" (cor e estilo principal)
      intent: {
        primary: "bg-[#B78F57] text-white hover:bg-[#a87f4a]",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      // Variantes de tamanho
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10", // Tamanho específico para botões de ícone
      },
    },
    // Valores padrão caso nenhuma prop seja passada
    defaultVariants: {
      intent: "primary",
      size: "default",
    },
  }
);

// Função para unificar as classes de forma segura
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 2. Definição do Componente React
const Button = React.forwardRef(
  ({ className, intent, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ intent, size, className }))}
        ref={ref}
        {...props} // Passa todas as outras props (onClick, type, children, etc.)
      />
    );
  }
);
Button.displayName = "Button";

// 3. Exportação do componente
export { Button, buttonVariants };

```

---

### Passo 3: Como Usar o Novo Componente Button

Após a refatoração, você pode usar o `Button` de forma muito mais flexível em qualquer lugar da sua aplicação.

**Exemplos de Uso:**

```jsx
import { Button } from "./Button";
import { Mail } from "lucide-react"; // Exemplo com um ícone da biblioteca lucide-react

function MyComponent() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Botão primário (padrão) */}
      <Button>Botão Primário</Button>

      {/* Botão secundário */}
      <Button intent="secondary">Botão Secundário</Button>

      {/* Botão de perigo */}
      <Button intent="destructive">Excluir</Button>

      {/* Botão de contorno */}
      <Button intent="outline">Ver Detalhes</Button>

      {/* Botão fantasma (sem fundo) */}
      <Button intent="ghost">Cancelar</Button>

      {/* Botão desabilitado */}
      <Button disabled>Desabilitado</Button>

      {/* Botão com tamanho pequeno (sm) */}
      <Button size="sm">Pequeno</Button>

      {/* Botão com tamanho grande (lg) */}
      <Button size="lg">Grande</Button>

      {/* Botão de ícone */}
      <Button intent="outline" size="icon">
        <Mail className="h-4 w-4" />
      </Button>

      {/* Botão com um evento de clique */}
      <Button onClick={() => alert("Clicado!")}>Clique em mim</Button>
    </div>
  );
}
```

Com isso, seu componente `Button` se torna uma base sólida e reutilizável para o sistema de design do seu projeto, alinhado com as melhores práticas do mercado.

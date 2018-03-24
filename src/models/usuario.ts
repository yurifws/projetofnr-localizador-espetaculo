export class Usuario{
    email: string
    senha: string
    nome: string
    tipoUsuario: boolean

    constructor() {
        this.email = '';
        this.senha = '';
        this.nome = '';
        this.tipoUsuario = false;
    }

    
}
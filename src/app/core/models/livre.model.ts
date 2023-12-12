export class Livre {
    idLivre ?: number;
    titre !: string;
    nomAuteur !: string;
    nbPages !: number;
    dateDePublication !: Date;
    description !: string;
    categorie !: number;
    image ?: string;
    disponibilite ?: boolean;
}
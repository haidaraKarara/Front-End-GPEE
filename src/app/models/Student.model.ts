
export class Student {
    constructor(
        public prenom: string,
        public nom: string,
        public date_naissance: Date,
        public lieu_naissance: string,
        public sexe: string,
        public classe: number,
        public tuteur?: string,
        public telephone?: number,
        public adresse?: String,
        public ancienne_ecole?: string
        ) {}
  }
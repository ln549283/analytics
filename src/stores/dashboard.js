import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as XLSX from 'xlsx'

export const useDashboardStore = defineStore('dashboard', () => {
  const state = {
    jsonData: ref(null),
    fileName: ref(''),
    headers: ref([])
  }

  const getters = {
    getHeaderIndex(colonne){
      return this.headers.findIndex(h => h == colonne);
    }
  }

  const methods = {
    setJsonData(event) {
      return new Promise((resolve, reject) => {
        const file = event.target.files[0];
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
    
          // Supposons que vous voulez lire la première feuille de calcul
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
    
          // Convertir le contenu de la feuille de calcul en tableau JavaScript
          this.jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          this.headers = this.jsonData.length > 0 ? this.jsonData[0] : [];

          resolve(this.jsonData); // Résoudre la promesse avec les données JSON
          console.log("done");
        };
        reader.onerror = (error) => {
          reject(error); // Rejeter la promesse en cas d'erreur
        };
        reader.readAsArrayBuffer(file);
      });
    },

    triAPlat(colonne) {
      const indexHeader = this.getHeaderIndex(colonne);
      const occurrencesMap = new Map()
      for (let i = 1; i < this.jsonData.length; i++) {
        // Commence à l'indice 1 pour exclure l'en-tête
        const value = this.jsonData[i][indexHeader]
        if (value) {
          // Assurez-vous que la valeur n'est pas vide
          occurrencesMap.set(value, (occurrencesMap.get(value) || 0) + 1) // Incrémentez le compteur d'occurrences pour cette valeur
        }
      }
      const data = {
        header: this.jsonData[0][indexHeader],
        data: occurrencesMap
      }
      return data
    },
    TriCroise(colonne1, colonne2) {
      const occurrencesMap = new Map()
      const indexHeader1 = this.getHeaderIndex(colonne1);
      const indexHeader2 = this.getHeaderIndex(colonne2);


      for (let i = 1; i < this.jsonData.length; i++) {
        // Commence à l'indice 1 pour exclure l'en-tête
        const valueColumn1 = this.jsonData[i][this.headers[indexHeader1]]
        const valueColumn2 = this.jsonData[i][this.headers[indexHeader2]]
        if (valueColumn1 && valueColumn2) {
          const key = `${valueColumn1}-${valueColumn2}` // Créez une clé unique basée sur les valeurs des colonnes donnnées en parametre
          occurrencesMap.set(key, (occurrencesMap.get(key) || 0) + 1) // Incrémentez le compteur d'occurrences pour cette combinaison de valeurs
        }
      }

      // Maintenant, occurrencesMap contient le nombre de répétitions de chaque combinaison de valeurs dans les colonnes donnnées en parametre
      console.log('Occurrences :', occurrencesMap)
    }
  }

  return {
    ...state,
    ...getters,
    ...methods
  }
})

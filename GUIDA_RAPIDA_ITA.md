# 🎯 GUIDA RAPIDA ITALIANA - Inizia da qui!

**Created:** 2026-04-05  
**For:** Giuseppe  
**Language:** Italiano

---

## 📍 Dove Sei Adesso

Hai in `/home/claude/` **35 file pronti all'uso**. Tutto quello che ti serve è qui.

---

## ⚡ 5 Minuti per Iniziare

### 1️⃣ Leggi CLAUDE.md (2 min)
```bash
cat /home/claude/CLAUDE.md
```
↳ **QUESTO è il tuo "cervello"**. Definisce come pensi, comunichi e decidi.

### 2️⃣ Installa il Dashboard (2 min)
```bash
cd /home/claude/dashboard
npm install
```

### 3️⃣ Configura le Credenziali (1 min)
```bash
# Copia il template
cp .env.local.example .env.local

# Apri e modifica .env.local
nano .env.local
```

**Cosa mettere:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=key-da-supabase
SUPABASE_SERVICE_KEY=service-key-da-supabase
STACK_WEBHOOK_URL=https://tua-istanza-stack/webhooks/briefing
```

👉 **Come trovare le credenziali:**
1. Vai su https://app.supabase.com
2. Seleziona il tuo progetto
3. Vai su "Settings" → "API"
4. Copia i valori in `.env.local`

### 4️⃣ Inizializza il Database (0 min - automatico)
```bash
npm run setup-db
```
↳ Crea la tabella `todos` con Realtime abilitato

### 5️⃣ Avvia il Server (0 min)
```bash
npm run dev
```
↳ Apri http://localhost:3000 nel browser

✅ **Fatto! Sei online.**

---

## 🎮 Cosa Puoi Fare Adesso

### Creare un Todo
1. Clicca "+ New Todo"
2. Compila il form:
   - **Title** (obbligatorio): cosa devi fare
   - **Priority**: Low/Medium/High/Critical
   - **Status**: To Do / In Progress / Blocked / Done
   - **Due Date**: quando deve essere fatto
   - **Tags**: #tesi, #esame, #lab, ecc.

### Visualizzare le Task
3 modi di vedere i tuoi compiti:

**📊 KANBAN** (come Trello)
- 4 colonne: To Do, In Progress, Blocked, Done
- Trascina tra le colonne
- Si aggiorna in tempo reale

**📝 LIST** (vista lista)
- Elenco completo di tutti i compiti
- Ordinato per priorità
- Filtri avanzati

**📅 TIMELINE** (vista calendario)
- Compiti raggruppati per scadenza
- Overdue | Today | Tomorrow | This Week | Later
- Vedi cosa è in ritardo

### Editare un Todo
- Clicca su un compito
- Modifica quello che vuoi
- Clicca "Save"

### Eliminare un Todo
- Clicca su un compito
- Clicca "Delete"
- Conferma

---

## 🧠 Come Funziona la Memoria

### I 4 File di Memoria

Sono in `/home/claude/memory/`:

| File | Cosa Contiene | Quando Leggerlo |
|------|---------------|-----------------|
| **user.md** | Chi sei adesso (stato attuale, corso, deadline) | Sempre |
| **preferences.md** | Come vuoi che ti comunichi (tono, formato) | Sempre |
| **people.md** | Persone importanti (Arianna, Prof., lab) | Quando ne parli |
| **decisions.md** | Decisioni passate e perché (SIPhaB vs Biotech) | Per contesto |

### Come Funziona

```
Domani mattina →  Mi riscrivi  →  Leggo memoria  →  Rispondo nel TUO stile
                                   (CLAUDE.md)
                                   (user.md)
                                   (preferences.md)
                                   (people.md)
                                   (decisions.md)
```

**Esempio reale:**
```
Tu: "Mi aiuti a preparare l'esame di Genetica?"

Io leggo:
- CLAUDE.md → "Giuseppe vuole: outline + Q&A + mappe concettuali"
- user.md → "M.Sc. Medical Biotech, max 80 pag/giorno"
- preferences.md → "Tono formale, niente emoji"
- decisions.md → "Sceglie per passione, non per credential"

Io rispondo:
"Perfetto. Sapendo che hai max 80 pagine/giorno...
[Outline gerarchico + mappe + 50 domande simul orale]
Connessione con AI/ML per la tesi? ..."
```

---

## ⏰ Briefing Automatico (8:00 AM)

### Come Funziona

**Ogni mattina a le 8:00:**
```
1. Leggo /memory (chi sei, cosa hai deciso, preferenze)
2. Leggo /todos/active.md (compiti che hai messo come "attivi")
3. Genero TOP 5 PRIORITÀ per oggi
4. Invio a Stack via webhook
```

### Esempio di Briefing Ricevuto

```json
{
  "timestamp": "2026-04-05T08:00:00Z",
  "summary": "Magistrale in corso, tesi in planning, energia variabile",
  "priorities": [
    "1. [DEADLINE] Proposta tesi - 2026-06-30",
    "2. [ESAME] Genetica Umana - pagine 1-40",
    "3. [TESI] Schedulare meeting con advisor",
    "4. [BENESSERE] Mantenere ritmo sonno (bipolare)",
    "5. [APPRENDIMENTO] Spagnolo 15 min"
  ],
  "recommendations": [
    "Monitorare energia bipolare; non all-or-nothing",
    "Connettere tesi a AI/ML",
    "Max 80 pag/giorno; blocchi 50+10",
    "Decidi con passione non credentials",
    "Audio-guided fitness (voce femminile + arpa)"
  ],
  "activeTasks": 12
}
```

### Setup Briefing Automatico

**Opzione 1: Cron Job (Facile)** 
```bash
# Apri crontab
crontab -e

# Aggiungi questa riga (8:00 AM ogni giorno):
0 8 * * * cd /home/claude/dashboard && npm run generate-briefing
```

**Opzione 2: GitHub Actions** (Consigliato)
Vedi dettagli in SETUP.md

**Opzione 3: Test Locale**
```bash
npm run generate-briefing
# Vedi risultato: cat /home/claude/todos/briefings/briefing-2026-04-05.json
```

---

## 📝 Cosa Aggiornare Subito

### 1. Aggiorna user.md
Apri `/home/claude/memory/user.md` e compila:
```markdown
### Current Status

Program: M.Sc. Medical Biotechnologies, Università di Siena ✓
Health: Bipolar type 2 ✓
Relationship: Arianna ✓
System: ChromeOS ✓

### Key Dates & Deadlines
- Tesi proposal: 2026-06-30
- Esame 1: [quando?]
- Esame 2: [quando?]
```

### 2. Aggiorna active.md
Apri `/home/claude/todos/active.md` e compila i tuoi compiti settimanali:
```markdown
- [ ] Studiare Genetica Umana (pagine 1-40)
- [ ] Prep orale Virologia
- [ ] Schedulare advisor tesi
- [ ] Esercizio fitness 3x
- [ ] Spagnolo pratica
```

### 3. (Opzionale) Aggiungi webhook Stack
Se usi Stack, aggiungi l'URL in `.env.local`:
```
STACK_WEBHOOK_URL=https://tuaistanza.stack.com/webhooks/briefing
```

---

## 🛠️ Comandi Utili

```bash
# Dalla cartella /home/claude/dashboard/

# Installa dipendenze (fai una volta)
npm install

# Avvia dev server
npm run dev
# → Apri http://localhost:3000

# Crea database
npm run setup-db

# Genera briefing adesso (non aspettare le 8:00)
npm run generate-briefing

# Vedi ultimo briefing generato
cat ../todos/briefings/briefing-2026-04-05.json

# Build per produzione
npm run build

# Avvia versione produzione
npm start
```

---

## 🎯 Flusso di Lavoro Quotidiano

### Mattina (8:00 AM)
```
[Ricevi Briefing]
  ↓
Leggi: "Top 5 priorità per oggi"
  ↓
Apri Dashboard: http://localhost:3000
```

### Durante il Giorno
```
[Nel Dashboard]
  ├─ Vedi compiti in Kanban
  ├─ Trascina da "To Do" a "In Progress"
  ├─ Aggiungi un nuovo compito
  ├─ Filtri per priorità
  └─ Tutto si sincronizza real-time
```

### Sera
```
[Mi riscrivi su Claude]
  ├─ Leggo memoria automaticamente
  ├─ Rispondo nel TUO stile
  └─ Aggiorno memoria alla fine della sessione
```

### Domani Mattina
```
[Briefing legge memoria AGGIORNATA]
  └─ Ciclo ricomincia
```

---

## ❓ Domande Frequenti

**D: Non vedo i miei todo nel dashboard?**  
R: Controlla che:
1. `.env.local` abbia credenziali Supabase corrette
2. `npm run setup-db` sia stato eseguito
3. Browser console non abbia errori
4. Ricarica la pagina (Ctrl+R)

**D: Posso usare il dashboard offline?**  
R: Sì la UI, no il real-time. Senza internet non sincronizza.

**D: Come faccio a cambiare il mio stile di comunicazione?**  
R: Modifica `preferences.md`. Prossima sessione avrò il nuovo stile.

**D: Dove trovo il briefing di ieri?**  
R: In `/home/claude/todos/briefings/briefing-2026-04-04.json`

**D: Posso aggiungere più persone al sistema?**  
R: Sì. Espandi `people.md`. Aggiorna `CLAUDE.md` se cambia contesto.

---

## ✅ Checklist: Prime 30 Min

- [ ] Letto CLAUDE.md
- [ ] `npm install` eseguito
- [ ] `.env.local` compilato con credenziali Supabase
- [ ] `npm run setup-db` eseguito
- [ ] `npm run dev` avviato
- [ ] http://localhost:3000 aperto nel browser
- [ ] Creato un test todo
- [ ] Trascinato tra colonne Kanban
- [ ] Testato List e Timeline view
- [ ] Aggiornato user.md
- [ ] Aggiornato active.md
- [ ] Setup briefing cron job

✅ **Completo!**

---

## 📞 Troubleshooting Rapido

| Problema | Soluzione |
|----------|-----------|
| Module not found | `npm install` |
| Port 3000 busy | `lsof -i :3000` poi `kill -9 [PID]` |
| No todos showing | Controlla `.env.local` e run `npm run setup-db` |
| Real-time not working | Browser dev tools → Network → WebSocket |
| Briefing non arriva | Test con `npm run generate-briefing` |
| Memoria non aggiorna | Controlla perms: `chmod 644 memory/*.md` |

---

## 🎓 Punti Chiave

Questo sistema è costruito **specificamente per te** perché:

✅ Sa del tuo bipolare tipo 2  
✅ Rispetta i tuoi vincoli (80 pag/giorno, disabilità)  
✅ Segue il tuo metodo decisionale (passione > credentials)  
✅ Usa il tuo stile comunicativo (formale, preciso, strutturato)  
✅ Integra i tuoi interessi (neuro + biotech + AI + psicologia)  
✅ Impara da te (memoria si aggiorna)  

Non è un tool generico. È **il tuo strumento**.

---

## 🚀 Prossimi Step

### Oggi (30 min)
1. Leggi CLAUDE.md
2. Installa dashboard
3. Crea il primo todo
4. Aggiorna memory files

### Questa Settimana
1. Popola active.md con i tuoi compiti
2. Setup briefing automatico (cron)
3. Usa il dashboard giornalmente

### Ongoing
1. Chattiamo e miglioriamo il sistema
2. Claude legge memoria → contesto sempre migliore
3. Briefing ogni mattina → priorità allineate

---

## 📚 File Importanti da Leggere

| File | Leggi Quando | Tempo |
|------|--------------|-------|
| CLAUDE.md | **Subito** ⭐ | 5 min |
| README.md | Oggi | 10 min |
| SETUP.md | Se hai problemi | 15 min |
| MANIFEST.md | Reference | 5 min |
| user.md | Quando aggiorni | 5 min |
| active.md | Ogni lunedì | 5 min |

---

**Sei pronto! Inizia ora con CLAUDE.md 🚀**

---

**Sistema creato:** 2026-04-05  
**Per:** Giuseppe  
**Status:** ✅ Pronto all'uso  
**Next:** Leggi CLAUDE.md e inizia!

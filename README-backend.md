# Backend minimal (Flask)

Ce backend minimal offre :
- endpoint `GET /api/comments?path=...` pour récupérer les commentaires d'une page
- endpoint `POST /api/comments` pour poster un commentaire (JSON)
- endpoint `POST /api/contact` pour recevoir les messages du formulaire de contact

Dépendances : `Flask`, `Flask-Cors` (voir `requirements.txt`).

Étapes pour lancer en local (Windows PowerShell) :

1) Activez le virtualenv (depuis la racine du projet) :

```powershell
.\venv\Scripts\Activate.ps1
```

2) Installez les dépendances :

```powershell
pip install -r requirements.txt
```

3) Lancez l'API (depuis la racine du projet) :

```powershell
python backend\app.py
```

L'API écoute par défaut sur `http://127.0.0.1:5000`.

Notes :
- Les données sont sauvegardées dans le dossier `data/` (`comments.json`, `contacts.json`).
- Le front-end a été modifié pour essayer `http://127.0.0.1:5000` puis retomber en fallback local (`localStorage`) ou `mailto` si l'API est indisponible.
- Pour envoyer des emails réels, intégrez un service SMTP ou Formspree/EmailJS et modifiez l'endpoint `/api/contact` pour relayer les emails.

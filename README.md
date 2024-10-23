# Aurible - Application Angular Ionic / C# Dotnet
Bienvenue dans le dépôt du frontend de Aurible, une application dérivée d'Audible. Aurible permet aux utilisateurs de profiter de la lecture de livres grâce un Text-to-Speech aux petits oignons.

🎯 Objectif
L'objectif principal d'Aurible est de fournir une expérience de lecture fluide et immersive, où les utilisateurs peuvent écouter leurs livres préférés grâce à un service de TTS performant. Le projet utilise des technologies Azure pour la gestion de la connexion utilisateur et la conversion du TTS.

✨ Fonctionnalités
Connexion via Microsoft Azure : Les utilisateurs peuvent se connecter en toute sécurité en utilisant leur compte Microsoft grâce à Azure Active Directory (Azure AD).
Lecture avec TTS (Text-to-Speech) : Profitez d'une lecture automatisée de vos livres grâce à la technologie de synthèse vocale d'Azure.
Gestion des livres : Accédez à une bibliothèque de livres numériques à écouter.
🔧 Technologies
Ce projet utilise les technologies suivantes :

Azure Active Directory (Azure AD) pour la gestion des utilisateurs et de l'authentification.
Azure Text-to-Speech (TTS) pour la lecture des livres.
Ionic Angular pour le développement frontend.
C# Dotnet et des API pour la communication entre le frontend et le backend.
🚀 Démarrer le projet
Pour commencer avec ce projet en local :

Clonez ce dépôt :
git clone https://github.com/VivienS5/AuribleDotnet-front.git

Installez les dépendances :
npm install

Configurez les variables d'environnement pour Azure :
Créez un fichier .env et renseignez les variables nécessaires pour la connexion via Azure et TTS.

Lancez l'application :
Ionic serve

L'application sera disponible sur http://localhost:8100.

Pour la partie backend du projet, veuillez vous référer aux instructions présentes dans ce dépôt: https://github.com/VivienS5/AuribleDotnet-back

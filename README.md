# MoteurImmo MCP Server

Ce serveur MCP (Model Context Protocol) permet d'intégrer le service MoteurImmo dans des agents IA. Il facilite la recherche et la récupération d'annonces immobilières depuis différents portails immobiliers français.

## Fonctionnalités

- Recherche d'annonces selon divers critères (prix, surface, localisation, etc.)
- Récupération détaillée d'une annonce par son identifiant
- Filtrage par options (garage, terrasse, jardin, etc.)
- Analyse de négociation (optionnel)
- Historique des annonces (optionnel)

## Configuration

Utilisation direct de l'API MoteurImmo avec un serveur MCP.

```bash
{
    "mcpServers": {
        "moteurimmo": {
            "command": "npx",
            "args": ["-y", "moteurimmo-mcp-server"],
            "env": {
              "MOTEUR_IMMO_API_KEY": "YOUR-API-KEY"
            }
        }
    }
}
```

## Installation (pour le développement)

```bash
# Installation des dépendances
npm install

# Compilation du projet TypeScript
npm run build
```

## Configuration

Créez un fichier `.env` à la racine du projet avec les informations suivantes :

```
MOTEURIMMO_API_URL=https://api.moteurimmo.fr
MOTEURIMMO_API_KEY=votre_clé_api_ici
```

## Utilisation

### Démarrage du serveur

```bash
# Démarrage normal
npm start

# Démarrage en mode développement avec l'inspecteur MCP
npm run dev
```

### Outils disponibles

Le serveur expose deux outils principaux :

1. **search_ads** - Recherche d'annonces avec filtres
2. **get_ad** - Récupération d'une annonce spécifique par ID

## Exemple d'utilisation

Le serveur s'intègre avec des agents IA compatibles MCP et permet des recherches comme :

```
"Trouver un appartement à Paris entre 300 000€ et 400 000€ avec au moins 2 chambres"
```

ou

```
"Montre-moi les détails de l'annonce avec l'identifiant XYZ123"
```

## Développement

```bash
# Compilation en temps réel
npx tsc --watch

# Tests avec l'inspecteur MCP
npm run dev
```

## Licence

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.

## Liens

- [Documentation de l'API MoteurImmo](https://api.moteurimmo.fr/docs)
- [SDK Model Context Protocol](https://www.npmjs.com/package/@modelcontextprotocol/sdk)

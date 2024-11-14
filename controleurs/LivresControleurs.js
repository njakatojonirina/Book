// controllers/livreController.js

const livreService = require('../services/LivresServices');

const addLivre = (req, res) => {
    const livreData = req.body;
    livreService.addLivre(livreData)
        .then(livre => {
            res.status(201).send({ message: 'Livre ajouté avec succès', livre });
        })
        .catch(err => {
            res.status(400).send({ message: 'Erreur lors de l\'ajout du livre', error: err });
        });
};

const getLivres = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    livreService.getLivres(page, limit)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Erreur lors de la récupération des livres',
                error: err
            });
        });
};

const getLivreById = (req, res) => {
    const livreId = req.params.id;
    livreService.getLivreById(livreId)
        .then(livre => {
            if (!livre) {
                return res.status(404).send({ message: 'Livre non trouvé' });
            }
            res.status(200).send(livre);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Erreur lors de la récupération du livre',
                error: err
            });
        });
};

module.exports = { addLivre, getLivres, getLivreById };

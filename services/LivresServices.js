// services/livreService.js

const Livre = require('../model/Livre');

const addLivre = (livreData) => {
    const livre = new Livre(livreData);
    return livre.save();
};

const getLivres = (page, limit) => {
    const startIndex = (page - 1) * limit;
    return Livre.countDocuments()
        .then(totalLivres => {
            return Livre.find()
                .skip(startIndex)
                .limit(limit)
                .then(livres => {
                    return {
                        currentPage: page,
                        totalPages: Math.ceil(totalLivres / limit),
                        totalLivres: totalLivres,
                        livres: livres
                    };
                });
        });
};

const getLivreById = (id) => {
    return Livre.findById(id);
};

module.exports = { addLivre, getLivres, getLivreById };

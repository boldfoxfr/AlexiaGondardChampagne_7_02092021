// -------- IMPORT DU MODELE -------- //
const models = require('../models/index');

// -------- CREATION D'UN POST -------- //
exports.createPost = (req, res, next) => {
    const attachment = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;

    // création du post
    models.Post.create({
            UserId: res.locals.userId,
            content: req.body.content,
            attachment: attachment,
        })
        .then(() => res.status(201).json({
            message: "Post créé"
        }))
        .catch((error) => res.status(400).json({
            error
        }));
};

// -------- GET ONE POST -------- //

exports.getOnePost = (req, res, next) => {
    models.Post.findOne({
            where: {
                id: req.params.id
            },
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({
            error
        }));
}

// -------- LISTE DE TOUS LES POSTS -------- //
exports.getAllPost = (req, res, next) => {
    const order = req.query.order;
    models.Post.findAll({
            order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
            include: [{
                model: models.User,
                attributes: ["username"],
            }, ],
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({
            error
        }));
};

// -------- DELETE -------- //
exports.deletePost = (req, res, next) => {
    models.Post.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then(() => res.status(200).json({
            message: "Post supprimé !"
        }))
        .catch((error) => res.status(400).json({
            error
        }));
};
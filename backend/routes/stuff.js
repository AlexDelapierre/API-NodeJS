const express = require('express');
const router = express.Router();
const Thing = require('../models/Thing');


router.get('/', (req, res) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

router.get('/:id', (req, res) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if (!thing) {
        return res.status(404).json({ message: 'Objet non trouvé' });
      }
      res.status(200).json(thing);
    })
    .catch(error => res.status(400).json({ error }));
});

router.post('/', (req, res) => {
  const thing = new Thing({...req.body});
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré en base de données !' }))
    .catch((error) => {
      console.error('Erreur lors de l\'enregistrement :', error);
      res.status(400).json({ error });
    });
});

// Update endpoint avec Thing.findByIdAndUpdate()
router.put('/:id', (req, res) => {
  Thing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(updatedThing => {
      if (!updatedThing) {
        return res.status(404).json({ message: 'Objet non trouvé' });
      }
      res.status(200).json(updatedThing);
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour :', error);
      res.status(400).json({ error });
    });
});

// Update endpoint avec Thing.updateOne()
// router.put('/:id', (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// });

router.delete('/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  console.log("Reçu depuis le frontend :", req.body);

  User.findOne({ email: req.body.email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }

      return bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash
          });

          return user.save();
        })
        .then(savedUser => {
          // Génération du token directement après création
          const token = jwt.sign(
            { userId: savedUser._id },
            'RANDOM_TOKEN_SECRET', // À remplacer par une clé secrète sécurisée dans un fichier .env
            { expiresIn: '24h' }
          );

          res.status(201).json({
            message: "Utilisateur créé et connecté !",
            userId: savedUser._id,
            token: token
          });
        })
        .catch(error => {
          console.error("Erreur lors de l'enregistrement utilisateur :", error);
          res.status(400).json({ error });
        });
    })
    .catch(error => {
      console.error("Erreur lors de la vérification de l'email :", error);
      res.status(500).json({ error });
    });
};

// signup() version async/await
// exports.signup = async (req, res, next) => {
//   console.log("Reçu depuis le frontend :", req.body);

//   try {
//     const existingUser = await User.findOne({ email: req.body.email });

//     if (existingUser) {
//       return res.status(400).json({ message: "Cet email est déjà utilisé." });
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const user = new User({
//       email: req.body.email,
//       password: hashedPassword
//     });

//     await user.save();

//     res.status(201).json({ message: 'Utilisateur créé !' });
//   } catch (error) {
//     console.error("Erreur lors de l'inscription :", error);
//     res.status(500).json({ error });
//   }
// };


exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                           { userId: user._id },
                           'RANDOM_TOKEN_SECRET',
                           { expiresIn: '24h' }
                       )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};

// login() réécrite avec async/await
// exports.login = async (req, res, next) => {
//   try {
//     // Recherche de l'utilisateur
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
//     }

//     // Comparaison du mot de passe
//     const valid = await bcrypt.compare(req.body.password, user.password);

//     if (!valid) {
//       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
//     }

//     // Génération du token JWT
//     const token = jwt.sign(
//       { userId: user._id },
//       'RANDOM_TOKEN_SECRET', // À remplacer par une vraie clé secrète dans un fichier .env
//       { expiresIn: '24h' }
//     );

//     res.status(200).json({
//       userId: user._id,
//       token: token
//     });
//   } catch (error) {
//     console.error("Erreur lors de la connexion :", error);
//     res.status(500).json({ error });
//   }
// };
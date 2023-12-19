exports.registerController = async (req, res) => {
    try {
        const existingUserQuery = 'SELECT * FROM user WHERE email = ? OR username = ?';
        const [existingUserRows] = await db.query(existingUserQuery, [req.body.email, req.body.username]);

        if (existingUserRows.length > 0) {
            return res.status(200).send({ message: "L'utilisateur existe déjà", success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const insertQuery = 'INSERT INTO user(username, email, password, role) VALUES (?, ?, ?, ?)';
        const values = [req.body.username, req.body.email, hashedPassword, req.body.role];

        await db.query(insertQuery, values);
        res.status(201).send({ message: "Enregistré avec succès", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Erreur dans le contrôleur d'enregistrement : ${error.message}`,
        });
    }
};

exports.loginController = async (req, res) => {
    try {
        const q = "SELECT * FROM user WHERE email = ?";
        
        db.query(q, [req.body.email], async (error, data) => {
            if (error) {
                return res.status(500).send({ message: "Erreur lors de la recherche de l'utilisateur", success: false });
            }

            if (data.length === 0) {
                return res.status(200).send({ message: "Utilisateur non trouvé", success: false });
            }

            const user = data[0];
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(200).send({ message: "Email ou mot de passe invalide", success: false });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: "1d" });
            res.status(200).send({ message: "Connexion réussie", success: true, token });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Erreur lors de l'authentification", success: false, error });
    }
};

exports.authController = async (req, res) => {
    try {
        const q = "SELECT * FROM user WHERE id = ?";
        db.query(q, [req.headers.authorization], async (error, data) => {
            if (error) {
                console.log(error);
                return res.status(500).send({
                    message: 'Erreur d\'authentification',
                    success: false,
                    error
                });
            }

            if (data.length === 0) {
                return res.status(200).send({
                    message: 'Utilisateur non trouvé',
                    success: false
                });
            }

            const user = data[0];
            user.password = undefined;

            res.status(200).send({
                success: true,
                data: user
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Erreur d\'authentification',
            success: false,
            error
        });
    }
};

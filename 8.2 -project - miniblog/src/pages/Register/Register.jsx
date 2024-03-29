import { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const new_user = {
            displayName,
            email,
            password,
            confirmPassword,
        };

        if (password !== confirmPassword) {
            setError("As senhas precisam ser iguais!");
        }

        const response = await createUser(new_user);

        console.log("user created:", new_user);
    };

    useEffect(() => {
        setError(authError);
    }, [authError]);
    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome</span>
                    <input
                        type="text"
                        name="displayName"
                        required
                        placeholder="Nome do usuário"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>E-mail</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {error && <p className="error">{error}</p>}
                <button className="btn" disabled={loading ? true : false}>
                    {" "}
                    {loading ? "Aguarde... " : "Registrar"}
                </button>
            </form>
        </div>
    );
};

export default Register;

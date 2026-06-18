const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ erro: "Formato de token inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "sua_chave_secreta_aqui_123456");
    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = { verificarToken };
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
  },
  senha: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: 6,
    select: false, // Não retorna senha por padrão
  },
  nome: {
    type: String,
    default: "Usuário",
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Hash da senha antes de salvar (CORRIGIDO)
userSchema.pre("save", async function () {
  // Se a senha não foi modificada, não faz hash novamente
  if (!this.isModified("senha")) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
  } catch (err) {
    throw err;
  }
});

// Método para comparar senhas
userSchema.methods.compararSenha = async function (senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model("User", userSchema);